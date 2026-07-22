import type { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const session = req.session as any;
  if (!session?.userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  next();
}
