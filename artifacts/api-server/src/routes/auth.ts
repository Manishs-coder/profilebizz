import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { LoginBody } from "@workspace/api-zod";

const router = Router();

// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const { username, password } = parsed.data;
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.username, username))
    .limit(1);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  (req.session as any).userId = user.id;
  (req.session as any).username = user.username;
  return res.json({ id: user.id, username: user.username });
});

// POST /api/auth/logout
router.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.json({ ok: true });
  });
});

// GET /api/auth/me
router.get("/auth/me", (req, res) => {
  const session = req.session as any;
  if (!session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  return res.json({ id: session.userId, username: session.username });
});

export default router;
