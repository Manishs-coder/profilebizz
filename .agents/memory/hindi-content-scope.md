---
name: Hindi content scope
description: Which founders have Hindi content and where it lives
---

## Founders with Hindi content
Only these 5 have Hindi content (written by ProfileBizz, not machine-translated):
1. **Nithin Kamath** — 9 sections in DB (seeded via nkSectionsHi in seed-content.ts)
2. **Anshu Gupta** — 4 sections in DB
3. **Arunachalam Muruganantham** — 4 sections in DB
4. **Rajendra Singh** — 4 sections in DB
5. **Dashrath Manjhi** — 4 sections in DB

## Hindi display metadata (name, title, oneLiner)
`artifacts/profilebizz/src/data/foundersHi.ts` — only Nithin Kamath entry.
Used in `DynamicFounderPage` when `lang=hi` to override founder name/designation display.
Section body comes from DB.

## Rajesh Kumar Vedas
Has NO Hindi content. Fake translation was removed. Do not add any.
