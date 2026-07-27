import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicOutput = path.join(root, "artifacts", "profilebizz", "dist", "public");
const adminOutput = path.join(root, "artifacts", "admin", "dist", "public");
const adminTarget = path.join(publicOutput, "admin");

await rm(adminTarget, { recursive: true, force: true });
await mkdir(adminTarget, { recursive: true });
await cp(adminOutput, adminTarget, { recursive: true });
