---
name: Photo upload flow
description: How admin photo upload works — multer → PRIVATE_OBJECT_DIR → API serving
---

## Flow
1. Admin picks a file → `POST /api/upload` (multer, `requireAuth`)
2. Server stores file at `PRIVATE_OBJECT_DIR/uploads/{uuid}.{ext}` in GCS
3. Returns `{ url: "/api/storage/objects/uploads/{uuid}.{ext}" }`
4. DB stores this as `photoUrl`
5. Public site fetches photo at `GET /api/storage/objects/*` — no auth, streams from GCS

## Why not makePublic()
Old `upload.ts` called `file.makePublic()` which requires `storage.objects.setIamPolicy`. Replit sidecar auth may not grant this. Serving via API route is more reliable.

## Files
- `artifacts/api-server/src/routes/upload.ts` — POST /api/upload (multer, stores to PRIVATE_OBJECT_DIR)
- `artifacts/api-server/src/routes/storage.ts` — GET /api/storage/objects/* (public streaming)
- Both mounted at `/api` prefix via `artifacts/api-server/src/routes/index.ts`
