import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, MapPin, Phone, Globe, Star, TrendingUp, Building2, Users, Search } from 'lucide-react';

export const FEATURED_CITIES = [
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat',     icon: '🏙️', tag: 'Textile & Trade Capital',  businesses: '4.2L+' },
  { slug: 'rajkot',    name: 'Rajkot',    state: 'Gujarat',     icon: '⚙️', tag: 'Engineering Hub',          businesses: '1.8L+' },
  { slug: 'vadodara',  name: 'Vadodara',  state: 'Gujarat',     icon: '🏭', tag: 'Chemical & Pharma Belt',   businesses: '2.1L+' },
  { slug: 'delhi',     name: 'Delhi NCR', state: 'Delhi',       icon: '🏛️', tag: 'India\'s Business Capital', businesses: '12L+' },
  { slug: 'surat',     name: 'Surat',     state: 'Gujarat',     icon: '💎', tag: 'Diamond & Textile City',   businesses: '3.5L+' },
  { slug: 'mumbai',    name: 'Mumbai',    state: 'Maharashtra', icon: '🌊', tag: 'Financial Capital of India',businesses: '15L+' },
];

/* ─── City data ───────────────────────── */
interface Business {
  name: string; category: string; since: string; founder: string;
  tagline: string; address: string; turnover: string; employees: string;
  speciality: string; rating: number; featured?: boolean;
}
interface CityData {
  name: string; state: string; icon: string; coverPhoto: string;
  tagline: string; gdpContrib: string; population: string; exportValue: string;
  majorIndustries: string[];
  spotlight: string;         // one-liner about the city's business character
  about: string[];
  sectors: { name: string; icon: string; units: string; desc: string }[];
  businesses: Business[];
  markets: { name: string; specialty: string; timings: string; location: string }[];
  schemes: { name: string; body: string; benefit: string }[];
  successStories: { company: string; founder: string; from: string; to: string; story: string }[];
}

const CITIES: Record<string, CityData> = {

  /* ════════ AHMEDABAD ════════ */
  ahmedabad: {
    name: 'Ahmedabad', state: 'Gujarat', icon: '🏙️',
    coverPhoto: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=80',
    tagline: 'Where Every Lane Has a Business Story',
    gdpContrib: '₹5.5 Lakh Crore', population: '87 Lakh', exportValue: '$22 Billion',
    majorIndustries: ['Textiles & Apparel', 'Pharmaceuticals', 'Chemicals', 'IT / BPO', 'Diamonds', 'Real Estate', 'FMCG Manufacturing'],
    spotlight: 'Ahmedabad is India\'s oldest stock exchange city and the birthplace of the cooperative movement. Its traders have been doing business across the globe since the Mughal era — and they haven\'t slowed down.',
    about: [
      'Ahmedabad — now a UNESCO World Heritage City — is Gujarat\'s commercial engine. The city\'s Marwari and Jain trading communities built merchant empires over 600 years. Today, those same communities run pharmaceutical multinationals, fashion exporters, and logistics conglomerates.',
      'The city\'s business identity is built on two pillars: the mill district legacy (Ahmedabad was once called the "Manchester of the East" for its textile mills) and the new-age pharmaceutical-chemicals corridor stretching along NH-48. Between these poles sits a thriving MSME ecosystem of 4.2 lakh+ registered businesses.',
      'Ahmedabad also hosts GIFT City — India\'s first operational international financial centre — which is drawing global banks, fintech companies, and insurance firms. The city is transforming from a textile town into a financial and pharma powerhouse.',
    ],
    sectors: [
      { name: 'Textiles & Apparel', icon: '🧵', units: '40,000+', desc: 'From raw cotton to fashion exports. Ahmedabad accounts for 30% of India\'s textile machinery production.' },
      { name: 'Pharmaceuticals', icon: '💊', units: '5,000+', desc: 'Zydus, Torrent, Alembic, Intas — all Ahmedabad-born. The city produces 40% of India\'s pharmaceutical exports.' },
      { name: 'Chemicals', icon: '🧪', units: '3,500+', desc: 'Specialty chemicals, dyes, intermediates. Gujarat accounts for 60% of India\'s chemicals, with Ahmedabad as the trading hub.' },
      { name: 'GIFT City Fintech', icon: '💹', units: '400+', desc: 'India\'s IFSC (International Financial Services Centre). 400+ registered entities including Goldman Sachs, Deutsche Bank.' },
      { name: 'IT & BPO', icon: '💻', units: '2,200+', desc: 'Fastest-growing sector. SG Highway and Science City corridors host 2,200+ tech companies.' },
      { name: 'Food & FMCG', icon: '🍽️', units: '8,000+', desc: 'Amul\'s marketing HQ. Pioma (Rasna), Adani Wilmar (Fortune Oil), Balaji Wafers — all from the Ahmedabad region.' },
    ],
    businesses: [
      { name: 'Torrent Pharmaceuticals', category: 'Pharmaceuticals', since: '1959', founder: 'Uttambhai Mehta', tagline: 'Cardiovascular & CNS therapy leader', address: 'Torrent House, Off Ashram Road, Ahmedabad', turnover: '₹10,000 Cr', employees: '14,000+', speciality: 'Generic drugs exported to 40+ countries', rating: 4.8, featured: true },
      { name: 'Zydus Lifesciences', category: 'Pharmaceuticals', since: '1952', founder: 'Ramanbhai Patel', tagline: 'India\'s COVID vaccine maker — ZyCoV-D', address: 'Zydus Corporate Park, Sarkhej, Ahmedabad', turnover: '₹18,000 Cr', employees: '25,000+', speciality: 'First DNA vaccine in the world for COVID', rating: 4.9, featured: true },
      { name: 'Adani Wilmar', category: 'FMCG / Edible Oil', since: '1999', founder: 'Gautam Adani & Wilmar International', tagline: 'Fortune — India\'s #1 edible oil brand', address: 'Fortune House, Shikhar, Ahmedabad', turnover: '₹61,000 Cr', employees: '5,000+', speciality: 'Fortune brand dominates 18% of India\'s edible oil market', rating: 4.7, featured: true },
      { name: 'Intas Pharmaceuticals', category: 'Pharmaceuticals', since: '1984', founder: 'Hasmukh Chudgar', tagline: 'HIV and oncology specialist', address: 'Intas House, Satellite, Ahmedabad', turnover: '₹12,000 Cr', employees: '16,000+', speciality: 'One of India\'s largest private pharma companies', rating: 4.6 },
      { name: 'Balaji Wafers', category: 'Food & Snacks', since: '1982', founder: 'Chandubhai Virani', tagline: 'From farm to ₹5,000 Crore snack empire', address: 'Rajkot–Gondal Road, near Ahmedabad', turnover: '₹5,000 Cr', employees: '10,000+', speciality: 'Gujarat\'s homegrown answer to Lays', rating: 4.8, featured: true },
      { name: 'Pioma Industries (Rasna)', category: 'FMCG / Beverages', since: '1976', founder: 'Areez Pirojshaw Khambatta', tagline: '"I love you Rasna" — 45 years of thirst', address: 'Navrangpura, Ahmedabad', turnover: '₹1,200 Cr', employees: '2,500+', speciality: 'Largest selling beverage concentrate in India', rating: 4.7 },
    ],
    markets: [
      { name: 'Manek Chowk', specialty: 'Jewellery, silver, gold and commodities', timings: '10 AM – 10 PM (jewellery), 11 PM – 5 AM (street food)', location: 'Old City, near Bhadra Fort' },
      { name: 'Cloth Market (Kalupur)', specialty: 'Wholesale textiles, sarees, fabrics', timings: '9 AM – 8 PM, Closed Sundays', location: 'Kalupur, Old Ahmedabad' },
      { name: 'Law Garden Market', specialty: 'Handicrafts, chaniya choli, folk art', timings: '6 PM – 11 PM (Evening market)', location: 'Near Ellis Bridge, Ahmedabad' },
      { name: 'Raipur Darwaza Chemical Market', specialty: 'Chemicals, dyes, intermediates — wholesale', timings: '9 AM – 7 PM, Closed Sundays', location: 'Raipur, Old City' },
    ],
    schemes: [
      { name: 'GIFT City IFSC Benefits', body: 'International Financial Services Centre Authority (IFSCA) incentives', benefit: '100% tax holiday for 10 years on IFSC profits. Zero GST on services.' },
      { name: 'Gujarat Pharma & Biotech Policy', body: 'State scheme for pharma park units', benefit: 'Capital subsidy up to 10% on plant & machinery. Electricity duty exemption for 5 years.' },
      { name: 'Vibrant Gujarat MSME Scheme', body: 'For units in notified industrial estates', benefit: 'Stamp duty exemption, power tariff concession, interest subsidy up to 7%.' },
    ],
    successStories: [
      { company: 'Balaji Wafers', founder: 'Chandubhai Virani', from: 'Selling leftover potato chips from a cinema canteen in 1974', to: '₹5,000 Crore company with 65% market share in Gujarat', story: 'Chandubhai and his brothers started by manually slicing potatoes and selling snacks outside a cinema in Rajkot. They reinvested every rupee, built India\'s most automated wafer plant, and never took outside investment. Today, Balaji outsells Lays in Gujarat.' },
      { company: 'Rasna', founder: 'Areez Khambatta', from: 'A beverage formula developed in a home kitchen, 1976', to: 'India\'s largest beverage concentrate brand — 2.5 crore packets sold daily', story: 'Areez Khambatta created Rasna as a cold drink alternative for the Indian middle class that couldn\'t afford Coca-Cola. The "I love you Rasna" campaign became one of India\'s most memorable ads. Rasna now sells in 60 countries.' },
    ],
  },

  /* ════════ RAJKOT ════════ */
  rajkot: {
    name: 'Rajkot', state: 'Gujarat', icon: '⚙️',
    coverPhoto: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    tagline: 'The Workshop of Gujarat',
    gdpContrib: '₹1.2 Lakh Crore', population: '18 Lakh', exportValue: '$4 Billion',
    majorIndustries: ['Engineering & Auto Components', 'Brass Parts & Fittings', 'Ceramics & Tiles', 'Cast Iron', 'Diesel Engines', 'Watches & Clocks', 'Textiles'],
    spotlight: 'Rajkot is India\'s engineering heartland — a city where MSMEs manufacture world-class auto components, diesel engines, and precision brass parts that go into machines across 80 countries. It is India\'s answer to the German Mittelstand.',
    about: [
      'Rajkot is often called the "Birmingham of India" — a city whose industrial character was shaped by small workshops that collectively produce more engineering output per square kilometre than almost anywhere in the country. Over 1 lakh engineering MSMEs operate within a 50 km radius of the city.',
      'The city\'s brass parts cluster is globally dominant: Rajkot manufactures 60% of India\'s brass precision components, supplying to automotive, plumbing, electrical, and defence sectors worldwide. German, Italian, and US buyers regularly source from Rajkot factories that are 50-person operations but hold ISO 9001 and IATF 16949 certifications.',
      'Beyond engineering, Rajkot is also a major ceramics hub — its floor tiles and sanitaryware brands (Varmora, Somany have roots here) are sold across India. The city is Gandhi\'s hometown, a fact its residents wear with quiet pride.',
    ],
    sectors: [
      { name: 'Brass Parts & Precision', icon: '🔩', units: '3,000+', desc: 'Rajkot supplies 60% of India\'s brass precision components. Exported to Germany, US, Japan.' },
      { name: 'Auto Components', icon: '🚗', units: '8,000+', desc: 'Castings, forgings, machined parts for Hero, Bajaj, TVS, and OEMs across India.' },
      { name: 'Diesel Engines', icon: '⚡', units: '500+', desc: 'India\'s largest diesel engine cluster. Kirloskar, Cooper — most competitors are Rajkot-born.' },
      { name: 'Ceramics & Tiles', icon: '🏠', units: '400+', desc: 'Floor tiles, wall tiles, sanitaryware. Varmora, Navneet Ceramics — pan-India brands.' },
      { name: 'Textile & Garments', icon: '🧵', units: '5,000+', desc: 'Patola weaving (GI-tagged), cotton garments, hosiery — mid-market and export-oriented.' },
      { name: 'Watches & Clocks', icon: '⏰', units: '200+', desc: 'HMT legacy lives on. Rajkot still has clock movement manufacturers supplying India\'s market.' },
    ],
    businesses: [
      { name: 'Varmora Granito', category: 'Ceramics & Tiles', since: '1990', founder: 'Bhavesh Patel', tagline: 'Premium Italian-look tiles, Made in Rajkot', address: 'Varmora House, Gondal Road, Rajkot', turnover: '₹1,800 Cr', employees: '3,500+', speciality: 'Vitrified tiles sold in 50+ countries', rating: 4.6, featured: true },
      { name: 'Balaji Wafers (Origin)', category: 'FMCG', since: '1982', founder: 'Chandubhai Virani', tagline: 'The snack empire that started here', address: 'Near Rajkot, Gujarat', turnover: '₹5,000 Cr', employees: '10,000+', speciality: 'Started in Rajkot. Still has primary plant here.', rating: 4.8, featured: true },
      { name: 'Jyoti CNC Automation', category: 'CNC Machines', since: '1989', founder: 'Parakramsinh Jadeja', tagline: 'World-class CNC machines from Rajkot', address: 'Metoda GIDC, Rajkot', turnover: '₹2,000 Cr', employees: '4,000+', speciality: 'Exports CNC machines to 45 countries. Competes with Mazak, DMG Mori.', rating: 4.9, featured: true },
      { name: 'Atul Auto', category: 'Three-Wheelers', since: '1986', founder: 'Jayantibhai Chandra', tagline: 'Rural India\'s three-wheeler of choice', address: 'Shapar, Rajkot', turnover: '₹800 Cr', employees: '2,000+', speciality: 'Dominant in rural 3W market in UP, Bihar, Rajasthan', rating: 4.5 },
      { name: 'Tata Metaliks (Casting)', category: 'Cast Iron', since: '1994', founder: 'Tata Group', tagline: 'Ductile iron pipes — water for millions', address: 'Rajkot', turnover: '₹3,000 Cr', employees: '3,000+', speciality: 'Largest ductile iron pipe manufacturer in India', rating: 4.7 },
    ],
    markets: [
      { name: 'Soni Bazar', specialty: 'Gold, silver, jewellery wholesale', timings: '9 AM – 8 PM, Closed Sundays', location: 'Kasturba Road, Old City Rajkot' },
      { name: 'Kharod Bazaar', specialty: 'Hardware, engineering tools, machine parts', timings: '8 AM – 7 PM', location: 'Near Dhebar Road, Rajkot' },
      { name: 'Metoda GIDC', specialty: 'Industrial estate — auto parts, engineering cluster', timings: 'Industrial hours 7 AM – 5 PM', location: 'Metoda, 20 km from Rajkot city' },
    ],
    schemes: [
      { name: 'Rajkot Brass Parts Cluster Scheme', body: 'MSME Ministry Common Facility Centre for brass precision parts', benefit: 'Subsidised CNC machines, testing labs, design centre.' },
      { name: 'Gujarat MSME Loan Scheme', body: 'Gujarat government interest subvention', benefit: 'Up to 7% interest subvention on term loans up to ₹1 Crore for new units.' },
    ],
    successStories: [
      { company: 'Jyoti CNC Automation', founder: 'Parakramsinh Jadeja', from: 'A small machine shop in Rajkot\'s industrial estate, 1989', to: 'India\'s largest CNC machine tool maker. Exports to 45 countries.', story: 'Jadeja started Jyoti with 8 workers and one lathe machine. He refused to just supply parts — he wanted to build the machines that made the parts. Today Jyoti\'s VMC machines compete with German and Japanese brands on quality, at 40% lower cost. Japan\'s DMG Mori signed a partnership with Jyoti in 2022.' },
    ],
  },

  /* ════════ VADODARA ════════ */
  vadodara: {
    name: 'Vadodara', state: 'Gujarat', icon: '🏭',
    coverPhoto: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    tagline: 'Gujarat\'s Chemical & Culture Capital',
    gdpContrib: '₹1.8 Lakh Crore', population: '22 Lakh', exportValue: '$6 Billion',
    majorIndustries: ['Chemicals & Petrochemicals', 'Fertilisers', 'Engineering', 'Pharmaceuticals', 'Defence Manufacturing', 'IT / Electronics', 'Food Processing'],
    spotlight: 'Vadodara is where chemistry meets culture — home to ONGC, GSFC, and the largest cluster of heavy chemical plants in India, while also being the cultural heartland of Gujarat with M.S. University, India\'s finest arts institution.',
    about: [
      'Vadodara (Baroda) is arguably Gujarat\'s most intellectually interesting city — it blends heavy industry with classical arts, scientific institutions with traditional Garba, and old Gaekwad royalty with new-age engineering companies. The Laxmi Vilas Palace sits 3 km from India\'s largest fertiliser complex.',
      'The city\'s industrial base was built by PSUs in the 1960s and 70s — ONGC, GSFC, IPCL (now Reliance), Gujarat Alkalies — which created a skills base that later fed private industry. Today, Vadodara\'s chemicals cluster is the deepest in India, producing everything from basic petrochemicals to specialty agrochemicals.',
      'Defence is a newer pillar — Vadodara houses C-295 aircraft assembly by Tata-Airbus (India\'s first military aircraft manufacturing), making it one of only 5 cities in the world that produce military transport aircraft.',
    ],
    sectors: [
      { name: 'Chemicals & Petrochem', icon: '🧪', units: '4,000+', desc: 'ONGC refinery, Reliance (IPCL), GSFC — India\'s deepest petrochem value chain.' },
      { name: 'Fertilisers', icon: '🌾', units: '300+', desc: 'GSFC (Gujarat State Fertilisers) — world\'s largest single-location fertiliser complex.' },
      { name: 'Defence & Aerospace', icon: '✈️', units: '50+', desc: 'Tata-Airbus C-295 plant. India\'s first military aircraft manufacturing.' },
      { name: 'Engineering & Fabrication', icon: '⚙️', units: '6,000+', desc: 'Process plant equipment, pressure vessels, heat exchangers — for refineries globally.' },
      { name: 'IT & Electronics', icon: '💻', units: '1,200+', desc: 'Fastest-growing segment. M.S. University tech graduates fuel startup ecosystem.' },
      { name: 'Food Processing', icon: '🍽️', units: '3,000+', desc: 'Vadodara\'s mango processing, frozen foods, spices — export-oriented.' },
    ],
    businesses: [
      { name: 'GSFC (Gujarat State Fertilisers)', category: 'Fertilisers / Chemicals', since: '1962', founder: 'Government of Gujarat', tagline: 'World\'s largest single-location fertiliser complex', address: 'GSFC Vadodara, Near Fertilisernagar', turnover: '₹12,000 Cr', employees: '6,000+', speciality: 'Urea, DAP, and specialty chemicals for Indian agriculture', rating: 4.5, featured: true },
      { name: 'Alembic Pharmaceuticals', category: 'Pharmaceuticals', since: '1907', founder: 'Agatsinh Gordhandas Bhatt', tagline: 'India\'s oldest pharma company', address: 'Alembicnagar, Vadodara', turnover: '₹5,000 Cr', employees: '9,000+', speciality: '115-year-old company. Largest US-approved pharma plant in India.', rating: 4.7, featured: true },
      { name: 'Tata Advanced Systems (C-295)', category: 'Defence / Aerospace', since: '2022', founder: 'Tata Group + Airbus', tagline: 'India\'s first military aircraft factory', address: 'Vadodara Aerospace SEZ', turnover: 'N/A (new)', employees: '3,000+', speciality: 'First outside Europe plant to make C-295 transport aircraft', rating: 5.0, featured: true },
      { name: 'Elecon Engineering', category: 'Engineering', since: '1951', founder: 'Prayasvin Patel', tagline: 'India\'s largest gear and conveyor maker', address: 'Anand-Sojitra Road, near Vadodara', turnover: '₹1,500 Cr', employees: '3,500+', speciality: 'Gearboxes and material handling equipment for steel, cement, mining', rating: 4.6 },
    ],
    markets: [
      { name: 'Lehripura Market', specialty: 'Chemicals and industrial raw material trading', timings: '8 AM – 7 PM weekdays', location: 'Lehripura, Vadodara' },
      { name: 'Fatehgunj Market', specialty: 'Electronics, household goods, retail', timings: '10 AM – 9 PM', location: 'Fatehgunj, Central Vadodara' },
      { name: 'Vadodara Laxmipura Market', specialty: 'Textiles, sarees, dress materials', timings: '9 AM – 8 PM', location: 'Laxmipura, Old Vadodara' },
    ],
    schemes: [
      { name: 'Aerospace & Defence SEZ', body: 'Vadodara Aerospace SEZ for C-295 and ancillary manufacturers', benefit: '100% customs duty exemption, income tax benefit for 15 years.' },
      { name: 'Gujarat Chemical Zone Incentive', body: 'For chemical units in Nandesari and Padra industrial zones', benefit: 'Electricity tariff concession, pollution control subsidy, land at concessional rate.' },
    ],
    successStories: [
      { company: 'Alembic Pharmaceuticals', founder: 'Agatsinh Gordhandas Bhatt', from: 'A small distillery and pharmacy in 1907 Baroda', to: '₹5,000 Crore pharma company with the largest US-approved plant in India', story: 'Alembic started as a distillery in the era of the Gaekwad royals. It pivoted to pharmaceuticals in the 1940s and became the first Indian company to manufacture penicillin. 115 years later, it is still founder-family owned and debt-free — a remarkable feat in Indian pharma.' },
    ],
  },

  /* ════════ DELHI ════════ */
  delhi: {
    name: 'Delhi NCR', state: 'Delhi / NCR', icon: '🏛️',
    coverPhoto: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80',
    tagline: 'India\'s Business Capital — Old Money, New Power',
    gdpContrib: '₹15 Lakh Crore', population: '3.3 Crore', exportValue: '$35 Billion',
    majorIndustries: ['IT & Tech (Gurugram/Noida)', 'Retail & E-Commerce', 'Real Estate', 'Healthcare', 'Automobiles', 'FMCG', 'Government & Defence Supply', 'Media & Entertainment'],
    spotlight: 'Delhi NCR is where government meets business, where old Lala wealth meets Silicon Valley money, and where every industry in India has its national HQ. It is simultaneously the most competitive and the most politically connected business environment in the country.',
    about: [
      'Delhi NCR — encompassing Delhi, Gurugram, Noida, Faridabad, and Ghaziabad — is India\'s most powerful commercial ecosystem. Gurugram alone hosts the Indian headquarters of over 250 Fortune 500 companies. Noida is India\'s second-largest IT hub after Bengaluru. Old Delhi\'s bazaars in Chandni Chowk still trade ₹5,000 crore annually in a single market.',
      'The region\'s business character is defined by proximity to government — central ministry relationships, government contracts, and regulatory intelligence are competitive advantages that no other city offers. This is why FMCG companies, defence contractors, media conglomerates, and consultancies plant their national headquarters in Delhi.',
      'Post-2014, Gurugram has emerged as India\'s startup capital after Bengaluru — hosting Zomato, PolicyBazaar, MakeMyTrip, Paytm (Noida), IndiaMart, and dozens of unicorns. The corridor between Cyber Hub and Cyber City is India\'s most dense concentration of startup office space.',
    ],
    sectors: [
      { name: 'IT & Tech (Gurugram/Noida)', icon: '💻', units: '15,000+', desc: 'India\'s 2nd-largest tech hub. 250+ MNC India HQs, 40+ unicorns.' },
      { name: 'Wholesale Retail (Old Delhi)', icon: '🛍️', units: '50,000+', desc: 'Chandni Chowk, Sadar Bazaar, Karol Bagh — India\'s largest wholesale markets.' },
      { name: 'Real Estate', icon: '🏙️', units: '8,000+', desc: 'DLF, Godrej, Prestige, M3M — biggest luxury and commercial real estate market in India.' },
      { name: 'Healthcare', icon: '🏥', units: '4,000+', desc: 'AIIMS, Fortis, Max, Apollo — India\'s healthcare capital for advanced treatment.' },
      { name: 'Media & Entertainment', icon: '📺', units: '2,500+', desc: 'Bollywood may be in Mumbai, but news media, advertising, and digital content are in Delhi.' },
      { name: 'Government Supply & Defence', icon: '🛡️', units: '20,000+', desc: 'Government procurement-linked MSME ecosystem. Largest B2G market in India.' },
    ],
    businesses: [
      { name: 'Zomato', category: 'Food-Tech / Delivery', since: '2008', founder: 'Deepinder Goyal', tagline: 'From IIT Delhi canteen menu to ₹2 lakh Crore market cap', address: '138-148, Sector 44, Gurugram', turnover: '₹14,000 Cr', employees: '5,000+ (+ 3L delivery partners)', speciality: 'India\'s #1 food delivery. Also owns Hyperpure B2B and Blinkit.', rating: 4.8, featured: true },
      { name: 'PolicyBazaar (PB Fintech)', category: 'Insurtech / Fintech', since: '2008', founder: 'Yashish Dahiya', tagline: 'Made insurance comparison a habit for 10 crore Indians', address: 'Plot No. 119, Sector 44, Gurugram', turnover: '₹3,500 Cr', employees: '10,000+', speciality: 'India\'s largest insurance marketplace. ₹30,000 Cr market cap.', rating: 4.7, featured: true },
      { name: 'Hero MotoCorp', category: 'Automobiles', since: '1984', founder: 'Brijmohan Lall Munjal', tagline: 'World\'s largest two-wheeler company', address: 'Sarita Vihar, New Delhi', turnover: '₹38,000 Cr', employees: '9,000+', speciality: '8 million motorcycles a year. Dominant in rural India.', rating: 4.7, featured: true },
      { name: 'IndiaMart', category: 'B2B E-Commerce', since: '1999', founder: 'Dinesh Agarwal', tagline: '100 million Indian SMEs\' first online marketplace', address: 'Tower 2, Sector 63, Noida', turnover: '₹1,200 Cr', employees: '3,500+', speciality: 'Listed. 7 million+ suppliers. India\'s largest B2B marketplace.', rating: 4.6 },
      { name: 'Lenskart', category: 'Eyewear / D2C', since: '2010', founder: 'Peyush Bansal', tagline: 'Disrupting India\'s ₹10,000 Crore eyewear market', address: 'Okhla Industrial Estate, New Delhi', turnover: '₹2,800 Cr', employees: '5,000+', speciality: 'Asia\'s largest eyewear company. 2,000+ stores. SoftBank-backed.', rating: 4.6, featured: true },
    ],
    markets: [
      { name: 'Chandni Chowk', specialty: 'Wholesale everything — spices, textiles, electronics, jewellery, books', timings: '9 AM – 8 PM, Closed Mondays', location: 'Old Delhi, near Red Fort Metro Station' },
      { name: 'Sadar Bazaar', specialty: 'Plastic goods, household items wholesale — India\'s largest', timings: '8 AM – 7 PM weekdays', location: 'Sadar Bazaar, Central Delhi' },
      { name: 'Karol Bagh', specialty: 'Electronics, garments, accessories — retail and wholesale', timings: '10 AM – 9 PM, Closed Sundays', location: 'Karol Bagh, Central Delhi' },
      { name: 'Okhla Industrial Area', specialty: 'Garment manufacturing and export, light engineering', timings: 'Industrial hours', location: 'South Delhi / Faridabad border' },
    ],
    schemes: [
      { name: 'Delhi Industrial Policy 2021', body: 'State government incentives for manufacturing units in approved zones', benefit: 'Capital subsidy 15–25%, SGST reimbursement, power at concessional rate.' },
      { name: 'Startup Delhi', body: 'Delhi government startup support program', benefit: 'Seed funding up to ₹25 lakh for eligible startups. Mentorship. Office space subsidy.' },
      { name: 'DPIIT Startup Recognition', body: 'Central government recognition for startups registered in Delhi/NCR', benefit: 'Tax exemptions (Sec 80IAC), ESOP tax deferral, fast-track IP filing.' },
    ],
    successStories: [
      { company: 'Zomato', founder: 'Deepinder Goyal', from: 'Scanning restaurant menus at IIT Delhi for fun, 2008', to: '₹2 Lakh Crore market cap, 300 million users, Blinkit acquisition', story: 'Deepinder Goyal and Pankaj Chaddah built Zomato because they were tired of waiting in line for the office canteen menu. They digitised restaurant menus, then discovered delivery was the real opportunity. Zomato has now delivered over 3 billion orders and acquired Blinkit to become India\'s largest grocery delivery platform.' },
    ],
  },

  /* ════════ SURAT ════════ */
  surat: {
    name: 'Surat', state: 'Gujarat', icon: '💎',
    coverPhoto: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1600&q=80',
    tagline: 'Diamond City of the World',
    gdpContrib: '₹3 Lakh Crore', population: '70 Lakh', exportValue: '$28 Billion',
    majorIndustries: ['Diamonds (Cutting & Polishing)', 'Textiles & Man-Made Fibres', 'Chemicals', 'Plastics', 'Gems & Jewellery', 'Financial Services', 'Shipping & Logistics'],
    spotlight: 'Surat processes 90% of the world\'s diamonds — every diamond in a De Beers ring, a Tiffany solitaire, or an Indian wedding set was almost certainly cut in Surat. It also makes 40% of India\'s man-made fibre fabrics. This city punches above every weight class.',
    about: [
      'Surat is one of the fastest-growing cities on earth — it has sustained double-digit GDP growth for over two decades, driven by its diamond cutting industry and man-made fibre textile cluster. The city\'s traders are legendary for speed, frugality, and a work ethic that borders on the obsessive.',
      'The diamond industry alone generates over $28 billion in exports annually. In Surat\'s Varachha and Katargam areas, 800,000 artisans (known as "karigars") cut and polish diamonds in thousands of workshops. These karigars have transformed rough stones from Africa, Russia, and Canada into polished gems that end up in New York, London, and Tokyo.',
      'The textile industry — centred on man-made fibres (polyester, nylon) — produces 40% of India\'s fabric output. Surat\'s Mills Road and Ring Road areas are home to thousands of weaving, dyeing, and embroidery units that supply fashion brands across India and export to the Middle East and Southeast Asia.',
    ],
    sectors: [
      { name: 'Diamond Cutting & Polishing', icon: '💎', units: '5,000+', desc: '90% of world\'s diamonds processed here. $28 billion annual export. 8 lakh karigars.' },
      { name: 'Textiles & Man-Made Fibres', icon: '🧵', units: '50,000+', desc: '40% of India\'s fabric output. Polyester, georgette, chiffon, embroidery fabrics.' },
      { name: 'Gems & Jewellery', icon: '💍', units: '3,000+', desc: 'From rough diamond to set jewellery. Growing share of design and branded jewellery.' },
      { name: 'Chemicals & Dyes', icon: '🧪', units: '2,000+', desc: 'Textile processing chemicals, dyes, reactive chemicals — mostly for in-house use.' },
      { name: 'Plastics', icon: '📦', units: '4,000+', desc: 'Plastic pipes, packaging, furniture components — Surat is Gujarat\'s plastics hub.' },
      { name: 'Financial Services', icon: '💹', units: '800+', desc: 'Diamond trading creates large capital pools. NBFC and cooperative banking are strong.' },
    ],
    businesses: [
      { name: 'SRK Empire (Diamond)', category: 'Diamond Trading & Export', since: '1969', founder: 'Govind Dholakia (Rashmi)', tagline: 'World\'s most ethical diamond company', address: 'SRK House, Varachha Road, Surat', turnover: '₹25,000 Cr', employees: '7,000+', speciality: 'Largest diamond employer in India. Gives cars, homes to long-service workers.', rating: 4.9, featured: true },
      { name: 'Kiran Gems', category: 'Diamond Manufacturing', since: '1985', founder: 'Vallabhbhai Lakhani', tagline: 'Lab-grown diamond pioneer from Surat', address: 'Udhna, Surat', turnover: '₹10,000 Cr', employees: '10,000+', speciality: 'One of world\'s largest lab-grown diamond companies', rating: 4.8, featured: true },
      { name: 'Garden Silk Mills', category: 'Textiles', since: '1979', founder: 'Praful Shah', tagline: 'Surat\'s fabric goes global with Garden', address: 'Sahara Gate, Surat', turnover: '₹1,200 Cr', employees: '5,000+', speciality: 'Branded sarees and fashion fabrics sold in 60 countries', rating: 4.5 },
      { name: 'Sheetal Manufacturing', category: 'Diamond / Jewellery', since: '1990', founder: 'Arpit Mehta', tagline: 'From rough to retail — full diamond pipeline', address: 'Katargam, Surat', turnover: '₹3,500 Cr', employees: '4,000+', speciality: 'Rough procurement to polished export to own branded retail', rating: 4.6, featured: true },
    ],
    markets: [
      { name: 'Surat Diamond Bourse (SDB)', specialty: 'World\'s largest diamond trading centre. 4,200 offices.', timings: '9 AM – 6 PM weekdays', location: 'Khajod, near Surat Airport' },
      { name: 'Ring Road Textile Market', specialty: 'Wholesale fabrics — sarees, dress materials, embroidery', timings: '8 AM – 8 PM', location: 'Ring Road, Central Surat' },
      { name: 'Textile Market (Maskati Market)', specialty: 'Oldest textile wholesale market in Surat', timings: '9 AM – 7 PM, Closed Sundays', location: 'Maskati Market, Nanpura, Surat' },
    ],
    schemes: [
      { name: 'Surat Diamond Bourse Incentives', body: 'SDB provides office space, bonded warehouse, and customs clearance under one roof', benefit: '0% customs on imported rough diamonds. FEMA-compliant trading platform.' },
      { name: 'SVTECA Textile Cluster', body: 'Surat cluster development for weaving and processing units', benefit: 'Subsidised common effluent treatment, power supply at industrial tariff, skill training.' },
    ],
    successStories: [
      { company: 'SRK Empire', founder: 'Govind Dholakia', from: 'A 16-year-old migrant from Dudhala village with no money, arriving in Surat in 1964', to: 'Ran world\'s largest diamond polishing company with 7,000 workers — gifting cars and flats to loyal employees', story: 'Govind Dholakia arrived in Surat as a teenager to work as a polishing karigar for ₹2 a day. He saved every rupee, started his own unit in 1969, and built SRK Empire into one of the world\'s most respected diamond companies. His annual employee reward programs — where top workers receive cars, homes, and foreign trips — are legendary in Indian business.' },
    ],
  },

  /* ════════ MUMBAI ════════ */
  mumbai: {
    name: 'Mumbai', state: 'Maharashtra', icon: '🌊',
    coverPhoto: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1600&q=80',
    tagline: 'India\'s Financial Capital — Where Dreams Are Priced',
    gdpContrib: '₹22 Lakh Crore', population: '2.1 Crore', exportValue: '$80 Billion',
    majorIndustries: ['Financial Services & BFSI', 'Entertainment & Media', 'Textiles (Historical) & Fashion', 'Port & Logistics', 'Real Estate', 'Pharmaceuticals', 'IT & Consulting', 'Food Processing'],
    spotlight: 'Mumbai is where India\'s money is counted, its stories are told, and its ambitions are funded. The BSE, RBI, SEBI, NSE, the bollywood studio system, and the headquarters of 60 of India\'s top 100 companies all exist in a city of 21 million people on a 603 sq km island.',
    about: [
      'Mumbai is India\'s financial capital in every sense — it hosts the Reserve Bank of India, SEBI, BSE (Asia\'s oldest stock exchange), NSE, and the headquarters of every major Indian bank, insurance company, and financial institution. The city processes over ₹1.5 lakh crore of transactions every working day.',
      'The city runs on contrast: the Dharavi slum (Asia\'s largest informal business district, with ₹6,000 crore annual turnover from leather, recycling, and garments) exists 3 kilometres from the Bandra-Kurla Complex, where Goldman Sachs, HDFC, and McKinsey have their India headquarters.',
      'Mumbai\'s business culture is the most cosmopolitan in India — a Gujarati diamond merchant, a Maharashtrian filmmaker, a Tamil IT professional, and a Bengali banker all work within the same square kilometre, eat the same vada pav, and ride the same overcrowded local train. This diversity is Mumbai\'s competitive moat.',
    ],
    sectors: [
      { name: 'Financial Services (BFSI)', icon: '🏦', units: '8,000+', desc: 'BSE, NSE, RBI, SEBI, all major banks, NBFCs, insurance cos — India\'s financial spine.' },
      { name: 'Entertainment & Media', icon: '🎬', units: '5,000+', desc: 'Bollywood, OTT production, advertising, digital media — ₹2 lakh crore creative economy.' },
      { name: 'Port & Logistics', icon: '🚢', units: '3,000+', desc: 'JNPT (India\'s largest container port) + Mumbai Port. 40% of India\'s seaborne trade.' },
      { name: 'Real Estate', icon: '🏙️', units: '10,000+', desc: 'India\'s most expensive real estate. South Mumbai, BKC, Powai — each a micro-economy.' },
      { name: 'Pharmaceuticals', icon: '💊', units: '4,000+', desc: 'Sun Pharma, Cipla, Lupin, Dr. Reddy\'s — all Mumbai-headquartered.' },
      { name: 'Retail & Fashion', icon: '👗', units: '12,000+', desc: 'Colaba Causeway to Linking Road — India\'s fashion industry capital.' },
    ],
    businesses: [
      { name: 'Reliance Industries', category: 'Conglomerate', since: '1966', founder: 'Dhirubhai Ambani', tagline: 'From yarn trading to India\'s largest company', address: 'Maker Chambers IV, Nariman Point, Mumbai', turnover: '₹9.7L Cr', employees: '3,36,000+', speciality: 'Oil, telecom (Jio), retail (Reliance Retail), media — all dominant', rating: 4.9, featured: true },
      { name: 'HDFC Bank', category: 'Banking & Financial Services', since: '1994', founder: 'Hasmukhbhai Parekh', tagline: 'India\'s most valuable private bank', address: 'HDFC Bank House, Lower Parel, Mumbai', turnover: '₹2.3L Cr', employees: '1,77,000+', speciality: 'Most profitable bank in India. 8,200+ branches. ₹12 lakh crore market cap.', rating: 4.8, featured: true },
      { name: 'Sun Pharmaceuticals', category: 'Pharmaceuticals', since: '1983', founder: 'Dilip Shanghvi', tagline: 'From ₹10,000 to India\'s largest pharma company', address: 'Sun House, CTS No. 201/B/1, Bandra, Mumbai', turnover: '₹51,000 Cr', employees: '33,000+', speciality: 'India\'s most valuable pharma company. Dermatology global leader.', rating: 4.8, featured: true },
      { name: 'Cipla', category: 'Pharmaceuticals', since: '1935', founder: 'Khwaja Abdul Hamied', tagline: 'The pharma company that defied Big Pharma for Africa', address: 'Cipla House, Peninsula Business Park, Mumbai', turnover: '₹25,000 Cr', employees: '25,000+', speciality: 'Produced $1 HIV AIDS drugs for Africa in 2001 — changed global health policy.', rating: 4.9, featured: true },
      { name: 'Dharavi Leather Cluster', category: 'Leather / MSME', since: '1950s', founder: 'Community', tagline: 'Asia\'s largest informal business district', address: 'Dharavi, Central Mumbai', turnover: '₹6,000 Cr (cluster)', employees: '10 Lakh+', speciality: 'Leather, recycling, garments, pottery — 15,000+ workshops in 2.1 sq km', rating: 4.5 },
    ],
    markets: [
      { name: 'Zaveri Bazaar', specialty: 'Gold and diamond jewellery — Asia\'s largest bullion market', timings: '10 AM – 7 PM, Closed Sundays', location: 'Crawford Market area, South Mumbai' },
      { name: 'Dharavi', specialty: 'Leather goods, recycled plastics, textiles — India\'s most productive slum', timings: 'All hours', location: 'Central Mumbai, near Mahim' },
      { name: 'Colaba Causeway', specialty: 'Fashion, handicrafts, antiques, souvenirs', timings: '10 AM – 11 PM', location: 'Colaba, South Mumbai' },
      { name: 'Linking Road, Bandra', specialty: 'Fashion, streetwear, accessories — trendsetter for India\'s youth market', timings: '10 AM – 10 PM', location: 'Bandra West, Mumbai' },
    ],
    schemes: [
      { name: 'Maharashtra Industrial Policy 2023', body: 'State policy for manufacturing and service investments', benefit: 'Up to 100% SGST refund for 10 years, capital subsidy 15–25%, employment incentive.' },
      { name: 'SEBI Regulatory Sandbox', body: 'SEBI program for Mumbai-based fintech startups', benefit: 'Regulatory relaxation for 6–12 months to test fintech products live.' },
      { name: 'Film City Incentive', body: 'Maharashtra government for content production', benefit: '25% subsidy on production costs for Marathi and Hindi films shot in Maharashtra.' },
    ],
    successStories: [
      { company: 'Reliance Industries', founder: 'Dhirubhai Ambani', from: 'A ₹500 yarn trading company in Bhuleshwar, Mumbai, 1966', to: 'India\'s most valuable company — Oil, Telecom, Retail, Media all #1 in respective sectors', story: 'Dhirubhai Ambani arrived in Mumbai from rural Gujarat at 16 to work as a gas station attendant in Yemen. He returned to India, raised capital from thousands of small investors in Gujarat by visiting villages personally, and built a polyester yarn trading company. Forty years later, Reliance\'s Jio disrupted India\'s entire telecom industry by offering free internet to 300 million people in one quarter.' },
      { company: 'Cipla', founder: 'Yusuf Hamied', from: 'A 65-year-old pharmaceutical company declining in the 1990s', to: 'The company that made HIV drugs affordable for 100 million Africans — changing global health history', story: 'In 2001, Yusuf Hamied offered to sell a 3-drug HIV combination therapy for $350/year — 1/40th of the Western price — at a Geneva conference. The New York Times front-paged it. Big Pharma sued. South Africa, Uganda, and Brazil ordered the drugs anyway. Cipla\'s defiance of patent law saved an estimated 1.5 million lives in Africa and changed global pharmaceutical policy permanently.' },
    ],
  },
};

/* ══════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════ */
const TABS = ['Overview', 'Businesses', 'Markets', 'Success Stories', 'Schemes'] as const;
type Tab = typeof TABS[number];

export default function LocalBusiness({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'ahmedabad';
  const city = CITIES[slug] ?? CITIES['ahmedabad'];

  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setActiveTab('Overview'); }, [slug]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const filteredBusinesses = city.businesses.filter(b =>
    searchQuery === '' ||
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const _localUrl    = `https://profilebizz.com/local/${slug}`;
  const _localJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${city.name} Business Directory — ${city.tagline} | ProfileBizz`,
        description: city.spotlight,
        url: _localUrl,
        author: { '@type': 'Organization', name: 'ProfileBizz Editorial', url: 'https://profilebizz.com' },
        publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
      },
      {
        '@type': 'ItemList',
        name: `${city.name} — Local Business Directory`,
        description: city.spotlight,
        url: _localUrl,
        numberOfItems: city.businesses.length,
        itemListElement: city.businesses.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'LocalBusiness',
            name: b.name,
            description: b.tagline,
            foundingDate: b.since,
            address: {
              '@type': 'PostalAddress',
              streetAddress: b.address,
              addressLocality: city.name,
              addressRegion: city.state,
              addressCountry: 'IN',
            },
          },
        })),
      },
    ],
  });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{_localJsonLd}</script>
      </Helmet>
      <div className="min-h-screen bg-[#f9f9f9] text-black">

      {/* ── Top Bar ── */}
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Local Business Stories</span>
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

      {/* ── Hero ── */}
      <div className="relative h-[340px] md:h-[440px] overflow-hidden mt-14">
        <img src={city.coverPhoto} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent" />
        <div className="absolute top-6 left-8 flex items-center gap-2">
          <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">Local Business Stories</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-4 md:px-8 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{city.icon}</span>
            <div className="flex items-center gap-2 text-white/60 text-xs font-bold tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" /> {city.state}
            </div>
          </div>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-bold leading-none mb-2">{city.name}</h1>
          <p className="text-white/70 text-base md:text-lg italic">"{city.tagline}"</p>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex flex-wrap gap-x-10 gap-y-3 flex-1">
            {[
              { l: 'Economic Output', v: city.gdpContrib },
              { l: 'Population', v: city.population },
              { l: 'Annual Exports', v: city.exportValue },
              { l: 'Registered Businesses', v: FEATURED_CITIES.find(c => c.slug === slug)?.businesses ?? '—' },
            ].map(s => (
              <div key={s.l} className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{s.l}</span>
                <span className="text-base md:text-xl font-serif font-bold text-black">{s.v}</span>
              </div>
            ))}
          </div>
          <p className="md:max-w-xs text-sm text-gray-600 leading-relaxed italic border-l-2 border-editorial pl-4">{city.spotlight}</p>
        </div>
      </div>

      {/* ── City Switcher ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center gap-0 overflow-x-auto">
          {FEATURED_CITIES.map(c => (
            <a key={c.slug} href={`/local/${c.slug}`}
              className={`flex items-center gap-2 px-4 py-3.5 border-b-2 flex-shrink-0 transition-colors duration-150 text-sm font-medium whitespace-nowrap
                ${c.slug === slug ? 'border-editorial text-editorial' : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300'}`}>
              <span>{c.icon}</span> {c.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-28 z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center gap-0 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-bold tracking-widest uppercase flex-shrink-0 border-b-2 transition-colors duration-150
                ${activeTab === tab ? 'border-editorial text-editorial' : 'border-transparent text-gray-500 hover:text-black'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">

        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SectionLabel index="01" label="About the City's Business Ecosystem" />
              {city.about.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}

              <div className="mt-10">
                <SectionLabel index="02" label="Key Industry Sectors" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {city.sectors.map((s, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-5 hover:border-black transition-colors group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                          <p className="text-sm font-bold group-hover:text-editorial transition-colors">{s.name}</p>
                          <span className="text-[10px] font-bold text-editorial">{s.units} units</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <SectionLabel index="03" label="Major Industries at a Glance" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {city.majorIndustries.map((ind, i) => (
                    <span key={i} className="text-xs font-bold tracking-wide uppercase bg-black text-white px-3 py-1.5 hover:bg-editorial transition-colors cursor-default">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              {/* Featured businesses */}
              <div className="bg-white border border-gray-200 p-5 mb-6">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3 text-editorial" /> Featured Businesses
                </p>
                <div className="space-y-4">
                  {city.businesses.filter(b => b.featured).slice(0, 4).map((b, i) => (
                    <div key={i} className="flex gap-3 group cursor-pointer" onClick={() => setActiveTab('Businesses')}>
                      <div className="w-10 h-10 bg-black flex-shrink-0 flex items-center justify-center group-hover:bg-editorial transition-colors">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-tight group-hover:text-editorial transition-colors">{b.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{b.category} · Since {b.since}</p>
                        <p className="text-[11px] text-editorial font-bold mt-0.5">{b.turnover}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('Businesses')}
                  className="mt-4 w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-2.5 hover:bg-editorial transition-colors flex items-center justify-center gap-2">
                  View All Businesses <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-black text-white p-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-4">City at a Glance</p>
                {[
                  { l: 'Economic Output', v: city.gdpContrib },
                  { l: 'Total Exports', v: city.exportValue },
                  { l: 'Population', v: city.population },
                ].map(s => (
                  <div key={s.l} className="flex justify-between py-2.5 border-b border-white/10 last:border-0">
                    <span className="text-xs text-white/50">{s.l}</span>
                    <span className="text-sm font-bold">{s.v}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* BUSINESSES TAB */}
        {activeTab === 'Businesses' && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or category…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:border-black outline-none text-sm bg-white"
                />
              </div>
              <span className="text-xs text-gray-400 font-medium">{filteredBusinesses.length} businesses</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredBusinesses.map((b, i) => (
                <div key={i} className="bg-white border border-gray-200 hover:border-black transition-all duration-200 group flex flex-col">
                  {/* Header */}
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {b.featured && <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-1.5 py-0.5">Featured</span>}
                          <span className="text-[10px] text-gray-400 font-medium">{b.category}</span>
                        </div>
                        <h3 className="text-base font-bold font-serif group-hover:text-editorial transition-colors">{b.name}</h3>
                        <p className="text-xs text-gray-500 italic mt-0.5">"{b.tagline}"</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-0.5 bg-black px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs font-bold">{b.rating}</span>
                      </div>
                    </div>
                  </div>
                  {/* Body */}
                  <div className="p-5 flex-1">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[{ l: 'Founded', v: b.since }, { l: 'Turnover', v: b.turnover }, { l: 'Employees', v: b.employees }, { l: 'Founder', v: b.founder }].map(s => (
                        <div key={s.l}>
                          <p className="text-[10px] font-bold tracking-wider uppercase text-gray-400">{s.l}</p>
                          <p className="text-xs font-semibold text-black mt-0.5 leading-tight">{s.v}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{b.speciality}</p>
                  </div>
                  {/* Footer */}
                  <div className="px-5 pb-4 flex items-center gap-1.5 text-[10px] text-gray-400">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{b.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MARKETS TAB */}
        {activeTab === 'Markets' && (
          <div>
            <SectionLabel index="—" label={`Business Markets in ${city.name}`} />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {city.markets.map((m, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 hover:border-black transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black group-hover:bg-editorial transition-colors flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold font-serif group-hover:text-editorial transition-colors mb-1">{m.name}</h3>
                      <p className="text-sm text-gray-700 leading-snug mb-3">{m.specialty}</p>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="font-bold tracking-wider uppercase text-[10px]">Timings</span>
                          <span>{m.timings}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="font-bold tracking-wider uppercase text-[10px]">Location</span>
                          <span>{m.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUCCESS STORIES TAB */}
        {activeTab === 'Success Stories' && (
          <div>
            <SectionLabel index="—" label={`${city.name} Business Success Stories`} />
            <div className="mt-6 space-y-8">
              {city.successStories.map((s, i) => (
                <div key={i} className="bg-white border border-gray-200">
                  {/* Story Header */}
                  <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-1">Success Story</p>
                      <h3 className="font-serif text-xl font-bold">{s.company}</h3>
                    </div>
                    <TrendingUp className="w-6 h-6 text-editorial flex-shrink-0" />
                  </div>
                  <div className="p-6">
                    {/* From → To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="border border-gray-200 p-4">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">The Beginning</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{s.from}</p>
                      </div>
                      <div className="border-2 border-editorial p-4">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-2">Where It Reached</p>
                        <p className="text-sm text-gray-800 font-medium leading-relaxed">{s.to}</p>
                      </div>
                    </div>
                    {/* Founder badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-black flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm font-bold">{s.founder}</p>
                    </div>
                    {/* Story text */}
                    <blockquote className="border-l-4 border-editorial pl-5">
                      <p className="text-sm text-gray-700 leading-[1.85]">{s.story}</p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEMES TAB */}
        {activeTab === 'Schemes' && (
          <div>
            <SectionLabel index="—" label={`Government Schemes for ${city.name} Businesses`} />
            <div className="mt-6 space-y-4">
              {city.schemes.map((s, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 hover:border-black transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black group-hover:bg-editorial transition-colors flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold font-serif group-hover:text-editorial transition-colors mb-1">{s.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{s.body}</p>
                      <div className="bg-gray-50 border border-gray-200 px-4 py-3">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-1">Key Benefit</p>
                        <p className="text-sm text-gray-800 font-medium">{s.benefit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-2">
      {index !== '—' && <span className="text-4xl font-serif font-bold text-gray-100 leading-none select-none">{index}</span>}
      <h2 className="text-xl md:text-2xl font-serif font-bold text-black border-b-2 border-editorial pb-1">{label}</h2>
    </div>
  );
}
