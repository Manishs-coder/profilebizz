import { randomUUID } from "crypto";
import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middlewares/auth.js";
import { objectStorageClient } from "../lib/objectStorage.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  },
});

/** Parse a GCS path like "/bucket-id/prefix/..." into bucketName + objectName */
function parseGcsPath(path: string): { bucketName: string; objectName: string } {
  const parts = path.replace(/^\/+/, "").split("/");
  return { bucketName: parts[0], objectName: parts.slice(1).join("/") };
}

/**
 * POST /api/upload
 * Accepts multipart/form-data with a single "file" field.
 * Stores the image in the private object storage directory and
 * returns a serving URL via the storage objects endpoint.
 */
router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const privateDir = process.env["PRIVATE_OBJECT_DIR"];
  if (!privateDir) {
    res.status(500).json({ error: "Storage not configured" });
    return;
  }

  try {
    const ext = (req.file.originalname.split(".").pop() ?? "jpg").toLowerCase();
    const entityId = `uploads/${randomUUID()}.${ext}`;

    // Full GCS path = PRIVATE_OBJECT_DIR / entityId
    const fullPath = `${privateDir.replace(/\/+$/, "")}/${entityId}`;
    const { bucketName, objectName } = parseGcsPath(fullPath);

    const gcsFile = objectStorageClient.bucket(bucketName).file(objectName);
    await gcsFile.save(req.file.buffer, {
      contentType: req.file.mimetype,
      metadata: { cacheControl: "public, max-age=31536000" },
    });

    // Return an API-served URL instead of a direct GCS public URL.
    // GET /api/storage/objects/<entityId> proxies the file from private storage.
    const url = `/api/storage/objects/${entityId}`;
    res.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
