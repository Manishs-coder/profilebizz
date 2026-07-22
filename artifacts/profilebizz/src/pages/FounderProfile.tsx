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
      'Nithin Kamath built India\'s largest retail stockbroker without raising a single rupee of outside capital — starting from a Bengaluru bedroom, a trading terminal, and a single belief: that ordinary Indians deserved the same market access as the wealthy.',

    earlyLife: {
      pullQuote: '"I lost money before I made any. The market taught me everything the classroom never could — about risk, about discipline, and about what people really need."',
      body: [
        'Nithin Kamath was born in 1979 in Bengaluru, the elder of two brothers in a middle-class family. His father worked in the public sector; money was always present but never abundant. Growing up in a city that was fast becoming India\'s technology capital, Nithin was curious about numbers and systems — how things worked, who made money and how. By the time he was in his mid-teens, that curiosity had found a direction: the stock market.',
        'At seventeen, Nithin opened his first trading account. He was not driven by ambition so much as fascination. The market was alive — prices moved, companies rose and fell, fortunes changed overnight. He put in his savings, placed trades, and watched them go wrong almost immediately. He lost money. Then he lost more. He learned, as every trader eventually must, that the market does not care about your intentions, only your decisions.',
        'What set Nithin apart from the thousands of young men who try the markets, lose, and quit was what he chose to do next. He did not walk away. Instead, he took a night-shift job at a call centre in Bengaluru — working from late evening to early morning — so that his days remained free for trading. He read every book he could find on market microstructure, derivatives, and trading psychology. He studied what separates profitable traders from losing ones. For nearly seven years, this was his life: trading by day, working by night, learning always.',
        'Those years of financial struggle and grinding self-education would not look impressive on a CV. There was no degree to show, no employer to impress, no career milestone to celebrate. But they gave Nithin something most founders never have: he experienced the Indian financial system entirely as a small retail participant — subject to every inefficiency, every opaque charge, every clunky platform that the system inflicted on ordinary investors. He did not study the problem from the outside. He lived it, daily, for almost a decade.',
      ],
    },

    education: {
      timeline: [
        { year: '1996', event: 'Opened first trading account at age 17 — began self-directed education in equity markets' },
        { year: '1997–2004', event: 'Worked night shifts at a BPO/call centre; traded equities and derivatives during the day' },
        { year: '2004–2009', event: 'Full-time proprietary trader — built systematic expertise in market microstructure, F&O, and retail investor behaviour' },
        { year: '2009', event: 'Began conceptualising Zerodha — mapping the gap between what retail investors needed and what existed' },
        { year: '2010', event: 'Co-founded Zerodha with brother Nikhil Kamath with ₹10–15 lakh of personal savings' },
      ],
      body: [
        'Nithin Kamath never attended an IIT or IIM. He did not complete a finance degree or go through the analyst programmes that most people in financial services pass through. His entire education was the market itself — and it was ruthless, unforgiving, and thorough.',
        'Over seven years of trading, he read voraciously: Benjamin Graham and David Dodd on value investing, Jack Schwager\'s Market Wizards series on trading psychology, academic papers on order flow and market microstructure. He cross-referenced what he read against what he experienced in his own trades. This combination — theory tested daily against real capital — gave him an understanding of markets that was both deep and practical.',
        '"Most people in financial services have studied markets. I traded them. There\'s a difference — you understand things viscerally when your own money is on the line. Every time I lost, I had to figure out why. That discipline of constantly asking why is what eventually became Zerodha\'s DNA." The company Nithin would eventually build reflected this entirely: it was designed for traders who wanted to understand what they were doing, not just execute blindly.',
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
        'There is no corporate pedigree in Nithin Kamath\'s story. No McKinsey, no Goldman Sachs, no prestigious MBA. His career, by conventional Indian standards, would not have looked promising at 28: a call centre worker who traded stocks on the side, with no institutional backing and no professional network in financial services. The only thing he had was expertise — earned entirely through experience.',
        'By 2004, Nithin had improved enough as a trader to quit the night shifts and trade full-time. The next five years were spent honing his skills across equities, futures, and options. He was profitable, but the costs were always present: every trade, a percentage to the broker. Every month, a chunk of returns silently transferred to the brokerage industry. He began calculating what these costs meant, compounded over years. The number was staggering — and it was the same calculation millions of small investors were making, or not making, across India.',
        'By 2009, the idea that would become Zerodha had taken shape. India was adding retail investors rapidly, but the infrastructure serving them had barely changed in a decade. Platforms were built for a desktop era. Charges were structured to benefit brokers, not clients. Customer service was an afterthought. Nithin saw not just a gap in the market — he saw a better way to do everything. He just needed to build it.',
      ],
    },

    journey: {
      pullQuote: '"We were never trying to be the biggest broker. We were trying to be the most honest one. The size came later — and it came because of the honesty, not in spite of it."',
      body: [
        'On 15 August 2010, Nithin and Nikhil Kamath registered Zerodha. The name — a portmanteau of "Zero" and "Rodha" (the Sanskrit word for barrier) — said everything about the intent: remove every unnecessary barrier between an investor and the market. The founders put in ₹10–15 lakh of their own savings. No investors, no term sheets, no pitch decks. Just two brothers, a rented office, and a conviction that the brokerage industry had been overcharging people for long enough.',
        'The core product idea was audacious for 2010: a flat fee of ₹20 per executed order, regardless of trade size. At a time when every major broker charged a percentage of trade value — typically 0.3% to 0.5% — this was a radical departure. For a retail investor trading ₹1 lakh worth of stock, a percentage broker charged ₹300–500 per trade. Zerodha charged ₹20. The math was obvious. But convincing people to trust an unknown startup with their savings was anything but easy.',
        'The first two years were painfully slow. Zerodha had no advertising budget, no celebrity endorsements, no funded growth campaign. Nithin and Nikhil personally called new sign-ups to ensure they understood the platform. They resolved complaints themselves, often over the phone late into the night. The early community was small — largely traders who had discovered Zerodha through forums and word-of-mouth — but it was loyal. Every customer who had a good experience told ten others.',
        'The breakthrough came from an unexpected source: technology. In 2015, Zerodha launched Kite — a trading interface that was clean, fast, and worked flawlessly on mobile. In an industry still selling bloated desktop software from the early 2000s, Kite was a revelation. Traders who had spent years struggling with laggy, complicated platforms suddenly had something that worked the way a modern product should. Kite became viral within the trading community. Customer acquisition, which had been slow and deliberate, began to compound.',
        'In the same year, Zerodha launched Varsity — a free, comprehensive financial education platform covering everything from the basics of stock markets to advanced options strategies. Nithin\'s reasoning was counterintuitive: if you educate investors, they make better decisions, they stay longer, and they trust you more. A customer who understands what they are doing is a customer who doesn\'t blame you when they lose and stays with you when they win. Today, Varsity has over 15 million learners — making it the largest free financial education resource in India.',
        'By 2020, Zerodha crossed 10 lakh active clients. By 2022, it crossed 60 lakh — becoming the single largest broker on the National Stock Exchange by active client count, ahead of every bank-backed brokerage that had existed for decades. The company that had started with ₹15 lakh of personal savings was now generating over ₹8,000 crore in annual revenue. And it had still never raised a single rupee of external capital.',
      ],
    },

    challenges: [
      {
        title: 'Building Trust with No Brand and No Budget',
        body: 'When Zerodha launched in 2010, the names people trusted in broking were ICICI Direct, HDFC Securities, Kotak Securities — companies backed by India\'s largest banks, with decades of brand equity and television advertising. Zerodha was an unknown startup asking people to hand over their savings. For the first three years, Nithin\'s primary sales strategy was personal: every new customer got a call. Every complaint was resolved directly. "We had no brand, so we had to build trust one conversation at a time. It was slow. But it was the only foundation that lasts." That culture of direct, personal accountability — rare in a financial services company — became Zerodha\'s most durable competitive advantage.',
      },
      {
        title: 'Growing Without External Capital',
        body: 'Zerodha has never raised venture capital, private equity, or angel investment. This was not always a choice — in 2010, no VC in India was interested in a discount stockbroker. But as Zerodha grew, the constraint became a philosophy. "Not raising money means every rupee you spend has to earn its keep. You can\'t paper over bad decisions with someone else\'s capital. It makes you extraordinarily careful." The discipline instilled by bootstrapping explains why Zerodha, unlike many funded fintech companies, has been profitable every year of its existence. The downside: growth was slower than it could have been, and technology scaling during high-demand periods — particularly during the COVID-19 trading boom — tested infrastructure that could not be expanded overnight.',
      },
      {
        title: 'System Outages During Peak Market Events',
        body: 'On several occasions — including during extreme market volatility in 2020 and 2021 — Zerodha\'s systems experienced outages that prevented customers from placing or exiting trades. These incidents drew sharp criticism and significant media attention. For a company whose reputation was built on transparency and customer trust, the outages were genuinely painful. Nithin\'s response was characteristically direct: he posted detailed public explanations of what had gone wrong, what Zerodha was doing to fix it, and what compensation was offered. He did not hide behind PR statements. Whether customers agreed with the response or not, they respected its honesty.',
      },
      {
        title: 'The 2023 Health Scare — A Founder\'s Wake-Up Call',
        body: 'In early 2023, Nithin Kamath publicly disclosed that he had suffered a mild stroke — the consequence, he said, of years of overwork, poor sleep, and stress accumulated over more than a decade of running a high-growth company. He was 43. The disclosure was characteristically open: a long post on social media discussing his health, what he had learned, and why he was sharing it. "I want people to understand that no amount of success is worth destroying your health for. I was not taking care of myself, and my body gave me a warning I had to listen to." He stepped back from day-to-day operations temporarily, prompting an honest public conversation about founder burnout in India\'s startup ecosystem.',
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
        'In FY24, Zerodha reported revenues of ₹8,320 crore and a net profit of approximately ₹4,700 crore — making it one of the most profitable companies in India\'s entire startup ecosystem, funded or otherwise. The company that two brothers started with personal savings of ₹15 lakh now holds the top position on the NSE by active client count, ahead of every legacy bank-backed brokerage in the country.',
        'What makes Zerodha\'s success genuinely remarkable is not the scale — it is the method. In an era defined by VC-funded "blitzscaling," Zerodha grew organically, profitably, and without a single external investor. There was no Series A announcement, no unicorn valuation press release, no IPO roadshow. The company simply built a better product, earned customer trust, and reinvested its profits into making the product better still. It is one of the purest examples of compounding in Indian business history.',
        'Beyond Zerodha, Nithin has deployed his capital and conviction into Rainmatter Capital — an investment firm that has backed over 100 startups across fintech, climate technology, and health. Rainmatter Foundation, the philanthropic arm, focuses on climate action and rural livelihoods. For Nithin, success was never the destination. It was the resource with which to attempt the next set of problems.',
      ],
    },

    leadership: {
      pullQuote: '"Transparency is not a PR strategy for us. It is a survival mechanism. In a trust-based business, the moment you start hiding things, you start dying — slowly, invisibly, but certainly."',
      traits: [
        { trait: 'Radical Transparency', desc: 'When Zerodha receives a SEBI order, Nithin posts about it publicly. When the platform has a major outage, he writes a detailed explanation before the trading day ends. When he made a business mistake, he has discussed it openly on social media. In India\'s financial services industry — historically characterised by opacity and regulatory arbitrage — this level of public accountability is nearly unheard of. It has earned Zerodha a loyalty that no advertising budget could buy.' },
        { trait: 'Bootstrapped Discipline', desc: 'Fourteen years after founding, Zerodha has still never raised external capital. This is not stubbornness — it is a deeply held belief that profitability from day one creates a culture of accountability that funded companies cannot replicate. "When you are spending someone else\'s money, every mistake is expensive but survivable. When you are spending your own, every mistake is personal. That\'s a completely different relationship with risk."' },
        { trait: 'Education as Core Strategy', desc: 'Varsity, Zerodha\'s free financial education platform, is not a marketing exercise — it is the product of a genuine belief that India\'s biggest problem in retail investing is not access or cost, but knowledge. An educated investor makes better decisions, stays in the market longer, and blames the platform less when outcomes disappoint. Nithin invested in Varsity when Zerodha was still small, and it is now read by more Indians than any paid financial publication.' },
        { trait: 'Long-term Over Short-term', desc: 'Zerodha has consciously turned down opportunities that would have grown revenue in the short term but damaged customer outcomes. The company does not sell third-party mutual funds aggressively, does not push derivatives to inexperienced investors, and does not chase the highest-commission products. "Our business grows when our customers grow. If they lose, they leave. That alignment of interests is not a slogan — it is what makes every decision simple."' },
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
        answer: 'It is absolutely a conscious choice at this point. In the early years, it was partly necessity — nobody was going to fund a discount broker in 2010. But we are past that now. We could raise capital tomorrow if we wanted to. We choose not to because raising money changes what you optimise for. You start optimising for the next funding round, for the narrative you\'re selling to investors, for growth metrics that look good on a deck. We only have one stakeholder to optimise for: the customer. That is a different company from one that has to serve both customers and investors simultaneously.',
      },
      {
        outlet: 'Moneycontrol',
        date: 'September 2023',
        question: 'You disclosed your stroke publicly. Why did you feel the need to share something so personal?',
        answer: 'Because I think founder culture in India glorifies overwork in a way that is genuinely dangerous. I was working 14-hour days for years, sleeping badly, not exercising, carrying enormous stress — and I thought that was what building a company required. The stroke was the market\'s way of telling me I was wrong. I shared it because I thought other founders needed to hear it from someone who had actually been through it. The company will outlast you. Your health is the one thing that actually won\'t be replaced.',
      },
      {
        outlet: 'YourStory',
        date: 'March 2022',
        question: 'Zerodha has been criticised for system outages during peak volatility. How do you respond to that?',
        answer: 'We respond by fixing it and explaining what happened — in detail, publicly, before the day is over. We don\'t hide behind generic statements. When our systems fail, our customers can\'t trade, and that is real money and real stress. They deserve an honest explanation, not a PR response. The outages happened. Some were our fault. Some were infrastructure problems that affected the entire industry. What I\'m proud of is how we handled them: we posted the reason, the fix, and the timeline. Customers don\'t expect perfection. They expect honesty when things go wrong.',
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

      {/* ── Article Hero (YourStory-style) ── */}
      <div className="bg-white mt-14">

        {/* Centered text header */}
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-12 pb-10 text-center">

          {/* Category badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.18em] uppercase text-editorial border border-editorial px-3 py-1.5">
              {founder.profileType}
              <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400">{founder.profileTag}</span>
          </div>

          {/* Founder photo — large, above name */}
          <div className="flex justify-center mb-7">
            <img
              src={founder.photo}
              alt={founder.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-white shadow-xl border border-gray-100"
            />
          </div>

          {/* Founder name */}
          <h1 className="font-serif text-5xl md:text-[68px] font-bold text-black leading-[1.06] tracking-tight mb-5">
            {founder.name}
          </h1>

          {/* Title & company */}
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-5">
            {founder.title}
          </p>

          {/* One-liner */}
          <p className="text-base md:text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-9">
            {founder.oneLiner}
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
            <span>{founder.location}</span>
            <span className="text-gray-300">•</span>
            <span>Founded {founder.founded}</span>
            <span className="text-gray-300">•</span>
            <span className="text-editorial font-semibold">8 min read</span>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 divide-x divide-gray-200">
            {[
              { l: 'Revenue',   v: founder.revenue },
              { l: 'Employees', v: founder.employees },
              { l: 'Age',       v: founder.age },
              { l: 'Founded',   v: founder.founded },
            ].map((s) => (
              <div key={s.l} className="px-5 py-4 text-left">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">{s.l}</p>
                <p className="font-serif text-2xl font-bold text-black">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Section Nav (visible only on mobile) ── */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto">
        <div className="flex">
          {SECTIONS.map(s => (
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
        <aside className="hidden lg:block lg:w-56 flex-shrink-0">
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
