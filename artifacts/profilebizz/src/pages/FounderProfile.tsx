import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, Award, Quote } from 'lucide-react';

const SECTIONS = [
  { id: 'early-life',              label: 'Early Life' },
  { id: 'education',               label: 'Education' },
  { id: 'career',                  label: 'Career' },
  { id: 'entrepreneurial-journey', label: 'Entrepreneurial Journey' },
  { id: 'challenges',              label: 'Challenges' },
  { id: 'success',                 label: 'Success' },
  { id: 'leadership-style',        label: 'Leadership Style' },
  { id: 'awards',                  label: 'Awards' },
  { id: 'interviews',              label: 'Interviews' },
];

/* ══════════════════════════════════════
   FOUNDERS DATA
══════════════════════════════════════ */
const FOUNDERS: Record<string, any> = {

  /* ── 1. Rajesh Kumar Vedas (existing) ── */
  'rajesh-kumar-vedas': {
    name: 'Rajesh Kumar Vedas',
    title: 'Founder & CEO, Vedas Agro Industries',
    profileType: 'Rural Founder',
    profileTag: 'Bharat Builder',
    location: 'Lucknow, Uttar Pradesh',
    founded: '2011',
    revenue: '₹210 Crore',
    employees: '1,400+',
    age: '44',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
    oneLiner:
      'From a small UP village with no electricity to building India\'s fastest-growing agri-processing company — Rajesh Kumar Vedas rewrote the rules of rural entrepreneurship.',

    earlyLife: {
      pullQuote: '"We had no electricity at home till I was 12. My mother cooked by lamplight. That darkness taught me to be obsessed with light — with progress."',
      body: [
        'Rajesh Kumar Vedas was born in 1980 in Bachhrawan, a small village in Rae Bareli district of Uttar Pradesh. The youngest of five children born to a farmer father and schoolteacher mother, Rajesh grew up in conditions that most urban Indians cannot imagine — erratic power, no piped water, and a single-room home shared by seven people.',
        'His father, Ramlal Vedas, cultivated two acres of wheat and mustard. The family income rarely crossed ₹3,000 a month. Yet his mother, Savitri Devi, ran the village\'s only primary school from their courtyard and insisted all her children complete their education, no matter what.',
        'It was watching his father sell wheat at distress prices to local middlemen — often for less than the cost of production — that planted the first seed of what would become Vedas Agro. "I saw my father work 14-hour days only to be cheated at the mandi. I promised myself I would fix that someday," Rajesh has said in multiple interviews.',
      ],
    },

    education: {
      timeline: [
        { year: '1994', event: 'Matriculation from Government Inter College, Rae Bareli — District topper' },
        { year: '1996', event: 'Intermediate (Science) from Allahabad Board — Scored 89%' },
        { year: '2000', event: 'B.Sc. Agriculture, Sam Higginbottom University, Allahabad — First Class' },
        { year: '2003', event: 'MBA (Rural Management), IRMA Anand, Gujarat — Gold Medal' },
        { year: '2018', event: 'Executive Programme in Business Strategy, IIM Ahmedabad' },
      ],
      body: [
        'Rajesh\'s academic journey was funded almost entirely by scholarships and part-time work. At IRMA, he was exposed for the first time to the formal economics of agricultural value chains. His thesis — "Disintermediation in UP\'s Wheat Procurement: A Field Study" — was cited by the National Bank for Agriculture and Rural Development (NABARD) in a 2007 policy paper.',
        'Professor Arvind Patel, his thesis supervisor at IRMA, recalls: "Rajesh was not the most brilliant student in the room, but he was the most driven. Every problem he studied had a personal dimension for him. That made his work extraordinarily grounded."',
      ],
    },

    career: {
      timeline: [
        { year: '2003–2006', role: 'Field Officer', org: 'NABARD, Lucknow Regional Office' },
        { year: '2006–2009', role: 'Agri-Business Manager', org: 'ITC Limited, Agri Division, Kanpur' },
        { year: '2009–2011', role: 'Regional Head (North India)', org: 'DCM Shriram Industries' },
      ],
      body: [
        'Rajesh\'s early career was deliberately chosen to build domain depth, not income. At NABARD, he spent three years travelling UP\'s rural hinterland, documenting farmer distress and credit gaps. At ITC\'s eChoupal division, he helped onboard over 600 villages onto the digital procurement platform — his first hands-on experience of technology transforming agriculture.',
        'At DCM Shriram, he managed a ₹300 Crore agri-input distribution business across five states. It was here that he spotted the structural gap that would define his entrepreneurial life: India processed less than 8% of its agricultural output, losing billions in value that went overseas.',
      ],
    },

    journey: {
      pullQuote: '"Every investor I met told me the rural market was too risky. I told them: I\'m not betting on the market. I\'m betting on the farmer. There\'s a difference."',
      body: [
        'In 2011, with ₹18 lakh in personal savings and a ₹40 lakh loan from the UP State Industrial Development Corporation, Rajesh resigned from DCM Shriram and launched Vedas Agro Industries from a rented shed in Unnao.',
        'The founding thesis was simple but radical: buy directly from farmers at a 15% premium over mandi price, process locally, and sell packaged commodities — atta, mustard oil, rice — directly to modern trade retailers in cities. Cut out four layers of middlemen. Share the margin with farmers and consumers simultaneously.',
        'The first 18 months were brutal. Banks refused working capital loans. Three of his first five retail accounts cancelled orders citing "supply inconsistency." A hailstorm wiped out 40% of his contracted wheat crop in April 2012. "I went home that night and sat in my car outside my apartment for two hours. I couldn\'t go inside and face my wife," Rajesh recalls.',
        'The turning point came in late 2012 when Big Bazaar\'s category buyer — a chance introduction through an IIM Ahmedabad alumni network — tasted the Vedas Gold atta and placed a 5,000 kg trial order. That order became 50,000 kg within six months.',
      ],
    },

    challenges: [
      {
        title: 'The 2014 Working Capital Crisis',
        body: 'A delayed monsoon and a banking sector cautious of agri-lending meant Vedas Agro nearly ran out of cash to procure wheat during peak season. Rajesh personally called 28 banks over 3 weeks. All said no. He finally secured a ₹2 Crore emergency line from a cooperative bank in Rae Bareli by pledging his family home.',
      },
      {
        title: 'Competing with FMCG Giants',
        body: 'When Vedas Agro crossed ₹50 Crore in revenue in 2016, it attracted the attention — and counter-marketing budgets — of two national FMCG brands. They slashed retail margins on competing SKUs and pressured distributors to deprioritize Vedas. Rajesh responded by building a direct-to-retailer network, cutting distributors entirely in 12 cities.',
      },
      {
        title: 'COVID and the Supply Chain Collapse',
        body: 'In March 2020, Vedas Agro had 1,100 MT of grain in transit when the national lockdown was announced. Rajesh spent 72 hours on calls with state government officials and logistics partners to ensure trucks were not impounded. The company not only survived but grew 34% in FY2021 as branded packaged foods surged.',
      },
    ],

    success: {
      stats: [
        { label: 'Annual Revenue (FY24)', value: '₹210 Crore' },
        { label: 'Farmer Partners', value: '18,000+' },
        { label: 'States Present', value: '14' },
        { label: 'Retail Touchpoints', value: '85,000+' },
        { label: 'SKUs', value: '62' },
        { label: 'Employee Strength', value: '1,400+' },
      ],
      body: [
        'Today, Vedas Agro is one of India\'s fastest-growing agri-processing companies, with six processing plants across UP, Bihar, and Punjab. The company\'s flagship Vedas Gold Atta commands a 12% market share in modern trade in UP, outselling Aashirvaad in three of its five key cities.',
        'In 2022, the company raised ₹85 Crore in Series B funding from Omnivore Partners and a family office, valuing it at ₹650 Crore. Forbes India profiled Rajesh in its 2023 "Agri-Champions" list. The DPIIT recognised Vedas Agro as one of India\'s top 50 agri-startups.',
        'More personally meaningful to Rajesh: 18,000 farmers in his network now receive payments within 48 hours of procurement — a service no mandi has ever offered.',
      ],
    },

    leadership: {
      pullQuote: '"I never hire someone I wouldn\'t be comfortable learning from. Every person in my company knows something I don\'t. That\'s not a weakness — that\'s design."',
      traits: [
        { trait: 'Field-First', desc: 'Rajesh visits at least one procurement zone personally every month. He believes leadership disconnected from the field becomes fiction.' },
        { trait: 'Radical Transparency', desc: 'Monthly all-hands meetings where P&L data — including losses — is shared with every employee, down to factory workers.' },
        { trait: 'Patient Capital Mindset', desc: 'Vedas Agro has never done a down round and has never taken on debt it could not service within 18 months. Rajesh calls this "the discipline of founders who can\'t afford a mistake."' },
        { trait: 'Farmer-Centric Design', desc: 'Every product decision is run through a single filter: does this help us pay farmers more? If yes, it gets prioritized.' },
      ],
    },

    awards: [
      { year: '2023', award: 'Forbes India Agri-Champions List', body: 'Forbes India' },
      { year: '2023', award: 'Top 50 Agri-Startups', body: 'DPIIT, Government of India' },
      { year: '2022', award: 'Ernst & Young Entrepreneur of the Year — Agri & Food Processing', body: 'EY India' },
      { year: '2021', award: 'Best Rural Enterprise of the Year', body: 'CII National Awards' },
      { year: '2019', award: 'NABARD Agri-Business Leadership Award', body: 'NABARD' },
      { year: '2017', award: 'Udyog Ratna, Uttar Pradesh Government', body: 'Government of UP' },
    ],

    interviews: [
      {
        outlet: 'The Economic Times',
        date: 'March 2024',
        question: 'What is the one mistake early-stage agri-founders make most often?',
        answer: 'They solve for the urban consumer first. They forget that the real product is the farmer relationship. Get that right — fair price, fast payment, consistent procurement — and everything downstream becomes easier. Most people reverse this and wonder why their supply is unreliable.',
      },
      {
        outlet: 'Forbes India',
        date: 'November 2023',
        question: 'You turned down an acquisition offer from a large FMCG conglomerate. Why?',
        answer: 'They wanted to move procurement to futures markets and cut direct farmer sourcing to save 3% on input costs. I said: that 3% is the entire reason this company exists. We are not for sale if the price is our founding principle.',
      },
      {
        outlet: 'IIM Ahmedabad Business Review',
        date: 'June 2022',
        question: 'How do you think about competition from large FMCG brands?',
        answer: 'They have the brand and the shelf space. We have the farmer and the story. Indian consumers are increasingly choosing who they trust, not just what they recognise. Our job is to make "Vedas" mean something. The large brands\' job is to protect what they already mean. Those are very different jobs.',
      },
    ],
  },

  /* ══════════════════════════════════════
     2. Nikhil Agarwal — Zero to One
  ══════════════════════════════════════ */
  'nikhil-agarwal': {
    name: 'Nikhil Agarwal',
    title: 'Founder & CEO, KiranaOS Technologies',
    profileType: 'Startup Founder',
    profileTag: 'Zero to One',
    location: 'Jaipur, Rajasthan',
    founded: '2021',
    revenue: '₹8.4 Crore ARR',
    employees: '68',
    age: '26',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80',
    oneLiner:
      'Nikhil Agarwal dropped out of NIT Jaipur in his final year to build KiranaOS — a SaaS platform that digitized 14,000 kirana stores in 18 months, going from ₹0 to ₹8.4 crore ARR with no prior business experience.',

    earlyLife: {
      pullQuote: '"My father ran a kirana store for 22 years. He knew every customer\'s name but had no idea what his margin on each product was. That gap — between relationship and data — became my company."',
      body: [
        'Nikhil Agarwal was born in 1998 in Sikar, a mid-sized town in Rajasthan known for its coaching institutes and trading families. His father, Suresh Agarwal, ran a modest grocery store near the town\'s main market. His mother, Sunita, taught mathematics at a private school. Between them, they built a life that was stable but never comfortable.',
        'Growing up behind the counter of his father\'s shop, Nikhil saw first-hand how India\'s 12 million kirana stores operated: paper ledgers, cash-only transactions, no inventory tracking, and supply decisions made purely by intuition. A Rs 50,000 stock would often carry Rs 8,000 in near-expiry goods that nobody tracked.',
        '"I used to sit at the counter doing homework after school. I watched my father make the same restocking mistake every month because he had no system. By the time I was in Class 10, I had started maintaining an Excel sheet for him on an old laptop. His losses from expired goods dropped 60% in six months."',
        'That early, accidental experiment with data and retail operations would define everything that came after. By the time Nikhil reached NIT Jaipur to study Computer Science in 2017, he already knew what problem he wanted to solve.',
      ],
    },

    education: {
      timeline: [
        { year: '2014', event: 'Secondary School, Govt. Senior Secondary School, Sikar — State Merit List (Science)' },
        { year: '2016', event: 'Class 12, Sikar — PCM, 96.2% — JEE Advanced qualified' },
        { year: '2017', event: 'B.Tech Computer Science, NIT Jaipur — Enrolled (Left in final year)' },
        { year: '2020', event: 'YCombinator Startup School — Online cohort (attended while in college)' },
        { year: '2021', event: 'Dropped out of NIT Jaipur in 4th year to found KiranaOS' },
      ],
      body: [
        'Nikhil was a strong but not exceptional student at NIT Jaipur — he ranked in the top 20% of his batch but rarely attended lectures after his second year. Instead, he spent his time building small apps, winning two national hackathons, and reading everything he could find about SaaS unit economics. He credits Paul Graham\'s essays and Sanjay Mehta\'s podcast on Indian D2C brands as his real education.',
        '"College gave me the fundamentals of programming. But the real curriculum was YouTube, Hacker News, and going home every semester and watching my father run his shop. He was the user I was building for." His dropout was not impulsive — he had already built and tested a working prototype of KiranaOS with 14 stores before he submitted his resignation letter to the university.',
      ],
    },

    career: {
      timeline: [
        { year: 'Summer 2019', role: 'Software Intern', org: 'Jaipur-based logistics startup (UnBox)' },
        { year: 'Summer 2020', role: 'Product Intern (Remote)', org: 'Meesho — Seller Tools Team, Bengaluru' },
        { year: '2021 (Jan)', role: 'Founder', org: 'KiranaOS Technologies, Jaipur' },
      ],
      body: [
        'Nikhil\'s two internships were both deliberate choices — not for salary (both paid ₹15,000/month), but for exposure. At UnBox, he worked on last-mile delivery routing for small retailers — his first close look at the operational chaos between a brand and a kirana store. At Meesho, he worked on the seller onboarding flow and saw how even small sellers could be given tools that transformed their business.',
        '"At Meesho I saw Tier 2 sellers go from selling 10 items a week to 200 after we gave them a simple analytics dashboard. Same sellers. Same products. Better information. That was the proof I needed. Kirana stores needed the same thing — not an app to replace them, but a tool to make them smarter."',
      ],
    },

    journey: {
      pullQuote: '"I showed my father the prototype first. He looked at it for five minutes, then looked at me and said: \'If someone had given me this 20 years ago, I\'d have opened four more stores.\' I didn\'t need another user interview after that."',
      body: [
        'In January 2021, Nikhil dropped out of NIT Jaipur two semesters before graduating and moved back to Sikar with his laptop and ₹2.8 lakh in savings — the sum of two internship salaries and money won at hackathons. He gave himself 12 months.',
        'KiranaOS Version 1 was a simple Android app that let kirana owners scan barcodes to track inventory, set reorder alerts, and generate a daily sales report on WhatsApp. No AI. No dashboard. No subscription — completely free for the first 6 months. Nikhil personally onboarded the first 14 stores in Sikar, sitting with each owner for two hours to set up the app.',
        'The product spread through word of mouth faster than he expected. Within 60 days, 140 stores were using it without any marketing. Nikhil would wake up at 5 AM to answer store owner WhatsApp messages before they opened. He personally called every store that went inactive for more than 3 days. "My churn rate in the first year was 4%. The industry average is 25%. The only reason was that I treated every owner like he was my father."',
        'Revenue came in Month 7: a ₹299/month subscription that included WhatsApp-based sales reports, credit tracking for customers, and a supplier price comparison tool. Of the 500 stores on the free plan, 340 converted in the first month. By Month 12, KiranaOS had 2,400 paying stores and ₹72 lakh in annualised revenue. Nikhil then raised his seed round.',
      ],
    },

    challenges: [
      {
        title: 'No Co-founder, No Investors, No Safety Net',
        body: 'Nikhil built the first version of KiranaOS entirely alone — designing, coding, testing, and selling simultaneously. His father thought he had made a mistake leaving college. Three friends from NIT Jaipur who had promised to join him backed out when they received campus placements. For eight months, he worked 16-hour days with no salary, paying himself nothing. "There were weeks I would watch my bank account drop by ₹3,000 and calculate how many months I had left. But I kept going because the stores were growing."',
      },
      {
        title: 'The Payment Gateway Freeze',
        body: 'In Month 8, KiranaOS\'s payment processor froze ₹4.2 lakh in subscription revenue due to an automated fraud flag — a common problem for first-time SaaS founders with young businesses. The resolution took 34 days. Nikhil had no investor money to bridge the gap and nearly missed paying his one contracted developer. He personally called each of his 340 paying store owners to explain the situation — and not a single one cancelled their subscription. "That call told me more about our product-market fit than any metric."',
      },
      {
        title: 'Building for Users Who Don\'t Read',
        body: 'Over 60% of KiranaOS\'s early users were semi-literate in English and had never used a smartphone app beyond WhatsApp and YouTube. Every UI assumption Nikhil brought from his NIT education was wrong. He redesigned the app three times — removing all text labels and replacing them with icons, adding voice prompts in Hindi and Rajasthani, and making the daily report a WhatsApp image rather than an in-app dashboard. The third redesign cut support calls by 70% and doubled daily active usage.',
      },
    ],

    success: {
      stats: [
        { label: 'ARR (FY24)', value: '₹8.4 Crore' },
        { label: 'Paying Stores', value: '14,000+' },
        { label: 'Cities', value: '22' },
        { label: 'Monthly Churn', value: '3.1%' },
        { label: 'Seed Funding Raised', value: '₹4.8 Crore' },
        { label: 'Team Size', value: '68' },
      ],
      body: [
        'In 18 months from first revenue, KiranaOS crossed ₹8.4 crore in ARR with 14,000 paying kirana stores across 22 cities in Rajasthan, UP, and Madhya Pradesh. The company raised a ₹4.8 crore seed round in December 2022 from 100X.VC and two Rajasthan-based angel investors. The round was oversubscribed in 11 days.',
        'KiranaOS was featured in Economic Times Startup Awards 2023 as one of the top 10 emerging SaaS startups in India. NASSCOM listed Nikhil in its "25 Under 25 Startup Founders" cohort. The company is now building a B2B supply marketplace within the app — connecting kirana stores directly to FMCG distributors, cutting the traditional 3-layer distribution chain to a single click.',
        'His father\'s store in Sikar was the 14th store onboarded on KiranaOS. It is now the pilot for every new feature Nikhil builds.',
      ],
    },

    leadership: {
      pullQuote: '"I have 68 people working with me. Most of them are older than me. The only thing I can offer them that older founders can\'t is total honesty about what I don\'t know. I think that\'s why they stay."',
      traits: [
        { trait: 'User Obsession', desc: 'Nikhil spends one day every two weeks visiting stores in person — not for sales, but to watch owners use the product. Every feature in KiranaOS came from a store visit, not a board meeting.' },
        { trait: 'Frugality as Design', desc: 'With limited capital, KiranaOS was built to be profitable by Month 18. The engineering team of 8 runs infrastructure that serves 14,000 stores on a monthly AWS bill of ₹1.4 lakh.' },
        { trait: 'No Hierarchy', desc: 'The entire company works on a single WhatsApp group. Support calls, product bugs, sales wins — everything is visible to everyone. Nikhil responds personally to user complaints, even at midnight.' },
        { trait: 'Language-First Product', desc: 'KiranaOS is built in Hindi first, English second. Voice UI was added before dark mode. This principle — serve the user\'s language, not the engineer\'s — is enshrined in the company\'s product charter.' },
      ],
    },

    awards: [
      { year: '2023', award: 'Economic Times Startup Awards — Top 10 Emerging SaaS Startups', body: 'Economic Times' },
      { year: '2023', award: '25 Under 25 Startup Founders', body: 'NASSCOM' },
      { year: '2023', award: 'Best Retail Tech Solution — SME Category', body: 'Retail Association of India' },
      { year: '2022', award: 'Top 10 D2N (Direct to Neighbourhood) Startups', body: 'DPIIT Startup India' },
      { year: '2022', award: 'National Hackathon Winner — SaaSBee India', body: 'T-Hub, Hyderabad' },
    ],

    interviews: [
      {
        outlet: 'YourStory',
        date: 'February 2024',
        question: 'You dropped out of NIT with a semester left. What made you so sure?',
        answer: 'I wasn\'t sure. That\'s the honest answer. But I had 14 stores using my product every day, and two of them told me it had saved them money. That felt more real than my degree. The degree would still exist if I failed. The product window wouldn\'t. Kirana digitisation was happening — either I would be part of building it, or someone else would. I chose to be part of it.',
      },
      {
        outlet: 'Inc42',
        date: 'August 2023',
        question: 'You grew to 14,000 stores without a sales team. How?',
        answer: 'Every store owner in India knows 20 other store owners. When you do right by one, you get 20 referrals. We gave owners a referral code — if 5 of their contacts subscribed, they got 3 months free. But honestly, the referral programme wasn\'t the main driver. The product was. If the product doesn\'t make someone\'s daily life better within the first week, no referral programme in the world will save you.',
      },
      {
        outlet: 'The Ken',
        date: 'November 2023',
        question: 'What do you think most people get wrong about building for Bharat?',
        answer: 'They build for Bharat from Bengaluru. They read research reports and think they understand a kirana owner\'s life. I grew up in a kirana. My user is my father. You cannot design empathy into a product from a whiteboard. You have to live it. The founders who will win in Tier 2 and 3 India are the ones who grew up there and came back — not the ones who parachute in with an MBA thesis.',
      },
    ],
  },
};

/* ════════════════════════════════
   PAGE COMPONENT
════════════════════════════════ */
export default function FounderProfile({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'rajesh-kumar-vedas';
  const founder = FOUNDERS[slug] ?? FOUNDERS['rajesh-kumar-vedas'];

  const [activeSection, setActiveSection] = useState('early-life');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSection('early-life');
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = 'early-life';
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 180) current = s.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  /* All founder slugs for "Other Profiles" strip */
  const otherFounders = Object.entries(FOUNDERS).filter(([s]) => s !== slug);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">

      {/* ── Sticky Top Bar ── */}
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Founder Stories</span>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-0.5">{founder.profileTag}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black transition-colors px-3 py-1.5 border border-gray-200 hover:border-black">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial transition-colors px-3 py-1.5">
              <BookmarkPlus className="w-3.5 h-3.5" /> Save Profile
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Cover ── */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden mt-14">
        <img src={founder.coverPhoto} alt="cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-6 left-8">
          <span className="bg-editorial text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">
            {founder.profileType}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
          <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-3">{founder.location} · Founded {founder.founded}</p>
          <h1 className="font-serif text-white text-4xl md:text-6xl font-bold leading-tight mb-3">{founder.name}</h1>
          <p className="text-white/80 text-base md:text-lg font-medium">{founder.title}</p>
        </div>
      </div>

      {/* ── Founder Photo + Quick Stats Bar ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-shrink-0">
            <img
              src={founder.photo}
              alt={founder.name}
              className="w-20 h-20 md:w-24 md:h-24 object-cover border-4 border-white shadow-lg rounded-full -mt-14 md:-mt-16 ring-2 ring-black/10"
            />
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              { l: 'Revenue', v: founder.revenue },
              { l: 'Employees', v: founder.employees },
              { l: 'Age', v: founder.age },
              { l: 'Founded', v: founder.founded },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">{s.l}</span>
                <span className="text-xl font-serif font-bold text-black">{s.v}</span>
              </div>
            ))}
          </div>
          <p className="md:ml-auto md:max-w-sm text-sm text-gray-600 leading-relaxed italic border-l-2 border-editorial pl-4">
            {founder.oneLiner}
          </p>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Sticky Section Nav */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="lg:sticky lg:top-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">In This Profile</p>
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

            {/* Other founders */}
            {otherFounders.length > 0 && (
              <div className="mt-8 border border-gray-200 p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">More Founder Stories</p>
                <div className="flex flex-col gap-2">
                  {otherFounders.map(([s, f]) => (
                    <a key={s} href={`/founder/${s}`}
                      className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-editorial transition-colors">
                      <ChevronRight className="w-3 h-3 flex-shrink-0 group-hover:text-editorial" />
                      <span className="leading-snug">{f.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share card */}
            <div className="mt-4 border border-gray-200 p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Share Profile</p>
              <div className="flex gap-2 flex-wrap">
                {['LinkedIn', 'Twitter', 'WhatsApp'].map((p) => (
                  <a key={p} href="#" className="text-[10px] font-bold tracking-wider uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 px-2 py-1 hover:border-editorial">
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0 max-w-3xl">

          {/* ── 1. Early Life ── */}
          <section id="early-life" ref={setRef('early-life')} className="mb-16 scroll-mt-24">
            <SectionLabel index="01" label="Early Life" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                {founder.earlyLife.pullQuote}
              </p>
            </blockquote>
            {founder.earlyLife.body.map((p: string, i: number) => (
              <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 2. Education ── */}
          <section id="education" ref={setRef('education')} className="mb-16 scroll-mt-24">
            <SectionLabel index="02" label="Education" />
            <div className="my-6 space-y-0">
              {founder.education.timeline.map((e: any, i: number) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black group-first:bg-editorial mt-1.5 flex-shrink-0" />
                    {i < founder.education.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-editorial">{e.year}</span>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{e.event}</p>
                  </div>
                </div>
              ))}
            </div>
            {founder.education.body.map((p: string, i: number) => (
              <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 3. Career ── */}
          <section id="career" ref={setRef('career')} className="mb-16 scroll-mt-24">
            <SectionLabel index="03" label="Career" />
            <div className="my-6 border border-gray-200 divide-y divide-gray-200">
              <div className="grid grid-cols-3 bg-black text-white px-4 py-2.5">
                <span className="text-[10px] font-bold tracking-widest uppercase">Period</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">Role</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">Organisation</span>
              </div>
              {founder.career.timeline.map((c: any, i: number) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-bold text-editorial">{c.year}</span>
                  <span className="text-sm text-gray-800 font-medium">{c.role}</span>
                  <span className="text-sm text-gray-600">{c.org}</span>
                </div>
              ))}
            </div>
            {founder.career.body.map((p: string, i: number) => (
              <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 4. Entrepreneurial Journey ── */}
          <section id="entrepreneurial-journey" ref={setRef('entrepreneurial-journey')} className="mb-16 scroll-mt-24">
            <SectionLabel index="04" label="Entrepreneurial Journey" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                {founder.journey.pullQuote}
              </p>
            </blockquote>
            {founder.journey.body.map((p: string, i: number) => (
              <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 5. Challenges ── */}
          <section id="challenges" ref={setRef('challenges')} className="mb-16 scroll-mt-24">
            <SectionLabel index="05" label="Challenges" />
            <div className="mt-6 space-y-6">
              {founder.challenges.map((c: any, i: number) => (
                <div key={i} className="border-l-4 border-gray-300 pl-5 py-1 hover:border-editorial transition-colors group">
                  <h4 className="text-base font-bold font-serif mb-2 group-hover:text-editorial transition-colors">{c.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 6. Success ── */}
          <section id="success" ref={setRef('success')} className="mb-16 scroll-mt-24">
            <SectionLabel index="06" label="Success" />
            <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200">
              {founder.success.stats.map((s: any, i: number) => (
                <div key={i} className="bg-white px-5 py-4">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1">{s.label}</p>
                  <p className="font-serif text-2xl font-bold text-black">{s.value}</p>
                </div>
              ))}
            </div>
            {founder.success.body.map((p: string, i: number) => (
              <p key={i} className="text-base text-gray-700 leading-[1.85] mb-4">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 7. Leadership Style ── */}
          <section id="leadership-style" ref={setRef('leadership-style')} className="mb-16 scroll-mt-24">
            <SectionLabel index="07" label="Leadership Style" />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                {founder.leadership.pullQuote}
              </p>
            </blockquote>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {founder.leadership.traits.map((t: any, i: number) => (
                <div key={i} className="bg-white border border-gray-200 p-5 hover:border-black transition-colors group">
                  <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-black text-white px-2 py-0.5 mb-3 group-hover:bg-editorial transition-colors">
                    {t.trait}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 8. Awards ── */}
          <section id="awards" ref={setRef('awards')} className="mb-16 scroll-mt-24">
            <SectionLabel index="08" label="Awards & Recognition" />
            <div className="mt-6 space-y-0 border border-gray-200 divide-y divide-gray-100">
              {founder.awards.map((a: any, i: number) => (
                <div key={i} className="flex items-start gap-5 px-5 py-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-black group-hover:bg-editorial transition-colors">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black group-hover:text-editorial transition-colors">{a.award}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.body}</p>
                  </div>
                  <span className="flex-shrink-0 text-[11px] font-bold text-editorial">{a.year}</span>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* ── 9. Interviews ── */}
          <section id="interviews" ref={setRef('interviews')} className="mb-16 scroll-mt-24">
            <SectionLabel index="09" label="Interviews" />
            <div className="mt-6 space-y-8">
              {founder.interviews.map((iv: any, i: number) => (
                <div key={i} className="bg-white border border-gray-200">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Quote className="w-3.5 h-3.5 text-editorial" />
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-700">{iv.outlet}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{iv.date}</span>
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-sm font-semibold text-black mb-3 leading-snug">
                      <span className="text-editorial font-bold mr-1.5">Q.</span>{iv.question}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed pl-4 border-l-2 border-gray-200">
                      {iv.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Back to top */}
          <div className="flex justify-center pt-4 pb-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 hover:border-editorial px-5 py-2.5"
            >
              <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
              Back to Top
            </button>
          </div>

        </article>
      </div>
    </div>
  );
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
