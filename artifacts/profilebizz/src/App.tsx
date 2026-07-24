import React, { useState, useEffect, useRef } from 'react';
import { Search, Share2, Mail, Rss, ChevronLeft, ChevronRight, ChevronDown, Menu, X } from 'lucide-react';
import SearchOverlay from '@/components/SearchOverlay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import FounderProfile from '@/pages/FounderProfile';
import BrandStory, { FEATURED_BRANDS } from '@/pages/BrandStory';
import IndustryStory, { FEATURED_INDUSTRIES } from '@/pages/IndustryStory';
import LocalBusiness, { FEATURED_CITIES } from '@/pages/LocalBusiness';
import SuccessStory, { SUCCESS_CATEGORIES } from '@/pages/SuccessStory';
import SocialImpact, { IMPACT_CATEGORIES } from '@/pages/SocialImpact';
import BusinessNews, { NEWS_CATEGORIES } from '@/pages/BusinessNews';
import SocialHeroProfile from '@/pages/SocialHeroProfile';
import WomenStory from '@/pages/WomenStory';

const queryClient = new QueryClient();

const founderProfiles = [
  { name: 'Zero to One',           icon: '🚀', example: 'How Nithin Kamath Built Zerodha with ₹10 Lakh' },
  { name: 'First Gen Entrepreneur', icon: '💪', example: 'No Family Business, No Investors — Just Grit' },
  { name: 'Women Founder',          icon: '👩‍💼', example: 'She Left a MNC Job to Build India\'s Top EdTech' },
  { name: 'Immigrant Founder',      icon: '✈️', example: 'Left Silicon Valley to Build in Bharat' },
  { name: 'Rural Bharat Founder',   icon: '🌾', example: 'From a UP Village to a ₹50 Cr National Brand' },
  { name: 'Under 30 Millennial',    icon: '⚡', example: '24 Years Old, ₹10 Crore in Revenue, Zero Funding' },
  { name: 'Tech Founder',           icon: '💻', example: 'IIT Dropout Builds India\'s First AI Hardware Chip' },
  { name: 'AI Founder',             icon: '🤖', example: 'How This Founder Is Replacing 50 Jobs with One Model' },
];

const businessStories = [
  { name: 'Startup Story', example: 'How Vedas Agro Started' },
  { name: 'MSME Success Story', example: 'From Small Shop to ₹100 Crore Business' },
  { name: 'Manufacturing Story', example: "India's Fastest Growing Packaging Company" },
  { name: 'Export Business Story', example: 'Made in India, Sold to the World' },
  { name: 'Family Business Story', example: 'Third Generation, New Vision' },
  { name: 'Women Entrepreneur Story', example: 'She Built a ₹50 Crore Brand from Home' },
  { name: 'Rural Business Story', example: 'Village Startup Goes National' },
  { name: 'Social Enterprise Story', example: 'Profit with Purpose in Tier-3 India' },
  { name: 'Franchise Story', example: 'From One Store to 200 Outlets' },
  { name: 'Brand Journey', example: 'How a Local Name Became a National Brand' },
];

interface PublicFounder {
  slug: string;
  name: string;
  designation: string;
  profileType: string | null;
  profileTag: string | null;
  photoUrl: string | null;
  coverPhotoUrl: string | null;
  oneLiner: string | null;
}

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [bizDropdown, setBizDropdown] = useState(false);
  const [founderDropdown, setFounderDropdown] = useState(false);
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [industryDropdown, setIndustryDropdown] = useState(false);
  const [liveFounders, setLiveFounders] = useState<PublicFounder[]>([]);
  const [foundersLoading, setFoundersLoading] = useState(true);
  const [localDropdown, setLocalDropdown] = useState(false);
  const [successDropdown, setSuccessDropdown] = useState(false);
  const [impactDropdown, setImpactDropdown] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle'|'success'|'error'>('idle');
  const bizDropdownRef = useRef<HTMLDivElement>(null);
  const founderDropdownRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const localDropdownRef = useRef<HTMLDivElement>(null);
  const startupScrollRef = useRef<HTMLDivElement>(null);
  const cityScrollRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);

  const scrollToNewsletter = () => {
    setMobileMenuOpen(false);
    newsletterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail.includes('@')) { setSubscribeStatus('error'); return; }
    // Store intent locally + show success (backend email integration can be added later)
    setSubscribeStatus('success');
    setSubscribeEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 4000);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/public/founders')
      .then(r => r.ok ? r.json() : [])
      .then((data: PublicFounder[]) => { setLiveFounders(data); setFoundersLoading(false); })
      .catch(() => setFoundersLoading(false));
  }, []);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black selection:bg-editorial selection:text-white pb-20">
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      
      {/* 1. Sticky Top Navbar */}
      <header className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        {/* Top row: logo + nav + buttons */}
        <div className="border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">

            {/* ── Mobile Header Row 1: hamburger + logo (left) | search + sub (right) ── */}
            <div className="lg:hidden h-14 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="p-1 text-black hover:text-editorial transition-colors"
                  onClick={() => setMobileMenuOpen(o => !o)}
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <a href="/" className="font-serif font-bold text-2xl tracking-tight text-black hover:text-editorial transition-colors">
                  ProfileBizz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setSearchOpen(true)} className="p-1 text-black hover:text-editorial transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
                <button onClick={scrollToNewsletter} className="text-[10px] font-bold tracking-widest uppercase bg-editorial text-white px-2.5 py-1.5 hover:bg-black transition-colors">
                  Sub
                </button>
              </div>
            </div>

            {/* ── Desktop Header ── */}
            <div className="hidden lg:flex h-16 items-center justify-between">
              <div className="flex-shrink-0">
                <span className="font-serif font-bold text-3xl tracking-tight">ProfileBizz</span>
              </div>

              <nav className="flex items-center gap-8 h-full">
              <a href="/social-hero" className="text-sm font-medium h-full flex items-center border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200">
                Social Hero Profile
              </a>

              {/* Founder Story dropdown */}
              <div
                ref={founderDropdownRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => setFounderDropdown(true)}
                onMouseLeave={() => setFounderDropdown(false)}
              >
                <button
                  className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200"
                  aria-expanded={founderDropdown}
                  aria-haspopup="true"
                  onClick={() => setFounderDropdown(prev => !prev)}
                >
                  Founder Story
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${founderDropdown ? 'rotate-180' : ''}`} />
                </button>

                {founderDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[660px] bg-white border border-border shadow-lg z-50 p-6">
                    <div className="border-b border-black pb-3 mb-5">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">Browse by Founder Type</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-1 mb-6">
                      {founderProfiles.map((item, idx) => (
                        <a
                          key={idx}
                          href="/founder/nithin-kamath"
                          className="group flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-xl flex-shrink-0">{item.icon}</span>
                          <div className="min-w-0">
                            <span className="block text-sm font-semibold text-black group-hover:text-editorial transition-colors duration-150">{item.name}</span>
                            <span className="block text-[11px] text-gray-400 mt-0.5 group-hover:text-gray-600 transition-colors duration-150">e.g. {item.example}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase">View All Founder Stories</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Business Stories dropdown */}
              <div
                ref={bizDropdownRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => setBizDropdown(true)}
                onMouseLeave={() => setBizDropdown(false)}
              >
                <button
                  className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200"
                  aria-expanded={bizDropdown}
                  aria-haspopup="true"
                  onClick={() => setBizDropdown(prev => !prev)}
                >
                  Business Stories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${bizDropdown ? 'rotate-180' : ''}`} />
                </button>

                {bizDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white border border-border shadow-lg z-50 p-6">
                    {/* Header */}
                    <div className="border-b border-black pb-3 mb-5">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">Browse by Story Type</span>
                    </div>
                    {/* Grid of categories */}
                    <div className="grid grid-cols-2 gap-x-10 gap-y-1 mb-6">
                      {businessStories.map((item, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="group flex flex-col py-2.5 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-sm font-semibold text-black group-hover:text-editorial transition-colors duration-150">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-gray-400 mt-0.5 group-hover:text-gray-600 transition-colors duration-150">
                            e.g. {item.example}
                          </span>
                        </a>
                      ))}
                    </div>
                    {/* Footer CTA */}
                    <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase">View All Business Stories</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Brand Stories dropdown */}
              <div
                ref={brandDropdownRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => setBrandDropdown(true)}
                onMouseLeave={() => setBrandDropdown(false)}
              >
                <button
                  className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200"
                  aria-expanded={brandDropdown}
                  aria-haspopup="true"
                  onClick={() => setBrandDropdown(prev => !prev)}
                >
                  Brand Stories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${brandDropdown ? 'rotate-180' : ''}`} />
                </button>

                {brandDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-white border border-border shadow-lg z-50 p-6">
                    <div className="border-b border-black pb-3 mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">India's Most Iconic Brands</span>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-editorial">{FEATURED_BRANDS.length} Brands</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {FEATURED_BRANDS.map((brand, idx) => (
                        <a
                          key={idx}
                          href={`/brand/${brand.slug}`}
                          className="group flex items-center gap-3 p-3 border border-gray-100 hover:border-black transition-colors duration-150"
                        >
                          <span className="text-2xl flex-shrink-0">{brand.logo}</span>
                          <div className="min-w-0">
                            <span className="block text-sm font-bold text-black group-hover:text-editorial transition-colors">{brand.name}</span>
                            <span className="block text-[11px] text-gray-400 mt-0.5">{brand.sector} · Est. {brand.founded}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial ml-auto flex-shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                    <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase">View All Brand Stories</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Industry Stories dropdown */}
              <div
                ref={industryDropdownRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => setIndustryDropdown(true)}
                onMouseLeave={() => setIndustryDropdown(false)}
              >
                <button
                  className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200"
                  aria-expanded={industryDropdown}
                  aria-haspopup="true"
                  onClick={() => setIndustryDropdown(prev => !prev)}
                >
                  Industry Stories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${industryDropdown ? 'rotate-180' : ''}`} />
                </button>

                {industryDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-white border border-border shadow-lg z-50 p-6">
                    <div className="border-b border-black pb-3 mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">India's Key Industries — Explained in Depth</span>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-editorial">{FEATURED_INDUSTRIES.length} Industries</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {FEATURED_INDUSTRIES.map((ind, idx) => (
                        <a
                          key={idx}
                          href={`/industry/${ind.slug}`}
                          className="group flex items-center gap-3 px-3 py-2.5 border border-gray-100 hover:border-black transition-colors duration-150"
                        >
                          <span className="text-xl flex-shrink-0">{ind.icon}</span>
                          <div className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-black group-hover:text-editorial transition-colors leading-tight">{ind.name}</span>
                            <span className="block text-[10px] text-gray-400 mt-0.5">{ind.tag} · {ind.size}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-editorial flex-shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                    <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase">View All Industry Stories</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

            </nav>

            <div className="flex items-center gap-6">
              <button onClick={() => setSearchOpen(true)} className="text-foreground hover:text-editorial transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={scrollToNewsletter} className="bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-2.5 hover:bg-editorial transition-colors">
                Subscribe
              </button>
            </div>
            </div>{/* end desktop header */}
          </div>
        </div>

        {/* ── Mobile Category Tab Bar (Row 2) ── */}
        <div className="lg:hidden border-t border-gray-100 overflow-x-auto scrollbar-hide">
          <div className="flex items-center whitespace-nowrap px-1 py-0">
            {[
              { label: 'Social Hero Profile', href: `/social-hero` },
              { label: 'Founder Story',        href: `/founder/nithin-kamath` },
              { label: 'Business Stories',     href: `#` },
              { label: 'Brand Stories',        href: `/brand/${FEATURED_BRANDS[0]?.slug || 'amul'}` },
              { label: 'Industry Stories',     href: `/industry/${FEATURED_INDUSTRIES[0]?.slug || 'steel'}` },
            ].map((tab, i) => (
              <a
                key={i}
                href={tab.href}
                className="inline-block text-[13px] font-semibold text-gray-700 hover:text-editorial transition-colors px-3 py-2.5 border-b-2 border-transparent hover:border-editorial whitespace-nowrap"
              >
                {tab.label}
              </a>
            ))}
            <button className="inline-flex items-center gap-0.5 text-[13px] font-semibold text-gray-700 hover:text-editorial transition-colors px-3 py-2.5 border-b-2 border-transparent hover:border-editorial"
              onClick={() => setMobileMenuOpen(o => !o)}>
              More <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </header>

      {/* ── Mobile Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-14 left-0 right-0 bg-white shadow-xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Browse Categories</span>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Brand Stories */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-3">Brand Stories</p>
              <div className="grid grid-cols-2 gap-2">
                {FEATURED_BRANDS.map(b => (
                  <a key={b.slug} href={`/brand/${b.slug}`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 border border-gray-100 hover:border-black transition-colors">
                    <span className="text-xl">{b.logo}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{b.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{b.sector}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Industry Stories */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-3">Industry Stories</p>
              <div className="grid grid-cols-2 gap-2">
                {FEATURED_INDUSTRIES.map(i => (
                  <a key={i.slug} href={`/industry/${i.slug}`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 border border-gray-100 hover:border-black transition-colors">
                    <span className="text-lg">{i.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{i.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{i.size}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Impact */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-3">Social Impact</p>
              <div className="grid grid-cols-2 gap-2">
                {IMPACT_CATEGORIES.map(c => (
                  <a key={c.slug} href={`/impact/${c.slug}`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 border border-gray-100 hover:border-black transition-colors">
                    <span className="text-lg">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{c.label}</p>
                      <p className="text-[10px] text-gray-400 truncate">{c.tag}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-3">Success Stories</p>
              <div className="grid grid-cols-2 gap-2">
                {SUCCESS_CATEGORIES.map(c => (
                  <a key={c.slug} href={`/success/${c.slug}`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 border border-gray-100 hover:border-black transition-colors">
                    <span className="text-lg">{c.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{c.label}</p>
                      <p className="text-[10px] text-gray-400 truncate">{c.tag}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Founder Stories */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-3">Founder Stories</p>
              <div className="flex flex-col gap-1">
                {[{ slug: 'rajesh-kumar-vedas', name: 'Rajesh Kumar Vedas', tag: 'Bharat Builder' }, { slug: 'nithin-kamath', name: 'Nithin Kamath', tag: 'Zero to One' }].map(f => (
                  <a key={f.slug} href={`/founder/${f.slug}`} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 border border-gray-100 hover:border-black transition-colors">
                    <span className="text-sm font-bold">{f.name}</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-editorial">{f.tag}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="px-5 py-4">
              <button onClick={scrollToNewsletter} className="w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-3 hover:bg-editorial transition-colors">
                Subscribe to ProfileBizz
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-28 md:pt-32">

        {/* ── 2. MAGAZINE HERO BANNER ── */}
        <section className="mb-14">

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black overflow-hidden">

            {/* LEFT: Dark cover panel */}
            <div className="lg:col-span-7 bg-black text-white relative overflow-hidden min-h-[420px] md:min-h-[500px] flex flex-col justify-between p-8 md:p-12">
              {/* Decorative grain overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '150px' }} />

              {/* Founder info */}
              <div className="relative z-10 mt-auto">
                <div className="flex items-end gap-6 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80"
                    alt="Nithin Kamath"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">Zero to One · FinTech</p>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.0] tracking-tight">
                      Nithin Kamath
                    </h2>
                  </div>
                </div>

                <p className="text-sm md:text-base text-white/50 font-medium mb-4">Co-Founder &amp; CEO, Zerodha</p>

                <div className="border-l-2 border-editorial pl-4 mb-7">
                  <p className="font-serif text-lg md:text-xl text-white/80 leading-[1.5] font-medium italic">
                    "₹20 flat fee. Zero outside investors. India's largest retail broker."
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-8">
                  {[
                    { l: 'Revenue', v: '₹8,320 Cr' },
                    { l: 'Clients', v: '73 Lakh+' },
                    { l: 'VC Raised', v: '₹0' },
                  ].map(s => (
                    <div key={s.l} className="border-l border-white/20 pl-3">
                      <p className="text-[9px] font-bold tracking-widest uppercase text-white/30 mb-0.5">{s.l}</p>
                      <p className="font-serif text-base font-bold text-white">{s.v}</p>
                    </div>
                  ))}
                </div>

                <a href="/founder/nithin-kamath"
                  className="inline-flex items-center gap-2 bg-editorial text-white text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors">
                  Read Full Biography
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* RIGHT: Three sidebar stories */}
            <div className="lg:col-span-5 border-l border-black flex flex-col divide-y divide-gray-100">
              <div className="px-6 py-4 bg-[#fafafa] border-b border-black">
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-gray-400">Also This Week</p>
              </div>

              {[
                {
                  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
                  name: 'Rajesh Kumar Vedas',
                  designation: 'Vedas Agro Industries',
                  tag: 'Bharat Builder',
                  tagline: 'From a UP village to ₹210 Cr revenue — and 18,000 farmer partners.',
                  href: '/founder/rajesh-kumar-vedas',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
                  name: 'Falguni Nayar',
                  designation: 'Founder & CEO, Nykaa',
                  tag: 'Women Founder',
                  tagline: 'Built India\'s first profitable beauty unicorn at 50 — ₹50,000 Cr market cap.',
                  href: '#',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
                  name: 'Deepinder Goyal',
                  designation: 'Founder & CEO, Zomato',
                  tag: 'D2C Pioneer',
                  tagline: 'From a free menu site to India\'s dominant food-delivery platform.',
                  href: '#',
                },
              ].map((f, i) => (
                <a key={i} href={f.href}
                  className="group flex items-start gap-4 px-6 py-5 bg-white hover:bg-[#fafafa] transition-colors flex-1">
                  <img src={f.photo} alt={f.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-100 group-hover:ring-2 group-hover:ring-editorial transition-all" />
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[9px] font-bold tracking-widest uppercase text-editorial mb-1">{f.tag}</span>
                    <h3 className="font-serif text-base font-bold text-black leading-snug mb-0.5 group-hover:text-editorial transition-colors">{f.name}</h3>
                    <p className="text-[11px] text-gray-400 font-medium mb-1.5">{f.designation}</p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{f.tagline}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial flex-shrink-0 mt-1 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Category Quick Strip ── */}
        <section className="mb-14">
          <div className="flex items-center gap-px overflow-x-auto scrollbar-hide">
            {[
              { label: '🚀 Zero to One', href: '#' },
              { label: '👩‍💼 Women Founders', href: '#' },
              { label: '🌾 Bharat Builders', href: '#' },
              { label: '💻 Tech Founders', href: '#' },
              { label: '🤖 AI Founders', href: '#' },
              { label: '⚡ Under 30', href: '#' },
              { label: '🏭 Manufacturing', href: '#' },
              { label: '🌍 Social Hero', href: '/social-hero' },
            ].map((c, i) => (
              <a key={i} href={c.href}
                className="flex-shrink-0 text-[11px] font-bold tracking-wide uppercase bg-white border border-gray-200 hover:border-black hover:text-editorial px-4 py-2.5 transition-colors whitespace-nowrap">
                {c.label}
              </a>
            ))}
          </div>
        </section>


        {/* ── 3. BROWSE BY FOUNDER TYPE ── */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between border-b border-black pb-4 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Browse by Founder Type</h2>
            <a href="#" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-editorial transition-colors">
              View All →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
            {[
              { icon: '🚀', type: 'Zero to One',        desc: 'First-generation founders who started from scratch',         count: '24 Profiles' },
              { icon: '👩‍💼', type: 'Women Founders',     desc: 'Indian women who built businesses against the odds',         count: '18 Profiles' },
              { icon: '🌾', type: 'Bharat Builders',    desc: 'Rural & Tier-2 entrepreneurs rewriting the script',           count: '31 Profiles' },
              { icon: '💻', type: 'Tech Founders',      desc: 'Engineers & product thinkers who scaled globally',            count: '42 Profiles' },
              { icon: '🤖', type: 'AI Founders',        desc: 'Building India\'s next wave with artificial intelligence',     count: '15 Profiles' },
              { icon: '✈️', type: 'Immigrant Founders', desc: 'Left abroad to build in Bharat — or vice versa',              count: '11 Profiles' },
              { icon: '⚡', type: 'Under 30',           desc: 'Young founders who didn\'t wait for permission',              count: '19 Profiles' },
              { icon: '💪', type: 'First-Gen Entrep.',  desc: 'No family business. No safety net. Just grit.',              count: '27 Profiles' },
            ].map((cat, i) => (
              <div key={i} className="bg-white px-5 py-6 group cursor-pointer hover:bg-[#f5f0ee] transition-colors">
                <span className="text-3xl block mb-3">{cat.icon}</span>
                <h4 className="font-serif text-base font-bold text-black group-hover:text-editorial transition-colors mb-1 leading-snug">{cat.type}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{cat.desc}</p>
                <span className="text-[10px] font-bold tracking-widest uppercase text-editorial">{cat.count}</span>
              </div>
            ))}
          </div>
        </section>


        {/* ── 4. RECENTLY ADDED PROFILES ── */}
        <section className="mb-16">
          <div className="flex items-end justify-between border-b border-black pb-4 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Recently Added</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollLeft(startupScrollRef)}
                className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-black transition-colors"
                aria-label="Scroll left">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scrollRight(startupScrollRef)}
                className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-black transition-colors"
                aria-label="Scroll right">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={startupScrollRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {foundersLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[260px] md:min-w-[300px] snap-start bg-white border border-gray-100 p-5 animate-pulse flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-16" />
                      <div className="h-3 bg-gray-100 rounded w-24" />
                    </div>
                  </div>
                  <div className="h-5 bg-gray-100 rounded mb-2" />
                  <div className="h-3 bg-gray-100 rounded mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              ))
            ) : liveFounders.length > 0 ? (
              liveFounders.map((f, i) => (
                <a key={i} href={`/founder/${f.slug}`}
                  className="min-w-[260px] md:min-w-[300px] snap-start group flex flex-col bg-white border border-gray-100 hover:border-black transition-colors p-5 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={f.photoUrl || f.coverPhotoUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80'}
                      alt={f.name}
                      className="w-14 h-14 rounded-full object-cover border border-gray-100 flex-shrink-0 group-hover:ring-2 group-hover:ring-editorial transition-all"
                    />
                    <div className="min-w-0">
                      <span className="inline-block text-[9px] font-bold tracking-widest uppercase text-white bg-editorial px-2 py-0.5 mb-1">New</span>
                      <p className="text-[10px] font-bold tracking-wider uppercase text-editorial leading-none">{f.profileTag || f.profileType || 'Founder'}</p>
                    </div>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-black leading-snug mb-1 group-hover:text-editorial transition-colors">{f.name}</h4>
                  <p className="text-xs text-gray-500 font-medium mb-3">{f.designation}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{f.oneLiner || 'Read the full profile on ProfileBizz.'}</p>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-gray-400 group-hover:text-editorial transition-colors">
                    Read Biography <ChevronRight className="w-3 h-3" />
                  </div>
                </a>
              ))
            ) : (
              <div className="min-w-[300px] snap-start bg-white border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-3">📖</span>
                <p className="text-sm font-bold text-gray-700 mb-1">Profiles Coming Soon</p>
                <p className="text-xs text-gray-400">Our editorial team is adding founder stories.</p>
              </div>
            )}
          </div>
        </section>


        {/* ── 5. FEATURED PROFILES GRID ── */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between border-b border-black pb-4 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Editor's Selection</h2>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Curated Biographies</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Large card */}
            <a href="/founder/nithin-kamath"
              className="lg:col-span-5 group bg-black text-white p-8 flex flex-col justify-between min-h-[340px] hover:bg-editorial transition-colors cursor-pointer">
              <div>
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80"
                  alt="Nithin Kamath"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20 mb-6" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 block mb-3">Zero to One · FinTech</span>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-4">Nithin Kamath</h3>
                <p className="text-sm text-white/60 font-medium mb-4">Co-Founder &amp; CEO, Zerodha</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  The man who charged ₹20 flat while everyone else charged a percentage — and built India's largest retail broker without a single outside investor.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-white/50 group-hover:text-white transition-colors mt-6">
                Read Full Biography <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Small cards col */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
                  name: 'Rajesh Kumar Vedas',
                  designation: 'Vedas Agro Industries',
                  tag: 'Bharat Builder · Agri',
                  tagline: 'From a rented shed in Unnao to ₹210 Cr revenue — and 18,000 farmers paid on time.',
                  href: '/founder/rajesh-kumar-vedas',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
                  name: 'Falguni Nayar',
                  designation: 'Nykaa',
                  tag: 'Women Founder · D2C',
                  tagline: 'Quit investment banking at 49 to build beauty commerce. Became India\'s richest self-made woman.',
                  href: '#',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
                  name: 'Deepinder Goyal',
                  designation: 'Zomato',
                  tag: 'D2C Pioneer · FoodTech',
                  tagline: 'Started by photographing restaurant menus. Built a ₹1.5 lakh Cr company that feeds 20 million Indians daily.',
                  href: '#',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
                  name: 'Ritesh Agarwal',
                  designation: 'OYO Rooms',
                  tag: 'Under 30 · Hospitality',
                  tagline: 'India\'s youngest self-made billionaire. Built a global hotel network from a rented room in Delhi.',
                  href: '#',
                },
              ].map((f, i) => (
                <a key={i} href={f.href}
                  className="group bg-white border border-gray-100 hover:border-black transition-colors p-5 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={f.photo} alt={f.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-100 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-wider uppercase text-editorial leading-none mb-0.5">{f.tag}</p>
                      <p className="text-xs text-gray-500 truncate">{f.designation}</p>
                    </div>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-black group-hover:text-editorial transition-colors leading-snug mb-2">{f.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">{f.tagline}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-gray-400 group-hover:text-editorial transition-colors">
                    Read Biography <ChevronRight className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* ── 6. Newsletter Banner ── */}
        <section ref={newsletterRef} id="newsletter" className="bg-black text-white p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center gap-12 justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-editorial block mb-4">Weekly Founder Digest</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">One New Biography. Every Week.</h2>
            <p className="text-white/60 md:text-lg leading-relaxed">
              Deep-dive founder biographies from Bharat's most remarkable builders — delivered to your inbox every Monday morning.
            </p>
          </div>
          <div className="w-full max-w-md">
            {subscribeStatus === 'success' ? (
              <div className="border border-editorial px-6 py-4 text-center">
                <p className="text-editorial font-bold tracking-wide text-sm mb-1">✓ You're subscribed!</p>
                <p className="text-white/60 text-sm">We'll send your first digest next Monday.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <label htmlFor="newsletter-email" className="text-[11px] font-bold tracking-widest uppercase text-white/40 block mb-2">
                  Your Email Address
                </label>
                <div className="flex items-end gap-4">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={subscribeEmail}
                    onChange={e => setSubscribeEmail(e.target.value)}
                    placeholder="you@company.in"
                    className={`w-full bg-transparent border-b-2 py-2 focus:outline-none text-lg text-white transition-colors placeholder:text-white/30 ${subscribeStatus === 'error' ? 'border-red-500' : 'border-white/20 focus:border-editorial'}`}
                  />
                  <button type="submit" className="bg-editorial text-white text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors flex-shrink-0">
                    Subscribe
                  </button>
                </div>
                {subscribeStatus === 'error' && (
                  <p className="text-red-400 text-xs mt-2">Please enter a valid email address.</p>
                )}
              </form>
            )}
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="bg-white border-t-4 border-black pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Col */}
            <div className="md:col-span-4">
              <span className="font-serif font-bold text-3xl tracking-tight block mb-4">ProfileBizz India</span>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                The authoritative voice covering Bharat's new economy. Curated narratives for the ambitious.
              </p>
              <div className="flex gap-4">
                <button aria-label="Share on social media" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button aria-label="Contact by email" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
                <button aria-label="Subscribe to RSS feed" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                  <Rss className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Company Links */}
            <div className="md:col-span-2">
              <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Company</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Contact Editorial</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Advertise</a></li>
              </ul>
            </div>

            {/* Explore Links */}
            <div className="md:col-span-3">
              <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Explore</h5>
              <div className="grid grid-cols-2 gap-3">
                <ul className="flex flex-col gap-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Profile Story</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Startup Story</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Social Hero</a></li>
                </ul>
                <ul className="flex flex-col gap-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Bengaluru</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Mumbai</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Delhi NCR</a></li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="md:col-span-3">
              <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Categories</h5>
              <div className="grid grid-cols-2 gap-3">
                <ul className="flex flex-col gap-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Bharat Tech</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">FinTech Pulse</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">D2C Markets</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Cloud & Infra</a></li>
                </ul>
                <ul className="flex flex-col gap-3">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Founders</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">WealthTech</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Mobility</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Agritech</a></li>
                </ul>
              </div>
            </div>

            {/* Legal Links */}
            <div className="md:col-span-3">
              <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-black">Legal</h5>
              <ul className="flex flex-col gap-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-editorial transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2024 ProfileBizz India. All rights reserved.</p>
            <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">MUMBAI · BENGALURU · DELHI NCR</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/founder/:slug" component={FounderProfile} />
      <Route path="/founder/hi/:slug">
        {(params) => <FounderProfile params={params as { slug: string }} locale="hi" />}
      </Route>
      <Route path="/brand/:slug" component={BrandStory} />
      <Route path="/industry/:slug" component={IndustryStory} />
      <Route path="/local/:slug" component={LocalBusiness} />
      <Route path="/success/:slug" component={SuccessStory} />
      <Route path="/impact/:slug" component={SocialImpact} />
      <Route path="/news/:slug" component={BusinessNews} />
      <Route path="/social-hero" component={SocialHeroProfile} />
      <Route path="/social-hero/:slug" component={SocialHeroProfile} />
      <Route path="/social-hero/hi/:slug">
        {(params) => <SocialHeroProfile params={params as { slug: string }} locale="hi" />}
      </Route>
      <Route path="/women-story" component={WomenStory} />
      <Route path="/women-story/:slug" component={WomenStory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
