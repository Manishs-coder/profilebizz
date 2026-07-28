import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Share2, BookmarkPlus, Star, TrendingUp, Award, Heart } from 'lucide-react';
import { SiteFooter } from '@/components/SiteFooter';
import { ProfileSeo } from '@/components/ProfileSeo';
import { SocialShareButtons } from '@/components/SocialShareButtons';

const CATEGORIES = [
  { slug: 'startup-founders', label: 'Startup Founders', icon: '🚀' },
  { slug: 'msme-leaders', label: 'MSME Leaders', icon: '🏭' },
  { slug: 'rural-entrepreneurs', label: 'Rural Entrepreneurs', icon: '🌾' },
  { slug: 'corporate-leaders', label: 'Corporate Leaders', icon: '💼' },
  { slug: 'social-entrepreneurs', label: 'Social Entrepreneurs', icon: '❤️' },
  { slug: 'young-founders', label: 'Young Founders', icon: '⚡' },
];

const WOMEN_STORIES = [
  {
    slug: 'falguni-nayar',
    name: 'Falguni Nayar',
    company: 'Nykaa',
    title: 'Founder & CEO, Nykaa',
    tag: 'India\'s Richest Self-Made Woman',
    category: 'Startup Founders',
    location: 'Mumbai',
    founded: '2012',
    revenue: '₹6,386 Crore (FY24)',
    coverPhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1600&q=80',
    pullQuote: '"I was 50 years old when I started Nykaa. Most people thought I was too old. I thought I had exactly the right experience."',
    story: [
      'Falguni Nayar spent 19 years at Kotak Mahindra Bank, rising to MD of Kotak Investment Banking, before doing something no one expected: quitting at 50 to start a beauty e-commerce startup. In 2012, the Indian beauty market was almost entirely offline. No organised player had cracked online beauty retail.',
      'Nykaa — named after the Sanskrit word for "one in the spotlight" — was Falguni\'s bet that Indian women were ready to shop for beauty online, if given the right product selection, authenticity guarantees, and aspirational content. She bet right.',
      'Nykaa went public in 2021 at a valuation of ₹1,00,000 Crore — the first unicorn founded and run by a woman to list in India. On listing day, Falguni\'s net worth crossed ₹57,000 Crore, making her the richest self-made woman in India. At 58 years old.',
    ],
    keyFacts: [
      { label: 'Company Valuation', value: '₹55,000 Cr' },
      { label: 'Revenue FY24', value: '₹6,386 Cr' },
      { label: 'Products on Platform', value: '4,000+ Brands' },
      { label: 'Age at IPO', value: '58 Years' },
    ],
    lessons: [
      'Age is not a barrier — experience is an advantage. 19 years in investment banking taught Falguni capital allocation, investor relations, and business building at a scale most founders never see.',
      'Content creates commerce. Nykaa built its community through beauty tutorials and honest product reviews before competitors understood content marketing.',
      'Authenticity in a cluttered market. When fake products were rampant in beauty, Nykaa\'s 100% authentic guarantee built the trust that no discount could.',
    ],
    recognition: ['EY Entrepreneur of the Year', 'Fortune India 50 Most Powerful Women', 'Forbes Asia Power Businesswomen', 'Vogue India Woman of the Decade'],
  },
  {
    slug: 'kiran-mazumdar-shaw',
    name: 'Kiran Mazumdar-Shaw',
    company: 'Biocon',
    title: 'Executive Chairperson, Biocon',
    tag: 'Pioneer of India\'s Biotech Industry',
    category: 'Corporate Leaders',
    location: 'Bengaluru',
    founded: '1978',
    revenue: '₹15,000 Crore (FY24)',
    coverPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=80',
    pullQuote: '"I started Biocon in a garage with ₹10,000 and the conviction that India could make world-class biopharmaceuticals. Every bank said no. My own conviction said yes."',
    story: [
      'Kiran Mazumdar-Shaw founded Biocon in 1978 with ₹10,000 capital — at 25, as a brewer who had failed to get a job in the male-dominated brewing industry. She pivoted to fermentation-based enzymes and set up Biocon in her garage in Bengaluru, initially making papain (an enzyme from papaya) for the food industry.',
      'She built Biocon into India\'s largest biopharmaceutical company, making affordable biosimilars — biologically-manufactured copies of expensive cancer drugs, diabetes insulins, and arthritis medications — available to patients in India and across 120 countries.',
      'When Biocon listed in 2004, Kiran became India\'s first woman to be listed on the Forbes Billionaire list. Her Biocon Biologics — the biosimilars subsidiary — separately listed in 2023. Her life\'s mission: ensuring that the world\'s most advanced medicines are not only for the wealthy.',
    ],
    keyFacts: [
      { label: 'Company Revenue', value: '₹15,000 Cr' },
      { label: 'Countries Reached', value: '120+' },
      { label: 'Biosimilars Pipeline', value: '30+ Products' },
      { label: 'Founded With', value: '₹10,000' },
    ],
    lessons: [
      'Rejection is data, not destiny. Every bank that refused Kiran forced her to bootstrap more creatively — which ironically gave her better financial discipline than most funded startups.',
      'Affordable innovation is a market strategy. Biocon\'s mission to make expensive biotech drugs affordable is not just philanthropy — it is a massive, underserved market.',
      'Science as competitive moat. India has deep science talent. Kiran proved that Indian biotech could not just copy drugs but innovate the processes to make them cheaper and better.',
    ],
    recognition: ['Padma Shri 1989', 'Padma Bhushan 2005', 'EY World Entrepreneur of the Year 2020', 'Forbes 100 Most Powerful Women'],
  },
  {
    slug: 'vandana-luthra',
    name: 'Vandana Luthra',
    company: 'VLCC',
    title: 'Founder, VLCC',
    tag: 'Built India\'s Wellness Industry from Scratch',
    category: 'Startup Founders',
    location: 'New Delhi',
    founded: '1989',
    revenue: '₹800 Crore (FY24)',
    coverPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80',
    pullQuote: '"In 1989, wellness was not an industry in India. I had to create the market before I could sell to it."',
    story: [
      'Vandana Luthra founded VLCC in 1989 when the concept of a professional wellness centre barely existed in India. There were beauty parlours. There were gyms. But no integrated space that combined beauty, nutrition, fitness, and weight management under one professional, hygienic roof.',
      'Vandana trained in Europe and returned to Delhi with the belief that India\'s women deserved the same quality of wellness services available in the West — and that they would pay for it. She was right. VLCC\'s first centre in South Extension, Delhi was full from the first week.',
      'Today, VLCC has 340+ centres across 125 cities in 11 countries. It has diversified into professional training (VLCC Institute — trains 25,000 beauty and wellness professionals annually), personal care products (₹200 Crore brand), and wellness nutrition. Vandana created an entire industry and then dominated it.',
    ],
    keyFacts: [
      { label: 'Centres', value: '340+' },
      { label: 'Cities', value: '125' },
      { label: 'Countries', value: '11' },
      { label: 'Students Trained Annually', value: '25,000' },
    ],
    lessons: [
      'Create the market first. VLCC didn\'t enter an existing industry — it created one. The willingness to educate the market before monetising it is what built the moat.',
      'Trust is the product in services. VLCC\'s consistency of service across 340 centres is the hardest thing to replicate — and the reason it has survived 35 years.',
      'Training as a moat. By training 25,000 wellness professionals annually, VLCC controls its own talent supply and created a brand presence every time a VLCC-trained professional works anywhere.',
    ],
    recognition: ['Padma Shri 2013', 'Ernst & Young Entrepreneur Award', 'FICCI Woman of the Year', 'CII Business Woman of the Year'],
  },
  {
    slug: 'priya-paul',
    name: 'Priya Paul',
    company: 'Apeejay Surrendra Park Hotels',
    title: 'Chairperson, Apeejay Surrendra Group',
    tag: 'Reinvented India\'s Luxury Hospitality',
    category: 'Corporate Leaders',
    location: 'Kolkata / New Delhi',
    founded: 'Took charge 1990',
    revenue: '₹2,500 Crore (FY24)',
    coverPhoto: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
    pullQuote: '"The Park Hotels were old, tired, and losing to Taj and Oberoi. I could not compete on scale. So I competed on identity."',
    story: [
      'Priya Paul inherited a group of struggling hotels in 1990 when her father died unexpectedly. She was 26. The Apeejay Surrendra Park Hotels were financially stressed, operationally weak, and overshadowed by the Taj and Oberoi groups. The conventional wisdom was that they could not compete.',
      'Priya refused conventional wisdom. Instead of trying to be Taj, she made The Park Hotels deliberately different — design-led, art-forward, edgy, and young. She commissioned contemporary Indian artists for every property, installed rooftop bars when India didn\'t have them, and positioned The Park as India\'s first boutique luxury hotel brand.',
      'The transformation worked. The Park Hotels are now among India\'s most distinctive hospitality brands, known for their art collections, night-life venues (601 in Delhi, i-Bar in Kolkata), and design identity. Priya has received the Padma Shri and is recognised as one of India\'s most influential business leaders in hospitality.',
    ],
    keyFacts: [
      { label: 'Hotels', value: '15 Properties' },
      { label: 'Revenue', value: '₹2,500 Cr' },
      { label: 'Art Pieces in Collection', value: '2,000+' },
      { label: 'Took Charge At Age', value: '26 Years' },
    ],
    lessons: [
      'Differentiation beats competition. When you cannot win on scale, win on identity. The Park became famous for what Taj and Oberoi deliberately were not.',
      'Art as business strategy. Commissioning Indian artists — when it was not fashionable — gave The Park a cultural identity that money alone could not buy.',
      'Youth and legacy together. The Park managed to be simultaneously heritage (family business) and contemporary (design, nightlife) — a balance most luxury brands fail to strike.',
    ],
    recognition: ['Padma Shri 2016', 'FICCI Woman of the Year', 'CII Business Woman Award', 'National Tourism Award'],
  },
  {
    slug: 'indra-nooyi',
    name: 'Indra Nooyi',
    company: 'PepsiCo (Global)',
    title: 'Former CEO, PepsiCo',
    tag: 'The Indian Who Led the World\'s Biggest Food Company',
    category: 'Corporate Leaders',
    location: 'Chennai (Origin) / Global',
    founded: 'CEO 2006–2018',
    revenue: '$79 Billion (PepsiCo FY18)',
    coverPhoto: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1600&q=80',
    pullQuote: '"I came from a middle-class family in Chennai. I wore a sari to the Yale interview and never pretended to be someone I was not. That authenticity was my greatest strength."',
    story: [
      'Indra Nooyi grew up in Chennai, Tamil Nadu, in a middle-class family where academic excellence was the only path to success. She studied at IIM Calcutta, then Yale, then worked at BCG before joining PepsiCo in 1994. In 2006, she became CEO — one of the first Indian-origin women to lead a Fortune 500 company.',
      'As CEO from 2006 to 2018, Nooyi transformed PepsiCo from a sugary drinks company to a diversified nutrition company with her "Performance with Purpose" strategy — reducing sugar, salt, and fat in PepsiCo products, investing in healthier options, and doubling PepsiCo\'s revenue from $35 billion to $63 billion in 12 years.',
      'For 12 years, Indra Nooyi was the most powerful Indian woman in global business — a role model for millions of Indian women in corporate and entrepreneurial careers. Her memoir "My Life in Full" is the definitive account of navigating corporate America as an immigrant woman from Chennai.',
    ],
    keyFacts: [
      { label: 'Revenue Under Her Watch', value: '$35B → $63B' },
      { label: 'CEO Tenure', value: '12 Years' },
      { label: 'Fortune 500 Rank', value: 'Top 50 CEO' },
      { label: 'Revenue Growth Achieved', value: '80%' },
    ],
    lessons: [
      'Purpose transforms performance. Nooyi\'s "Performance with Purpose" showed that a health mission and shareholder returns are not in conflict — they reinforce each other.',
      'Authenticity as leadership. She never hid her Indian identity, her sari, or her Chennai roots. That authenticity gave her a moral authority that polished corporate executives lacked.',
      'Succession is also a legacy. Nooyi spent years preparing her own succession — a level of institutional thinking that few leaders practice.',
    ],
    recognition: ['Fortune Most Powerful Women #1 (2006–2014)', 'Padma Bhushan 2007', 'Time 100 Most Influential', 'Forbes Most Powerful Women'],
  },
  {
    slug: 'jyoti-naik',
    name: 'Jyoti Naik',
    company: 'Lijjat Papad',
    title: 'President, Shri Mahila Griha Udyog Lijjat Papad',
    tag: '47,000 Women, One Rolling Pin',
    category: 'Social Entrepreneurs',
    location: 'Mumbai (Founded) · Pan-India',
    founded: '1959',
    revenue: '₹1,800 Crore (FY24)',
    coverPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80',
    pullQuote: '"We did not start a company. We started a sisterhood. Every woman who rolls papads is an equal owner. That is our constitution — written 65 years ago."',
    story: [
      'In 1959, seven women from a chawl in Girgaum, Mumbai — each contributing ₹80 — started rolling papads on the terrace of their building. They named their cooperative Lijjat (meaning "tasty" in Gujarati) and produced 4 packets of papads on Day 1. They sold them for ₹2.50 each.',
      'Lijjat Papad is today one of India\'s most beloved FMCG brands — and one of the world\'s most unique businesses. It is a women\'s cooperative with 47,000 member-owners, all of whom are equal shareholders. Every woman who joins as a member is called a "sister." No woman is an employee. Everyone is an owner.',
      'The cooperative produces 12 varieties of papads, khakhras, masalas, and detergents. It exports to 15 countries. Revenue in FY24 is estimated at ₹1,800 Crore. The founding principle — that ordinary women from any economic background deserve to be owners, not wage earners — has held for 65 years.',
    ],
    keyFacts: [
      { label: 'Member-Owners', value: '47,000 Women' },
      { label: 'Revenue FY24', value: '₹1,800 Crore' },
      { label: 'Export Countries', value: '15' },
      { label: 'Founded With', value: '₹80 per woman' },
    ],
    lessons: [
      'Ownership beats employment. 47,000 women have built generational wealth through Lijjat because they own it — not because they work for it. The structure is the strategy.',
      'Quality as a brand promise. Lijjat\'s consistency — every papad tastes the same whether made in Mumbai or Srinagar — required a training and quality system that most corporations cannot achieve.',
      'Scale without losing identity. Growing from 7 women to 47,000 while preserving cooperative ownership is a governance achievement that business schools should study.',
    ],
    recognition: ['Padma Shri 1998 (Organisation)', 'National Cooperative Award', 'UN ESCAP Social Enterprise Award', 'CII Award for Excellence in Consumer Products'],
  },
];

export default function WomenStory({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? '';
  const [selected, setSelected] = useState<typeof WOMEN_STORIES[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const found = WOMEN_STORIES.find(s => s.slug === slug);
      setSelected(found || null);
    }
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = activeCategory === 'All'
    ? WOMEN_STORIES
    : WOMEN_STORIES.filter(s => s.category === activeCategory);

  if (selected) {
    const _womenDetailUrl    = `https://profilebizz.com/women-story/${selected.slug}`;
    const _womenDetailJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: `${selected.name} — ${selected.title} | ProfileBizz Women Stories`,
          description: selected.pullQuote,
          image: selected.coverPhoto,
          url: _womenDetailUrl,
          author: { '@type': 'Organization', name: 'ProfileBizz Editorial', url: 'https://profilebizz.com' },
          publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
          about: { '@type': 'Person', name: selected.name, url: _womenDetailUrl },
        },
        {
          '@type': 'Person',
          name: selected.name,
          jobTitle: selected.title,
          url: _womenDetailUrl,
          image: selected.coverPhoto,
          nationality: { '@type': 'Country', name: 'India' },
          worksFor: { '@type': 'Organization', name: selected.company },
        },
      ],
    });

    return (
      <>
        <Helmet>
          <title>{`${selected.name} — ${selected.title} | ProfileBizz`}</title>
          <meta name="description" content={selected.pullQuote} />
          <link rel="canonical" href={_womenDetailUrl} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={_womenDetailUrl} />
          <meta property="og:site_name" content="ProfileBizz" />
          <meta property="og:title" content={`${selected.name} — ${selected.title} | ProfileBizz`} />
          <meta property="og:description" content={selected.pullQuote} />
          <meta property="og:image" content={selected.coverPhoto} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_IN" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@profilebizz" />
          <meta name="twitter:title" content={`${selected.name} — ${selected.title} | ProfileBizz`} />
          <meta name="twitter:description" content={selected.pullQuote} />
          <meta name="twitter:image" content={selected.coverPhoto} />
          <script type="application/ld+json">{_womenDetailJsonLd}</script>
        </Helmet>
        <ProfileSeo
          slug={selected.slug}
          title={`${selected.name} — ${selected.title} | ProfileBizz`}
          description={selected.pullQuote}
          canonicalUrl={_womenDetailUrl}
          image={selected.coverPhoto}
          entityName={selected.name}
          entityType="Person"
          designation={selected.title}
        />
        <div className="min-h-screen bg-[#f9f9f9] text-black">
        <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="font-bold tracking-wider text-[11px] uppercase">Women Stories</span>
              </button>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black px-3 py-1.5 border border-gray-200 hover:border-black transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial px-3 py-1.5 transition-colors">
                <BookmarkPlus className="w-3.5 h-3.5" /> Save Story
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden mt-14">
          <img src={selected.coverPhoto} alt={selected.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute top-6 left-8">
            <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">{selected.category}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
            <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2">{selected.company} · {selected.location}</p>
            <h1 className="font-serif text-white text-4xl md:text-6xl font-bold leading-none mb-2">{selected.name}</h1>
            <p className="text-white/70 text-base md:text-lg font-medium">{selected.tag}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-wrap gap-x-10 gap-y-3">
            {selected.keyFacts.map((f, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{f.label}</span>
                <span className="text-base md:text-xl font-serif font-bold text-black">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <SocialShareButtons
          url={_womenDetailUrl}
          title={`${selected.name} — ${selected.title} | ProfileBizz`}
        />

        {/* Body */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Story */}
            <div className="lg:col-span-2">
              <blockquote className="border-l-4 border-editorial pl-6 mb-8">
                <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{selected.pullQuote}</p>
              </blockquote>
              {selected.story.map((para, i) => (
                <p key={i} className="font-serif text-base text-gray-700 leading-[1.85] mb-4">{para}</p>
              ))}

              {/* Lessons */}
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-editorial" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Lessons from Her Journey</span>
                </div>
                <div className="space-y-4">
                  {selected.lessons.map((lesson, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white border border-gray-200 hover:border-editorial transition-colors group">
                      <span className="font-serif text-3xl text-gray-100 leading-none select-none font-bold flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recognition */}
              <div className="bg-white border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-editorial" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Recognition</span>
                </div>
                {selected.recognition.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <Star className="w-3 h-3 text-editorial flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700">{r}</span>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="border border-editorial p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">Company / Mission</p>
                <p className="font-serif text-xl font-bold text-editorial">{selected.company}</p>
                <p className="text-xs text-gray-500 mt-1">{selected.revenue}</p>
              </div>

              {/* More Women */}
              <div className="bg-white border border-gray-200 p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">More Women Stories</p>
                {WOMEN_STORIES.filter(s => s.slug !== selected.slug).slice(0, 4).map((s, i) => (
                  <button key={i} onClick={() => { setSelected(s); window.scrollTo(0, 0); }}
                    className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors group mb-1">
                    <Heart className="w-3.5 h-3.5 text-gray-300 group-hover:text-editorial flex-shrink-0 transition-colors" />
                    <div>
                      <p className="text-xs font-bold group-hover:text-editorial transition-colors">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.tag}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Listing Page
  const _womenListUrl    = 'https://profilebizz.com/women-story';
  const _womenListJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Women Stories — ProfileBizz',
    description: 'Inspiring stories of India\'s women entrepreneurs, corporate leaders, social entrepreneurs, and young founders — curated by ProfileBizz.',
    url: _womenListUrl,
    publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
    inLanguage: 'en-IN',
  });

  return (
    <>
      <Helmet>
        <title>Women Stories — India's Women Entrepreneurs | ProfileBizz</title>
        <meta name="description" content="Stories of India's women founders, corporate leaders, social entrepreneurs, and young innovators — breaking barriers and building legacies. Curated by ProfileBizz." />
        <link rel="canonical" href={_womenListUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={_womenListUrl} />
        <meta property="og:site_name" content="ProfileBizz" />
        <meta property="og:title" content="Women Stories — India's Women Entrepreneurs | ProfileBizz" />
        <meta property="og:description" content="Stories of India's women founders, corporate leaders, and social entrepreneurs breaking barriers. Curated by ProfileBizz." />
        <meta property="og:image" content="https://profilebizz.com/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@profilebizz" />
        <meta name="twitter:title" content="Women Stories — India's Women Entrepreneurs | ProfileBizz" />
        <meta name="twitter:description" content="India's women founders and leaders — stories curated by ProfileBizz." />
        <meta name="twitter:image" content="https://profilebizz.com/og-cover.jpg" />
        <script type="application/ld+json">{_womenListJsonLd}</script>
      </Helmet>
      <div className="min-h-screen bg-[#f9f9f9] text-black">
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Women Stories</span>
          </div>
        </div>
      </header>

      {/* Page Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden mt-14 bg-black">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80" alt="Women Stories" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-editorial text-[10px] font-bold tracking-[0.3em] uppercase mb-3">ProfileBizz · Exclusive Series</span>
          <h1 className="font-serif text-white text-4xl md:text-6xl font-bold mb-3">Women Stories</h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl">India's most inspiring women entrepreneurs, corporate leaders, and changemakers — told in full.</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {['All', ...CATEGORIES.map(c => c.label)].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-xs font-bold tracking-wider uppercase px-4 py-2 border transition-colors ${
                activeCategory === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        {/* Featured */}
        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Featured Story</p>
          <div onClick={() => setSelected(filtered[0])} className="cursor-pointer group relative h-96 overflow-hidden bg-gray-100">
            <img src={filtered[0]?.coverPhoto} alt={filtered[0]?.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">{filtered[0]?.category}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1">{filtered[0]?.company} · {filtered[0]?.revenue}</p>
              <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-1">{filtered[0]?.name}</h2>
              <p className="text-white/70 text-sm">{filtered[0]?.tag}</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((story) => (
            <div
              key={story.slug}
              onClick={() => { setSelected(story); window.scrollTo(0, 0); }}
              className="cursor-pointer group bg-white border border-gray-200 hover:border-black transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={story.coverPhoto} alt={story.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-editorial text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1">{story.category}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-1">{story.company}</p>
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-editorial transition-colors">{story.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{story.tag}</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{story.story[0].substring(0, 100)}...</p>
                <div className="flex items-center gap-1 mt-3">
                  <Star className="w-3 h-3 text-editorial" />
                  <span className="text-[10px] font-bold text-gray-500">{story.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Aur Padhein — More Stories ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 border-t-4 border-black mt-8">
        <div className="mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-editorial block mb-2">और पढ़ें</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">More Women Founders</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
          {WOMEN_STORIES.slice(0, 3).map((story) => (
            <div key={story.slug}
              className="group bg-white p-6 hover:bg-[#fafafa] transition-colors flex flex-col cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <img src={story.coverPhoto} alt={story.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-100 group-hover:ring-2 group-hover:ring-editorial transition-all" />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-editorial block mb-0.5">{story.category}</span>
                  <p className="text-xs text-gray-400 font-medium truncate">{story.company}</p>
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-black mb-2 group-hover:text-editorial transition-colors leading-snug">{story.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{story.story[0].substring(0, 120)}...</p>
              <span className="text-[10px] font-bold tracking-widest uppercase text-editorial group-hover:underline">Read Story →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <SiteFooter />
    </>
  );
}
