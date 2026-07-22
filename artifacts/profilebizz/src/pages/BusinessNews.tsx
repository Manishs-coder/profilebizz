import React, { useState, useEffect } from 'react';
import { ChevronLeft, Share2, BookmarkPlus, TrendingUp, ChevronRight, Calendar, MapPin, Tag, ExternalLink } from 'lucide-react';

/* ── Category config ──────────────────── */
export const NEWS_CATEGORIES = [
  { slug: 'funding',           label: 'Funding',           icon: '💰', tag: 'Investments & Rounds',    color: '#0a2e1a' },
  { slug: 'expansion',         label: 'Expansion',         icon: '📡', tag: 'Growth & New Markets',    color: '#0a1e3d' },
  { slug: 'factory-launch',    label: 'Factory Launch',    icon: '🏭', tag: 'Manufacturing India',     color: '#2e1a0a' },
  { slug: 'new-products',      label: 'New Products',      icon: '🚀', tag: 'Launches & Innovations',  color: '#1a0a2e' },
  { slug: 'acquisitions',      label: 'Acquisitions',      icon: '🤝', tag: 'Mergers & Deals',         color: '#2e0a0a' },
  { slug: 'awards',            label: 'Awards',            icon: '🏆', tag: 'Recognition & Rankings',  color: '#2e2a0a' },
  { slug: 'govt-schemes',      label: 'Govt. Schemes',     icon: '🏛️', tag: 'Policy & Benefits',       color: '#0a2a2e' },
];

interface NewsItem {
  id: string;
  category: string;
  headline: string;
  company: string;
  sector: string;
  date: string;
  location: string;
  tag: string;
  coverPhoto: string;
  summary: string;
  detail: string;
  amount?: string;
  keyPoints: string[];
  source: string;
  featured?: boolean;
}

/* ══════════════════════════════════════
   NEWS DATA
══════════════════════════════════════ */
const NEWS: NewsItem[] = [

  /* ─── FUNDING ─── */
  {
    id: 'zepto-fund-24',
    category: 'funding', featured: true,
    headline: 'Zepto Raises $665 Million at $3.6 Billion Valuation in India\'s Largest Quick-Commerce Round',
    company: 'Zepto', sector: 'Quick Commerce', date: 'June 2024', location: 'Mumbai',
    tag: 'Series F', coverPhoto: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80',
    amount: '$665 Million',
    summary: 'Zepto closed India\'s largest quick-commerce funding round, led by General Catalyst and StepStone Group, valuing the 2-year-old company at $3.6 Billion.',
    detail: 'Founded in 2021 by Stanford dropouts Aadit Palicha and Kaivalya Vohra, Zepto secured $665 million in its Series F round — making it India\'s fastest company to cross $3 billion in valuation. The round was led by General Catalyst (US) and StepStone Group, with participation from existing investors. The capital will be used to expand Zepto\'s dark store network from 300 to 700 stores across India, deepen its Zepto Café (ready-to-eat) vertical, and invest in its B2B supply chain arm. Zepto now processes 1 million+ orders daily with an average 10-minute delivery SLA. It is India\'s third-largest quick-commerce platform by GMV, behind Blinkit and Swiggy Instamart, but growing the fastest.',
    keyPoints: [
      'Valuation: $3.6 Billion — India\'s fastest unicorn to Series F',
      'Lead investors: General Catalyst, StepStone Group',
      'Use of funds: 700 dark stores, Zepto Café expansion, B2B supply chain',
      'Orders per day: 1 million+ with 99.2% on-time SLA',
      'Competition: Blinkit (#1), Instamart (#2), Zepto (#3 and fastest-growing)',
    ],
    source: 'Economic Times, Bloomberg',
  },
  {
    id: 'ola-electric-fund',
    category: 'funding', featured: true,
    headline: 'Ola Electric\'s ₹6,145 Crore IPO Sets Record as India\'s Largest EV Company Goes Public',
    company: 'Ola Electric', sector: 'Electric Vehicles', date: 'August 2024', location: 'Bengaluru',
    tag: 'IPO', coverPhoto: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=80',
    amount: '₹6,145 Crore',
    summary: 'Ola Electric listed on NSE and BSE in India\'s largest EV company IPO, raising ₹6,145 crore. The company commands 35% of India\'s 2-wheeler EV market.',
    detail: 'Ola Electric Mobility Limited\'s IPO of ₹6,145 crore was India\'s largest EV sector listing. The company, founded by Bhavish Aggarwal, produces electric scooters at its Futurefactory in Krishnagiri, Tamil Nadu — the world\'s largest 2-wheeler EV factory by capacity (10 million units/year). With 35% market share in India\'s 2-wheeler EV segment, Ola Electric sold 4 lakh scooters in FY24. The IPO proceeds will fund R&D for electric motorcycles, expansion of the charging network (Ola Hypercharger), and battery cell manufacturing through its Gigafactory project under the ACC PLI scheme.',
    keyPoints: [
      'IPO size: ₹6,145 Crore — India\'s largest EV listing',
      'Market share: 35% of India\'s 2-wheeler EV segment',
      'Factory: Futurefactory, Krishnagiri — 10 million units/year capacity',
      'FY24 units sold: 4 lakh+ scooters',
      'Next: Electric motorcycles, Gigafactory for battery cells',
    ],
    source: 'NSE Filing, SEBI, Business Standard',
  },
  {
    id: 'meesho-fund',
    category: 'funding',
    headline: 'Meesho Raises $275 Million, Eyes Profitability as India\'s Leading Social Commerce Platform',
    company: 'Meesho', sector: 'E-Commerce / Social Commerce', date: 'September 2023', location: 'Bengaluru',
    tag: 'Series F', coverPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80',
    amount: '$275 Million',
    summary: 'Meesho secured $275M led by Fidelity, Softbank, and others as it achieves EBITDA breakeven — India\'s first profitable large-scale social commerce platform.',
    detail: 'Meesho, the Bengaluru-based social commerce platform targeting Tier 2 and 3 India, raised $275 million in a round led by Fidelity Management and existing investors SoftBank and Prosus. The company simultaneously announced reaching EBITDA breakeven — a milestone that eluded most Indian e-commerce platforms. Meesho\'s differentiated approach (zero commission for sellers, reseller network of 15 million women, vernacular UI) has generated 120 million users, 80% from cities outside the top 8. The funds will be used to invest in Meesho Supply Chain Services and expand into categories beyond fashion and home goods.',
    keyPoints: [
      'Funding: $275 Million — Series F round',
      'Achievement: EBITDA breakeven — first large-scale social commerce platform in India to do so',
      'Users: 120 Million, 80% from Tier 2+ cities',
      'Sellers: 15 Million+ (zero commission model)',
      'Next: Supply chain services, category expansion',
    ],
    source: 'TechCrunch, Inc42, Entrackr',
  },
  {
    id: 'agartha-fund',
    category: 'funding',
    headline: 'Vedas Agro Secures ₹40 Crore Debt Funding from SIDBI to Expand Wheat Procurement Network',
    company: 'Vedas Agro', sector: 'Agri-Processing', date: 'March 2024', location: 'Lucknow, UP',
    tag: 'Debt Funding', coverPhoto: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80',
    amount: '₹40 Crore',
    summary: 'UP-based agri-processor Vedas Agro raised ₹40 crore from SIDBI to expand direct farmer procurement from 18,000 to 35,000 partners across 8 districts.',
    detail: 'Vedas Agro Industries, the Rae Bareli-based wheat processing company known for Vedas Gold Atta, closed a ₹40 crore debt facility with SIDBI (Small Industries Development Bank of India) under the MSME expansion scheme. The capital will fund construction of two new collection centres in Hardoi and Unnao districts, upgrade storage capacity from 15,000 to 40,000 MT, and onboard 17,000 additional farmer partners. Vedas Agro currently commands 12% modern trade market share in UP and is targeting ₹350 crore revenue in FY25.',
    keyPoints: [
      'Funding: ₹40 Crore debt facility from SIDBI',
      'New farmer partners: 17,000 (total target: 35,000)',
      'New collection centres: Hardoi and Unnao districts',
      'Storage capacity upgrade: 15,000 → 40,000 MT',
      'Revenue target FY25: ₹350 Crore',
    ],
    source: 'SIDBI Press Release, Financial Express',
  },

  /* ─── EXPANSION ─── */
  {
    id: 'jio-expansion',
    category: 'expansion', featured: true,
    headline: 'Jio Launches True 5G in 1,000 Cities — India\'s Fastest Network Rollout in History',
    company: 'Reliance Jio', sector: 'Telecom', date: 'January 2024', location: 'Pan India',
    tag: 'Network Expansion', coverPhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    amount: '₹2 Lakh Crore Investment',
    summary: 'Jio completed 5G rollout across 1,000+ Indian cities in under 18 months — the fastest national 5G deployment in the world — creating India\'s largest True 5G network.',
    detail: 'Reliance Jio completed the rollout of its True 5G network across 1,000 Indian cities, having started in October 2022. This makes India\'s 5G rollout the fastest in the world for any country of comparable size — covering more cities in 18 months than the US did in 3 years. Jio\'s 5G network is built on a standalone (SA) architecture, enabling lower latency and better performance than the NSA 5G of competitors. The investment of ₹2 lakh crore covers spectrum, fiber backhaul, and 1 lakh+ 5G base stations. Jio 5G now covers 85% of India\'s urban population and is expanding to 5,000 towns by 2025.',
    keyPoints: [
      'Coverage: 1,000+ cities — world\'s fastest national 5G rollout',
      'Architecture: Standalone (SA) 5G — superior to competitor NSA networks',
      'Investment: ₹2 Lakh Crore total 5G capex',
      'Base stations: 1 Lakh+ deployed',
      'Next: 5,000 towns by 2025, rural coverage by 2026',
    ],
    source: 'Reliance Industries Q3 Report, TRAI',
  },
  {
    id: 'dmart-expansion',
    category: 'expansion', featured: true,
    headline: 'D-Mart Opens 40th Store in Tier 2 India, Targets 500 Stores by 2027',
    company: 'D-Mart (Avenue Supermarts)', sector: 'Retail', date: 'April 2024', location: 'Kota, Rajasthan',
    tag: 'Retail Expansion', coverPhoto: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=900&q=80',
    summary: 'D-Mart opened its 400th store in Kota, Rajasthan, as it accelerates Tier 2 and 3 city expansion to meet demand from rising middle-class consumers outside metros.',
    detail: 'Avenue Supermarts opened D-Mart\'s 400th store in Kota, Rajasthan — marking the retailer\'s deepening push into Tier 2 cities where modern retail penetration remains under 10%. D-Mart\'s unique model of owning (not leasing) all store properties has proved especially advantageous in Tier 2 cities where real estate is still affordable. The company plans to open 40–50 new stores annually, targeting 500 stores by 2027. Revenue per square foot at Tier 2 D-Mart stores is now 15% higher than metro stores, driven by lower competition and higher basket sizes from aspirational middle-class shoppers. D-Mart\'s revenue in FY24 crossed ₹50,000 crore.',
    keyPoints: [
      '400th store opened in Kota, Rajasthan',
      'Expansion rate: 40–50 new stores/year',
      'Target: 500 stores by 2027',
      'Tier 2 revenue/sq ft: 15% higher than metros',
      'FY24 Revenue: ₹50,000+ Crore',
    ],
    source: 'Avenue Supermarts Annual Report, BSE Filing',
  },
  {
    id: 'haldirams-expansion',
    category: 'expansion',
    headline: 'Haldiram\'s Opens First International Manufacturing Hub in Dubai to Serve Middle East & Africa',
    company: 'Haldiram\'s', sector: 'FMCG / Snacks', date: 'February 2024', location: 'Dubai, UAE',
    tag: 'International Expansion', coverPhoto: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&q=80',
    summary: 'Haldiram\'s launched its first overseas manufacturing facility in Dubai\'s JAFZA free zone to reduce import duties and serve Middle East, Africa, and Europe markets at lower cost.',
    detail: 'Haldiram\'s, India\'s largest snack brand, opened its first international manufacturing hub at Dubai\'s Jebel Ali Free Zone (JAFZA). The 50,000 sq ft facility produces Haldiram\'s full snack and sweets range — including bhujia, namkeen, and ready-to-eat products — for the Middle East, Africa, and European markets. Previously, all international sales were exports from India, leading to higher import duties in Gulf countries. The Dubai facility reduces landed cost by 18–22% and enables halal-certified production for Muslim-majority markets. Haldiram\'s exports to 80 countries; the Dubai hub targets doubling its ₹1,200 crore export revenue in 3 years.',
    keyPoints: [
      'Location: Jebel Ali Free Zone (JAFZA), Dubai',
      'Facility size: 50,000 sq ft',
      'Products: Full snack and sweets range, Halal-certified',
      'Cost reduction: 18–22% lower landed cost vs India export',
      'Export revenue target: ₹2,400 Crore (from current ₹1,200 Crore) in 3 years',
    ],
    source: 'Business Standard, Gulf News',
  },

  /* ─── FACTORY LAUNCH ─── */
  {
    id: 'tata-airbus-factory',
    category: 'factory-launch', featured: true,
    headline: 'PM Modi Inaugurates India\'s First Military Aircraft Factory — Tata-Airbus C-295 Plant in Vadodara',
    company: 'Tata Advanced Systems + Airbus', sector: 'Defence / Aerospace', date: 'October 2023', location: 'Vadodara, Gujarat',
    tag: 'Defence Manufacturing', coverPhoto: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=900&q=80',
    amount: '₹22,000 Crore Project',
    summary: 'India commissioned its first military aircraft manufacturing plant — a Tata-Airbus joint venture in Vadodara — to produce 40 C-295 transport aircraft for the Indian Air Force.',
    detail: 'Prime Minister Narendra Modi inaugurated the Tata-Airbus C-295 aircraft manufacturing facility at Vadodara, Gujarat — making India only the second country outside Europe to manufacture the C-295 military transport aircraft. The facility, developed by Tata Advanced Systems Limited (TASL) in partnership with Airbus Defence and Space, will produce 40 C-295 aircraft for the Indian Air Force under a ₹22,000 crore contract. The plant employs 3,000+ engineers and technicians, with 30,000+ indirect jobs expected through the supply chain. 16 of the 40 aircraft will be direct imports from Spain; 24 will be assembled in Vadodara with 60% Indian content. This is India\'s biggest Make in India success in the defence sector.',
    keyPoints: [
      'Aircraft: 40 C-295 transport aircraft for Indian Air Force',
      'Contract value: ₹22,000 Crore',
      'Direct jobs: 3,000+ (indirect: 30,000+)',
      'Indian content: 60% for domestically assembled aircraft',
      'Significance: Only 2nd country outside Europe to manufacture C-295',
    ],
    source: 'Ministry of Defence, Airbus Press Release, PIB',
  },
  {
    id: 'ola-futurefactory',
    category: 'factory-launch', featured: true,
    headline: 'Ola Electric\'s Futurefactory: World\'s Largest 2-Wheeler EV Plant — 10 Million Units/Year Capacity',
    company: 'Ola Electric', sector: 'Electric Vehicles', date: 'December 2023', location: 'Krishnagiri, Tamil Nadu',
    tag: 'EV Manufacturing', coverPhoto: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=900&q=80',
    amount: '₹7,614 Crore Investment',
    summary: 'Ola Electric\'s Futurefactory in Krishnagiri expanded to full 10-million-unit capacity, making it the world\'s largest 2-wheeler electric vehicle manufacturing plant.',
    detail: 'Ola Electric\'s Futurefactory in Krishnagiri district, Tamil Nadu reached its full Phase 2 production capacity of 10 million 2-wheeler EVs per year — becoming the world\'s largest 2-wheeler EV manufacturing plant by capacity. Built on 500 acres with ₹7,614 crore investment (and PLI scheme support), the factory is highly automated — 3,000+ robots operate across the production line with a human workforce of 10,000+. The facility is powered by a 100 MW solar plant (80% renewable energy). Ola has applied for the ACC (Advanced Chemistry Cell) PLI to build an adjacent Gigafactory for battery cell production, which would make Ola one of the world\'s few vertically integrated EV companies.',
    keyPoints: [
      'Capacity: 10 Million 2-Wheeler EVs/year — world\'s largest',
      'Investment: ₹7,614 Crore',
      'Area: 500 acres, Krishnagiri, Tamil Nadu',
      'Automation: 3,000+ robots, 10,000+ human workforce',
      'Energy: 100 MW solar (80% renewable)',
      'Next: Battery Gigafactory under ACC PLI scheme',
    ],
    source: 'Ola Electric Prospectus (SEBI), Tamil Nadu Govt Press Release',
  },
  {
    id: 'suzuki-factory',
    category: 'factory-launch',
    headline: 'Maruti Suzuki Opens New Haryana Plant — India\'s Largest Car Factory at ₹11,000 Crore',
    company: 'Maruti Suzuki India', sector: 'Automobiles', date: 'February 2024', location: 'Kharkhoda, Haryana',
    tag: 'Auto Manufacturing', coverPhoto: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=900&q=80',
    amount: '₹11,000 Crore',
    summary: 'Maruti Suzuki inaugurated its Kharkhoda facility in Haryana — India\'s largest single-location car manufacturing plant — with a capacity of 2.5 lakh vehicles/year in Phase 1.',
    detail: 'Maruti Suzuki India Limited inaugurated its new manufacturing facility at Kharkhoda, Haryana — the company\'s first new greenfield plant in 40 years. Phase 1 of the 800-acre facility has an annual capacity of 2.5 lakh vehicles, expandable to 10 lakh vehicles in subsequent phases — which would make it the largest single-location car plant in India. The ₹11,000 crore Phase 1 investment will produce Maruti\'s new SUV portfolio (Grand Vitara, Fronx, Jimny) to meet surging demand. Haryana provides Maruti GST incentives and land at concessional rates. Kharkhoda will employ 15,000+ workers directly and create 1 lakh+ jobs in the ancillary supply chain.',
    keyPoints: [
      'Location: Kharkhoda, Haryana — 800 acres',
      'Phase 1 capacity: 2.5 Lakh vehicles/year',
      'Full capacity: 10 Lakh vehicles/year (India\'s largest)',
      'Investment: ₹11,000 Crore (Phase 1)',
      'Products: Grand Vitara, Fronx, Jimny (SUV focus)',
      'Jobs: 15,000 direct, 1 Lakh+ indirect',
    ],
    source: 'Maruti Suzuki BSE Filing, Haryana Govt. Press Release',
  },

  /* ─── NEW PRODUCTS ─── */
  {
    id: 'jio-brain-product',
    category: 'new-products', featured: true,
    headline: 'Reliance Launches JioBrain — India\'s First Industrial AI Platform for Enterprise',
    company: 'Reliance Industries / Jio', sector: 'Technology / AI', date: 'October 2023', location: 'Mumbai',
    tag: 'AI Platform Launch', coverPhoto: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    summary: 'Reliance Jio launched JioBrain — a full-stack AI platform for Indian enterprises — at the Jio World Convention Centre in Mumbai, targeting ₹20,000 crore AI services market.',
    detail: 'Mukesh Ambani unveiled JioBrain at Reliance\'s Annual General Meeting — India\'s first full-stack enterprise AI platform built entirely on Indian infrastructure. JioBrain integrates with Jio\'s existing enterprise suite (JioCloud, JioMeet, JioPages) and offers large language models trained on Indian languages, OCR for Indian documents, speech recognition for 22 official languages, and industry-specific AI models for banking, retail, healthcare, and manufacturing. The platform is hosted on Jio\'s own data centres across India — a key differentiator for enterprises concerned about data sovereignty. Priced at ₹99–₹9,999/month for SMEs, JioBrain competes with Microsoft Azure AI, AWS Bedrock, and Google Vertex AI in the Indian market.',
    keyPoints: [
      'Product: JioBrain — full-stack enterprise AI platform',
      'Language support: 22 official Indian languages',
      'Differentiator: India-hosted (data sovereignty), Indian language LLMs',
      'Target: Indian enterprises, SMEs (₹99–₹9,999/month)',
      'Competition: Azure AI, AWS Bedrock, Google Vertex AI',
      'Market size targeted: ₹20,000 Crore AI services in India',
    ],
    source: 'Reliance AGM 2023, Economic Times',
  },
  {
    id: 'tata-ev-product',
    category: 'new-products', featured: true,
    headline: 'Tata Motors Launches Curvv EV — India\'s First Mass-Market Coupe SUV Electric Vehicle',
    company: 'Tata Motors', sector: 'Electric Vehicles', date: 'August 2024', location: 'Mumbai',
    tag: 'EV Launch', coverPhoto: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=80',
    amount: '₹17.49 Lakh starting price',
    summary: 'Tata Motors launched the Curvv EV — India\'s first coupe SUV EV — at ₹17.49 lakh, targeting urban professionals seeking premium design in an affordable EV.',
    detail: 'Tata Motors launched the Curvv EV — India\'s first mass-market coupe-SUV EV — at a starting price of ₹17.49 lakh (ex-showroom). The Curvv becomes the 5th EV in Tata\'s lineup (alongside Nexon, Tiago, Punch, and Tigor EVs) and targets India\'s fastest-growing premium EV segment (₹15–25 lakh). The vehicle offers 502 km ARAI range, 7.2 kW AC and 70 kW DC fast charging, and a 55 kWh battery. Tata Motors commands 60% of India\'s 4-wheeler EV market — the Curvv is designed to maintain this dominance as Hyundai Creta EV and Maruti\'s EV launches heat up the competition. First month bookings crossed 15,000 units.',
    keyPoints: [
      'Price: ₹17.49 Lakh (starting) — most affordable coupe SUV EV in India',
      'Range: 502 km ARAI certified',
      'Charging: 70 kW DC fast charging (0–80% in 40 minutes)',
      'Battery: 55 kWh',
      'Tata EV market share: 60% of India\'s 4-wheeler EV segment',
      'Bookings (Month 1): 15,000+ units',
    ],
    source: 'Tata Motors Press Release, Society of Indian Automobile Manufacturers (SIAM)',
  },
  {
    id: 'mamaearth-product',
    category: 'new-products',
    headline: 'Mamaearth Launches Ayurvedic Premium Line "Staze" — Targeting ₹5,000 Crore Luxury Skincare Market',
    company: 'Honasa Consumer (Mamaearth)', sector: 'D2C / FMCG', date: 'March 2024', location: 'Gurugram',
    tag: 'Brand Extension', coverPhoto: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80',
    summary: 'Mamaearth\'s parent Honasa Consumer launched premium skincare brand Staze targeting millennial women seeking science-backed ayurvedic skincare at ₹500–₹2,500 price points.',
    detail: 'Honasa Consumer, the listed parent of Mamaearth and Dot & Key, launched its third brand "Staze" — a premium ayurvedic skincare range targeting women aged 28–45 seeking science-validated traditional ingredients. Unlike Mamaearth (mass) and Dot & Key (premium millennial), Staze targets the under-served premium ayurvedic segment priced ₹500–₹2,500 per product. The brand launches with 24 SKUs across cleansing, serum, and moisturiser categories using gold bhasma, ashwagandha, and saffron actives paired with clinical-grade hyaluronic acid and retinol. Distribution will be D2C + Nykaa + offline modern trade. Revenue target for Staze in Year 1: ₹75 crore.',
    keyPoints: [
      'Brand: Staze — premium ayurvedic skincare by Honasa Consumer',
      'Price range: ₹500–₹2,500 per product',
      'Target: Women 28–45, premium ayurvedic segment',
      'Launch SKUs: 24 products across cleansing, serum, moisturiser',
      'Distribution: D2C, Nykaa, offline modern trade',
      'Year 1 Revenue Target: ₹75 Crore',
    ],
    source: 'Honasa Investor Presentation, Mint',
  },

  /* ─── ACQUISITIONS ─── */
  {
    id: 'reliance-disney-acq',
    category: 'acquisitions', featured: true,
    headline: 'Reliance–Disney $8.5 Billion Merger Creates India\'s Largest Media Company',
    company: 'Reliance Industries + Walt Disney India', sector: 'Media & Entertainment', date: 'February 2024', location: 'Mumbai',
    tag: 'Media Mega-Merger', coverPhoto: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=900&q=80',
    amount: '$8.5 Billion',
    summary: 'Reliance Industries and The Walt Disney Company merged their India media assets (Jio Cinema + Star India) to create a ₹70,000 crore entity controlling 40% of India\'s streaming and TV market.',
    detail: 'In India\'s largest-ever media deal, Reliance Industries\' digital and media assets (including Jio Cinema) merged with Disney\'s Indian operations (Star India, Hotstar) to create a new combined entity valued at $8.5 billion. Reliance holds 63.16% of the combined entity; Disney retains 36.84%. The merged company controls Star Sports, Star Plus, Hotstar, and Jio Cinema — giving it IPL broadcast rights, cricket content, Disney entertainment, and Bollywood. The deal creates India\'s dominant media entity with 750 million+ reach, 100+ TV channels, and 50 million+ streaming subscribers. Nita Ambani chairs the combined entity\'s board.',
    keyPoints: [
      'Deal value: $8.5 Billion — India\'s largest media merger',
      'Ownership: Reliance 63.16%, Disney 36.84%',
      'Combined reach: 750 Million+ across TV and streaming',
      'Streaming subscribers: 50 Million+',
      'Key assets: IPL rights, Star Sports, Star Plus, Hotstar, Disney+',
      'Chair: Nita Ambani (Reliance Foundation)',
    ],
    source: 'Reliance Industries BSE Filing, Reuters, Mint',
  },
  {
    id: 'zomato-blinkit-acq',
    category: 'acquisitions', featured: true,
    headline: 'Zomato Acquires Blinkit for ₹4,447 Crore — The Deal That Redefined Indian Quick Commerce',
    company: 'Zomato', sector: 'Food-Tech / Quick Commerce', date: 'August 2022', location: 'Gurugram',
    tag: 'Strategic Acquisition', coverPhoto: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80',
    amount: '₹4,447 Crore',
    summary: 'Zomato\'s ₹4,447 crore all-stock acquisition of Blinkit (formerly Grofers) transformed both companies — Blinkit is now Zomato\'s fastest-growing business, generating more revenue than food delivery in some quarters.',
    detail: 'Zomato acquired Blinkit (formerly Grofers) for ₹4,447 crore in an all-stock deal — one of India\'s most consequential startup acquisitions. At the time, Blinkit was burning cash and struggling to find a viable business model for quick commerce. Zomato\'s distribution network, brand, and customer base gave Blinkit the infrastructure to scale. Two years post-acquisition, Blinkit operates 600+ dark stores in 30+ cities, processes 3.5 lakh orders per day, and is now Zomato\'s fastest-growing business segment by GMV. The acquisition transformed Zomato from a food-delivery app to India\'s leading "instant commerce" platform. Blinkit\'s monthly contribution margin turned positive in Q3 FY24.',
    keyPoints: [
      'Deal: ₹4,447 Crore all-stock acquisition',
      'Blinkit today: 600+ dark stores, 30+ cities',
      'Orders/day: 3.5 Lakh',
      'Status: Fastest-growing Zomato segment by GMV',
      'Contribution margin: Positive from Q3 FY24',
      'Outcome: Zomato = food delivery + instant commerce platform',
    ],
    source: 'Zomato BSE Filing, Q3 FY24 Earnings, Entrackr',
  },
  {
    id: 'hdfc-bank-acq',
    category: 'acquisitions',
    headline: 'HDFC Bank Completes ₹6 Lakh Crore HDFC Ltd Merger — India\'s Largest Corporate Merger',
    company: 'HDFC Bank', sector: 'Banking & Financial Services', date: 'July 2023', location: 'Mumbai',
    tag: 'Financial Services Merger', coverPhoto: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80',
    amount: '₹6 Lakh Crore',
    summary: 'HDFC Bank and HDFC Ltd completed India\'s largest-ever corporate merger creating a financial services behemoth with ₹25 lakh crore in assets and 8,200+ branches.',
    detail: 'HDFC Bank completed its merger with parent company HDFC Limited — India\'s largest-ever corporate merger by asset value. The combined entity has a balance sheet of ₹25 lakh crore in assets, making it India\'s largest private sector bank and one of the world\'s top 10 banks by market capitalisation. The merger — approved by RBI, SEBI, IRDAI, NHB, and both shareholders — creates a universal financial services company offering home loans, personal loans, deposits, mutual funds, insurance, and private banking under one roof. HDFC Ltd\'s 5 million home loan customers are now HDFC Bank customers, giving the bank access to the most creditworthy segment of India\'s population.',
    keyPoints: [
      'Deal value: ₹6 Lakh Crore — India\'s largest corporate merger',
      'Combined assets: ₹25 Lakh Crore',
      'Branches: 8,200+',
      'Market cap: India\'s largest private bank',
      'HDFC Ltd customers absorbed: 5 Million home loan customers',
      'Regulators: RBI, SEBI, IRDAI, NHB all approved',
    ],
    source: 'RBI Approval Letter, BSE Filing, HDFC Bank Annual Report FY24',
  },

  /* ─── AWARDS ─── */
  {
    id: 'tcs-award',
    category: 'awards', featured: true,
    headline: 'TCS Ranked World\'s Most Valuable IT Services Brand for 3rd Consecutive Year — Brand Finance',
    company: 'Tata Consultancy Services', sector: 'IT Services', date: 'January 2024', location: 'Mumbai',
    tag: 'Global Brand Ranking', coverPhoto: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
    summary: 'TCS was ranked the world\'s most valuable IT services brand for the third consecutive year by Brand Finance, valued at $18.3 billion — ahead of Accenture, IBM, and Capgemini.',
    detail: 'Brand Finance\'s Global 500 2024 report ranked Tata Consultancy Services as the world\'s most valuable IT services brand for the third consecutive year, with a brand valuation of $18.3 billion. TCS outranked Accenture ($17.1B), IBM ($14.9B), Capgemini ($9.2B), and Infosys ($8.9B). The brand strength is attributed to TCS\'s consistent client retention (94.5%), revenue growth (₹2.4 lakh crore in FY24), and its positioning in AI-led transformation services. TCS serves 1,000+ clients in 55 countries, with 60%+ revenue from North America. The company\'s "contextual masters" AI strategy — which positions TCS as an AI-enabled business transformer rather than a technology vendor — has resonated with Fortune 500 clients.',
    keyPoints: [
      'Ranking: #1 IT services brand globally (3rd consecutive year)',
      'Brand value: $18.3 Billion (Brand Finance)',
      'vs. Competition: Accenture $17.1B, IBM $14.9B',
      'FY24 Revenue: ₹2.4 Lakh Crore',
      'Client retention: 94.5%',
      'Countries: 55',
    ],
    source: 'Brand Finance Global 500 2024, TCS Annual Report FY24',
  },
  {
    id: 'amul-award',
    category: 'awards', featured: true,
    headline: 'Amul Crowned India\'s #1 Most Trusted Brand for 11th Consecutive Year — Brand Trust Report',
    company: 'Amul (GCMMF)', sector: 'FMCG / Dairy', date: 'March 2024', location: 'Anand, Gujarat',
    tag: 'Consumer Trust Award', coverPhoto: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900&q=80',
    summary: 'Amul retained its position as India\'s most trusted brand in the Brand Trust Report 2024 — the only brand to hold the #1 position for 11 consecutive years.',
    detail: 'The Brand Trust Report 2024, India\'s largest primary consumer trust research covering 29,200 respondents across 16 cities, ranked Amul as India\'s #1 most trusted brand for the 11th consecutive year. Amul scored highest on dimensions of quality consistency, value for money, and emotional connection. The cooperative\'s ₹72,000 crore annual revenue — all flowing back to 36 lakh farmer-members — and its iconic advertising (the Amul girl) have built an intergenerational brand affinity unique in Indian FMCG. Amul is also the #1 trusted dairy brand globally in Asia-Pacific markets. The brand\'s expansion into protein products, high-value dairy exports, and ice cream has maintained relevance across demographics.',
    keyPoints: [
      'Rank: #1 Most Trusted Brand in India (11th consecutive year)',
      'Research: 29,200 respondents, 16 cities (Brand Trust Report 2024)',
      'Annual Revenue: ₹72,000 Crore',
      'Farmer Members: 36 Lakh',
      'Asia-Pacific: #1 trusted dairy brand',
      'New segments: Protein, high-value exports, ice cream',
    ],
    source: 'Brand Trust Report 2024, GCMMF Press Release',
  },
  {
    id: 'isro-award',
    category: 'awards',
    headline: 'ISRO Wins Aviation Week Laureate Award — Chandrayaan-3 Named World\'s Best Space Mission of 2023',
    company: 'ISRO', sector: 'Space / Government', date: 'February 2024', location: 'Bengaluru',
    tag: 'Global Space Award', coverPhoto: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=900&q=80',
    summary: 'ISRO\'s Chandrayaan-3 — the first mission to land near the Moon\'s South Pole — won Aviation Week\'s Laureate Award for Best Space Mission, chosen from 47 nominations globally.',
    detail: 'ISRO\'s Chandrayaan-3 won the Aviation Week Network Laureate Award 2024 in the Space category — one of the aerospace industry\'s most prestigious recognitions. Chandrayaan-3, which made India the first country to land near the Moon\'s South Pole on August 23, 2023, was selected from 47 global nominations including NASA\'s OSIRIS-REx sample return mission. The Vikram lander and Pragyan rover operated for 14 Earth days, confirming the presence of sulphur, aluminium, calcium, iron, and chromium in the South Pole regolith — data no previous mission had provided. The mission cost ₹615 crore — less than the production budget of many Hollywood space films — demonstrating India\'s "frugal innovation" advantage in space.',
    keyPoints: [
      'Award: Aviation Week Laureate Award — Best Space Mission 2024',
      'Achievement: First landing near Moon\'s South Pole',
      'Mission cost: ₹615 Crore (less than many Hollywood films)',
      'New elements confirmed: Sulphur, Aluminium, Calcium, Iron, Chromium',
      'Operation: 14 Earth days (Vikram + Pragyan)',
      'Selection: Chosen from 47 global nominations',
    ],
    source: 'Aviation Week Network, ISRO Press Release',
  },

  /* ─── GOVERNMENT SCHEMES ─── */
  {
    id: 'pli-scheme',
    category: 'govt-schemes', featured: true,
    headline: 'PLI Scheme Generates ₹8 Lakh Crore in Production, 7.5 Lakh Jobs in 4 Years',
    company: 'Government of India', sector: 'Manufacturing / Policy', date: 'March 2024', location: 'New Delhi',
    tag: 'Production Linked Incentive', coverPhoto: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    amount: '₹1.97 Lakh Crore Incentives Committed',
    summary: 'The Production Linked Incentive scheme across 14 sectors generated ₹8 lakh crore in production value and created 7.5 lakh direct jobs in 4 years — India\'s most successful industrial policy.',
    detail: 'The Production Linked Incentive (PLI) scheme, launched in 2020 across 14 sectors (smartphones, APIs, specialty chemicals, food processing, textiles, solar, batteries, white goods, automobiles, advanced chemistry cells, telecom, drones, medical devices, semiconductors), generated ₹8 lakh crore in production value in its first 4 years. Approved investments crossed ₹4 lakh crore; ₹1.97 lakh crore in incentives were committed to beneficiaries. Apple\'s iPhone production in India — enabled by the electronics PLI — crossed $14 billion in FY24. The pharmaceutical API PLI ended India\'s dependence on Chinese raw materials for 53 critical drugs. The automotive PLI is driving EV production with Ola Electric, Tata Motors, and Mahindra as beneficiaries.',
    keyPoints: [
      'Production value generated: ₹8 Lakh Crore (4 years)',
      'Jobs created: 7.5 Lakh direct',
      'Sectors: 14 (smartphones, pharma, EV, textiles, solar, etc.)',
      'Apple iPhone exports from India: $14 Billion (FY24)',
      'Incentives committed: ₹1.97 Lakh Crore',
      'Biggest success: Electronics (Apple), Pharma API (China +1), EVs',
    ],
    source: 'Ministry of Commerce, PIB, DPIIT Annual Report 2024',
  },
  {
    id: 'pm-svamitva',
    category: 'govt-schemes', featured: true,
    headline: 'PM SVAMITVA: 1.5 Crore Property Cards Issued to Rural Households — Land Rights Revolution',
    company: 'Government of India', sector: 'Rural Development / Policy', date: 'April 2024', location: 'Pan India',
    tag: 'Rural Property Rights', coverPhoto: 'https://images.unsplash.com/photo-1519944849880-1e363b9c7f42?w=900&q=80',
    amount: '₹566 Crore Scheme Budget',
    summary: 'PM SVAMITVA scheme issued 1.5 crore property cards to rural households using drone mapping technology — enabling villagers to use land as collateral for loans for the first time.',
    detail: 'The PM SVAMITVA (Survey of Villages and Mapping with Improvised Technology in Village Areas) scheme issued 1.5 crore property cards to rural households across 2.25 lakh villages in 25 states by April 2024. The scheme uses drone surveys to map rural residential areas — which were previously unmapped and could not be used as collateral for bank loans. With an official property card, rural households can now avail bank loans, resolve property disputes legally, and access government schemes that require property documentation. The scheme covers 6.62 lakh villages in India by 2025. States like Haryana, Uttar Pradesh, and Maharashtra have completed 100% village mapping. The economic impact: unlocking an estimated ₹45 lakh crore in untapped rural land wealth.',
    keyPoints: [
      'Property cards issued: 1.5 Crore households',
      'Villages covered: 2.25 Lakh (target: 6.62 Lakh by 2025)',
      'States completed: Haryana, UP, Maharashtra (100%)',
      'Technology: Drone mapping for accurate land boundary',
      'Impact: Rural land now usable as bank loan collateral',
      'Unlocked wealth estimate: ₹45 Lakh Crore in rural land',
    ],
    source: 'Ministry of Panchayati Raj, PIB, Down to Earth',
  },
  {
    id: 'pm-mudra-scheme',
    category: 'govt-schemes',
    headline: 'PM Mudra Yojana Crosses 46 Crore Loans — ₹26 Lakh Crore Disbursed to Micro Entrepreneurs',
    company: 'Government of India / SIDBI', sector: 'MSME / Financial Inclusion', date: 'January 2024', location: 'Pan India',
    tag: 'MSME Finance Scheme', coverPhoto: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
    amount: '₹26 Lakh Crore Disbursed',
    summary: 'PM Mudra Yojana crossed 46 crore loans and ₹26 lakh crore in total disbursement since 2015 — making it the world\'s largest micro-enterprise lending programme.',
    detail: 'PM Mudra Yojana (Micro Units Development & Refinance Agency) has disbursed ₹26 lakh crore across 46 crore loan accounts since its launch in April 2015 — making it the world\'s largest micro-enterprise lending programme. Mudra loans are available in three categories: Shishu (up to ₹50,000), Kishore (₹50,000–₹5 lakh), and Tarun (₹5 lakh–₹10 lakh). No collateral is required. 68% of borrowers are women; 50% are SC/ST and OBC. The average loan size is ₹57,000. Sectors served: micro food processing, textile, trades, vendors, artisans, services, and agriculture-allied activities. The NPA rate on Mudra loans is 3.4% — comparable to formal MSME lending despite zero collateral.',
    keyPoints: [
      'Total loans: 46 Crore accounts',
      'Total disbursed: ₹26 Lakh Crore',
      'Collateral: None required',
      'Women borrowers: 68%',
      'SC/ST and OBC borrowers: 50%',
      'NPA rate: 3.4% (comparable to formal MSME lending)',
    ],
    source: 'MUDRA Annual Report FY24, Ministry of Finance',
  },
];

/* ════════════════════════════════
   PAGE COMPONENT
════════════════════════════════ */
export default function BusinessNews({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'funding';
  const cat = NEWS_CATEGORIES.find(c => c.slug === slug) ?? NEWS_CATEGORIES[0];
  const items = NEWS.filter(n => n.category === slug);
  const featured = items.find(n => n.featured) ?? items[0];

  const [active, setActive] = useState<NewsItem>(featured);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const list = NEWS.filter(n => n.category === slug);
    setActive(list.find(n => n.featured) ?? list[0]);
  }, [slug]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
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
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Business News & Insights</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black px-3 py-1.5 border border-gray-200 hover:border-black transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial px-3 py-1.5 transition-colors">
              <BookmarkPlus className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </header>

      {/* ── Category Hero ── */}
      <div className="mt-14" style={{ background: cat.color }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-white/40 text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block">Business News & Insights</span>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl">{cat.icon}</span>
              <h1 className="font-serif text-white text-3xl md:text-5xl font-bold">{cat.label}</h1>
            </div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white px-3 py-1.5 mt-1">{cat.tag}</span>
          </div>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed">{items.length} stories · Curated for Indian business readers</p>
        </div>
      </div>

      {/* ── Category Switcher ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex">
          {NEWS_CATEGORIES.map(c => (
            <a key={c.slug} href={`/news/${c.slug}`}
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

          {/* ─ News List ─ */}
          <div className="lg:col-span-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">{items.length} News Items · {cat.label}</p>
            <div className="space-y-3">
              {items.map(item => (
                <button key={item.id}
                  onClick={() => { setActive(item); window.scrollTo({ top: 140, behavior: 'smooth' }); }}
                  className={`w-full text-left border transition-all duration-150 overflow-hidden group ${active.id === item.id ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex">
                    <div className="w-24 h-20 flex-shrink-0 overflow-hidden">
                      <img src={item.coverPhoto} alt={item.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex-1 min-w-0 bg-white">
                      {item.featured && (
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-1.5 py-0.5 mb-1 inline-block">Featured</span>
                      )}
                      <p className="text-xs font-bold leading-tight group-hover:text-editorial transition-colors line-clamp-2">{item.headline}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-gray-400 font-medium">{item.company}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                      </div>
                      {item.amount && <p className="text-[10px] font-bold text-editorial mt-0.5">{item.amount}</p>}
                    </div>
                    {active.id === item.id && <div className="w-1 bg-editorial flex-shrink-0" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ─ News Detail ─ */}
          <div className="lg:col-span-2">
            {active && (
              <div className="bg-white border border-gray-200">
                {/* Hero image */}
                <div className="relative h-52 md:h-64 overflow-hidden">
                  <img src={active.coverPhoto} alt={active.company} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-1">{active.tag}</span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-3 text-white/50 text-[10px] font-bold tracking-widest uppercase mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {active.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {active.location}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {active.sector}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Headline */}
                  <h2 className="font-serif text-xl md:text-2xl font-bold leading-tight mb-2">{active.headline}</h2>
                  {active.amount && (
                    <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 mb-4">
                      <TrendingUp className="w-3.5 h-3.5 text-editorial" />
                      <span className="text-sm font-bold">{active.amount}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed italic mb-5 border-l-4 border-editorial pl-4">{active.summary}</p>

                  {/* Full detail */}
                  <p className="text-sm text-gray-700 leading-[1.85] mb-6">{active.detail}</p>

                  {/* Key Points */}
                  <div className="bg-gray-50 border border-gray-200 p-5 mb-5">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-editorial" /> Key Points at a Glance
                    </p>
                    <div className="space-y-2">
                      {active.keyPoints.map((pt, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className="flex-shrink-0 w-5 h-5 bg-editorial flex items-center justify-center text-white text-[10px] font-bold mt-0.5">{i + 1}</span>
                          <p className="text-sm text-gray-700 leading-snug">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Source */}
                  <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3" />
                      <span>Source: {active.source}</span>
                    </span>
                    <span className="font-bold tracking-wider uppercase">{active.date}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
