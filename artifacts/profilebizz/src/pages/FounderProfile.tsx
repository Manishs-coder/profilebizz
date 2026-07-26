import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, Award, Quote, Languages } from 'lucide-react';
import { FOUNDERS_HI } from '../data/foundersHi';
import { Reveal } from '@/components/Reveal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SITE_URL = 'https://profilebizz.com';
const FALLBACK_OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

/** Ensures og:image is always an absolute HTTPS URL */
function toAbsoluteUrl(url: string | null | undefined): string {
  if (!url) return FALLBACK_OG_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** Truncates text to maxLen, appending ellipsis if needed */
function truncate(text: string, maxLen = 160): string {
  return text.length <= maxLen ? text : text.slice(0, maxLen - 1) + '…';
}

/** Returns real share URLs for WhatsApp / LinkedIn / Twitter */
function getShareLinks(pageUrl: string, title: string) {
  const encoded = encodeURIComponent(pageUrl);
  const text    = encodeURIComponent(`${title}\n${pageUrl}`);
  return {
    WhatsApp: `https://wa.me/?text=${text}`,
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    Twitter:  `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encoded}`,
  };
}

/** Native share sheet (mobile) with WhatsApp fallback */
function handleNativeShare(pageUrl: string, title: string) {
  if (navigator.share) {
    navigator.share({ title, url: pageUrl }).catch(() => {});
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + '\n' + pageUrl)}`, '_blank');
  }
}


/* ══════════════════════════════════════
   DB-DRIVEN DYNAMIC FOUNDER PAGE
══════════════════════════════════════ */
function DynamicFounderPage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  const [, setLocation] = useLocation();
  const [founder, setFounder] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hindiAvailable, setHindiAvailable] = useState(false);
  const [usingFallbackLocale, setUsingFallbackLocale] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filterSecs = (s: any[]) =>
    (s || []).filter((sec: any) =>
      sec.pullQuote || (sec.bodyParagraphs && sec.bodyParagraphs.length > 0) || sec.jsonData
    );

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setFounder(null);
    setSections([]);
    setUsingFallbackLocale(false);

    Promise.all([
      fetch(`/api/public/founders/${slug}`).then(r => r.ok ? r.json() : null),
      fetch(`/api/public/founders/${slug}/sections?locale=${lang}`).then(r => r.ok ? r.json() : []),
      // Always check if Hindi sections exist so we know whether to show the button
      lang === 'en'
        ? fetch(`/api/public/founders/${slug}/sections?locale=hi`).then(r => r.ok ? r.json() : [])
        : Promise.resolve(null),
    ])
      .then(([f, s, hiSecs]) => {
        // If founder not found, check if it's actually a social hero
        if (!f) {
          fetch(`/api/public/social-heroes/${slug}`)
            .then(r => r.ok ? r.json() : null)
            .then(hero => {
              if (hero) {
                setLocation(`/social-hero/${slug}`);
              } else {
                setFounder(null);
                setLoading(false);
              }
            })
            .catch(() => { setFounder(null); setLoading(false); });
          return;
        }
        setFounder(f);

        // If Hindi was requested but DB has no Hindi sections → fallback to English
        let secs = filterSecs(s);
        if (lang === 'hi' && secs.length === 0) {
          setUsingFallbackLocale(true);
          // Re-fetch English sections as fallback
          fetch(`/api/public/founders/${slug}/sections?locale=en`)
            .then(r => r.ok ? r.json() : [])
            .then((enSecs: any[]) => {
              const filtered = filterSecs(enSecs);
              setSections(filtered);
              if (filtered.length > 0) setActiveSection(filtered[0].sectionKey);
              setLoading(false);
            })
            .catch(() => setLoading(false));
          return;
        }

        // Track if Hindi content exists (for button visibility)
        if (hiSecs !== null) {
          setHindiAvailable(filterSecs(hiSecs).length > 0);
        } else {
          // We were already in Hindi mode — sections are the Hindi ones
          setHindiAvailable(secs.length > 0);
        }

        setSections(secs);
        if (secs.length > 0) setActiveSection(secs[0].sectionKey);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, lang]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (sections.length === 0) return;
      let current = sections[0].sectionKey;
      for (const s of sections) {
        const el = sectionRefs.current[s.sectionKey];
        if (el && el.getBoundingClientRect().top <= 180) current = s.sectionKey;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  useScrollReveal([sections.length]);

  const scrollTo = (id: string) => sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const setRef = (id: string) => (el: HTMLElement | null) => { sectionRefs.current[id] = el; };

  const hf: React.CSSProperties = lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};
  const hfl: React.CSSProperties = lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: '2' } : {};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-editorial border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">Loading Profile</p>
        </div>
      </div>
    );
  }

  if (!founder) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-serif font-bold text-gray-300">Profile not found</p>
        <a href={`${import.meta.env.BASE_URL}`} className="text-sm font-bold tracking-widest uppercase text-editorial hover:underline">← Back to Home</a>
      </div>
    );
  }

  const stats = [
    { l: lang === 'hi' ? 'राजस्व' : 'Revenue',    v: founder.revenue   || '—' },
    { l: lang === 'hi' ? 'कर्मचारी' : 'Employees', v: founder.employees || '—' },
    { l: lang === 'hi' ? 'आयु' : 'Age',             v: founder.age       || '—' },
    { l: lang === 'hi' ? 'स्थापना' : 'Founded',    v: founder.founded   || '—' },
  ];

  /* ── Hindi metadata override (for founders with Hindi display names) ── */
  const hiMeta = lang === 'hi' ? FOUNDERS_HI[slug] : null;
  const displayName        = hiMeta?.name        || founder.name;
  const displayDesignation = hiMeta?.title       || founder.designation;
  const displayOneLiner    = hiMeta?.oneLiner    || founder.oneLiner;
  const displayProfileType = hiMeta?.profileType || founder.profileType;
  const displayProfileTag  = hiMeta?.profileTag  || founder.profileTag;

  /* ── Open Graph / Twitter meta ── */
  const pageUrl = lang === 'hi'
    ? `${SITE_URL}/founder/hi/${slug}`
    : `${SITE_URL}/founder/${slug}`;
  const ogTitle = `${displayName} — ${displayDesignation} | ProfileBizz`;
  const rawDesc: string = displayOneLiner || founder.executiveSummary
    || `Read the in-depth profile of ${displayName} on ProfileBizz.`;
  const ogDescription = truncate(rawDesc);
  const ogImage = toAbsoluteUrl(founder.coverPhotoUrl || founder.photoUrl);
  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ogTitle,
    description: ogDescription,
    image: ogImage,
    url: pageUrl,
    author: { '@type': 'Organization', name: 'ProfileBizz Editorial' },
    publisher: {
      '@type': 'Organization',
      name: 'ProfileBizz',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  });

  return (
    <>
    <Helmet>
      <title>{ogTitle}</title>
      <meta name="description" content={ogDescription} />
      <link rel="canonical" href={pageUrl} />
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="ProfileBizz" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'hi' ? 'hi_IN' : 'en_IN'} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@profilebizz" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      {/* Article authorship */}
      <meta property="article:author" content="ProfileBizz Editorial" />
      <meta property="article:publisher" content={SITE_URL} />
      {/* JSON-LD structured data */}
      <script type="application/ld+json">{articleJsonLd}</script>
    </Helmet>
    <div className="min-h-screen bg-[#f9f9f9] text-black">

      {/* ── Sticky Top Bar ── */}
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`${import.meta.env.BASE_URL}`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Founder Stories</span>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-0.5" style={hf}>{displayProfileTag}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNativeShare(pageUrl, ogTitle)}
              className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black transition-colors px-3 py-1.5 border border-gray-200 hover:border-black">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial transition-colors px-3 py-1.5">
              <BookmarkPlus className="w-3.5 h-3.5" /> Save Profile
            </button>
          </div>
        </div>
      </header>

      {/* ── Centered White Hero Header ── */}
      <div data-reveal="up" className="bg-white mt-14">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-12 pb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.18em] uppercase text-editorial border border-editorial px-3 py-1.5" style={hf}>
              {displayProfileType || 'Founder'}
              <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400" style={hf}>{displayProfileTag}</span>
          </div>
          <div className="flex justify-center mb-7">
            {founder.photoUrl ? (
              <img src={founder.photoUrl} alt={displayName}
                className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover object-center ring-4 ring-white shadow-xl border border-gray-100" />
            ) : (
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-gray-100 ring-4 ring-white shadow-xl flex items-center justify-center">
                <span className="text-4xl font-serif font-bold text-gray-300">{displayName?.[0] || 'F'}</span>
              </div>
            )}
          </div>
          <h1 className="font-serif text-5xl md:text-[68px] font-bold text-black leading-[1.06] tracking-tight mb-5"
            style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '3rem', lineHeight: '1.3' } : {}}>
            {displayName}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-5" style={hf}>{displayDesignation}</p>
          {displayOneLiner && (
            <p className="text-base md:text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-9" style={lang === 'hi' ? { ...hf, lineHeight: '2' } : {}}>
              {displayOneLiner}
            </p>
          )}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-300 text-lg">◆</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 mb-10">
            <span className="font-semibold text-black">ProfileBizz Editorial</span>
            {founder.location && <><span className="text-gray-300">•</span><span style={hf}>{founder.location}</span></>}
            {founder.founded && <><span className="text-gray-300">•</span><span style={hf}>{lang === 'hi' ? 'स्थापना' : 'Founded'} {founder.founded}</span></>}
            <span className="text-gray-300">•</span>
            <span className="text-editorial font-semibold">{lang === 'hi' ? '8 मिनट पढ़ें' : '8 min read'}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 divide-x divide-gray-200">
            {stats.map((s) => (
              <div key={s.l} className="px-5 py-4 text-left">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1"
                  style={lang === 'hi' ? { ...hf, letterSpacing: '0' } : {}}>{s.l}</p>
                <p className="font-serif text-2xl font-bold text-black">{s.v}</p>
              </div>
            ))}
          </div>
          {/* Language switch — only show if Hindi content exists, or we're already in Hindi */}
          {(hindiAvailable || lang === 'hi') && (
            <div className="mt-6 flex flex-col items-center gap-2">
              {/* Fallback notice when Hindi was requested but no Hindi content in DB */}
              {lang === 'hi' && usingFallbackLocale && (
                <p className="text-xs text-gray-400 text-center" style={hf}>
                  हिंदी में कहानी जल्द आएगी — अभी अंग्रेज़ी में पढ़ें
                </p>
              )}
              <a href={lang === 'en' ? `${import.meta.env.BASE_URL}founder/hi/${slug}` : `${import.meta.env.BASE_URL}founder/${slug}`}
                className="flex items-center gap-2 border border-gray-300 hover:border-black px-5 py-2 text-sm font-semibold text-gray-600 hover:text-black transition-all group"
                style={lang === 'hi' ? hf : {}}>
                <Languages className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-black transition-colors" />
                {lang === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Section Nav ── */}
      {sections.length > 0 && (
        <div className={`lg:hidden bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto ${lang === 'hi' ? 'lang-hi' : ''}`}>
          <div className="flex">
            {sections.map(s => (
              <button key={s.sectionKey} onClick={() => scrollTo(s.sectionKey)}
                className={`flex-shrink-0 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors
                  ${activeSection === s.sectionKey ? 'border-editorial text-editorial font-semibold' : 'border-transparent text-gray-500 hover:text-black'}`}>
                {s.sectionKey === 'story' ? (lang === 'hi' ? 'कहानी' : 'Story') : s.sectionKey}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Body: Sidebar + Article ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Sticky Sidebar */}
        <aside className="hidden lg:block lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-20">
            {sections.length > 0 && (
              <>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
                  {lang === 'hi' ? 'इस प्रोफाइल में' : 'In This Profile'}
                </p>
                <nav className="flex flex-col gap-0 mb-8">
                  {sections.map((s) => (
                    <button key={s.sectionKey} onClick={() => scrollTo(s.sectionKey)}
                      className={`text-left py-2.5 px-3 text-sm font-medium border-l-2 transition-all duration-150 ${
                        activeSection === s.sectionKey
                          ? 'border-editorial text-editorial bg-red-50 font-semibold'
                          : 'border-gray-200 text-gray-500 hover:text-black hover:border-black'
                      }`} style={hf}>
                      {s.sectionKey === 'story' ? (lang === 'hi' ? 'कहानी' : 'Story') : s.sectionKey}
                    </button>
                  ))}
                </nav>
              </>
            )}
            <div className="border border-gray-200 p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Share Profile</p>
              <div className="flex gap-2 flex-wrap">
                {(Object.entries(getShareLinks(pageUrl, ogTitle)) as [string, string][]).map(([platform, href]) => (
                  <a key={platform} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-bold tracking-wider uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 px-2 py-1 hover:border-editorial">
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Dynamic Article ── */}
        <article className={`flex-1 min-w-0 max-w-3xl ${lang === 'hi' ? 'lang-hi' : ''}`}>
          {sections.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-200 rounded">
              <p className="text-gray-400 text-lg font-medium mb-2">Story sections not added yet</p>
              <p className="text-sm text-gray-300">Add content from the Admin panel → Story Sections tab</p>
            </div>
          ) : (
            sections.map((sec: any, idx: number) => {
              const jd = sec.jsonData as any;
              const isAwards = sec.sectionKey === 'Awards' && Array.isArray(jd);
              const isInterviews = sec.sectionKey === 'Interviews' && Array.isArray(jd);
              const imgUrl = !isAwards && !isInterviews ? jd?.imageUrl : null;
              const imgCaption = !isAwards && !isInterviews ? jd?.imageCaption : null;

              return (
                <React.Fragment key={sec.sectionKey}>
                  <section id={sec.sectionKey} ref={setRef(sec.sectionKey)} data-reveal="up" className="mb-16 scroll-mt-24">
                    <SectionLabel index={String(idx + 1).padStart(2, '0')} label={sec.sectionKey === 'story' ? (lang === 'hi' ? 'कहानी' : 'Story') : sec.sectionKey} />

                    {sec.pullQuote && (
                      <blockquote className="border-l-4 border-editorial pl-6 my-6">
                        <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic"
                          style={lang === 'hi' ? { ...hf, lineHeight: '1.9' } : {}}>{sec.pullQuote}</p>
                      </blockquote>
                    )}

                    {imgUrl && (
                      <figure className="my-8">
                        <img src={imgUrl} alt={imgCaption || sec.sectionKey}
                          className="w-full rounded-sm object-cover max-h-[480px] shadow-sm border border-gray-100" />
                        {imgCaption && (
                          <figcaption className="text-xs text-gray-400 text-center mt-2 font-medium italic">{imgCaption}</figcaption>
                        )}
                      </figure>
                    )}

                    {isAwards && Array.isArray(jd) && (
                      <div className="mt-6 border border-gray-200 divide-y divide-gray-100">
                        {jd.map((a: any, i: number) => (
                          <div key={i} className="flex items-start gap-5 px-5 py-4 hover:bg-gray-50 transition-colors group">
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-black group-hover:bg-editorial transition-colors">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-black group-hover:text-editorial transition-colors">{a.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{a.organization}</p>
                            </div>
                            <span className="flex-shrink-0 text-[11px] font-bold text-editorial">{a.year}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {isInterviews && Array.isArray(jd) && (
                      <div className="mt-6 space-y-6">
                        {jd.map((iv: any, i: number) => (
                          <div key={i} className="bg-white border border-gray-200">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
                              <span className="text-xs font-bold tracking-widest uppercase text-gray-700">{iv.publication}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{iv.year}</span>
                            </div>
                            <div className="px-5 py-4">
                              <p className="text-sm font-bold text-black leading-snug">{iv.title}</p>
                              {iv.url && <a href={iv.url} target="_blank" rel="noopener noreferrer" className="text-xs text-editorial hover:underline mt-1 inline-block">{iv.url}</a>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!isAwards && !isInterviews && (
                      jd?.htmlContent
                        ? <div
                            className="tinymce-content font-serif text-[17px] md:text-[18px] text-gray-700 leading-[1.9]"
                            style={lang === 'hi' ? hfl : {}}
                            dangerouslySetInnerHTML={{ __html: jd.htmlContent }}
                          />
                        : sec.bodyParagraphs?.map((p: string, i: number) => (
                            <p key={i} className="font-serif text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5"
                              style={lang === 'hi' ? hfl : {}}>{p}</p>
                          ))
                    )}
                  </section>
                  {idx < sections.length - 1 && <Divider />}
                </React.Fragment>
              );
            })
          )}

          <div className="flex justify-center pt-4 pb-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 hover:border-editorial px-5 py-2.5">
              <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
              {lang === 'hi' ? 'ऊपर जाएं' : 'Back to Top'}
            </button>
          </div>
        </article>
      </div>
    </div>
    </>
  );
}

export default function FounderProfile({ params, locale }: { params?: { slug?: string }; locale?: 'en' | 'hi' }) {
  const slug = params?.slug ?? 'nithin-kamath';
  const lang = locale ?? 'en';
  return <DynamicFounderPage slug={slug} lang={lang} />;
}

/* ── Small helpers ── */
function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-4xl font-serif font-bold text-gray-100 leading-none select-none">{index}</span>
      <h2 className="text-xl md:text-2xl font-serif font-bold text-black border-b-2 border-editorial pb-1">
        {label}
      </h2>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-gray-200 my-12" />;
}
