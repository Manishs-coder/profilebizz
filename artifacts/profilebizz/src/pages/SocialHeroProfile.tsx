import React, { useState, useEffect } from 'react';
import { ChevronLeft, Share2, BookmarkPlus, Award, Heart, TrendingUp, Users, Globe } from 'lucide-react';

const CATEGORIES = [
  { slug: 'changemakers', label: 'Changemakers', icon: '🌟', desc: 'Individuals reshaping India through bold action' },
  { slug: 'csr-champions', label: 'CSR Champions', icon: '🏆', desc: 'Corporate leaders turning profits into purpose' },
  { slug: 'rural-heroes', label: 'Rural Heroes', icon: '🌾', desc: 'Transforming Bharat from the grassroots up' },
  { slug: 'women-leaders', label: 'Women Leaders', icon: '👩‍💼', desc: 'Breaking barriers, building legacies' },
  { slug: 'youth-icons', label: 'Youth Icons', icon: '⚡', desc: 'Gen Z and millennial social entrepreneurs' },
  { slug: 'ngo-founders', label: 'NGO Founders', icon: '🤝', desc: 'Founders who chose impact over income' },
];

const FEATURED_HEROES = [
  {
    slug: 'anshu-gupta',
    name: 'Anshu Gupta',
    title: 'Founder, Goonj — The Clothing Man of India',
    tag: 'The Clothing Man of India',
    coverPhoto: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80',
    location: 'New Delhi',
    impact: '5 Million+ Lives · 4,000 Tons/Year',
    founded: '1999',
    category: 'NGO Founders',
    pullQuote: '"Not trash, this is someone\'s dignity — the urban surplus, rural India\'s self-respect."',
    story: [
      'It was the 1990s. In the bone-chilling winter of Delhi, while people huddled inside their homes under warm quilts, a young journalist named Anshu Gupta met a man named Habib. Habib\'s job was to pick up unclaimed dead bodies. During their conversation, Habib said something that shook the very foundation of Anshu\'s thought process: "I face no issues during summers when I collect bodies, but in winter, I have to pick up two to three bodies every day. People don\'t die of cold — people die of the lack of clothing in the cold."',
      'This single encounter forced Anshu Gupta to reflect on a devastating irony: while urban wardrobes overflowed with unused clothes and discarded fabrics treated as trash, a vast part of the nation was losing lives merely for the lack of a piece of cloth. Everyone talked about \'food, clothing, and shelter,\' but clothing was always brushed aside as mere charity — or worse, thrown away. Anshu and his wife, Meenakshi Gupta, wanted to create a voice that would echo across the entire nation, bridging the gap between urban surplus and rural necessity.',
      'Driven by this vision, in 1999, they left their corporate jobs, gathered just 67 clothes from their own home in Delhi, and laid the foundation of their organisation — naming it Goonj, meaning \'echo.\' What began in a single room in Delhi grew into one of India\'s most radical and innovative humanitarian organisations, operating across 25+ states, processing over 4,000 tonnes of urban material every year.',
      'Anshu strongly believed that handing out free items to the underprivileged trivialises their plight and hurts their self-respect. So he crafted an innovative model: Cloth for Work. Villagers collectively identify problems in their community — repairing roads, cleaning wells, building bamboo bridges, restoring schools. Once the community completes the work together, Goonj honours them with a Family Kit (clothes, utensils, rations). This not only develops the village but instils a sense of pride: they earned these goods through hard work, not as charity.',
      'Menstrual hygiene and the lack of cloth were severe, unaddressed problems for women in rural India. To tackle this, Goonj launched the \'Not Just a Piece of Cloth\' campaign — recycling cotton fabrics collected from cities into clean, reusable cotton pads called MY Pad, reaching women in the most remote villages where commercial sanitary products are either unavailable or unaffordable. Dignity, not pity, was always the point.',
      'What started with 67 clothes in a Delhi home gradually expanded into collection centres across Mumbai, Kolkata, Bengaluru, Hyderabad, and Chennai. As the journey grew to process over 4,000 tons of material every year, Anshu Gupta was honoured with Asia\'s highest award — the Ramon Magsaysay Award in 2015 (in Manila, Philippines) — for driving this historic social change. The world came to recognise him as The Clothing Man of India.',
    ],
    achievements: [
      { label: 'Lives Touched Annually', value: '5 Million+' },
      { label: 'Material Processed/Year', value: '4,000 Tons' },
      { label: 'States Covered', value: '25+' },
      { label: 'Founded With', value: 'Just 67 Clothes' },
    ],
    recognition: [
      'Ramon Magsaysay Award 2015 — Manila, Philippines',
      'Ashoka Fellow',
      'CNN-IBN Indian of the Year — Social',
      'NDTV Social Entrepreneur of the Year',
      'Padma Shri Nominee',
    ],
    philosophy: 'Cloth is not charity — it is a basic human need. Every discarded shirt in an urban home is a resource waiting to restore someone\'s dignity in a village. When we treat urban surplus as rural necessity, and when we exchange it for community effort rather than giving it free, we stop being donors and start being partners. That is the only way dignity survives.',
  },
  {
    slug: 'sonam-wangchuk',
    name: 'Sonam Wangchuk',
    title: 'Engineer, Educator & Innovator',
    tag: 'Ice Stupa Inventor',
    coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    location: 'Leh, Ladakh',
    impact: 'Glaciers & 1,000 Villages',
    founded: '1988',
    category: 'Changemakers',
    pullQuote: '"Nature does not waste. Ice melts in summer — exactly when crops need water. We just had to learn to store winter\'s gift for summer\'s need."',
    story: [
      'Sonam Wangchuk is many things: the engineer who invented the Ice Stupa (artificial glaciers that store winter water for spring irrigation), the educator who reformed Ladakh\'s failing school system, and the activist whose 21-day fast in 2024 put Ladakh\'s rights on national television.',
      'His most famous innovation — the Ice Stupa — is a cone-shaped artificial glacier built in winter. By draining river water through pipes and letting it freeze in cone shapes, villages in Ladakh\'s high-altitude desert can store millions of litres of water that melts precisely when spring crops need irrigation.',
      'Before the Ice Stupa, Wangchuk reformed Ladakh\'s education system. He founded SECMOL (Students\' Educational and Cultural Movement of Ladakh) — a school that runs entirely on solar energy and teaches students in their mother tongue. Rajkumar Hirani\'s character Phunsukh Wangdu in 3 Idiots was inspired by him.',
    ],
    achievements: [
      { label: 'Ice Stupas Built', value: '100+' },
      { label: 'Villages Benefited', value: '1,000+' },
      { label: 'Students Transformed', value: '35,000+' },
      { label: 'Water Stored (per stupa)', value: '10 Mn Litres' },
    ],
    recognition: ['Ramon Magsaysay Award 2018', 'TIME100 Most Influential 2024', 'Rolex Award for Enterprise', 'Global Thinker — Foreign Policy'],
    philosophy: 'Education is not about passing exams. It is about solving the real problems around you. Every village has problems. Every problem has a solution. Education is the bridge.',
  },
  {
    slug: 'bindeshwar-pathak',
    name: 'Dr. Bindeshwar Pathak',
    title: 'Founder, Sulabh International',
    tag: 'The Man Who Dignified Sanitation',
    coverPhoto: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
    location: 'Patna / New Delhi',
    impact: '600 Million Toilets, 10 Million Lives',
    founded: '1970',
    category: 'Changemakers',
    pullQuote: '"Untouchability cannot be ended by law alone. It ends when the Dalit who cleans your toilet is given a toilet of his own."',
    story: [
      'Dr. Bindeshwar Pathak founded Sulabh International in 1970 with one mission: eliminate manual scavenging in India and provide affordable sanitation to the poor. At the time, millions of Indians — mostly Dalit women — were forced to manually clean dry latrines, carrying human waste on their heads. It was India\'s most dehumanising practice.',
      'Sulabh\'s first innovation was the two-pit ecological toilet — a low-cost, waterless latrine that composted waste safely without requiring manual cleaning. At ₹600–₹1,200, it was affordable for the rural poor. Sulabh eventually built and maintained 1.5 million household toilets and 8,500 public toilet complexes across India.',
      'Dr. Pathak also worked to rehabilitate and reintegrate liberated scavengers — giving them vocational training, education for their children, and social respect. He passed away in 2023, but Sulabh continues under his legacy, serving 20 million people daily through its sanitation network.',
    ],
    achievements: [
      { label: 'Household Toilets Built', value: '1.5 Million' },
      { label: 'Public Complexes', value: '8,500+' },
      { label: 'Daily Users', value: '20 Million' },
      { label: 'Scavengers Liberated', value: '60,000+' },
    ],
    recognition: ['Padma Bhushan 1991', 'WHO Global 500 Award', 'International Gandhi Peace Prize', 'Energy Globe Award'],
    philosophy: 'Sanitation is a human right. It is the foundation of dignity. A nation that does not provide toilets cannot claim to be civilised — no matter how many satellites it launches.',
  },
  {
    slug: 'ela-bhatt',
    name: 'Ela Bhatt',
    title: 'Founder, SEWA',
    tag: 'Mother of the Informal Economy',
    coverPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80',
    location: 'Ahmedabad, Gujarat',
    impact: '2.7 Million Women Workers',
    founded: '1972',
    category: 'Women Leaders',
    pullQuote: '"The woman who sells vegetables at 5 AM in a city market is an entrepreneur. She just has no one on her side."',
    story: [
      'In 1972, Ela Bhatt founded SEWA — the Self Employed Women\'s Association — in Ahmedabad, Gujarat. Her mission: organise the millions of women who worked in India\'s informal economy — street vendors, home-based workers, agricultural labourers, domestic workers — and give them the collective power of a trade union.',
      'SEWA was a radical idea: a trade union for workers with no employer. These women were self-employed, working in their homes or on the streets, invisible to the formal economy. No one had tried to organise them before.',
      'Today, SEWA has 2.7 million members across India. It provides healthcare, childcare, housing, insurance, and credit to women who the formal system ignores. SEWA\'s cooperative bank is one of the most successful microfinance institutions in the world. Ela Bhatt is widely credited as a foundational architect of the global microfinance movement.',
    ],
    achievements: [
      { label: 'SEWA Members', value: '2.7 Million' },
      { label: 'States Active', value: '18+' },
      { label: 'SEWA Bank Members', value: '4.5 Lakh' },
      { label: 'Years of Service', value: '52' },
    ],
    recognition: ['Ramon Magsaysay Award 1977', 'Padma Bhushan 1985', 'Right Livelihood Award 1984', 'UN Human Development Award'],
    philosophy: 'Full employment and self-reliance for women — not just wage employment, but work that gives dignity, income, and a voice. When women have economic power, their families eat, their children study, and their communities change.',
  },
  {
    slug: 'arunachalam-muruganantham',
    name: 'Arunachalam Muruganantham',
    title: 'Social Entrepreneur',
    tag: 'The Pad Man of India',
    coverPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=80',
    location: 'Coimbatore, Tamil Nadu',
    impact: '4,400+ Villages, 1.3 Mn Women',
    founded: '2006',
    category: 'Rural Heroes',
    pullQuote: '"I am not Pad Man. I am a school dropout who stumbled upon a billion-dollar problem and refused to give up for 4 years."',
    story: [
      'Arunachalam Muruganantham — the man Bollywood immortalised as Pad Man — is a school dropout from Coimbatore who invented a low-cost sanitary napkin-making machine. His motivation was intensely personal: his wife could only afford rags during her period, and he was shocked to learn that 88% of Indian women used unhygienic materials due to the high cost of commercial pads.',
      'For 4 years, Muruganantham tested sanitary pad materials on himself, was declared mad by his village, and was abandoned by his wife and mother. He persisted. In 2006, he cracked the machine design — a low-cost device that could produce affordable pads. IIT Madras verified his invention. He was offered a patent and corporate deals worth crores.',
      'He turned them all down. Instead, he franchised the machine to rural women\'s self-help groups at cost — so that women in villages could manufacture pads locally, sell them at affordable prices, and earn an income. He gave up a patent worth billions to give 4,400+ villages sustainable access to affordable menstrual hygiene.',
    ],
    achievements: [
      { label: 'Villages Covered', value: '4,400+' },
      { label: 'Women Entrepreneurs', value: '1.3 Million' },
      { label: 'Countries Reached', value: '106' },
      { label: 'Cost Reduction', value: '95% vs MNCs' },
    ],
    recognition: ['TIME 100 Most Influential 2014', 'Forbes 48 Heroes of Philanthropy', 'IIT Madras Honorary Doctorate', 'Padma Shri 2016'],
    philosophy: 'If I had taken the money, it would have helped one person — me. By refusing it and franchising the machine, it helped 1.3 million women earn their independence. The poorest women in the world deserve profit, not pity.',
  },
  {
    slug: 'rajendra-singh',
    name: 'Rajendra Singh',
    title: 'Waterman of India',
    tag: 'Revived 11 Rivers, Recharged 12,000 Villages',
    coverPhoto: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80',
    location: 'Alwar, Rajasthan',
    impact: '12,000 Villages, 11 Rivers',
    founded: '1985',
    category: 'Rural Heroes',
    pullQuote: '"The river did not come back because I asked it to. It came back because the community built 11,000 johads, and the earth remembered water."',
    story: [
      'Rajendra Singh — the Waterman of India — arrived in Alwar district, Rajasthan in 1984 as a young Ayurvedic doctor planning to set up a clinic. What he found instead changed his life: villages without water, rivers that had dried up, farmers abandoning land. He forgot about medicine.',
      'Singh began working with local communities to revive the johad — a traditional Rajasthani rainwater harvesting structure. Over 40 years, he and his organisation Tarun Bharat Sangh have built over 11,000 johads across Rajasthan. The result: the Arvari, Ruparel, Sarsa, Bhagani, and Jahajwali rivers — all declared dead — have been revived and now flow year-round.',
      'The 12,000 villages around these rivers, once forced to migrate due to water scarcity, have returned to farming. The water table has risen 6 metres across 6,500 sq km. Rajendra Singh won the Stockholm Water Prize — the "Nobel of Water" — in 2015.',
    ],
    achievements: [
      { label: 'Johads Built', value: '11,000+' },
      { label: 'Rivers Revived', value: '11' },
      { label: 'Villages Benefited', value: '12,000' },
      { label: 'Water Table Rise', value: '6 Metres' },
    ],
    recognition: ['Stockholm Water Prize 2015', 'Ramon Magsaysay Award 2001', 'Padma Bhushan 2013', 'Earth Care Award'],
    philosophy: 'Water is not a resource to be managed by engineers. It is a relationship to be maintained by communities. Give people control over their water, and they will restore their rivers.',
  },
];

export default function SocialHeroProfile({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? '';
  const [selected, setSelected] = useState<typeof FEATURED_HEROES[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const found = FEATURED_HEROES.find(h => h.slug === slug);
      setSelected(found || null);
    }
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = activeCategory === 'All'
    ? FEATURED_HEROES
    : FEATURED_HEROES.filter(h => h.category === activeCategory);

  if (selected) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] text-black">
        {/* Top Bar */}
        <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="font-bold tracking-wider text-[11px] uppercase">Social Hero Profiles</span>
              </button>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black px-3 py-1.5 border border-gray-200 hover:border-black transition-colors">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial px-3 py-1.5 transition-colors">
                <BookmarkPlus className="w-3.5 h-3.5" /> Save Profile
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
            <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-3">{selected.location} · Active Since {selected.founded}</p>
            <h1 className="font-serif text-white text-4xl md:text-6xl font-bold leading-none mb-2">{selected.name}</h1>
            <p className="text-white/70 text-base md:text-lg font-medium">{selected.title}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-wrap gap-x-10 gap-y-3">
            {selected.achievements.map((a, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{a.label}</span>
                <span className="text-base md:text-xl font-serif font-bold text-black">{a.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Story */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-editorial" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">The Story</span>
                </div>
                <blockquote className="border-l-4 border-editorial pl-6 mb-6">
                  <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">{selected.pullQuote}</p>
                </blockquote>
                {selected.story.map((para, i) => (
                  <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{para}</p>
                ))}
              </div>

              {/* Philosophy */}
              <div className="bg-black text-white p-6 mb-8">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">Core Philosophy</p>
                <p className="text-base font-serif leading-relaxed italic text-white/90">{selected.philosophy}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recognition */}
              <div className="bg-white border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-editorial" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Recognition & Awards</span>
                </div>
                <div className="space-y-2">
                  {selected.recognition.map((r, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-editorial mt-0.5 flex-shrink-0">▸</span>
                      <span className="text-sm text-gray-700">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Tag */}
              <div className="border border-editorial p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Total Impact</p>
                <p className="font-serif text-2xl font-bold text-editorial">{selected.impact}</p>
                <p className="text-xs text-gray-500 mt-1">{selected.tag}</p>
              </div>

              {/* Other Heroes */}
              <div className="bg-white border border-gray-200 p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">More Heroes</p>
                <div className="space-y-2">
                  {FEATURED_HEROES.filter(h => h.slug !== selected.slug).slice(0, 4).map((h, i) => (
                    <button key={i} onClick={() => { setSelected(h); window.scrollTo(0,0); }}
                      className="w-full text-left flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors group">
                      <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold group-hover:text-editorial transition-colors">{h.name}</p>
                        <p className="text-[10px] text-gray-400">{h.tag}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Listing page
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Social Hero Profiles</span>
          </div>
        </div>
      </header>

      {/* Page Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden mt-14 bg-black">
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80" alt="Social Heroes" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-editorial text-[10px] font-bold tracking-[0.3em] uppercase mb-3">ProfileBizz · Special Series</span>
          <h1 className="font-serif text-white text-4xl md:text-6xl font-bold mb-3">Social Hero Profiles</h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl">Stories of Indians who chose impact over income — and changed the country in ways no government could.</p>
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

      {/* Hero Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        {/* Featured Hero */}
        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Featured Profile</p>
          <div
            onClick={() => setSelected(filtered[0])}
            className="cursor-pointer group relative h-96 overflow-hidden bg-gray-100"
          >
            <img src={filtered[0]?.coverPhoto} alt={filtered[0]?.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">{filtered[0]?.category}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1">{filtered[0]?.location} · {filtered[0]?.impact}</p>
              <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-1">{filtered[0]?.name}</h2>
              <p className="text-white/70 text-sm">{filtered[0]?.tag}</p>
            </div>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((hero) => (
            <div
              key={hero.slug}
              onClick={() => { setSelected(hero); window.scrollTo(0, 0); }}
              className="cursor-pointer group bg-white border border-gray-200 hover:border-black transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={hero.coverPhoto} alt={hero.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-editorial text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1">{hero.category}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-1">{hero.location} · {hero.impact}</p>
                <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-editorial transition-colors">{hero.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{hero.tag}</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{hero.story[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
