import { Router } from "express";
import {
  db,
  foundersTable,
  founderSectionsTable,
  seoMetaTable,
} from "@workspace/db";
import { eq, sql, and } from "drizzle-orm";
import {
  CreateFounderBody,
  UpdateFounderBody,
  UpdateFounderSectionsBody,
  UpdateFounderSeoBody,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Safely extract a route param as a plain string (Express 5 types it as string | string[]). */
function param(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

// GET /api/dashboard/stats
router.get("/dashboard/stats", requireAuth, async (_req, res) => {
  const founders = await db.select().from(foundersTable);
  const total = founders.length;
  const published = founders.filter((f) => f.published).length;
  const draft = total - published;
  const catMap: Record<string, number> = {};
  for (const f of founders) {
    const cat = f.category || "Uncategorized";
    catMap[cat] = (catMap[cat] || 0) + 1;
  }
  const categories = Object.entries(catMap).map(([name, count]) => ({ name, count }));
  res.json({ totalFounders: total, publishedFounders: published, draftFounders: draft, categories });
});

// GET /api/founders
router.get("/founders", requireAuth, async (_req, res) => {
  const rows = await db
    .select({
      id: foundersTable.id,
      slug: foundersTable.slug,
      name: foundersTable.name,
      designation: foundersTable.designation,
      profileTag: foundersTable.profileTag,
      category: foundersTable.category,
      photoUrl: foundersTable.photoUrl,
      published: foundersTable.published,
      createdAt: foundersTable.createdAt,
    })
    .from(foundersTable)
    .orderBy(sql`${foundersTable.createdAt} DESC`);
  res.json(rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

// POST /api/founders
router.post("/founders", requireAuth, async (req, res) => {
  const parsed = CreateFounderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const data = parsed.data;
  const baseSlug = slugify(data.name);
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const existing = await db
      .select({ id: foundersTable.id })
      .from(foundersTable)
      .where(eq(foundersTable.slug, slug))
      .limit(1);
    if (existing.length === 0) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }
  const [founder] = await db
    .insert(foundersTable)
    .values({ ...data, slug, published: data.published ?? true })
    .returning();
  res.status(201).json({ ...founder, createdAt: founder.createdAt.toISOString(), updatedAt: founder.updatedAt.toISOString() });
});

// GET /api/founders/:slug
router.get("/founders/:slug", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const [founder] = await db
    .select()
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder) { res.status(404).json({ error: "Founder not found" }); return; }
  res.json({ ...founder, createdAt: founder.createdAt.toISOString(), updatedAt: founder.updatedAt.toISOString() });
});

// PUT /api/founders/:slug
router.put("/founders/:slug", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const parsed = UpdateFounderBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body" }); return; }
  const [existing] = await db
    .select({ id: foundersTable.id })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!existing) { res.status(404).json({ error: "Founder not found" }); return; }
  const [updated] = await db
    .update(foundersTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(foundersTable.slug, slug))
    .returning();
  res.json({ ...updated, createdAt: updated.createdAt.toISOString(), updatedAt: updated.updatedAt.toISOString() });
});

// DELETE /api/founders/:slug
router.delete("/founders/:slug", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const [existing] = await db
    .select({ id: foundersTable.id })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!existing) { res.status(404).json({ error: "Founder not found" }); return; }
  await db.delete(foundersTable).where(eq(foundersTable.slug, slug));
  res.json({ ok: true });
});

// GET /api/founders/:slug/sections?locale=en
router.get("/founders/:slug/sections", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const locale = (req.query.locale as string) || "en";
  const [founder] = await db
    .select({ id: foundersTable.id })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder) { res.status(404).json({ error: "Founder not found" }); return; }
  const sections = await db
    .select()
    .from(founderSectionsTable)
    .where(and(eq(founderSectionsTable.founderId, founder.id), eq(founderSectionsTable.locale, locale)))
    .orderBy(founderSectionsTable.sortOrder);
  res.json(sections);
});

// PUT /api/founders/:slug/sections
router.put("/founders/:slug/sections", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const parsed = UpdateFounderSectionsBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body" }); return; }
  const locale = parsed.data.locale || "en";
  const [founder] = await db
    .select({ id: foundersTable.id })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder) { res.status(404).json({ error: "Founder not found" }); return; }
  // Delete only sections for this locale, preserving the other language
  await db.delete(founderSectionsTable).where(
    and(eq(founderSectionsTable.founderId, founder.id), eq(founderSectionsTable.locale, locale))
  );
  if (parsed.data.sections.length === 0) { res.json([]); return; }
  const sections = parsed.data.sections.map((s, i) => ({
    founderId: founder.id,
    locale,
    sectionKey: s.sectionKey,
    pullQuote: s.pullQuote ?? null,
    bodyParagraphs: s.bodyParagraphs ?? [],
    jsonData: s.jsonData ?? null,
    sortOrder: i,
  }));
  const inserted = await db.insert(founderSectionsTable).values(sections).returning();
  res.json(inserted);
});

// GET /api/founders/:slug/seo
router.get("/founders/:slug/seo", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const [founder] = await db
    .select({ id: foundersTable.id })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder) { res.status(404).json({ error: "Founder not found" }); return; }
  const [seo] = await db
    .select()
    .from(seoMetaTable)
    .where(eq(seoMetaTable.founderId, founder.id))
    .limit(1);
  if (!seo) {
    res.json({ founderId: founder.id, seoTitle: null, seoDescription: null, keywords: null, canonicalUrl: null, ogImage: null, ogTitle: null, twitterCard: "summary_large_image", schemaType: "Person", focusKeyword: null, robots: "index, follow" });
    return;
  }
  res.json(seo);
});

// PUT /api/founders/:slug/seo
router.put("/founders/:slug/seo", requireAuth, async (req, res) => {
  const slug = param(req.params.slug);
  const parsed = UpdateFounderSeoBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body" }); return; }
  const [founder] = await db
    .select({ id: foundersTable.id })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder) { res.status(404).json({ error: "Founder not found" }); return; }
  const [existing] = await db
    .select({ id: seoMetaTable.id })
    .from(seoMetaTable)
    .where(eq(seoMetaTable.founderId, founder.id))
    .limit(1);
  let result;
  if (existing) {
    [result] = await db
      .update(seoMetaTable)
      .set(parsed.data)
      .where(eq(seoMetaTable.founderId, founder.id))
      .returning();
  } else {
    [result] = await db
      .insert(seoMetaTable)
      .values({ founderId: founder.id, ...parsed.data })
      .returning();
  }
  res.json(result);
});

export default router;
