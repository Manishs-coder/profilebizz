import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, TrendingUp, Users, Building2, Lightbulb } from 'lucide-react';
import { FEATURED_INDUSTRIES } from '@/data/navData';
import { ProfileSeo } from '@/components/ProfileSeo';
import { SocialShareButtons } from '@/components/SocialShareButtons';

const SECTIONS = [
  { id: 'overview',    label: 'Industry Overview' },
  { id: 'history',     label: 'History in India' },
  { id: 'structure',   label: 'How It Works' },
  { id: 'keyplayers',  label: 'Key Players' },
  { id: 'market',      label: 'Market Size' },
  { id: 'challenges',  label: 'Challenges' },
  { id: 'opportunity', label: 'Opportunities' },
  { id: 'policy',      label: 'Government & Policy' },
  { id: 'future',      label: 'Future Outlook' },
  { id: 'startups',    label: 'Startups to Watch' },
];


interface IndustryData {
  name: string; tagline: string; icon: string; tag: string;
  coverPhoto: string; marketSize: string; gdpShare: string;
  employment: string; growthRate: string; oneLiner: string;
  overview: { body: string[]; stats: { label: string; value: string }[] };
  history: { timeline: { year: string; event: string }[]; body: string[] };
  structure: { steps: { title: string; desc: string }[]; body: string[] };
  keyPlayers: { name: string; type: string; revenue: string; note: string }[];
  market: { pullQuote: string; body: string[]; segments: { name: string; share: string }[] };
  challenges: { title: string; body: string }[];
  opportunity: { areas: { title: string; desc: string }[]; body: string[] };
  policy: { schemes: { name: string; desc: string }[]; body: string[] };
  future: { pullQuote: string; body: string[] };
  startups: { name: string; founded: string; focus: string; note: string }[];
}

const INDUSTRIES: Record<string, IndustryData> = {

  /* ═══════════ STEEL ═══════════ */
  steel: {
    name: 'Steel Industry', tagline: 'The Backbone of Modern India', icon: '🏗️', tag: 'Core Sector',
    coverPhoto: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    marketSize: '₹2.5 Lakh Crore', gdpShare: '2% of GDP', employment: '2.5 Million Direct', growthRate: '12% CAGR',
    oneLiner: 'From colonial-era pig iron to the world\'s second-largest steel producer — India\'s steel story is one of national will, industrial muscle, and an insatiable hunger to build.',
    overview: {
      body: [
        'Steel is the foundation on which modern India is being built — literally. Every bridge, every metro rail, every skyscraper, every wind turbine, and every automobile contains Indian steel. The industry produces over 140 million metric tonnes (MT) annually, making India the world\'s second-largest steel producer after China.',
        'Unlike many sectors, the Indian steel industry is both deeply old and aggressively modern. Tata Steel\'s Jamshedpur plant, commissioned in 1911, still operates alongside hypermodern electric arc furnaces commissioned in 2023. This coexistence of eras defines the industry\'s complexity — and its opportunity.',
      ],
      stats: [
        { label: 'Annual Production', value: '140+ MMT' },
        { label: 'Market Size', value: '₹2.5L Crore' },
        { label: 'World Rank', value: '#2 Producer' },
        { label: 'Per Capita Consumption', value: '98 kg/year' },
        { label: 'Export Volume', value: '6.7 MMT' },
        { label: 'Plants (Large)', value: '900+' },
      ],
    },
    history: {
      timeline: [
        { year: '1907', event: 'Tata Iron and Steel Company (TISCO) founded in Jamshedpur — India\'s first modern steel plant' },
        { year: '1954', event: 'Bhilai Steel Plant established with Soviet collaboration — first PSU steel giant' },
        { year: '1973', event: 'Steel Authority of India Limited (SAIL) formed to manage all government steel plants' },
        { year: '1991', event: 'Liberalisation — private sector allowed to set up large steel plants without license' },
        { year: '2005', event: 'Mittal Steel (global) and domestic players begin massive capacity expansion' },
        { year: '2016', event: 'National Steel Policy targets 300 MMT capacity by 2030' },
        { year: '2023', event: 'India crosses 140 MMT production, surpasses Japan to reclaim #2 globally' },
      ],
      body: [
        'India\'s steel journey began not with government policy, but with Jamsetji Tata\'s conviction that India could make steel as well as any nation on earth. He spent years sourcing capital, engineers, and technology before his dream plant opened in Jamshedpur — 4 years after his death.',
        'Post-independence, steel became a symbol of industrial sovereignty. Nehru called the Bhilai plant "the new temples of India." SAIL grew into a massive government employer, sometimes prioritising jobs over efficiency. Liberalisation in 1991 changed everything — private players like Ispat, JSW, and Essar entered with modern technology and commercial discipline.',
      ],
    },
    structure: {
      steps: [
        { title: 'Raw Material Sourcing', desc: 'Iron ore (from Odisha, Jharkhand, Karnataka), coking coal (largely imported from Australia), and scrap are the three primary inputs.' },
        { title: 'Iron Making', desc: 'Blast furnaces (traditional) or Direct Reduced Iron (DRI/sponge iron) plants convert ore into molten iron. India is the world\'s largest DRI producer.' },
        { title: 'Steel Making', desc: 'Basic Oxygen Furnaces (BOF) or Electric Arc Furnaces (EAF) convert iron into steel by adjusting carbon content and adding alloys.' },
        { title: 'Rolling & Finishing', desc: 'Hot rolling, cold rolling, and coating processes produce finished products: HR coils, CR sheets, galvanised steel, TMT bars, wire rods.' },
        { title: 'Distribution', desc: 'Steel reaches end-users through a network of stockists, service centres, and direct B2B sales to auto, construction, and capital goods sectors.' },
      ],
      body: [
        'The Indian steel value chain is unique in its reliance on sponge iron (DRI) — a coal-based process that most countries have phased out due to emissions. India uses it because domestic coking coal availability is low. This creates a significant decarbonisation challenge as the world moves toward green steel.',
      ],
    },
    keyPlayers: [
      { name: 'Tata Steel', type: 'Private', revenue: '₹2.43L Cr', note: 'India\'s oldest and most globally diversified steel company. Operates in India, UK, Netherlands.' },
      { name: 'JSW Steel', type: 'Private', revenue: '₹1.65L Cr', note: 'Fastest-growing Indian steel company. Largest capacity at 28 MMTPA.' },
      { name: 'SAIL', type: 'PSU', revenue: '₹1.02L Cr', note: 'Largest government steel maker. Five integrated plants across India.' },
      { name: 'JSPL', type: 'Private', revenue: '₹55,000 Cr', note: 'Jindal Steel & Power — strong in DRI and long products for infrastructure.' },
      { name: 'AM/NS India', type: 'JV', revenue: '₹55,000 Cr', note: 'ArcelorMittal Nippon Steel India — acquired Essar Steel in 2019.' },
    ],
    market: {
      pullQuote: '"India needs 300 million tonnes of steel capacity by 2030. We are at 160 today. That gap is the single biggest industrial investment opportunity of this decade."',
      body: [
        'India\'s per capita steel consumption at 98 kg is well below the global average of 233 kg and China\'s 582 kg. As urbanisation, infrastructure spending, and automobile penetration rise, domestic demand is projected to grow at 7–9% annually through 2030.',
        'The government\'s infrastructure push — ₹10 lakh crore annual capex, dedicated freight corridors, metro expansion, affordable housing — is the primary demand driver. Construction accounts for 65% of Indian steel consumption.',
      ],
      segments: [
        { name: 'Construction & Infra', share: '65%' },
        { name: 'Engineering & Fabrication', share: '15%' },
        { name: 'Automotive', share: '10%' },
        { name: 'Packaging & Others', share: '10%' },
      ],
    },
    challenges: [
      { title: 'Coking Coal Import Dependency', body: 'India imports 85% of its coking coal — primarily from Australia. Any disruption (price, geopolitical) directly squeezes steel margins. The push for scrap-based EAF steelmaking is partly driven by this vulnerability.' },
      { title: 'Carbon Intensity & Green Steel Pressure', body: 'Indian steel produces ~2.5 tonnes of CO₂ per tonne of steel — above the global average. Export markets, especially Europe\'s Carbon Border Adjustment Mechanism (CBAM), will price this in from 2026 onwards, making Indian exports more expensive.' },
      { title: 'Cheap Chinese Imports', body: 'With China facing demand slowdown at home, it is aggressively exporting cheap steel globally. Indian mills have repeatedly sought and received safeguard duties, but the pressure continues to compress margins.' },
    ],
    opportunity: {
      areas: [
        { title: 'Green Steel', desc: 'Hydrogen-based direct reduction, scrap-based EAF, and carbon capture present a massive R&D and capex opportunity for early movers.' },
        { title: 'Specialty Steel', desc: 'India imports ~6 MMT of specialty steel (used in defence, aerospace, power equipment) that it should be making domestically. PLI schemes are targeting this gap.' },
        { title: 'Scrap-Based EAF', desc: 'As India\'s steel stock grows, scrap availability will rise. EAF-based mills using scrap are 60% less carbon-intensive and require lower capex per tonne.' },
        { title: 'Export Growth', desc: 'Southeast Asia and Africa offer significant export markets for Indian long products and HR coils as China\'s price advantage narrows.' },
      ],
      body: [
        'India\'s National Steel Policy (2017) targets 300 MMT capacity and 255 kg per capita consumption by 2030-31. Achieving this requires ~₹10 lakh crore of investment over the decade — the largest sectoral capex story in the Indian economy.',
      ],
    },
    policy: {
      schemes: [
        { name: 'National Steel Policy 2017', desc: 'Targets 300 MMT capacity and 255 kg per capita consumption by 2030. Blueprint for steel self-sufficiency.' },
        { name: 'PLI Scheme for Specialty Steel', desc: '₹6,322 Crore outlay to incentivise domestic production of high-grade specialty steel.' },
        { name: 'Scrap-Based EAF Policy', desc: 'Tax incentives for scrap usage to promote circular economy and reduce coking coal dependence.' },
        { name: 'Steel Procurement Policy', desc: 'Government mandates use of domestically produced steel in all central government projects.' },
      ],
      body: [
        'The Ministry of Steel has been one of the most policy-active ministries in the last 5 years. The combination of PLI, procurement mandates, and infrastructure spending has made India the most attractive emerging market for steel capex globally.',
      ],
    },
    future: {
      pullQuote: '"The next 20 years will build more steel infrastructure in India than the last 100. The question is not whether this growth will happen. The question is whether it will be green."',
      body: [
        'India is expected to become the world\'s largest steel consumer by 2035, overtaking China as Chinese per-capita consumption plateaus. Domestic capacity additions by Tata, JSW, and AMNS alone exceed 50 MMT over the next 7 years.',
        'The green transition is the defining challenge. India has committed to net-zero by 2070. Steel decarbonisation requires hydrogen, renewables, and scrap — all of which India is investing in, but from a low base. The companies that crack green steel economics first will dominate the next industrial era.',
      ],
    },
    startups: [
      { name: 'Green Steel Ventures', founded: '2022', focus: 'Hydrogen-based DRI pilot plants', note: 'Backed by NMDC and NTPC' },
      { name: 'Steelmint', founded: '2015', focus: 'Steel market data & price intelligence', note: 'Used by 10,000+ industry professionals' },
      { name: 'Metalbook', founded: '2020', focus: 'B2B steel e-commerce platform', note: 'GMV of ₹500 Cr in Year 2' },
      { name: 'Inferrex', founded: '2021', focus: 'AI-based quality control for rolling mills', note: 'Deployed in 8 plants across India' },
    ],
  },

  /* ═══════════ AGRICULTURE ═══════════ */
  agriculture: {
    name: 'Agriculture', tagline: 'India\'s First and Forever Industry', icon: '🌾', tag: 'Foundation',
    coverPhoto: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&q=80',
    marketSize: '₹20 Lakh Crore', gdpShare: '18% of GDP', employment: '600 Million (46% workforce)', growthRate: '4.6% CAGR',
    oneLiner: 'Agriculture feeds 1.4 billion people, employs half of India\'s workforce, and yet generates less than 20% of GDP — the paradox that defines India\'s most important development challenge.',
    overview: {
      body: [
        'Indian agriculture is the world\'s most complex farming system — 140 million smallholder farms, 15 agro-climatic zones, 50+ food crops, and a procurement system that buys from 50 million farmers every season. It is also the world\'s largest producer of milk, spices, and pulses, and the second-largest producer of rice, wheat, fruits, and vegetables.',
        'Yet Indian agriculture is defined by paradox: record production coexists with farmer distress. Global export competitiveness coexists with abysmal farm incomes. Cutting-edge precision farming technologies operate 5 kilometres from farmers who still use bullocks. Fixing this paradox is the central challenge of Indian development policy.',
      ],
      stats: [
        { label: 'Market Size', value: '₹20L Crore' },
        { label: 'GDP Contribution', value: '18%' },
        { label: 'Workforce Employed', value: '46%' },
        { label: 'Arable Land', value: '157 MH' },
        { label: 'Irrigation Coverage', value: '52%' },
        { label: 'Annual Food Export', value: '$50 Billion' },
      ],
    },
    history: {
      timeline: [
        { year: '1943', event: 'Bengal Famine kills 3 million — food security becomes independent India\'s first priority' },
        { year: '1965', event: 'Green Revolution begins — HYV wheat seeds transform Punjab and Haryana' },
        { year: '1970', event: 'Operation Flood (White Revolution) — India becomes world\'s largest milk producer' },
        { year: '1975', event: 'FCI and MSP system expanded — government becomes India\'s largest grain buyer' },
        { year: '2003', event: 'APMC reforms attempted — fractured implementation, most states resist' },
        { year: '2015', event: 'Soil Health Cards, PM Krishi Sinchai Yojana launched' },
        { year: '2020', event: 'Three farm laws passed and repealed — largest farmer protests in Indian history' },
        { year: '2024', event: 'Digital Agriculture Mission launched — AGRI stack, farmer registry, crop mapping' },
      ],
      body: [
        'Indian agriculture\'s modern history is a series of revolutions: Green (wheat/rice), White (dairy), Blue (fisheries), Pink (prawns), and now Digital. Each revolution solved one problem while creating others. The Green Revolution ended hunger but created groundwater depletion. The MSP system gave farmers price certainty but distorted cropping patterns toward water-intensive crops.',
      ],
    },
    structure: {
      steps: [
        { title: 'Input Supply', desc: 'Seeds, fertilisers (urea, DAP, MOP), pesticides, and farm equipment reach farmers through a network of 268,000 rural input dealers and cooperatives.' },
        { title: 'Farm Production', desc: '140 million farm households, average holding 1.08 hectares. 52% of cultivated area irrigated. Kharif (June–October) and Rabi (October–March) are the two main seasons.' },
        { title: 'Primary Processing & Aggregation', desc: 'Mandis (APMCs), village aggregators, FPOs, and private buyers aggregate produce. FCI procures wheat and rice at MSP for government buffer stock.' },
        { title: 'Secondary Processing', desc: 'Food processing industry converts raw produce to packaged goods — flour mills, rice mills, oil crushers, dairies, sugar mills, cold chains.' },
        { title: 'Retail & Export', desc: 'Produce reaches consumers via kiranas, modern trade, and online grocery. Exports go through APEDA-registered exporters.' },
      ],
      body: [
        'India loses 15–18% of its food production to post-harvest losses — worth ₹1.5 lakh crore annually. Cold chain infrastructure covers less than 30% of perishable produce. This inefficiency is the industry\'s largest fixable problem and the biggest opportunity for entrepreneurs.',
      ],
    },
    keyPlayers: [
      { name: 'FCI (Food Corporation of India)', type: 'PSU', revenue: '₹2.2L Cr (procurement)', note: 'World\'s largest food procurement agency. Buys, stores, and distributes wheat and rice at MSP.' },
      { name: 'ITC Agri Business', type: 'Private', revenue: '₹25,000 Cr', note: 'eChoupal network connects 4 million farmers. Largest private agri-commodity trader.' },
      { name: 'IFFCO', type: 'Cooperative', revenue: '₹50,000 Cr', note: 'World\'s largest fertiliser cooperative. Serves 36,000 cooperatives across India.' },
      { name: 'NDDB', type: 'PSU', revenue: '—', note: 'National Dairy Development Board — architect of India\'s dairy revolution.' },
      { name: 'Ninjacart', type: 'Startup', revenue: '₹4,500 Cr GMV', note: 'India\'s largest agri supply chain startup. Farm-to-retail in 12 hours.' },
    ],
    market: {
      pullQuote: '"India can feed the world — and it increasingly does. But the farmer who grows that food often cannot feed his family. That gap is the defining injustice of our economy."',
      body: [
        'India is the world\'s largest exporter of rice, spices, and buffalo meat, and a top-5 exporter of sugar, cotton, and oilmeal. Agricultural exports crossed $50 billion in FY23. The opportunity for value-added processed food exports — India currently processes only 10% of its produce, against 80% in developed countries — is enormous.',
      ],
      segments: [
        { name: 'Food Grains', share: '40%' },
        { name: 'Horticulture', share: '30%' },
        { name: 'Livestock & Dairy', share: '20%' },
        { name: 'Cash Crops', share: '10%' },
      ],
    },
    challenges: [
      { title: 'Smallholder Fragmentation', body: 'Average farm size has shrunk from 2.28 ha (1971) to 1.08 ha (2021) due to inheritance division. Farms this small cannot sustain mechanisation, bulk input purchase, or direct market access — perpetuating poverty.' },
      { title: 'Groundwater Depletion', body: 'Punjab and Haryana — India\'s wheat and rice bowls — are drawing groundwater 3x faster than recharge. At current rates, several aquifers face exhaustion within 20 years. Changing cropping patterns requires changing MSP incentives, which is politically difficult.' },
      { title: 'Climate Vulnerability', body: 'Indian agriculture is 52% rain-fed. A 1°C rise in temperature reduces wheat yield by 6%. Extreme weather events (floods, droughts, unseasonal rain) have cost Indian farmers over ₹1.5 lakh crore in losses in the last five years.' },
    ],
    opportunity: {
      areas: [
        { title: 'Food Processing', desc: 'India processes only 10% of its produce. Global benchmark is 60–80%. Doubling processing capacity = ₹3–4 lakh crore in added value.' },
        { title: 'FPO-Based Aggregation', desc: '10,000 new FPOs registered under government scheme give startups and agritechs structured aggregation points at village level.' },
        { title: 'Agritech & Precision Farming', desc: 'Drone-based spraying, soil sensors, AI crop advisory, satellite monitoring — ₹30,000 crore market by 2030.' },
        { title: 'Alternative Proteins', desc: 'India\'s large vegetarian population makes it a natural market for plant-based proteins, millets, and functional foods.' },
      ],
      body: [
        'India\'s food and agri sector is the #1 priority of every central government regardless of political stripe — because 600 million voters depend on it. This means policy tailwinds, subsidies, and market creation are structural, not cyclical.',
      ],
    },
    policy: {
      schemes: [
        { name: 'PM-KISAN', desc: '₹6,000/year direct income transfer to 110 million farmer families. World\'s largest DBT scheme.' },
        { name: 'PM Fasal Bima Yojana', desc: 'Crop insurance with subsidised premiums. Covers 55 million farmer-applications annually.' },
        { name: 'e-NAM', desc: 'National Agriculture Market — online mandi platform connecting 1,361 mandis across 22 states.' },
        { name: 'Digital Agriculture Mission', desc: '2024 launch: farmer digital IDs, crop mapping, soil health digitisation, satellite-based yield estimation.' },
      ],
      body: [
        'India spends ~₹3.5 lakh crore annually on agriculture subsidies (fertiliser, MSP procurement, crop insurance, irrigation). Whether this money is efficiently deployed remains the central debate of agricultural policy.',
      ],
    },
    future: {
      pullQuote: '"The farmer of 2035 will carry a smartphone that tells him exactly what to plant, when to water, and where to sell — and he will have a digital identity that lets him access credit in 48 hours. That farmer is already being designed."',
      body: [
        'India\'s agriculture sector is at an inflection point. Technology (drones, AI, satellite), policy reform (FPOs, e-NAM, Digital Agriculture Mission), and private capital (₹9,000 crore invested in agritech 2014–2024) are converging.',
        'The sector\'s GDP contribution will likely fall (as manufacturing and services grow) but its absolute economic output will rise — especially as food processing, value-added exports, and premium agri products gain share. The farmer of 2035 will be poorer than an IT worker but richer than the farmer of 2005.',
      ],
    },
    startups: [
      { name: 'Ninjacart', founded: '2015', focus: 'Farm-to-retail fresh produce supply chain', note: 'Backed by Tiger Global, Walmart. ₹4,500 Cr GMV.' },
      { name: 'DeHaat', founded: '2012', focus: 'End-to-end farmer services: input, advisory, market linkage', note: '800,000+ farmers on platform.' },
      { name: 'Krishify', founded: '2020', focus: 'Social network for 30 million Indian farmers', note: '8 million MAU across 22 states.' },
      { name: 'Fasal', founded: '2018', focus: 'IoT sensors + AI crop advisory for horticulture', note: 'Works across 20 crops, 22 states.' },
    ],
  },

  /* ═══════════ IT ═══════════ */
  it: {
    name: 'IT & Technology', tagline: 'India\'s Global Engine', icon: '💻', tag: 'Digital Economy',
    coverPhoto: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
    marketSize: '₹10.4 Lakh Crore', gdpShare: '7.5% of GDP', employment: '5.4 Million Direct', growthRate: '11% CAGR',
    oneLiner: 'India\'s IT industry turned a colonial education system\'s by-product — English-speaking engineers — into a $250 billion global export powerhouse that reshaped how the world thinks about software.',
    overview: {
      body: [
        'India\'s technology industry is the country\'s most successful export story. From near-zero in 1990, it has grown into a $250 billion sector that serves 90% of Fortune 500 companies, employs 5.4 million people directly and 15 million indirectly, and generates 7.5% of India\'s GDP.',
        'The sector has three distinct layers: IT services and BPO (the original export engine), a booming product and SaaS ecosystem, and a domestic digital economy powered by 850 million internet users, UPI, and the India Stack. Each layer is large enough to be a major industry in its own right.',
      ],
      stats: [
        { label: 'Industry Revenue', value: '$250 Billion' },
        { label: 'Export Revenue', value: '$195 Billion' },
        { label: 'Direct Employment', value: '5.4 Million' },
        { label: 'Fortune 500 Clients', value: '90%+' },
        { label: 'Global Market Share', value: '~55%' },
        { label: 'Unicorns', value: '110+' },
      ],
    },
    history: {
      timeline: [
        { year: '1968', event: 'TCS founded — India\'s first software company' },
        { year: '1972', event: 'Software Technology Parks (SEEPZ) established — first export zone for software' },
        { year: '1981', event: 'Infosys founded with ₹10,000 seed capital by N.R. Narayana Murthy and 6 co-founders' },
        { year: '1991', event: 'Liberalisation — import duties removed on hardware. IT sector takes off' },
        { year: '1999', event: 'Y2K boom: Indian IT firms handle global Y2K remediation. Trust established globally.' },
        { year: '2004', event: 'TCS IPO — ₹5,000 Cr. India realises IT can generate massive shareholder wealth.' },
        { year: '2016', event: 'India Stack (Aadhaar, UPI, DigiLocker) goes live — digital infrastructure revolution' },
        { year: '2021', event: 'Indian startup ecosystem produces 44 unicorns in a single year' },
        { year: '2024', event: 'India has 110+ unicorns, 3rd largest startup ecosystem globally' },
      ],
      body: [
        'The Indian IT story begins with two unlikely inputs: the Indian Institute of Technology (IIT) system, which produced world-class engineers, and the post-colonial British education legacy, which ensured those engineers spoke fluent English. American corporations discovered in the 1990s that these engineers could do the same work for 10% of the cost.',
        'What began as cost arbitrage became genuine competence. Indian firms like TCS, Infosys, Wipro, and HCL invested in quality certifications, delivery methodologies, and domain expertise. By 2010, Indian IT was not just cheaper — it was often better.',
      ],
    },
    structure: {
      steps: [
        { title: 'IT Services', desc: 'Application development, maintenance, ERP implementation, infrastructure management. Largest segment. Clients: Fortune 500 globally.' },
        { title: 'Business Process Outsourcing (BPO)', desc: 'Customer support, finance & accounting, HR outsourcing, medical transcription. India processes back-office work for banks, airlines, and insurers worldwide.' },
        { title: 'Product & SaaS', desc: 'Indian-origin global SaaS products — Zoho, Freshworks, Chargebee, Postman. Fastest-growing segment.' },
        { title: 'Startups & Digital Commerce', desc: 'Flipkart, Zomato, Nykaa, PhonePe — Indian consumer internet companies built on the India Stack.' },
        { title: 'GCC (Global Capability Centres)', desc: '1,700+ multinational GCCs in India (Bangalore, Hyderabad, Pune, Chennai) doing high-value R&D and product work.' },
      ],
      body: [
        'The fastest-growing segment is now GCCs — global companies setting up their own technology centres in India rather than outsourcing. This marks a shift from "India as a vendor" to "India as a strategic technology hub." GCCs now employ 1.7 million people and are expanding into AI, chip design, and cybersecurity.',
      ],
    },
    keyPlayers: [
      { name: 'TCS', type: 'Private', revenue: '₹2.41L Cr', note: 'Largest Indian IT company. Serves 50+ industries in 55 countries. Market cap: $170 Billion.' },
      { name: 'Infosys', type: 'Private', revenue: '₹1.57L Cr', note: 'Pioneer of the global delivery model. Founded 1981 with ₹10,000.' },
      { name: 'HCLTech', type: 'Private', revenue: '₹1.09L Cr', note: 'Strongest in infrastructure services and engineering R&D.' },
      { name: 'Wipro', type: 'Private', revenue: '₹89,000 Cr', note: 'Strong in BFSI and healthcare IT. Aggressive acquisitions under new CEO.' },
      { name: 'Zoho', type: 'Private (Unlisted)', revenue: '$1 Billion+', note: 'Bootstrapped SaaS giant. 90M users. Refused to go public for 25 years.' },
    ],
    market: {
      pullQuote: '"We did not just sell software services. We sold the world a new idea: that talent has no geography. India proved it."',
      body: [
        'India\'s IT exports are the country\'s single largest foreign exchange earner — larger than merchandise exports of any single commodity. The US accounts for 60% of IT export revenue, followed by Europe (25%) and the rest of the world.',
        'The domestic digital economy — powered by 850 million internet users, 400 million UPI users, and Jan Dhan accounts — is growing even faster than exports. India processes more digital payments daily than the US, UK, and Europe combined.',
      ],
      segments: [
        { name: 'IT Services', share: '52%' },
        { name: 'BPO / BPM', share: '22%' },
        { name: 'Software Products & SaaS', share: '15%' },
        { name: 'Hardware & Others', share: '11%' },
      ],
    },
    challenges: [
      { title: 'AI Disruption of Services Revenue', body: 'Generative AI threatens to automate 20–30% of IT services tasks — the very tasks that are most volume-heavy and most profitable. Large IT firms are racing to reposition as AI implementation partners, but the transition is uncertain.' },
      { title: 'Visa and Talent Mobility Restrictions', body: 'US H-1B visa restrictions, Brexit in the UK, and protectionism in multiple markets restrict the movement of Indian IT professionals. This increases costs and constrains growth for mid-size exporters.' },
      { title: 'Talent Attrition and Cost Inflation', body: 'The pandemic-era boom drove attrition above 25% at major firms. Salary inflation of 15–20% compressed margins. Stabilisation is underway but talent cost is structurally higher than pre-2020.' },
    ],
    opportunity: {
      areas: [
        { title: 'AI & Generative AI', desc: 'Every enterprise globally needs help implementing AI. Indian IT firms, with their existing client relationships and engineering depth, are positioned to capture this multi-trillion-dollar transformation.' },
        { title: 'GCC Expansion', desc: 'India expects 2,400 GCCs by 2030 from 1,700 today. This is premium, high-margin work in chip design, AI, cybersecurity — not commoditised services.' },
        { title: 'SaaS for Global Markets', desc: 'Indian SaaS companies (Zoho, Freshworks, Razorpay, Chargebee) have proven the model. The next wave — vertical SaaS for healthcare, legal, agri — is beginning.' },
        { title: 'Semiconductor & Chip Design', desc: 'India has 20% of the world\'s chip design engineers. With government support (India Semiconductor Mission), chip design is the next $50B export opportunity.' },
      ],
      body: [],
    },
    policy: {
      schemes: [
        { name: 'Digital India', desc: 'Umbrella programme: broadband, digital literacy, e-governance, common services centres. $500B digital economy target by 2025.' },
        { name: 'India Semiconductor Mission', desc: '₹76,000 Crore to attract chip fabrication and design companies. Tata Group building India\'s first chip fab.' },
        { name: 'PLI for IT Hardware', desc: '₹7,325 Crore to incentivise laptop, tablet, and server manufacturing in India.' },
        { name: 'MeitY Startup Hub', desc: 'Government incubator for deep-tech startups. 3,500+ startups supported.' },
      ],
      body: [
        'India\'s technology policy has accelerated significantly since 2015. The India Stack — Aadhaar, UPI, ONDC, ABDM, OCEN — is the most sophisticated public digital infrastructure in the world and has become an export product itself (multiple countries are licensing components).',
      ],
    },
    future: {
      pullQuote: '"India will go from being the world\'s back office to being the world\'s innovation lab. The next generation of products that run global businesses will have \'Designed in India\' on them."',
      body: [
        'India\'s IT industry is at the most complex inflection point in its 35-year modern history. The old model — labour arbitrage in services — is under pressure from AI. The new model — high-value product engineering, AI implementation, GCCs, and SaaS — requires different skills, different go-to-market, and different leadership.',
        'The opportunity is larger than ever. The risk is that Indian IT firms, accustomed to volume-based services growth, are too slow to transform. The startups, not the large services firms, may capture the next $100 billion.',
      ],
    },
    startups: [
      { name: 'Postman', founded: '2014', focus: 'API development platform — 25 million developers globally', note: 'Valued at $5.6 Billion. Bootstrapped to $100M ARR.' },
      { name: 'Chargebee', founded: '2011', focus: 'Subscription billing SaaS', note: 'Used by 6,500+ businesses. Unicorn status 2021.' },
      { name: 'Sarvam AI', founded: '2023', focus: 'Indian language large language models', note: 'First India-focused LLM company. Govt. partnership for Bhashini.' },
      { name: 'Krutrim', founded: '2023', focus: 'Indian AI — LLM, chips, cloud', note: 'Founded by Ola\'s Bhavish Aggarwal. India\'s fastest unicorn.' },
    ],
  },

  /* ═══════════ SOLAR ═══════════ */
  solar: {
    name: 'Solar Energy', tagline: 'India\'s Sun-Powered Future', icon: '☀️', tag: 'Clean Tech',
    coverPhoto: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
    marketSize: '₹1.8 Lakh Crore', gdpShare: '0.6% (growing)', employment: '1.1 Million', growthRate: '28% CAGR',
    oneLiner: 'India gets 300 sunny days a year and needs 500 GW of renewables by 2030 — making solar not just an environmental imperative but the single largest infrastructure investment story in the country.',
    overview: {
      body: [
        'India is the world\'s third-largest solar market by installed capacity, with over 85 GW operational as of 2024 — up from just 2.6 GW in 2014. The government\'s target: 500 GW of renewable energy by 2030, with solar contributing 300 GW.',
        'Solar has gone from a niche, subsidy-dependent sector to the cheapest source of new electricity in India. The solar tariff — ₹2.50 per unit in competitive auctions — is lower than coal-based power in many states. This cost revolution is driving adoption at a scale no one predicted a decade ago.',
      ],
      stats: [
        { label: 'Installed Capacity', value: '85+ GW' },
        { label: 'Market Size', value: '₹1.8L Crore' },
        { label: '2030 Target', value: '300 GW' },
        { label: 'Lowest Tariff', value: '₹2.50/unit' },
        { label: 'Annual Investment', value: '₹50,000 Cr' },
        { label: 'Global Rank', value: '#3 Installed' },
      ],
    },
    history: {
      timeline: [
        { year: '2010', event: 'National Solar Mission launched — 20 GW target by 2022 (later revised upward)' },
        { year: '2014', event: 'Target revised to 100 GW by 2022. Solar tariffs begin competitive auction era.' },
        { year: '2017', event: 'Solar tariff hits ₹2.44/unit in Rajasthan auction — cheaper than coal for first time' },
        { year: '2020', event: '500 GW renewable target by 2030 announced at COP25. Solar to contribute 300 GW.' },
        { year: '2022', event: 'India surpasses 60 GW installed solar capacity' },
        { year: '2023', event: 'PM Surya Ghar Yojana launched — 10 million rooftop solar installations' },
        { year: '2024', event: 'India crosses 85 GW. Domestic manufacturing push under PLI.' },
      ],
      body: [
        'India\'s solar story is one of policy ambition meeting market reality. The early years (2010–2016) were driven by subsidy and government procurement. The turning point came when competitive auctions replaced fixed feed-in tariffs — suddenly, developers competed on price, and tariffs fell 80% in 5 years. The market discovered that Indian sunshine, when efficiently harnessed, produces some of the cheapest electricity on earth.',
      ],
    },
    structure: {
      steps: [
        { title: 'Solar Module Manufacturing', desc: 'Polysilicon → ingots → wafers → cells → modules. India heavily imports from China. PLI scheme targeting 30 GW domestic module manufacturing.' },
        { title: 'Project Development (IPPs)', desc: 'Independent Power Producers bid in government auctions for large utility-scale projects (100 MW–2 GW). Land acquisition and grid connectivity are key bottlenecks.' },
        { title: 'EPC Contractors', desc: 'Engineering, Procurement & Construction firms build the actual projects. Largest: Sterling & Wilson, KPI Green, Tata Power Solar.' },
        { title: 'Rooftop Solar', desc: 'Distributed generation on commercial, industrial, and residential rooftops. Fastest-growing sub-segment, driven by PM Surya Ghar scheme.' },
        { title: 'Distribution (DISCOMs)', desc: 'State electricity distribution companies buy solar power through 25-year PPAs. DISCOM financial health is the sector\'s biggest systemic risk.' },
      ],
      body: [
        'The weakest link in India\'s solar chain is not technology — it is grid infrastructure and DISCOM health. Many state DISCOMs are bankrupt or near-bankrupt, creating payment risk for solar developers. Strengthening DISCOMs is as important as adding solar capacity.',
      ],
    },
    keyPlayers: [
      { name: 'Adani Green Energy', type: 'Private', revenue: '₹8,500 Cr', note: 'Largest solar IPP in India and world. 25 GW operational target by 2025.' },
      { name: 'Tata Power Solar', type: 'Private', revenue: '₹12,000 Cr', note: 'India\'s most integrated solar company — manufacturing + EPC + projects.' },
      { name: 'NTPC Renewable', type: 'PSU', revenue: '₹5,000 Cr+', note: 'Government\'s solar arm. Target: 60 GW renewable by 2032.' },
      { name: 'ReNew Power', type: 'Private', revenue: '₹7,000 Cr', note: 'Listed on Nasdaq. 13 GW portfolio across solar and wind.' },
      { name: 'Waaree Energies', type: 'Private', revenue: '₹11,000 Cr', note: 'India\'s largest solar module manufacturer. 13 GW annual capacity.' },
    ],
    market: {
      pullQuote: '"Solar at ₹2.50 per unit changed everything. It stopped being a green choice and became an economic choice. That\'s when scale became inevitable."',
      body: [
        'India needs to add 40–50 GW of solar annually to meet its 2030 target. Current annual addition is ~15 GW. The gap represents an annual investment opportunity of ₹1–1.5 lakh crore in project development alone, plus supply chain manufacturing.',
      ],
      segments: [
        { name: 'Utility Scale', share: '75%' },
        { name: 'Rooftop (C&I)', share: '15%' },
        { name: 'Rooftop (Residential)', share: '7%' },
        { name: 'Off-Grid / Agri', share: '3%' },
      ],
    },
    challenges: [
      { title: 'Chinese Module Dependency', body: 'India imports 70%+ of solar modules from China. Any disruption — tariffs, geopolitics, supply — creates project delays. PLI for domestic manufacturing is addressing this but full substitution will take 5–7 years.' },
      { title: 'Land Acquisition', body: 'A 1 GW solar park requires 2,500–3,000 acres. Land acquisition, clearances, and state government cooperation are persistent bottlenecks. Rajasthan and Gujarat are solar-friendly; many eastern states are not.' },
      { title: 'Grid Integration & Curtailment', body: 'As solar penetration rises, grid instability and curtailment (forcing generators to shut down during surplus) are emerging. India needs ₹3 lakh crore of grid strengthening investment to absorb 300 GW of renewables.' },
    ],
    opportunity: {
      areas: [
        { title: 'Green Hydrogen', desc: 'Solar + electrolysis = green hydrogen. India\'s National Green Hydrogen Mission targets 5 MMTPA production. Solar is the primary input.' },
        { title: 'Rooftop & Distributed Solar', desc: 'PM Surya Ghar targets 10 million rooftop installations. Currently 10 GW — target 40 GW by 2026. Massive installation, financing, and O&M opportunity.' },
        { title: 'Solar + Storage', desc: 'BESS (Battery Energy Storage Systems) paired with solar to provide round-the-clock power. India\'s storage market will exceed ₹50,000 Crore by 2030.' },
        { title: 'Solar Equipment Manufacturing', desc: 'PLI scheme for 30 GW module manufacturing creates a domestic supply chain opportunity worth ₹60,000 Crore.' },
      ],
      body: [],
    },
    policy: {
      schemes: [
        { name: 'PM Surya Ghar Muft Bijli Yojana', desc: '₹75,000 Crore scheme for 10 million rooftop solar installations. Free power up to 300 units/month.' },
        { name: 'PLI for Solar PV', desc: '₹24,000 Crore PLI for domestic solar module manufacturing. 30 GW capacity target.' },
        { name: 'KUSUM Yojana', desc: 'Solar for farmers: solarise pump sets, install solar on barren land. 30 GW agri-solar target.' },
        { name: 'RPO (Renewable Purchase Obligations)', desc: 'Mandates state DISCOMs to buy minimum % of power from renewables — key demand driver for solar.' },
      ],
      body: [],
    },
    future: {
      pullQuote: '"By 2035, solar will be India\'s cheapest, most abundant, and most reliable source of electricity. The transition is irreversible. The only question is how fast."',
      body: [
        'India is on track to become the world\'s largest solar market by capacity additions per year by 2027. The combination of low tariffs, government support, and now domestic manufacturing ambition makes it a once-in-a-generation investment theme.',
        'The next frontier is not panels on fields — it is solar on every rooftop, solar powering every pump, solar feeding green hydrogen plants, and solar integrated into building materials. India has the sunshine. The build-out is just beginning.',
      ],
    },
    startups: [
      { name: 'Waaree Energies', founded: '1990', focus: 'Solar module manufacturing — India\'s largest', note: 'IPO 2024. 13 GW capacity.' },
      { name: 'Orb Energy', founded: '2006', focus: 'Rooftop solar for SMEs and rural India', note: '50,000+ installations across South India.' },
      { name: 'SolarSquare', founded: '2020', focus: 'Residential rooftop solar with financing', note: '10,000+ home installations, ₹200 Cr ARR.' },
      { name: 'Log9 Materials', founded: '2015', focus: 'Advanced battery tech for solar storage', note: 'Backed by Amara Raja. Aluminium-air battery pioneer.' },
    ],
  },

  /* ═══════════ REAL ESTATE ═══════════ */
  'real-estate': {
    name: 'Real Estate', tagline: 'Where India Lives, Works, and Invests', icon: '🏘️', tag: 'Infra',
    coverPhoto: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    marketSize: '₹13 Lakh Crore', gdpShare: '6.8% of GDP', employment: '71 Million', growthRate: '9.2% CAGR',
    oneLiner: 'Real estate is India\'s second-largest employer, the primary savings vehicle for 300 million middle-class families, and the sector that simultaneously creates the most wealth and the most consumer distress.',
    overview: {
      body: [
        'India\'s real estate sector is one of the most complex markets in the world — hyper-local pricing, massive unorganised supply, regulatory fragmentation across 28 states, and demand driven by a growing middle class that treats property as a financial asset first and a home second.',
        'The sector contributes 6.8% to GDP and employs 71 million people — second only to agriculture. Every rupee spent in real estate generates significant multiplier demand: cement, steel, glass, paints, furniture, electricals, and home loans all follow a property sale.',
      ],
      stats: [
        { label: 'Market Size', value: '₹13L Crore' },
        { label: 'GDP Contribution', value: '6.8%' },
        { label: 'Employment', value: '71 Million' },
        { label: 'Annual Housing Demand', value: '1.2M Units' },
        { label: 'Office Stock (Top 7 Cities)', value: '800 MSF' },
        { label: '2047 Size Projection', value: '$5.8 Trillion' },
      ],
    },
    history: {
      timeline: [
        { year: '1950s', event: 'DDA (Delhi Development Authority) formed — government as developer era begins' },
        { year: '1980s', event: 'Private developers emerge in Mumbai, Delhi. Harshad Mehta era fuels early speculation.' },
        { year: '1991', event: 'Liberalisation: NRI investment allowed; FDI rules relaxed; IT boom drives office demand' },
        { year: '2005', event: 'FDI in real estate allowed — global capital enters India for first time' },
        { year: '2016', event: 'RERA (Real Estate Regulation Act) enacted — landmark consumer protection reform' },
        { year: '2019', event: 'REITs launched in India — Embassy REIT: first REIT listing. Institutional ownership begins.' },
        { year: '2021', event: 'Post-COVID housing boom: stamp duty cuts, WFH demand, record sales.' },
        { year: '2024', event: 'Premium housing dominates. Office market recovers. Data centres emerge as new asset class.' },
      ],
      body: [
        'Indian real estate before RERA 2016 was a developer\'s market: buyers paid upfront, projects were delayed indefinitely, and recourse was minimal. RERA changed the power balance — mandatory project registration, escrow accounts, delivery timelines, and penalties for delay. The law was imperfect in implementation but structurally transformative.',
      ],
    },
    structure: {
      steps: [
        { title: 'Land Acquisition', desc: 'Developers acquire land through outright purchase, joint development agreements (JDA) with landowners, or government auction. Land is 30–50% of project cost in major cities.' },
        { title: 'Approvals & Planning', desc: 'Municipal, environment, fire, and structural approvals. The most time-consuming phase — often 2–4 years in major cities.' },
        { title: 'Construction', desc: 'Executed by contractors. Material costs (cement, steel, labour) are ~40% of project cost. Quality varies enormously between organised and unorganised developers.' },
        { title: 'Sales & Marketing', desc: 'Pre-launch sales to investors, followed by public launch. Channel partners (brokers) drive 60–70% of sales in most markets.' },
        { title: 'Delivery & Possession', desc: 'Final stage — subject to RERA timelines. Occupancy Certificate (OC) required before handover. Most consumer disputes arise here.' },
      ],
      body: [
        'India\'s real estate market is 85% unorganised by value — dominated by local, unlisted developers with limited accountability. The listed, RERA-compliant, organised segment (DLF, Godrej, Prestige, Sobha) represents only 15% of supply but drives 80% of consumer confidence.',
      ],
    },
    keyPlayers: [
      { name: 'DLF', type: 'Listed', revenue: '₹6,600 Cr', note: 'India\'s largest listed developer. Commands premium pricing in Gurugram. ₹80,000 Cr market cap.' },
      { name: 'Godrej Properties', type: 'Listed', revenue: '₹3,000 Cr', note: 'Fastest-growing listed developer. Known for delivery quality and brand trust.' },
      { name: 'Prestige Group', type: 'Listed', revenue: '₹7,000 Cr', note: 'Dominates Bengaluru. Expanding rapidly into Mumbai, Delhi, Hyderabad.' },
      { name: 'Embassy REIT', type: 'Listed (REIT)', revenue: '₹3,500 Cr', note: 'India\'s first REIT. 45 MSF office portfolio. Backed by Blackstone.' },
      { name: 'PropTiger / Housing.com', type: 'Private', revenue: '₹500 Cr', note: 'India\'s leading digital real estate marketplace. REA Group-backed.' },
    ],
    market: {
      pullQuote: '"Indians don\'t buy homes to live in them. They buy homes to save in them. Real estate is the fixed deposit of the aspirational class."',
      body: [
        'India\'s annual housing demand is ~1.2 million units in urban areas and 3 million in rural areas. The affordable housing gap (homes priced below ₹40 lakh) is estimated at 18.5 million units. The premium segment (above ₹1 crore) is the fastest-growing and the most profitable.',
        'Office real estate has recovered strongly from COVID, driven by GCC expansion. India now has 800 million square feet of Grade A office stock across 7 cities. Data centres — a new asset class — are growing 30% annually.',
      ],
      segments: [
        { name: 'Residential', share: '60%' },
        { name: 'Commercial Office', share: '20%' },
        { name: 'Retail', share: '10%' },
        { name: 'Industrial / Warehousing', share: '10%' },
      ],
    },
    challenges: [
      { title: 'Project Delay & Stalled Projects', body: '4.5 lakh housing units worth ₹4.5 lakh crore are stalled across India — projects sold, money collected, construction stopped. RERA-mandated escrow is preventing new cases but legacy stalling remains a crisis.' },
      { title: 'Affordability in Metro Cities', body: 'Mumbai average apartment price: ₹1.8 crore. Delhi: ₹1.3 crore. On median household income, this is 25–30 years of savings. The gap between aspiration and affordability is structurally widening.' },
      { title: 'Black Money & Opacity', body: 'Despite GST and RERA, cash transactions remain significant in secondary market deals. Benami property laws and tax enforcement are improving transparency, but the sector remains one of the least transparent in the economy.' },
    ],
    opportunity: {
      areas: [
        { title: 'Affordable Housing', desc: 'PMAY targets 2 crore homes by 2024. Massive unmet demand for sub-₹40 lakh homes in Tier 2 and 3 cities. Profitable at scale for low-cost developers.' },
        { title: 'Data Centres', desc: 'Hyperscaler demand (Amazon, Google, Microsoft) + AI driving data centre construction. India needs 3,000+ MW of data centre capacity by 2027. ₹50,000 Crore investment pipeline.' },
        { title: 'Proptech', desc: 'Digital marketplaces, AI-based valuation, blockchain for title registry, virtual site visits — ₹8,000 Crore invested in proptech 2017–2024.' },
        { title: 'REITs & Fractional Ownership', desc: 'India has 4 listed REITs. Fractional ownership platforms (hBits, Strata, PropertyShare) democratise access to commercial real estate for small investors.' },
      ],
      body: [],
    },
    policy: {
      schemes: [
        { name: 'RERA 2016', desc: 'Real Estate Regulation and Development Act — mandatory registration, escrow, RERA authority in each state.' },
        { name: 'PMAY (Urban)', desc: 'Pradhan Mantri Awas Yojana — 2 Crore homes target. Credit-linked subsidy for first-time home buyers.' },
        { name: 'REITs Framework', desc: 'SEBI-regulated REITs — listed commercial real estate. 4 REITs with ₹1.4 lakh crore AUM.' },
        { name: 'SWAMIH Fund', desc: 'Government-backed stress fund for stalled real estate projects. ₹15,530 Crore deployed, 26,000 homes delivered.' },
      ],
      body: [],
    },
    future: {
      pullQuote: '"India will add the equivalent of a city the size of Chicago to its urban landscape every year for the next 20 years. Real estate will build that city."',
      body: [
        'India\'s real estate sector is projected to reach $1 trillion by 2030 and $5.8 trillion by 2047. Urbanisation (India will have 600 million urban residents by 2031), nuclear family formation, and rising incomes are the structural demand drivers that no economic cycle can eliminate.',
        'The sector\'s future will be shaped by three forces: technology (proptech transforming discovery, financing, and registry), institutional capital (REITs, pension funds, sovereign wealth funds owning real estate at scale), and sustainability (green buildings, net-zero construction mandates).',
      ],
    },
    startups: [
      { name: 'NoBroker', founded: '2014', focus: 'Zero-brokerage rental and buy/sell platform', note: 'Unicorn. 10 million users. Disrupting the broker model.' },
      { name: 'Square Yards', founded: '2014', focus: 'Full-stack real estate platform — search, finance, management', note: 'Listed. Operations in 20+ cities, 9 countries.' },
      { name: 'hBits', founded: '2018', focus: 'Fractional commercial real estate investment', note: 'SEBI-regulated SM-REIT. ₹500 Cr AUM.' },
      { name: 'Homesfy', founded: '2021', focus: 'Tech-enabled real estate brokerage', note: 'Listed on BSE SME. 3,500+ channel partners.' },
    ],
  },

  /* ═══ Placeholders for remaining industries ═══ */
  scrap: {
    name: 'Scrap Industry', tagline: 'India\'s Circular Economy Revolution', icon: '♻️', tag: 'Circular Economy',
    coverPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80',
    marketSize: '₹1.2 Lakh Crore', gdpShare: '0.5% of GDP', employment: '4 Million', growthRate: '15% CAGR',
    oneLiner: 'India\'s scrap industry — once the invisible backbone of its manufacturing sector — is now at the centre of the green economy transition, as every tonne of scrap replaces 1.4 tonnes of virgin ore.',
    overview: {
      body: ['India generates over 30 million metric tonnes of metal scrap annually. This sector — once fragmented, informal, and overlooked — is transforming into a critical input for the green steel transition. Electric arc furnaces, which use scrap instead of iron ore, are 60% less carbon-intensive than blast furnaces.', 'The scrap industry encompasses steel, aluminium, copper, paper, plastic, and e-waste. India is the world\'s largest importer of copper and aluminium scrap. The domestic scrap collection and processing ecosystem — dominated by small traders and informal workers — is now attracting organised capital, technology, and policy attention.'],
      stats: [{ label: 'Market Size', value: '₹1.2L Crore' }, { label: 'Metal Scrap Generated', value: '30+ MMT/year' }, { label: 'Employment', value: '4 Million' }, { label: 'EAF Share in Steel', value: '28%' }, { label: 'E-Waste Generated', value: '3.2 MMT/year' }, { label: 'Growth Rate', value: '15% CAGR' }],
    },
    history: {
      timeline: [{ year: '1947', event: 'Post-partition scrap from British-era infrastructure fuels India\'s first industrial expansion' }, { year: '1970s', event: 'Informal scrap networks (kabadiwala ecosystem) formalise across major cities' }, { year: '1991', event: 'Liberalisation drives industrial expansion → more manufacturing waste → larger scrap pools' }, { year: '2010', event: 'India becomes world\'s largest sponge iron producer — scrap demand rises' }, { year: '2016', event: 'E-Waste Management Rules enacted — formal e-waste recycling begins' }, { year: '2021', event: 'Vehicle Scrappage Policy — government creates structured end-of-life vehicle ecosystem' }, { year: '2023', event: 'MSTC and government launch scrap exchange platforms for price discovery' }],
      body: ['The Indian scrap story is really two stories: the ancient, informal kabadiwala network that has recycled India\'s waste for generations, and the modern, organised scrap processing industry emerging alongside green manufacturing mandates.'],
    },
    structure: { steps: [{ title: 'Collection', desc: 'Kabadiwalas, scrap dealers, and industrial waste contractors collect material from households, factories, and demolition sites.' }, { title: 'Sorting & Segregation', desc: 'Manual and mechanical sorting separates ferrous, non-ferrous, and non-metallic scrap. Quality grading determines pricing.' }, { title: 'Processing & Shredding', desc: 'Industrial shredders, shears, and balers process scrap into feedstock grades suitable for smelters and mills.' }, { title: 'Consumption', desc: 'Steel EAFs, aluminium smelters, copper refineries, and paper mills consume processed scrap as primary raw material.' }, { title: 'E-Waste & Specialised Streams', desc: 'Electronic waste requires specialised processing to recover gold, silver, palladium, and rare earths while safely disposing of toxic components.' }], body: ['India\'s scrap infrastructure is severely under-invested. Less than 30% of scrap passes through any organised processing facility. The Vehicle Scrappage Policy is catalysing investment in Registered Vehicle Scrapping Facilities (RVSFs) — 100+ are now operational.'] },
    keyPlayers: [{ name: 'Ferrous & Scrap Processing', type: 'Unorganised (85%)', revenue: 'N/A', note: 'Dominated by 50,000+ small traders and aggregators. No listed pure-play scrap company.' }, { name: 'MSTC Limited', type: 'PSU', revenue: '₹3,500 Cr', note: 'Government e-commerce for scrap trading. Conducts metal and scrap auctions.' }, { name: 'Attero Recycling', type: 'Private', revenue: '₹500 Cr', note: 'India\'s largest e-waste recycler. Processes phones, laptops, batteries at industrial scale.' }, { name: 'Mahindra Accelo', type: 'Private', revenue: '₹800 Cr', note: 'Mahindra\'s scrap management subsidiary. Industrial scrap for large manufacturers.' }],
    market: { pullQuote: '"Every tonne of scrap steel used in an EAF saves 1.4 tonnes of iron ore, 740 kg of coal, and emits 1.5 fewer tonnes of CO₂. Scrap is not waste. It is the most valuable raw material in the green economy."', body: ['India\'s steel industry currently uses 28% scrap (vs 60%+ in developed nations). As India\'s steel stock matures over the next 20 years, scrap availability will grow dramatically — making EAF-based steelmaking economically and environmentally superior.'], segments: [{ name: 'Ferrous Scrap', share: '55%' }, { name: 'Non-Ferrous Metals', share: '25%' }, { name: 'Paper & Plastic', share: '15%' }, { name: 'E-Waste', share: '5%' }] },
    challenges: [{ title: 'Informal Sector Dominance', body: 'Over 85% of scrap trade is informal — no GST, no weight certification, no environmental compliance. Organised players cannot compete on price with entities that have zero regulatory cost.' }, { title: 'Import Dependency for Quality Scrap', body: 'Domestic scrap quality is often inconsistent. India imports $3.5 billion of copper and aluminium scrap annually because domestic collection cannot match global grade standards.' }],
    opportunity: { areas: [{ title: 'Vehicle Scrappage', desc: '30 million vehicles older than 15 years eligible for scrappage. ₹10,000+ Crore annual scrap generation opportunity.' }, { title: 'E-Waste Recycling', desc: 'India generates 3.2 MMT of e-waste — and recovers less than 25%. Gold, silver, copper, and REEs worth ₹25,000 Crore lost annually.' }, { title: 'Industrial Scrap Management', desc: 'Large manufacturers outsourcing scrap management as a service — organised, data-driven, and compliant.' }], body: [] },
    policy: { schemes: [{ name: 'Vehicle Scrappage Policy 2021', desc: 'Incentives for scrapping old vehicles. RVSF registration scheme. Targets 30 million vehicles.' }, { name: 'E-Waste Management Rules 2022', desc: 'Extended Producer Responsibility (EPR) — electronics companies must take back end-of-life products.' }, { name: 'Scrap-Based EAF Incentives', desc: 'Ministry of Steel promoting EAF adoption through reduced power tariffs and raw material incentives.' }], body: [] },
    future: { pullQuote: '"India\'s scrap industry is about to go from being the economy\'s dustbin to being its most valuable raw material repository."', body: ['The green steel transition guarantees that Indian scrap demand will triple by 2035. Organised processing, digital scrap trading platforms, and e-waste recovery will all scale dramatically. The kabadiwala of 2035 may be running a certified, GSTIN-compliant, digitally connected scrap business.'] },
    startups: [{ name: 'Attero Recycling', founded: '2008', focus: 'E-waste and lithium-ion battery recycling', note: '₹500 Cr revenue. Processes 150+ types of electronics.' }, { name: 'Bankezy', founded: '2021', focus: 'Digital scrap marketplace for SME sellers', note: 'Connects 5,000+ scrap generators with processors.' }],
  },

  fmcg: {
    name: 'FMCG', tagline: 'What India Buys Every Day', icon: '🛒', tag: 'Consumer Goods',
    coverPhoto: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80',
    marketSize: '₹5.8 Lakh Crore', gdpShare: '2.5% of GDP', employment: '3 Million Direct', growthRate: '14.9% CAGR',
    oneLiner: 'India\'s FMCG sector sells to 1.4 billion consumers through 13 million retail outlets — the world\'s most complex and resilient consumer distribution machine.',
    overview: {
      body: ['Fast-Moving Consumer Goods (FMCG) is India\'s fourth-largest sector by revenue, selling food & beverages, personal care, household products, and health & wellness items through a distribution network of 13 million kirana stores, modern trade chains, and e-commerce platforms.', 'India\'s FMCG market is unique globally: extreme price sensitivity (most products have ₹5 and ₹10 sachets), massive rural penetration (44% of FMCG revenue comes from rural India), and coexistence of century-old brands (Lifebuoy, 1895) and disruptive D2C newcomers.'],
      stats: [{ label: 'Market Size', value: '₹5.8L Crore' }, { label: 'Retail Outlets', value: '13 Million' }, { label: 'Rural Share', value: '44%' }, { label: 'Listed Companies', value: '100+' }, { label: 'D2C Brands', value: '5,000+' }, { label: 'Growth Rate', value: '14.9% CAGR' }],
    },
    history: {
      timeline: [{ year: '1888', event: 'Lever Brothers enters India — Lifebuoy soap. First modern FMCG marketing in India.' }, { year: '1929', event: 'Parle Products founded — Parle-G biscuits define mass market pricing.' }, { year: '1956', event: 'Hindustan Lever Limited (now HUL) incorporated in India.' }, { year: '1991', event: 'MNC brands enter post-liberalisation. Pepsi, Coca-Cola, P&G arrive.' }, { year: '2008', event: 'Rural FMCG boom — sachets, low-unit packs penetrate Bharat.' }, { year: '2020', event: 'D2C brands explode post-COVID. Mamaearth, Wow, Plum scale on Instagram.' }, { year: '2023', event: 'Quick commerce (Blinkit, Zepto, Swiggy Instamart) reshapes FMCG distribution.' }],
      body: ['Indian FMCG is simultaneously the most mature and most dynamic consumer market in Asia. HUL has been selling soap in India since 1888. And a 3-year-old D2C brand is disrupting its shampoo category on Instagram. Both realities coexist — and neither is wrong.'],
    },
    structure: { steps: [{ title: 'Manufacturing', desc: 'Own plants or contract manufacturing (CMOs). Most FMCG companies outsource 30–60% of production to reduce fixed costs.' }, { title: 'Supply Chain & Warehousing', desc: 'National and regional distribution centres. Cold chain for dairy, ice cream, frozen foods. Speed-to-market is the primary differentiator.' }, { title: 'Distributor Network', desc: '4,000–6,000 distributors per major FMCG company cover 6–8 million retail outlets nationally.' }, { title: 'Retail — GT & MT', desc: 'General Trade (kirana stores) still 85% of FMCG sales. Modern Trade (DMart, Reliance Retail, Big Bazaar) growing. Quick commerce (10-minute delivery) — fastest growing.' }, { title: 'D2C & E-Commerce', desc: 'Brands selling directly on own websites, Amazon, Flipkart, Blinkit. D2C allows higher margins and consumer data ownership.' }], body: [] },
    keyPlayers: [{ name: 'HUL', type: 'Listed (MNC)', revenue: '₹62,000 Cr', note: 'India\'s largest FMCG company. 50+ brands across 14 categories.' }, { name: 'ITC', type: 'Listed', revenue: '₹70,000 Cr', note: 'Cigarettes + FMCG + Hotels. Aashirvaad, Bingo, Sunfeast are market leaders.' }, { name: 'Nestlé India', type: 'Listed (MNC)', revenue: '₹18,500 Cr', note: 'Maggi, KitKat, Munch — premium mass market leader.' }, { name: 'Dabur', type: 'Listed', revenue: '₹13,000 Cr', note: 'Ayurvedic heritage brand. Real Juice, Chyawanprash, Vatika.' }, { name: 'Mamaearth', type: 'Listed (D2C)', revenue: '₹2,000 Cr', note: 'India\'s first D2C unicorn. Natural personal care. Founded 2016.' }],
    market: { pullQuote: '"India\'s FMCG market is not one market. It is 29 states, 6 lakh villages, and 5,000 castes — each with its own eating habits, cleaning rituals, and beauty standards. That complexity is the moat."', body: ['India\'s FMCG growth is now a tale of two markets: urban premiumisation (consumers upgrading to higher-price, better-quality products) and rural volume growth (first-time buyers entering categories). Both are growing simultaneously — making India the most attractive FMCG market after China.'], segments: [{ name: 'Food & Beverages', share: '50%' }, { name: 'Personal Care', share: '22%' }, { name: 'Household Care', share: '12%' }, { name: 'Health & Wellness', share: '16%' }] },
    challenges: [{ title: 'Rural Slowdown & Inflation', body: 'Rural consumption dipped in 2022–23 as food inflation squeezed household budgets. FMCG companies saw volume growth stall even as value grew. Recovery is underway but rural India\'s sensitivity to inflation remains a structural volatility.' }, { title: 'D2C Disruption', body: 'New-age brands like Mamaearth, Wow, Sugar Cosmetics, and mCaffeine have taken meaningful share in personal care — historically HUL and P&G territory. The threat: digital-native brands have lower marketing costs and better consumer data.' }],
    opportunity: { areas: [{ title: 'Rural Penetration', desc: 'Per capita FMCG spend in rural India is ₹3,000/year vs ₹10,000 in urban. As rural incomes rise, this gap closes — creating ₹1 lakh crore of incremental demand.' }, { title: 'Health & Wellness', desc: 'Post-COVID health consciousness driving premium vitamins, protein, organic foods, and ayurvedic products. 35% growth p.a.' }, { title: 'Quick Commerce', desc: '10-minute grocery delivery is the fastest-growing FMCG channel. Blinkit, Zepto, Swiggy Instamart combined GMV expected to cross ₹1 lakh crore by 2026.' }], body: [] },
    policy: { schemes: [{ name: 'PLI for Food Processing', desc: '₹10,900 Crore PLI to boost domestic food processing and packaged food manufacturing.' }, { name: 'PM FME Scheme', desc: 'Formalisation of Micro Food Enterprises — ₹10,000 Crore to upgrade 2 lakh unorganised food units.' }, { name: 'FSSAI Regulations', desc: 'Food safety standards modernisation — front-of-pack labelling, sugar/salt limits, online food standards.' }], body: [] },
    future: { pullQuote: '"The next billion FMCG customers are in India. They will buy their first shampoo, their first deodorant, their first packaged snack — in the next 5 years. That is the most exciting consumer story on earth."', body: ['India\'s FMCG market is projected to reach ₹15 lakh crore by 2030, driven by rural consumption growth, premiumisation, and the emergence of D2C brands. Quick commerce will reshape distribution, potentially making 13 million kirana stores less relevant — or making them partners in last-mile delivery.'] },
    startups: [{ name: 'Mamaearth', founded: '2016', focus: 'Natural personal care D2C', note: 'India\'s first D2C unicorn. ₹2,000 Cr revenue.' }, { name: 'Country Delight', founded: '2015', focus: 'Farm-fresh dairy subscription', note: '2 million daily deliveries. ₹1,000 Cr ARR.' }, { name: 'Zepto', founded: '2021', focus: '10-minute grocery delivery', note: 'Unicorn at age 2. ₹15,000 Cr GMV run rate.' }],
  },

  ev: {
    name: 'Electric Vehicles', tagline: 'India\'s Mobility Revolution', icon: '⚡', tag: 'Future Mobility',
    coverPhoto: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80',
    marketSize: '₹50,000 Crore', gdpShare: '0.2% (growing fast)', employment: '500,000 (growing)', growthRate: '49% CAGR',
    oneLiner: 'India sells 4 million EVs a year — almost all two-wheelers — and the race to electrify its 300 million vehicle fleet has become the most disruptive industrial transformation since the Green Revolution.',
    overview: {
      body: ['India\'s EV market has grown from near-zero in 2019 to 4 million+ units in FY24 — a 49% CAGR. Electric two-wheelers dominate (78%), followed by three-wheelers (15%) and passenger cars (7%). The EV revolution in India is not a luxury car story — it is a two-wheeler story, driven by cost savings, FAME subsidies, and rising petrol prices.', 'India has set a target of 30% EV penetration by 2030. At current growth rates, it will likely overshoot in two-wheelers and three-wheelers, while passenger cars will lag. Commercial vehicles (buses, trucks) are a massive opportunity just beginning.'],
      stats: [{ label: 'Annual Sales (FY24)', value: '4 Million+' }, { label: 'EV Penetration', value: '6.4% Overall' }, { label: '2W EV Penetration', value: '5.1%' }, { label: '3W EV Penetration', value: '55%' }, { label: 'Charging Stations', value: '12,000+' }, { label: '2030 Target', value: '30% Penetration' }],
    },
    history: {
      timeline: [{ year: '2013', event: 'NEMMP (National Electric Mobility Mission Plan) — India\'s first EV policy. 6–7 million EV target by 2020 (missed).' }, { year: '2015', event: 'Ola Electric concept; Tata Motors EV pilot in government fleet' }, { year: '2019', event: 'FAME II launched — ₹10,000 Crore subsidy for 2W, 3W, buses' }, { year: '2020', event: 'Ola Electric founded. Production starts. Indian startup EV race begins.' }, { year: '2021', event: 'Ola S1 launch — ₹99,999 scooter. 1 lakh bookings in 24 hours.' }, { year: '2022', event: 'EV sales triple. Tata Nexon EV becomes India\'s best-selling electric car.' }, { year: '2023', event: 'PM e-Bus Sewa: 10,000 electric buses for state transport.' }, { year: '2024', event: 'PLI for Advanced Chemistry Cells (ACC) — domestic battery manufacturing begins.' }],
      body: ['India\'s EV story is being written differently from China\'s or Europe\'s. No mandate, no ICE ban deadline. Instead: subsidies, infrastructure push, and market creation by entrepreneurs. Ola Electric\'s Bhavish Aggarwal bet his company on Indian manufacturing and won — his Rajasthan factory produces the world\'s largest volume of electric scooters at a single location.'],
    },
    structure: { steps: [{ title: 'Battery (Cells)', desc: 'Currently 95% imported — primarily from China. PLI for ACC batteries is building domestic cell manufacturing (Ola, Amara Raja, Exide, Reliance).' }, { title: 'Battery Pack Assembly', desc: 'Indian companies assemble battery packs from imported cells. Adds 20–30% local value. Increasingly sophisticated BMS systems.' }, { title: 'EV Manufacturing', desc: 'Vehicle OEMs (Tata, Ola, Ather, Hero, TVS, Bajaj) manufacture the vehicle platform, integrate battery, and manage software.' }, { title: 'Charging Infrastructure', desc: 'Public charging (Tata Power, EESL, ChargeZone), fleet charging (bus depots, logistics), and home charging. Currently undersupplied.' }, { title: 'Fleet & Services', desc: 'Ola, Uber, Rapido deploying electric fleets. BluSmart — 100% electric cab service. EV leasing platforms for gig workers.' }], body: [] },
    keyPlayers: [{ name: 'Tata Motors', type: 'Listed', revenue: '₹4.4L Cr (Group)', note: 'India\'s largest passenger EV maker. Nexon EV, Tiago EV, Punch EV.' }, { name: 'Ola Electric', type: 'Listed', revenue: '₹5,200 Cr', note: 'India\'s largest 2W EV maker. 35% market share. Futuristic Rajasthan gigafactory.' }, { name: 'Ather Energy', type: 'Private', revenue: '₹1,800 Cr', note: 'Premium 2W EV. Known for software excellence. IPO planned.' }, { name: 'TVS Motor', type: 'Listed', revenue: '₹35,000 Cr', note: 'iQube electric scooter. 2nd largest 2W EV. Global EV ambition.' }, { name: 'ChargeZone', type: 'Private', revenue: '₹150 Cr', note: 'India\'s fastest-growing EV charging network. 10,000+ charge points.' }],
    market: { pullQuote: '"India will not electrify its vehicle fleet by banning petrol. It will electrify it by making electric so much cheaper that no one chooses petrol."', body: ['India\'s EV market is a two-speed race: two-wheelers are already at scale (5.1% penetration), while passenger cars are just beginning (2.4% penetration). The unlock for passenger cars depends on affordable models (sub-₹10 lakh) and charging infrastructure — both of which are now arriving.'], segments: [{ name: 'Two-Wheelers', share: '78%' }, { name: 'Three-Wheelers', share: '15%' }, { name: 'Passenger Cars', share: '6%' }, { name: 'Buses & Commercial', share: '1%' }] },
    challenges: [{ title: 'Battery Cost & Import Dependency', body: 'Lithium-ion cells account for 40–50% of an EV\'s cost. India imports 95% of its cells, primarily from China. Until domestic ACC manufacturing scales (PLI projects operational by 2026), Indian EVs remain expensive and geopolitically exposed.' }, { title: 'Charging Infrastructure Gap', body: 'India has 12,000 public charging stations for 4 million EVs — a 1:330 ratio. The global benchmark is 1:10. Range anxiety remains the primary barrier to passenger car EV adoption.' }],
    opportunity: { areas: [{ title: 'Electric Buses', desc: '10,000 PM e-Bus Seva order. BSRTC, DTC, KSRTC electrifying fleets. ₹50,000 Crore market for bus manufacturers and charging infra.' }, { title: 'Logistics EVs', desc: 'E-commerce last-mile (Zomato, Amazon, Flipkart) switching to electric 3Ws. 3 million 3Ws to electrify = ₹30,000 Crore.' }, { title: 'Battery Recycling', desc: 'By 2030, India will have significant end-of-life EV batteries. Lithium, cobalt recovery — a ₹15,000 Crore circular economy opportunity.' }], body: [] },
    policy: { schemes: [{ name: 'FAME II', desc: '₹10,000 Crore demand subsidy for 2W, 3W, electric buses. Extended to March 2024.' }, { name: 'PLI for ACC Batteries', desc: '₹18,100 Crore for domestic lithium-ion cell manufacturing. 50 GWh capacity target.' }, { name: 'PM e-Bus Sewa', desc: '10,000 electric buses for state transport undertakings. ₹57,613 Crore scheme.' }, { name: 'EV Charging Infrastructure Guidelines', desc: 'BEE standards for public chargers. At least one public charger per 3km in cities.' }], body: [] },
    future: { pullQuote: '"By 2030, buying a petrol two-wheeler in India will feel as strange as buying a black-and-white television feels today."', body: ['India is on track to be the world\'s 3rd-largest EV market by 2030. The transition is inevitable — driven not by regulation but by economics. Electric two-wheelers already have a lower total cost of ownership than petrol. As battery costs fall further, electric cars will cross that threshold by 2026–27.'] },
    startups: [{ name: 'Ola Electric', founded: '2017', focus: 'Electric scooters + domestic battery manufacturing', note: 'India\'s largest 2W EV. Listed 2024.' }, { name: 'Ather Energy', founded: '2013', focus: 'Premium smart electric scooters', note: 'IIT Madras-born. IPO in progress.' }, { name: 'Euler Motors', founded: '2018', focus: 'Electric cargo 3-wheelers for last-mile logistics', note: 'Backed by GIC. 10,000+ fleet.' }, { name: 'Log9 Materials', founded: '2015', focus: 'Fast-charging aluminium-air battery tech', note: 'Partnered with Amara Raja.' }],
  },

  biofuel: {
    name: 'Biofuel', tagline: 'Grown in India, Powering India', icon: '🌿', tag: 'Green Energy',
    coverPhoto: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80',
    marketSize: '₹35,000 Crore', gdpShare: '0.14%', employment: '2 Million (agri-linked)', growthRate: '18% CAGR',
    oneLiner: 'India\'s biofuel programme is the world\'s most ambitious — blending sugarcane ethanol into petrol at 15% and targeting 20% by 2025 — saving $4 billion in oil imports annually while paying sugarcane farmers ₹65,000 crore more.',
    overview: {
      body: ['Biofuel in India primarily means ethanol blending in petrol (EBP programme) and biodiesel blending in diesel. The government\'s target: 20% ethanol blending in petrol by 2025 and 5% biodiesel blending by 2030. In FY24, ethanol blending reached 15% — up from 1.5% in 2014. This saved India $4 billion in crude oil imports and paid ₹65,000 crore directly to sugarcane farmers.', 'Beyond ethanol, India is developing Compressed Biogas (CBG) from agricultural waste, 2G ethanol from rice/wheat stubble, and Sustainable Aviation Fuel (SAF) — making biofuel a multi-feedstock, multi-application sector.'],
      stats: [{ label: 'Market Size', value: '₹35,000 Crore' }, { label: 'Ethanol Blending FY24', value: '15%' }, { label: '2025 Target', value: '20% Blending' }, { label: 'Oil Import Saved', value: '$4 Billion/year' }, { label: 'Farmer Revenue Added', value: '₹65,000 Cr' }, { label: 'CBG Plants Target', value: '5,000 by 2025' }],
    },
    history: {
      timeline: [{ year: '2003', event: 'National Biofuel Policy — first ethanol blending pilot in 9 states' }, { year: '2009', event: 'National Biofuel Policy formalised — 20% blending target for 2017 (not achieved)' }, { year: '2018', event: 'SATAT scheme: 5,000 CBG plants; biofuels from agricultural waste allowed for first time' }, { year: '2021', event: 'Ethanol blending target advanced from 2030 to 2025. 20% E20 fuel specifications released.' }, { year: '2022', event: 'National Biofuel Policy 2022 — 2G/3G biofuels, SAF included for first time' }, { year: '2024', event: '15% blending milestone crossed. FY24 ethanol procurement: 720 Crore litres.' }],
      body: ['India\'s biofuel programme succeeded where many nations\' failed for one reason: it aligned farmer income with national energy security. Paying sugarcane farmers ₹65,000 crore for ethanol — above market price — created a supply-pull that no mandate could have achieved alone.'],
    },
    structure: { steps: [{ title: 'Feedstock Production', desc: 'Sugarcane, maize, damaged rice, FCI surplus grain → 1G ethanol. Agricultural waste (paddy straw, bagasse) → 2G ethanol. Municipal waste → CBG.' }, { title: 'Distillation', desc: 'Sugar mills and standalone distilleries convert molasses/grain to ethanol. India has 700+ distilleries with 1,000+ Crore litre capacity.' }, { title: 'Procurement by OMCs', desc: 'Oil Marketing Companies (IOCL, BPCL, HPCL) procure ethanol from distilleries at government-fixed prices and blend at depots.' }, { title: 'Blending & Distribution', desc: 'Ethanol blended at fuel depots before reaching petrol pumps. E20 (20% ethanol) compatible vehicles being manufactured from 2023.' }, { title: 'CBG & Advanced Biofuels', desc: 'Biogas plants convert crop waste to CBG. SAF plants being piloted for aviation. 2G ethanol: IOC\'s Panipat plant — India\'s first commercial 2G plant.' }], body: [] },
    keyPlayers: [{ name: 'Indian Oil Corporation (IOC)', type: 'PSU', revenue: '₹8.7L Cr', note: 'Largest ethanol buyer. Runs India\'s first 2G ethanol plant at Panipat.' }, { name: 'Praj Industries', type: 'Listed', revenue: '₹3,500 Cr', note: 'India\'s leading biofuel technology company. Designs distilleries and 2G plants globally.' }, { name: 'Triveni Engineering', type: 'Listed', revenue: '₹5,500 Cr', note: 'Sugar + distillery. One of India\'s largest ethanol producers.' }, { name: 'Bajaj Hindusthan Sugar', type: 'Listed', revenue: '₹9,500 Cr', note: 'Largest sugar company. Rapidly expanding distillery capacity.' }],
    market: { pullQuote: '"Biofuel is not an alternative energy story. It is an agriculture income story, an energy security story, and a climate story — all in one litre of ethanol."', body: ['India needs 1,016 Crore litres of ethanol annually for 20% blending. FY24 procurement was 720 Crore litres. The 300 Crore litre gap represents a ₹22,000 Crore supply opportunity. Distillery capacity is being added at record pace.'], segments: [{ name: '1G Ethanol (Sugar/Grain)', share: '92%' }, { name: '2G Ethanol (Agri Waste)', share: '4%' }, { name: 'CBG (Biogas)', share: '3%' }, { name: 'Biodiesel', share: '1%' }] },
    challenges: [{ title: 'Feedstock Availability & Monsoon Risk', body: 'Sugarcane production is rain-dependent. Poor monsoon → lower sugarcane → lower ethanol production → blending target missed. India needs to diversify to grain and agricultural waste-based 2G ethanol to de-risk supply.' }, { title: 'Distillery Capacity Lag', body: 'Even with rapid capacity addition, distillery output will need to triple by 2030 for E20 compliance. Investment is happening but permitting and grid connectivity are bottlenecks.' }],
    opportunity: { areas: [{ title: '2G Ethanol from Stubble', desc: 'Paddy stubble burning (the cause of Delhi\'s winter smog) can be converted to ethanol. 2G plants offer a ₹10,000 Crore opportunity and solve a pollution crisis simultaneously.' }, { title: 'Compressed Biogas (CBG)', desc: 'SATAT scheme targets 5,000 CBG plants by 2025. Municipal and agricultural waste → methane-rich biogas replacing CNG.' }, { title: 'Sustainable Aviation Fuel', desc: 'Government targeting 1% SAF blend in aviation fuel by 2027. At ₹150+/litre, SAF is high-value. Indian Airlines and IndiGo signed SAF purchase agreements.' }], body: [] },
    policy: { schemes: [{ name: 'EBP (Ethanol Blending Programme)', desc: 'Government-fixed ethanol procurement price paid by OMCs. Key price discovery mechanism.' }, { name: 'SATAT Scheme', desc: '5,000 CBG plants. OMCs committed to purchase all CBG produced at ₹46/kg.' }, { name: 'National Biofuel Policy 2022', desc: 'Includes 2G, 3G biofuels, SAF, drop-in fuels. Expands feedstock basket.' }, { name: 'PM JI-VAN Yojana', desc: '₹1,969 Crore for 12 commercial and 10 demonstration 2G ethanol plants.' }], body: [] },
    future: { pullQuote: '"Every litre of ethanol in India\'s petrol tanks is a litre of crude oil India did not buy from the Middle East. By 2030, that saving will exceed $10 billion a year."', body: ['India\'s biofuel programme is on track to become one of the world\'s most successful energy transitions — not because of climate ambition, but because of farmer politics and energy security pragmatism. The economics are now self-sustaining.'] },
    startups: [{ name: 'Praj Industries', founded: '1985', focus: 'Biofuel plant design and technology', note: 'India\'s most exported engineering company in biofuels.' }, { name: 'BioFuel Circle', founded: '2016', focus: 'Agri waste to biofuel supply chain', note: 'Connects 50,000 farmers to biofuel plants.' }, { name: 'Buyofuel', founded: '2019', focus: 'B2B biofuel marketplace', note: 'Digital exchange for biodiesel, ethanol, CBG.' }],
  },

  healthcare: {
    name: 'Healthcare', tagline: 'Healing a Nation of 1.4 Billion', icon: '🏥', tag: 'Life Sciences',
    coverPhoto: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80',
    marketSize: '₹8.6 Lakh Crore', gdpShare: '3.8% of GDP', employment: '7.5 Million', growthRate: '16% CAGR',
    oneLiner: 'India is the pharmacy of the world — making 60% of the world\'s vaccines and 20% of global generic drugs — while simultaneously struggling to provide basic healthcare to 700 million citizens who have no health insurance.',
    overview: {
      body: ['India\'s healthcare sector is a study in contradictions. The country produces the world\'s cheapest generic drugs and exports them to 200 countries. Its pharmaceutical companies manufacture 60% of global vaccines. Yet India spends only 3.8% of GDP on healthcare (global average: 9.8%), and 70% of healthcare expenditure is out-of-pocket — forcing millions of families into poverty with every medical emergency.', 'The sector has five distinct industries: pharmaceuticals (India\'s global strength), hospitals (growing premium + insurance-driven segment), diagnostics (highly fragmented), medical devices (largely imported), and digital health (explosive growth post-COVID).'],
      stats: [{ label: 'Market Size', value: '₹8.6L Crore' }, { label: 'Pharma Exports', value: '$28 Billion' }, { label: 'Doctors per 1000', value: '0.7 (vs WHO: 1.0)' }, { label: 'Hospital Beds', value: '1.3 per 1000' }, { label: 'Health Insurance Coverage', value: '37%' }, { label: 'Generic Drug Share', value: '20% of Global' }],
    },
    history: {
      timeline: [{ year: '1947', event: 'Independence: 1 doctor per 17,000 people. Smallpox, cholera endemic.' }, { year: '1970', event: 'Patents Act 1970 — India allows process patents only. Generic pharma industry born.' }, { year: '1978', event: 'Cipla, Ranbaxy begin generic manufacturing. Indian pharma begins its global journey.' }, { year: '1994', event: 'TRIPS agreement — India joins WTO. Product patent compliance by 2005.' }, { year: '2005', event: 'Section 3(d) of Patents Act — India refuses "ever-greening." Pharma sovereignty preserved.' }, { year: '2018', event: 'Ayushman Bharat — world\'s largest health insurance scheme. 50 crore beneficiaries.' }, { year: '2020', event: 'COVID-19 pandemic: India produces 60% of world\'s vaccines. Serum Institute supplies 1 billion doses.' }, { year: '2024', event: 'National Health Mission, ABDM digital health ID for 500 million citizens.' }],
      body: ['India\'s pharmaceutical industry owes its global dominance to a single policy decision: the 1970 Patents Act, which allowed Indian companies to copy foreign drug molecules using different processes. This built the manufacturing expertise, regulatory compliance culture, and export orientation that made Indian pharma the world\'s largest generic drug supplier.'],
    },
    structure: { steps: [{ title: 'Pharma Manufacturing', desc: 'API (Active Pharmaceutical Ingredients) → formulation → packaging → distribution. India strong in formulations, weak in APIs (heavy China dependence).' }, { title: 'Hospitals', desc: 'Government hospitals (60% of beds, severe underfunding), private hospitals (premium but expensive), and charitable trusts. Organised chains: Apollo, Fortis, Max, Narayana.' }, { title: 'Diagnostics', desc: 'Pathology labs, imaging centres. Highly fragmented — Dr. Lal PathLabs, Metropolis, Thyrocare are organised leaders; 90,000+ small labs.' }, { title: 'Medical Devices', desc: '80% imported (stents, implants, imaging equipment). PLI scheme building domestic manufacturing.' }, { title: 'Digital Health', desc: 'Telemedicine, EMR, health-tech startups. ABDM (Ayushman Bharat Digital Mission) creating interoperable health ID infrastructure.' }], body: [] },
    keyPlayers: [{ name: 'Sun Pharma', type: 'Listed', revenue: '₹51,000 Cr', note: 'India\'s largest pharma company. 100+ countries. Specialty focus.' }, { name: 'Apollo Hospitals', type: 'Listed', revenue: '₹19,000 Cr', note: 'India\'s largest hospital chain. 73 hospitals, 10,000 doctors.' }, { name: 'Serum Institute', type: 'Private', revenue: '₹10,000 Cr', note: 'World\'s largest vaccine manufacturer. 1.5 billion doses/year capacity.' }, { name: 'Narayana Health', type: 'Listed', revenue: '₹5,000 Cr', note: 'Most affordable cardiac surgery globally. Devi Shetty\'s mission-driven model.' }, { name: 'Practo', type: 'Private', revenue: '₹500 Cr', note: 'India\'s largest doctor-patient platform. 30 million consultations/year.' }],
    market: { pullQuote: '"India can make a heart surgery cost $1,500 that costs $150,000 in the US. If we can do that at scale, we can save the world\'s healthcare system."', body: ['India\'s healthcare market is growing at 16% CAGR driven by rising insurance penetration, an ageing population, lifestyle diseases, and medical tourism. The medical tourism segment — patients coming to India for affordable surgery — generates $8 billion annually.'], segments: [{ name: 'Pharmaceuticals', share: '35%' }, { name: 'Hospitals', share: '38%' }, { name: 'Diagnostics', share: '12%' }, { name: 'Medical Devices', share: '10%' }, { name: 'Digital Health', share: '5%' }] },
    challenges: [{ title: 'Doctor & Infrastructure Shortage', body: 'India has 0.7 doctors per 1,000 people (WHO recommends 1.0). Hospital bed density: 1.3 per 1,000 (global average: 2.9). The gap is concentrated in rural India, where 70% of the population lives and 30% of doctors practice.' }, { title: 'Out-of-Pocket Expenditure', body: '63% of healthcare costs are out-of-pocket in India — one of the highest ratios globally. This makes medical emergencies the #1 cause of family debt and poverty. Ayushman Bharat covers only hospitalisation, not outpatient care.' }],
    opportunity: { areas: [{ title: 'Health Insurance Expansion', desc: 'Only 37% of Indians have any health cover. As Ayushman Bharat expands and private insurance penetrates middle class, the market will triple.' }, { title: 'Telemedicine & Digital Health', desc: 'ABDM infrastructure enables interoperable records, digital consultations, and AI-driven diagnostics. 500 million digital health IDs created.' }, { title: 'Medical Devices Manufacturing', desc: 'India imports 80% of devices. PLI for medical devices targets ₹65,000 Crore domestic production by 2025.' }], body: [] },
    policy: { schemes: [{ name: 'Ayushman Bharat PM-JAY', desc: '₹5 lakh/year hospitalisation cover for 10 crore families (50 crore people). World\'s largest health insurance scheme.' }, { name: 'ABDM', desc: 'Ayushman Bharat Digital Mission — interoperable health ID, digital records, teleconsultation platform.' }, { name: 'PLI for Pharmaceuticals', desc: '₹15,000 Crore PLI for bulk drug parks and critical KSM (Key Starting Material) manufacturing.' }, { name: 'National Medical Commission', desc: 'Replaced MCI. Standardised medical education, telemedicine guidelines, mid-level health provider framework.' }], body: [] },
    future: { pullQuote: '"India will treat more patients, train more doctors, and export more medicines in the next 20 years than it has in its entire post-independence history."', body: ['India\'s healthcare market will reach $600 billion by 2030. The twin engines: a growing middle class buying private insurance and premium care, and government expansion of Ayushman Bharat to include outpatient services and mental health.', 'The next global healthcare story will be "Made in India" — not just generic drugs, but surgical robots, AI diagnostics, and the delivery model of affordable quality care that the world will learn from Narayana Health and Apollo.'] },
    startups: [{ name: 'PharmEasy', founded: '2015', focus: 'Online pharmacy + diagnostics', note: 'Unicorn. 25 million+ customers.' }, { name: 'Pristyn Care', founded: '2018', focus: 'Tech-enabled surgical care clinics', note: 'Unicorn. 100+ day-care surgery centres.' }, { name: 'MFine', founded: '2017', focus: 'AI-first telemedicine platform', note: '1 million consultations. Hospital network integration.' }, { name: 'HealthKart', founded: '2011', focus: 'Sports nutrition and wellness D2C', note: 'MuscleBlaze, HK Vitals. ₹1,500 Cr revenue.' }],
  },
};

/* ════════════════════════════════
   PAGE COMPONENT
════════════════════════════════ */
export default function IndustryStory({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'steel';
  const industry = INDUSTRIES[slug] ?? INDUSTRIES['steel'];

  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = 'overview';
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= 180) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { sectionRefs.current[id] = el; };
  const scrollTo = (id: string) => sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const _industryUrl    = `https://profilebizz.com/industry/${slug}`;
  const _industryJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${industry.name} — ${industry.tagline} | ProfileBizz`,
    description: industry.oneLiner,
    image: industry.coverPhoto,
    url: _industryUrl,
    author: { '@type': 'Organization', name: 'ProfileBizz Editorial', url: 'https://profilebizz.com' },
    publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
    about: {
      '@type': 'Thing',
      name: industry.name,
      description: `${industry.tag} industry — market size ${industry.marketSize}`,
    },
  });

  return (
    <>
      <Helmet>
        <title>{`${industry.name} — ${industry.tagline} | ProfileBizz`}</title>
        <meta name="description" content={industry.oneLiner} />
        <link rel="canonical" href={_industryUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={_industryUrl} />
        <meta property="og:site_name" content="ProfileBizz" />
        <meta property="og:title" content={`${industry.name} — ${industry.tagline} | ProfileBizz`} />
        <meta property="og:description" content={industry.oneLiner} />
        <meta property="og:image" content={industry.coverPhoto} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@profilebizz" />
        <meta name="twitter:title" content={`${industry.name} — ${industry.tagline} | ProfileBizz`} />
        <meta name="twitter:description" content={industry.oneLiner} />
        <meta name="twitter:image" content={industry.coverPhoto} />
        <script type="application/ld+json">{_industryJsonLd}</script>
      </Helmet>
      <ProfileSeo
        slug={slug}
        title={`${industry.name} — ${industry.tagline} | ProfileBizz`}
        description={industry.oneLiner}
        canonicalUrl={_industryUrl}
        image={industry.coverPhoto}
        entityName={industry.name}
        entityType="Thing"
      />
      <SocialShareButtons
        url={_industryUrl}
        title={`${industry.name} — ${industry.tagline} | ProfileBizz`}
      />
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
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Industry Stories</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black transition-colors px-3 py-1.5 border border-gray-200 hover:border-black">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial transition-colors px-3 py-1.5">
              <BookmarkPlus className="w-3.5 h-3.5" /> Save Story
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="relative h-[380px] md:h-[480px] overflow-hidden mt-14">
        <img src={industry.coverPhoto} alt="cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent" />
        <div className="absolute top-6 left-8">
          <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">{industry.tag}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{industry.icon}</span>
          </div>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-bold leading-none mb-3">{industry.name}</h1>
          <p className="text-white/70 text-base md:text-lg italic">"{industry.tagline}"</p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex flex-wrap gap-x-10 gap-y-3 flex-1">
            {[{ l: 'Market Size', v: industry.marketSize }, { l: 'GDP Share', v: industry.gdpShare }, { l: 'Employment', v: industry.employment }, { l: 'Growth Rate', v: industry.growthRate }]
              .map(s => (
                <div key={s.l} className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{s.l}</span>
                  <span className="text-base md:text-xl font-serif font-bold text-black">{s.v}</span>
                </div>
              ))}
          </div>
          <p className="md:max-w-sm text-sm text-gray-600 leading-relaxed italic border-l-2 border-editorial pl-4">{industry.oneLiner}</p>
        </div>
      </div>

      {/* ── Industry Switcher ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 flex-shrink-0 mr-2">More Industries:</span>
          {FEATURED_INDUSTRIES.filter(i => i.slug !== slug).map(ind => (
            <a key={ind.slug} href={`/industry/${ind.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-editorial hover:text-editorial transition-colors flex-shrink-0 group">
              <span className="text-base">{ind.icon}</span>
              <span className="text-xs font-bold text-gray-700 group-hover:text-editorial">{ind.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Mobile Section Nav ── */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto">
        <div className="flex">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors
                ${activeSection === s.id ? 'border-editorial text-editorial font-semibold' : 'border-transparent text-gray-500 hover:text-black'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Sticky Sidebar */}
        <aside className="hidden lg:block lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">In This Story</p>
            <nav className="flex flex-col gap-0">
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`text-left py-2.5 px-3 text-sm font-medium border-l-2 transition-all duration-150 ${activeSection === s.id ? 'border-editorial text-editorial bg-red-50 font-semibold' : 'border-gray-200 text-gray-500 hover:text-black hover:border-black'}`}>
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Article */}
        <article className="flex-1 min-w-0 max-w-3xl">

          {/* 01 Overview */}
          <section id="overview" ref={setRef('overview')} className="mb-16 scroll-mt-24">
            <SectionLabel index="01" label="Industry Overview" />
            <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200">
              {industry.overview.stats.map((s, i) => (
                <div key={i} className="bg-white px-5 py-4">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1">{s.label}</p>
                  <p className="font-serif text-xl font-bold text-black">{s.value}</p>
                </div>
              ))}
            </div>
            {industry.overview.body.map((p, i) => <p key={i} className="font-serif text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* 02 History */}
          <section id="history" ref={setRef('history')} className="mb-16 scroll-mt-24">
            <SectionLabel index="02" label="History in India" />
            <div className="my-6 space-y-0">
              {industry.history.timeline.map((e, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${i === 0 ? 'bg-editorial' : 'bg-black'}`} />
                    {i < industry.history.timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-5">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-editorial">{e.year}</span>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{e.event}</p>
                  </div>
                </div>
              ))}
            </div>
            {industry.history.body.map((p, i) => <p key={i} className="font-serif text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* 03 How It Works */}
          <section id="structure" ref={setRef('structure')} className="mb-16 scroll-mt-24">
            <SectionLabel index="03" label="How It Works" />
            <div className="mt-6 space-y-0">
              {industry.structure.steps.map((s, i) => (
                <div key={i} className="flex gap-4 group border-b border-gray-100 last:border-0 pb-4 mb-4">
                  <div className="flex-shrink-0 w-7 h-7 bg-black group-hover:bg-editorial transition-colors flex items-center justify-center mt-0.5">
                    <span className="text-white text-[10px] font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black group-hover:text-editorial transition-colors mb-1">{s.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {industry.structure.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4 mt-4">{p}</p>)}
          </section>

          <Divider />

          {/* 04 Key Players */}
          <section id="keyplayers" ref={setRef('keyplayers')} className="mb-16 scroll-mt-24">
            <SectionLabel index="04" label="Key Players" />
            <div className="mt-6 border border-gray-200 divide-y divide-gray-100">
              <div className="grid grid-cols-4 bg-black text-white px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase">
                <span className="col-span-1">Company</span><span>Type</span><span>Revenue</span><span>Note</span>
              </div>
              {industry.keyPlayers.map((p, i) => (
                <div key={i} className="grid grid-cols-4 px-4 py-3 hover:bg-gray-50 transition-colors group items-start">
                  <span className="text-sm font-bold text-black group-hover:text-editorial col-span-1">{p.name}</span>
                  <span className="text-xs text-gray-500">{p.type}</span>
                  <span className="text-xs font-bold text-editorial">{p.revenue}</span>
                  <span className="text-xs text-gray-500 leading-snug">{p.note}</span>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* 05 Market Size */}
          <section id="market" ref={setRef('market')} className="mb-16 scroll-mt-24">
            <SectionLabel index="05" label="Market Size" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{industry.market.pullQuote}</p>
            </blockquote>
            {industry.market.body.map((p, i) => <p key={i} className="font-serif text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
            {/* Segment bars */}
            <div className="mt-6 space-y-3">
              {industry.market.segments.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">{s.name}</span>
                  <div className="flex-1 bg-gray-100 h-5 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-black group-hover:bg-editorial" style={{ width: s.share }} />
                  </div>
                  <span className="text-sm font-bold text-editorial w-10 flex-shrink-0">{s.share}</span>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* 06 Challenges */}
          <section id="challenges" ref={setRef('challenges')} className="mb-16 scroll-mt-24">
            <SectionLabel index="06" label="Challenges" />
            <div className="mt-6 space-y-6">
              {industry.challenges.map((c, i) => (
                <div key={i} className="border-l-4 border-gray-300 pl-5 py-1 hover:border-editorial transition-colors group">
                  <h4 className="text-base font-bold font-serif mb-2 group-hover:text-editorial transition-colors">{c.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* 07 Opportunities */}
          <section id="opportunity" ref={setRef('opportunity')} className="mb-16 scroll-mt-24">
            <SectionLabel index="07" label="Opportunities" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {industry.opportunity.areas.map((a, i) => (
                <div key={i} className="bg-white border border-gray-200 p-5 hover:border-black transition-colors group">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-editorial flex-shrink-0" />
                    <span className="text-sm font-bold group-hover:text-editorial transition-colors">{a.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
            {industry.opportunity.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4 mt-6">{p}</p>)}
          </section>

          <Divider />

          {/* 08 Policy */}
          <section id="policy" ref={setRef('policy')} className="mb-16 scroll-mt-24">
            <SectionLabel index="08" label="Government & Policy" />
            <div className="mt-6 border border-gray-200 divide-y divide-gray-100">
              {industry.policy.schemes.map((s, i) => (
                <div key={i} className="flex gap-5 px-5 py-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-black group-hover:bg-editorial transition-colors mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black group-hover:text-editorial transition-colors">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {industry.policy.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4 mt-6">{p}</p>)}
          </section>

          <Divider />

          {/* 09 Future */}
          <section id="future" ref={setRef('future')} className="mb-16 scroll-mt-24">
            <SectionLabel index="09" label="Future Outlook" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{industry.future.pullQuote}</p>
            </blockquote>
            {industry.future.body.map((p, i) => <p key={i} className="font-serif text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* 10 Startups */}
          <section id="startups" ref={setRef('startups')} className="mb-16 scroll-mt-24">
            <SectionLabel index="10" label="Startups to Watch" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {industry.startups.map((s, i) => (
                <div key={i} className="bg-black text-white p-5 group hover:bg-editorial transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">{s.name}</span>
                    <span className="text-[10px] font-bold tracking-wider text-white/50">Est. {s.founded}</span>
                  </div>
                  <p className="text-xs text-white/70 mb-2">{s.focus}</p>
                  <p className="text-[11px] text-white/50 italic">{s.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Back to top */}
          <div className="flex justify-center pt-4 pb-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 hover:border-editorial px-5 py-2.5">
              <ChevronLeft className="w-3.5 h-3.5 rotate-90" /> Back to Top
            </button>
          </div>
        </article>
      </div>
    </div>
    </>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-4xl font-serif font-bold text-gray-100 leading-none select-none">{index}</span>
      <h2 className="text-xl md:text-2xl font-serif font-bold text-black border-b-2 border-editorial pb-1">{label}</h2>
    </div>
  );
}
function Divider() { return <hr className="border-t border-gray-200 my-12" />; }
