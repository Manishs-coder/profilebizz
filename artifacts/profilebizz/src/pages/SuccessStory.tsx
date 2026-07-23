import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, TrendingUp, Star, Users, Globe, Sprout, Award } from 'lucide-react';

/* ── Category config ──────────────────── */
export const SUCCESS_CATEGORIES = [
  { slug: 'business-growth', label: 'Business Growth',  icon: '📈', tag: 'Scale & Expansion',    color: '#002B49' },
  { slug: 'export-success',  label: 'Export Success',   icon: '🌍', tag: 'Made in India',         color: '#1a5c38' },
  { slug: 'startup-success', label: 'Startup Success',  icon: '🚀', tag: 'Zero to One',           color: '#5c1a1a' },
  { slug: 'women-success',   label: 'Women Success',    icon: '👩‍💼', tag: 'Trailblazers',          color: '#5c1a5c' },
  { slug: 'youth-success',   label: 'Youth Success',    icon: '⚡', tag: 'Gen Z & Millennials',   color: '#1a3d5c' },
  { slug: 'village-success', label: 'Village Success',  icon: '🌾', tag: 'Bharat Rising',         color: '#3d2b1a' },
];

/* ── Story type ───────────────────────── */
interface Story {
  id: string;
  name: string;
  company: string;
  location: string;
  category: string;
  coverPhoto: string;
  tag: string;
  revenue: string;
  founded: string;
  headline: string;
  subline: string;
  from: string;
  to: string;
  challenge: string;
  breakthrough: string;
  quote: string;
  lessons: string[];
  keyMetrics: { label: string; value: string }[];
  featured?: boolean;
}

/* ══════════════════════════════════════
   STORY DATA
══════════════════════════════════════ */
const STORIES: Story[] = [

  /* ─── BUSINESS GROWTH ─── */
  {
    id: 'haldiram-growth',
    name: 'Manohar Lal Agarwal', company: 'Haldiram\'s', location: 'Bikaner → Nagpur → Delhi → Pan India',
    category: 'business-growth', tag: 'Family Business Scale',
    coverPhoto: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&q=80',
    revenue: '₹12,000 Crore', founded: '1937',
    headline: 'From a Bikaner Bhujia Shop to India\'s Largest Snack Empire',
    subline: 'Three generations, one product obsession, and a refusal to franchise their soul.',
    from: 'A small bhujia shop in Bikaner where Gangabhishan Agarwal sold snacks from a roadside stall in 1937 for a few annas a day.',
    to: '₹12,000 Crore empire with 400+ products, 80 countries of export, and 22 manufacturing plants across India.',
    challenge: 'The family business split into three entities (Bikaner, Nagpur, Delhi) due to family disputes. Each branch had to build its own identity, distribution, and manufacturing — often competing with each other in the same market.',
    breakthrough: 'The Delhi branch (led by Manohar Lal Agarwal) cracked modern trade and international export simultaneously. While competing with the family, they expanded into ready-to-eat meals, frozen foods, and sweets — becoming the most diversified of the three.',
    quote: '"We never chased money. We chased the perfect bhujia. Money followed the bhujia."',
    lessons: ['Consistent quality across 85 years built trust no advertising could buy', 'Family disputes, handled right, force each branch to innovate independently', 'Export readiness — FSSAI, quality certs, shelf life engineering — must be built early', 'Local taste with national scale: never homogenise, always localise within the brand'],
    keyMetrics: [{ label: 'Revenue', value: '₹12,000 Cr' }, { label: 'Export Countries', value: '80+' }, { label: 'Products', value: '400+' }, { label: 'Plants', value: '22' }, { label: 'Years in Business', value: '87' }, { label: 'Employees', value: '16,000+' }],
    featured: true,
  },
  {
    id: 'mdh-growth',
    name: 'Mahashay Dharampal Gulati', company: 'MDH Spices', location: 'Sialkot → Delhi → Global',
    category: 'business-growth', tag: 'Partition to Prosperity',
    coverPhoto: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80',
    revenue: '₹2,500 Crore', founded: '1919',
    headline: 'Arrived in Delhi with ₹1,500 After Partition. Built India\'s Largest Spice Brand.',
    subline: 'A tonga (horse cart) driver who sold spices and became the face of Indian cuisine globally.',
    from: 'Arrived in Delhi in 1947 as a refugee from Sialkot (now Pakistan) with ₹1,500 — all that survived Partition. Drove a tonga to survive.',
    to: '₹2,500 Crore spice company with the most recognisable face in Indian food advertising — MDH Mahashayji himself, appearing in every ad till age 97.',
    challenge: 'Starting from zero in a new city, with no assets, no contacts, and no credit. The spice market in Delhi was dominated by established local players. Dharampal had to build trust with zero brand history.',
    breakthrough: 'Instead of competing on price, he invested in quality packaging and consistent flavour — radical ideas in 1950s India where spices were sold loose. His signature red-and-yellow packs became a quality signal in a market dominated by loose-weighed competitors.',
    quote: '"There is no shortcut to quality. My father taught me: if you compromise once, you compromise forever."',
    lessons: ['Consistent packaging as a quality signal — before it was a marketing concept', 'The founder\'s face as brand identity: Mahashayji\'s beard and turban became MDH\'s logo', 'Retained family ownership and debt-free operations for 100+ years', 'Social spending (schools, hospitals) as community brand-building'],
    keyMetrics: [{ label: 'Revenue', value: '₹2,500 Cr' }, { label: 'Products', value: '150+' }, { label: 'Countries', value: '100+' }, { label: 'Founded', value: '1919' }, { label: 'Market Share (India)', value: '#1 Branded' }, { label: 'Employees', value: '5,000+' }],
    featured: true,
  },
  {
    id: 'dmart-growth',
    name: 'Radhakishan Damani', company: 'D-Mart (Avenue Supermarts)', location: 'Mumbai → Pan India',
    category: 'business-growth', tag: 'Retail Disruption',
    coverPhoto: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=900&q=80',
    revenue: '₹50,000 Crore', founded: '2002',
    headline: 'The Introvert Who Built India\'s Most Profitable Retail Chain',
    subline: 'No debt, owned stores, everyday low prices — and a man who avoids the press.',
    from: 'A stock market investor and broker who had never operated a retail store. First D-Mart opened in Powai, Mumbai in 2002 with one philosophy: cheaper than anyone, always.',
    to: '₹50,000 Crore revenue, 360+ stores, India\'s most profitable retailer by EBITDA margin — beating global giants like Big Bazaar, Reliance, and even Walmart\'s India operations.',
    challenge: 'Indian retail in 2002 was dominated by established chains and wet markets. Convincing landlords to sell (not lease) property was the first 10-year battle. Damani refused to lease stores — ownership was non-negotiable, even if it slowed expansion.',
    breakthrough: 'The "own your stores" model meant zero lease escalation risk and capital appreciation. As real estate appreciated, D-Mart\'s cost structure remained stable while competitors paid 30% higher rents. This structural advantage compounded over 20 years.',
    quote: '"I have only one strategy: sell cheaper than everyone else every single day. If I do that, customers will come."',
    lessons: ['Own your real estate in retail: lease is a liability, ownership is an asset', 'Everyday Low Price (EDLP) beats promotional discounting over the long run', 'Avoid debt even if it means slower growth — Damani had zero debt IPO in 2017', 'Focus on Tier 2 cities where competition was lower and loyalty was higher'],
    keyMetrics: [{ label: 'Revenue', value: '₹50,000 Cr' }, { label: 'Stores', value: '360+' }, { label: 'Net Profit Margin', value: '5.3%' }, { label: 'Market Cap', value: '₹2.7L Cr' }, { label: 'Debt', value: 'Near Zero' }, { label: 'Employees', value: '90,000+' }],
    featured: true,
  },

  /* ─── EXPORT SUCCESS ─── */
  {
    id: 'garware-export',
    name: 'Vayu Garware', company: 'Garware Technical Fibres', location: 'Pune → 75 Countries',
    category: 'export-success', tag: 'Niche Global Dominance',
    coverPhoto: 'https://images.unsplash.com/photo-1565891741441-64926e3838b0?w=900&q=80',
    revenue: '₹1,800 Crore', founded: '1976',
    headline: 'Pune Factory Makes Nets That Catch Fish in Norway, Alaska, and Chile',
    subline: 'The world\'s #1 aquaculture net maker — and most Indians have never heard of them.',
    from: 'A yarn and textile company in Pune supplying domestic fishing communities with basic fishing nets in the 1970s.',
    to: 'The world\'s largest manufacturer of technical nets for aquaculture (salmon farming in Norway, shrimp in Southeast Asia, tuna in Japan). Exports to 75 countries. 65% revenue from exports.',
    challenge: 'Breaking into the Norwegian salmon farming market — the world\'s most demanding — against established Scandinavian and Dutch competitors. Norwegian buyers were sceptical of Indian quality for such a critical application (a net failure = millions in lost fish).',
    breakthrough: 'Developed a proprietary HDPE net coating technology that outlasted European competitors\' products by 40%. Norwegian buyers tested, compared, and switched. Word-of-mouth in the tight-knit global aquaculture community spread within 3 years.',
    quote: '"Export is not about being cheap. It is about being the best. The world will pay premium for Indian engineering if we earn it."',
    lessons: ['Niche technical products with IP protection command premium pricing globally', 'Quality certification (Norwegian standards, ISO, BV) is the market entry ticket', 'Reference customer strategy: one credible anchor customer opens the entire sector', 'R&D investment (Garware spends 3% of revenue) creates defensible differentiation'],
    keyMetrics: [{ label: 'Revenue', value: '₹1,800 Cr' }, { label: 'Export Share', value: '65%' }, { label: 'Countries', value: '75+' }, { label: 'Global Rank', value: '#1 Aquaculture Nets' }, { label: 'R&D Investment', value: '3% of Revenue' }, { label: 'Patents', value: '40+' }],
    featured: true,
  },
  {
    id: 'rajkot-export',
    name: 'Rajkot Brass Cluster', company: 'Rajkot Precision Parts Exporters', location: 'Rajkot → Germany, USA, Italy',
    category: 'export-success', tag: 'MSME Cluster Export',
    coverPhoto: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=900&q=80',
    revenue: '$4 Billion (cluster)', founded: '1960s',
    headline: 'A Rajkot Workshop of 50 People Supplies Parts to BMW and Bosch',
    subline: 'India\'s most export-competitive MSME cluster — and nobody outside Gujarat knows its name.',
    from: 'Small workshops in Rajkot\'s Metoda GIDC producing basic brass fittings for domestic plumbing and electrical industries in the 1960s and 70s.',
    to: '$4 billion in annual exports to Germany, USA, Italy, and Japan — supplying precision parts to automotive, aerospace, medical devices, and industrial machinery manufacturers including Tier-1 suppliers to BMW, Bosch, and Siemens.',
    challenge: 'Scaling from domestic-spec parts to precision automotive-grade components required IATF 16949 certification, CMM measuring equipment, and process discipline that most small workshops couldn\'t afford or manage alone.',
    breakthrough: 'The Rajkot Engineering Association (REIA) built a common testing and certification facility accessible to member MSMEs. Small workshops could now offer certified parts without individually investing ₹2–3 crore in equipment. The cluster\'s collective credibility opened global doors.',
    quote: '"When 5,000 companies export together, they speak with the voice of one large company. The buyer sees quality, the seller sees scale."',
    lessons: ['Cluster-level infrastructure (testing labs, common facilities) enables MSME export', 'Industry associations that invest in shared infrastructure multiply every member\'s export potential', 'First-generation exporters need hand-holding on documentation, LC, and international standards', 'Geographic concentration = global reputation: "Rajkot brass" is a quality signal in Europe'],
    keyMetrics: [{ label: 'Cluster Export', value: '$4 Billion' }, { label: 'Export Companies', value: '3,000+' }, { label: 'Countries', value: '60+' }, { label: 'Top Markets', value: 'Germany, USA, Italy' }, { label: 'Certifications', value: 'IATF, ISO, AS9100' }, { label: 'Product Range', value: '10,000+ SKUs' }],
    featured: true,
  },
  {
    id: 'surat-diamond-export',
    name: 'Vallabhbhai Lakhani', company: 'Kiran Gems', location: 'Surat → 50 Countries',
    category: 'export-success', tag: 'Diamond Export Champion',
    coverPhoto: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80',
    revenue: '₹10,000 Crore', founded: '1985',
    headline: 'Every 2nd Diamond Ring in America Was Cut in Surat by a Worker Like Him',
    subline: 'Surat processes 90% of the world\'s diamonds. Kiran Gems leads that story.',
    from: 'A young man from rural Saurashtra who learned diamond cutting as a karigar (artisan) in Surat\'s workshops, earning ₹50 a day in 1975.',
    to: '₹10,000 Crore diamond company with 10,000 workers, exporting to 50 countries, and one of the world\'s largest lab-grown diamond manufacturers.',
    challenge: 'The shift from natural to lab-grown diamonds threatened to disrupt the entire Surat cutting industry. Companies that had invested decades in natural diamond cutting infrastructure faced obsolescence.',
    breakthrough: 'Lakhani bet early on lab-grown diamonds when the rest of the industry was dismissive. Kiran Gems invested ₹500 crore in CVD (chemical vapour deposition) technology and became India\'s largest lab-grown diamond exporter — capturing the US bridal market shift before competitors reacted.',
    quote: '"A lab diamond and a mined diamond are identical. I asked myself: which one costs less to make and sells for the same price? That was the business decision."',
    lessons: ['Willingness to cannibalise your own business model before a competitor does it for you', 'Worker welfare as business strategy: Kiran Gems\' low attrition comes from housing, schools, and healthcare provided to karigars', 'Technology investment in capex-heavy commodities must precede market demand by 3–5 years', 'Export pricing discipline: never race to the bottom on natural diamonds'],
    keyMetrics: [{ label: 'Revenue', value: '₹10,000 Cr' }, { label: 'Workers', value: '10,000+' }, { label: 'Export Countries', value: '50+' }, { label: 'Lab-Grown Market Share', value: 'Top 3 Global' }, { label: 'CVD Capacity', value: '1 Lakh carats/month' }, { label: 'Founded', value: '1985' }],
    featured: false,
  },

  /* ─── STARTUP SUCCESS ─── */
  {
    id: 'zepto-startup',
    name: 'Aadit Palicha & Kaivalya Vohra', company: 'Zepto', location: 'Mumbai',
    category: 'startup-success', tag: 'Gen Z Unicorn',
    coverPhoto: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80',
    revenue: '₹4,500 Crore GMV', founded: '2021',
    headline: '19-Year-Olds Dropped Out of Stanford to Build India\'s Fastest Grocery Unicorn',
    subline: 'Unicorn in 18 months. India\'s fastest. 10-minute delivery in 30 cities.',
    from: 'Two Stanford students who returned to India during COVID and started testing a 10-minute grocery delivery model from their apartment in Mumbai in 2021 — manually processing orders and driving deliveries themselves.',
    to: 'India\'s fastest unicorn (valued at $1B in 18 months), ₹4,500 Crore GMV, operating in 30 cities with a "dark store" network of 300+ micro-warehouses.',
    challenge: 'Blinkit (then Grofers) had 6 years of head start, hundreds of millions in VC funding, and Google\'s backing. Swiggy Instamart launched simultaneously. The 10-minute delivery space seemed crowded before Zepto had its 100th order.',
    breakthrough: 'Doubled down on speed and reliability over breadth. While Blinkit and Instamart expanded SKUs, Zepto optimised for 10-minute SLA consistency — achieving 99.2% on-time delivery. Users started treating Zepto as a utility, not a convenience. Retention was 2x industry average.',
    quote: '"Everyone said the unit economics were impossible. We said: if you make the customer experience impossible to replicate, the economics follow."',
    lessons: ['Operational excellence (SLA, NPS) is more defensible than product features in logistics', 'Being second in a market with a differentiated service model beats being first with mediocre execution', 'Young founders\' obsession with product use can replace decades of domain experience', 'Dark store density is the moat — geography is the defensibility in quick commerce'],
    keyMetrics: [{ label: 'GMV', value: '₹4,500 Cr' }, { label: 'Cities', value: '30+' }, { label: 'Dark Stores', value: '300+' }, { label: 'Avg Delivery Time', value: '10 Minutes' }, { label: 'On-Time SLA', value: '99.2%' }, { label: 'Valuation', value: '$5 Billion' }],
    featured: true,
  },
  {
    id: 'razorpay-startup',
    name: 'Harshil Mathur & Shashank Kumar', company: 'Razorpay', location: 'Bengaluru',
    category: 'startup-success', tag: 'B2B Fintech Unicorn',
    coverPhoto: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80',
    revenue: '₹2,500 Crore', founded: '2014',
    headline: 'Two IIT Roorkee Engineers Who Couldn\'t Accept Payments Online Built India\'s #1 Payment Gateway',
    subline: '$7.5 Billion valuation. Powers 8 million businesses. The infrastructure of Indian digital commerce.',
    from: 'A startup idea born from personal frustration: Harshil was building a product in 2013 and couldn\'t integrate a payment gateway without weeks of bank paperwork and ₹50,000 setup fees.',
    to: '$7.5 Billion valued company processing $90 billion in annual payment volume, powering payments for 8 million businesses from chai tapris to Fortune 500 companies.',
    challenge: 'Indian payment infrastructure in 2014 was controlled by banks. Getting an aggregator license, signing bank partnerships, and convincing merchants to trust a two-person startup over established players required months of zero-revenue persistence.',
    breakthrough: 'Y Combinator selection in 2015 gave credibility and $120,000 in seed funding. More importantly, YC forced them to narrow focus to the smallest viable customer — small online businesses — rather than chasing enterprise deals. This SMB-first approach built a 2 million merchant base before they touched enterprise.',
    quote: '"We built Razorpay because we couldn\'t find something that worked. The best startups solve problems their founders live daily."',
    lessons: ['Developer-first product design (clean APIs, no-code plugins) drives bottom-up enterprise adoption', 'Regulatory compliance as a moat: RBI licensing is a 2-year barrier that protects established players', 'Expand from payments into banking (RazorpayX) only after achieving dominant market share in core', 'YC-style customer discovery: talk to 100 potential customers before writing a line of code'],
    keyMetrics: [{ label: 'Payment Volume', value: '$90 Billion/year' }, { label: 'Merchants', value: '8 Million+' }, { label: 'Valuation', value: '$7.5 Billion' }, { label: 'Revenue', value: '₹2,500 Cr' }, { label: 'Products', value: '12+ (payments, banking, payroll)' }, { label: 'Employees', value: '3,500+' }],
    featured: true,
  },
  {
    id: 'meesho-startup',
    name: 'Vidit Aatrey & Sanjeev Barnwal', company: 'Meesho', location: 'Bengaluru',
    category: 'startup-success', tag: 'Social Commerce',
    coverPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    revenue: '₹7,600 Crore', founded: '2015',
    headline: 'Built a $4.9B Startup for the Indian Woman Who Resells on WhatsApp',
    subline: '120 million users in Tier 2 and 3 India. Democratised entrepreneurship.',
    from: 'IIT Delhi graduates building a social commerce app for housewives who resell products on WhatsApp and Facebook to their local network.',
    to: '$4.9 Billion valuation, 120 million users, India\'s most-downloaded shopping app in Tier 2 and 3 cities — creating income for 15 million micro-entrepreneurs, mostly women.',
    challenge: 'The target customer (Tier 2 women, smartphone-new, low digital literacy) was invisible to most VCs and product teams who built for urban millennials. Raising from investors who had never met the customer was the first 2-year struggle.',
    breakthrough: 'Zero commission for sellers — a model that seemed suicidal financially. Meesho made money on logistics and financial services, not seller commission. This brought millions of small sellers who had no margin to give away, creating the density that made the platform valuable.',
    quote: '"Our user is a woman in Jaipur who has never shopped online before. If we build for her, we build for the next billion. Everyone else is building for the last hundred million."',
    lessons: ['0% commission as a customer acquisition strategy in winner-take-all marketplaces', 'Vernacular-first product design: UI in 8 languages, voice-first features, low-bandwidth optimisation', 'Unit economics must be modelled on real Tier 2 customer behaviour, not urban proxies', 'Logistics infrastructure investment is the real moat in Indian e-commerce — not the app'],
    keyMetrics: [{ label: 'Valuation', value: '$4.9 Billion' }, { label: 'Users', value: '120 Million' }, { label: 'Sellers', value: '15 Million+' }, { label: 'Revenue', value: '₹7,600 Cr' }, { label: 'Orders/Month', value: '20 Million+' }, { label: 'Tier 2+ Share', value: '70%+' }],
    featured: false,
  },

  /* ─── WOMEN SUCCESS ─── */
  {
    id: 'falguni-women',
    name: 'Falguni Nayar', company: 'Nykaa', location: 'Mumbai',
    category: 'women-success', tag: 'Self-Made Billionaire at 50',
    coverPhoto: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80',
    revenue: '₹6,400 Crore', founded: '2012',
    headline: 'She Quit Investment Banking at 49 and Built India\'s First D2C Unicorn Founded by a Woman',
    subline: 'India\'s richest self-made woman. Nykaa: ₹53,000 Crore market cap.',
    from: 'A 49-year-old investment banker at Kotak Mahindra, managing funds, sitting on corporate boards — with a comfortable career and zero e-commerce experience.',
    to: 'Founder of Nykaa — India\'s #1 beauty platform — with ₹6,400 Crore revenue, 5 million SKUs, 180+ stores, and a ₹53,000 Crore market cap. India\'s richest self-made woman.',
    challenge: 'A 50-year-old first-time founder with no tech background trying to raise VC money for a beauty e-commerce startup in 2012 — when Indian e-commerce was just finding its footing and beauty was considered too fragmented for online.',
    breakthrough: 'Chose beauty as a category precisely because it was complex — authenticity, counterfeiting, and advice-driven purchase — which meant high barriers for generic e-commerce platforms. Built a content + commerce model (videos, tutorials, expert advice) before content commerce was a concept.',
    quote: '"Age is a number. Experience is a superpower. At 49, I had 25 years of understanding what women want. No 25-year-old founder had that."',
    lessons: ['Domain expertise from adjacent industries (finance → consumer insights) as founding advantage', 'Content-led commerce: Nykaa\'s editorial engine (Beauty Book, YouTube) drove SEO and trust before paid marketing', 'Authenticity as supply chain differentiation: authorised seller network for luxury brands', 'Omnichannel before it was fashionable: offline stores to reduce returns and build trust in beauty'],
    keyMetrics: [{ label: 'Revenue', value: '₹6,400 Cr' }, { label: 'GMV', value: '₹14,000 Cr' }, { label: 'Market Cap', value: '₹53,000 Cr' }, { label: 'SKUs', value: '5 Million+' }, { label: 'Offline Stores', value: '180+' }, { label: 'Brands', value: '6,000+' }],
    featured: true,
  },
  {
    id: 'kiran-women',
    name: 'Kiran Mazumdar-Shaw', company: 'Biocon', location: 'Bengaluru',
    category: 'women-success', tag: 'Biotech Pioneer',
    coverPhoto: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
    revenue: '₹15,000 Crore', founded: '1978',
    headline: 'She Started a Biotech Company with ₹10,000 When No Bank Would Loan to a Woman Entrepreneur',
    subline: 'India\'s first female biotech billionaire. Insulin for the world\'s poor.',
    from: 'A brewery science graduate from Bengaluru who went to Australia to become a master brewer and returned to India in 1978 to start a fermentation-based company — with ₹10,000 in a borrowed garage.',
    to: '₹15,000 Crore biotech company supplying affordable insulin, cancer drugs, and biosimilars to 120 countries. India\'s largest listed biotech company by revenue.',
    challenge: 'In 1978, no bank in India would give a woman entrepreneur a business loan. No industrial shed would rent to a woman running a "chemical" company. Her first employee quit on Day 1 because he didn\'t want to work for a woman.',
    breakthrough: 'Pivoted from industrial enzymes (the original plan) to pharmaceutical biologic drugs when she saw that India could produce insulin for 1/10th the Western price using fermentation technology. This decision — made in the 1980s — positioned Biocon for the biosimilars revolution 20 years later.',
    quote: '"Entrepreneurship is about converting ideas into opportunity. In India, a woman with an idea in 1978 had to convert every obstacle into evidence that she was right."',
    lessons: ['Being 30 years early to a market (biologics) is painful but creates insurmountable advantage when the market arrives', 'Affordable access as a mission creates government and global health organisation partnerships', 'Scientific credibility through publications, patents, and peer-reviewed data opens regulated markets', 'Women-led organisations must often overperform technically to earn the same starting credibility as male peers'],
    keyMetrics: [{ label: 'Revenue', value: '₹15,000 Cr' }, { label: 'Countries', value: '120+' }, { label: 'Founded', value: '1978' }, { label: 'Market Cap', value: '₹45,000 Cr' }, { label: 'Patents', value: '800+' }, { label: 'Employees', value: '12,000+' }],
    featured: true,
  },
  {
    id: 'vineeta-women',
    name: 'Vineeta Singh', company: 'SUGAR Cosmetics', location: 'Mumbai',
    category: 'women-success', tag: 'D2C Beauty Disruptor',
    coverPhoto: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
    revenue: '₹500 Crore', founded: '2015',
    headline: 'She Turned Down a ₹1 Crore Job Offer to Build a ₹3,000 Crore Beauty Brand for Indian Skin Tones',
    subline: 'IIM Ahmedabad gold medalist. Shark Tank India judge. Founder who runs marathons and companies.',
    from: 'Declined a ₹1 Crore salary job offer from a global finance firm after IIM Ahmedabad to start a beauty company — with no beauty industry background and no investor interest initially.',
    to: '₹500 Crore revenue beauty brand with 50,000+ retail touchpoints, 1 million+ units sold monthly, D2C + offline presence, and one of India\'s most recognised founder faces through Shark Tank.',
    challenge: 'SUGAR\'s first startup (Fab Bag, a subscription beauty box) burned for 2 years without breaking even. They pivoted to product manufacturing — a capital-intensive, unfamiliar domain — with limited funds.',
    breakthrough: 'Focused exclusively on Indian skin tones — shades, formulations, and finishes that MNC brands (who developed products for Western skin) ignored. This hyper-specific focus made SUGAR the brand of choice for dark-skinned Indian women who had been underserved by Lakme, Maybelline, and L\'Oreal.',
    quote: '"Indian skin is not a compromise between Western shades. It is its own universe. That universe was waiting for someone to take it seriously."',
    lessons: ['Identify the customer MNCs structurally cannot serve (because of global product standardisation)', 'Offline-first expansion: SUGAR built 50,000 retail touchpoints before investing heavily in digital', 'Founder visibility (Shark Tank) as a cost-effective brand building channel', 'Formulation IP for Indian climate (humidity, sweat resistance) as product differentiation'],
    keyMetrics: [{ label: 'Revenue', value: '₹500 Cr' }, { label: 'Retail Points', value: '50,000+' }, { label: 'SKUs', value: '700+' }, { label: 'Valuation', value: '₹3,000 Cr' }, { label: 'Units/Month', value: '1 Million+' }, { label: 'Countries', value: '10' }],
    featured: true,
  },

  /* ─── YOUTH SUCCESS ─── */
  {
    id: 'bhavish-youth',
    name: 'Bhavish Aggarwal', company: 'Ola / Krutrim', location: 'Bengaluru',
    category: 'youth-success', tag: 'Serial Founder',
    coverPhoto: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80',
    revenue: '₹9,000 Crore (Ola)', founded: '2010',
    headline: 'IIT Bombay Drop-in Who Built India\'s Cab Revolution — Then Staked it All on Electric Vehicles',
    subline: 'Started at 23. Built Ola. Then Ola Electric. Then Krutrim AI. Never stopped.',
    from: 'A 23-year-old IIT Bombay computer science graduate who quit a Microsoft internship after a bad taxi ride from Bengaluru to Bandipur in 2010.',
    to: 'Built Ola into India\'s largest cab aggregator (500 cities, 2.5 million driver-partners), then pivoted to build Ola Electric (India\'s largest 2W EV maker), and then Krutrim (India\'s first AI unicorn, valued at $1B in 90 days).',
    challenge: 'Ola was dismissed by Uber — the world\'s best-funded startup — which entered India with $1 billion in 2014. Bhavish fought back not with money but with localisation: cash payments, auto-rickshaws, shared cabs, and rural expansion that Uber never matched.',
    breakthrough: 'The Ola vs. Uber battle was won in the districts, not the metros. While Uber focused on Bengaluru and Mumbai, Ola expanded to 200 Tier 2 cities where Uber had no presence. By the time Uber arrived in those cities, Ola had loyalty and supply locked.',
    quote: '"Never fight your competitor where they are strongest. Make them fight you where you are strongest."',
    lessons: ['Localisation depth (auto, shared, cash, vernacular) as competitive moat against well-funded MNCs', 'Geographic expansion into underserved markets before competitors arrive', 'Second act ambition: a founder who builds a unicorn and then bets the company on a harder problem is rare and valuable', 'Manufacturing bet: Ola\'s in-house Rajasthan factory vs. outsourcing changed the EV cost curve'],
    keyMetrics: [{ label: 'Ola Revenue', value: '₹9,000 Cr' }, { label: 'Driver Partners', value: '2.5 Million' }, { label: 'Ola Electric Revenue', value: '₹5,200 Cr' }, { label: 'Krutrim Valuation', value: '$1 Billion' }, { label: 'Cities (Ola)', value: '500+' }, { label: 'Age at First Startup', value: '23' }],
    featured: true,
  },
  {
    id: 'ritesh-youth',
    name: 'Ritesh Agarwal', company: 'OYO Rooms', location: 'Bhubaneswar → Global',
    category: 'youth-success', tag: 'Teen Unicorn Founder',
    coverPhoto: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    revenue: '₹5,800 Crore', founded: '2013',
    headline: 'A 19-Year-Old from Odisha Built the World\'s Largest Hotel Chain by Room Count',
    subline: '1.7 million rooms. 35 countries. Started by staying in budget hotels across India.',
    from: 'A college dropout from Cuttack, Odisha who at 17 spent a year travelling India by train and staying in budget hotels, interviewing hotel owners about their problems.',
    to: 'Built OYO into the world\'s 3rd-largest hotel chain by room count (1.7 million rooms across 35 countries), becoming a billionaire at 24 — the youngest in Forbes India history.',
    challenge: 'OYO\'s rapid international expansion (China, Southeast Asia, UK) nearly destroyed the company in 2019–2020. Overexpansion, governance issues, and the COVID pandemic collapsed revenue 50%. SoftBank\'s investment was under severe scrutiny.',
    breakthrough: 'Restructured aggressively in 2021 — exited 80 countries, cut 60% of staff, refocused on India and a few high-profit international markets. The profitability turnaround was one of the fastest in startup history. OYO became EBITDA-positive in FY23.',
    quote: '"I failed faster than most founders. And I had to fix it publicly, with everyone watching. That pressure made me a better CEO than any MBA would have."',
    lessons: ['Thiel Fellowship as an alternative to conventional education for exceptional founders', 'Hotel aggregation model: brand and standards without asset ownership — capital-light scale', 'Over-expansion is survivable if the core business is fundamentally sound', 'Restructuring decisiveness: cutting 60% of headcount in 6 months requires courage that most CEOs delay too long'],
    keyMetrics: [{ label: 'Rooms', value: '1.7 Million' }, { label: 'Countries', value: '35' }, { label: 'Revenue', value: '₹5,800 Cr' }, { label: 'Age at Founding', value: '19' }, { label: 'EBITDA', value: 'Positive (FY23)' }, { label: 'Properties', value: '1,57,000+' }],
    featured: true,
  },
  {
    id: 'shruti-youth',
    name: 'Srikanth Bolla', company: 'Bollant Industries', location: 'Hyderabad',
    category: 'youth-success', tag: 'Disability to Destiny',
    coverPhoto: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
    revenue: '₹500 Crore', founded: '2012',
    headline: 'Blind Since Birth, Rejected by IITs, He Went to MIT and Built a ₹500 Crore Factory',
    subline: 'Bollant Industries employs 70%+ differently-abled workers. Now a Bollywood film too.',
    from: 'Born blind in a small Andhra village, rejected by IITs because of his disability despite scoring 98% in boards. Moved to the US, became the first international blind student at MIT.',
    to: '₹500 Crore eco-friendly packaging company employing 1,500+ workers, 70% of whom are differently-abled. Backed by Ratan Tata. Story made into Bollywood film "Srikanth" (2024).',
    challenge: 'Convincing manufacturing clients to trust a blind founder running a factory. Building quality systems and supervision processes where the founder relies on hearing, touch, and structured information rather than visual inspection.',
    breakthrough: 'The differentiated employment model (differently-abled workers) attracted CSR-conscious buyers willing to pay a slight premium. Ratan Tata\'s investment brought credibility and opened doors with Tata Group companies as anchor buyers.',
    quote: '"Every IIT that rejected me did me a favour. They sent me to MIT. Rejection is just redirection from someone who doesn\'t see your full potential."',
    lessons: ['Social mission as business model: differently-abled employment opened CSR buyer networks unavailable to competitors', 'Mentor capital (Ratan Tata) more valuable than financial capital in early stages', 'Institutional education (MIT) as credibility signal in fundraising — not just skill building', 'Eco-packaging as a category with strong structural tailwinds: EPR regulations creating regulatory demand'],
    keyMetrics: [{ label: 'Revenue', value: '₹500 Cr' }, { label: 'Employees', value: '1,500+' }, { label: 'Differently-Abled Workers', value: '70%' }, { label: 'Backed By', value: 'Ratan Tata' }, { label: 'Founded', value: '2012' }, { label: 'Age at Founding', value: '22' }],
    featured: true,
  },

  /* ─── VILLAGE SUCCESS ─── */
  {
    id: 'lijjat-village',
    name: 'Shri Mahila Griha Udyog', company: 'Lijjat Papad', location: 'Mumbai Chawl → Pan India',
    category: 'village-success', tag: 'Women Cooperative Legend',
    coverPhoto: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=900&q=80',
    revenue: '₹1,600 Crore', founded: '1959',
    headline: '7 Women in a Mumbai Chawl with ₹80 and a Rolling Pin. Now ₹1,600 Crore.',
    subline: '45,000 women members. No outside capital. No boss. Just papads.',
    from: '7 women from a Mumbai chawl (slum tenement) borrowed ₹80 from a social worker, bought ingredients, and rolled papads on their building\'s terrace on 15 March 1959.',
    to: '₹1,600 Crore cooperative with 45,000 women members across 81 branches and 35 states. No outside investors, no corporate structure — just women who own the enterprise equally.',
    challenge: 'Scaling a handmade food product with no standardisation, no cold chain, and 45,000 independent producers across India while maintaining consistent quality that could compete with machine-made products.',
    breakthrough: 'The cooperative structure itself was the product innovation. Every member earns by output, owns the enterprise equally, and has no hierarchical employer. This created a self-motivated quality control system where every woman had personal skin in the product\'s reputation.',
    quote: '"We did not set out to build a company. We set out to feed our families with dignity. The company came because the papad was excellent."',
    lessons: ['Cooperative ownership as an incentive model superior to wages for quality-sensitive handmade products', 'No external capital = no dilution, no pressure to scale unsustainably, no exits', 'Geographic distribution as supply chain advantage — production happens where members live', 'Brand built on authenticity: "handmade by women" is a genuine differentiator in commoditised category'],
    keyMetrics: [{ label: 'Revenue', value: '₹1,600 Cr' }, { label: 'Women Members', value: '45,000' }, { label: 'Branches', value: '81' }, { label: 'States', value: '35' }, { label: 'Started With', value: '₹80' }, { label: 'Outside Funding', value: '₹0' }],
    featured: true,
  },
  {
    id: 'fabindia-village',
    name: 'John Bissell', company: 'Fabindia', location: 'Delhi → Rural India → Global',
    category: 'village-success', tag: 'Village Artisan → Premium Retail',
    coverPhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    revenue: '₹1,500 Crore', founded: '1960',
    headline: 'An American Who Made Village Handloom the Most Premium Retail Brand in Urban India',
    subline: '50,000 rural artisan-suppliers. 300 stores. Craft as commerce.',
    from: 'John Bissell, a Ford Foundation consultant, started buying handloom fabric from rural weavers in 1960 to export to the US — initially to furnish government guesthouses.',
    to: '₹1,500 Crore premium retail brand with 300 stores, supplying 50,000 rural artisans, and making handloom and block print synonymous with aspirational urban consumption in India.',
    challenge: 'Handloom products in India had always been associated with village poverty and compromise. Convincing urban consumers to pay premium prices for products they associated with their grandmothers\' wardrobes required a complete repositioning.',
    breakthrough: 'Fabindia\'s stores — designed with careful aesthetics — reframed the product context. Handloom became heritage, not poverty. Block print became artisan, not basic. The store design did the positioning work that a million ads could not.',
    quote: '"Craft is the highest form of manufacturing. It requires skill that machines cannot replicate, and tells a story that factories cannot tell."',
    lessons: ['Retail environment as brand positioning: store design communicates product value more than any ad', 'Supply chain as social impact: 50,000 rural suppliers = 50,000 stakeholders in the brand\'s success', 'Premium rural products need urban recontextualisation — the same weave in a Fabindia bag costs 5x more than in a village mela', 'Community ownership (Fabindia sold equity to supplier communities) aligns incentives across the value chain'],
    keyMetrics: [{ label: 'Revenue', value: '₹1,500 Cr' }, { label: 'Stores', value: '300+' }, { label: 'Rural Artisans', value: '50,000+' }, { label: 'Countries', value: '10' }, { label: 'Founded', value: '1960' }, { label: 'Product Categories', value: '15+' }],
    featured: true,
  },
  {
    id: 'vedas-village',
    name: 'Rajesh Kumar Vedas', company: 'Vedas Agro', location: 'Rae Bareli, UP → 14 States',
    category: 'village-success', tag: 'Rural Agri-Processing',
    coverPhoto: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80',
    revenue: '₹210 Crore', founded: '2011',
    headline: 'He Left a ₹50 Lakh Salary to Pay UP\'s Wheat Farmers 15% More Than the Mandi',
    subline: '18,000 farmer-partners. 6 processing plants. Village roots, national shelf space.',
    from: 'A DCM Shriram executive from a UP farming village who quit his ₹50 lakh salary in 2011 to buy wheat directly from farmers at prices 15% above mandi rates.',
    to: '₹210 Crore agri-processing company with 18,000 farmer-partners, 6 processing plants, and Vedas Gold Atta commanding 12% market share in UP modern trade — outselling Aashirvaad in 3 cities.',
    challenge: 'Banks refused working capital. Retail partners demanded consistency that a farming-dependent supply chain couldn\'t always guarantee. And Aashirvaad (ITC) and Shakti Bhog had distribution networks built over decades.',
    breakthrough: 'Direct-to-farmer procurement with 48-hour payment — no mandi intermediary — built farmer loyalty so deep that supply disruptions were minimal even in drought years. Farmers prioritised Vedas deliveries over mandI sales because payment was guaranteed and faster.',
    quote: '"I\'m not in the atta business. I\'m in the farmer-income business. The atta is just how I make the model work."',
    lessons: ['Farmer payment speed (48 hours) as procurement loyalty mechanism — better than price alone', 'Rural supply chain reliability requires relationship depth, not contracts', 'Modern trade entry (Big Bazaar) as a credibility signal that unlocks other retail chains', 'Bootstrapping from PSU loans + personal savings teaches capital discipline that VC-backed founders often lack'],
    keyMetrics: [{ label: 'Revenue', value: '₹210 Cr' }, { label: 'Farmer Partners', value: '18,000+' }, { label: 'Processing Plants', value: '6' }, { label: 'States', value: '14' }, { label: 'Market Share (UP)', value: '12%' }, { label: 'Founded', value: '2011' }],
    featured: false,
  },
];

/* ════════════════════════════════
   PAGE COMPONENT
════════════════════════════════ */
export default function SuccessStory({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'business-growth';
  const cat = SUCCESS_CATEGORIES.find(c => c.slug === slug) ?? SUCCESS_CATEGORIES[0];

  const stories = STORIES.filter(s => s.category === slug);
  const featured = stories.find(s => s.featured) ?? stories[0];
  const rest = stories.filter(s => s !== featured);

  const [active, setActive] = useState<Story>(featured);
  const [scrolled, setScrolled] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const s = STORIES.filter(s => s.category === slug);
    const f = s.find(st => st.featured) ?? s[0];
    setActive(f);
  }, [slug]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const allStories = STORIES.filter(s => s.category === slug);

  const _successUrl    = `https://profilebizz.com/success/${slug}`;
  const _successJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.label} — ProfileBizz Success Stories`,
    description: `Inspiring ${cat.label} stories from India — founder journeys, business milestones, and growth narratives curated by ProfileBizz.`,
    url: _successUrl,
    publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
    inLanguage: 'en-IN',
  });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{_successJsonLd}</script>
      </Helmet>
      <div className="min-h-screen bg-[#f9f9f9] text-black">

      {/* ── Top bar ── */}
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Success Stories</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black transition-colors px-3 py-1.5 border border-gray-200 hover:border-black">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial transition-colors px-3 py-1.5">
              <BookmarkPlus className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </header>

      {/* ── Category Hero ── */}
      <div className="mt-14" style={{ background: cat.color }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-white/50 text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block">Success Stories</span>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl">{cat.icon}</span>
              <h1 className="font-serif text-white text-4xl md:text-5xl font-bold">{cat.label}</h1>
            </div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white px-3 py-1.5 mt-1">{cat.tag}</span>
          </div>
          <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed">
            {allStories.length} verified stories of real businesses that turned ideas into impact.
          </p>
        </div>
      </div>

      {/* ── Category Switcher ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex">
          {SUCCESS_CATEGORIES.map(c => (
            <a key={c.slug} href={`/success/${c.slug}`}
              className={`flex items-center gap-2 px-4 py-3.5 border-b-2 flex-shrink-0 transition-colors text-sm font-medium whitespace-nowrap
                ${c.slug === slug ? 'border-editorial text-editorial' : 'border-transparent text-gray-500 hover:text-black'}`}>
              <span>{c.icon}</span> {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Story List */}
          <div className="lg:col-span-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">{allStories.length} Stories in {cat.label}</p>
            <div className="space-y-3">
              {allStories.map(story => (
                <button key={story.id} onClick={() => { setActive(story); if (window.innerWidth < 1024) { setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); } else { window.scrollTo({ top: 120, behavior: 'smooth' }); } }}
                  className={`w-full text-left border transition-all duration-150 overflow-hidden group ${active.id === story.id ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex gap-0">
                    <div className="w-24 h-20 flex-shrink-0 overflow-hidden">
                      <img src={story.coverPhoto} alt={story.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex-1 min-w-0 bg-white">
                      {story.featured && (
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-1.5 py-0.5 mb-1 inline-block">Featured</span>
                      )}
                      <p className="text-sm font-bold leading-tight group-hover:text-editorial transition-colors truncate">{story.company}</p>
                      <p className="text-[11px] text-gray-500 truncate">{story.name}</p>
                      <p className="text-[10px] font-bold text-editorial mt-1">{story.revenue}</p>
                    </div>
                    {active.id === story.id && (
                      <div className="w-1 bg-editorial flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Story Detail */}
          <div ref={detailRef} className="lg:col-span-2">
            {active && (
              <div className="bg-white border border-gray-200">
                {/* Story Hero */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <img src={active.coverPhoto} alt={active.company} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-1">{active.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">{active.location}</p>
                    <h2 className="font-serif text-white text-xl md:text-2xl font-bold leading-tight mb-1">{active.headline}</h2>
                    <p className="text-white/70 text-sm italic">{active.subline}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-px bg-gray-200 mb-6">
                    {active.keyMetrics.map((m, i) => (
                      <div key={i} className="bg-white px-4 py-3">
                        <p className="text-[10px] font-bold tracking-wider uppercase text-gray-400">{m.label}</p>
                        <p className="text-base font-serif font-bold text-black">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* From → To */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-200 p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">The Beginning</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{active.from}</p>
                    </div>
                    <div className="border-2 border-editorial p-4">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-2">Where It Reached</p>
                      <p className="text-sm text-gray-800 font-medium leading-relaxed">{active.to}</p>
                    </div>
                  </div>

                  {/* Challenge & Breakthrough */}
                  <div className="mb-6 space-y-4">
                    <div className="border-l-4 border-gray-300 pl-5 py-1">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">The Challenge</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{active.challenge}</p>
                    </div>
                    <div className="border-l-4 border-editorial pl-5 py-1">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-2">The Breakthrough</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{active.breakthrough}</p>
                    </div>
                  </div>

                  {/* Pull Quote */}
                  <blockquote className="bg-black text-white p-5 mb-6">
                    <p className="font-serif text-base md:text-lg leading-relaxed italic">{active.quote}</p>
                    <p className="text-white/50 text-[10px] font-bold tracking-wider uppercase mt-3">— {active.name}, {active.company}</p>
                  </blockquote>

                  {/* Lessons */}
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-editorial" /> Key Lessons
                    </p>
                    <div className="space-y-2">
                      {active.lessons.map((l, i) => (
                        <div key={i} className="flex gap-3 items-start group hover:bg-gray-50 px-3 py-2 transition-colors">
                          <span className="flex-shrink-0 w-5 h-5 bg-black group-hover:bg-editorial flex items-center justify-center text-white text-[10px] font-bold transition-colors">{i + 1}</span>
                          <p className="text-sm text-gray-700 leading-snug">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
