import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, TrendingUp, Milestone } from 'lucide-react';

const SECTIONS = [
  { id: 'origin',      label: 'Brand Origin' },
  { id: 'founding',    label: 'Founding Story' },
  { id: 'products',    label: 'Product Evolution' },
  { id: 'marketing',   label: 'Marketing Legacy' },
  { id: 'milestones',  label: 'Key Milestones' },
  { id: 'challenges',  label: 'Challenges & Comebacks' },
  { id: 'financials',  label: 'Financial Growth' },
  { id: 'leadership',  label: 'Leadership Legacy' },
  { id: 'identity',    label: 'Brand Identity' },
  { id: 'future',      label: 'Legacy & Future' },
];

/* ─── Brand data map ─────────────────────────────── */
const BRANDS: Record<string, BrandData> = {
  amul: {
    name: 'Amul',
    tagline: 'The Taste of India',
    category: 'FMCG · Dairy',
    founded: '1946',
    headquarters: 'Anand, Gujarat',
    revenue: '₹72,000 Crore (FY24)',
    employees: '3.6 Million Farmer-Members',
    coverPhoto: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&q=80',
    oneLiner: 'Born from farmer exploitation, Amul became the world\'s largest milk cooperative — a 78-year-old brand that still makes every Indian think of butter every morning.',

    origin: {
      pullQuote: '"Amul was not born in a boardroom. It was born in the rage of farmers who were being cheated of ₹2 a litre."',
      body: [
        'In 1945, the milk farmers of Kaira district in Gujarat were at the mercy of Polson Dairy — a private contractor that paid them exploitative prices and supplied milk exclusively to the British-run Bombay Milk Scheme. The farmers were desperate. They approached Sardar Vallabhbhai Patel, who told them there was only one way out: organise.',
        'Patel sent Morarji Desai to Anand. Within days, the farmers formed the Kaira District Cooperative Milk Producers\' Union. When Polson refused to purchase their milk in protest, the farmers launched a milk strike. The strike lasted 15 days. Polson capitulated.',
        'On December 14, 1946, the Kaira Union was formally registered. Its first product: pasteurised milk delivered to Bombay. Its first employee: Tribhuvandas Patel, who would run the union for the next three decades.',
      ],
    },

    founding: {
      timeline: [
        { year: '1946', event: 'Kaira District Cooperative Milk Producers\' Union registered in Anand, Gujarat' },
        { year: '1948', event: 'First pasteurised milk plant commissioned; Bombay market supply begins' },
        { year: '1955', event: 'Dr. Verghese Kurien joins as dairy engineer — the defining hire in Amul\'s history' },
        { year: '1957', event: 'Brand name "AMUL" coined — Anand Milk Union Limited' },
        { year: '1966', event: 'Sylvester daCunha creates the Amul Girl — India\'s most enduring advertising mascot' },
        { year: '1973', event: 'Gujarat Cooperative Milk Marketing Federation (GCMMF) formed to market all Gujarat dairy cooperatives' },
      ],
      body: [
        'The transformation from a small farmers\' cooperative into a national institution happened in 1955 with the arrival of Dr. Verghese Kurien. A mechanical engineer from Michigan, Kurien had been posted to Anand reluctantly. He stayed for 50 years.',
        'Kurien\'s first breakthrough was developing a process to make milk powder and condensed milk from buffalo milk — something the global dairy industry believed was technically impossible. In 1955, Amul launched India\'s first indigenously produced milk powder. The world took notice.',
        'Under Kurien\'s leadership, Amul also became the blueprint for Operation Flood — the world\'s largest dairy development programme — which transformed India from a milk-deficient nation into the world\'s largest milk producer. Amul was the proof of concept.',
      ],
    },

    products: {
      categories: [
        { name: 'Butter', year: '1955', desc: 'The product that made Amul famous. 84% market share in organised butter category.' },
        { name: 'Cheese', year: '1959', desc: 'First processed cheese in India. Still the benchmark for affordable processed cheese.' },
        { name: 'Milk Powder', year: '1955', desc: 'Produced from buffalo milk — a global first that made Kurien\'s reputation.' },
        { name: 'Ice Cream', year: '1996', desc: 'Entered at ₹5 per cup and captured 38% of the organised ice cream market within 5 years.' },
        { name: 'UHT Milk', year: '2000', desc: 'Tetra Pak milk that extended Amul\'s reach into non-refrigerated markets.' },
        { name: 'Dark Chocolate', year: '2019', desc: 'Premium range targeting urban millennials. Grew 3x in 2 years.' },
        { name: 'Whey Protein', year: '2022', desc: 'Affordable sports nutrition. Disrupted an import-dominated ₹2,000 Cr category.' },
      ],
      body: [
        'Amul\'s product strategy has always been counter-intuitive: enter categories that seem impossible at accessible price points, build volume, then use scale to drive cost down further. The result is a brand that sells ₹22 butter and ₹500 whey protein under the same logo — and gets away with it.',
      ],
    },

    marketing: {
      pullQuote: '"The Amul Girl is not a mascot. She is India\'s conscience — commenting on everything from cricket defeats to political scandals for 58 years without ever missing a week."',
      campaigns: [
        { name: 'The Amul Girl', year: '1966–Present', desc: 'Topical outdoor hoardings created by Sylvester daCunha and artist Eustace Fernandes. Still running — the longest-running outdoor campaign in advertising history.' },
        { name: '"Utterly Butterly Delicious"', year: '1967', desc: 'The jingle that became India\'s most remembered food advertising line. Written in a single afternoon, it has never needed updating.' },
        { name: 'Taste of India', year: '1994', desc: 'Repositioning campaign that moved Amul from a regional cooperative to a national emotion.' },
        { name: 'Amul Doodh Peeta Hai India', year: '2000s', desc: 'Sachin Tendulkar-endorsed campaign that placed Amul at the heart of India\'s sporting ambitions.' },
      ],
    },

    milestones: [
      { year: '1946', event: 'Cooperative founded. 247 farmer members, 2 villages.' },
      { year: '1955', event: 'Buffalo milk powder — a global first. Kurien joins.' },
      { year: '1966', event: 'Amul Girl born. India\'s longest-running ad campaign begins.' },
      { year: '1970', event: 'Operation Flood launched. India begins its dairy revolution.' },
      { year: '1994', event: 'Revenue crosses ₹1,000 Crore.' },
      { year: '2001', event: 'India becomes world\'s largest milk producer.' },
      { year: '2014', event: 'Revenue crosses ₹20,000 Crore.' },
      { year: '2022', event: 'First Indian dairy brand to cross ₹60,000 Crore revenue.' },
      { year: '2024', event: 'Revenue ₹72,000 Crore. Exports to 50+ countries.' },
    ],

    challenges: [
      { title: 'The 1974 Drought — When the Cows Ran Dry', body: 'A severe drought across Gujarat in 1974 caused a 40% drop in milk procurement. Amul\'s response: pay farmers above-market prices to retain their loyalty, and absorb losses at the federation level. It worked. Not a single farmer left the cooperative.' },
      { title: 'MNC Invasion of the 1990s', body: 'When India liberalised in 1991, Nestlé, Danone, and Kraft entered the dairy space with premium positioning and aggressive marketing. Amul responded not by going premium, but by expanding aggressively into rural retail. By 1999, Amul had the deepest last-mile distribution of any FMCG brand in India.' },
      { title: 'E-Commerce Era — Selling Perishables Online', body: 'The pandemic forced Amul to build a direct-to-consumer logistics capability almost overnight. In 2020, Amul\'s online sales grew 300%. It launched subscription milk delivery in 40 cities within 90 days — a supply chain engineering feat for a 74-year-old cooperative.' },
    ],

    financials: {
      stats: [
        { label: 'Revenue FY24', value: '₹72,000 Cr' },
        { label: 'Farmer Members', value: '36 Lakh+' },
        { label: 'Villages Covered', value: '18,600+' },
        { label: 'Countries Exported To', value: '50+' },
        { label: 'Daily Milk Processing', value: '350 Lakh Litres' },
        { label: 'Products', value: '100+' },
      ],
      body: [
        'Amul has grown at a CAGR of 18% over the last decade — faster than most listed FMCG companies — while remaining a cooperative. No private equity. No IPO. No outside shareholders. Every rupee of surplus goes back to the 36 lakh farmer-members.',
        'In FY24, Amul\'s revenue of ₹72,000 Crore made it larger than most listed dairy companies in the world by revenue. Its operating model — asset-light federation of cooperatives — remains one of the most studied in global business schools.',
      ],
    },

    leadership: {
      leaders: [
        { name: 'Tribhuvandas Patel', period: '1946–1973', role: 'Founding Chairman', desc: 'The farmer who gave Kurien his first job. Patel\'s belief in farmer self-governance created the political foundation for everything Amul became.' },
        { name: 'Dr. Verghese Kurien', period: '1949–2006', role: 'Founder & Managing Director, GCMMF', desc: '"The Milkman of India." Built Operation Flood, won the World Food Prize, and turned a district cooperative into a national symbol. His autobiography: "I Too Had a Dream."' },
        { name: 'B.M. Vyas', period: '1994–2010', role: 'MD, GCMMF', desc: 'Led Amul\'s aggressive national expansion, launched Ice Cream, and quadrupled revenue during his tenure.' },
        { name: 'R.S. Sodhi', period: '2010–2022', role: 'MD, GCMMF', desc: 'Built Amul\'s digital and e-commerce capabilities, drove international expansion, and navigated COVID-19 with zero supply disruption.' },
      ],
    },

    identity: {
      pullQuote: '"Amul is not a brand. It is an argument — that farmers deserve to be shareholders, not suppliers."',
      elements: [
        { name: 'The Amul Girl', desc: 'A chubby, mischievous girl in a polka-dot dress and hair band. Drawn by Eustace Fernandes in 1966. Unchanged for 58 years. She comments on every major Indian news event within 48 hours.' },
        { name: 'Red & White', desc: 'Amul\'s primary palette — red for energy and dairy warmth, white for purity and milk. Applied identically from butter packs to billboards for 70 years.' },
        { name: '"Utterly Butterly"', desc: 'The 1967 jingle that has never been retired. It is the most hummed food advertising line in India\'s history.' },
        { name: 'The Cooperative Story', desc: 'Every piece of Amul communication — from pack copy to ads — carries the implicit message that buying Amul helps 36 lakh farmers. No other brand has turned its supply chain into its strongest emotional asset.' },
      ],
    },

    future: {
      body: [
        'Amul\'s next chapter is being written across three frontiers: international expansion (US, UK, Australia, Middle East), premium categories (A2 milk, organic dairy, high-protein products), and digital-first retail (own delivery app, subscription milk in 60 cities by 2026).',
        'The deeper question is succession — not of individuals, but of the cooperative model itself. In a world where every successful consumer brand eventually faces pressure to go public, Amul has consistently resisted. The cooperative structure is not a legacy constraint — it is the brand\'s core identity.',
        'As R.S. Sodhi once said: "The day Amul has a private shareholder, the Amul Girl will have nothing left to smile about." The next generation of farmer-members — 36 lakh of them — will decide whether that remains true.',
      ],
    },
  },

  parle: {
    name: 'Parle', tagline: 'G for Genius', category: 'FMCG · Biscuits & Confectionery', founded: '1929',
    headquarters: 'Vile Parle, Mumbai', revenue: '₹16,000 Crore (FY24)', employees: '1,00,000+',
    coverPhoto: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&q=80',
    oneLiner: 'The biscuit that fed a nation — Parle-G is the world\'s largest-selling biscuit, with 100 crore biscuits sold every day, still at ₹5 a pack.',
    origin: {
      pullQuote: '"Parle-G was not designed for India\'s middle class. It was designed for people who had nothing else."',
      body: [
        'In 1929, the Chauhan family set up a small confectionery factory in the Mumbai suburb of Vile Parle. Their first product was a glucose biscuit they priced lower than any competitor — a deliberate choice to reach India\'s poorest. That biscuit, named Parle Gluco, later became Parle-G.',
        'Through Partition, drought, two wars, and multiple recessions, Parle-G remained the one food product that never went out of stock. Railway stations, army canteens, relief camps, and school mid-day meal programmes — all ran on Parle-G. It became the biscuit that India reached for when nothing else was available.',
        'The brand\'s genius was its refusal to raise prices despite inflation. For decades, Parle held the ₹5 price point by shrinking pack weight rather than raising the MRP — a move that competitors mocked and economists studied. Parle-G maintained 70%+ market share in glucose biscuits for 50 continuous years.',
      ],
    },
    founding: {
      timeline: [
        { year: '1929', event: 'Parle Products founded in Vile Parle, Bombay by Mohanlal Dayal Chauhan' },
        { year: '1938', event: 'First biscuit plant commissioned — Parle Gluco biscuit launched' },
        { year: '1947', event: 'Post-independence boom — Parle becomes the biscuit of the new India' },
        { year: '1982', event: 'Brand renamed Parle-G — the "G" officially stands for Glucose (and Genius in later campaigns)' },
        { year: '1994', event: 'Revenue crosses ₹100 Crore. India\'s largest biscuit company.' },
        { year: '2003', event: 'Parle-G declared world\'s largest-selling biscuit by Nielsen — outsells Oreo globally by volume' },
      ],
      body: [
        'The Chauhan family ran Parle as a tightly held private company for 90+ years — no IPO, no PE investors, no outside shareholders. This financial conservatism gave them the freedom to make decisions that no listed company could: hold prices at ₹5 for a decade while absorbing input cost inflation.',
        'The brand\'s second act began in the 2000s when Parle launched Monaco, KrackJack, Hide & Seek, and Melody — building a portfolio beyond glucose biscuits. But Parle-G remained 60% of revenue. The challenge for the next generation is building the portfolio without cannibalising the icon.',
      ],
    },
    products: {
      categories: [
        { name: 'Parle-G', year: '1938', desc: 'World\'s largest-selling biscuit by volume. 100 crore biscuits sold daily. 70%+ market share in glucose biscuits.' },
        { name: 'Monaco', year: '1960', desc: 'India\'s original salted cracker. 60+ years of uninterrupted market leadership in the salted biscuit category.' },
        { name: 'KrackJack', year: '1972', desc: 'Sweet-and-salty biscuit — a category Parle invented. 50 lakh packs sold daily.' },
        { name: 'Hide & Seek', year: '1996', desc: 'Chocolate chip cookie that challenged Britannia Good Day. Became India\'s #2 premium cookie brand.' },
        { name: 'Melody', year: '1994', desc: 'Toffee with chocolate centre. "Melody itni chocolatey kyun hai?" — one of India\'s most quoted ad lines.' },
        { name: 'Parle Agro (Frooti)', year: '1985', desc: 'Sister company distributes Frooti — India\'s #1 mango drink. Separate entity, same family.' },
      ],
      body: [
        'Parle\'s product strategy has always been mass-market dominance at affordable price points. The company has consistently avoided the premium segment — believing that India\'s 70 crore consumers in Tier 2 and below are a larger prize than urban premiumisation.',
      ],
    },
    marketing: {
      pullQuote: '"Parle-G did not need advertising for 50 years. Hunger was its campaign."',
      campaigns: [
        { name: 'G for Genius', year: '2000s', desc: 'Repositioned the "G" from Glucose to Genius — targeting students and aspirational families. Changed how a commodity biscuit was perceived.' },
        { name: 'Meri Zindagi ka Hissa', year: '2013', desc: 'Nostalgia campaign showing Parle-G across generations — grandmother to grandchild. One of India\'s highest-recalled FMCG ads of the 2010s.' },
        { name: 'COVID Relief 2020', year: '2020', desc: 'Parle donated 2.5 crore Parle-G packs during lockdown — the most visible FMCG CSR moment of COVID-era India.' },
      ],
    },
    milestones: [
      { year: '1929', event: 'Founded in Vile Parle, Mumbai.' },
      { year: '1938', event: 'Parle Gluco biscuit launched — India\'s first mass-market biscuit.' },
      { year: '1947', event: 'Post-Independence — the biscuit of the new Indian middle class.' },
      { year: '1982', event: 'Renamed Parle-G. Distribution expands to 6 lakh retail outlets.' },
      { year: '2003', event: 'Declared world\'s largest-selling biscuit by Nielsen.' },
      { year: '2020', event: 'COVID lockdown: Parle\'s best-ever sales quarter. 2.5 Cr packs donated.' },
      { year: '2024', event: 'Revenue ₹16,000 Crore. Present in 80 countries.' },
    ],
    challenges: [
      { title: 'The ₹5 Price Point vs. Input Costs', body: 'Wheat, sugar, and palm oil prices have tripled since 2005. Parle has shrunk pack weight four times rather than raise the ₹5 MRP. In 2022, Parle threatened to discontinue the ₹5 pack — a media storm followed. They backed down. The math of the ₹5 biscuit is increasingly impossible.' },
      { title: 'Britannia\'s Premium Push', body: 'As India\'s middle class grows, Britannia has taken the premium biscuit market with Good Day, NutriChoice, and Milk Bikis. Parle\'s portfolio, built for mass access, has struggled to follow consumers up the income ladder.' },
      { title: 'Quick Commerce Disruption', body: 'Parle\'s 6 lakh stockist-retailer network is the most efficient last-mile FMCG distribution in India. Quick commerce (Blinkit, Zepto) bypasses this network entirely. Parle is navigating how to participate without cannibalising its traditional channel.' },
    ],
    financials: {
      stats: [
        { label: 'Revenue FY24', value: '₹16,000 Cr' },
        { label: 'Parle-G Daily Sales', value: '100 Cr Biscuits' },
        { label: 'Market Share (Glucose)', value: '70%+' },
        { label: 'Countries Present', value: '80+' },
        { label: 'Retail Outlets', value: '6 Lakh+' },
        { label: 'Manufacturing Plants', value: '140+' },
      ],
      body: [
        'Parle Products has never listed on a stock exchange and never disclosed detailed financials publicly. Revenue estimates are based on industry analysis. The Chauhan family controls 100% of the company — making it one of the largest unlisted FMCG companies in the world.',
        'With 140+ manufacturing plants and 6 lakh retail touchpoints, Parle has the widest FMCG distribution network in India — wider even than HUL in rural biscuits. This distribution moat is its most durable competitive advantage.',
      ],
    },
    leadership: {
      leaders: [
        { name: 'Mohanlal Dayal Chauhan', period: '1929–1960s', role: 'Founder', desc: 'Set up the original confectionery plant in Vile Parle. His insistence on affordable pricing defined Parle\'s DNA for 95 years.' },
        { name: 'Vijay Chauhan', period: '1990s–Present', role: 'Chairman', desc: 'Scaled Parle from ₹500 Crore to ₹16,000 Crore. Led the "G for Genius" repositioning. Famously private — has never given a press interview.' },
        { name: 'Mayank Shah', period: '2010s–Present', role: 'Senior Category Head', desc: 'The public face of Parle in media interactions. Has navigated the ₹5 price point debate and the COVID-era supply chain.' },
      ],
    },
    identity: {
      pullQuote: '"There is no brand in India more democratic than Parle-G. A labourer\'s child and the Prime Minister grew up eating the same biscuit."',
      elements: [
        { name: 'The Yellow Pack', desc: 'Bright yellow wrapper with the Parle-G girl since the 1960s. The most recognised FMCG pack in India — identifiable even when partially visible.' },
        { name: 'The Parle-G Girl', desc: 'The chubby-cheeked girl on the pack has never been officially named. She has been called everything from "Gunjan" to simply "the Parle girl." No one knows who she is. Everyone recognises her.' },
        { name: 'The ₹5 Price Point', desc: 'More than a price — it is a social contract. Parle has held this price for decades. It signals that Parle-G is for all of India, not just those who can afford more.' },
        { name: 'Glucose + Genius', desc: 'The dual meaning of "G" — glucose for energy, genius for aspiration — makes Parle-G both a functional product and an emotional one. A biscuit that wants the best for you.' },
      ],
    },
    future: {
      body: [
        'Parle\'s future is a story of two tensions: price vs. premiumisation, and mass vs. digital. The company must find a way to grow its ₹16,000 Crore revenue while the ₹5 Parle-G — its largest product — is under structural margin pressure.',
        'The opportunity lies in the portfolio. Hide & Seek, Monaco, and KrackJack have significant headroom in Tier 2 and Tier 3 markets. A selective premiumisation strategy, without abandoning the mass market, is the path.',
        'The Chauhan family\'s 95-year commitment to staying private is the company\'s greatest strength and its greatest constraint. Capital for innovation, acquisitions, and global expansion will eventually require external funding. When it comes — if it comes — it will be the most-watched FMCG deal in Indian history.',
      ],
    },
  },

  haldiram: {
    name: "Haldiram's", tagline: 'The Taste of Tradition', category: 'Food · Snacks & Sweets', founded: '1937',
    headquarters: 'Nagpur & New Delhi', revenue: '₹12,000 Crore (FY24)', employees: '15,000+',
    coverPhoto: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=200&q=80',
    oneLiner: "From a small bhujia shop in Bikaner to a ₹12,000 Crore global snack empire — Haldiram's is proof that Indian street food can become a world-class brand.",
    origin: {
      pullQuote: '"Ganga Bhishen Agarwal didn\'t want to build a brand. He just wanted to make better bhujia than his relatives."',
      body: [
        "In 1937, Ganga Bhishen Agarwal — later nicknamed Haldiram — worked at his father's sweet shop in Bikaner, Rajasthan. Unhappy with the quality of bhujia being sold, he developed a thinner, crispier recipe using a different ratio of moth lentils and spices. It became the most talked-about bhujia in Bikaner.",
        "Haldiram eventually opened his own shop. Within years, it became the go-to destination for Bikaner's famous bhujia. The real transformation came in the 1970s when the family split into three branches — Nagpur, Delhi, and Kolkata — each taking Haldiram's into a different market with different strategies.",
        "The Nagpur branch industrialised production and built a national packaged snacks empire. The Delhi branch built large-format restaurants and premium packaged foods. Together, they made Haldiram's the dominant Indian snack brand before any Western brand could establish itself.",
      ],
    },
    founding: {
      timeline: [
        { year: '1937', event: "Ganga Bhishen Agarwal opens first Haldiram's shop in Bikaner with his improved bhujia recipe" },
        { year: '1941', event: 'Second shop opened. Bikaner bhujia becomes a regional landmark.' },
        { year: '1970', event: 'Family splits across three cities — Nagpur, Delhi, Kolkata — three independent branches created' },
        { year: '1983', event: 'Nagpur branch launches packaged snacks for modern retail — one of India\'s first food companies to do so' },
        { year: '2000', event: 'Revenue crosses ₹1,000 Crore. Pan-India distribution established.' },
        { year: '2015', event: "Haldiram's overtakes PepsiCo's Frito-Lay to become India's largest snack company by revenue" },
      ],
      body: [
        "The three-branch structure has been Haldiram's greatest strength and its most complex legal challenge. The Nagpur branch (Haldiram Snacks Pvt Ltd) and Delhi branch (Haldiram Foods International) have operated under the same brand name but as completely separate legal entities for 50 years.",
        "A series of legal disputes in the 2000s was settled through court-negotiated market boundaries — Nagpur operates in South/West/East India, Delhi in North India. The brand's coherence despite this structural split is a testament to the power of the original recipe.",
      ],
    },
    products: {
      categories: [
        { name: 'Bhujia', year: '1937', desc: "The original product. Haldiram's Bhujia commands 45% of India's organised namkeen market." },
        { name: 'Namkeen Range', year: '1980', desc: 'Aloo Bhujia, Mixture, Moong Dal, Chana Dal — 150+ SKUs across the namkeen category.' },
        { name: 'Sweets & Mithai', year: '1970', desc: 'Soan Papdi, Rasgulla, Gulab Jamun in sealed packs — Haldiram invented the packaged mithai category.' },
        { name: 'Ready-to-Eat Meals', year: '2005', desc: 'Dal Makhani, Palak Paneer, Biryani in retort pouches. Exported to Indian diaspora globally.' },
        { name: 'Frozen Foods', year: '2010', desc: 'Samosas, parathas, tikkas — frozen Indian food for modern retail and export markets.' },
        { name: 'Restaurants', year: '1988', desc: "200+ Haldiram's restaurants across India. Serve 3 lakh customers daily." },
      ],
      body: [
        "Haldiram's product genius is that every product is an authenticity story. The bhujia tastes like Bikaner. The soan papdi tastes like a halwai made it. This authenticity premium is why Haldiram's commands 30–40% more than private-label competitors.",
      ],
    },
    marketing: {
      pullQuote: '"Haldiram\'s spent almost nothing on advertising for 70 years. Its marketing is the product itself."',
      campaigns: [
        { name: 'Zero Advertising Strategy', year: '1937–2010', desc: "For 73 years, Haldiram's relied entirely on word-of-mouth, trade relationships, and product quality for marketing." },
        { name: 'Festival Gifting Positioning', year: '1990s', desc: "Haldiram's sweet boxes became India's default Diwali gift — a positioning achieved with zero mass advertising." },
        { name: 'Airport & Premium Retail Entry', year: '2010s', desc: "Entering airport retail and premium supermarkets repositioned Haldiram's from street food to a gifting brand." },
      ],
    },
    milestones: [
      { year: '1937', event: "Original bhujia shop opens in Bikaner." },
      { year: '1970', event: "Three-city split — Nagpur, Delhi, Kolkata branches established." },
      { year: '1983', event: "Nagpur branch launches packaged retail products." },
      { year: '2000', event: "₹1,000 Crore revenue. Pan-India distribution." },
      { year: '2015', event: "Overtakes Frito-Lay to become India's #1 snack company." },
      { year: '2022', event: "PE investors (Temasek, Blackstone) in talks at ₹70,000 Crore valuation." },
      { year: '2024', event: "Revenue ₹12,000 Crore. Present in 80+ countries." },
    ],
    challenges: [
      { title: 'Brand Name Legal Battle', body: "The three-branch structure meant 50 years of legal disputes over who could use the Haldiram's name where. Court-mandated geographical territories have kept the peace, but pan-India consolidation — needed to attract institutional capital or list on stock exchange — requires resolving this fundamental structural issue." },
      { title: 'Health & Clean Label Pressure', body: "Indian consumers increasingly want 'clean label' — no MSG, natural ingredients, transparent sourcing. Haldiram's traditional recipes use some ingredients that health-conscious consumers reject. Reformulating without losing the original taste is the product challenge of this decade." },
      { title: 'D2C Snack Brand Competition', body: "A wave of VC-backed snack startups (Too Yumm, Slurrp Farm, Yoga Bar) is targeting the premium-health segment. While Haldiram's dominant distribution gives it protection in mass market, the brand has been slow to respond to health trends." },
    ],
    financials: {
      stats: [
        { label: 'Revenue FY24', value: '₹12,000 Cr' },
        { label: 'Brand Valuation', value: '₹70,000+ Cr' },
        { label: 'Countries Exported To', value: '80+' },
        { label: 'Restaurants', value: '200+' },
        { label: 'Daily Customers', value: '3 Lakh+' },
        { label: 'SKUs', value: '400+' },
      ],
      body: [
        "Haldiram's combined revenue across all branches is estimated at ₹12,000 Crore — larger than most listed FMCG companies in India. In 2022, investors including Temasek and Blackstone valued the brand at ₹70,000+ Crore during preliminary stake sale discussions.",
        "The company has historically been extremely private about financials. The PE interest has forced some transparency, but the family has been reluctant to dilute control.",
      ],
    },
    leadership: {
      leaders: [
        { name: "Ganga Bhishen 'Haldiram' Agarwal", period: '1937–1984', role: 'Founder', desc: "Created the bhujia recipe that became a ₹70,000 Crore brand. Never sought scale — his children built the empire." },
        { name: 'Shivkisan Agarwal', period: '1970–2000s', role: 'MD, Nagpur Branch', desc: "Industrialised Haldiram's production and built the packaged snacks business. The architect of the modern Haldiram's." },
        { name: 'Manohar Lal Agarwal', period: '1970–2000s', role: 'MD, Delhi Branch', desc: "Built the Delhi restaurant empire and North India packaged business. Pioneered the Haldiram's restaurant format." },
        { name: 'Madhav Agarwal', period: '2010s–Present', role: 'Next-Gen Leader', desc: "Third generation. Driving premiumisation, international expansion, and PE investor conversations." },
      ],
    },
    identity: {
      pullQuote: '"Haldiram\'s is not a snack. It is a smell — the smell of arriving at someone\'s home in India."',
      elements: [
        { name: 'The Red and Yellow Pack', desc: "Haldiram's packaging has barely changed in 40 years. The red-yellow colour scheme signals tradition, warmth, and celebration." },
        { name: 'The Diwali Box', desc: "Haldiram's sweet assortment box is India's most gifted Diwali present — a brand position achieved entirely through product excellence." },
        { name: 'Bikaner Provenance', desc: "Every Haldiram's product carries the implicit stamp of Bikaner — a city synonymous with the finest Indian namkeen." },
        { name: 'Authenticity Promise', desc: "Unlike Western snack brands that localise Indian flavours, Haldiram's is the original. Every competitor is an imitation — and that cannot be replicated." },
      ],
    },
    future: {
      body: [
        "Haldiram's next decade will be defined by two decisions: whether to accept institutional capital (and the governance it requires), and how to build a premium-health portfolio without alienating its traditional consumer.",
        "The international opportunity is enormous — 35 million Indian diaspora in the US, UK, Australia, and the Gulf actively seek Haldiram's products. The Nagpur branch already exports to 80 countries. A focused D2C international strategy could add ₹3,000 Crore in revenue within 5 years.",
        "The risk is losing the soul in pursuit of scale. Haldiram's greatest asset is that it still tastes exactly like Ganga Bhishen's original recipe from 1937. That is remarkably hard to preserve when you are a ₹70,000 Crore brand.",
      ],
    },
  },

  tata: {
    name: 'Tata Group', tagline: 'Leadership with Trust', category: 'Conglomerate · 100+ Businesses', founded: '1868',
    headquarters: 'Bombay House, Mumbai', revenue: '₹15 Lakh Crore (FY24)', employees: '10 Lakh+',
    coverPhoto: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80',
    oneLiner: 'India\'s most trusted business group — a 156-year-old conglomerate that built the nation\'s first steel plant, airline, and luxury hotel chain, and now leads in EVs, semiconductors, and defence manufacturing.',
    origin: {
      pullQuote: '"What advances a nation or a community is not so much to prop up its weakest members as to lift up the best and most gifted." — Jamsetji Tata',
      body: [
        'In 1868, Jamsetji Nusserwanji Tata, a 29-year-old Parsi trader, started a trading company in Mumbai. His ambition from day one was not trade — it was industry. He believed India could manufacture anything the British Empire was importing.',
        'Jamsetji\'s three great industrial dreams defined Tata: a world-class steel plant (to make India industrially independent), a luxury hotel (to prove Indians could match the finest in the world), and a hydroelectric power company. He lived to see only the hotel — the Taj Mahal Palace, opened in 1903.',
        'The Tata Group has since grown into 100+ companies across 100+ countries, employing over 10 lakh people. It remains majority-owned by Tata Trusts — philanthropic foundations holding 66% of Tata Sons — making it the world\'s largest philanthropically-owned conglomerate.',
      ],
    },
    founding: {
      timeline: [
        { year: '1868', event: 'Jamsetji Tata establishes trading company in Bombay' },
        { year: '1903', event: 'Taj Mahal Palace Hotel opens in Mumbai — India\'s first luxury hotel' },
        { year: '1907', event: 'Tata Iron and Steel Company (TISCO) commissioned in Jamshedpur — India\'s first modern steel plant' },
        { year: '1932', event: 'Tata Airlines founded — India\'s first commercial airline (later nationalised as Air India)' },
        { year: '1945', event: 'Tata Motors (TELCO) founded — India\'s first commercial vehicle manufacturer' },
        { year: '1968', event: 'Tata Consultancy Services (TCS) founded — India\'s first IT services company' },
        { year: '2007', event: 'Tata Steel acquires Corus (UK) for $12.9 Billion — India\'s largest overseas acquisition at the time' },
        { year: '2008', event: 'Tata Motors acquires Jaguar Land Rover for $2.3 Billion from Ford' },
        { year: '2022', event: 'Tata Sons wins Air India bid — airline returns to Tata family after 70 years' },
      ],
      body: [
        'Each Tata chairman has added a new dimension to the group. Jamsetji built the industrial foundation. J.R.D. Tata (1938–1991) built aviation and TCS. Ratan Tata (1991–2012) took Tata global with JLR, Corus, and Tetley. N. Chandrasekaran (2017–present) is future-proofing the group with semiconductors, EVs, and AI.',
      ],
    },
    products: {
      categories: [
        { name: 'TCS (IT Services)', year: '1968', desc: 'India\'s largest company by market cap. Revenue $29 Billion. Serves 80%+ of Fortune 500 companies.' },
        { name: 'Tata Steel', year: '1907', desc: 'India\'s oldest and one of the world\'s most geographically diversified steel companies.' },
        { name: 'Tata Motors / JLR', year: '1945', desc: 'Makes everything from the Tata Ace mini truck to Range Rover Velar — world\'s widest auto portfolio under one group.' },
        { name: 'Titan (Watches & Jewellery)', year: '1984', desc: 'Tanishq is India\'s largest jewellery brand. Titan is India\'s watch market leader for 4 decades.' },
        { name: 'Taj Hotels', year: '1903', desc: 'India\'s most prestigious hotel brand. 100+ properties across 13 countries.' },
        { name: 'Air India', year: '2022', desc: 'National carrier reacquired by Tata. Full transformation with ₹20,000 Cr fleet investment underway.' },
      ],
      body: [
        'The Tata Group\'s breadth is unlike any other Indian conglomerate — operating in sectors as different as aerospace and jewellery, software and salt. The common thread is not the business type but the brand — Tata\'s reputation for integrity gives every new business a head start that competitors cannot buy.',
      ],
    },
    marketing: {
      pullQuote: '"Tata has never needed to advertise trust. 156 years of consistent behaviour is its campaign."',
      campaigns: [
        { name: 'Tata Tea "Jaago Re"', year: '2007–Present', desc: 'India\'s most awarded social campaign — using tea as a metaphor for civic awakening. First brand to use awareness as its primary marketing platform.' },
        { name: '"We also make steel"', year: '2009', desc: 'Post-JLR acquisition campaign — restoring faith after Tata bought a British car brand. Brilliant in its understatement.' },
        { name: 'Air India Rebrand', year: '2023', desc: 'Complete rebrand of Air India — new livery, uniform, service culture. The most-watched airline transformation in Indian history.' },
      ],
    },
    milestones: [
      { year: '1868', event: 'Trading company founded by Jamsetji Tata.' },
      { year: '1903', event: 'Taj Mahal Palace opens — India\'s first luxury hotel.' },
      { year: '1907', event: 'Tata Steel commissioned — India\'s first modern steel plant.' },
      { year: '1932', event: 'Tata Airlines — India\'s first commercial airline.' },
      { year: '1968', event: 'TCS founded — India\'s IT revolution begins.' },
      { year: '2008', event: 'Jaguar Land Rover acquired from Ford for $2.3 Billion.' },
      { year: '2022', event: 'Air India reacquired. Tata completes 154 years.' },
      { year: '2024', event: 'Revenue ₹15 Lakh Crore. TCS is world\'s 2nd largest IT company.' },
    ],
    challenges: [
      { title: "JLR's EV Transition Cost", body: 'Jaguar Land Rover is investing £15 Billion to go all-electric by 2030. JLR\'s profitability, restored after a long struggle post-acquisition, is again under pressure from the EV investment cycle. This is Tata Motors\' biggest capital allocation challenge.' },
      { title: 'Air India Cultural Transformation', body: 'Air India was a chronically loss-making airline with an aging fleet and demoralised staff when Tata acquired it. The fleet investment is on track, but converting a government mindset into a commercial service culture is the harder, longer battle.' },
      { title: 'Group Coherence at Scale', body: 'Managing 100+ companies across 100+ countries requires exceptional governance. Tata Sons acts as the holding company, but each operating company has its own board and management — ensuring brand consistency and capital efficiency at this scale is a permanent leadership challenge.' },
    ],
    financials: {
      stats: [
        { label: 'Group Revenue FY24', value: '₹15L Crore' },
        { label: 'TCS Market Cap', value: '₹14L Crore' },
        { label: 'Employees Worldwide', value: '10 Lakh+' },
        { label: 'Countries', value: '100+' },
        { label: 'Group Companies', value: '100+' },
        { label: 'Trust-Held Stake', value: '66% by Trusts' },
      ],
      body: [
        'Tata Sons, the holding company, is 66% owned by Tata Trusts — philanthropic foundations that fund education, healthcare, and science across India. This means two-thirds of Tata\'s profits eventually flow to public good — a structure unique among the world\'s large corporations.',
        'TCS alone accounts for 60% of Tata Sons\' income and is India\'s most valuable listed company. The rest of the group collectively represents one of the most diverse revenue streams in global business.',
      ],
    },
    leadership: {
      leaders: [
        { name: 'Jamsetji Tata', period: '1868–1904', role: 'Founder', desc: '"The father of Indian industry." Envisioned steel, aviation, and power for India 40 years before independence. Died before seeing any of his three great projects completed.' },
        { name: 'J.R.D. Tata', period: '1938–1991', role: 'Chairman (53 Years)', desc: 'The longest-serving chairman. Built TCS, expanded Tata globally, earned the Bharat Ratna. The man who made Tata a modern corporation.' },
        { name: 'Ratan Tata', period: '1991–2012', role: 'Chairman', desc: 'Acquired Jaguar Land Rover, Corus, Tetley. Made Tata a global brand. Beloved for humility and philanthropy until his passing in October 2024.' },
        { name: 'N. Chandrasekaran', period: '2017–Present', role: 'Chairman, Tata Sons', desc: 'Former TCS CEO. Driving the semiconductor, EV battery gigafactory, and digital transformation of the entire group.' },
      ],
    },
    identity: {
      pullQuote: '"Ask any Indian to name a company they trust without thinking, and most will say Tata. That brand equity took 156 years to build."',
      elements: [
        { name: 'Tata Blue', desc: 'The Tata wordmark in deep blue — one of India\'s most recognised brand identities. Applied across companies as different as Tata Steel and Taj Hotels with identical reverence.' },
        { name: 'The Bombay House Legacy', desc: 'Tata\'s Mumbai headquarters since 1924. Every major decision — from JLR acquisition to Air India bid — has been made here. It is as much a symbol as it is an office.' },
        { name: 'The Trust Narrative', desc: '"Leadership with Trust" is not a tagline — it is a 156-year history of keeping promises even at commercial cost. That story travels across the world.' },
        { name: 'Philanthropic DNA', desc: '66% of Tata Sons is owned by charitable trusts. In every crisis — floods, pandemics — Tata is among the first to respond. This philanthropy is not CSR; it is the structure of the company.' },
      ],
    },
    future: {
      body: [
        'Tata\'s next decade is defined by four bets: Air India (aviation turnaround), semiconductors (Dholera chip fab with Powerchip Taiwan), EV batteries (Agratas gigafactory in UK and India), and defence manufacturing (Tata Advanced Systems C-295 aircraft).',
        'The semiconductor play is most significant. India has never manufactured chips. If Tata\'s fab in Dholera succeeds, it will change India\'s technology self-sufficiency more fundamentally than any other single investment in Indian industrial history.',
        'Ratan Tata passed away in October 2024. His legacy — a global, trusted, philanthropic Indian conglomerate — is both Tata\'s greatest asset and its most demanding standard. N. Chandrasekaran must grow the business while preserving the soul.',
      ],
    },
  },

  mahindra: {
    name: 'Mahindra Group', tagline: 'Rise', category: 'Auto · Technology · Agriculture', founded: '1945',
    headquarters: 'Mahindra Towers, Mumbai', revenue: '₹1.4 Lakh Crore (FY24)', employees: '2.5 Lakh+',
    coverPhoto: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=80',
    oneLiner: "From selling US-licensed Willys Jeeps in 1945 to building India's best-selling SUVs and the world's largest tractor company — Mahindra's 79-year journey is India's manufacturing ambition in motion.",
    origin: {
      pullQuote: '"Mahindra was born to serve a newly independent India that needed tractors for its fields and vehicles for its roads."',
      body: [
        "In 1945, brothers J.C. Mahindra and K.C. Mahindra partnered with Ghulam Mohammed to set up Mahindra & Mohammed — a steel trading company in Bombay. The founding purpose: obtain a license to assemble Willys Jeeps for India's military and civil administration.",
        "When Ghulam Mohammed left for Pakistan at Partition in 1947, the company became Mahindra & Mahindra. Jeep assembly began in 1947 — and the product became a legend. The MM540, launched in 1954, was the first fully Indian-assembled Jeep. It became the vehicle of choice for India's Army, forest departments, district collectors, and farmers.",
        "The Mahindra Jeep's durability in India's worst terrain created the brand's foundational identity: unbreakable, rugged, made for Indian conditions. This identity — later expressed as 'Rise' — has driven every Mahindra product from tractors to electric SUVs.",
      ],
    },
    founding: {
      timeline: [
        { year: '1945', event: 'Mahindra & Mohammed founded in Bombay to assemble Willys Jeeps' },
        { year: '1947', event: 'Company renamed Mahindra & Mahindra after Partition. Jeep assembly begins.' },
        { year: '1963', event: 'Mahindra Tractors division launched — targeting India\'s post-Green Revolution farming boom' },
        { year: '1997', event: 'Scorpio project begins — Mahindra\'s first ground-up SUV design' },
        { year: '2002', event: 'Scorpio launches — transforms Mahindra from utility vehicle maker to SUV brand' },
        { year: '2011', event: 'Mahindra acquires Ssangyong (South Korea) — largest international acquisition' },
        { year: '2020', event: 'Thar relaunch creates 2-year waiting list. Mahindra SUV supercycle begins.' },
        { year: '2023', event: 'XEV 9e and BE 6e unveiled — Mahindra\'s born-electric SUV platform. 1.28 Lakh bookings on Day 1.' },
      ],
      body: [
        'The Scorpio launch in 2002 was Mahindra\'s inflection point. Developed in 3 years at $120 Million — one-tenth the cost of a comparable Western SUV — the Scorpio proved India could design and build a world-class vehicle entirely domestically.',
        "In FY24, Mahindra sold 400,000+ SUVs — making it India's #2 SUV maker and one of the world's fastest-growing automotive brands.",
      ],
    },
    products: {
      categories: [
        { name: 'Thar', year: '2020', desc: "India's iconic off-roader. The 2020 relaunch created 2-year waiting lists. Defined the aspirational 4WD segment in India." },
        { name: 'Scorpio-N', year: '2022', desc: '1 Lakh bookings in 30 minutes on launch day. India\'s most waitlisted car at the time.' },
        { name: 'XUV700', year: '2021', desc: 'Mahindra\'s premium flagship. ADAS technology, panoramic sunroof — benchmarks German SUVs at 60% of the price.' },
        { name: 'Mahindra Tractors', year: '1963', desc: "World's #1 tractor brand by volume. Sold in 50+ countries. Powers 40% of India's mechanised farming." },
        { name: 'BE 6e / XEV 9e', year: '2025', desc: 'Mahindra\'s born-electric platform. 1.28 Lakh bookings within hours of opening.' },
        { name: 'Bolero', year: '2000', desc: "India's best-selling UV for 10+ consecutive years in rural/semi-urban markets." },
      ],
      body: [
        "Mahindra's product portfolio spans the widest income range of any Indian auto brand — from the ₹9 Lakh Bolero bought by a rural contractor to the ₹25 Lakh XUV700 bought by an urban professional to the BE 6e competing with Mercedes EQ.",
      ],
    },
    marketing: {
      pullQuote: '"Rise is not a tagline. Every Mahindra buyer has a story of rising — from a village to a city, from a job to a business, from two wheels to four."',
      campaigns: [
        { name: 'Live Young, Live Free (Thar)', year: '2020', desc: "Thar's relaunch campaign positioned the vehicle as freedom — not just transport. The most emotionally resonant Indian auto campaign of the 2020s." },
        { name: 'Scorpio-N: Born in India', year: '2022', desc: 'Celebrated Indian engineering pride. 1 Lakh bookings in 30 minutes validated the campaign\'s resonance.' },
        { name: 'Rise India', year: '2012–Present', desc: "Mahindra's umbrella brand philosophy — connecting tractors in Punjab to software in Pune under one aspirational idea." },
      ],
    },
    milestones: [
      { year: '1945', event: 'Founded. Willys Jeep license obtained.' },
      { year: '1963', event: 'Tractor division launched — becomes world\'s #1 by volume.' },
      { year: '2002', event: 'Scorpio launched — Mahindra\'s SUV design breakthrough.' },
      { year: '2008', event: 'Tech Mahindra listed on stock exchange.' },
      { year: '2020', event: 'Thar relaunch — 2-year waiting list.' },
      { year: '2022', event: 'Scorpio-N: 1 Lakh bookings in 30 minutes.' },
      { year: '2023', event: 'EV platform unveiled. 1.28L Day-1 bookings.' },
      { year: '2024', event: '₹1.4L Crore revenue. World\'s #1 tractor company.' },
    ],
    challenges: [
      { title: 'EV Battery Supply Chain', body: "Mahindra's EV ambitions require battery supply at scale. The company is investing in battery manufacturing partnerships, but global battery supply is constrained. Any delay will affect the EV launches that have already generated massive advance bookings." },
      { title: 'Ssangyong Bankruptcy Write-off', body: "Mahindra's 2011 acquisition of Ssangyong Motors (Korea) ended in bankruptcy in 2020. Mahindra wrote off ₹1,700 Crore. It was the most painful acquisition — a lesson in the risk of buying a distressed asset in a highly competitive mature market." },
      { title: 'Capacity vs. Demand Gap', body: "Mahindra's biggest problem is not demand — it is supply. The Scorpio-N had a 2-year waiting list. This is both a success and a crisis: customers defect to competitors while waiting. Plant expansions are addressing this, but capacity takes years to build." },
    ],
    financials: {
      stats: [
        { label: 'Group Revenue FY24', value: '₹1.4L Crore' },
        { label: 'Auto Revenue', value: '₹91,000 Cr' },
        { label: 'SUVs Sold FY24', value: '4 Lakh+' },
        { label: 'Tractors Sold/Year', value: '3.5 Lakh' },
        { label: 'Employees', value: '2.5 Lakh+' },
        { label: 'Countries Operated', value: '100+' },
      ],
      body: [
        "Mahindra & Mahindra's consolidated revenue of ₹1.4 Lakh Crore in FY24 makes it one of India's 10 largest companies. The automotive business generates the bulk of revenue, but financial services (Mahindra Finance), IT (Tech Mahindra), and agriculture (tractors) provide crucial diversification.",
        "The company's market capitalisation crossed ₹3.5 Lakh Crore in 2024 — a 5x increase from 2020 — driven by the SUV supercycle and EV anticipation.",
      ],
    },
    leadership: {
      leaders: [
        { name: 'J.C. & K.C. Mahindra', period: '1945–1960s', role: 'Founders', desc: "Two brothers who saw India's post-independence need for rugged utility vehicles. Their Willys Jeep license was the seed of a ₹1.4 Lakh Crore empire." },
        { name: 'Keshub Mahindra', period: '1963–2012', role: 'Chairman (49 Years)', desc: 'Built Mahindra from a Jeep assembler to a diversified industrial group. Inducted Anand Mahindra into the company.' },
        { name: 'Anand Mahindra', period: '2012–2021', role: 'Executive Chairman', desc: "Greenlit the Scorpio project. Acquired Ssangyong. Built Tech Mahindra. India's most influential business leader on social media." },
        { name: 'Anish Shah', period: '2021–Present', role: 'MD & CEO', desc: "First non-family CEO. Driving the EV pivot, portfolio rationalisation, and international expansion." },
      ],
    },
    identity: {
      pullQuote: '"You do not buy a Mahindra. You rise with it."',
      elements: [
        { name: 'The Twin Peaks Logo', desc: "Mahindra's M logo — two peaks rising — is one of India's most recognisable automotive badges. Redesigned in 2021 for the EV era, retaining the rising motif." },
        { name: 'Ruggedness Heritage', desc: "Every Mahindra vehicle carries the DNA of the original Willys Jeep. Can-do, built-for-India, unbreakable. Even the premium models retain the go-anywhere identity." },
        { name: 'Rise Philosophy', desc: "'Rise' connects a Pune techie buying a Thar for weekend trips to a Punjab farmer buying his first Mahindra tractor. The aspiration of rising is the same across incomes." },
        { name: "Anand Mahindra's Social Media Legacy", desc: "Anand Mahindra's 11 million Twitter followers have made Mahindra the most socially engaged large Indian conglomerate. His direct responses to customer issues have become brand stories." },
      ],
    },
    future: {
      body: [
        "Mahindra's next 5 years will be defined by its EV platform — the BE and XEV series. The company has committed ₹16,000 Crore in EV investment by 2027. The BE 6e and XEV 9e are among the most anticipated Indian product launches of the decade.",
        "The tractor business — often overshadowed by the glamorous EV story — is building a precision agriculture platform combining GPS, soil sensors, and drones into the OJA smart tractor range.",
        "The question is whether Mahindra can successfully navigate the EV transition without the missteps of its Korean adventure. The fundamentals — product design, distribution depth, brand trust — are stronger than ever.",
      ],
    },
  },

  'asian-paints': {
    name: 'Asian Paints', tagline: 'Har Ghar Kuch Kehta Hai', category: 'Paints · Décor · Home', founded: '1942',
    headquarters: 'Mumbai', revenue: '₹35,000 Crore (FY24)', employees: '7,000+',
    coverPhoto: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&q=80',
    oneLiner: 'Started by four friends with ₹3,700 each in 1942, Asian Paints became India\'s largest and Asia\'s third-largest paint company — a business built on supply chain genius, not just product quality.',
    origin: {
      pullQuote: '"Asian Paints did not win on product. It won on delivery — being in every small-town hardware shop when ICI and Jenson & Nicholson were selling only in cities."',
      body: [
        'In 1942, four friends — Champaklal Choksey, Chimanlal Choksi, Suryakant Dani, and Arvind Vakil — pooled ₹3,700 each and started a paint company in a garage in Mumbai. They named it Asian Paints.',
        'For its first decade, Asian Paints struggled against established players like ICI (British) and Goodlass Nerolac. The advantage they found was not in better chemistry, but in better distribution — building the deepest dealer network in India, reaching small-town hardware shops that the MNCs ignored.',
        "By the 1960s, Asian Paints had more retail touchpoints than any competitor. By the 1980s, it was India's largest paint company. By 2002, it had pushed every MNC out of the top position — a rare case of an Indian company defeating foreign competition on home turf.",
      ],
    },
    founding: {
      timeline: [
        { year: '1942', event: 'Founded by four friends in Mumbai with ₹14,800 total capital' },
        { year: '1945', event: 'First manufacturing plant set up in Bhandup, Mumbai' },
        { year: '1967', event: "Asian Paints becomes India's #1 paint company — holds the position for 57 consecutive years" },
        { year: '1983', event: 'First international expansion — enters Fiji. Now operates in 15 countries.' },
        { year: '1998', event: "Asia's first ERP implementation in manufacturing — real-time inventory visibility across 70,000 dealers" },
        { year: '2015', event: "Asian Paints Beautiful Homes launched — company's transformation from paint to décor platform" },
      ],
      body: [
        "The supply chain innovation that built Asian Paints was its 1998 IT project — Asia's first ERP implementation in manufacturing. Asian Paints built a real-time inventory system giving it visibility across 70,000 dealers. When competitors used manual stock sheets, Asian Paints knew exactly what was selling in every district.",
        "This data advantage compounded into a customer insight machine. Asian Paints knew colour trends before consumers did — and stocked accordingly.",
      ],
    },
    products: {
      categories: [
        { name: 'Royale (Interior Luxury)', year: '1990s', desc: "India's #1 premium interior paint. Smooth, washable, 10-year warranty. Commands 45% premium over competitors." },
        { name: 'Apex (Exterior)', year: '1980s', desc: "India's most trusted exterior paint — weather-proof formulation designed for Indian monsoons." },
        { name: 'SmartCare (Waterproofing)', year: '2000s', desc: "India's largest selling waterproofing product range for basements, terraces, and bathrooms." },
        { name: 'Asian Paints Beautiful Homes', year: '2015', desc: '150+ experiential stores where consumers see full room designs, not just paint samples.' },
        { name: 'Deckso (Wood Finish)', year: '2010s', desc: 'Premium wood coating and staining products for furniture and floors. Rapidly growing premium segment.' },
        { name: 'Home Décor Services', year: '2019', desc: 'Interior design consultation and execution — Asian Paints provides the entire room transformation, not just the paint.' },
      ],
      body: [
        "Asian Paints' shift from 'selling paint' to 'selling beautiful homes' is one of India's most successful brand evolution stories. The company no longer just sells cans of colour — it sells the vision of what your home could look like. This transformation increased per-customer value 5x.",
      ],
    },
    marketing: {
      pullQuote: '"Har Ghar Kuch Kehta Hai" — every home says something. Asian Paints made paint an emotion, not a commodity.',
      campaigns: [
        { name: '"Har Ghar Kuch Kehta Hai"', year: '2005–Present', desc: "India's longest-running home décor campaign. Positioned paint as self-expression, not maintenance. One of the 10 most recalled Indian advertising campaigns ever." },
        { name: 'Colour of the Year', year: '2010–Present', desc: 'Annual trend campaign that creates demand for specific colours. So influential it changes what Indians paint their homes.' },
        { name: 'Celebrity Endorsement Series', year: '2000s–2010s', desc: "Saif Ali Khan and other celebrities moved Asian Paints from the contractor's recommendation to the homeowner's aspiration." },
      ],
    },
    milestones: [
      { year: '1942', event: 'Founded in Mumbai garage with ₹14,800 total capital.' },
      { year: '1967', event: "Becomes India's #1 paint company — 57 consecutive years at the top." },
      { year: '1983', event: 'First international expansion.' },
      { year: '1998', event: "Asia's first manufacturing ERP system." },
      { year: '2015', event: "Beautiful Homes — transformation from paint to décor." },
      { year: '2024', event: '₹35,000 Crore revenue. #3 paint company in Asia.' },
    ],
    challenges: [
      { title: 'TiO₂ Import Dependency', body: "Titanium dioxide — the key pigment in white paint — is largely imported. Any global supply chain disruption or currency depreciation directly compresses Asian Paints' margins. The 2021-22 commodity price spike saw margins fall from 21% to 15% in 18 months." },
      { title: 'Birla Opus (Grasim) Entry', body: "The Aditya Birla Group's Grasim Industries announced a ₹10,000 Crore entry into paints in 2022. Birla Opus, backed by 30,000+ dealer appointments, is the most credible new entrant in Indian paints in 30 years. Asian Paints is defending its distribution moat aggressively." },
      { title: 'Décor Platform Profitability', body: "Asian Paints Beautiful Homes stores have high customer value but complex unit economics. Converting a paint company's operational model to a services company requires fundamentally different talent, technology, and working capital." },
    ],
    financials: {
      stats: [
        { label: 'Revenue FY24', value: '₹35,000 Cr' },
        { label: 'Market Cap', value: '₹2.8L Crore' },
        { label: 'Market Share (Decorative)', value: '53%' },
        { label: 'Dealer Network', value: '70,000+' },
        { label: 'Countries', value: '15' },
        { label: 'Beautiful Homes Stores', value: '150+' },
      ],
      body: [
        'Asian Paints has held 53% market share in India\'s decorative paint market for over 25 consecutive years — a dominance never seriously threatened despite MNC competition and commodity cycles.',
        'The company\'s operating margins have averaged 18-21% over the last decade — among the highest in Indian consumer goods — driven by the distribution moat and brand premium.',
      ],
    },
    leadership: {
      leaders: [
        { name: 'Four Founders', period: '1942–1990s', role: 'Co-Founders', desc: "Choksey, Choksi, Dani, Vakil — four friends who built India's most dominant consumer goods company through distribution genius, not capital advantage." },
        { name: 'Ashwin Dani', period: '1990s–2012', role: 'Chairman', desc: "Second-generation leader who globalised Asian Paints, entered 15 countries, and oversaw the company's IT transformation." },
        { name: 'K.B.S. Anand', period: '2012–2020', role: 'MD & CEO', desc: "Drove the Beautiful Homes transformation — moving Asian Paints from a paint company to a home décor platform." },
        { name: 'Amit Syngle', period: '2020–Present', role: 'MD & CEO', desc: "Navigating the post-COVID premiumisation boom, the Birla Opus threat, and the company's technology transformation." },
      ],
    },
    identity: {
      pullQuote: '"Asian Paints\' Gattu — the mischievous boy with a paint bucket — has been greeting India since 1954. He is 70 years old and has never aged."',
      elements: [
        { name: 'Gattu (The Mascot)', desc: "Cartoonist R.K. Laxman created Gattu — the mischievous boy with a dripping paint bucket — in 1954. One of India's longest-running brand mascots." },
        { name: '"Har Ghar" Campaign', desc: '"Har Ghar Kuch Kehta Hai" — every home says something. The most emotionally resonant paint campaign in Indian history. Made colour about identity, not aesthetics.' },
        { name: 'Colour of the Year', desc: 'Asian Paints owns the annual colour trend conversation in India. Homeowners, designers, and architects wait for the Asian Paints recommendation before deciding renovation colours.' },
        { name: 'Distribution Depth', desc: "70,000+ dealers across India — including Tier 4 towns — stock Asian Paints as their first preference. This network took 80 years to build and cannot be replicated quickly." },
      ],
    },
    future: {
      body: [
        "Asian Paints is competing on two fronts simultaneously: defending its 53% decorative market share against Birla Opus, and building a profitable home services business as a new revenue stream.",
        "The company's technology investment — AI-driven colour recommendation, augmented reality home visualisation, and a B2B contractor app — is its moat against digital disruption.",
        "The 80-year market leadership makes Asian Paints one of India's most enduring business success stories. The next 10 years will test whether it can simultaneously defend its core and build its future — in a market that is for the first time in a generation facing credible competition.",
      ],
    },
  },

  'vedas-agro': {
    name: 'Vedas Agro', tagline: 'From Soil to Success', category: 'Agri-Processing · MSME', founded: '2011',
    headquarters: 'Rajasthan / Uttar Pradesh', revenue: '₹120 Crore (FY24)', employees: '400+',
    coverPhoto: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&q=80',
    logo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&q=80',
    oneLiner: 'Vedas Agro started as a mustard oil mill and grew into a diversified agri-processing company — the story of a first-generation Indian entrepreneur who turned ₹8 Lakh into a ₹120 Crore business.',
    origin: {
      pullQuote: '"Most people saw surplus mustard and worried about price. I saw a processing opportunity."',
      body: [
        'Vedas Agro was founded in 2011 by Rajesh Kumar Vedas — a first-generation entrepreneur from a small-farming family in Rajasthan. With ₹8 Lakh borrowed capital and a single mustard crushing machine, he started processing mustard oil for local traders in a 1,200 sq ft shed.',
        'The early years were about survival: fluctuating mustard prices, delayed payments from traders, and competition from established oil mills. But Rajesh noticed something competitors missed — farmers in the region had no direct connection to end buyers. Every intermediary took a cut. He set out to build direct supply chains.',
        'By 2015, Vedas Agro had signed direct procurement contracts with 3 FMCG companies, bypassing the mandis entirely. By 2018, it had expanded into oilseed processing, spice grinding, and agri-logistics. By 2024, it was a ₹120 Crore company with 400+ employees and relationships with 8,000+ farmers.',
      ],
    },
    founding: {
      timeline: [
        { year: '2011', event: 'Vedas Agro founded with ₹8 Lakh capital. Single mustard crushing unit in Rajasthan.' },
        { year: '2013', event: 'First direct contract with an FMCG company — cutting out 3 layers of middlemen.' },
        { year: '2015', event: 'Second processing unit commissioned. Oilseed processing capacity reaches 50 MT/day.' },
        { year: '2017', event: 'Spice grinding division launched. Coriander, cumin, and turmeric processing begins.' },
        { year: '2019', event: 'Vedas Agro wins NSIC Star Export House certification. First exports to GCC.' },
        { year: '2022', event: 'MSME Ministry award for best farmer-linkage model in agri-processing.' },
        { year: '2024', event: 'Revenue ₹120 Crore. 8,000+ farmer relationships. ISO 22000 certified.' },
      ],
      body: [
        'Vedas Agro\'s growth model is vertical integration from farm to factory. By owning the relationship with 8,000+ farmers — providing them certified seeds, weather advisory, and guaranteed purchase contracts — Vedas controls quality from the source.',
        'The company has also built a Farmer Producer Organization (FPO) with 2,300 farmer members — giving smallholders access to institutional credit, crop insurance, and collective bargaining power that individual farmers lack.',
      ],
    },
    products: {
      categories: [
        { name: 'Mustard Oil (Kachi Ghani)', year: '2011', desc: 'Cold-pressed mustard oil. Premium segment. Supplied to 3 FMCG brands and directly via D2C under Vedas label.' },
        { name: 'Oilseed Processing', year: '2014', desc: 'Soybean, groundnut, sunflower crushing. B2B supply to bulk oil refiners. 80 MT/day capacity.' },
        { name: 'Spice Grinding', year: '2017', desc: 'Coriander, cumin, turmeric, red chilli. Food-grade hygiene certified. Export-ready packaging.' },
        { name: 'De-oiled Cakes (Cattle Feed)', year: '2015', desc: 'By-product of oil processing. Protein-rich cattle feed. Sold to dairy cooperatives and poultry farms.' },
        { name: 'Vedas Direct (D2C)', year: '2021', desc: 'Direct consumer brand launched online. Kachi Ghani oil, spice blends, organic grains. 15,000 monthly orders.' },
        { name: 'Agri-Logistics', year: '2019', desc: '12 trucks, 2 cold storage units. Logistics service for other agri-processors in the region.' },
      ],
      body: [
        "Vedas Agro's product strategy mirrors its business philosophy: extract maximum value from every part of the agricultural commodity. Mustard seeds yield oil (primary product), de-oiled cakes (cattle feed), and seed husk (boiler fuel). Nothing is wasted.",
      ],
    },
    marketing: {
      pullQuote: '"Our marketing is our farmer story. Every bottle of Vedas Kachi Ghani has a farmer\'s name on the back label."',
      campaigns: [
        { name: 'Farmer-to-Kitchen Story', year: '2021', desc: "Vedas Direct D2C brand uses QR codes on packaging — scan to see the farmer who grew the mustard. Transparency as marketing." },
        { name: 'MSME Export Champion', year: '2022', desc: 'Featured in Government of India\'s MSME export success stories. Generated significant earned media and B2B leads.' },
        { name: 'Founder LinkedIn Content', year: '2022–Present', desc: "Rajesh Kumar Vedas' LinkedIn posts about agri-processing reach 50,000+ views. Building the founder brand drives B2B inquiries from 12 countries." },
      ],
    },
    milestones: [
      { year: '2011', event: 'Founded with ₹8 Lakh. One machine, one product.' },
      { year: '2013', event: 'First direct FMCG contract — mandis bypassed.' },
      { year: '2019', event: 'Star Export House certification. First GCC exports.' },
      { year: '2021', event: 'D2C launch. 15,000 monthly orders.' },
      { year: '2022', event: 'National MSME Award for farmer linkage model.' },
      { year: '2024', event: '₹120 Crore revenue. 8,000+ farmer relationships. ISO 22000.' },
    ],
    challenges: [
      { title: 'Commodity Price Volatility', body: "Mustard prices can swing 40% in a season based on crop output and government MSP decisions. Vedas Agro's fixed-price farmer contracts protect farmers but expose the company to margin compression in bumper crop years." },
      { title: 'Working Capital Gap', body: 'Agri-processing is working-capital intensive — you buy at harvest (large lump sum) and receive payment over months. With ₹120 Crore revenue, Vedas\' working capital requirement is ₹25–30 Crore. Institutional credit access remains the biggest constraint.' },
      { title: 'D2C vs. B2B Focus Split', body: 'The D2C Vedas Direct brand has strong margins but requires marketing investment. The B2B processing business has lower margins but predictable volumes. Allocating management attention between two fundamentally different business models is the leadership challenge.' },
    ],
    financials: {
      stats: [
        { label: 'Revenue FY24', value: '₹120 Crore' },
        { label: 'Farmer Partners', value: '8,000+' },
        { label: 'Processing Capacity', value: '80 MT/day' },
        { label: 'Employees', value: '400+' },
        { label: 'Export Countries', value: '8' },
        { label: 'FPO Members', value: '2,300+' },
      ],
      body: [
        "Vedas Agro's ₹120 Crore revenue in FY24 represents a 15x growth from its 2011 founding — a CAGR of approximately 22% over 13 years, achieved without any external equity investment.",
        'Operating margins average 8–10% — higher than commodity processing industry norms — due to the lean cost structure and direct procurement model that eliminates mandi commissions.',
      ],
    },
    leadership: {
      leaders: [
        { name: 'Rajesh Kumar Vedas', period: '2011–Present', role: 'Founder & Managing Director', desc: 'A first-generation entrepreneur from Rajasthan. Built Vedas Agro from a ₹8 Lakh investment to ₹120 Crore — with zero external equity funding and a farmer-first philosophy.' },
        { name: 'Core Management Team', period: '2015–Present', role: 'Operations & Quality', desc: 'Key operations, quality control, and logistics roles held by experienced sector professionals. Professionalisation is the next growth phase priority.' },
      ],
    },
    identity: {
      pullQuote: '"Vedas is not just a company name. It means knowledge — the ancient Indian tradition of knowing the land, the crop, and the season."',
      elements: [
        { name: 'Farmer-First Identity', desc: 'Every communication from Vedas Agro leads with the farmer story. The 8,000+ farmer relationships are not just a supply chain — they are the brand itself.' },
        { name: 'Kachi Ghani Heritage', desc: 'Cold-pressed mustard oil is a 2,000-year-old Indian food tradition. Vedas positions its oil within this heritage — making the product a cultural choice, not just a cooking oil.' },
        { name: 'QR Farm Traceability', desc: 'Every Vedas Direct product has a QR code linking to the source farm. In a market full of claims, Vedas shows proof.' },
        { name: 'MSME Pride', desc: "Vedas Agro actively markets itself as an Indian MSME success story — speaking at FICCI events and using the MSME identity as a trust signal with domestic and export buyers." },
      ],
    },
    future: {
      body: [
        "Vedas Agro's next chapter is a choice between two paths: professionalise and scale (bring in institutional capital, expand to 5 new states), or go deep in the current geography (build the D2C brand to ₹50 Crore, add value-added products).",
        "The D2C opportunity is particularly compelling. Indian consumers are actively seeking 'farm-to-kitchen' brands — and Vedas has the authentic story, the supply chain, and the quality to win this segment.",
        "Whatever path it chooses, Vedas Agro represents one of the most important business archetypes in India: the first-generation MSME entrepreneur who solved a real supply chain problem, served farmers honestly, and built a sustainable business without any government grant or investor cheque.",
      ],
    },
  },
};

/* ─── Featured brands for dropdown ───────────────── */
export const FEATURED_BRANDS = [
  { slug: 'amul',        name: 'Amul',         sector: 'Dairy · Cooperative',   founded: '1946', logo: '🧈' },
  { slug: 'parle',       name: 'Parle',         sector: 'FMCG · Biscuits',      founded: '1929', logo: '🍪' },
  { slug: 'haldiram',    name: 'Haldiram\'s',   sector: 'Food · Snacks',         founded: '1937', logo: '🍿' },
  { slug: 'tata',        name: 'Tata Group',    sector: 'Conglomerate',          founded: '1868', logo: '⚙️' },
  { slug: 'mahindra',    name: 'Mahindra',      sector: 'Auto · Conglomerate',   founded: '1945', logo: '🚗' },
  { slug: 'asian-paints',name: 'Asian Paints',  sector: 'Paints · Décor',        founded: '1942', logo: '🎨' },
  { slug: 'vedas-agro',  name: 'Vedas Agro',    sector: 'Agri-Processing',       founded: '2011', logo: '🌾' },
];

/* ─── Types ──────────────────────────────────────── */
interface BrandData {
  name: string; tagline: string; category: string; founded: string;
  headquarters: string; revenue: string; employees: string;
  coverPhoto: string; logo: string; oneLiner: string;
  origin: { pullQuote: string; body: string[] };
  founding: { timeline: { year: string; event: string }[]; body: string[] };
  products: { categories: { name: string; year: string; desc: string }[]; body: string[] };
  marketing: { pullQuote: string; campaigns: { name: string; year: string; desc: string }[] };
  milestones: { year: string; event: string }[];
  challenges: { title: string; body: string }[];
  financials: { stats: { label: string; value: string }[]; body: string[] };
  leadership: { leaders: { name: string; period: string; role: string; desc: string }[] };
  identity: { pullQuote: string; elements: { name: string; desc: string }[] };
  future: { body: string[] };
}

/* ═══════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════ */
export default function BrandStory({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'amul';
  const brand = BRANDS[slug] ?? BRANDS['amul'];

  const [activeSection, setActiveSection] = useState('origin');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = 'origin';
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

  const _brandUrl  = `https://profilebizz.com/brand/${slug}`;
  const _brandJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${brand.name} — ${brand.tagline} | ProfileBizz`,
        description: brand.oneLiner,
        image: brand.coverPhoto,
        url: _brandUrl,
        author: { '@type': 'Organization', name: 'ProfileBizz Editorial', url: 'https://profilebizz.com' },
        publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
        about: { '@type': 'Organization', name: brand.name },
      },
      {
        '@type': 'Organization',
        name: brand.name,
        description: brand.oneLiner,
        foundingDate: brand.founded,
        url: _brandUrl,
        address: { '@type': 'PostalAddress', addressLocality: brand.headquarters, addressCountry: 'IN' },
      },
    ],
  });

  return (
    <>
      <Helmet>
        <title>{`${brand.name} — ${brand.tagline} | ProfileBizz`}</title>
        <meta name="description" content={brand.oneLiner} />
        <link rel="canonical" href={_brandUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={_brandUrl} />
        <meta property="og:site_name" content="ProfileBizz" />
        <meta property="og:title" content={`${brand.name} — ${brand.tagline} | ProfileBizz`} />
        <meta property="og:description" content={brand.oneLiner} />
        <meta property="og:image" content={brand.coverPhoto} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@profilebizz" />
        <meta name="twitter:title" content={`${brand.name} — ${brand.tagline} | ProfileBizz`} />
        <meta name="twitter:description" content={brand.oneLiner} />
        <meta name="twitter:image" content={brand.coverPhoto} />
        <script type="application/ld+json">{_brandJsonLd}</script>
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
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Brand Stories</span>
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
      <div className="relative h-[400px] md:h-[500px] overflow-hidden mt-14">
        <img src={brand.coverPhoto} alt="cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute top-6 left-8">
          <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">
            {brand.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
          <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {brand.headquarters} · Est. {brand.founded}
          </p>
          <h1 className="font-serif text-white text-5xl md:text-7xl font-bold leading-none mb-3">{brand.name}</h1>
          <p className="text-white/70 text-base md:text-lg font-medium italic">"{brand.tagline}"</p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex flex-wrap gap-x-10 gap-y-3 flex-1">
            {[
              { l: 'Revenue', v: brand.revenue },
              { l: 'Established', v: brand.founded },
              { l: 'Scale', v: brand.employees },
              { l: 'HQ', v: brand.headquarters },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{s.l}</span>
                <span className="text-base md:text-xl font-serif font-bold text-black">{s.v}</span>
              </div>
            ))}
          </div>
          <p className="md:max-w-sm text-sm text-gray-600 leading-relaxed italic border-l-2 border-editorial pl-4">
            {brand.oneLiner}
          </p>
        </div>
      </div>

      {/* ── Other Brands Bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 flex-shrink-0 mr-2">More Brands:</span>
          {FEATURED_BRANDS.filter(b => b.slug !== slug).map((b) => (
            <a
              key={b.slug}
              href={`/brand/${b.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-editorial hover:text-editorial transition-colors flex-shrink-0 group"
            >
              <span className="text-base">{b.logo}</span>
              <span className="text-xs font-bold text-gray-700 group-hover:text-editorial">{b.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Sticky Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">In This Story</p>
            <nav className="flex flex-col gap-0">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-left py-2.5 px-3 text-sm font-medium border-l-2 transition-all duration-150 ${
                    activeSection === s.id
                      ? 'border-editorial text-editorial bg-red-50 font-semibold'
                      : 'border-gray-200 text-gray-500 hover:text-black hover:border-black'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Article */}
        <article className="flex-1 min-w-0 max-w-3xl">

          {/* ── 1. Brand Origin ── */}
          <section id="origin" ref={setRef('origin')} className="mb-16 scroll-mt-24">
            <SectionLabel index="01" label="Brand Origin" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{brand.origin.pullQuote}</p>
            </blockquote>
            {brand.origin.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* ── 2. Founding Story ── */}
          <section id="founding" ref={setRef('founding')} className="mb-16 scroll-mt-24">
            <SectionLabel index="02" label="Founding Story" />
            <div className="my-6 space-y-0">
              {brand.founding.timeline.map((e, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${i === 0 ? 'bg-editorial' : 'bg-black'}`} />
                    {i < brand.founding.timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-editorial">{e.year}</span>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{e.event}</p>
                  </div>
                </div>
              ))}
            </div>
            {brand.founding.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* ── 3. Product Evolution ── */}
          <section id="products" ref={setRef('products')} className="mb-16 scroll-mt-24">
            <SectionLabel index="03" label="Product Evolution" />
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {brand.products.categories.map((c, i) => (
                <div key={i} className="bg-white border border-gray-200 p-4 hover:border-black transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold font-serif group-hover:text-editorial transition-colors">{c.name}</span>
                    <span className="text-[10px] font-bold text-editorial bg-red-50 px-2 py-0.5">Since {c.year}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
            {brand.products.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* ── 4. Marketing Legacy ── */}
          <section id="marketing" ref={setRef('marketing')} className="mb-16 scroll-mt-24">
            <SectionLabel index="04" label="Marketing Legacy" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{brand.marketing.pullQuote}</p>
            </blockquote>
            <div className="space-y-4">
              {brand.marketing.campaigns.map((c, i) => (
                <div key={i} className="flex gap-5 border-b border-gray-100 pb-4 last:border-0 group">
                  <div className="w-1 bg-gray-200 group-hover:bg-editorial transition-colors flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold text-black group-hover:text-editorial transition-colors">{c.name}</span>
                      <span className="text-[10px] font-bold tracking-wider text-gray-400">{c.year}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 5. Key Milestones ── */}
          <section id="milestones" ref={setRef('milestones')} className="mb-16 scroll-mt-24">
            <SectionLabel index="05" label="Key Milestones" />
            <div className="mt-6 border border-gray-200 divide-y divide-gray-100">
              {brand.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-5 px-5 py-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-8 bg-black group-hover:bg-editorial transition-colors">
                    <Milestone className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-sm text-gray-700 flex-1 leading-snug">{m.event}</p>
                  <span className="flex-shrink-0 text-[11px] font-bold text-editorial">{m.year}</span>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 6. Challenges ── */}
          <section id="challenges" ref={setRef('challenges')} className="mb-16 scroll-mt-24">
            <SectionLabel index="06" label="Challenges & Comebacks" />
            <div className="mt-6 space-y-6">
              {brand.challenges.map((c, i) => (
                <div key={i} className="border-l-4 border-gray-300 pl-5 py-1 hover:border-editorial transition-colors group">
                  <h4 className="text-base font-bold font-serif mb-2 group-hover:text-editorial transition-colors">{c.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 7. Financial Growth ── */}
          <section id="financials" ref={setRef('financials')} className="mb-16 scroll-mt-24">
            <SectionLabel index="07" label="Financial Growth" />
            <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200">
              {brand.financials.stats.map((s, i) => (
                <div key={i} className="bg-white px-5 py-4">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1">{s.label}</p>
                  <p className="font-serif text-xl md:text-2xl font-bold text-black">{s.value}</p>
                </div>
              ))}
            </div>
            {brand.financials.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          <Divider />

          {/* ── 8. Leadership Legacy ── */}
          <section id="leadership" ref={setRef('leadership')} className="mb-16 scroll-mt-24">
            <SectionLabel index="08" label="Leadership Legacy" />
            <div className="mt-6 space-y-4">
              {brand.leadership.leaders.map((l, i) => (
                <div key={i} className="bg-white border border-gray-200 p-5 hover:border-black transition-colors group">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-base font-bold font-serif group-hover:text-editorial transition-colors">{l.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{l.role}</p>
                    </div>
                    <span className="flex-shrink-0 text-[10px] font-bold tracking-wider text-editorial border border-editorial px-2 py-1">{l.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{l.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 9. Brand Identity ── */}
          <section id="identity" ref={setRef('identity')} className="mb-16 scroll-mt-24">
            <SectionLabel index="09" label="Brand Identity" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{brand.identity.pullQuote}</p>
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {brand.identity.elements.map((e, i) => (
                <div key={i} className="bg-black text-white p-5 group hover:bg-editorial transition-colors">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">{`Identity Element 0${i + 1}`}</p>
                  <p className="text-sm font-bold mb-2">{e.name}</p>
                  <p className="text-xs text-white/70 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 10. Legacy & Future ── */}
          <section id="future" ref={setRef('future')} className="mb-16 scroll-mt-24">
            <SectionLabel index="10" label="Legacy & Future" />
            <div className="flex items-center gap-3 my-6">
              <TrendingUp className="w-5 h-5 text-editorial" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">What Comes Next</span>
            </div>
            {brand.future.body.map((p, i) => <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>)}
          </section>

          {/* Back to top */}
          <div className="flex justify-center pt-4 pb-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 hover:border-editorial px-5 py-2.5"
            >
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

function Divider() {
  return <hr className="border-t border-gray-200 my-12" />;
}
