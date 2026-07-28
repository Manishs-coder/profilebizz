const SITE_URL = "https://profilebizz.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`;

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function xmlEscape(value) {
  return htmlEscape(value);
}

function absoluteUrl(value) {
  if (!value) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

function concise(value, length = 160) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= length) return text;
  return `${text.slice(0, length - 1).trim()}…`;
}

function parseJson(value, fallback) {
  if (value == null) return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function routeInfo(pathname) {
  const match = pathname.match(/^\/(founder|social-hero|women-story|brand|industry)\/(?:(hi)\/)?([^/]+)\/?$/);
  if (!match) return null;
  return {
    section: match[1],
    locale: match[2] === "hi" ? "hi" : "en",
    slug: decodeURIComponent(match[3]),
  };
}

function profilePath(row) {
  const category = String(row.category || "").toLowerCase();
  const type = String(row.profile_type || "").toLowerCase();
  if (type === "social-hero" || category.includes("social hero")) return `/social-hero/${row.slug}`;
  if (type === "brand" || category.includes("brand")) return `/brand/${row.slug}`;
  if (type === "industry" || category.includes("industry")) return `/industry/${row.slug}`;
  if (type === "women-story" || category.includes("women")) return `/women-story/${row.slug}`;
  return `/founder/${row.slug}`;
}

function schemaEntityType(row) {
  if (row.schema_type === "Organization" || row.profile_type === "brand") return "Organization";
  if (row.profile_type === "industry") return "Thing";
  return "Person";
}

async function getProfile(db, slug, locale) {
  const row = await db.prepare(
    `SELECT f.*, s.seo_title, s.seo_description, s.keywords, s.canonical_url,
            s.og_image, s.og_title, s.twitter_card, s.schema_type, s.robots,
            EXISTS(
              SELECT 1 FROM founder_sections hs
              WHERE hs.founder_id = f.id AND hs.locale = 'hi'
            ) AS has_hindi
       FROM founders f
       LEFT JOIN seo_meta s ON s.founder_id = f.id
      WHERE f.slug = ? AND f.published = 1
      LIMIT 1`,
  ).bind(slug).first();
  if (!row) return null;

  let { results } = await db.prepare(
    `SELECT section_key, pull_quote, body_paragraphs, json_data, sort_order
       FROM founder_sections
      WHERE founder_id = ? AND locale = ?
      ORDER BY sort_order`,
  ).bind(row.id, locale).all();
  if (!results.length && locale !== "en") {
    ({ results } = await db.prepare(
      `SELECT section_key, pull_quote, body_paragraphs, json_data, sort_order
         FROM founder_sections
        WHERE founder_id = ? AND locale = 'en'
        ORDER BY sort_order`,
    ).bind(row.id).all());
  }
  return { row, sections: results || [] };
}

function resolvedSeo(profile, info) {
  const { row, sections } = profile;
  const currentUrl = `${SITE_URL}${info.locale === "hi"
    ? `/${info.section}/hi/${row.slug}`
    : `/${info.section}/${row.slug}`}`;
  const firstParagraph = sections
    .flatMap((section) => parseJson(section.body_paragraphs, []))
    .find(Boolean);
  const description = concise(
    row.seo_description ||
    row.one_liner ||
    row.executive_summary ||
    firstParagraph ||
    `Read the complete profile of ${row.name} on ProfileBizz.`,
  );
  const title = row.seo_title || `${row.name} — ${row.designation || row.category || "Profile"} | ProfileBizz`;
  const canonical = info.locale === "hi" ? currentUrl : (row.canonical_url || currentUrl);
  const image = absoluteUrl(row.og_image || row.cover_photo_url || row.photo_url);
  const entityType = schemaEntityType(row);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: row.og_title || title,
        description,
        image,
        url: canonical,
        datePublished: row.created_at || undefined,
        dateModified: row.updated_at || undefined,
        author: { "@type": "Organization", name: "ProfileBizz Editorial", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "ProfileBizz",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        about: { "@id": `${canonical}#entity` },
      },
      {
        "@type": entityType,
        "@id": `${canonical}#entity`,
        name: row.name,
        description,
        url: canonical,
        image,
        ...(entityType === "Person" && row.designation ? { jobTitle: row.designation } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: row.name, item: canonical },
        ],
      },
    ],
  };
  return {
    title,
    description,
    canonical,
    image,
    keywords: row.keywords || "",
    robots: row.robots || "index, follow",
    twitterCard: row.twitter_card || "summary_large_image",
    graph,
  };
}

function metadataHtml(seo, profile, info) {
  const { row } = profile;
  const alternate = row.has_hindi
    ? (info.locale === "hi"
      ? `${SITE_URL}/${info.section}/${row.slug}`
      : `${SITE_URL}/${info.section}/hi/${row.slug}`)
    : null;
  return `
    <title>${htmlEscape(seo.title)}</title>
    <meta name="description" content="${htmlEscape(seo.description)}">
    ${seo.keywords ? `<meta name="keywords" content="${htmlEscape(seo.keywords)}">` : ""}
    <meta name="robots" content="${htmlEscape(seo.robots)}">
    <link rel="canonical" href="${htmlEscape(seo.canonical)}">
    ${alternate ? `<link rel="alternate" hreflang="${info.locale === "hi" ? "en" : "hi"}" href="${htmlEscape(alternate)}">` : ""}
    ${alternate ? `<link rel="alternate" hreflang="x-default" href="${htmlEscape(info.locale === "hi" ? alternate : seo.canonical)}">` : ""}
    <meta property="og:type" content="article">
    <meta property="og:url" content="${htmlEscape(seo.canonical)}">
    <meta property="og:site_name" content="ProfileBizz">
    <meta property="og:title" content="${htmlEscape(profile.row.og_title || seo.title)}">
    <meta property="og:description" content="${htmlEscape(seo.description)}">
    <meta property="og:image" content="${htmlEscape(seo.image)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="${info.locale === "hi" ? "hi_IN" : "en_IN"}">
    <meta name="twitter:card" content="${htmlEscape(seo.twitterCard)}">
    <meta name="twitter:site" content="@profilebizz">
    <meta name="twitter:title" content="${htmlEscape(profile.row.og_title || seo.title)}">
    <meta name="twitter:description" content="${htmlEscape(seo.description)}">
    <meta name="twitter:image" content="${htmlEscape(seo.image)}">
    ${profile.row.created_at ? `<meta property="article:published_time" content="${htmlEscape(profile.row.created_at)}">` : ""}
    ${profile.row.updated_at ? `<meta property="article:modified_time" content="${htmlEscape(profile.row.updated_at)}">` : ""}
    <script type="application/ld+json">${JSON.stringify(seo.graph).replace(/</g, "\\u003c")}</script>`;
}

function semanticArticle(profile, seo) {
  const { row, sections } = profile;
  const sectionHtml = sections.map((section) => {
    const heading = String(section.section_key || "Story").replace(/[-_]+/g, " ");
    const paragraphs = parseJson(section.body_paragraphs, [])
      .filter((paragraph) => typeof paragraph === "string" && paragraph.trim())
      .map((paragraph) => `<p>${htmlEscape(paragraph)}</p>`)
      .join("");
    const quote = section.pull_quote ? `<blockquote>${htmlEscape(section.pull_quote)}</blockquote>` : "";
    return paragraphs || quote ? `<section><h2>${htmlEscape(heading)}</h2>${quote}${paragraphs}</section>` : "";
  }).join("");
  return `<article data-profilebizz-server-content>
    <header>
      <p>ProfileBizz</p>
      <h1>${htmlEscape(row.name)}</h1>
      ${row.designation ? `<p>${htmlEscape(row.designation)}</p>` : ""}
      <img src="${htmlEscape(seo.image)}" alt="${htmlEscape(`${row.name} profile`)}" width="1200" height="630" loading="eager">
      <p>${htmlEscape(seo.description)}</p>
      ${row.created_at ? `<time datetime="${htmlEscape(row.created_at)}">Published ${htmlEscape(String(row.created_at).slice(0, 10))}</time>` : ""}
      ${row.updated_at ? `<time datetime="${htmlEscape(row.updated_at)}">Updated ${htmlEscape(String(row.updated_at).slice(0, 10))}</time>` : ""}
    </header>
    ${sectionHtml}
  </article>`;
}

function injectProfileHtml(html, profile, info) {
  const seo = resolvedSeo(profile, info);
  let output = html
    .replace(/<title[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\s+(?:name|property)=["'](?:description|keywords|robots|og:[^"']+|twitter:[^"']+|article:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["'](?:canonical|alternate)["'][^>]*>/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");
  output = output.replace("</head>", `${metadataHtml(seo, profile, info)}\n</head>`);
  const article = semanticArticle(profile, seo);
  output = output.replace(/<div\s+id=["']root["']\s*>\s*<\/div>/i, `<div id="root">${article}</div>`);
  return output;
}

function notFoundPage() {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><title>Profile not found | ProfileBizz</title></head><body><main><h1>Profile not found</h1><p>The requested profile is unavailable.</p><a href="/">Back to ProfileBizz</a></main></body></html>`,
    { status: 404, headers: { "content-type": "text/html; charset=UTF-8" } },
  );
}

async function sitemap(db) {
  const { results } = await db.prepare(
    `SELECT f.slug, f.profile_type, f.category, f.updated_at,
            EXISTS(
              SELECT 1 FROM founder_sections hs
              WHERE hs.founder_id = f.id AND hs.locale = 'hi'
            ) AS has_hindi
       FROM founders f
      WHERE f.published = 1
      ORDER BY f.updated_at DESC`,
  ).all();
  const staticUrls = ["/", "/social-hero", "/women-story"];
  const entries = staticUrls.map((path) => ({ path, lastmod: null }));
  for (const row of results || []) {
    const path = profilePath(row);
    entries.push({ path, lastmod: row.updated_at });
    if (row.has_hindi && (path.startsWith("/founder/") || path.startsWith("/social-hero/"))) {
      const [section, slug] = path.slice(1).split("/");
      entries.push({ path: `/${section}/hi/${slug}`, lastmod: row.updated_at });
    }
  }
  const body = entries.map(({ path, lastmod }) => `
  <url>
    <loc>${xmlEscape(`${SITE_URL}${path}`)}</loc>
    ${lastmod ? `<lastmod>${xmlEscape(String(lastmod).slice(0, 10))}</lastmod>` : ""}
  </url>`).join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}\n</urlset>`,
    {
      headers: {
        "content-type": "application/xml; charset=UTF-8",
        "cache-control": "public, max-age=300, s-maxage=300",
      },
    },
  );
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname.startsWith("/admin/")) {
    const lastSegment = url.pathname.split("/").pop() || "";
    if (!lastSegment.includes(".")) {
      const adminUrl = new URL(context.request.url);
      adminUrl.pathname = "/admin/";
      return context.next(new Request(adminUrl, context.request));
    }
    return context.next();
  }
  if (url.pathname === "/sitemap.xml" && context.env.DB) return sitemap(context.env.DB);

  const info = routeInfo(url.pathname);
  if (!info || context.request.method !== "GET") return context.next();
  if (url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url.toString(), 301);
  }
  const assetUrl = new URL(context.request.url);
  assetUrl.pathname = `${assetUrl.pathname}/`;
  if (!context.env.DB) return context.next(new Request(assetUrl, context.request));

  const profile = await getProfile(context.env.DB, info.slug, info.locale);
  if (!profile) return notFoundPage();

  const response = await context.next(new Request(assetUrl, context.request));
  if (!response.headers.get("content-type")?.includes("text/html")) return response;
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=UTF-8");
  headers.set("cache-control", "public, max-age=300, s-maxage=300");
  return new Response(injectProfileHtml(await response.text(), profile, info), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
