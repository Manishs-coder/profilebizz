/**
 * Storage serving routes
 *
 * GET /storage/objects/* — serve uploaded objects (profile photos, etc.)
 *                          No auth required: photos are public assets.
 */
import { Readable } from "stream";
import { Router, type Request, type Response } from "express";
import {
  ObjectNotFoundError,
  ObjectStorageService,
} from "../lib/objectStorage.js";

const router = Router();
const objectStorageService = new ObjectStorageService();

router.get(
  "/storage/objects/*path",
  async (req: Request, res: Response) => {
    try {
      const raw: string | string[] = (req.params as any).path;
      const wildcardPath = Array.isArray(raw) ? raw.join("/") : String(raw);
      const objectPath = `/objects/${wildcardPath}`;

      const objectFile =
        await objectStorageService.getObjectEntityFile(objectPath);
      const response = await objectStorageService.downloadObject(objectFile);

      res.status(response.status);
      response.headers.forEach((value: string, key: string) =>
        res.setHeader(key, value),
      );

      if (response.body) {
        const nodeStream = Readable.fromWeb(
          response.body as ReadableStream<Uint8Array>,
        );
        nodeStream.pipe(res);
      } else {
        res.end();
      }
    } catch (error) {
      if (error instanceof ObjectNotFoundError) {
        res.status(404).json({ error: "Object not found" });
        return;
      }
      console.error("Error serving object:", error);
      res.status(500).json({ error: "Failed to serve object" });
    }
  },
);

export default router;
