import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middlewares/auth.js";
import { ObjectStorageService } from "../lib/objectStorage.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  },
});

const storageService = new ObjectStorageService();

// POST /api/upload  — upload an image, return its public serving URL
router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  try {
    const { Storage } = await import("@google-cloud/storage");
    const storage = new Storage();
    const bucketId = process.env["DEFAULT_OBJECT_STORAGE_BUCKET_ID"];
    if (!bucketId) throw new Error("DEFAULT_OBJECT_STORAGE_BUCKET_ID not set");

    const ext = req.file.originalname.split(".").pop() || "jpg";
    const objectName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bucket = storage.bucket(bucketId);
    const file = bucket.file(objectName);

    await file.save(req.file.buffer, {
      contentType: req.file.mimetype,
      metadata: { cacheControl: "public, max-age=31536000" },
    });

    await file.makePublic();
    const url = `https://storage.googleapis.com/${bucketId}/${objectName}`;
    res.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
