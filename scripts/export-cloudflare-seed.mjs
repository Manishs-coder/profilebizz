import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const dump = execFileSync(
  "git",
  ["show", "main:profilebizz_backup_20260726.sql"],
  { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
);

function copyUnescape(value) {
  if (value === "\\N") return null;
  return value.replace(/\\([btnrfv\\])/g, (_, code) => ({
    b: "\b",
    t: "\t",
    n: "\n",
    r: "\r",
    f: "\f",
    v: "\v",
    "\\": "\\",
  })[code]);
}

function parseArray(value) {
  if (value == null || value === "{}") return [];
  if (!value.startsWith("{") || !value.endsWith("}")) return [];
  const items = [];
  let current = "";
  let quoted = false;
  let escaped = false;

  for (let index = 1; index < value.length - 1; index += 1) {
    const char = value[index];
    if (escaped) {
      current += char;
      escaped = false;
    } else if (char === "\\") {
      escaped = true;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      items.push(current === "NULL" ? null : current);
      current = "";
    } else {
      current += char;
    }
  }
  items.push(current === "NULL" ? null : current);
  return items.filter((item) => item != null);
}

function extractCopy(table) {
  const header = new RegExp(`^COPY public\\.${table} \\(([^)]+)\\) FROM stdin;$`, "m");
  const match = dump.match(header);
  if (!match) return [];
  const columns = match[1].split(",").map((column) => column.trim());
  const start = match.index + match[0].length + 1;
  const end = dump.indexOf("\\.\n", start);
  return dump
    .slice(start, end)
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const values = line.split("\t").map(copyUnescape);
      return Object.fromEntries(columns.map((column, index) => [column, values[index] ?? null]));
    });
}

const founders = extractCopy("founders").map((row) => ({
  id: Number(row.id),
  slug: row.slug,
  name: row.name,
  designation: row.designation,
  profileType: row.profile_type,
  profileTag: row.profile_tag,
  category: row.category,
  location: row.location,
  founded: row.founded,
  revenue: row.revenue,
  employees: row.employees,
  age: row.age,
  photoUrl: row.photo_url,
  coverPhotoUrl: row.cover_photo_url,
  oneLiner: row.one_liner,
  executiveSummary: row.executive_summary,
  published: row.published === "t",
  createdAt: row.created_at,
  updatedAt: row.updated_at,
}));

const sections = extractCopy("founder_sections").map((row) => ({
  id: Number(row.id),
  founderId: Number(row.founder_id),
  locale: row.locale || "en",
  sectionKey: row.section_key,
  pullQuote: row.pull_quote,
  bodyParagraphs: parseArray(row.body_paragraphs),
  jsonData: row.json_data == null ? null : JSON.parse(row.json_data),
  sortOrder: Number(row.sort_order) || 0,
}));

const seo = extractCopy("seo_meta").map((row) => ({
  id: Number(row.id),
  founderId: Number(row.founder_id),
  seoTitle: row.seo_title,
  seoDescription: row.seo_description,
  keywords: row.keywords,
  canonicalUrl: row.canonical_url,
  ogImage: row.og_image,
  ogTitle: row.og_title,
  twitterCard: row.twitter_card,
  schemaType: row.schema_type,
  focusKeyword: row.focus_keyword,
  robots: row.robots,
}));

const categories = extractCopy("categories").map((row) => ({
  id: Number(row.id),
  name: row.name,
  slug: row.slug,
  description: row.description,
  color: row.color,
  sortOrder: Number(row.sort_order) || 0,
  createdAt: row.created_at,
}));

const subCategories = extractCopy("sub_categories").map((row) => ({
  id: Number(row.id),
  categoryId: Number(row.category_id),
  name: row.name,
  slug: row.slug,
  description: row.description,
  sortOrder: Number(row.sort_order) || 0,
  createdAt: row.created_at,
}));

const output = { founders, sections, seo, categories, subCategories };
const destination = path.resolve(process.cwd(), "..", "profilebizz-cloudflare-seed.json");
await writeFile(destination, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  destination,
  founders: founders.length,
  sections: sections.length,
  seo: seo.length,
  categories: categories.length,
  subCategories: subCategories.length,
}));
