/**
 * ProfileBizz production server.
 *
 * Features:
 *  1. Proper cache headers — HTML: no-cache, assets: 1 year immutable
 *  2. Bot / social-crawler detection → server-side OG tag injection
 *     so WhatsApp, Facebook, Twitter etc. see real meta tags without JS
 *  3. SPA fallback for all non-asset routes
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC  = path.join(__dirname, 'dist', 'public');
const PORT    = parseInt(process.env.PORT || '3000', 10);
const API_PORT = parseInt(process.env.API_PORT || '8080', 10);
const SITE_URL = 'https://profilebizz.com';

// ── Bot detection ─────────────────────────────────────────────────────────────
const BOT_UA = /whatsapp|facebookexternalhit|twitterbot|linkedinbot|slackbot|telegrambot|googlebot|bingbot|duckduckbot|applebot|discordbot|vkshare|pinterest|w3c_validator/i;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

// Long-lived asset extensions (have content hash in filename)
const IMMUTABLE_EXTS = new Set(['.js', '.css', '.woff', '.woff2', '.ttf']);

function cacheHeader(ext) {
  if (ext === '.html' || ext === '') {
    // Always revalidate HTML
    return 'no-cache, no-store, must-revalidate';
  }
  if (IMMUTABLE_EXTS.has(ext)) {
    return 'public, max-age=31536000, immutable';
  }
  // Images / other: 1 hour
  return 'public, max-age=3600';
}

function serveFile(res, filePath, status = 200, extraHeaders = {}) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  const content = fs.readFileSync(filePath);
  res.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': cacheHeader(ext),
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  });
  res.end(content);
}

// ── Internal API fetch ────────────────────────────────────────────────────────
function fetchJson(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(
      { host: '127.0.0.1', port: API_PORT, path: urlPath, timeout: 4000 },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try { resolve(res.statusCode === 200 ? JSON.parse(body) : null); }
          catch { resolve(null); }
        });
      }
    );
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

// ── OG tag injection ──────────────────────────────────────────────────────────
function escAttr(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function injectOG(html, { title, description, image, url, locale }) {
  const img = image && image.startsWith('http') ? image : `${SITE_URL}${image || '/og-default.jpg'}`;
  const tags = `
    <meta name="description" content="${escAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="ProfileBizz" />
    <meta property="og:url" content="${escAttr(url)}" />
    <meta property="og:title" content="${escAttr(title)}" />
    <meta property="og:description" content="${escAttr(description)}" />
    <meta property="og:image" content="${escAttr(img)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${escAttr(locale)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@profilebizz" />
    <meta name="twitter:title" content="${escAttr(title)}" />
    <meta name="twitter:description" content="${escAttr(description)}" />
    <meta name="twitter:image" content="${escAttr(img)}" />
    <title>${escAttr(title)}</title>`.trim();

  // Remove placeholder title, inject real tags before </head>
  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace('</head>', `${tags}\n  </head>`);
}

// ── Route handlers ────────────────────────────────────────────────────────────

// /founder/:slug  or  /founder/hi/:slug
const FOUNDER_RE   = /^\/founder\/(?:(hi)\/)?([\w-]+)\/?$/;
// /social-hero/:slug  or  /social-hero/hi/:slug
const HERO_RE      = /^\/social-hero\/(?:(hi)\/)?([\w-]+)\/?$/;

async function buildOGHtml(urlPath) {
  const spaHtml = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');

  let m;
  if ((m = FOUNDER_RE.exec(urlPath))) {
    const [, lang, slug] = m;
    const locale = lang === 'hi' ? 'hi_IN' : 'en_IN';
    const pageUrl = lang === 'hi' ? `${SITE_URL}/founder/hi/${slug}` : `${SITE_URL}/founder/${slug}`;

    const data = await fetchJson(`/api/public/founders/${slug}${lang ? `?locale=${lang}` : ''}`);
    if (!data) return spaHtml; // API down — fallback, bot sees SPA shell

    const title       = `${data.name} — ${data.designation} | ProfileBizz`;
    const description = data.oneLiner || data.executiveSummary || `Read the story of ${data.name} on ProfileBizz.`;
    const image       = data.photoUrl || '/og-default.jpg';
    return injectOG(spaHtml, { title, description, image, url: pageUrl, locale });
  }

  if ((m = HERO_RE.exec(urlPath))) {
    const [, lang, slug] = m;
    const locale = lang === 'hi' ? 'hi_IN' : 'en_IN';
    const pageUrl = lang === 'hi' ? `${SITE_URL}/social-hero/hi/${slug}` : `${SITE_URL}/social-hero/${slug}`;

    const data = await fetchJson(`/api/public/social-heroes/${slug}${lang ? `?locale=${lang}` : ''}`);
    if (!data) return spaHtml;

    const title       = `${data.name} — ${data.designation} | ProfileBizz`;
    const description = data.oneLiner || data.executiveSummary || `Read the story of ${data.name} on ProfileBizz.`;
    const image       = data.photoUrl || '/og-default.jpg';
    return injectOG(spaHtml, { title, description, image, url: pageUrl, locale });
  }

  return null; // not a known dynamic route
}

// ── Server ─────────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0].replace(/\/+$/, '') || '/';
  const ua      = req.headers['user-agent'] || '';
  const isBot   = BOT_UA.test(ua);

  // 1. Exact static file
  const exactFile = path.join(PUBLIC, urlPath);
  if (fs.existsSync(exactFile) && fs.statSync(exactFile).isFile()) {
    return serveFile(res, exactFile);
  }

  // 2. Bot on a dynamic route → inject server-side OG tags
  if (isBot) {
    try {
      const html = await buildOGHtml(urlPath);
      if (html) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        });
        return res.end(html);
      }
    } catch (e) {
      // fall through to SPA
    }
  }

  // 3. SPA fallback
  const spaFile = path.join(PUBLIC, 'index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  });
  res.end(fs.readFileSync(spaFile));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[profilebizz] Server listening on port ${PORT}`);
});
