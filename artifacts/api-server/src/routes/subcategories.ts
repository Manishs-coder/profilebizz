import { Router } from "express";
import { db, subCategoriesTable, categoriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseBody(body: any): { name: string; description: string; sortOrder: number } | null {
  if (!body?.name || typeof body.name !== "string" || !body.name.trim()) return null;
  return {
    name: body.name.trim(),
    description: typeof body.description === "string" ? body.description.trim() : "",
    sortOrder: Number.isInteger(body.sortOrder) ? body.sortOrder : 0,
  };
}

// GET /api/categories/:id/subcategories
router.get("/categories/:id/subcategories", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const subs = await db
    .select()
    .from(subCategoriesTable)
    .where(eq(subCategoriesTable.categoryId, id))
    .orderBy(subCategoriesTable.sortOrder, subCategoriesTable.name);
  res.json(subs);
});

// GET /api/subcategories — all sub-categories (for dropdowns)
router.get("/subcategories", requireAuth, async (_req, res) => {
  const subs = await db
    .select()
    .from(subCategoriesTable)
    .orderBy(subCategoriesTable.sortOrder, subCategoriesTable.name);
  res.json(subs);
});

// POST /api/categories/:id/subcategories
router.post("/categories/:id/subcategories", requireAuth, async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const [cat] = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq(categoriesTable.id, categoryId)).limit(1);
  if (!cat) { res.status(404).json({ error: "Category not found" }); return; }

  const data = parseBody(req.body);
  if (!data) { res.status(400).json({ error: "name is required" }); return; }

  const slug = slugify(data.name);
  const [existing] = await db.select({ id: subCategoriesTable.id }).from(subCategoriesTable).where(eq(subCategoriesTable.slug, slug)).limit(1);
  if (existing) { res.status(409).json({ error: "Sub-category with this name already exists" }); return; }

  const [sub] = await db.insert(subCategoriesTable).values({ categoryId, slug, ...data }).returning();
  res.status(201).json(sub);
});

// PUT /api/subcategories/:id
router.put("/subcategories/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const data = parseBody(req.body);
  if (!data) { res.status(400).json({ error: "name is required" }); return; }

  const [updated] = await db.update(subCategoriesTable).set(data).where(eq(subCategoriesTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Sub-category not found" }); return; }
  res.json(updated);
});

// DELETE /api/subcategories/:id
router.delete("/subcategories/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(subCategoriesTable).where(eq(subCategoriesTable.id, id));
  res.status(204).end();
});

export default router;
