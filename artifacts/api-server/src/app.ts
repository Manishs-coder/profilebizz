import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { pool } from "@workspace/db";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET environment variable is required but was not provided.");
}

const PgSession = ConnectPgSimple(session);

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

// CORS: allow production domains plus any extra origins from env.
const PRODUCTION_ORIGINS = [
  "https://profilebizz.com",
  "https://www.profilebizz.com",
  "https://profile-biz-design.replit.app",
];

const allowedOrigins = [
  ...PRODUCTION_ORIGINS,
  ...(process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (same-origin, curl, server-to-server)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      // In development, allow any localhost / replit dev domain
      if (origin.includes("localhost") || origin.includes(".replit.dev")) {
        return cb(null, true);
      }
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// Trust the Replit reverse proxy so secure cookies are set correctly in production
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "sessions",
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      // In production the proxy is same-site, so "lax" is safe and avoids
      // cross-site cookie issues; "none" + secure is only needed for true
      // cross-origin embeds which we do not support.
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);

app.use("/api", router);

export default app;
