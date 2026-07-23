import app from "./app";
import { logger } from "./lib/logger";
import { db, adminUsersTable } from "@workspace/db";
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

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  await seedDefaultAdmin();
});
