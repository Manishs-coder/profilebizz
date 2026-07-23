/**
 * Post-build script: generates per-founder index.html files with correct
 * Open Graph / Twitter Card meta tags so social crawlers (WhatsApp, etc.)
 * see the right image + headline without executing JavaScript.
 *
 * Run automatically after `vite build` via the "build" npm script.
 */

import pg from 'pg';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL   = 'https://profilebizz.com';
const FALLBACK_IMAGE = `${SITE_URL}/og-cover.jpg`;

/* ── helpers ── */
function toAbsolute(url) {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

function truncate(text, max = 155) {
  if (!text) return '';
  return text.length <= max ? text : text.slice(0, max - 1) + '\u2026';
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHeadBlock(row, slug, locale) {
  const pageUrl    = locale === 'hi'
    ? `${SITE_URL}/founder/hi/${slug}`
    : `${SITE_URL}/founder/${slug}`;
  const ogTitle    = esc(`${row.name} \u2014 ${row.designation} | ProfileBizz`);
  const rawDesc    = row.one_liner || row.executive_summary
    || `Read the in-depth profile of ${row.name} on ProfileBizz \u2014 India\u2019s premier business magazine.`;
  const ogDesc     = esc(truncate(rawDesc));
  const ogImage    = toAbsolute(row.cover_photo_url || row.photo_url);
  const ogLocale   = locale === 'hi' ? 'hi_IN' : 'en_IN';

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${row.name} \u2014 ${row.designation} | ProfileBizz`,
    description: truncate(rawDesc),
    image: ogImage,
    url: pageUrl,
    author: { '@type': 'Organization', name: 'ProfileBizz Editorial' },
    publisher: {
      '@type': 'Organization',
      name: 'ProfileBizz',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  });

  return `
  <title>${ogTitle}</title>
  <meta name="description" content="${ogDesc}" />
  <link rel="canonical" href="${pageUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:site_name" content="ProfileBizz" />
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:description" content="${ogDesc}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${ogLocale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@profilebizz" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDesc}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta property="article:author" content="ProfileBizz Editorial" />
  <meta property="article:publisher" content="${SITE_URL}" />
  <script type="application/ld+json">${jsonLd}<\/script>`;
}

function injectHead(template, headBlock) {
  // Strip existing generic title/description/og/twitter tags
  let html = template
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta\s+name="description"[^>]*>/g, '')
    .replace(/<link\s+rel="canonical"[^>]*>/g, '')
    .replace(/<meta\s+property="og:[^>]*>/g, '')
    .replace(/<meta\s+name="twitter:[^>]*>/g, '')
    // Insert new block right after <head>
    .replace('<head>', `<head>${headBlock}`);
  return html;
}

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[og-gen] DATABASE_URL not set — skipping OG page generation');
    process.exit(0);
  }

  const distDir  = join(__dirname, 'dist', 'public');
  const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

  const client = new pg.Client({ connectionString: dbUrl });
  await client.connect();

  let founders;
  try {
    const result = await client.query(`
      SELECT slug, name, designation, one_liner, executive_summary,
             photo_url, cover_photo_url
      FROM   founders
      WHERE  published = true
    `);
    founders = result.rows;
  } finally {
    await client.end();
  }

  let count = 0;
  for (const row of founders) {
    const slug = row.slug;

    // English route: /founder/{slug}/index.html
    const enHtml = injectHead(template, buildHeadBlock(row, slug, 'en'));
    const enDir  = join(distDir, 'founder', slug);
    mkdirSync(enDir, { recursive: true });
    writeFileSync(join(enDir, 'index.html'), enHtml, 'utf-8');

    // Hindi route: /founder/hi/{slug}/index.html
    const hiHtml = injectHead(template, buildHeadBlock(row, slug, 'hi'));
    const hiDir  = join(distDir, 'founder', 'hi', slug);
    mkdirSync(hiDir, { recursive: true });
    writeFileSync(join(hiDir, 'index.html'), hiHtml, 'utf-8');

    console.log(`  \u2713 ${slug}`);
    count++;
  }

  console.log(`[og-gen] Generated OG pages for ${count} founders (en + hi).`);
}

main().catch(err => {
  // Non-fatal: log but don't break the deploy
  console.error('[og-gen] Failed:', err.message);
  process.exit(0);
});
