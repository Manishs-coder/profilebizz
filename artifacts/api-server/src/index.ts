import app from "./app";
import { logger } from "./lib/logger";
import { db, adminUsersTable, categoriesTable } from "@workspace/db";
import bcrypt from "bcryptjs";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function seedDefaultAdmin() {
  try {
    const existing = await db.select().from(adminUsersTable).limit(1);
    if (existing.length === 0) {
      const password = process.env["DEFAULT_ADMIN_PASSWORD"] ?? "profilebizz@admin2024";
      const hash = await bcrypt.hash(password, 10);
      await db.insert(adminUsersTable).values({ username: "admin", passwordHash: hash });
      logger.info("Default admin user created");
    }
  } catch (err) {
    logger.error({ err }, "Failed to seed default admin user");
  }
}

async function seedCategories() {
  try {
    const existing = await db.select({ id: categoriesTable.id }).from(categoriesTable).limit(1);
    if (existing.length > 0) return; // already seeded
    const SEED = [
      { name: "Founder Story",    slug: "founder-story",   description: "Indian founders who built businesses from scratch",                  color: "#1a1a1a", sortOrder: 1 },
      { name: "Social Hero",      slug: "social-hero",     description: "Changemakers and social entrepreneurs transforming India",           color: "#dc2626", sortOrder: 2 },
      { name: "Business Stories", slug: "business-story",  description: "Export, family, rural and women entrepreneur business stories",     color: "#2563eb", sortOrder: 3 },
      { name: "Brand Stories",    slug: "brand-story",     description: "How iconic Indian brands were built and scaled",                    color: "#7c3aed", sortOrder: 4 },
      { name: "Industry Stories", slug: "industry-story",  description: "Deep dives into Indian industries and sectors",                     color: "#059669", sortOrder: 5 },
      { name: "Women Story",      slug: "women-story",     description: "Indian women who built businesses against the odds",                color: "#db2777", sortOrder: 6 },
    ];
    await db.insert(categoriesTable).values(SEED);
    logger.info("Default categories seeded");
  } catch (err) {
    logger.error({ err }, "Failed to seed categories");
  }
}

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  await seedDefaultAdmin();
  await seedCategories();
});
