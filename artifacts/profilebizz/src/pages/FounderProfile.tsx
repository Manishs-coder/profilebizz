import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, Award, Quote, Languages } from 'lucide-react';
import { FOUNDERS_HI, SECTIONS_HI } from '../data/foundersHi';

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
     2. Nithin Kamath — Zero to One
  ══════════════════════════════════════ */
  'nithin-kamath': {
    name: 'Nithin Kamath',
    title: 'Co-Founder & CEO, Zerodha',
    profileType: 'Startup Founder',
    profileTag: 'Zero to One',
    location: 'Bengaluru, Karnataka',
    founded: '2010',
    revenue: '₹8,320 Crore (FY24)',
    employees: '1,200+',
    age: '44',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80',
    oneLiner:
      'The man who challenged traditional brokerages with a ₹20 flat-fee model—and transformed investing in India.',

    earlyLife: {
      pullQuote: '"I lost money before I made any. The market taught me everything the classroom never could — about risk, about discipline, and about what people really need."',
      body: [
        'Bengaluru, 1996. A seventeen-year-old boy from a middle-class family walks into a brokerage office, fills out an account-opening form, and hands over his savings. His name is Nithin Kamath. Within weeks, he has lost most of it.',
        'Most people would have walked away. Nithin did not. He was not angry at the market — he was curious about it. Why did prices move the way they did? What separated the traders who survived from those who didn\'t? These questions would consume the next fourteen years of his life, and the answers would eventually reshape how 73 million Indians invest their money.',
        'Growing up in Bengaluru — the elder of two brothers in a family where his father worked in the public sector — Nithin had always been drawn to numbers and systems. But it was the stock market that gave that curiosity a direction. Unlike a textbook, the market responded to you in real time, with real consequences. Lose attention for a moment, and you paid for it. Understand something others hadn\'t yet, and you were rewarded.',
        'So instead of quitting after his early losses, Nithin did something that would define his character as a founder: he took a night-shift job at a call centre in Bengaluru, working from late evening to early morning, so that his days remained completely free for trading. While his peers were building careers, collecting experience letters, and preparing for MBA entrance exams, Nithin was reading Jack Schwager at 2 pm and placing trades at 10 am. He was, in every sense, building a different kind of education — one the market would never let him fake.',
      ],
    },

    education: {
      timeline: [
        { year: '1996', event: 'Opened first trading account at age 17 — lost money immediately, chose to stay and learn' },
        { year: '1997–2004', event: 'Worked night shifts at a BPO/call centre; traded equities and derivatives during the day' },
        { year: '2004–2009', event: 'Quit night shifts — became a full-time proprietary trader, building expertise in F&O and market microstructure' },
        { year: '2009', event: 'Began mapping the gap: what retail investors needed versus what the brokerage industry was offering' },
        { year: '2010', event: 'Co-founded Zerodha with brother Nikhil Kamath — ₹10–15 lakh of personal savings, zero outside capital' },
      ],
      body: [
        'There is no IIT or IIM in Nithin Kamath\'s story. No analyst programme, no CFA, no MBA with a finance specialisation. His entire formal education ended before the stock market began to educate him properly.',
        'Over seven years of daily trading, he read everything he could find: Benjamin Graham on value, Jack Schwager\'s Market Wizards on trading psychology, academic papers on order flow and market microstructure. But unlike a student reading for an exam, Nithin was cross-referencing every idea against the trades he placed that same week. Theory met reality every single day — and when they disagreed, it cost him money. That tension made his understanding of markets visceral in a way no classroom could replicate.',
        '"Most people in financial services have studied markets. I traded them. There\'s a difference — you understand things viscerally when your own money is on the line," he has said. The discipline of asking why every time something went wrong — and going back to books or data until he found the answer — became the intellectual engine that would power Zerodha\'s DNA: a company that built for traders who wanted to understand what they were doing, not just click and hope.',
      ],
    },

    career: {
      timeline: [
        { year: '1997–2004', role: 'Night-shift Agent', org: 'BPO / Call Centre, Bengaluru' },
        { year: '2004–2009', role: 'Full-time Proprietary Trader', org: 'Self-directed, Bengaluru' },
        { year: '2010–Present', role: 'Co-Founder & CEO', org: 'Zerodha' },
        { year: '2014–Present', role: 'Founder', org: 'Rainmatter Capital (FinTech Investments & Incubation)' },
        { year: '2021–Present', role: 'Trustee', org: 'Rainmatter Foundation (Climate & Social Impact)' },
      ],
      body: [
        'By 2004, Nithin had become profitable enough to leave the night shifts entirely. He was twenty-five years old, with no formal credentials, no professional network in finance, and no employer willing to hire him — but he could trade. He spent the next five years honing his skills across equities, futures, and options, building a systematic edge that few retail traders in India had.',
        'But the more profitable he became, the more something else gnawed at him. Every single trade, a percentage went to the broker. Not a large percentage — but relentless, compounding, unavoidable. He started running the numbers. If a retail investor placed fifty trades a month, a standard percentage broker was collecting ₹15,000 to ₹25,000 every year — not in taxes, not in stamp duty, but purely in brokerage. Multiplied across millions of investors. Billions of rupees, silently extracted, year after year.',
        'That calculation — which he had experienced personally, painfully, for nearly a decade — became the founding insight of Zerodha. The brokerage industry in India was not just inefficient. It was structured, deliberately or not, to benefit brokers rather than clients. Nithin decided he would build the opposite. A broker whose business model worked only when clients succeeded.',
      ],
    },

    journey: {
      pullQuote: '"We were never trying to be the biggest broker. We were trying to be the most honest one. The size came later — and it came because of the honesty, not in spite of it."',
      body: [
        'On 15 August 2010 — Independence Day — Nithin and his brother Nikhil registered Zerodha. The name was a deliberate declaration: Zero + Rodha, the Sanskrit word for barrier. Remove the barriers. All of them. The brothers put in ₹10–15 lakh of their own savings. No venture capital, no angel investors, no pitch deck. Just a rented office in Bengaluru, two founders who had lived the problem they were trying to solve, and one audacious product idea.',
        'That idea: charge a flat ₹20 per executed order. Not a percentage. Not a tiered structure. Twenty rupees — the same whether you traded ₹10,000 or ₹10 crore. At a time when every major Indian broker was charging 0.3% to 0.5% of trade value, this was heresy. For a retail investor making a ₹1 lakh trade, legacy brokers charged ₹300–500. Zerodha charged ₹20. The math was embarrassingly clear. But math alone doesn\'t build a business.',
        'The first two years were, in Nithin\'s own words, "painfully slow." Zerodha had no marketing budget, no celebrity face, no newspaper ads. Nithin and Nikhil personally called every new sign-up to walk them through the platform. They replied to every complaint themselves, often late into the night. The early customers — mostly traders who had found Zerodha through online forums — were small in number but fiercely loyal. They had found something they hadn\'t expected from a financial services company: honesty. They told their friends. Their friends told their friends. Growth was slow, but it was real.',
        'The story changed in 2015, when Zerodha launched Kite. In an industry still shipping bloated desktop software built in the early 2000s, Kite was a shock — clean, fast, mobile-first, and genuinely beautiful to use. Traders who had spent years fighting their platforms suddenly had a tool that felt like it had been designed for them rather than against them. Kite spread through trading communities like a whisper becomes a shout. Customer acquisition, which had been a slow drip, became a flood.',
        'That same year, Nithin launched Varsity — a free, comprehensive financial education platform covering everything from equity basics to advanced options strategies. The conventional wisdom said: don\'t educate your customers too much, or they\'ll trade less and need you less. Nithin believed the opposite. An investor who understands what they are doing makes better decisions, stays in the market longer, trusts the platform more, and blames it less when things go wrong. Varsity now has over 15 million learners — more than any paid financial publication in India. It also became one of Zerodha\'s most powerful marketing tools, though that was never the plan.',
        'By 2020, Zerodha had crossed 10 lakh active clients. By 2022, that number had reached 60 lakh — making Zerodha the single largest broker on the National Stock Exchange, ahead of every bank-backed institution that had existed for decades. The company that had started with two brothers and ₹15 lakh in savings was now generating over ₹8,000 crore in annual revenue. And it had never, not once, raised a single rupee of outside capital.',
      ],
    },

    challenges: [
      {
        title: 'The Trust Problem: Building a Brand from Zero',
        body: 'When Zerodha launched in 2010, the brokers Indians trusted were ICICI Direct, HDFC Securities, Kotak Securities — names backed by the country\'s largest banks, with decades of advertising and regulatory history. Zerodha was an unknown startup with a Bengaluru address asking people to hand over their life savings. "We had no brand, so we had to build trust one conversation at a time," Nithin has said. For three years, every new customer received a personal call. Every complaint was escalated directly to the founders. It was slow, expensive in time, and impossible to scale — but it worked. That culture of radical personal accountability became Zerodha\'s most enduring competitive advantage, long after the company was large enough that it no longer needed to operate that way.',
      },
      {
        title: 'Scaling Without Someone Else\'s Money',
        body: 'In 2010, no VC was interested in funding a discount stockbroker. By 2015, when Zerodha was clearly working, VCs began calling. Nithin said no. "Not raising money means every rupee you spend has to earn its keep. You can\'t paper over bad decisions with someone else\'s capital." That constraint built a culture of extraordinary financial discipline — Zerodha has been profitable every single year of its existence, which almost no funded fintech startup in India can claim. The downside came in moments of peak demand: during the COVID-19 trading boom of 2020, when millions of new investors flooded the markets, Zerodha\'s infrastructure — which could not be expanded overnight on bootstrapped capital — was stretched in ways that caused real pain for customers.',
      },
      {
        title: 'When the Platform Goes Down at the Worst Possible Moment',
        body: 'In 2020 and 2021, during episodes of extreme market volatility, Zerodha\'s systems experienced outages that prevented customers from placing or exiting trades. Real money was affected. The criticism was sharp and justified. What made the difference was how Nithin responded: not with a PR statement, but with a detailed public post — every time — explaining exactly what had failed, why, what the fix was, and what compensation was being offered. He did not hide. He did not blame infrastructure vendors without naming the problem clearly. In a country where financial institutions typically respond to failure with silence or deflection, Nithin\'s openness was startling. Customers did not forget the outages. They also did not forget the honesty.',
      },
      {
        title: 'The Stroke — And What It Forced Him to Say Out Loud',
        body: 'In early 2023, at forty-three years old, Nithin Kamath suffered a mild stroke. He had been working fourteen-hour days for over a decade. He was sleeping badly. He was not exercising. He was carrying stress that had accumulated, silently, since 2010. He chose to disclose it publicly — a long, careful post about what had happened, what he had learned, and what he wished he had done differently. "No amount of success is worth destroying your health for. I was not taking care of myself, and my body gave me a warning I had to listen to." In a startup ecosystem that still celebrates founders who sacrifice everything, it was a rare act of courage: a billionaire telling the truth about the cost of building what he had built.',
      },
    ],

    success: {
      stats: [
        { label: 'Active Clients', value: '73 Lakh+' },
        { label: 'FY24 Revenue', value: '₹8,320 Cr' },
        { label: 'FY24 Net Profit', value: '₹4,700 Cr' },
        { label: 'VC Raised', value: '₹0' },
        { label: 'Rainmatter Portfolio', value: '100+ Startups' },
        { label: 'Varsity Learners', value: '15 Million+' },
      ],
      body: [
        'The numbers are extraordinary on their own terms. FY24: ₹8,320 crore in revenue, ₹4,700 crore in net profit, 73 lakh active clients. In an Indian startup ecosystem where many of the most celebrated companies have never turned a profit, Zerodha has been profitable every single year since it was founded. It is, by any measure, one of the most successful bootstrapped businesses in Indian history.',
        'But the numbers miss the more important story. What Nithin Kamath actually built was not just a profitable brokerage — it was proof that an entire industry could be restructured in favour of the customer and still generate extraordinary returns. Before Zerodha, percentage-based brokerage was the unquestioned norm. After Zerodha, every major broker in India has been forced to respond to the ₹20 flat-fee model. The competitive landscape of a multi-trillion-rupee industry was permanently altered by two brothers with ₹15 lakh and a conviction that the maths were wrong.',
        'Beyond Zerodha, Nithin has channelled his capital into Rainmatter Capital — backing over 100 startups across fintech, climate technology, and health. Rainmatter Foundation focuses on climate action and rural livelihoods. For a man who spent years watching the brokerage industry extract value from ordinary investors, building a vehicle to deploy capital back into the ecosystem — into companies trying to solve the next set of problems — feels less like philanthropy and more like the next logical move.',
      ],
    },

    leadership: {
      pullQuote: '"Transparency is not a PR strategy for us. It is a survival mechanism. In a trust-based business, the moment you start hiding things, you start dying — slowly, invisibly, but certainly."',
      traits: [
        { trait: 'Radical Transparency', desc: 'When Zerodha receives a SEBI order, Nithin posts about it publicly — before the media does. When the platform fails during peak trading, he writes a detailed post-mortem before the trading day ends. This is not a communications strategy. It is a deeply held belief that in a business built on trust, the only sustainable choice is honesty — even when, especially when, the news is bad. In India\'s financial services industry, historically defined by opacity, this approach has earned Zerodha a loyalty that no advertising campaign could purchase.' },
        { trait: 'Bootstrapped Discipline', desc: 'Fourteen years in, Zerodha has never taken a rupee of outside capital. What began as necessity — no VC wanted to fund a discount broker in 2010 — became philosophy. "When you are spending someone else\'s money, every mistake is expensive but survivable. When you are spending your own, every mistake is personal." That relationship with capital explains why Zerodha has been profitable every year of its existence, and why the company has never chased growth at the expense of financial health.' },
        { trait: 'Education as Core Strategy', desc: 'Varsity, Zerodha\'s free financial education platform, was built at a time when Zerodha was still small and could least afford the investment. Nithin\'s reasoning was contrarian: an investor who understands what they are doing makes better decisions, stays in the market longer, and trusts the platform more when things go wrong. Today, Varsity is read by more Indians than any paid financial publication in the country. It is also, quietly, one of the most powerful customer acquisition tools Zerodha has — though that was never the original intent.' },
        { trait: 'Long-term Over Short-term', desc: 'Zerodha has consciously passed on revenue opportunities that would have damaged customer outcomes. The company does not aggressively sell third-party products for commission. It does not push derivatives to first-time investors. It does not chase the highest-margin product at the expense of the right product. "Our business grows when our customers grow. If they lose money and leave, so do we. That alignment of interests is not a slogan — it is what makes every difficult decision simple."' },
      ],
    },

    awards: [
      { year: '2024', award: 'Forbes Asia — 50 Over 50 (Business & Finance)', body: 'Forbes Asia' },
      { year: '2023', award: 'Forbes India Rich List — Self-made billionaire, FinTech', body: 'Forbes India' },
      { year: '2022', award: 'Economic Times ET Awards — Entrepreneur of the Year', body: 'The Economic Times' },
      { year: '2021', award: 'Business Today Most Powerful CEO in Indian FinTech', body: 'Business Today' },
      { year: '2020', award: 'CNBC-TV18 India Business Leader Award — Disruptor of the Decade', body: 'CNBC-TV18' },
      { year: '2019', award: 'Hurun India — Zerodha ranked #1 Bootstrapped Unicorn', body: 'Hurun Research Institute' },
    ],

    interviews: [
      {
        outlet: 'The Ken',
        date: 'January 2024',
        question: 'Zerodha is now fourteen years old and still hasn\'t raised money. Is that still a conscious choice, or just inertia?',
        answer: 'It is absolutely a conscious choice at this point. In the early years, it was partly necessity — nobody was going to fund a discount broker in 2010. But we are past that now. We could raise capital tomorrow if we wanted to. We choose not to because raising money changes what you optimise for. You start optimising for the next funding round, for the narrative you\'re selling to investors, for growth metrics that look good on a deck. We only have one stakeholder to optimise for: the customer. That is a fundamentally different company from one that has to serve both customers and investors simultaneously.',
      },
      {
        outlet: 'Moneycontrol',
        date: 'September 2023',
        question: 'You disclosed your stroke publicly. Why did you feel the need to share something so personal?',
        answer: 'Because I think founder culture in India glorifies overwork in a way that is genuinely dangerous. I was working fourteen-hour days for years, sleeping badly, not exercising, carrying enormous stress — and I told myself that was what building a company required. The stroke was the market\'s way of telling me I was wrong. I shared it because I thought other founders needed to hear it from someone who had actually been through it, not just a wellness influencer. The company will outlast you. Your health is the one thing that actually won\'t be replaced.',
      },
      {
        outlet: 'YourStory',
        date: 'March 2022',
        question: 'Zerodha has been criticised for system outages during peak volatility. How do you respond to that?',
        answer: 'We respond by fixing it and explaining exactly what happened — in detail, publicly, before the trading day is over. When our systems fail, our customers can\'t trade. That is real money and real stress, and they deserve an honest explanation, not a PR response. The outages happened. Some were entirely our fault. Some were infrastructure problems that affected the whole industry. What I\'m proud of is how we handled them: we posted the reason, the fix, and the timeline every single time. Customers don\'t expect perfection from anyone. What they cannot forgive is dishonesty when things go wrong.',
      },
    ],
  },
};

/* ════════════════════════════════
   PAGE COMPONENT
════════════════════════════════ */
function StaticFounderContent({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  const founder = FOUNDERS[slug] ?? FOUNDERS['rajesh-kumar-vedas'];

  const [activeSection, setActiveSection] = useState('early-life');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Hindi content available?
  const hasHindi = Boolean(FOUNDERS_HI[slug]);
  const activeFounder = (lang === 'hi' && hasHindi) ? { ...founder, ...FOUNDERS_HI[slug] } : founder;
  const activeSections = lang === 'hi' ? SECTIONS_HI : SECTIONS;

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSection('early-life');
  }, [slug, lang]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = 'early-life';
      for (const s of activeSections) {
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
  }, [activeSections]);

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

      {/* ── Article Hero (YourStory-style) ── */}
      <div className="bg-white mt-14">

        {/* Centered text header */}
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-12 pb-10 text-center">

          {/* Category badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.18em] uppercase text-editorial border border-editorial px-3 py-1.5">
              {activeFounder.profileType}
              <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400">{activeFounder.profileTag}</span>
          </div>

          {/* Founder photo — large, above name */}
          <div className="flex justify-center mb-7">
            <img
              src={founder.photo}
              alt={activeFounder.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-white shadow-xl border border-gray-100"
            />
          </div>

          {/* Founder name */}
          <h1
            className="font-serif text-5xl md:text-[68px] font-bold text-black leading-[1.06] tracking-tight mb-5"
            style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '3rem', lineHeight: '1.3' } : {}}
          >
            {activeFounder.name}
          </h1>

          {/* Title & company */}
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-5"
            style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}>
            {activeFounder.title}
          </p>

          {/* One-liner */}
          <p className="text-base md:text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-9"
            style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: '2' } : {}}>
            {activeFounder.oneLiner}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-300 text-lg">◆</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 mb-10">
            <span className="font-semibold text-black">ProfileBizz Editorial</span>
            <span className="text-gray-300">•</span>
            <span>{activeFounder.location}</span>
            <span className="text-gray-300">•</span>
            <span>Founded {founder.founded}</span>
            <span className="text-gray-300">•</span>
            <span className="text-editorial font-semibold">{lang === 'hi' ? '8 मिनट पढ़ें' : '8 min read'}</span>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 divide-x divide-gray-200">
            {[
              { l: lang === 'hi' ? 'राजस्व' : 'Revenue',   v: founder.revenue },
              { l: lang === 'hi' ? 'कर्मचारी' : 'Employees', v: founder.employees },
              { l: lang === 'hi' ? 'आयु' : 'Age',           v: founder.age },
              { l: lang === 'hi' ? 'स्थापना' : 'Founded',   v: founder.founded },
            ].map((s) => (
              <div key={s.l} className="px-5 py-4 text-left">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1"
                  style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", letterSpacing: '0' } : {}}>{s.l}</p>
                <p className="font-serif text-2xl font-bold text-black">{s.v}</p>
              </div>
            ))}
          </div>

          {/* ── Language switch link — below stats ── */}
          <div className="mt-6 flex justify-center">
            <a
              href={lang === 'en'
                ? `${import.meta.env.BASE_URL}founder/hi/${slug}`
                : `${import.meta.env.BASE_URL}founder/${slug}`}
              className="flex items-center gap-2 border border-gray-300 hover:border-black px-5 py-2 text-sm font-semibold text-gray-600 hover:text-black transition-all group"
              style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              <Languages className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-black transition-colors" />
              {lang === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile Section Nav (visible only on mobile) ── */}
      <div className={`lg:hidden bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto ${lang === 'hi' ? 'lang-hi' : ''}`}>
        <div className="flex">
          {activeSections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors
                ${activeSection === s.id ? 'border-editorial text-editorial font-semibold' : 'border-transparent text-gray-500 hover:text-black'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Sticky Section Nav */}
        <aside className={`hidden lg:block lg:w-56 flex-shrink-0 ${lang === 'hi' ? 'lang-hi' : ''}`}>
          <div className="lg:sticky lg:top-20">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
              {lang === 'hi' ? 'इस प्रोफाइल में' : 'In This Profile'}
            </p>
            <nav className="flex flex-col gap-0">
              {activeSections.map((s) => (
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
        <article className={`flex-1 min-w-0 max-w-3xl ${lang === 'hi' ? 'lang-hi' : ''}`}>

          {/* ── 1. Early Life ── */}
          <section id="early-life" ref={setRef('early-life')} className="mb-16 scroll-mt-24">
            <SectionLabel index="01" label={activeSections[0].label} />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-founder text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                {activeFounder.earlyLife.pullQuote}
              </p>
            </blockquote>
            {activeFounder.earlyLife.body.map((p: string, i: number) => (
              <p key={i} className="font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 2. Education ── */}
          <section id="education" ref={setRef('education')} className="mb-16 scroll-mt-24">
            <SectionLabel index="02" label={activeSections[1].label} />
            <div className="my-6 space-y-0">
              {activeFounder.education.timeline.map((e: any, i: number) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black group-first:bg-editorial mt-1.5 flex-shrink-0" />
                    {i < activeFounder.education.timeline.length - 1 && (
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
            {activeFounder.education.body.map((p: string, i: number) => (
              <p key={i} className="font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 3. Career ── */}
          <section id="career" ref={setRef('career')} className="mb-16 scroll-mt-24">
            <SectionLabel index="03" label={activeSections[2].label} />
            <div className="my-6 border border-gray-200 divide-y divide-gray-200">
              <div className="grid grid-cols-3 bg-black text-white px-4 py-2.5">
                <span className="text-[10px] font-bold tracking-widest uppercase">{lang === 'hi' ? 'अवधि' : 'Period'}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">{lang === 'hi' ? 'भूमिका' : 'Role'}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">{lang === 'hi' ? 'संगठन' : 'Organisation'}</span>
              </div>
              {activeFounder.career.timeline.map((c: any, i: number) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-bold text-editorial">{c.year}</span>
                  <span className="text-sm text-gray-800 font-medium">{c.role}</span>
                  <span className="text-sm text-gray-600">{c.org}</span>
                </div>
              ))}
            </div>
            {activeFounder.career.body.map((p: string, i: number) => (
              <p key={i} className="font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 4. Entrepreneurial Journey ── */}
          <section id="entrepreneurial-journey" ref={setRef('entrepreneurial-journey')} className="mb-16 scroll-mt-24">
            <SectionLabel index="04" label={activeSections[3].label} />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-founder text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                {activeFounder.journey.pullQuote}
              </p>
            </blockquote>
            {activeFounder.journey.body.map((p: string, i: number) => (
              <p key={i} className="font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 5. Challenges ── */}
          <section id="challenges" ref={setRef('challenges')} className="mb-16 scroll-mt-24">
            <SectionLabel index="05" label={activeSections[4].label} />
            <div className="mt-6 space-y-6">
              {activeFounder.challenges.map((c: any, i: number) => (
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
            <SectionLabel index="06" label={activeSections[5].label} />
            <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200">
              {activeFounder.success.stats.map((s: any, i: number) => (
                <div key={i} className="bg-white px-5 py-4">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-1">{s.label}</p>
                  <p className="font-serif text-2xl font-bold text-black">{s.value}</p>
                </div>
              ))}
            </div>
            {activeFounder.success.body.map((p: string, i: number) => (
              <p key={i} className="font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5">{p}</p>
            ))}
          </section>

          <Divider />

          {/* ── 7. Leadership Style ── */}
          <section id="leadership-style" ref={setRef('leadership-style')} className="mb-16 scroll-mt-24">
            <SectionLabel index="07" label={activeSections[6].label} />
            <blockquote className="border-l-4 border-editorial pl-6 my-6">
              <p className="font-founder text-xl md:text-2xl text-gray-800 leading-relaxed italic">
                {activeFounder.leadership.pullQuote}
              </p>
            </blockquote>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeFounder.leadership.traits.map((t: any, i: number) => (
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
            <SectionLabel index="08" label={lang === 'hi' ? 'पुरस्कार एवं सम्मान' : 'Awards & Recognition'} />
            <div className="mt-6 space-y-0 border border-gray-200 divide-y divide-gray-100">
              {activeFounder.awards.map((a: any, i: number) => (
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
            <SectionLabel index="09" label={activeSections[8].label} />
            <div className="mt-6 space-y-8">
              {activeFounder.interviews.map((iv: any, i: number) => (
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
                      <span className="text-editorial font-bold mr-1.5">{lang === 'hi' ? 'प्र.' : 'Q.'}</span>{iv.question}
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
              {lang === 'hi' ? 'ऊपर जाएं' : 'Back to Top'}
            </button>
          </div>

        </article>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DB-DRIVEN DYNAMIC FOUNDER PAGE
══════════════════════════════════════ */
function DynamicFounderPage({ slug, lang }: { slug: string; lang: 'en' | 'hi' }) {
  const [founder, setFounder] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setFounder(null);
    setSections([]);
    Promise.all([
      fetch(`/api/public/founders/${slug}`).then(r => r.ok ? r.json() : null),
      fetch(`/api/public/founders/${slug}/sections?locale=${lang}`).then(r => r.ok ? r.json() : []),
    ])
      .then(([f, s]) => {
        setFounder(f);
        const secs = (s || []).filter((sec: any) =>
          sec.pullQuote || (sec.bodyParagraphs && sec.bodyParagraphs.length > 0) || sec.jsonData
        );
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

  return (
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
            <span className="text-[11px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-0.5" style={hf}>{founder.profileTag}</span>
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

      {/* ── Centered White Hero Header ── */}
      <div className="bg-white mt-14">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-12 pb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.18em] uppercase text-editorial border border-editorial px-3 py-1.5" style={hf}>
              {founder.profileType || 'Founder'}
              <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400" style={hf}>{founder.profileTag}</span>
          </div>
          <div className="flex justify-center mb-7">
            {founder.photoUrl ? (
              <img src={founder.photoUrl} alt={founder.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-white shadow-xl border border-gray-100" />
            ) : (
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gray-100 ring-4 ring-white shadow-xl flex items-center justify-center">
                <span className="text-4xl font-serif font-bold text-gray-300">{founder.name?.[0] || 'F'}</span>
              </div>
            )}
          </div>
          <h1 className="font-serif text-5xl md:text-[68px] font-bold text-black leading-[1.06] tracking-tight mb-5"
            style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '3rem', lineHeight: '1.3' } : {}}>
            {founder.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-5" style={hf}>{founder.designation}</p>
          {founder.oneLiner && (
            <p className="text-base md:text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-9" style={lang === 'hi' ? { ...hf, lineHeight: '2' } : {}}>
              {founder.oneLiner}
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
          <div className="mt-6 flex justify-center">
            <a href={lang === 'en' ? `${import.meta.env.BASE_URL}founder/hi/${slug}` : `${import.meta.env.BASE_URL}founder/${slug}`}
              className="flex items-center gap-2 border border-gray-300 hover:border-black px-5 py-2 text-sm font-semibold text-gray-600 hover:text-black transition-all group"
              style={lang === 'hi' ? hf : {}}>
              <Languages className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-black transition-colors" />
              {lang === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}
            </a>
          </div>
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
                {s.sectionKey}
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
                      {s.sectionKey}
                    </button>
                  ))}
                </nav>
              </>
            )}
            <div className="border border-gray-200 p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Share Profile</p>
              <div className="flex gap-2 flex-wrap">
                {['LinkedIn', 'Twitter', 'WhatsApp'].map((p) => (
                  <a key={p} href="#" className="text-[10px] font-bold tracking-wider uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 px-2 py-1 hover:border-editorial">{p}</a>
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
                  <section id={sec.sectionKey} ref={setRef(sec.sectionKey)} className="mb-16 scroll-mt-24">
                    <SectionLabel index={String(idx + 1).padStart(2, '0')} label={sec.sectionKey} />

                    {sec.pullQuote && (
                      <blockquote className="border-l-4 border-editorial pl-6 my-6">
                        <p className="font-founder text-xl md:text-2xl text-gray-800 leading-relaxed italic"
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
                            className="tinymce-content font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9]"
                            style={lang === 'hi' ? hfl : {}}
                            dangerouslySetInnerHTML={{ __html: jd.htmlContent }}
                          />
                        : sec.bodyParagraphs?.map((p: string, i: number) => (
                            <p key={i} className="font-founder text-[17px] md:text-[18px] text-gray-700 leading-[1.9] mb-5"
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
  );
}

/* ── Wrapper: routes to Static (hardcoded) or Dynamic (DB) ── */
export default function FounderProfile({ params, locale }: { params?: { slug?: string }; locale?: 'en' | 'hi' }) {
  const slug = params?.slug ?? 'rajesh-kumar-vedas';
  const lang = locale ?? 'en';
  if (FOUNDERS[slug]) {
    return <StaticFounderContent slug={slug} lang={lang} />;
  }
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
