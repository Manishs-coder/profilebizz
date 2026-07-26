/**
 * Database backup service
 *
 * - Creates pg_dump snapshots and stores them in Object Storage (backups/ folder)
 * - Keeps a rolling window of the 7 most recent backups
 * - Called by the daily cron job and the manual-trigger API route
 */
import { exec } from "child_process";
import { promisify } from "util";
import { unlink } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { objectStorageClient } from "./objectStorage.js";
import { logger } from "./logger.js";

const execAsync = promisify(exec);
const unlinkAsync = promisify(unlink);

/** Parse "/<bucket>/<objectpath>" → { bucketName, objectName } */
function parseObjectPath(path: string): { bucketName: string; objectName: string } {
  if (!path.startsWith("/")) path = `/${path}`;
  const parts = path.split("/");
  if (parts.length < 3) throw new Error(`Invalid object path: ${path}`);
  return { bucketName: parts[1]!, objectName: parts.slice(2).join("/") };
}

function getBackupBase(): { bucketName: string; prefix: string } {
  const dir = process.env.PRIVATE_OBJECT_DIR ?? "";
  if (!dir) throw new Error("PRIVATE_OBJECT_DIR not set");
  const { bucketName, objectName } = parseObjectPath(dir);
  const base = objectName.endsWith("/") ? objectName : `${objectName}/`;
  return { bucketName, prefix: `${base}backups/` };
}

/** Run pg_dump, upload result to Object Storage, prune old backups. */
export async function createBackup(): Promise<string> {
  const now = new Date();
  const stamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19) + "Z";
  const filename = `backup_${stamp}.sql`;
  const tmpFile = join(tmpdir(), filename);

  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error("DATABASE_URL not set");

    // Dump to a temp file
    await execAsync(
      `pg_dump "${dbUrl}" --no-password -F plain --no-owner --no-acl -f "${tmpFile}"`
    );

    // Upload to Object Storage
    const { bucketName, prefix } = getBackupBase();
    const bucket = objectStorageClient.bucket(bucketName);
    await bucket.upload(tmpFile, { destination: `${prefix}${filename}` });

    logger.info({ filename }, "Database backup created");

    // Keep only last 7
    await pruneOldBackups();

    return filename;
  } finally {
    try {
      await unlinkAsync(tmpFile);
    } catch {
      // ignore cleanup errors
    }
  }
}

export interface BackupEntry {
  name: string;
  size: number;
  createdAt: string;
}

/** List all backups, newest first. */
export async function listBackups(): Promise<BackupEntry[]> {
  const { bucketName, prefix } = getBackupBase();
  const bucket = objectStorageClient.bucket(bucketName);
  const [files] = await bucket.getFiles({ prefix });

  return files
    .map((f) => ({
      name: f.name.split("/").pop() ?? f.name,
      size: Number(f.metadata.size ?? 0),
      createdAt: (f.metadata.timeCreated as string) ?? "",
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Delete backups beyond the 7 most recent. */
async function pruneOldBackups(): Promise<void> {
  const { bucketName, prefix } = getBackupBase();
  const bucket = objectStorageClient.bucket(bucketName);
  const [files] = await bucket.getFiles({ prefix });

  const sorted = [...files].sort((a, b) =>
    ((b.metadata.timeCreated as string) ?? "").localeCompare(
      (a.metadata.timeCreated as string) ?? ""
    )
  );

  const toDelete = sorted.slice(7);
  for (const file of toDelete) {
    await file.delete();
    logger.info({ name: file.name }, "Old backup pruned");
  }
}

/** Return a readable stream for a named backup file. */
export function getBackupReadStream(filename: string) {
  // Basic safety: no path traversal
  if (filename.includes("/") || filename.includes("..")) {
    throw new Error("Invalid filename");
  }
  const { bucketName, prefix } = getBackupBase();
  const bucket = objectStorageClient.bucket(bucketName);
  return bucket.file(`${prefix}${filename}`).createReadStream();
}
