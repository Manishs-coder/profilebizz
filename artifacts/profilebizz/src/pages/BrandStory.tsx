import React, { useState, useEffect, useRef } from 'react';
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

  return (
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
