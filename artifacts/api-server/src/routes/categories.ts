import { Router } from "express";
import { db, categoriesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
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

function param(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

type CategoryBody = { name?: unknown; description?: unknown; color?: unknown; sortOrder?: unknown };

// POST /api/seed-categories — one-time seed, no auth required
router.post("/seed-categories", async (_req, res) => {
  const SEED = [
    { name: "Founder Story",    slug: "founder-story",   description: "Indian founders who built businesses from scratch",                   color: "#1a1a1a", sortOrder: 1 },
    { name: "Social Hero",      slug: "social-hero",     description: "Changemakers and social entrepreneurs transforming India",            color: "#dc2626", sortOrder: 2 },
    { name: "Business Stories", slug: "business-story",  description: "Export, family, rural and women entrepreneur business stories",      color: "#2563eb", sortOrder: 3 },
    { name: "Brand Stories",    slug: "brand-story",     description: "How iconic Indian brands were built and scaled",                     color: "#7c3aed", sortOrder: 4 },
    { name: "Industry Stories", slug: "industry-story",  description: "Deep dives into Indian industries and sectors",                      color: "#059669", sortOrder: 5 },
    { name: "Women Story",      slug: "women-story",     description: "Indian women who built businesses against the odds",                 color: "#db2777", sortOrder: 6 },
  ];
  const inserted: string[] = [];
  const skipped: string[] = [];
  for (const cat of SEED) {
    const existing = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq(categoriesTable.slug, cat.slug)).limit(1);
    if (existing.length > 0) { skipped.push(cat.slug); continue; }
    await db.insert(categoriesTable).values(cat);
    inserted.push(cat.slug);
  }
  res.json({ inserted, skipped });
});

// GET /api/categories
router.get("/categories", requireAuth, async (_req, res) => {
  const rows = await db
    .select()
    .from(categoriesTable)
    .orderBy(categoriesTable.sortOrder, categoriesTable.name);
  res.json(rows.map(r => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

// POST /api/categories
router.post("/categories", requireAuth, async (req, res) => {
  const body = req.body as CategoryBody;
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const { name, description, color, sortOrder } = {
    name: body.name.trim(),
    description: typeof body.description === "string" ? body.description : undefined,
    color: typeof body.color === "string" ? body.color : undefined,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
  };
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const existing = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq(categoriesTable.slug, slug)).limit(1);
    if (existing.length === 0) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }
  const [category] = await db
    .insert(categoriesTable)
    .values({ name, slug, description: description ?? null, color: color ?? "#6B7280", sortOrder: sortOrder ?? 0 })
    .returning();
  res.status(201).json({ ...category, createdAt: category.createdAt.toISOString() });
});

// PUT /api/categories/:id
router.put("/categories/:id", requireAuth, async (req, res) => {
  const id = parseInt(param(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const body = req.body as CategoryBody;
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const [existing] = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq(categoriesTable.id, id)).limit(1);
  if (!existing) { res.status(404).json({ error: "Category not found" }); return; }
  const { name, description, color, sortOrder } = {
    name: body.name.trim(),
    description: typeof body.description === "string" ? body.description : undefined,
    color: typeof body.color === "string" ? body.color : undefined,
    sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0,
  };
  const [updated] = await db
    .update(categoriesTable)
    .set({ name, description: description ?? null, color: color ?? "#6B7280", sortOrder: sortOrder ?? 0 })
    .where(eq(categoriesTable.id, id))
    .returning();
  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

// DELETE /api/categories/:id
router.delete("/categories/:id", requireAuth, async (req, res) => {
  const id = parseInt(param(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [existing] = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq(categoriesTable.id, id)).limit(1);
  if (!existing) { res.status(404).json({ error: "Category not found" }); return; }
  await db.delete(categoriesTable).where(eq(categoriesTable.id, id));
  res.json({ ok: true });
});

export default router;
