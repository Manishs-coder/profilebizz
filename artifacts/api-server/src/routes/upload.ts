import { Router } from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "/tmp"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `upload-${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  },
});

// POST /api/upload
router.post("/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // For now return a placeholder URL (object storage can be wired later)
  // The file is at req.file.path on the server
  // Return a data URL approach or a simple static serve path
  // We'll store photos as base64-less approach - just return the unsplash photo for now
  // In production, this would upload to object storage
  const url = `https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80`;
  return res.json({ url });
});

export default router;
