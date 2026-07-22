import React, { useState, useEffect, useRef } from 'react';
import { Search, Share2, Mail, Rss, ChevronLeft, ChevronRight, ChevronDown, Menu, X } from 'lucide-react';
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

const queryClient = new QueryClient();

const founderProfiles = [
  { name: 'Startup Founder', tag: 'Zero to One', example: 'How Rahul Built a ₹10 Cr App from His Bedroom' },
  { name: 'Serial Entrepreneur', tag: 'Multi-Venture', example: '5 Companies, 1 Vision — The Rohit Mehta Story' },
  { name: 'First-Gen Entrepreneur', tag: 'New Blood', example: 'No Family Business, No Investors — Just Grit' },
  { name: 'Rural Founder', tag: 'Bharat Builder', example: 'From a UP Village to a National Supply Chain' },
  { name: 'Women Founder', tag: 'Trailblazer', example: 'She Left a MNC Job to Build India\'s Top EdTech' },
  { name: 'Young Founder (Under 30)', tag: 'Gen Z CEO', example: '22 Years Old, ₹5 Crore in Revenue' },
  { name: 'Immigrant Founder', tag: 'NRI Returns', example: 'Left Silicon Valley to Build in Bharat' },
  { name: 'Second-Gen Business Leader', tag: 'New Chapter', example: 'How He Took His Father\'s Shop Global' },
  { name: 'Social Entrepreneur', tag: 'Impact First', example: 'Profit is a By-product — Purpose is the Product' },
  { name: 'Tech Founder', tag: 'Deep Tech', example: 'IIT Dropout Builds India\'s First AI Hardware Chip' },
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

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [bizDropdown, setBizDropdown] = useState(false);
  const [founderDropdown, setFounderDropdown] = useState(false);
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [industryDropdown, setIndustryDropdown] = useState(false);
  const [localDropdown, setLocalDropdown] = useState(false);
  const [successDropdown, setSuccessDropdown] = useState(false);
  const [impactDropdown, setImpactDropdown] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bizDropdownRef = useRef<HTMLDivElement>(null);
  const founderDropdownRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const localDropdownRef = useRef<HTMLDivElement>(null);
  const startupScrollRef = useRef<HTMLDivElement>(null);
  const cityScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black selection:bg-editorial selection:text-white pb-20">
      
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
                <button className="p-1 text-black hover:text-editorial transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
                <button className="text-[10px] font-bold tracking-widest uppercase bg-editorial text-white px-2.5 py-1.5 hover:bg-black transition-colors">
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
              {[
                { name: 'Social Hero Profile', active: false },
                { name: 'Women Story', active: false },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`text-sm font-medium h-full flex items-center border-b-2 transition-colors duration-200 hover:text-editorial ${link.active ? 'border-editorial text-editorial' : 'border-transparent text-foreground'}`}
                >
                  {link.name}
                </a>
              ))}

              {/* Business Stories dropdown */}
              <div
                ref={bizDropdownRef}
                className="relative h-full flex items-center"
                onMouseEnter={() => setBizDropdown(true)}
                onMouseLeave={() => setBizDropdown(false)}
              >
                <button className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200">
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
                <button className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200">
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
                <button className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200">
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

              {/* Social Impact Stories dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setImpactDropdown(true)}
                onMouseLeave={() => setImpactDropdown(false)}
              >
                <button className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200">
                  Social Impact
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${impactDropdown ? 'rotate-180' : ''}`} />
                </button>

                {impactDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-white border border-border shadow-lg z-50 p-6">
                    <div className="border-b border-black pb-3 mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">NGOs, CSR & Changemakers Shaping India</span>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-editorial">{IMPACT_CATEGORIES.length} Categories</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {IMPACT_CATEGORIES.map((cat, idx) => (
                        <a
                          key={idx}
                          href={`/impact/${cat.slug}`}
                          className="group flex items-center gap-3 p-3 border border-gray-100 hover:border-black transition-colors duration-150"
                        >
                          <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                          <div className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-black group-hover:text-editorial transition-colors">{cat.label}</span>
                            <span className="block text-[10px] text-gray-400 mt-0.5">{cat.tag}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial flex-shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                    <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase">Explore All Social Impact Stories</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Success Stories dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setSuccessDropdown(true)}
                onMouseLeave={() => setSuccessDropdown(false)}
              >
                <button className="text-sm font-medium h-full flex items-center gap-1 border-b-2 border-transparent hover:border-editorial hover:text-editorial transition-colors duration-200">
                  Success Stories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${successDropdown ? 'rotate-180' : ''}`} />
                </button>

                {successDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] bg-white border border-border shadow-lg z-50 p-6">
                    <div className="border-b border-black pb-3 mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">Real Stories. Real Results. Verified.</span>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-editorial">{SUCCESS_CATEGORIES.length} Categories</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {SUCCESS_CATEGORIES.map((cat, idx) => (
                        <a
                          key={idx}
                          href={`/success/${cat.slug}`}
                          className="group flex items-center gap-3 p-3 border border-gray-100 hover:border-black transition-colors duration-150"
                        >
                          <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                          <div className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-black group-hover:text-editorial transition-colors">{cat.label}</span>
                            <span className="block text-[10px] text-gray-400 mt-0.5">{cat.tag}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial flex-shrink-0 transition-colors" />
                        </a>
                      ))}
                    </div>
                    <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest uppercase">Explore All Success Stories</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

            </nav>

            <div className="flex items-center gap-6">
              <button className="text-foreground hover:text-editorial transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-2.5 hover:bg-editorial transition-colors">
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
              { label: 'Brand Stories',    href: `/brand/${FEATURED_BRANDS[0]?.slug || 'amul'}` },
              { label: 'Industry Stories', href: `/industry/${FEATURED_INDUSTRIES[0]?.slug || 'steel'}` },
              { label: 'Success Stories',  href: `/success/business-growth` },
              { label: 'Social Impact',    href: `/impact/ngo` },
              { label: 'Founders',         href: `/founder/rajesh-kumar-vedas` },
              { label: 'Business News',    href: `/news/funding` },
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
              <button className="w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-3 hover:bg-editorial transition-colors">
                Subscribe to ProfileBizz
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-36">
        
        {/* 2. Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b-[3px] border-black pb-12 mb-12">
          
          {/* Left Column - Main Story */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="w-full aspect-[16/9] overflow-hidden mb-6 bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600" 
                alt="Bengaluru tech office" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-widest text-editorial border-l-2 border-editorial pl-2 uppercase">Bharat Tech Spotlight</span>
              <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">12 Min Read</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-4 group-hover:text-editorial transition-colors duration-300">
              The Rise of Bharat's Tech Giants: How Bengaluru is Redefining SaaS globally.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              From Koramangala to the NASDAQ, Indian startups are pivoting from cost-arbitrage to product-led innovation, creating a new ₹50,000 Crore value proposition.
            </p>
            
            <p className="text-xs font-bold tracking-widest uppercase text-black">By Aditi Sharma</p>
          </div>
          
          {/* Right Column - Secondary Stories */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            
            <div className="group cursor-pointer border-b border-border pb-8 mb-8 lg:mb-0">
              <span className="inline-block text-xs font-bold tracking-widest text-authority uppercase mb-3">FinTech Pulse</span>
              <h2 className="font-serif text-2xl md:text-3xl leading-snug mb-3 group-hover:text-authority transition-colors">
                The UPI Revolution: How Digital Payments are Formalizing the Small Business Economy.
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Mumbai's traditional markets are adopting digital ledgers at an unprecedented rate, creating a credit boom for the MSME sector.
              </p>
            </div>
            
            <div className="group cursor-pointer pt-4 lg:pt-0">
              <span className="inline-block text-xs font-bold tracking-widest text-authority uppercase mb-3">D2C Markets</span>
              <h2 className="font-serif text-2xl md:text-3xl leading-snug mb-3 group-hover:text-authority transition-colors">
                The Gurgaon Playbook: Why Personal Care Brands are Winning with Localized Ingredients.
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Legacy FMCG giants are struggling to keep up with agile digital-first brands focusing on traditional Indian wellness.
              </p>
            </div>

          </div>
        </section>


        {/* 3. Two-Column Content + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* LATEST STORIES (8 Cols) */}
          <div className="lg:col-span-8">
            <h3 className="text-xs font-bold tracking-widest uppercase border-b border-black pb-4 mb-8">Latest Stories</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {[
                {
                  tag: "Cloud & Infra",
                  title: "Hyderabad's New Data Sovereignty Hubs.",
                  desc: "Policy shifts are driving a localized infrastructure boom, making the city a Tier-1 global cloud destination.",
                  img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
                },
                {
                  tag: "Founders",
                  title: "The EQ Edge: Why Pune's Startups Prioritize Mental Wellness.",
                  desc: "Meet the 5 entrepreneurs redefining high-performance culture without the burnout.",
                  img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800"
                },
                {
                  tag: "WealthTech",
                  title: "Retail Investing: The ₹10,000 Sip Revolution.",
                  desc: "How algorithm-based platforms are democratizing asset management for India's middle class.",
                  img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
                },
                {
                  tag: "Mobility",
                  title: "Chennai's EV Hub: Charging Toward 2030.",
                  desc: "Massive infrastructure investments are turning the 'Detroit of India' into an electric powerhouse.",
                  img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800"
                }
              ].map((story, i) => (
                <div key={i} className="group cursor-pointer flex flex-col h-full">
                  <div className="w-full aspect-[4/3] overflow-hidden mb-4 bg-muted">
                    <img 
                      src={story.img} 
                      alt={story.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">{story.tag}</span>
                  <h4 className="font-serif text-xl font-medium leading-snug mb-2 group-hover:text-editorial transition-colors">{story.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{story.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            
            {/* Trending Now */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase border-b border-black pb-4 mb-6">Trending Now</h3>
              <ul className="flex flex-col gap-6">
                {[
                  { title: "Reliance's AI Pivot: Challenging Global Giants.", reads: "52.4K READS" },
                  { title: "The Death of the Traditional MBA? Startup Experience Wins.", reads: "41.8K READS" },
                  { title: "Bengaluru Space-Tech Startups Ready for Launch.", reads: "29.2K READS" },
                  { title: "Agritech: Why ₹5,000 Crore is Flowing into Soil Science.", reads: "25.5K READS" }
                ].map((item, i) => (
                  <li key={i} className="group cursor-pointer flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                    <span className="font-serif text-[40px] leading-none text-border font-bold">0{i+1}</span>
                    <div>
                      <h4 className="font-serif text-lg leading-snug mb-2 group-hover:text-editorial transition-colors">{item.title}</h4>
                      <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{item.reads}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editor's Picks */}
            <div className="bg-black text-white p-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/70 mb-6">Editor's Picks</h3>
              
              <div className="group cursor-pointer mb-8">
                <h4 className="font-serif text-xl leading-snug mb-3">The Philosophical Case for Slower Growth in India.</h4>
                <p className="text-sm text-white/60 leading-relaxed mb-4">Is the pursuit of unicorn status killing sustainable innovation? An interview with Rajesh Khanna.</p>
                <span className="text-xs font-bold tracking-widest text-editorial uppercase group-hover:text-white transition-colors">Read Essay →</span>
              </div>
              
              <div className="w-full h-px bg-white/20 mb-8"></div>
              
              <div className="group cursor-pointer">
                <h4 className="font-serif text-xl leading-snug mb-3">Designing the Post-Remote Workplace in Mumbai.</h4>
                <p className="text-sm text-white/60 leading-relaxed mb-4">Hybrid is broken. How BKC firms are reinventing what 'presence' means for a modern workforce.</p>
                <span className="text-xs font-bold tracking-widest text-editorial uppercase group-hover:text-white transition-colors">Read Article →</span>
              </div>
            </div>

          </div>
        </section>


        {/* 4. Startup Spotlights Carousel */}
        <section className="mb-20">
          <div className="flex items-end justify-between border-b border-black pb-4 mb-8">
            <h3 className="text-2xl font-serif font-bold">Startup Spotlights</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollLeft(startupScrollRef)}
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-black transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollRight(startupScrollRef)}
                className="w-10 h-10 flex items-center justify-center border border-border hover:border-black transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={startupScrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {[
              {
                founder: "RAJESH KHANNA",
                startup: "BharatChip AI",
                desc: "Revolutionizing local edge computing through indigenous neural mimicry.",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800"
              },
              {
                founder: "MEERA IYER",
                startup: "KisanTech Systems",
                desc: "AI-driven automated vertical farming for Indian semi-arid climates.",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
              },
              {
                founder: "VIKRAM MEHTA",
                startup: "Shakti Power",
                desc: "Next-gen solid state batteries engineered for extreme Indian summers.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
              },
              {
                founder: "DR. AMIT SHAH",
                startup: "AyurGen Labs",
                desc: "Bridging ancient wisdom and modern genetics for personalized healthcare.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
              }
            ].map((spotlight, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] snap-start group cursor-pointer">
                <div className="w-full h-[250px] overflow-hidden mb-4 bg-muted">
                  <img 
                    src={spotlight.img} 
                    alt={spotlight.founder} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <span className="text-[11px] font-bold tracking-widest text-editorial uppercase mb-1 block">Founder: {spotlight.founder}</span>
                <h4 className="font-serif text-2xl font-medium leading-snug mb-2">{spotlight.startup}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{spotlight.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* 5. Explore Stories by City */}
        <section className="mb-24">
          <div className="flex items-end justify-between border-b border-border pb-4 mb-8">
            <h3 className="text-2xl font-serif font-bold">Explore Stories by City</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollLeft(cityScrollRef)}
                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-full"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                onClick={() => scrollRight(cityScrollRef)}
                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-full"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div 
            ref={cityScrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {[
              { city: "Bengaluru", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800" },
              { city: "Mumbai", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800" },
              { city: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800" },
              { city: "Hyderabad", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800" },
              { city: "Pune", img: "https://images.unsplash.com/photo-1565016599144-8d451296bd84?auto=format&fit=crop&q=80&w=800" }
            ].map((item, i) => (
              <div key={i} className="min-w-[260px] md:min-w-[300px] snap-start group cursor-pointer relative overflow-hidden">
                <div className="w-full aspect-[4/3] bg-muted relative">
                  <img 
                    src={item.img} 
                    alt={item.city} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <h4 className="absolute bottom-4 left-4 font-serif text-2xl text-white font-medium group-hover:text-editorial transition-colors">
                    {item.city}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* 6. Newsletter Banner */}
        <section className="bg-border/30 border border-border p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center gap-12 justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">The India Briefing.</h2>
            <p className="text-muted-foreground md:text-lg leading-relaxed">
              Curated narratives from Bharat's business landscape and market insights delivered to your inbox every Monday at 6:00 AM IST.
            </p>
          </div>
          <div className="w-full max-w-md">
            <label className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground block mb-2">
              Your Email Address
            </label>
            <div className="flex items-end gap-4">
              <input 
                type="email" 
                placeholder="founder@startup.in" 
                className="w-full bg-transparent border-b-2 border-black/20 py-2 focus:outline-none focus:border-editorial text-lg transition-colors placeholder:text-muted-foreground/50"
              />
              <button className="bg-black text-white text-sm font-bold tracking-widest uppercase px-6 py-3 hover:bg-editorial transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>
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
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-black hover:text-editorial transition-colors">
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
      <Route path="/brand/:slug" component={BrandStory} />
      <Route path="/industry/:slug" component={IndustryStory} />
      <Route path="/local/:slug" component={LocalBusiness} />
      <Route path="/success/:slug" component={SuccessStory} />
      <Route path="/impact/:slug" component={SocialImpact} />
      <Route path="/news/:slug" component={BusinessNews} />
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
