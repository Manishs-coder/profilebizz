---
name: DynamicFounderPage routing
description: All founder profile pages now go through DynamicFounderPage (DB-driven)
---

## Current routing
`FounderProfile` export → always `<DynamicFounderPage slug={slug} lang={lang} />`

**Why:** `StaticFounderContent` + hardcoded `FOUNDERS` object (760+ lines) were deleted in Task #3. All content now comes from DB.

## Hindi display
`FOUNDERS_HI` (from `foundersHi.ts`) provides Hindi display metadata only:
- `name`, `title`, `oneLiner`, `profileType`, `profileTag`
- Used in `DynamicFounderPage` when `lang === 'hi'`
- Section body comes from DB (fetched via `/api/public/founders/{slug}/sections?locale=hi`)

## File: artifacts/profilebizz/src/pages/FounderProfile.tsx
- ~488 lines (down from 1255 — 760+ lines removed)
- `FOUNDERS_HI` imported from `foundersHi.ts`
- `displayName`, `displayDesignation`, `displayOneLiner`, `displayProfileType`, `displayProfileTag` computed from `hiMeta` + DB fallback
