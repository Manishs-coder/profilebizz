---
name: Seed idempotency
description: How seed-content.ts handles sections on restart — prevents admin edits from being overwritten
---

## Rule
`seedSectionsIfEmpty(founderId, locale, sections)` — counts existing rows for that (founderId, locale) pair. If count > 0, returns immediately without touching DB.

**Why:** `replaceSections` (old name) did DELETE + INSERT on every server start. Admin section edits were wiped on every redeploy. This was task #16.

**How to apply:** Any new founder sections added to seed-content.ts must also use `seedSectionsIfEmpty`, never `replaceSections`. If you need to force-reset a specific founder's sections (e.g. content correction), do it manually via the admin UI or a one-off SQL DELETE.

**Note:** `upsertFounder` still updates basic metadata on every restart (name, designation, etc.) but intentionally preserves `photoUrl` and `coverPhotoUrl` if admin has already set them.
