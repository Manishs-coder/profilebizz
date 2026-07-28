import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(projectRoot, "artifacts", "api-server", "src", "seed-content.ts");
const outputPath = path.join(projectRoot, "work", "social-heroes-d1.sql");
const statementsPath = path.join(projectRoot, "work", "social-heroes-d1-statements.json");

const source = fs.readFileSync(sourcePath, "utf8");
const declarationStart = source.indexOf("const SOCIAL_HEROES = ");
const arrayStart = source.indexOf("[", declarationStart);
const arrayEnd = source.indexOf("\n];", arrayStart) + 2;

if (declarationStart < 0 || arrayStart < 0 || arrayEnd < 2) {
  throw new Error("Could not find SOCIAL_HEROES in seed-content.ts");
}

const heroes = Function(`"use strict"; return (${source.slice(arrayStart, arrayEnd)});`)();
const sqlString = (value) => value == null ? "NULL" : `'${String(value).replaceAll("'", "''")}'`;
const sqlJson = (value) => value == null ? "NULL" : sqlString(JSON.stringify(value));

const statements = [
  "-- Generated from the repository's SOCIAL_HEROES content. No Replit data is used.",
];

for (const hero of heroes) {
  statements.push(
    `INSERT INTO founders (
      slug,name,designation,profile_type,profile_tag,category,location,founded,revenue,employees,age,
      photo_url,cover_photo_url,one_liner,executive_summary,published
    ) VALUES (
      ${[
        hero.slug,
        hero.name,
        hero.designation,
        hero.profileType,
        hero.profileTag,
        hero.category,
        hero.location,
        hero.founded,
        hero.revenue ?? null,
        hero.employees ?? null,
        hero.age ?? null,
        hero.photoUrl ?? null,
        hero.coverPhotoUrl ?? null,
        hero.oneLiner ?? null,
        hero.executiveSummary ?? null,
      ].map(sqlString).join(",")},
      1
    )
    ON CONFLICT(slug) DO UPDATE SET
      name=excluded.name,
      designation=excluded.designation,
      profile_type=excluded.profile_type,
      profile_tag=excluded.profile_tag,
      category=excluded.category,
      location=excluded.location,
      founded=excluded.founded,
      revenue=excluded.revenue,
      employees=excluded.employees,
      age=excluded.age,
      photo_url=excluded.photo_url,
      cover_photo_url=excluded.cover_photo_url,
      one_liner=excluded.one_liner,
      executive_summary=excluded.executive_summary,
      published=1,
      updated_at=CURRENT_TIMESTAMP;`,
  );

  statements.push(
    `DELETE FROM founder_sections
     WHERE founder_id = (SELECT id FROM founders WHERE slug = ${sqlString(hero.slug)});`,
  );

  const sectionValues = [];
  for (const [locale, sections] of [["en", hero.sectionsEn], ["hi", hero.sectionsHi]]) {
    for (const [sortOrder, section] of (sections || []).entries()) {
      sectionValues.push(
        `(
          (SELECT id FROM founders WHERE slug = ${sqlString(hero.slug)}),
          ${sqlString(locale)},
          ${sqlString(section.sectionKey)},
          ${sqlString(section.pullQuote ?? null)},
          ${sqlJson(section.bodyParagraphs || [])},
          ${sqlJson(section.jsonData ?? null)},
          ${sortOrder}
        )`,
      );
    }
  }
  if (sectionValues.length) {
    statements.push(
      `INSERT INTO founder_sections (
        founder_id,locale,section_key,pull_quote,body_paragraphs,json_data,sort_order
      ) VALUES
      ${sectionValues.join(",\n")};`,
    );
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${statements.join("\n\n")}\n`, "utf8");
fs.writeFileSync(
  statementsPath,
  `${JSON.stringify(statements.filter((statement) => !statement.startsWith("--")), null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({
  heroes: heroes.length,
  sections: heroes.reduce(
    (total, hero) => total + (hero.sectionsEn?.length || 0) + (hero.sectionsHi?.length || 0),
    0,
  ),
  outputPath,
  statementsPath,
}));
