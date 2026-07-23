import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const foundersTable = pgTable("founders", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  designation: text("designation").notNull(),
  profileType: text("profile_type"),
  profileTag: text("profile_tag"),
  category: text("category"),
  location: text("location"),
  founded: text("founded"),
  revenue: text("revenue"),
  employees: text("employees"),
  age: text("age"),
  photoUrl: text("photo_url"),
  coverPhotoUrl: text("cover_photo_url"),
  oneLiner: text("one_liner"),
  executiveSummary: text("executive_summary"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertFounderSchema = createInsertSchema(foundersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertFounder = z.infer<typeof insertFounderSchema>;
export type Founder = typeof foundersTable.$inferSelect;

export const founderSectionsTable = pgTable("founder_sections", {
  id: serial("id").primaryKey(),
  founderId: integer("founder_id").notNull().references(() => foundersTable.id, { onDelete: "cascade" }),
  locale: text("locale").notNull().default("en"),
  sectionKey: text("section_key").notNull(),
  pullQuote: text("pull_quote"),
  bodyParagraphs: text("body_paragraphs").array().default([]),
  jsonData: jsonb("json_data"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertFounderSectionSchema = createInsertSchema(founderSectionsTable).omit({ id: true });
export type InsertFounderSection = z.infer<typeof insertFounderSectionSchema>;
export type FounderSection = typeof founderSectionsTable.$inferSelect;

export const seoMetaTable = pgTable("seo_meta", {
  id: serial("id").primaryKey(),
  founderId: integer("founder_id").notNull().unique().references(() => foundersTable.id, { onDelete: "cascade" }),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  keywords: text("keywords"),
  canonicalUrl: text("canonical_url"),
  ogImage: text("og_image"),
  ogTitle: text("og_title"),
  twitterCard: text("twitter_card").default("summary_large_image"),
  schemaType: text("schema_type").default("Person"),
  focusKeyword: text("focus_keyword"),
  robots: text("robots").default("index, follow"),
});

export const insertSeoMetaSchema = createInsertSchema(seoMetaTable).omit({ id: true });
export type InsertSeoMeta = z.infer<typeof insertSeoMetaSchema>;
export type SeoMeta = typeof seoMetaTable.$inferSelect;

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  color: text("color").default("#6B7280"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categoriesTable).omit({ id: true, createdAt: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categoriesTable.$inferSelect;

export const subCategoriesTable = pgTable("sub_categories", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => categoriesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSubCategorySchema = createInsertSchema(subCategoriesTable).omit({ id: true, createdAt: true });
export type InsertSubCategory = z.infer<typeof insertSubCategorySchema>;
export type SubCategory = typeof subCategoriesTable.$inferSelect;
