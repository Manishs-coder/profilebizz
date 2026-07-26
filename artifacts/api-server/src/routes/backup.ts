/**
 * Backup routes — all require admin auth
 *
 * GET  /api/backup/list          — list all stored backups
 * POST /api/backup/trigger       — create a backup now
 * GET  /api/backup/download/:fn  — stream a backup file
 */
import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { createBackup, listBackups, getBackupReadStream } from "../lib/backup.js";
import { logger } from "../lib/logger.js";

const router = Router();

// List backups
router.get("/backup/list", requireAuth, async (_req, res) => {
  try {
    const backups = await listBackups();
    res.json(backups);
  } catch (err) {
    logger.error({ err }, "Failed to list backups");
    res.status(500).json({ error: "Failed to list backups" });
  }
});

// Trigger a manual backup
router.post("/backup/trigger", requireAuth, async (_req, res) => {
  try {
    const filename = await createBackup();
    res.json({ ok: true, filename });
  } catch (err) {
    logger.error({ err }, "Manual backup failed");
    res.status(500).json({ error: "Backup failed" });
  }
});

// Download a backup file
router.get("/backup/download/:filename", requireAuth, (req, res) => {
  const { filename } = req.params;
  try {
    const stream = getBackupReadStream(filename);
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    stream.on("error", (err) => {
      logger.error({ err }, "Backup stream error");
      if (!res.headersSent) res.status(500).json({ error: "Download failed" });
    });
    stream.pipe(res);
  } catch (err) {
    logger.error({ err }, "Failed to start backup download");
    res.status(400).json({ error: "Invalid request" });
  }
});

export default router;
