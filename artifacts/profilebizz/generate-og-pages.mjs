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

/* ── Static content pages — pre-rendered OG/Twitter HTML for WhatsApp / crawlers ── */
const STATIC_OG_PAGES = [
  // ── Brand Stories ──
  { path: 'brand/amul',        title: "Amul — The Taste of India | ProfileBizz",            desc: "Born from farmer exploitation, Amul became the world's largest milk cooperative — a 78-year-old brand that still makes every Indian think of butter every morning.", image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80' },
  { path: 'brand/parle',       title: "Parle — G for Genius | ProfileBizz",                 desc: "The biscuit that fed a nation — Parle-G is the world's largest-selling biscuit, with 100 crore biscuits sold every day, still at ₹5 a pack.",                  image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=80' },
  { path: 'brand/haldiram',    title: "Haldiram's — The Taste of Tradition | ProfileBizz",  desc: "From a small bhujia shop in Bikaner to a ₹12,000 Crore global snack empire — Haldiram's is proof that Indian street food can become a world-class brand.",    image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=1200&q=80' },
  { path: 'brand/tata',        title: "Tata Group — Leadership with Trust | ProfileBizz",   desc: "India's most trusted business group — a 156-year-old conglomerate that built the nation's first steel plant, airline, and luxury hotel chain.",              image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80' },
  { path: 'brand/mahindra',    title: "Mahindra — Rise | ProfileBizz",                      desc: "From selling US-licensed Willys Jeeps in 1945 to building India's best-selling SUVs and the world's largest tractor company — Mahindra's 79-year journey.",    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80' },
  { path: 'brand/asian-paints',title: "Asian Paints — Har Ghar Kuch Kehta Hai | ProfileBizz", desc: "Started by four friends with ₹3,700 each in 1942, Asian Paints became India's largest and Asia's third-largest paint company.",                           image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80' },
  { path: 'brand/vedas-agro',  title: "Vedas Agro — From Soil to Success | ProfileBizz",    desc: "Vedas Agro started as a mustard oil mill and grew into a diversified agri-processing company — ₹8 Lakh to ₹120 Crore, first-generation entrepreneur story.", image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80' },

  // ── Industry Deep-Dives ──
  { path: 'industry/steel',       title: "India's Steel Industry — ₹2.5 Lakh Crore | ProfileBizz",           desc: "An in-depth look at India's steel industry — the world's second largest, covering the full value chain, key players, challenges, and green steel opportunities.", image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80' },
  { path: 'industry/scrap',       title: "India's Scrap Industry — ₹1.2 Lakh Crore Circular Economy | ProfileBizz", desc: "India's scrap and recycling industry is the backbone of its circular economy — how scrap metal feeds the steel sector and drives sustainable growth.",       image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80' },
  { path: 'industry/agriculture', title: "India's Agriculture Sector — ₹20 Lakh Crore Foundation | ProfileBizz",  desc: "Agriculture is India's foundation — 140 million farm households, 52% irrigated area, and a sector on the cusp of an agritech revolution.",                 image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80' },
  { path: 'industry/fmcg',        title: "India's FMCG Industry — ₹5.8 Lakh Crore Consumer Goods | ProfileBizz", desc: "India's FMCG sector is among the world's fastest-growing — from kiranas to quick commerce, discover who makes India's most consumed products.",             image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80' },
  { path: 'industry/solar',       title: "India's Solar Energy Industry — ₹1.8 Lakh Crore | ProfileBizz",        desc: "India is on track to reach 500 GW of renewable energy by 2030. Solar is leading the charge — discover the players, the economics, and the opportunity.",    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80' },
  { path: 'industry/ev',          title: "India's Electric Vehicle Industry — Future Mobility | ProfileBizz",     desc: "India's EV revolution is underway — from Ola Electric to Tata Motors, discover the companies, policies, and market forces reshaping how India moves.",     image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80' },
  { path: 'industry/biofuel',     title: "India's Biofuel Industry — ₹35,000 Crore Green Energy | ProfileBizz",  desc: "India's National Biofuel Policy targets 20% ethanol blending by 2025. Discover how this green energy sector is transforming rural economies.",              image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80' },
  { path: 'industry/real-estate', title: "India's Real Estate Industry — ₹13 Lakh Crore Infra | ProfileBizz",    desc: "India's real estate sector is among the largest contributors to GDP — discover the developers, RERA reforms, and the affordable housing opportunity.",       image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80' },
  { path: 'industry/healthcare',  title: "India's Healthcare Industry — ₹8.6 Lakh Crore | ProfileBizz",          desc: "India's healthcare sector is expanding rapidly — from pharma exports to hospital chains and health-tech startups transforming access and outcomes.",        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80' },
  { path: 'industry/it',          title: "India's IT & Technology Industry — ₹10.4 Lakh Crore | ProfileBizz",    desc: "India's IT industry is the world's largest tech exporter — discover the companies, talent ecosystem, and digital transformation driving ₹10 lakh crore.",  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80' },

  // ── City Business Directories ──
  { path: 'local/ahmedabad', title: "Ahmedabad Business Directory — Textile & Trade Capital | ProfileBizz", desc: "Ahmedabad is Gujarat's commercial heart with 4.2 lakh+ businesses — from textile mills to diamond merchants and new-age startups.", image: null },
  { path: 'local/rajkot',    title: "Rajkot Business Directory — Engineering Hub | ProfileBizz",            desc: "Rajkot is India's engineering hub with 1.8 lakh+ businesses — home to auto parts, brass components, and clock manufacturing.", image: null },
  { path: 'local/vadodara',  title: "Vadodara Business Directory — Chemical & Pharma Belt | ProfileBizz",  desc: "Vadodara's 2.1 lakh+ businesses span chemicals, pharmaceuticals, engineering, and petrochemicals — Gujarat's industrial powerhouse.", image: null },
  { path: 'local/delhi',     title: "Delhi NCR Business Directory — India's Business Capital | ProfileBizz",desc: "Delhi NCR's 12 lakh+ businesses make it India's commercial nerve centre — covering trade, manufacturing, services, and startups.", image: null },
  { path: 'local/surat',     title: "Surat Business Directory — Diamond & Textile City | ProfileBizz",     desc: "Surat handles 90% of the world's rough diamond cutting and polishing, plus a thriving textile industry with 3.5 lakh+ businesses.", image: null },
  { path: 'local/mumbai',    title: "Mumbai Business Directory — Financial Capital of India | ProfileBizz", desc: "Mumbai's 15 lakh+ businesses drive India's finance, media, entertainment, and trade — the city where India's biggest deals are made.", image: null },

  // ── Success Stories ──
  { path: 'success/business-growth', title: "Business Growth Success Stories — India | ProfileBizz",   desc: "Inspiring stories of Indian businesses that scaled from zero to crores — real strategies, real founders, real growth milestones.",            image: null },
  { path: 'success/export-success',  title: "Export Success Stories — Made in India | ProfileBizz",    desc: "Indian businesses that conquered global markets — how entrepreneurs built export empires from small towns and factories across Bharat.",   image: null },
  { path: 'success/startup-success', title: "Startup Success Stories — Zero to One India | ProfileBizz",desc: "India's best startup journeys — from garage ideas to funded ventures. Real founder stories of building from scratch.",                    image: null },
  { path: 'success/women-success',   title: "Women Success Stories — Trailblazers of India | ProfileBizz",desc: "India's women entrepreneurs breaking barriers and building legacies — stories of grit, innovation, and trailblazing success.",          image: null },
  { path: 'success/youth-success',   title: "Youth Success Stories — Gen Z & Millennials India | ProfileBizz",desc: "India's young founders building the future — Gen Z and millennial entrepreneurs disrupting industries at remarkable speed.",         image: null },
  { path: 'success/village-success', title: "Village Success Stories — Bharat Rising | ProfileBizz",   desc: "India's rural entrepreneurs transforming villages into business hubs — the unstoppable rise of Bharat from grassroots to crores.",        image: null },

  // ── Social Impact ──
  { path: 'impact/ngo',                 title: "NGO Impact Stories — Community Champions India | ProfileBizz",      desc: "India's NGOs solving society's hardest problems — community champions working in education, health, livelihoods, and more.",             image: null },
  { path: 'impact/education',           title: "Education Impact Stories — Learning for All India | ProfileBizz",   desc: "Changemakers building schools, EdTech platforms, and literacy programmes to make quality education accessible to every Indian child.", image: null },
  { path: 'impact/healthcare',          title: "Healthcare Impact Stories — Health Equity India | ProfileBizz",     desc: "Social entrepreneurs delivering healthcare to India's underserved — affordable clinics, mobile health units, and life-saving innovations.", image: null },
  { path: 'impact/environment',         title: "Environment Impact Stories — Healing the Planet | ProfileBizz",    desc: "India's environmental warriors fighting pollution, planting forests, cleaning rivers, and building a cleaner, greener nation.",        image: null },
  { path: 'impact/village-development', title: "Village Development Stories — Bharat Rising | ProfileBizz",        desc: "Social innovators transforming India's villages — building roads, sanitation, water access, and economic opportunity at the grassroots.", image: null },
  { path: 'impact/csr',                 title: "CSR Impact Stories — Corporate Giving Back India | ProfileBizz",   desc: "How India's leading corporations are turning profits into purpose — the best CSR programmes transforming communities.",                image: null },

  // ── Business News ──
  { path: 'news/funding',        title: "India Startup Funding News — Investments & Rounds | ProfileBizz", desc: "Latest funding rounds, venture capital deals, and investment news from India's startup ecosystem.",           image: null },
  { path: 'news/expansion',      title: "India Business Expansion News — Growth & New Markets | ProfileBizz", desc: "Indian companies entering new markets, opening new offices, and expanding their footprint across Bharat and the world.", image: null },
  { path: 'news/factory-launch', title: "India Factory Launch News — Manufacturing India | ProfileBizz",   desc: "New manufacturing plants, factory launches, and industrial investment news from across India's Make in India drive.", image: null },
  { path: 'news/new-products',   title: "India Product Launch News — Launches & Innovations | ProfileBizz",desc: "Latest product launches and innovations from India's most dynamic companies and startups.",                   image: null },
  { path: 'news/acquisitions',   title: "India M&A News — Mergers & Acquisitions | ProfileBizz",          desc: "Business acquisitions, mergers, and strategic deals reshaping India's corporate landscape.",                   image: null },
  { path: 'news/awards',         title: "India Business Awards — Recognition & Rankings | ProfileBizz",    desc: "Awards, rankings, and recognition for India's top companies, founders, and entrepreneurs.",                  image: null },
  { path: 'news/govt-schemes',   title: "India Government Schemes for Business | ProfileBizz",             desc: "Government schemes, PLI incentives, and policy news that every Indian entrepreneur and business owner needs to know.", image: null },

  // ── Social Hero Profiles ──
  { path: 'social-hero/anshu-gupta',              title: "Anshu Gupta — Founder of Goonj | ProfileBizz",                          desc: "Anshu Gupta transformed discarded urban cloth into dignity for millions — how Goonj made clothing a tool for disaster relief and rural development.", image: 'https://profilebizz.com/anshu-gupta.png' },
  { path: 'social-hero/sonam-wangchuk',           title: "Sonam Wangchuk — The Innovator Transforming Ladakh | ProfileBizz",      desc: "Sonam Wangchuk invented the Ice Stupa to solve Ladakh's water crisis and revolutionised education for Himalayan children. Real engineer, real impact.", image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
  { path: 'social-hero/bindeshwar-pathak',        title: "Dr. Bindeshwar Pathak — Sulabh International Founder | ProfileBizz",    desc: "Dr. Pathak's Sulabh International brought safe sanitation to 50 crore Indians — a sanitation revolution that gave dignity back to manual scavengers.", image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80' },
  { path: 'social-hero/ela-bhatt',                title: "Ela Bhatt — Founder of SEWA | ProfileBizz",                             desc: "Ela Bhatt's Self-Employed Women's Association empowered 2.5 million informal women workers — a labour movement that became a global model.", image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80' },
  { path: 'social-hero/arunachalam-muruganantham',title: "Arunachalam Muruganantham — The Padman of India | ProfileBizz",         desc: "A school dropout from Tamil Nadu who invented low-cost sanitary pads and put menstrual health in reach of rural women across India.", image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80' },
  { path: 'social-hero/rajendra-singh',           title: "Rajendra Singh — The Waterman of India | ProfileBizz",                  desc: "Rajendra Singh revived five rivers and recharged 1,000+ villages in Rajasthan using ancient johad water-harvesting — winning the Magsaysay Award.", image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80' },

  // ── Women Stories ──
  { path: 'women-story/falguni-nayar',       title: "Falguni Nayar — Founder & CEO, Nykaa | ProfileBizz",                    desc: "\"I was 50 years old when I started Nykaa.\" Falguni Nayar built India's first profitable unicorn led by a woman, from zero to ₹1 lakh crore valuation.", image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80' },
  { path: 'women-story/kiran-mazumdar-shaw', title: "Kiran Mazumdar-Shaw — Founder, Biocon | ProfileBizz",                   desc: "Started Biocon in a garage with ₹10,000. Kiran Mazumdar-Shaw built India's largest biopharma company and became one of the world's most influential businesswomen.", image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80' },
  { path: 'women-story/vandana-luthra',      title: "Vandana Luthra — Founder, VLCC | ProfileBizz",                          desc: "In 1989, wellness wasn't an industry in India. Vandana Luthra created the market before she could sell to it — building VLCC into a pan-Asia beauty empire.", image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80' },
  { path: 'women-story/priya-paul',         title: "Priya Paul — Chairperson, Apeejay Surrendra Park Hotels | ProfileBizz", desc: "Priya Paul didn't compete with Taj on scale — she competed on identity. How The Park Hotels became India's most distinctive boutique luxury brand.", image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80' },
  { path: 'women-story/indra-nooyi',        title: "Indra Nooyi — Former CEO, PepsiCo | ProfileBizz",                       desc: "From a middle-class family in Chennai to the longest-serving woman CEO of a Fortune 50 company — Indra Nooyi's story of authenticity, ambition, and impact.", image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&q=80' },
  { path: 'women-story/jyoti-naik',         title: "Jyoti Naik — Lijjat Papad, Sisterhood of ₹1,600 Crore | ProfileBizz",  desc: "7 women, ₹80 borrowed, and a papads recipe. Jyoti Naik's Lijjat grew into a ₹1,600 crore cooperative where every woman is an equal owner.", image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80' },
];

function buildStaticHeadBlock({ path, title, desc, image }) {
  const pageUrl  = `${SITE_URL}/${path}`;
  const safeTitle = esc(title);
  const safeDesc  = esc(truncate(desc));
  const ogImage   = image || FALLBACK_IMAGE;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: truncate(desc),
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
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}" />
  <link rel="canonical" href="${pageUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:site_name" content="ProfileBizz" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@profilebizz" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${ogImage}" />
  <script type="application/ld+json">${jsonLd}<\/script>`;
}

function buildStaticPages(distDir, template) {
  let count = 0;
  for (const page of STATIC_OG_PAGES) {
    const headBlock = buildStaticHeadBlock(page);
    const html      = injectHead(template, headBlock);
    const parts     = page.path.split('/');
    const dir       = join(distDir, ...parts);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');
    count++;
  }
  console.log(`[og-gen] Pre-rendered OG HTML for ${count} static content pages (brands, industries, cities, categories, profiles).`);
}

const SITE_URL_BASE = 'https://profilebizz.com';

/* ── Static URL sets for sitemap (synced with src/pages/* data arrays) ── */
const STATIC_URLS = [
  // Homepage
  { loc: '/',                           changefreq: 'daily',   priority: '1.0' },
  // Social Hero — listing + individual profiles (slugs from FEATURED_HEROES in SocialHeroProfile.tsx)
  { loc: '/social-hero',                          changefreq: 'weekly',  priority: '0.7' },
  { loc: '/social-hero/anshu-gupta',              changefreq: 'monthly', priority: '0.8' },
  { loc: '/social-hero/sonam-wangchuk',           changefreq: 'monthly', priority: '0.8' },
  { loc: '/social-hero/bindeshwar-pathak',        changefreq: 'monthly', priority: '0.8' },
  { loc: '/social-hero/ela-bhatt',                changefreq: 'monthly', priority: '0.8' },
  { loc: '/social-hero/arunachalam-muruganantham',changefreq: 'monthly', priority: '0.8' },
  { loc: '/social-hero/rajendra-singh',           changefreq: 'monthly', priority: '0.8' },
  // Women Stories — listing + individual profiles (slugs from WOMEN_STORIES in WomenStory.tsx)
  { loc: '/women-story',                          changefreq: 'weekly',  priority: '0.7' },
  { loc: '/women-story/falguni-nayar',            changefreq: 'monthly', priority: '0.9' },
  { loc: '/women-story/kiran-mazumdar-shaw',      changefreq: 'monthly', priority: '0.9' },
  { loc: '/women-story/vandana-luthra',           changefreq: 'monthly', priority: '0.8' },
  { loc: '/women-story/priya-paul',               changefreq: 'monthly', priority: '0.8' },
  { loc: '/women-story/indra-nooyi',              changefreq: 'monthly', priority: '0.9' },
  { loc: '/women-story/jyoti-naik',               changefreq: 'monthly', priority: '0.8' },
  // Brand Stories — slugs from FEATURED_BRANDS in BrandStory.tsx
  { loc: '/brand/amul',                 changefreq: 'monthly', priority: '0.9' },
  { loc: '/brand/parle',                changefreq: 'monthly', priority: '0.8' },
  { loc: '/brand/haldiram',             changefreq: 'monthly', priority: '0.8' },
  { loc: '/brand/tata',                 changefreq: 'monthly', priority: '0.9' },
  { loc: '/brand/mahindra',             changefreq: 'monthly', priority: '0.8' },
  { loc: '/brand/asian-paints',         changefreq: 'monthly', priority: '0.8' },
  { loc: '/brand/vedas-agro',           changefreq: 'monthly', priority: '0.8' },
  // Industry Deep-Dives — slugs from FEATURED_INDUSTRIES in IndustryStory.tsx
  { loc: '/industry/steel',             changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/scrap',             changefreq: 'monthly', priority: '0.7' },
  { loc: '/industry/agriculture',       changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/fmcg',              changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/solar',             changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/ev',                changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/biofuel',           changefreq: 'monthly', priority: '0.7' },
  { loc: '/industry/real-estate',       changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/healthcare',        changefreq: 'monthly', priority: '0.8' },
  { loc: '/industry/it',                changefreq: 'monthly', priority: '0.9' },
  // Success Stories — slugs from SUCCESS_CATEGORIES in SuccessStory.tsx
  { loc: '/success/business-growth',    changefreq: 'weekly',  priority: '0.8' },
  { loc: '/success/export-success',     changefreq: 'weekly',  priority: '0.7' },
  { loc: '/success/startup-success',    changefreq: 'weekly',  priority: '0.8' },
  { loc: '/success/women-success',      changefreq: 'weekly',  priority: '0.7' },
  { loc: '/success/youth-success',      changefreq: 'weekly',  priority: '0.7' },
  { loc: '/success/village-success',    changefreq: 'weekly',  priority: '0.7' },
  // Social Impact — slugs from IMPACT_CATEGORIES in SocialImpact.tsx
  { loc: '/impact/ngo',                 changefreq: 'weekly',  priority: '0.7' },
  { loc: '/impact/education',           changefreq: 'weekly',  priority: '0.7' },
  { loc: '/impact/healthcare',          changefreq: 'weekly',  priority: '0.7' },
  { loc: '/impact/environment',         changefreq: 'weekly',  priority: '0.7' },
  { loc: '/impact/village-development', changefreq: 'weekly',  priority: '0.7' },
  { loc: '/impact/csr',                 changefreq: 'weekly',  priority: '0.7' },
  // Business News — slugs from NEWS_CATEGORIES in BusinessNews.tsx
  { loc: '/news/funding',               changefreq: 'daily',   priority: '0.8' },
  { loc: '/news/expansion',             changefreq: 'daily',   priority: '0.8' },
  { loc: '/news/factory-launch',        changefreq: 'weekly',  priority: '0.7' },
  { loc: '/news/new-products',          changefreq: 'daily',   priority: '0.8' },
  { loc: '/news/acquisitions',          changefreq: 'daily',   priority: '0.8' },
  { loc: '/news/awards',                changefreq: 'weekly',  priority: '0.6' },
  { loc: '/news/govt-schemes',          changefreq: 'weekly',  priority: '0.7' },
  // City Directories — slugs from FEATURED_CITIES in LocalBusiness.tsx
  { loc: '/local/ahmedabad',            changefreq: 'monthly', priority: '0.8' },
  { loc: '/local/rajkot',               changefreq: 'monthly', priority: '0.7' },
  { loc: '/local/vadodara',             changefreq: 'monthly', priority: '0.7' },
  { loc: '/local/delhi',                changefreq: 'monthly', priority: '0.8' },
  { loc: '/local/surat',                changefreq: 'monthly', priority: '0.8' },
  { loc: '/local/mumbai',               changefreq: 'monthly', priority: '0.8' },
];

function buildSitemap(founderSlugs) {
  const today = new Date().toISOString().slice(0, 10);

  const staticEntries = STATIC_URLS.map(u => `
  <url>
    <loc>${SITE_URL_BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('');

  const founderEntries = founderSlugs.map(slug => `
  <url>
    <loc>${SITE_URL_BASE}/founder/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL_BASE}/founder/hi/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticEntries}

  <!-- ── Founder Profiles (generated at build time from DB) ── -->${founderEntries}

</urlset>
`;
}

async function main() {
  const distDir = join(__dirname, 'dist', 'public');

  let template;
  try {
    template = readFileSync(join(distDir, 'index.html'), 'utf-8');
  } catch {
    console.error('[og-gen] dist/public/index.html not found — run vite build first');
    process.exit(1);
  }

  // Step 1: Always pre-render static content pages (no DB required)
  buildStaticPages(distDir, template);

  // Step 2: Copy llms.txt
  try {
    const llmsSrc = join(__dirname, 'public', 'llms.txt');
    writeFileSync(join(distDir, 'llms.txt'), readFileSync(llmsSrc, 'utf-8'), 'utf-8');
    console.log('[og-gen] Copied llms.txt to dist.');
  } catch {
    console.warn('[og-gen] llms.txt not found in public/ — skipping.');
  }

  // Step 3: DB-dependent — founder profiles + dynamic sitemap
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.warn('[og-gen] DATABASE_URL not set — skipping founder OG pages; generating static-only sitemap.');
    const sitemapXml = buildSitemap([]);
    writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    console.log(`[og-gen] Generated static-only sitemap.xml (${STATIC_URLS.length} URLs).`);
    return;
  }

  const client = new pg.Client({ connectionString: dbUrl });
  await client.connect();

  let founders;
  try {
    const result = await client.query(`
      SELECT slug, name, designation, one_liner, executive_summary,
             photo_url, cover_photo_url
      FROM   founders
      WHERE  published = true
      ORDER  BY name
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

  // ── Generate sitemap.xml with all static + dynamic founder URLs ──
  const founderSlugs = founders.map(f => f.slug);
  const sitemapXml   = buildSitemap(founderSlugs);
  writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`[og-gen] Regenerated sitemap.xml with ${founderSlugs.length} founder profiles + ${STATIC_URLS.length} static URLs.`);
}

main().catch(err => {
  // Non-fatal: log but don't break the deploy
  console.error('[og-gen] Failed:', err.message);
  process.exit(0);
});
