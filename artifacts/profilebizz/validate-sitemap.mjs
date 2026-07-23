/**
 * Lightweight sitemap validation script.
 * Checks that all required crawlable URLs are present in public/sitemap.xml.
 * Run: node validate-sitemap.mjs
 *
 * This prevents future regressions where generate-og-pages.mjs STATIC_URLS
 * and public/sitemap.xml diverge.
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const REQUIRED_URLS = [
  // Homepage
  'https://profilebizz.com/',
  // Brand Stories
  'https://profilebizz.com/brand/amul',
  'https://profilebizz.com/brand/tata',
  'https://profilebizz.com/brand/parle',
  'https://profilebizz.com/brand/haldiram',
  'https://profilebizz.com/brand/mahindra',
  'https://profilebizz.com/brand/asian-paints',
  'https://profilebizz.com/brand/vedas-agro',
  // Industry Deep-Dives
  'https://profilebizz.com/industry/steel',
  'https://profilebizz.com/industry/agriculture',
  'https://profilebizz.com/industry/fmcg',
  'https://profilebizz.com/industry/it',
  'https://profilebizz.com/industry/healthcare',
  'https://profilebizz.com/industry/solar',
  'https://profilebizz.com/industry/ev',
  'https://profilebizz.com/industry/real-estate',
  'https://profilebizz.com/industry/scrap',
  'https://profilebizz.com/industry/biofuel',
  // City Business Directories
  'https://profilebizz.com/local/ahmedabad',
  'https://profilebizz.com/local/mumbai',
  'https://profilebizz.com/local/delhi',
  'https://profilebizz.com/local/surat',
  'https://profilebizz.com/local/rajkot',
  'https://profilebizz.com/local/vadodara',
  // Success Stories
  'https://profilebizz.com/success/business-growth',
  'https://profilebizz.com/success/startup-success',
  'https://profilebizz.com/success/export-success',
  'https://profilebizz.com/success/women-success',
  'https://profilebizz.com/success/youth-success',
  'https://profilebizz.com/success/village-success',
  // Social Impact
  'https://profilebizz.com/impact/ngo',
  'https://profilebizz.com/impact/education',
  'https://profilebizz.com/impact/healthcare',
  'https://profilebizz.com/impact/environment',
  'https://profilebizz.com/impact/village-development',
  'https://profilebizz.com/impact/csr',
  // Business News
  'https://profilebizz.com/news/funding',
  'https://profilebizz.com/news/expansion',
  'https://profilebizz.com/news/acquisitions',
  'https://profilebizz.com/news/new-products',
  'https://profilebizz.com/news/factory-launch',
  'https://profilebizz.com/news/awards',
  'https://profilebizz.com/news/govt-schemes',
  // Social Hero Profiles
  'https://profilebizz.com/social-hero',
  'https://profilebizz.com/social-hero/anshu-gupta',
  'https://profilebizz.com/social-hero/sonam-wangchuk',
  'https://profilebizz.com/social-hero/bindeshwar-pathak',
  'https://profilebizz.com/social-hero/ela-bhatt',
  'https://profilebizz.com/social-hero/arunachalam-muruganantham',
  'https://profilebizz.com/social-hero/rajendra-singh',
  // Women Stories
  'https://profilebizz.com/women-story',
  'https://profilebizz.com/women-story/falguni-nayar',
  'https://profilebizz.com/women-story/kiran-mazumdar-shaw',
  'https://profilebizz.com/women-story/vandana-luthra',
  'https://profilebizz.com/women-story/priya-paul',
  'https://profilebizz.com/women-story/indra-nooyi',
  'https://profilebizz.com/women-story/jyoti-naik',
];

function validateSitemap(sitemapPath) {
  let xml;
  try {
    xml = readFileSync(sitemapPath, 'utf-8');
  } catch (err) {
    console.error(`[validate-sitemap] ERROR: Cannot read ${sitemapPath}: ${err.message}`);
    process.exit(1);
  }

  const missing = [];
  for (const url of REQUIRED_URLS) {
    if (!xml.includes(`<loc>${url}</loc>`)) {
      missing.push(url);
    }
  }

  const totalUrls = (xml.match(/<loc>/g) || []).length;

  if (missing.length === 0) {
    console.log(`[validate-sitemap] ✓ All ${REQUIRED_URLS.length} required URLs found in sitemap (${totalUrls} total URLs).`);
    return true;
  } else {
    console.error(`[validate-sitemap] ✗ Missing ${missing.length} required URLs:`);
    for (const url of missing) console.error(`  - ${url}`);
    return false;
  }
}

// Validate public/sitemap.xml (source of truth / dev)
const publicSitemap = join(__dirname, 'public', 'sitemap.xml');
const ok = validateSitemap(publicSitemap);

if (!ok) {
  process.exit(1);
}
