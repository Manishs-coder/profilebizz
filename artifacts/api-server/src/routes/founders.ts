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

// ─── PUBLIC endpoints (no auth needed — for ProfileBizz frontend) ────────────

// GET /api/public/founders — list all published founders (for search)
router.get("/public/founders", async (req, res) => {
  const founders = await db
    .select({
      slug: foundersTable.slug,
      name: foundersTable.name,
      designation: foundersTable.designation,
      profileType: foundersTable.profileType,
      profileTag: foundersTable.profileTag,
      photoUrl: foundersTable.photoUrl,
      coverPhotoUrl: foundersTable.coverPhotoUrl,
      oneLiner: foundersTable.oneLiner,
    })
    .from(foundersTable)
    .where(eq(foundersTable.published, true))
    .orderBy(sql`${foundersTable.updatedAt} DESC`);
  res.json(founders);
});

// GET /api/public/founders/:slug
router.get("/public/founders/:slug", async (req, res) => {
  const slug = param(req.params.slug);
  const [founder] = await db
    .select()
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder || !founder.published) {
    res.status(404).json({ error: "Founder not found" });
    return;
  }
  res.json({ ...founder, createdAt: founder.createdAt.toISOString(), updatedAt: founder.updatedAt.toISOString() });
});

// GET /api/public/founders/:slug/sections?locale=en
router.get("/public/founders/:slug/sections", async (req, res) => {
  const slug = param(req.params.slug);
  const locale = (req.query.locale as string) || "en";
  const [founder] = await db
    .select({ id: foundersTable.id, published: foundersTable.published })
    .from(foundersTable)
    .where(eq(foundersTable.slug, slug))
    .limit(1);
  if (!founder || !founder.published) {
    res.status(404).json({ error: "Founder not found" });
    return;
  }
  const sections = await db
    .select()
    .from(founderSectionsTable)
    .where(and(eq(founderSectionsTable.founderId, founder.id), eq(founderSectionsTable.locale, locale)))
    .orderBy(founderSectionsTable.sortOrder);
  res.json(sections);
});

// ─── PUBLIC: Social Heroes ─────────────────────────────────────────────────

// GET /api/public/social-heroes — list all published social heroes
router.get("/public/social-heroes", async (_req, res) => {
  const heroes = await db
    .select({
      slug: foundersTable.slug,
      name: foundersTable.name,
      designation: foundersTable.designation,
      profileTag: foundersTable.profileTag,
      category: foundersTable.category,
      location: foundersTable.location,
      founded: foundersTable.founded,
      photoUrl: foundersTable.photoUrl,
      coverPhotoUrl: foundersTable.coverPhotoUrl,
      oneLiner: foundersTable.oneLiner,
      executiveSummary: foundersTable.executiveSummary,
    })
    .from(foundersTable)
    .where(and(eq(foundersTable.profileType, "social-hero"), eq(foundersTable.published, true)))
    .orderBy(foundersTable.createdAt);

  res.json(heroes.map(h => ({
    slug: h.slug,
    name: h.name,
    title: h.designation,
    tag: h.profileTag,
    photo: h.photoUrl,
    coverPhoto: h.coverPhotoUrl,
    location: h.location,
    impact: h.executiveSummary,
    founded: h.founded,
    category: h.category,
    pullQuote: h.oneLiner,
  })));
});

// GET /api/public/social-heroes/:slug?locale=en
router.get("/public/social-heroes/:slug", async (req, res) => {
  const slug = param(req.params.slug);
  const locale = (req.query.locale as string) || "en";

  const [founder] = await db
    .select()
    .from(foundersTable)
    .where(and(eq(foundersTable.slug, slug), eq(foundersTable.profileType, "social-hero"), eq(foundersTable.published, true)))
    .limit(1);

  if (!founder) {
    res.status(404).json({ error: "Hero not found" });
    return;
  }

  // Fetch sections for requested locale, fallback to EN
  let sections = await db
    .select()
    .from(founderSectionsTable)
    .where(and(eq(founderSectionsTable.founderId, founder.id), eq(founderSectionsTable.locale, locale)))
    .orderBy(founderSectionsTable.sortOrder);

  if (sections.length === 0 && locale !== "en") {
    sections = await db
      .select()
      .from(founderSectionsTable)
      .where(and(eq(founderSectionsTable.founderId, founder.id), eq(founderSectionsTable.locale, "en")))
      .orderBy(founderSectionsTable.sortOrder);
  }

  const find = (key: string) => sections.find(s => s.sectionKey === key);
  const jd = (s: typeof sections[0] | undefined) => s?.jsonData as any;

  res.json({
    slug: founder.slug,
    name: founder.name,
    title: founder.designation,
    tag: founder.profileTag,
    photo: founder.photoUrl,
    coverPhoto: founder.coverPhotoUrl,
    location: founder.location,
    impact: founder.executiveSummary,
    founded: founder.founded,
    category: founder.category,
    pullQuote: founder.oneLiner,
    story: find("story")?.bodyParagraphs || [],
    achievements: jd(find("achievements"))?.items || [],
    recognition: jd(find("recognition"))?.items || [],
    philosophy: find("philosophy")?.bodyParagraphs?.[0] || "",
  });
});

export default router;
