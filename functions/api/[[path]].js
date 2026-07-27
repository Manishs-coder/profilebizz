const encoder = new TextEncoder();
const SESSION_COOKIE = "profilebizz_session";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

const SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS founders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  profile_type TEXT,
  profile_tag TEXT,
  category TEXT,
  location TEXT,
  founded TEXT,
  revenue TEXT,
  employees TEXT,
  age TEXT,
  photo_url TEXT,
  cover_photo_url TEXT,
  one_liner TEXT,
  executive_summary TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS founder_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  founder_id INTEGER NOT NULL REFERENCES founders(id) ON DELETE CASCADE,
  locale TEXT NOT NULL DEFAULT 'en',
  section_key TEXT NOT NULL,
  pull_quote TEXT,
  body_paragraphs TEXT NOT NULL DEFAULT '[]',
  json_data TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS seo_meta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  founder_id INTEGER NOT NULL UNIQUE REFERENCES founders(id) ON DELETE CASCADE,
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT,
  canonical_url TEXT,
  og_image TEXT,
  og_title TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  schema_type TEXT DEFAULT 'Person',
  focus_keyword TEXT,
  robots TEXT DEFAULT 'index, follow'
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_founder_sections_founder_locale
  ON founder_sections(founder_id, locale, sort_order);
CREATE INDEX IF NOT EXISTS idx_founders_published
  ON founders(published, updated_at);
`;

const CATEGORY_SEED = [
  ["Founder Story", "founder-story", "Indian founders who built businesses from scratch", "#1a1a1a", 1],
  ["Social Hero", "social-hero", "Changemakers and social entrepreneurs transforming India", "#dc2626", 2],
  ["Business Stories", "business-story", "Export, family, rural and women entrepreneur business stories", "#2563eb", 3],
  ["Brand Stories", "brand-story", "How iconic Indian brands were built and scaled", "#7c3aed", 4],
  ["Industry Stories", "industry-story", "Deep dives into Indian industries and sectors", "#059669", 5],
  ["Women Story", "women-story", "Indian women who built businesses against the odds", "#db2777", 6],
];

let schemaPromise;

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

function error(message, status = 400) {
  return json({ error: message }, status);
}

function parseJson(value, fallback) {
  if (value == null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function base64UrlEncode(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

async function createSession(username, secret) {
  const payload = base64UrlEncode(
    encoder.encode(JSON.stringify({ username, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE })),
  );
  const signature = base64UrlEncode(await hmac(payload, secret));
  return `${payload}.${signature}`;
}

async function readSession(request, secret) {
  if (!secret) return null;
  const cookie = request.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const value = token || bearer;
  if (!value || !value.includes(".")) return null;

  const [payload, suppliedSignature] = value.split(".", 2);
  const expected = await hmac(payload, secret);
  const supplied = base64UrlDecode(suppliedSignature);
  if (expected.length !== supplied.length) return null;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) mismatch |= expected[i] ^ supplied[i];
  if (mismatch !== 0) return null;

  const session = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
  if (!session?.username || !session?.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
  return session;
}

async function constantTimeEqual(a, b) {
  const [left, right] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(String(a))),
    crypto.subtle.digest("SHA-256", encoder.encode(String(b))),
  ]);
  const x = new Uint8Array(left);
  const y = new Uint8Array(right);
  let mismatch = 0;
  for (let i = 0; i < x.length; i += 1) mismatch |= x[i] ^ y[i];
  return mismatch === 0;
}

async function ensureSchema(db) {
  if (!schemaPromise) {
    schemaPromise = db.exec(SCHEMA_SQL).catch((cause) => {
      schemaPromise = undefined;
      throw cause;
    });
  }
  await schemaPromise;
}

async function requireAuth(request, env) {
  const session = await readSession(request, env.SESSION_SECRET);
  return session || null;
}

function mapFounder(row) {
  if (!row) return null;
  return {
    id: row.id,
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
    published: Boolean(row.published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapFounderSummary(row) {
  const founder = mapFounder(row);
  return {
    id: founder.id,
    slug: founder.slug,
    name: founder.name,
    designation: founder.designation,
    profileTag: founder.profileTag,
    category: founder.category,
    photoUrl: founder.photoUrl,
    published: founder.published,
    createdAt: founder.createdAt,
  };
}

function mapSection(row) {
  return {
    id: row.id,
    founderId: row.founder_id,
    locale: row.locale,
    sectionKey: row.section_key,
    pullQuote: row.pull_quote,
    bodyParagraphs: parseJson(row.body_paragraphs, []),
    jsonData: parseJson(row.json_data, null),
    sortOrder: row.sort_order,
  };
}

function mapSeo(row, founderId) {
  if (!row) {
    return {
      founderId,
      seoTitle: null,
      seoDescription: null,
      keywords: null,
      canonicalUrl: null,
      ogImage: null,
      ogTitle: null,
      twitterCard: "summary_large_image",
      schemaType: "Person",
      focusKeyword: null,
      robots: "index, follow",
    };
  }
  return {
    id: row.id,
    founderId: row.founder_id,
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
  };
}

function mapCategory(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    color: row.color,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function mapSubCategory(row) {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

async function requestBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function uniqueSlug(db, table, baseName, currentId = null) {
  const base = slugify(baseName) || "profile";
  let value = base;
  let suffix = 0;
  while (true) {
    const row = await db
      .prepare(`SELECT id FROM ${table} WHERE slug = ? LIMIT 1`)
      .bind(value)
      .first();
    if (!row || row.id === currentId) return value;
    suffix += 1;
    value = `${base}-${suffix}`;
  }
}

async function importData(db, payload) {
  const tables = ["founder_sections", "seo_meta", "sub_categories", "founders", "categories"];
  for (const table of tables) await db.prepare(`DELETE FROM ${table}`).run();

  const statements = [];
  for (const row of payload.categories || []) {
    statements.push(
      db.prepare(
        `INSERT INTO categories (id,name,slug,description,color,sort_order,created_at)
         VALUES (?,?,?,?,?,?,?)`,
      ).bind(row.id, row.name, row.slug, row.description, row.color, row.sortOrder, row.createdAt),
    );
  }
  for (const row of payload.founders || []) {
    statements.push(
      db.prepare(
        `INSERT INTO founders
         (id,slug,name,designation,profile_type,profile_tag,category,location,founded,revenue,employees,age,
          photo_url,cover_photo_url,one_liner,executive_summary,published,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      ).bind(
        row.id, row.slug, row.name, row.designation, row.profileType, row.profileTag, row.category,
        row.location, row.founded, row.revenue, row.employees, row.age, row.photoUrl, row.coverPhotoUrl,
        row.oneLiner, row.executiveSummary, row.published ? 1 : 0, row.createdAt, row.updatedAt,
      ),
    );
  }
  for (const row of payload.sections || []) {
    statements.push(
      db.prepare(
        `INSERT INTO founder_sections
         (id,founder_id,locale,section_key,pull_quote,body_paragraphs,json_data,sort_order)
         VALUES (?,?,?,?,?,?,?,?)`,
      ).bind(
        row.id, row.founderId, row.locale || "en", row.sectionKey, row.pullQuote,
        JSON.stringify(row.bodyParagraphs || []), row.jsonData == null ? null : JSON.stringify(row.jsonData),
        row.sortOrder || 0,
      ),
    );
  }
  for (const row of payload.seo || []) {
    statements.push(
      db.prepare(
        `INSERT INTO seo_meta
         (id,founder_id,seo_title,seo_description,keywords,canonical_url,og_image,og_title,
          twitter_card,schema_type,focus_keyword,robots)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      ).bind(
        row.id, row.founderId, row.seoTitle, row.seoDescription, row.keywords, row.canonicalUrl,
        row.ogImage, row.ogTitle, row.twitterCard, row.schemaType, row.focusKeyword, row.robots,
      ),
    );
  }
  for (const row of payload.subCategories || []) {
    statements.push(
      db.prepare(
        `INSERT INTO sub_categories
         (id,category_id,name,slug,description,sort_order,created_at)
         VALUES (?,?,?,?,?,?,?)`,
      ).bind(row.id, row.categoryId, row.name, row.slug, row.description, row.sortOrder, row.createdAt),
    );
  }
  if (statements.length) await db.batch(statements);
  return {
    founders: payload.founders?.length || 0,
    sections: payload.sections?.length || 0,
    seo: payload.seo?.length || 0,
    categories: payload.categories?.length || 0,
    subCategories: payload.subCategories?.length || 0,
  };
}

async function handleRequest(context) {
  const { request, env } = context;
  if (!env.DB) return error("Cloudflare D1 binding DB is not configured", 503);

  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
  const method = request.method.toUpperCase();

  if (method === "GET" && path === "healthz") {
    return json({ status: "ok", platform: "cloudflare" });
  }

  if (method === "POST" && path === "setup/import") {
    if (!env.MIGRATION_KEY || request.headers.get("x-migration-key") !== env.MIGRATION_KEY) {
      return error("Unauthorized", 401);
    }
    const payload = await requestBody(request);
    if (!payload) return error("Invalid import payload");
    return json(await importData(env.DB, payload));
  }

  if (method === "POST" && path === "auth/login") {
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
      return error("Admin authentication is not configured", 503);
    }
    const body = await requestBody(request);
    const username = String(body?.username || "");
    const password = String(body?.password || "");
    const expectedUsername = env.ADMIN_USERNAME || "admin";
    const valid =
      (await constantTimeEqual(username, expectedUsername)) &&
      (await constantTimeEqual(password, env.ADMIN_PASSWORD));
    if (!valid) return error("Invalid username or password", 401);
    const token = await createSession(expectedUsername, env.SESSION_SECRET);
    return json(
      { id: 1, username: expectedUsername },
      200,
      {
        "set-cookie": `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`,
      },
    );
  }

  if (method === "POST" && path === "auth/mobile-token") {
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) return error("Admin authentication is not configured", 503);
    const body = await requestBody(request);
    const expectedUsername = env.ADMIN_USERNAME || "admin";
    const valid =
      (await constantTimeEqual(String(body?.username || ""), expectedUsername)) &&
      (await constantTimeEqual(String(body?.password || ""), env.ADMIN_PASSWORD));
    if (!valid) return error("Invalid username or password", 401);
    const token = await createSession(expectedUsername, env.SESSION_SECRET);
    return json({ token, id: 1, username: expectedUsername });
  }

  if (method === "POST" && path === "auth/logout") {
    return json(
      { ok: true },
      200,
      { "set-cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0` },
    );
  }

  if (method === "GET" && path === "auth/me") {
    const session = await requireAuth(request, env);
    return session ? json({ id: 1, username: session.username }) : error("Not authenticated", 401);
  }

  if (method === "GET" && path === "public/founders") {
    const { results } = await env.DB
      .prepare("SELECT * FROM founders WHERE published = 1 ORDER BY updated_at DESC")
      .all();
    return json(results.map((row) => {
      const founder = mapFounder(row);
      return {
        slug: founder.slug,
        name: founder.name,
        designation: founder.designation,
        profileType: founder.profileType,
        profileTag: founder.profileTag,
        photoUrl: founder.photoUrl,
        coverPhotoUrl: founder.coverPhotoUrl,
        oneLiner: founder.oneLiner,
      };
    }));
  }

  if (method === "GET" && parts[0] === "public" && parts[1] === "founders" && parts[2]) {
    const founder = await env.DB.prepare("SELECT * FROM founders WHERE slug = ? AND published = 1 LIMIT 1")
      .bind(parts[2])
      .first();
    if (!founder) return error("Founder not found", 404);
    if (parts[3] === "sections") {
      const locale = url.searchParams.get("locale") || "en";
      const { results } = await env.DB
        .prepare("SELECT * FROM founder_sections WHERE founder_id = ? AND locale = ? ORDER BY sort_order")
        .bind(founder.id, locale)
        .all();
      return json(results.map(mapSection));
    }
    return json(mapFounder(founder));
  }

  if (method === "GET" && path === "public/social-heroes") {
    const { results } = await env.DB
      .prepare("SELECT * FROM founders WHERE profile_type = 'social-hero' AND published = 1 ORDER BY created_at")
      .all();
    return json(results.map((row) => {
      const founder = mapFounder(row);
      return {
        slug: founder.slug,
        name: founder.name,
        title: founder.designation,
        tag: founder.profileTag,
        photo: founder.photoUrl,
        coverPhoto: founder.coverPhotoUrl,
        location: founder.location,
        impact: founder.executiveSummary,
        founded: founder.founded,
        category: founder.category,
        pullQuote: founder.oneLiner,
      };
    }));
  }

  if (method === "GET" && parts[0] === "public" && parts[1] === "social-heroes" && parts[2]) {
    const founderRow = await env.DB
      .prepare("SELECT * FROM founders WHERE slug = ? AND profile_type = 'social-hero' AND published = 1 LIMIT 1")
      .bind(parts[2])
      .first();
    if (!founderRow) return error("Hero not found", 404);
    const founder = mapFounder(founderRow);
    let locale = url.searchParams.get("locale") || "en";
    let { results } = await env.DB
      .prepare("SELECT * FROM founder_sections WHERE founder_id = ? AND locale = ? ORDER BY sort_order")
      .bind(founder.id, locale)
      .all();
    if (!results.length && locale !== "en") {
      locale = "en";
      ({ results } = await env.DB
        .prepare("SELECT * FROM founder_sections WHERE founder_id = ? AND locale = ? ORDER BY sort_order")
        .bind(founder.id, locale)
        .all());
    }
    const sections = results.map(mapSection);
    const find = (key) => sections.find((section) => section.sectionKey === key);
    return json({
      slug: founder.slug,
      name: founder.name,
      title: founder.designation,
      tag: founder.profileTag,
      photo: founder.photoUrl,
      coverPhoto: founder.coverPhotoUrl,
      location: founder.location,
      impact: founder.executiveSummary,
      founded: founder.founded,
      category: founder.category,
      pullQuote: founder.oneLiner,
      story: find("story")?.bodyParagraphs || [],
      achievements: find("achievements")?.jsonData?.items || [],
      recognition: find("recognition")?.jsonData?.items || [],
      philosophy: find("philosophy")?.bodyParagraphs?.[0] || "",
    });
  }

  if (method === "GET" && parts[0] === "storage" && parts[1] === "objects") {
    if (!env.MEDIA) return error("Cloudflare R2 binding MEDIA is not configured", 503);
    const key = parts.slice(2).join("/");
    const object = await env.MEDIA.get(key);
    if (!object) return error("Object not found", 404);
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "public, max-age=31536000, immutable");
    return new Response(object.body, { headers });
  }

  const session = await requireAuth(request, env);
  if (!session) return error("Not authenticated", 401);

  if (method === "GET" && path === "dashboard/stats") {
    const { results } = await env.DB.prepare("SELECT category, published FROM founders").all();
    const categories = new Map();
    for (const row of results) {
      const name = row.category || "Uncategorized";
      categories.set(name, (categories.get(name) || 0) + 1);
    }
    const publishedFounders = results.filter((row) => Boolean(row.published)).length;
    return json({
      totalFounders: results.length,
      publishedFounders,
      draftFounders: results.length - publishedFounders,
      categories: [...categories].map(([name, count]) => ({ name, count })),
    });
  }

  if (method === "GET" && path === "founders") {
    const { results } = await env.DB.prepare("SELECT * FROM founders ORDER BY created_at DESC").all();
    return json(results.map(mapFounderSummary));
  }

  if (method === "POST" && path === "founders") {
    const body = await requestBody(request);
    if (!body?.name || !body?.designation) return error("name and designation are required");
    const slug = await uniqueSlug(env.DB, "founders", body.name);
    const now = new Date().toISOString();
    const row = await env.DB.prepare(
      `INSERT INTO founders
       (slug,name,designation,profile_type,profile_tag,category,location,founded,revenue,employees,age,
        photo_url,cover_photo_url,one_liner,executive_summary,published,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
    ).bind(
      slug, body.name, body.designation, body.profileType ?? null, body.profileTag ?? null,
      body.category ?? null, body.location ?? null, body.founded ?? null, body.revenue ?? null,
      body.employees ?? null, body.age ?? null, body.photoUrl ?? null, body.coverPhotoUrl ?? null,
      body.oneLiner ?? null, body.executiveSummary ?? null, body.published === false ? 0 : 1, now, now,
    ).first();
    return json(mapFounder(row), 201);
  }

  if (parts[0] === "founders" && parts[1]) {
    const founder = await env.DB.prepare("SELECT * FROM founders WHERE slug = ? LIMIT 1").bind(parts[1]).first();
    if (!founder) return error("Founder not found", 404);

    if (parts[2] === "sections") {
      if (method === "GET") {
        const locale = url.searchParams.get("locale") || "en";
        const { results } = await env.DB
          .prepare("SELECT * FROM founder_sections WHERE founder_id = ? AND locale = ? ORDER BY sort_order")
          .bind(founder.id, locale)
          .all();
        return json(results.map(mapSection));
      }
      if (method === "PUT") {
        const body = await requestBody(request);
        const locale = body?.locale || "en";
        if (!Array.isArray(body?.sections)) return error("sections must be an array");
        await env.DB.prepare("DELETE FROM founder_sections WHERE founder_id = ? AND locale = ?")
          .bind(founder.id, locale)
          .run();
        const statements = body.sections.map((section, index) =>
          env.DB.prepare(
            `INSERT INTO founder_sections
             (founder_id,locale,section_key,pull_quote,body_paragraphs,json_data,sort_order)
             VALUES (?,?,?,?,?,?,?) RETURNING *`,
          ).bind(
            founder.id, locale, section.sectionKey, section.pullQuote ?? null,
            JSON.stringify(section.bodyParagraphs || []),
            section.jsonData == null ? null : JSON.stringify(section.jsonData),
            index,
          ),
        );
        const inserted = statements.length ? await env.DB.batch(statements) : [];
        return json(inserted.map((result) => mapSection(result.results?.[0])));
      }
    }

    if (parts[2] === "seo") {
      if (method === "GET") {
        const seo = await env.DB.prepare("SELECT * FROM seo_meta WHERE founder_id = ? LIMIT 1")
          .bind(founder.id)
          .first();
        return json(mapSeo(seo, founder.id));
      }
      if (method === "PUT") {
        const body = (await requestBody(request)) || {};
        const row = await env.DB.prepare(
          `INSERT INTO seo_meta
           (founder_id,seo_title,seo_description,keywords,canonical_url,og_image,og_title,
            twitter_card,schema_type,focus_keyword,robots)
           VALUES (?,?,?,?,?,?,?,?,?,?,?)
           ON CONFLICT(founder_id) DO UPDATE SET
             seo_title=excluded.seo_title, seo_description=excluded.seo_description,
             keywords=excluded.keywords, canonical_url=excluded.canonical_url,
             og_image=excluded.og_image, og_title=excluded.og_title,
             twitter_card=excluded.twitter_card, schema_type=excluded.schema_type,
             focus_keyword=excluded.focus_keyword, robots=excluded.robots
           RETURNING *`,
        ).bind(
          founder.id, body.seoTitle ?? null, body.seoDescription ?? null, body.keywords ?? null,
          body.canonicalUrl ?? null, body.ogImage ?? null, body.ogTitle ?? null,
          body.twitterCard || "summary_large_image", body.schemaType || "Person",
          body.focusKeyword ?? null, body.robots || "index, follow",
        ).first();
        return json(mapSeo(row, founder.id));
      }
    }

    if (method === "GET") return json(mapFounder(founder));

    if (method === "PUT") {
      const body = (await requestBody(request)) || {};
      const fields = {
        name: "name",
        designation: "designation",
        profileType: "profile_type",
        profileTag: "profile_tag",
        category: "category",
        location: "location",
        founded: "founded",
        revenue: "revenue",
        employees: "employees",
        age: "age",
        photoUrl: "photo_url",
        coverPhotoUrl: "cover_photo_url",
        oneLiner: "one_liner",
        executiveSummary: "executive_summary",
        published: "published",
      };
      const entries = Object.entries(fields).filter(([key]) => Object.hasOwn(body, key));
      if (!entries.length) return json(mapFounder(founder));
      const set = entries.map(([, column]) => `${column} = ?`);
      const values = entries.map(([key]) => key === "published" ? (body[key] ? 1 : 0) : body[key]);
      set.push("updated_at = ?");
      values.push(new Date().toISOString(), parts[1]);
      const row = await env.DB
        .prepare(`UPDATE founders SET ${set.join(", ")} WHERE slug = ? RETURNING *`)
        .bind(...values)
        .first();
      return json(mapFounder(row));
    }

    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM founders WHERE slug = ?").bind(parts[1]).run();
      return json({ ok: true });
    }
  }

  if (method === "POST" && path === "seed-categories") {
    const inserted = [];
    const skipped = [];
    for (const category of CATEGORY_SEED) {
      const existing = await env.DB.prepare("SELECT id FROM categories WHERE slug = ? LIMIT 1").bind(category[1]).first();
      if (existing) {
        skipped.push(category[1]);
      } else {
        await env.DB.prepare(
          "INSERT INTO categories (name,slug,description,color,sort_order) VALUES (?,?,?,?,?)",
        ).bind(...category).run();
        inserted.push(category[1]);
      }
    }
    return json({ inserted, skipped });
  }

  if (method === "GET" && path === "categories") {
    const { results } = await env.DB.prepare("SELECT * FROM categories ORDER BY sort_order, name").all();
    return json(results.map(mapCategory));
  }

  if (method === "POST" && path === "categories") {
    const body = await requestBody(request);
    if (!body?.name?.trim()) return error("name is required");
    const slug = await uniqueSlug(env.DB, "categories", body.name);
    const row = await env.DB.prepare(
      `INSERT INTO categories (name,slug,description,color,sort_order,created_at)
       VALUES (?,?,?,?,?,?) RETURNING *`,
    ).bind(
      body.name.trim(), slug, body.description ?? null, body.color || "#6B7280",
      Number(body.sortOrder) || 0, new Date().toISOString(),
    ).first();
    return json(mapCategory(row), 201);
  }

  if (parts[0] === "categories" && parts[1] && parts[2] === "subcategories") {
    const categoryId = Number(parts[1]);
    if (method === "GET") {
      const { results } = await env.DB
        .prepare("SELECT * FROM sub_categories WHERE category_id = ? ORDER BY sort_order, name")
        .bind(categoryId)
        .all();
      return json(results.map(mapSubCategory));
    }
    if (method === "POST") {
      const body = await requestBody(request);
      if (!body?.name?.trim()) return error("name is required");
      const category = await env.DB.prepare("SELECT id FROM categories WHERE id = ?").bind(categoryId).first();
      if (!category) return error("Category not found", 404);
      const slug = await uniqueSlug(env.DB, "sub_categories", body.name);
      const row = await env.DB.prepare(
        `INSERT INTO sub_categories (category_id,name,slug,description,sort_order,created_at)
         VALUES (?,?,?,?,?,?) RETURNING *`,
      ).bind(
        categoryId, body.name.trim(), slug, body.description ?? null,
        Number(body.sortOrder) || 0, new Date().toISOString(),
      ).first();
      return json(mapSubCategory(row), 201);
    }
  }

  if (parts[0] === "categories" && parts[1] && parts.length === 2) {
    const id = Number(parts[1]);
    if (method === "PUT") {
      const body = await requestBody(request);
      if (!body?.name?.trim()) return error("name is required");
      const row = await env.DB.prepare(
        `UPDATE categories SET name=?,description=?,color=?,sort_order=? WHERE id=? RETURNING *`,
      ).bind(
        body.name.trim(), body.description ?? null, body.color || "#6B7280",
        Number(body.sortOrder) || 0, id,
      ).first();
      return row ? json(mapCategory(row)) : error("Category not found", 404);
    }
    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM categories WHERE id = ?").bind(id).run();
      return json({ ok: true });
    }
  }

  if (method === "GET" && path === "subcategories") {
    const { results } = await env.DB.prepare("SELECT * FROM sub_categories ORDER BY sort_order, name").all();
    return json(results.map(mapSubCategory));
  }

  if (parts[0] === "subcategories" && parts[1]) {
    const id = Number(parts[1]);
    if (method === "PUT") {
      const body = await requestBody(request);
      if (!body?.name?.trim()) return error("name is required");
      const row = await env.DB.prepare(
        `UPDATE sub_categories SET name=?,description=?,sort_order=? WHERE id=? RETURNING *`,
      ).bind(body.name.trim(), body.description ?? null, Number(body.sortOrder) || 0, id).first();
      return row ? json(mapSubCategory(row)) : error("Sub-category not found", 404);
    }
    if (method === "DELETE") {
      await env.DB.prepare("DELETE FROM sub_categories WHERE id = ?").bind(id).run();
      return new Response(null, { status: 204 });
    }
  }

  if (method === "POST" && path === "upload") {
    if (!env.MEDIA) return error("Cloudflare R2 binding MEDIA is not configured", 503);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return error("No file uploaded");
    if (!file.type.startsWith("image/")) return error("Only image files are allowed");
    if (file.size > 20 * 1024 * 1024) return error("File is too large");
    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const key = `uploads/${crypto.randomUUID()}.${extension}`;
    await env.MEDIA.put(key, file.stream(), {
      httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000" },
    });
    return json({ url: `/api/storage/objects/${key}` });
  }

  if (method === "GET" && path === "backup/list") {
    if (!env.MEDIA) return error("Cloudflare R2 binding MEDIA is not configured", 503);
    const objects = await env.MEDIA.list({ prefix: "backups/" });
    return json(objects.objects
      .sort((a, b) => b.uploaded.getTime() - a.uploaded.getTime())
      .slice(0, 7)
      .map((object) => ({
        name: object.key.replace(/^backups\//, ""),
        size: object.size,
        createdAt: object.uploaded.toISOString(),
      })));
  }

  if (method === "POST" && path === "backup/trigger") {
    if (!env.MEDIA) return error("Cloudflare R2 binding MEDIA is not configured", 503);
    const backup = {};
    for (const table of ["founders", "founder_sections", "seo_meta", "categories", "sub_categories"]) {
      backup[table] = (await env.DB.prepare(`SELECT * FROM ${table}`).all()).results;
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `profilebizz-${timestamp}.json`;
    await env.MEDIA.put(`backups/${filename}`, JSON.stringify(backup, null, 2), {
      httpMetadata: { contentType: "application/json" },
    });
    return json({ filename });
  }

  if (method === "GET" && parts[0] === "backup" && parts[1] === "download" && parts[2]) {
    if (!env.MEDIA) return error("Cloudflare R2 binding MEDIA is not configured", 503);
    const object = await env.MEDIA.get(`backups/${parts.slice(2).join("/")}`);
    if (!object) return error("Backup not found", 404);
    return new Response(object.body, {
      headers: {
        "content-type": "application/json",
        "content-disposition": `attachment; filename="${parts.at(-1)}"`,
      },
    });
  }

  return error("Not found", 404);
}

export async function onRequest(context) {
  try {
    return await handleRequest(context);
  } catch (cause) {
    console.error("ProfileBizz Cloudflare API error", cause);
    return error("Internal server error", 500);
  }
}
