import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown, Menu, X, Globe, User, Building2, Tag, Factory, Users, Rocket, Wheat, Laptop, Bot, Plane, Zap, Dumbbell, Heart } from 'lucide-react';
import SearchOverlay from '@/components/SearchOverlay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import {
  FEATURED_BRANDS,
  FEATURED_INDUSTRIES,
  FEATURED_CITIES,
  SUCCESS_CATEGORIES,
  IMPACT_CATEGORIES,
  NEWS_CATEGORIES,
} from '@/data/navData';
import { ChunkErrorBoundary } from '@/components/ChunkErrorBoundary';
import { Reveal } from '@/components/Reveal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SiteFooter } from '@/components/SiteFooter';
import SocialHeroProfile from '@/pages/SocialHeroProfile';

// ── Lazy-loaded page components (separate JS chunks, load on demand) ──────────
const NotFound          = React.lazy(() => import('@/pages/not-found'));
const FounderProfile    = React.lazy(() => import('@/pages/FounderProfile'));
const BrandStory        = React.lazy(() => import('@/pages/BrandStory'));
const IndustryStory     = React.lazy(() => import('@/pages/IndustryStory'));
const LocalBusiness     = React.lazy(() => import('@/pages/LocalBusiness'));
const SuccessStory      = React.lazy(() => import('@/pages/SuccessStory'));
const SocialImpact      = React.lazy(() => import('@/pages/SocialImpact'));
const BusinessNews      = React.lazy(() => import('@/pages/BusinessNews'));
const WomenStory        = React.lazy(() => import('@/pages/WomenStory'));

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

const WOMEN_PROFILE_SLUGS = new Set([
  'falguni-nayar',
  'kiran-mazumdar-shaw',
  'vandana-luthra',
  'priya-paul',
  'indra-nooyi',
  'jyoti-naik',
]);

function publicProfileHref(profile: PublicFounder): string {
  if (profile.profileType === 'industry') return `/industry/${profile.slug}`;
  if (profile.profileType === 'brand') return `/brand/${profile.slug}`;
  if (profile.profileType === 'social-hero') return `/social-hero/${profile.slug}`;
  if (WOMEN_PROFILE_SLUGS.has(profile.slug)) return `/women-story/${profile.slug}`;
  return `/founder/${profile.slug}`;
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
  const [subscribeStatus, setSubscribeStatus] = useState<'idle'|'invalid'|'unavailable'>('idle');
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
    if (!subscribeEmail.includes('@')) {
      setSubscribeStatus('invalid');
      return;
    }
    // Do not claim a subscription was stored until a newsletter service is connected.
    setSubscribeStatus('unavailable');
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

  useScrollReveal([liveFounders.length]);

  // Fixed editorial selection: one cover story and three stories inside the edition.
  const magazineSlugs = ['anshu-gupta', 'rajesh-kumar-vedas', 'nithin-kamath', 'falguni-nayar'];
  const magazineProfiles = magazineSlugs
    .map(slug => liveFounders.find(founder => founder.slug === slug))
    .filter((founder): founder is PublicFounder => Boolean(founder));
  const currentHero = magazineProfiles[0] || liveFounders[0] || null;
  const sidebarFounders = magazineProfiles.slice(1, 4);

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
    <div className="min-h-screen overflow-x-hidden bg-[#f9f9f9] text-black selection:bg-editorial selection:text-white pb-20">
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
                          href="/success/business-growth"
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
              { label: 'Business Stories',     href: `/success/business-growth` },
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

          {/* Static magazine cover grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black overflow-hidden">

            {/* LEFT: Dark cover panel */}
            <div className="lg:col-span-7 bg-black text-white relative overflow-hidden min-h-[420px] md:min-h-[500px] flex flex-col justify-between p-8 md:p-12">
              {/* Decorative grain overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '150px' }} />
              <div className="relative z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                <span>ProfileBizz Magazine</span>
                <span>Cover Story</span>
              </div>

              {/* Founder info */}
              <div className="relative z-10 mt-auto">
                <div className="flex items-end gap-6 mb-6">
                  <img
                    src={currentHero?.photoUrl || '/nithin-kamath.webp'}
                    alt={currentHero?.name || 'Nithin Kamath'}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
                      {currentHero?.profileTag || currentHero?.profileType || 'Zero to One · FinTech'}
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.0] tracking-tight">
                      {currentHero?.name || 'Nithin Kamath'}
                    </h1>
                  </div>
                </div>

                <p className="text-sm md:text-base text-white/50 font-medium mb-4">
                  {currentHero?.designation || 'Co-Founder & CEO, Zerodha'}
                </p>

                <div className="border-l-2 border-editorial pl-4 mb-7">
                  <p className="font-serif text-lg md:text-xl text-white/80 leading-[1.5] font-medium italic">
                    "{currentHero?.oneLiner || "The founder who built India's largest retail broker without outside funding."}"
                  </p>
                </div>

                <a href={currentHero ? publicProfileHref(currentHero) : '/founder/nithin-kamath'}
                  className="inline-flex items-center gap-2 bg-editorial text-white text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors">
                  Read Full Biography
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* RIGHT: Other founder stories (dynamic) */}
            <div className="lg:col-span-5 border-l border-black flex flex-col divide-y divide-gray-100">
              <div className="px-6 py-4 bg-[#fafafa] border-b border-black">
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-gray-400">Inside This Edition</p>
              </div>

              {sidebarFounders.length > 0 ? sidebarFounders.map((f, i) => (
                <a key={i} href={publicProfileHref(f)}
                  className="group flex items-start gap-4 px-6 py-5 bg-white hover:bg-[#fafafa] transition-colors flex-1">
                  <img src={f.photoUrl || f.coverPhotoUrl || '/nithin-kamath.webp'} alt={f.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-100 group-hover:ring-2 group-hover:ring-editorial transition-all" />
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[9px] font-bold tracking-widest uppercase text-editorial mb-1">
                      {f.profileTag || f.profileType || 'Founder'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-black leading-snug mb-0.5 group-hover:text-editorial transition-colors">{f.name}</h3>
                    <p className="text-[11px] text-gray-400 font-medium mb-1.5">{f.designation}</p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{f.oneLiner || ''}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial flex-shrink-0 mt-1 transition-colors" />
                </a>
              )) : (
                /* Placeholder rows while loading or only one founder */
                foundersLoading ? (
                  [0,1,2].map(i => (
                    <div key={i} className="flex items-start gap-4 px-6 py-5 flex-1 animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-2 bg-gray-100 rounded w-1/3" />
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                        <div className="h-2 bg-gray-100 rounded w-full" />
                      </div>
                    </div>
                  ))
                ) : (
                  /* Editorial placeholders when only one founder exists */
                  <>
                    {[
                      { name: 'Anshu Gupta', tag: 'Social Hero', role: 'Founder, Goonj', photo: '/anshu-gupta.webp', href: '/social-hero/anshu-gupta', teaser: 'From 67 clothes to 5 million lives — the man who turned urban surplus into rural dignity.' },
                      { name: 'Arunachalam Muruganantham', tag: 'Social Hero', role: 'Pad Man of India', photo: '/arunachalam-muruganantham.webp', href: '/social-hero/arunachalam-muruganantham', teaser: 'A school dropout who built a ₹500 Cr sanitary pad revolution — and gave it all away.' },
                      { name: 'Ela Bhatt', tag: 'Women Founder', role: 'Founder, SEWA', photo: '/ela-bhatt.webp', href: '/social-hero/ela-bhatt', teaser: '2.5 million self-employed women. One quiet lawyer from Ahmedabad who believed they deserved more.' },
                    ].map((f, i) => (
                      <a key={i} href={f.href}
                        className="group flex items-start gap-4 px-6 py-5 bg-white hover:bg-[#fafafa] transition-colors flex-1">
                        <img src={f.photo} alt={f.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-100 group-hover:ring-2 group-hover:ring-editorial transition-all" />
                        <div className="min-w-0 flex-1">
                          <span className="inline-block text-[9px] font-bold tracking-widest uppercase text-editorial mb-1">{f.tag}</span>
                          <h3 className="font-serif text-base font-bold text-black leading-snug mb-0.5 group-hover:text-editorial transition-colors">{f.name}</h3>
                          <p className="text-[11px] text-gray-400 font-medium mb-1.5">{f.role}</p>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{f.teaser}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial flex-shrink-0 mt-1 transition-colors" />
                      </a>
                    ))}
                  </>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── Categories Section ── */}
        <section className="mb-14">
          <div data-reveal="up" className="flex items-baseline justify-between border-b border-black pb-3 mb-6">
            <h2 className="font-serif text-xl md:text-2xl font-bold">Explore Categories</h2>
          </div>
          <div data-reveal="up" data-delay="120" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200">
            {[
              { Icon: Heart,     label: 'Social Hero Profile', desc: 'Changemakers & impact leaders',   href: '/social-hero' },
              { Icon: User,      label: 'Founder Story',       desc: 'Zero to one journeys',            href: '/founder/nithin-kamath' },
              { Icon: Building2, label: 'Business Stories',    desc: 'MSMEs, startups & scale-ups',     href: '/success/business-growth' },
              { Icon: Tag,       label: 'Brand Stories',       desc: "India's iconic brand journeys",   href: `/brand/${FEATURED_BRANDS[0]?.slug || 'amul'}` },
              { Icon: Factory,   label: 'Industry Stories',    desc: 'Sector deep-dives & analysis',    href: `/industry/${FEATURED_INDUSTRIES[0]?.slug || 'steel'}` },
              { Icon: Users,     label: 'Women Story',         desc: 'Women who redefined the rules',   href: '/women-story' },
            ].map(({ Icon, label, desc, href }, i) => (
              <a key={i} href={href}
                className="group flex flex-col px-5 py-6 bg-white hover:bg-[#f5f0ee] border-2 border-transparent hover:border-editorial transition-colors cursor-pointer">
                <Icon className="w-7 h-7 text-gray-400 group-hover:text-editorial transition-colors mb-3" strokeWidth={1.5} />
                <h4 className="font-serif text-base font-bold leading-snug mb-1 text-black group-hover:text-editorial transition-colors">{label}</h4>
                <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
              </a>
            ))}
          </div>
        </section>


        {/* ── 3. BROWSE BY FOUNDER TYPE ── */}
        <section className="mb-16">
          <div data-reveal="up" className="flex items-baseline justify-between border-b border-black pb-4 mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Browse by Founder Type</h2>
            <a href="/founder/nithin-kamath" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-editorial transition-colors">
              Featured Profile →
            </a>
          </div>

          <div data-reveal="up" data-delay="120" className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
            {[
              { Icon: Rocket,   type: 'Zero to One',        desc: 'First-generation founders who started from scratch',      count: '24 Profiles', href: '/founder/nithin-kamath' },
              { Icon: Users,    type: 'Women Founders',     desc: 'Indian women who built businesses against the odds',       count: '18 Profiles', href: '/women-story' },
              { Icon: Wheat,    type: 'Bharat Builders',    desc: 'Rural & Tier-2 entrepreneurs rewriting the script',       count: '31 Profiles', href: '/founder/rajesh-kumar-vedas' },
              { Icon: Laptop,   type: 'Tech Founders',      desc: 'Engineers & product thinkers who scaled globally',        count: '42 Profiles', href: '/industry/it' },
              { Icon: Bot,      type: 'AI Founders',        desc: "Building India's next wave with artificial intelligence",  count: '15 Profiles', href: '/industry/it' },
              { Icon: Plane,    type: 'Immigrant Founders', desc: 'Left abroad to build in Bharat — or vice versa',          count: '11 Profiles', href: '/founder/nithin-kamath' },
              { Icon: Zap,      type: 'Under 30',           desc: "Young founders who didn't wait for permission",           count: '19 Profiles', href: '/success/startup-success' },
              { Icon: Dumbbell, type: 'First-Gen Entrep.',  desc: 'No family business. No safety net. Just grit.',          count: '27 Profiles', href: '/success/business-growth' },
            ].map(({ Icon, type, desc, count, href }, i) => (
              <a key={i} href={href} className="bg-white px-5 py-7 group cursor-pointer hover:bg-[#f5f0ee] hover:border-editorial border-2 border-transparent transition-colors flex flex-col">
                <Icon className="w-7 h-7 text-gray-400 group-hover:text-editorial transition-colors mb-4" strokeWidth={1.5} />
                <h4 className="font-serif text-lg font-bold text-black group-hover:text-editorial transition-colors mb-2 leading-snug">{type}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{desc}</p>
                <span className="text-xs font-bold tracking-widest uppercase text-editorial">{count}</span>
              </a>
            ))}
          </div>
        </section>


        {/* ── 4. RECENTLY ADDED PROFILES ── */}
        <section className="mb-16">
          <div data-reveal="up" className="flex items-end justify-between border-b border-black pb-4 mb-8">
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

          <div ref={startupScrollRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
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
                <a key={i} href={publicProfileHref(f)}
                  className="w-[220px] flex-shrink-0 snap-start group flex flex-col bg-white border border-gray-100 hover:border-black transition-colors p-4 overflow-hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={f.photoUrl || f.coverPhotoUrl || '/nithin-kamath.webp'}
                      alt={f.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0 group-hover:ring-2 group-hover:ring-editorial transition-all"
                    />
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="inline-block text-[8px] font-bold tracking-widest uppercase text-white bg-editorial px-1.5 py-0.5 mb-0.5">New</span>
                      <p className="text-[9px] font-bold tracking-wider uppercase text-editorial leading-tight truncate">{f.profileTag || f.profileType || 'Founder'}</p>
                    </div>
                  </div>
                  <h4 className="font-serif text-base font-bold text-black leading-snug mb-0.5 group-hover:text-editorial transition-colors line-clamp-2">{f.name}</h4>
                  <p className="text-[11px] text-gray-500 font-medium mb-2 truncate">{f.designation}</p>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 flex-1">{f.oneLiner || 'Read the full profile on ProfileBizz.'}</p>
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-gray-400 group-hover:text-editorial transition-colors">
                    Read Biography <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                </a>
              ))
            ) : null}
          </div>
        </section>


        {/* ── 5. FEATURED PROFILES GRID ── */}
        <section className="mb-16">
          <div data-reveal="up" className="border-b border-black pb-4 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">Editor's Selection</h2>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Curated Biographies</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Large card */}
            <a href="/founder/nithin-kamath" data-reveal="left"
              className="lg:col-span-5 group bg-black text-white p-8 flex flex-col justify-between min-h-[340px] hover:bg-editorial transition-colors cursor-pointer">
              <div>
                <img src="/nithin-kamath.webp"
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
            <div data-reveal="right" data-delay="150" className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  href: '/women-story/falguni-nayar',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
                  name: 'Deepinder Goyal',
                  designation: 'Zomato',
                  tag: 'D2C Pioneer · FoodTech',
                  tagline: 'Started by photographing restaurant menus. Built a ₹1.5 lakh Cr company that feeds 20 million Indians daily.',
                  href: '/industry/fmcg',
                },
                {
                  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
                  name: 'Ritesh Agarwal',
                  designation: 'OYO Rooms',
                  tag: 'Under 30 · Hospitality',
                  tagline: 'India\'s youngest self-made billionaire. Built a global hotel network from a rented room in Delhi.',
                  href: '/success/startup-success',
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
          <div data-reveal="left" className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-editorial block mb-4">Weekly Founder Digest</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-white">One New Biography. Every Week.</h2>
            <p className="text-white/60 md:text-lg leading-relaxed">
              Deep-dive founder biographies from Bharat's most remarkable builders — delivered to your inbox every Monday morning.
            </p>
          </div>
          <div data-reveal="right" data-delay="100" className="w-full max-w-md">
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
                    className={`w-full bg-transparent border-b-2 py-2 focus:outline-none text-lg text-white transition-colors placeholder:text-white/30 ${subscribeStatus !== 'idle' ? 'border-red-500' : 'border-white/20 focus:border-editorial'}`}
                  />
                  <button type="submit" className="bg-editorial text-white text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors flex-shrink-0">
                    Subscribe
                  </button>
                </div>
                {subscribeStatus === 'invalid' && (
                  <p className="text-red-400 text-xs mt-2">Please enter a valid email address.</p>
                )}
                {subscribeStatus === 'unavailable' && (
                  <p className="text-amber-300 text-xs mt-2">Newsletter subscriptions are being activated. Please try again shortly.</p>
                )}
              </form>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}

function Router() {
  return (
    <ChunkErrorBoundary>
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
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
    </Suspense>
    </ChunkErrorBoundary>
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
