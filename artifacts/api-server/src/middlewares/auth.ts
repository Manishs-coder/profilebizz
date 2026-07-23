import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  // 1. Session-based auth (web admin panel)
  const session = req.session as any;
  if (session?.userId) {
    next();
    return;
  }

  // 2. Bearer token auth (mobile app)
  const auth = req.headers["authorization"];
  if (typeof auth === "string" && auth.startsWith("Bearer ")) {
    const token = auth.slice(7);
    const secret = process.env.SESSION_SECRET ?? "dev-fallback-secret";
    try {
      jwt.verify(token, secret);
      next();
      return;
    } catch {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }
  }

  res.status(401).json({ error: "Not authenticated" });
}
