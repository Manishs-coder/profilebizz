import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Loader2 } from 'lucide-react';

interface FounderResult {
  slug: string;
  name: string;
  designation: string;
  photoUrl: string | null;
  profileTag: string | null;
  profileType: string | null;
}

// ── Static searchable content ──────────────────────────────────────────
interface StaticResult {
  type: 'brand' | 'industry' | 'social-hero';
  slug: string;
  name: string;
  subtitle: string;
  tag: string;
  icon: string;
  href: string;
  keywords: string[]; // extra search terms
}

const STATIC_RESULTS: StaticResult[] = [
  // Brand Stories
  { type: 'brand', slug: 'amul',        name: "Amul",          subtitle: 'Dairy Cooperative · Est. 1946',           tag: 'Brand Story', icon: '🧈', href: '/brand/amul',        keywords: ['dairy','milk','butter','cooperative','kurien','gcmmf','amul story'] },
  { type: 'brand', slug: 'parle',       name: "Parle",         subtitle: 'FMCG · Biscuits · Est. 1929',             tag: 'Brand Story', icon: '🍪', href: '/brand/parle',       keywords: ['parle-g','biscuit','glucose','chauhan','parle story'] },
  { type: 'brand', slug: 'haldiram',    name: "Haldiram's",    subtitle: 'Food · Snacks & Sweets · Est. 1937',       tag: 'Brand Story', icon: '🍿', href: '/brand/haldiram',    keywords: ['haldiram','namkeen','bhujia','snacks','mithai','haldiram story'] },
  { type: 'brand', slug: 'tata',        name: "Tata Group",    subtitle: 'Conglomerate · Est. 1868',                 tag: 'Brand Story', icon: '⚙️', href: '/brand/tata',        keywords: ['tata','jamshedji','ratan','salt','tata story','conglomerate'] },
  { type: 'brand', slug: 'mahindra',    name: "Mahindra",      subtitle: 'Auto · Conglomerate · Est. 1945',          tag: 'Brand Story', icon: '🚗', href: '/brand/mahindra',    keywords: ['mahindra','suv','scorpio','anand mahindra','mahindra story'] },
  { type: 'brand', slug: 'asian-paints',name: "Asian Paints",  subtitle: 'Paints & Décor · Est. 1942',              tag: 'Brand Story', icon: '🎨', href: '/brand/asian-paints',keywords: ['asian paints','paint','décor','asian paints story'] },
  { type: 'brand', slug: 'vedas-agro',  name: "Vedas Agro",    subtitle: 'Agri-Processing · Est. 2011',              tag: 'Brand Story', icon: '🌾', href: '/brand/vedas-agro',  keywords: ['vedas','agro','rajesh kumar','farmer','vedas story'] },
  // Extra popular brands user mentioned
  { type: 'brand', slug: 'balaji',      name: "Balaji Wafers", subtitle: 'FMCG · Snacks & Wafers',                  tag: 'Brand Story', icon: '🥔', href: '#',                  keywords: ['balaji','wafers','chips','snacks','balaji story','gujarat'] },
  { type: 'brand', slug: 'lijjat',      name: "Lijjat Papad",  subtitle: 'Women Cooperative · Est. 1959',            tag: 'Brand Story', icon: '🫓', href: '#',                  keywords: ['lijjat','papad','women','cooperative','lijjat story'] },
  { type: 'brand', slug: 'patanjali',   name: "Patanjali",     subtitle: 'FMCG · Ayurvedic · Est. 2006',             tag: 'Brand Story', icon: '🌿', href: '#',                  keywords: ['patanjali','baba ramdev','ayurved','patanjali story'] },
  { type: 'brand', slug: 'dmart',       name: "D-Mart",        subtitle: 'Retail · Supermarkets · Est. 2002',        tag: 'Brand Story', icon: '🛒', href: '#',                  keywords: ['dmart','avenue supermarts','radhakishan damani','retail','dmart story'] },
  { type: 'brand', slug: 'byjus',       name: "BYJU'S",        subtitle: 'EdTech · Est. 2011',                       tag: 'Brand Story', icon: '📚', href: '#',                  keywords: ['byjus','byju','edtech','raveendran','education','byju story'] },
  { type: 'brand', slug: 'zerodha',     name: "Zerodha",       subtitle: 'FinTech · Discount Broker · Est. 2010',    tag: 'Brand Story', icon: '📈', href: '/founder/nithin-kamath', keywords: ['zerodha','nithin kamath','broker','fintech','zerodha story'] },
  { type: 'brand', slug: 'zomato',      name: "Zomato",        subtitle: 'Food Delivery · Est. 2008',                tag: 'Brand Story', icon: '🍕', href: '#',                  keywords: ['zomato','deepinder','food delivery','zomato story'] },
  { type: 'brand', slug: 'nykaa',       name: "Nykaa",         subtitle: 'Beauty · D2C · Est. 2012',                 tag: 'Brand Story', icon: '💄', href: '#',                  keywords: ['nykaa','falguni nayar','beauty','d2c','nykaa story'] },
  { type: 'brand', slug: 'oyo',         name: "OYO Rooms",     subtitle: 'Hospitality · Est. 2013',                  tag: 'Brand Story', icon: '🏨', href: '#',                  keywords: ['oyo','ritesh agarwal','hotel','hospitality','oyo story'] },
  { type: 'brand', slug: 'boat',        name: "boAt",          subtitle: 'Consumer Electronics · Est. 2016',         tag: 'Brand Story', icon: '🎧', href: '#',                  keywords: ['boat','aman gupta','audio','earphones','boat story'] },
  { type: 'brand', slug: 'mamaearth',   name: "Mamaearth",     subtitle: 'D2C Beauty · Est. 2016',                   tag: 'Brand Story', icon: '🌸', href: '#',                  keywords: ['mamaearth','ghazal alagh','natural','d2c','mamaearth story'] },
  { type: 'brand', slug: 'meesho',      name: "Meesho",        subtitle: 'Social Commerce · Est. 2015',              tag: 'Brand Story', icon: '🛍️', href: '#',                  keywords: ['meesho','vidit aatrey','social commerce','ecommerce','meesho story'] },

  // Industry Stories
  { type: 'industry', slug: 'steel',       name: "Steel Industry",    subtitle: 'Core Sector · ₹2.5L Cr',      tag: 'Industry Story', icon: '🏗️', href: '/industry/steel',       keywords: ['steel','tata steel','jsw','sail','iron','steel industry'] },
  { type: 'industry', slug: 'agriculture', name: "Agriculture",        subtitle: 'Foundation · ₹20L Cr',        tag: 'Industry Story', icon: '🌾', href: '/industry/agriculture', keywords: ['agriculture','farming','agri','crop','kisaan','agri story'] },
  { type: 'industry', slug: 'fmcg',        name: "FMCG",              subtitle: 'Consumer Goods · ₹5.8L Cr',   tag: 'Industry Story', icon: '🛒', href: '/industry/fmcg',        keywords: ['fmcg','consumer goods','fmcg industry','fast moving'] },
  { type: 'industry', slug: 'solar',       name: "Solar Energy",       subtitle: 'Clean Tech · ₹1.8L Cr',       tag: 'Industry Story', icon: '☀️', href: '/industry/solar',       keywords: ['solar','renewable','clean energy','solar industry'] },
  { type: 'industry', slug: 'ev',          name: "Electric Vehicles",  subtitle: 'Future Mobility · ₹50,000 Cr',tag: 'Industry Story', icon: '⚡', href: '/industry/ev',          keywords: ['electric vehicles','ev','ola electric','ather','ev industry'] },
  { type: 'industry', slug: 'healthcare',  name: "Healthcare",         subtitle: 'Life Sciences · ₹8.6L Cr',    tag: 'Industry Story', icon: '🏥', href: '/industry/healthcare',  keywords: ['healthcare','pharma','hospital','health','apollo','healthcare industry'] },
  { type: 'industry', slug: 'it',          name: "IT & Technology",    subtitle: 'Digital Economy · ₹10.4L Cr', tag: 'Industry Story', icon: '💻', href: '/industry/it',          keywords: ['it','technology','software','infosys','tcs','wipro','tech industry'] },
  { type: 'industry', slug: 'real-estate', name: "Real Estate",        subtitle: 'Infrastructure · ₹13L Cr',    tag: 'Industry Story', icon: '🏘️', href: '/industry/real-estate', keywords: ['real estate','property','housing','realty','dlf','real estate industry'] },

  // Social Heroes
  { type: 'social-hero', slug: 'anshu-gupta',              name: "Anshu Gupta",              subtitle: 'Founder, Goonj · The Clothing Man of India',       tag: 'Social Hero', icon: '👕', href: '/social-hero/anshu-gupta',              keywords: ['anshu gupta','goonj','clothing','urban waste','social'] },
  { type: 'social-hero', slug: 'sonam-wangchuk',           name: "Sonam Wangchuk",           subtitle: 'Ice Stupa Inventor · Ladakh',                       tag: 'Social Hero', icon: '🏔️', href: '/social-hero/sonam-wangchuk',           keywords: ['sonam wangchuk','ice stupa','ladakh','education','3 idiots'] },
  { type: 'social-hero', slug: 'bindeshwar-pathak',        name: "Dr. Bindeshwar Pathak",    subtitle: 'Founder, Sulabh · Sanitation Hero',                 tag: 'Social Hero', icon: '🚿', href: '/social-hero/bindeshwar-pathak',        keywords: ['bindeshwar pathak','sulabh','sanitation','toilet','social hero'] },
  { type: 'social-hero', slug: 'ela-bhatt',                name: "Ela Bhatt",                subtitle: 'Founder, SEWA · Mother of Informal Economy',        tag: 'Social Hero', icon: '🤝', href: '/social-hero/ela-bhatt',                keywords: ['ela bhatt','sewa','women worker','labour','informal economy'] },
  { type: 'social-hero', slug: 'arunachalam-muruganantham',name: "Arunachalam Muruganantham",subtitle: 'Pad Man of India · Low-cost Sanitary Pad Inventor',  tag: 'Social Hero', icon: '🌸', href: '/social-hero/arunachalam-muruganantham',keywords: ['pad man','muruganantham','sanitary pad','women health','social'] },
  { type: 'social-hero', slug: 'rajendra-singh',           name: "Rajendra Singh",           subtitle: 'Waterman of India · Revived 11 Rivers',             tag: 'Social Hero', icon: '💧', href: '/social-hero/rajendra-singh',           keywords: ['rajendra singh','waterman','river','water conservation','social'] },
];

// Keep unfinished editorial entries out of search until their destination exists.
const SEARCHABLE_STATIC_RESULTS = STATIC_RESULTS.filter(({ href }) => href !== '#');

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

type AnyResult = { kind: 'founder'; data: FounderResult } | { kind: 'static'; data: StaticResult };

const TYPE_LABEL: Record<StaticResult['type'], string> = {
  'brand': 'Brand Story',
  'industry': 'Industry Story',
  'social-hero': 'Social Hero',
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [allFounders, setAllFounders] = useState<FounderResult[]>([]);
  const [results, setResults] = useState<AnyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch founders once on open
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setLoading(true);
    fetch('/api/public/founders')
      .then(r => r.ok ? r.json() : [])
      .then((data: FounderResult[]) => {
        setAllFounders(data);
        // Default: show mix of brands, social heroes, industries
        setResults(SEARCHABLE_STATIC_RESULTS.slice(0, 6).map(d => ({ kind: 'static' as const, data: d })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  // Filter as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults(SEARCHABLE_STATIC_RESULTS.slice(0, 6).map(d => ({ kind: 'static' as const, data: d })));
      return;
    }
    const q = query.toLowerCase().trim();

    // Filter founders
    const matchedFounders: AnyResult[] = allFounders
      .filter(f =>
        f.name.toLowerCase().includes(q) ||
        (f.designation && f.designation.toLowerCase().includes(q)) ||
        (f.profileType && f.profileType.toLowerCase().includes(q)) ||
        (f.profileTag && f.profileTag.toLowerCase().includes(q))
      )
      .map(d => ({ kind: 'founder' as const, data: d }));

    // Filter static (brands, industries, social heroes)
    const matchedStatic: AnyResult[] = SEARCHABLE_STATIC_RESULTS
      .filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.keywords.some(k => k.toLowerCase().includes(q))
      )
      .map(d => ({ kind: 'static' as const, data: d }));

    // Merge: founders first, then static, cap at 10
    const merged = [...matchedFounders, ...matchedStatic].slice(0, 10);
    setResults(merged);
  }, [query, allFounders]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const totalIndexed = allFounders.length + SEARCHABLE_STATIC_RESULTS.length;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-2xl mx-auto mt-16 md:mt-24 px-4">
        <div className="bg-white shadow-2xl">

          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
            {loading
              ? <Loader2 className="w-5 h-5 text-gray-400 flex-shrink-0 animate-spin" />
              : <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search founders, brands, industries, social heroes…"
              className="flex-1 text-base text-black placeholder:text-gray-400 outline-none bg-transparent"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-black transition-colors mr-1">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category pills */}
          {!query && (
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {(['brand', 'social-hero', 'industry'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setQuery(type === 'brand' ? 'brand story' : type === 'social-hero' ? 'social hero' : 'industry story')}
                  className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase border border-gray-200 hover:border-black hover:text-[#e50b16] px-3 py-1.5 transition-colors"
                >
                  {TYPE_LABEL[type]}s
                </button>
              ))}
              <button
                onClick={() => setQuery('founder')}
                className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase border border-gray-200 hover:border-black hover:text-[#e50b16] px-3 py-1.5 transition-colors"
              >
                Founders
              </button>
            </div>
          )}

          {/* Results */}
          <div className="max-h-[55vh] overflow-y-auto divide-y divide-gray-100">
            {results.length === 0 && !loading && (
              <div className="px-5 py-10 text-center text-sm text-gray-400">
                {query ? `No results for "${query}"` : 'Start typing to search…'}
              </div>
            )}

            {results.map((r, idx) => {
              if (r.kind === 'founder') {
                const f = r.data;
                return (
                  <a
                    key={`founder-${f.slug}`}
                    href={`/founder/${f.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                  >
                    {f.photoUrl ? (
                      <img src={f.photoUrl} alt={f.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-400">{f.name[0]}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-black group-hover:text-[#e50b16] transition-colors truncate">{f.name}</p>
                      <p className="text-xs text-gray-500 truncate">{f.designation}</p>
                    </div>
                    <span className="hidden sm:inline text-[9px] font-bold tracking-widest uppercase bg-gray-100 text-gray-500 px-2 py-0.5 flex-shrink-0">
                      Founder
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#e50b16] flex-shrink-0 transition-colors" />
                  </a>
                );
              }

              const s = r.data;
              return (
                <a
                  key={`static-${s.type}-${s.slug}-${idx}`}
                  href={s.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center text-xl">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black group-hover:text-[#e50b16] transition-colors truncate">{s.name}</p>
                    <p className="text-xs text-gray-500 truncate">{s.subtitle}</p>
                  </div>
                  <span className={`hidden sm:inline text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 flex-shrink-0 ${
                    s.type === 'brand' ? 'bg-orange-50 text-orange-600' :
                    s.type === 'social-hero' ? 'bg-green-50 text-green-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {s.tag}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#e50b16] flex-shrink-0 transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">{totalIndexed}+ stories indexed</span>
            <span className="text-[11px] text-gray-400">Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-mono">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
