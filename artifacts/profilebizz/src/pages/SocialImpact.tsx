import React, { useState, useEffect } from 'react';
import { ChevronLeft, Share2, BookmarkPlus, Heart, Award, Users, Globe, Leaf, ChevronRight } from 'lucide-react';

/* ── Category config ──────────────────── */
export const IMPACT_CATEGORIES = [
  { slug: 'ngo',                 label: 'NGO',                  icon: '🤝', tag: 'Community Champions',       color: '#1a3a5c' },
  { slug: 'education',           label: 'Education',            icon: '📚', tag: 'Learning for All',          color: '#1a5c2e' },
  { slug: 'healthcare',          label: 'Healthcare',           icon: '🏥', tag: 'Health Equity',             color: '#5c1a1a' },
  { slug: 'environment',         label: 'Environment',          icon: '🌱', tag: 'Healing the Planet',        color: '#1a4a1a' },
  { slug: 'village-development', label: 'Village Development',  icon: '🏘️', tag: 'Bharat Rising',             color: '#3d2b0a' },
  { slug: 'csr',                 label: 'CSR',                  icon: '🏢', tag: 'Corporate Giving Back',     color: '#2b0a3d' },
];

/* ── Story type ───────────────────────── */
interface ImpactStory {
  id: string;
  name: string;
  org: string;
  location: string;
  category: string;
  coverPhoto: string;
  tag: string;
  reach: string;
  founded: string;
  headline: string;
  subline: string;
  problem: string;
  solution: string;
  impact: string;
  quote: string;
  lessons: string[];
  keyMetrics: { label: string; value: string }[];
  featured?: boolean;
}

/* ══════════════════════════════════════
   STORY DATA
══════════════════════════════════════ */
const STORIES: ImpactStory[] = [

  /* ─── NGO ─── */
  {
    id: 'goonj-ngo',
    name: 'Anshu Gupta', org: 'Goonj', location: 'Delhi → 23 States',
    category: 'ngo', tag: 'Urban Waste → Rural Resource',
    coverPhoto: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80',
    reach: '5 Crore People', founded: '1999',
    headline: 'He Turned India\'s Unused Clothes into Currency for Rural Labour',
    subline: 'Goonj redefined charity — clothes and goods go to villages not as donations, but as wages for community work.',
    problem: 'India\'s urban middle class discards millions of tonnes of usable clothing, utensils, and material every year — while rural communities lack basic materials. Traditional charity treats this as a one-way flow, creating dependence. Rural communities do real, unpaid development work (cleaning ponds, building roads) that governments don\'t fund.',
    solution: 'Goonj created "Cloth for Work" — a material-for-labour exchange. Urban donations are processed, sorted, and packed into dignified "Rahat" material. Rural communities that complete local development projects (digging wells, school repair, road cleaning) receive these materials as wages — not charity. Dignity is built into the transaction.',
    impact: 'Over 5 crore people touched across 23 states. 45,000+ tonnes of material repurposed annually. 5,000+ village-level projects completed each year through cloth-for-work. Goonj has built community infrastructure worth ₹100+ crore using materials India would have thrown away.',
    quote: '"Charity is the problem, not the solution. When we give free things, we destroy the self-respect of the receiver. We must pay people for their work — even if the currency is cloth."',
    lessons: [
      'Dignity in giving: material as wages, not gifts, preserves the receiver\'s self-respect',
      'Urban waste as rural resource — the arbitrage between city discard and village need',
      'Community-led development: Goonj does not decide what a village needs — the village does',
      'Scale through decentralisation: 23-state presence with minimal central staff by empowering local partners',
    ],
    keyMetrics: [
      { label: 'People Reached', value: '5 Crore+' },
      { label: 'States', value: '23' },
      { label: 'Material Repurposed/Year', value: '45,000 Tonnes' },
      { label: 'Village Projects/Year', value: '5,000+' },
      { label: 'Founded', value: '1999' },
      { label: 'Infrastructure Value', value: '₹100 Cr+' },
    ],
    featured: true,
  },
  {
    id: 'pratham-ngo',
    name: 'Madhav Chavan & Farida Lambay', org: 'Pratham', location: 'Mumbai → Pan India',
    category: 'ngo', tag: 'Learning Outcomes Revolution',
    coverPhoto: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=80',
    reach: '3 Crore Children', founded: '1995',
    headline: 'They Proved That India\'s 3 Crore Children Cannot Read a Simple Paragraph — Then Fixed It',
    subline: 'ASER Report changed India\'s education policy. Pratham\'s "Read India" campaign changed 3 crore lives.',
    problem: 'India was enrolling nearly all children in school by 2005 — but the Annual Status of Education Report (ASER), published by Pratham, revealed a silent crisis: half of Class 5 students could not read a Class 2 text. Enrollment was a success; learning was a catastrophe.',
    solution: 'Pratham\'s "Read India" campaign sent trained community volunteers into villages to teach basic literacy and numeracy using a 6-week, structured curriculum. The ASER report — published annually — tracked learning outcomes district by district, creating public accountability for school quality for the first time.',
    impact: 'Over 3 crore children touched annually across India. ASER Report is now cited in India\'s National Education Policy and referenced by the World Bank, UNICEF, and UNESCO. Pratham\'s Teaching at the Right Level (TaRL) model has been adopted by governments in 15 countries.',
    quote: '"We proved there was a crisis with data, built a solution with community volunteers, and gave it away to governments for free. That is how you change systems."',
    lessons: [
      'Data as a change tool: ASER\'s annual report created accountability where none existed',
      'Teaching at the Right Level (TaRL): group children by learning ability, not age or grade',
      'Government as the ultimate delivery partner: NGO pilots must be designed for state adoption',
      'Open-source methodology: Pratham publishes all curricula freely, enabling global adoption',
    ],
    keyMetrics: [
      { label: 'Children Reached/Year', value: '3 Crore+' },
      { label: 'Countries (TaRL)', value: '15' },
      { label: 'ASER Reports Published', value: '20 Annual' },
      { label: 'States', value: '21' },
      { label: 'Founded', value: '1995' },
      { label: 'Volunteers', value: '75,000+' },
    ],
    featured: true,
  },
  {
    id: 'smile-ngo',
    name: 'Santanu Mishra', org: 'Smile Foundation', location: 'Delhi → 25 States',
    category: 'ngo', tag: 'Child Rights & Education',
    coverPhoto: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80',
    reach: '15 Lakh Children', founded: '2002',
    headline: 'Built India\'s Largest Street Child Programme from a Delhi Slum Walk in 2002',
    subline: 'Mission Education: 15 lakh children, 25 states, ₹1 school fee.',
    problem: 'India had 18 million street and slum children in 2002 — working in dhabas, construction sites, and traffic signals — entirely outside the formal education system. Existing NGOs were small, geography-limited, and unable to scale.',
    solution: 'Smile Foundation launched "Mission Education" — a ₹1/day model where a donor funds one child\'s full year of schooling (including fees, uniform, books, meals) for ₹365. This made donor participation democratic — anyone could sponsor a child. Corporate CSR channelled through Smile put this at scale.',
    impact: 'Over 15 lakh children educated across 25 states. 650+ partner organisations in the network. Mission Education is one of India\'s largest child education programmes. The ₹365 model has been replicated by dozens of other NGOs as a donor communication template.',
    quote: '"₹1 a day. That is all it costs to change a child\'s life. We made giving so affordable that a chai wala and a CEO donate the same product — education."',
    lessons: [
      '₹365 (₹1/day) as a donor hook: reduces decision friction by anchoring to daily spend',
      'CSR as growth capital: Smile\'s model is corporate-donation-funded, making it scale without government dependence',
      'Network model: 650+ partner NGOs deliver last-mile; Smile provides funds and oversight',
      'Annual impact reports with child-level stories build donor retention beyond transactional giving',
    ],
    keyMetrics: [
      { label: 'Children Educated', value: '15 Lakh+' },
      { label: 'States', value: '25' },
      { label: 'Partner Orgs', value: '650+' },
      { label: 'Annual Budget', value: '₹80 Crore+' },
      { label: 'Founded', value: '2002' },
      { label: 'Corporate Partners', value: '400+' },
    ],
    featured: false,
  },

  /* ─── EDUCATION ─── */
  {
    id: 'teach-india-edu',
    name: 'Shaheen Mistri', org: 'Teach For India', location: 'Mumbai → 11 Cities',
    category: 'education', tag: 'Fellows in Urban Classrooms',
    coverPhoto: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80',
    reach: '40,000 Children/Year', founded: '2007',
    headline: 'IIT-IIM Graduates Teaching in Mumbai\'s Poorest Schools — and Loving It',
    subline: 'Teach For India placed 1,000 top graduates in low-income schools. 900+ now lead education systems.',
    problem: 'India\'s lowest-income children are taught by the least-experienced, lowest-paid, most demotivated teachers — while the country\'s best graduates enter finance, consulting, and tech. This teacher quality gap compounds over a child\'s entire schooling journey, locking them into poverty.',
    solution: 'Teach For India recruits top graduates from IITs, IIMs, and liberal arts colleges for a 2-year teaching fellowship in low-income government and low-cost private schools. Fellows are trained intensively in pedagogy, child psychology, and community engagement. Post-fellowship, they join the education ecosystem as founders, policy makers, and school leaders.',
    impact: 'Over 40,000 children directly taught annually across 11 cities. 5,000+ alumni in the fellowship network — 900+ working full-time in education leadership. Fellows have started 80+ education-focused organisations. Students taught by Teach For India fellows show 2x learning improvement on standardised assessments.',
    quote: '"The quality of a child\'s education should not depend on the zip code they are born in. We are building a generation of leaders who know this — because they have lived in those classrooms."',
    lessons: [
      'Top talent as a force multiplier: one skilled teacher impacts 40+ children per year for 2 years',
      'Post-fellowship ecosystem: the real return is 5,000+ alumni leading India\'s education reform',
      'Teacher training investment: TFI\'s 5-week summer institute is one of the most intensive in India',
      'City-specific partnerships with municipal corporations allow access to the hardest-to-reach schools',
    ],
    keyMetrics: [
      { label: 'Children Taught/Year', value: '40,000+' },
      { label: 'Fellows (Cumulative)', value: '5,000+' },
      { label: 'Cities', value: '11' },
      { label: 'Alumni in Education Leadership', value: '900+' },
      { label: 'Education Orgs Founded by Alumni', value: '80+' },
      { label: 'Learning Improvement', value: '2× vs Benchmark' },
    ],
    featured: true,
  },
  {
    id: 'akanksha-edu',
    name: 'Shaheen Mistri', org: 'Akanksha Foundation', location: 'Mumbai, Pune',
    category: 'education', tag: 'Slum Child to Engineer',
    coverPhoto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80',
    reach: '12,000 Children', founded: '1991',
    headline: 'She Started Teaching Slum Children at 18. Now Their Children Are Teaching in Her Schools.',
    subline: '30 years. 12,000 children. Intergenerational change — measured and proven.',
    problem: 'Mumbai\'s dharavi and slum children had no quality after-school education in 1991. Government schools in low-income areas were under-resourced. The aspiration gap between slum children and middle-class peers was closing only in ambition — not in opportunity.',
    solution: 'Akanksha runs after-school centres and full schools (in partnership with municipal corporations) in Mumbai and Pune\'s lowest-income areas. Its model is outcomes-focused: standardised learning assessments, trained teachers (not volunteers), and long-term 10-year engagement with the same child — from Class 1 to 10.',
    impact: 'Over 12,000 children currently enrolled. Akanksha students\' board exam pass rates exceed Mumbai city average by 15%. Several Akanksha alumni are now teachers and programme staff — the intergenerational impact is now visible in the organisation itself. 30+ years of unbroken operation.',
    quote: '"Don\'t just educate a child. Change the trajectory of their family. That takes 10 years of consistent presence — not a one-time donation."',
    lessons: [
      'Long-term engagement (10 years, same child) produces outcomes that short-term programmes cannot measure',
      'Outcomes data (board exam scores, college entry) as accountability tool with donors and government',
      'Municipal school partnership: operating inside government schools gives access to hardest-to-reach children',
      'Intergenerational signal: when alumni return as teachers, the model has achieved cultural reproduction',
    ],
    keyMetrics: [
      { label: 'Children Enrolled', value: '12,000+' },
      { label: 'Cities', value: 'Mumbai, Pune' },
      { label: 'Years of Operation', value: '33' },
      { label: 'Board Exam Outperformance', value: '+15% vs City Avg' },
      { label: 'Alumni as Staff', value: '40+' },
      { label: 'Schools', value: '30+' },
    ],
    featured: true,
  },
  {
    id: 'diksha-edu',
    name: 'NCERT / Government of India', org: 'DIKSHA Platform', location: 'Pan India',
    category: 'education', tag: 'EdTech for Bharat',
    coverPhoto: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80',
    reach: '25 Crore Students', founded: '2017',
    headline: 'India Built a Digital Learning Platform for 25 Crore Students — for Free',
    subline: 'DIKSHA: the world\'s largest national digital learning platform. No VC, no subscription, no data selling.',
    problem: 'India\'s 260 million school students had no unified digital learning resource. Commercial edtech (Byju\'s, Vedantu) was urban, English-medium, and subscription-based — invisible to rural, vernacular, and low-income children.',
    solution: 'DIKSHA (Digital Infrastructure for Knowledge Sharing) was built as an open-source national education platform with content in 36 languages, accessible on any smartphone, offline, and completely free. Every state government contributes curriculum-aligned content. Teachers get professional development. Students get QR-coded textbooks that link to videos.',
    impact: 'Over 25 crore students and teachers on the platform. 7 billion+ learning sessions. Content in 36 languages. Adopted by all 36 states and UTs. DIKSHA processed 6 crore+ online assessments in 2021–22. The platform was cloned by 13 countries through India\'s DPG (Digital Public Good) framework.',
    quote: '"Education technology should not create a two-tier system — good edtech for those who can pay, and nothing for those who cannot. DIKSHA is India\'s answer to that injustice."',
    lessons: [
      'Digital Public Good (DPG) model: open-source infrastructure with government mandate creates universal access',
      'Offline-first architecture: QR-linked textbooks work without internet, critical for rural India',
      'State-level content customisation within a national platform enables relevance + scale simultaneously',
      'Building for the median Indian child (vernacular, low-bandwidth) instead of the top 10% unlocks 25 crore users',
    ],
    keyMetrics: [
      { label: 'Students & Teachers', value: '25 Crore+' },
      { label: 'Learning Sessions', value: '7 Billion+' },
      { label: 'Languages', value: '36' },
      { label: 'States/UTs Using', value: '36' },
      { label: 'Countries Adopted', value: '13' },
      { label: 'Online Assessments', value: '6 Crore+ (FY22)' },
    ],
    featured: false,
  },

  /* ─── HEALTHCARE ─── */
  {
    id: 'arogyaworld-health',
    name: 'Dr. Nalini Saligram', org: 'Arogya World', location: 'Global HQ USA / India Operations',
    category: 'healthcare', tag: 'NCD Prevention at Scale',
    coverPhoto: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80',
    reach: '5 Crore People', founded: '2009',
    headline: 'A Silicon Valley Executive Who Left Tech to Fight India\'s Diabetes Epidemic',
    subline: 'Arogya World: NCD prevention for 5 crore Indians through workplace and school programmes.',
    problem: 'India has 77 million diabetics — the world\'s second-largest number. Non-communicable diseases (NCDs) like diabetes, hypertension, and heart disease kill 5.8 million Indians annually. 60% of these deaths occur in working-age adults — an economic catastrophe disguised as a health crisis.',
    solution: 'Arogya World runs employer-based NCD prevention programmes — screening, health education, and lifestyle coaching for factory workers and corporate employees. Its Healthy Workplace programme reaches workers who government health systems never see. The "mDiabetes" programme uses SMS-based behaviour change at zero cost.',
    impact: 'Over 5 crore people reached through NCD education. 1,700+ workplaces enrolled in Healthy Workplace programme. mDiabetes programme reached 1 lakh+ rural diabetics through basic SMS — no smartphone required. WHO recognised Arogya World\'s model for global replication.',
    quote: '"India cannot treat its way out of the diabetes epidemic. We have to prevent it. Prevention happens at the workplace, in the school, and at the kitchen table — not in the hospital."',
    lessons: [
      'Employer as healthcare delivery partner: workplaces reach working-age adults that hospitals miss',
      'mHealth on basic SMS: lowest common denominator technology reaches the highest-need population',
      'NCD prevention ROI: healthy workers = lower absenteeism = employer incentive to invest in wellness',
      'WHO validation as a global scaling mechanism — not just an award',
    ],
    keyMetrics: [
      { label: 'People Reached', value: '5 Crore+' },
      { label: 'Workplaces', value: '1,700+' },
      { label: 'mDiabetes Participants', value: '1 Lakh+' },
      { label: 'WHO Recognition', value: 'Yes' },
      { label: 'Countries', value: '3' },
      { label: 'Founded', value: '2009' },
    ],
    featured: true,
  },
  {
    id: 'jan-swasthya-health',
    name: 'Dr. Abhay Bang', org: 'SEARCH (Society for Education, Action & Research in Community Health)', location: 'Gadchiroli, Maharashtra',
    category: 'healthcare', tag: 'Tribal Healthcare Pioneer',
    coverPhoto: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
    reach: '4 Lakh Tribals', founded: '1986',
    headline: 'A Doctor Who Left Bombay for Gadchiroli\'s Jungles — and Halved Child Mortality in 10 Years',
    subline: 'SEARCH\'s village health worker model is now used by WHO and adopted across South Asia.',
    problem: 'Gadchiroli in 1986 had no functioning public health system for its 4 lakh tribal population. Infant mortality was 121/1000 live births — among the highest in India. Malaria, neonatal sepsis, and malnutrition were rampant. No private doctors would work there. Government posts were vacant.',
    solution: 'Dr. Abhay Bang and Dr. Rani Bang trained village women as "Arogyadoots" (health messengers) to provide home-based neonatal care — weighing newborns, managing hypothermia and infection, breastfeeding support. This community health worker model replaced the absent doctor with trained local women.',
    impact: 'Infant mortality in Gadchiroli reduced from 121 to 30/1000 in 15 years — a 75% reduction. The home-based neonatal care model has been adopted by the Government of India\'s ASHA programme (10 lakh ASHAs nationwide) and recommended by WHO for global adoption. SEARCH\'s malaria mortality was reduced by 87%.',
    quote: '"Modern medicine\'s biggest failure is not scientific — it is delivery. The poorest people who need it most are the farthest from hospitals. So we moved medicine to them."',
    lessons: [
      'Task shifting: non-doctors can deliver 80% of primary healthcare when trained and supervised',
      'Community health workers (CHWs) as the most cost-effective primary care delivery mechanism in low-income settings',
      'Evidence-first: SEARCH\'s randomised controlled trials gave the model scientific credibility for government adoption',
      'Living in the community: Bangs moved to Gadchiroli — proximity to the problem is a research and delivery advantage',
    ],
    keyMetrics: [
      { label: 'Population Covered', value: '4 Lakh' },
      { label: 'Infant Mortality Reduction', value: '75%' },
      { label: 'Malaria Deaths Reduced', value: '87%' },
      { label: 'ASHA Workers (Model Adopted)', value: '10 Lakh (National)' },
      { label: 'WHO Recommendation', value: 'Global Adoption' },
      { label: 'Founded', value: '1986' },
    ],
    featured: true,
  },
  {
    id: 'janseva-health',
    name: 'Jan Swasthya Sahyog', org: 'Jan Swasthya Sahyog', location: 'Bilaspur, Chhattisgarh',
    category: 'healthcare', tag: 'Low-Cost Rural Hospital',
    coverPhoto: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80',
    reach: '3 Lakh Patients/Year', founded: '1999',
    headline: 'They Built a Hospital in Chhattisgarh\'s Jungles Where OPD Costs ₹10 — and Quality Rivals Private Hospitals',
    subline: 'AIIMS graduates in the forest. Zero profit, 3 lakh patients a year.',
    problem: 'Bilaspur district in Chhattisgarh had one of India\'s worst health indicators in 1999 — and 80% of its population were tribals and poor farmers who could not afford private healthcare but had no functional public hospital within 50 km.',
    solution: 'A group of AIIMS and top medical college graduates formed JSS — refusing corporate hospital jobs — and set up a hospital in rural Chhattisgarh on a cooperative model. ₹10 OPD fee, ₹20 for specialist consultation, subsidised medicines. All surplus reinvested. Staff salaries are 1/3rd of private hospital rates — compensated by purpose and community.',
    impact: 'Over 3 lakh patients treated annually. 5,000+ surgeries per year. 90% of patients from below-poverty-line families. Mortality rates comparable to district hospital benchmarks despite serving the most complex tribal cases. JSS has trained 500+ rural health workers who now serve in remote villages independently.',
    quote: '"We were told that idealism has no place in medicine. We said: then medicine has lost its soul. You can be excellent and accessible — the market just doesn\'t find it profitable to try."',
    lessons: [
      'Cooperative hospital model: doctor-founders take lower salaries but own the mission — reducing attrition to near zero',
      '₹10 OPD as an access strategy: even a nominal fee reduces demand to manageable levels while preserving dignity',
      'Specialist care in rural areas is possible if doctors choose it — the supply is not absent, the incentives are wrong',
      'Community health worker training as a multiplier: 500 JSS-trained workers now independently serve villages JSS cannot reach',
    ],
    keyMetrics: [
      { label: 'Patients/Year', value: '3 Lakh+' },
      { label: 'Surgeries/Year', value: '5,000+' },
      { label: 'BPL Patients', value: '90%' },
      { label: 'OPD Fee', value: '₹10' },
      { label: 'Health Workers Trained', value: '500+' },
      { label: 'Founded', value: '1999' },
    ],
    featured: false,
  },

  /* ─── ENVIRONMENT ─── */
  {
    id: 'chipko-env',
    name: 'Sundarlal Bahuguna', org: 'Chipko Movement', location: 'Uttarakhand',
    category: 'environment', tag: 'Tree Huggers Who Saved the Himalayas',
    coverPhoto: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80',
    reach: 'Saved 12,000 sq km forest', founded: '1973',
    headline: 'Village Women Hugged Trees to Stop Logging — and Changed India\'s Environment Law',
    subline: 'Chipko: 1973. Result: Forest Conservation Act 1980. Himalayas saved.',
    problem: 'In 1973, the Government of India allocated forest land in Uttarakhand\'s Alaknanda valley to a sports goods manufacturer for ash tree logging. Local villages — which depended on the same forests for fodder, fuel, and water recharge — had no legal standing to object. They faced deforestation that would destroy their livelihoods and increase flood risk.',
    solution: 'Women of Reni village, led by Gaura Devi, literally hugged the trees when loggers arrived — refusing to move. The "Chipko" (to hug) movement spread to other forest areas. Sundarlal Bahuguna organised mass non-violent resistance across the Himalayas, walking 5,000 km to spread the message. The movement demanded community rights over local forests.',
    impact: 'Direct result: Government of India declared a 15-year logging ban in Uttarakhand\'s forests in 1980. The Forest Conservation Act 1980 — which requires central government approval for forest diversion — was legislated as a direct political response to Chipko. The movement inspired environmental movements in Brazil, Kenya (Green Belt Movement), and the Philippines.',
    quote: '"What are the forests for? Soil, water, and pure air. Forests are not timber lots — they are the rivers\' source, the farmers\' protector, and the earth\'s lungs."',
    lessons: [
      'Non-violent direct action by local communities has higher legitimacy than urban environmental advocacy',
      'Women as environmental defenders: their economic dependence on natural resources makes them most motivated',
      'Movement spread through walking: Bahuguna\'s 5,000 km padyatra gave Chipko national and global reach',
      'Legislation as ultimate impact: Chipko\'s Forest Conservation Act 1980 still protects 7 crore hectares of forest',
    ],
    keyMetrics: [
      { label: 'Forest Protected', value: '12,000+ sq km' },
      { label: 'Legislation', value: 'Forest Conservation Act 1980' },
      { label: 'Logging Ban', value: '15 Years' },
      { label: 'Countries Inspired', value: 'Brazil, Kenya, Philippines' },
      { label: 'Bahuguna\'s Walk', value: '5,000 km' },
      { label: 'Started', value: '1973' },
    ],
    featured: true,
  },
  {
    id: 'tarun-bharat-env',
    name: 'Rajendra Singh', org: 'Tarun Bharat Sangh', location: 'Alwar, Rajasthan',
    category: 'environment', tag: 'Johad Revival',
    coverPhoto: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=80',
    reach: '1,000+ Villages, 5 Rivers Revived', founded: '1985',
    headline: 'The "Waterman of India" Revived 5 Dead Rivers and Restored Water to 1,000 Villages Using Ancient Johad Technology',
    subline: 'No government budget. No NGO grants. Community labour and traditional wisdom.',
    problem: 'Alwar district in Rajasthan was a semi-arid zone where rivers and groundwater had been declining for decades due to deforestation and extraction. By 1985, several rivers were seasonally dry. Villages faced severe water scarcity, forcing migration. Government tube wells were drilled but failed within years as the water table dropped further.',
    solution: 'Tarun Bharat Sangh trained communities in johad construction — traditional earthen check dams that slow monsoon runoff, recharge groundwater, and store water for dry seasons. Over 35 years, TBS facilitated construction of 11,800+ johads in 1,000+ villages using community labour — no cement, no government budget. The johads recharged the water table enough to revive 5 rivers.',
    impact: 'Five rivers — Arvari, Ruparel, Sarsa, Bhagani, and Jahajwali — revived from seasonal to perennial flow. Over 1,000 villages with restored water access. Water table in TBS-covered areas risen by 5–6 metres. Rajendra Singh won the Stockholm Water Prize (2015), called the "Nobel Prize of Water." The model has been replicated in 11 countries.',
    quote: '"Water is not a resource to be managed by government. It is a commons to be protected by the community that depends on it. When we gave the johads back to the villages, we gave them their future back."',
    lessons: [
      'Traditional ecological knowledge (johad) often outperforms expensive modern water technology in local contexts',
      'Community ownership of infrastructure ensures maintenance — government-built infrastructure is often abandoned',
      'River revival as a systemic outcome: recharge 1,000 village water tables and rivers revive themselves',
      'Replication by demonstration: TBS\'s visible success attracted 1,000 villages — no marketing required',
    ],
    keyMetrics: [
      { label: 'Johads Built', value: '11,800+' },
      { label: 'Villages', value: '1,000+' },
      { label: 'Rivers Revived', value: '5' },
      { label: 'Water Table Rise', value: '5–6 Metres' },
      { label: 'Award', value: 'Stockholm Water Prize 2015' },
      { label: 'Countries Replicated', value: '11' },
    ],
    featured: true,
  },
  {
    id: 'iitmadras-env',
    name: 'Saahas Zero Waste', org: 'Saahas Zero Waste', location: 'Bengaluru',
    category: 'environment', tag: 'Urban Waste Management',
    coverPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80',
    reach: '2 Lakh Households', founded: '2013',
    headline: 'She Turned Bengaluru\'s Garbage Crisis into a ₹30 Crore Social Enterprise',
    subline: 'Wilma Rodrigues. 2 lakh households. 700+ tonnes processed monthly. Landfill-free.',
    problem: 'Bengaluru generates 5,000 tonnes of solid waste daily. In 2013, the city\'s landfills were overflowing, bulk generators (apartments, corporates) had no compliant waste management system, and ragpickers were being displaced by mechanised collection without income alternatives.',
    solution: 'Saahas Zero Waste provides end-to-end waste management for bulk generators — apartments, IT parks, hospitals, airports. Segregated collection, wet waste composting on-site, dry waste channelled to registered recyclers, ragpicker integration as formal workers with uniforms, wages, and insurance. Zero landfill commitment.',
    impact: 'Over 2 lakh households and 500+ bulk generators served. 700+ tonnes of waste processed monthly. 2,000+ ragpickers formalized with dignity wages. Composting plants generating 180 tonnes of compost monthly. Karnataka Pollution Control Board recognised Saahas as a model operator.',
    quote: '"Waste is not the problem. Waste management is a design failure. When you design for zero landfill, you find that everything has value — and that\'s a business."',
    lessons: [
      'Ragpicker integration as a social and operational strategy: existing informal workers have skills and local knowledge',
      'Bulk generator regulation creates a paying customer base that makes the social enterprise financially sustainable',
      'On-site composting turns wet waste from a cost centre to a revenue line (compost sales)',
      'KPCB recognition opens doors to government contracts — social enterprises need regulatory champions',
    ],
    keyMetrics: [
      { label: 'Households Served', value: '2 Lakh+' },
      { label: 'Bulk Generators', value: '500+' },
      { label: 'Waste Processed/Month', value: '700+ Tonnes' },
      { label: 'Ragpickers Formalized', value: '2,000+' },
      { label: 'Compost/Month', value: '180 Tonnes' },
      { label: 'Founded', value: '2013' },
    ],
    featured: false,
  },

  /* ─── VILLAGE DEVELOPMENT ─── */
  {
    id: 'hiware-village',
    name: 'Popatrao Pawar', org: 'Hiware Bazar Gram Panchayat', location: 'Hiware Bazar, Ahmednagar, Maharashtra',
    category: 'village-development', tag: 'Model Village',
    coverPhoto: 'https://images.unsplash.com/photo-1519944849880-1e363b9c7f42?w=900&q=80',
    reach: 'Entire Village (300 Families)', founded: '1990',
    headline: 'A Drought-Prone Village with 168 Millionaires — No Alcohol, No Migration, No Poverty',
    subline: 'Hiware Bazar: Maharashtra\'s most transformed village. Per capita income ₹30,000/month.',
    problem: 'Hiware Bazar in Ahmednagar district was drought-prone, heavily indebted, and had 90% of its men migrating to cities for labour in 1989. The village had no water, degraded land, alcohol abuse, and no economic activity beyond subsistence farming.',
    solution: 'Sarpanch Popatrao Pawar implemented a village-wide water conservation programme — 52 water conservation structures in 10 years. He enforced a strict ban on tree cutting and alcohol. Land use was regulated: only drought-tolerant crops. Women\'s self-help groups took over micro-finance. Village assembly (gram sabha) made all decisions transparently.',
    impact: 'Village transformed from ₹830/year per capita income to ₹30,000/month (a 430x increase). 168 millionaires in a 300-family village. Zero migration. Zero alcohol. Water table risen by 20 feet. Hiware Bazar is now studied by 5,000+ villages across India. Pawar has been the sarpanch for 30+ years.',
    quote: '"Development is not about what government gives a village. It is about what a village decides to do for itself. We gave up nothing but bad habits — and got everything in return."',
    lessons: [
      'Water conservation as the root intervention: every other development indicator improved when water was secured',
      'Alcohol ban as an economic intervention — eliminating alcohol expenditure freed 20% of family budgets',
      'Gram sabha (village assembly) democracy: collective decision-making builds accountability for collective outcomes',
      'Model village as a replication engine: 5,000 villages have studied Hiware Bazar — it became its own development programme',
    ],
    keyMetrics: [
      { label: 'Per Capita Income', value: '₹30,000/Month' },
      { label: 'Millionaires in Village', value: '168' },
      { label: 'Migration', value: 'Zero' },
      { label: 'Income Growth', value: '430×' },
      { label: 'Water Table Rise', value: '20 Feet' },
      { label: 'Villages Studied Model', value: '5,000+' },
    ],
    featured: true,
  },
  {
    id: 'ralegan-village',
    name: 'Anna Hazare', org: 'Ralegan Siddhi', location: 'Ralegan Siddhi, Ahmednagar, Maharashtra',
    category: 'village-development', tag: 'Village Self-Reliance',
    coverPhoto: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80',
    reach: '2,500 Residents', founded: '1975',
    headline: 'Anna Hazare\'s Village: From Hunger and Migration to Food Security in 10 Years',
    subline: 'Ralegan Siddhi — India\'s original model village. Now studied in Harvard Business School.',
    problem: 'Ralegan Siddhi in 1975 was a village of chronic hunger, alcoholism, and debt. Over 40% of men had migrated. Land was barren. Moneylenders controlled the village economy. There was no piped water, no electricity, no school worth attending.',
    solution: 'Anna Hazare — a retired Army driver — returned to his village and began watershed development work with community labour. He enforced a ban on liquor distillation, introduced trees as community property (no individual could cut a community tree), and created a self-help system where every able-bodied adult contributed 100 days of community labour per year.',
    impact: 'Within 10 years, Ralegan Siddhi achieved food self-sufficiency for the first time in living memory. Per capita income rose 5x. Migration stopped. The village produced its own electricity from biogas. The model was studied by the Planning Commission, adopted as a template for the PM\'s "Adarsh Gram" programme, and is part of Harvard Business School\'s India case study library.',
    quote: '"You cannot change a village from outside. You have to change the people inside it — their habits, their unity, and their belief that they can fix their own problems."',
    lessons: [
      'Watershed development as a transformational entry point: water security unlocks agriculture, income, and migration reversal',
      'Community labour (shramdaan) builds ownership and reduces dependence on government or NGO funds',
      'Village entrepreneur: a single motivated resident can catalyse transformation without external leadership',
      'Replicability through documentation: Ralegan\'s model was detailed enough to become a government programme template',
    ],
    keyMetrics: [
      { label: 'Population', value: '2,500' },
      { label: 'Income Growth', value: '5×' },
      { label: 'Migration', value: 'Stopped' },
      { label: 'Food Status', value: 'Self-Sufficient' },
      { label: 'Government Model', value: 'PM Adarsh Gram' },
      { label: 'Started', value: '1975' },
    ],
    featured: true,
  },
  {
    id: 'amul-village',
    name: 'Tribhuvandas Patel & Verghese Kurien', org: 'Amul / GCMMF', location: 'Anand, Gujarat → Pan India',
    category: 'village-development', tag: 'Cooperative Revolution',
    coverPhoto: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900&q=80',
    reach: '36 Lakh Farmer Members', founded: '1946',
    headline: 'India\'s Biggest Village Development Programme Was Also India\'s Biggest Brand',
    subline: 'Operation Flood: 10 crore rural families. The White Revolution. Made India dairy self-sufficient.',
    problem: 'In 1946, Gujarat\'s dairy farmers sold milk to a private contractor (Polson) at exploitative prices. The contractor held monopoly control over the supply chain, paying farmers a fraction of market value while selling at premium to urban buyers. Farmers had no collective bargaining power.',
    solution: 'Tribhuvandas Patel organised Anand\'s dairy farmers into a two-tiered cooperative: village-level societies collected milk and paid farmers daily; the district union processed and marketed. Verghese Kurien professionalised this model into AMUL and replicated it nationally as "Operation Flood" — India\'s White Revolution — across 1 lakh+ village cooperatives.',
    impact: 'India went from a milk-deficit country to the world\'s largest milk producer. 36 lakh farmer-members receive daily income. Over 10 crore rural families benefit from dairy cooperative income. Amul\'s annual revenue is ₹72,000 Crore — and every rupee ultimately flows back to the farmer cooperatives. The model has been replicated in 100+ countries.',
    quote: '"We proved that the best way to develop rural India is not to build factories in cities and give farmers jobs — it is to build industries in villages and let farmers own them."',
    lessons: [
      'Cooperative two-tier model: village collection + district processing + national marketing = farmer-controlled supply chain',
      'Daily payment: paying farmers within 24 hours of milk collection eliminated moneylender dependence',
      'Farmer as owner, not supplier: dividend and bonus income creates long-term loyalty that no contract can match',
      'Brand as farmer protection: Amul\'s national brand gives 36 lakh small farmers the pricing power of a corporation',
    ],
    keyMetrics: [
      { label: 'Farmer Members', value: '36 Lakh' },
      { label: 'Rural Families Benefited', value: '10 Crore+' },
      { label: 'Annual Revenue', value: '₹72,000 Crore' },
      { label: 'Village Societies', value: '1 Lakh+' },
      { label: 'Countries Replicated', value: '100+' },
      { label: 'India\'s Milk Rank', value: '#1 World' },
    ],
    featured: false,
  },

  /* ─── CSR ─── */
  {
    id: 'tata-csr',
    name: 'Tata Trusts', org: 'Tata Group CSR', location: 'Pan India',
    category: 'csr', tag: '150 Years of Giving',
    coverPhoto: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80',
    reach: '10 Crore People', founded: '1892',
    headline: 'Tata Gave Away 66% of Its Profits for 130 Years — Before CSR Was a Law',
    subline: 'Tata Trusts: India\'s oldest philanthropic organisation. Cancer hospitals. IISc. TISS. IIT Bombay.',
    problem: 'In 1868 India, British-owned companies extracted maximum profit and reinvested nothing in Indian communities. Indian workers had no social security, no education access, and no healthcare. The idea that a business had any responsibility beyond shareholder returns was unknown.',
    solution: 'Jamsetji Tata and his descendants structured Tata Group so that 66% of the holding company\'s shares are held by charitable trusts — meaning 66% of all dividends go to charitable causes before any family wealth accumulation. Tata Trusts funds IISc (India\'s premier research institution), TISS (social work education), cancer hospitals, rural development, and education programmes.',
    impact: 'Over 10 crore people benefited through Tata Trusts programmes. Founded IISc Bangalore (1909), Tata Memorial Cancer Hospital (1941), TISS (1936), IIT Bombay (partial). Tata Trusts spends ₹3,000+ Crore annually on philanthropy. The Tata model has influenced India\'s Companies Act 2013 CSR mandate — which made 2% profit CSR mandatory for large companies.',
    quote: '"In a free enterprise, the community is not just another stakeholder in business, but is in fact the very purpose of its existence." — JRD Tata',
    lessons: [
      'Structural philanthropy: building charity into the ownership structure, not as an afterthought',
      'Institution building as CSR: Tata\'s investments in IISc, IIT, TISS have compounding impact over 100+ years',
      'Trust as competitive advantage: Tata\'s brand equity in India rests partly on 130 years of visible giving',
      'CSR influencing policy: Tata\'s model directly shaped India\'s Companies Act 2013 CSR mandate',
    ],
    keyMetrics: [
      { label: 'People Benefited', value: '10 Crore+' },
      { label: 'Trust Ownership', value: '66% of Holding Co.' },
      { label: 'Annual CSR Spend', value: '₹3,000 Cr+' },
      { label: 'Institutions Founded', value: 'IISc, TISS, TMH' },
      { label: 'Years of Philanthropy', value: '130+' },
      { label: 'Started', value: '1892' },
    ],
    featured: true,
  },
  {
    id: 'infosys-csr',
    name: 'Infosys Foundation', org: 'Infosys Foundation', location: 'Pan India',
    category: 'csr', tag: 'Tech Giant\'s Ground Game',
    coverPhoto: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
    reach: '2 Crore People', founded: '1996',
    headline: 'Infosys\'s CSR Arm Built 48,000 Toilets and 100+ Libraries — Without Making It a PR Campaign',
    subline: 'Sudha Murty\'s Infosys Foundation: ₹300+ Crore/year, zero PR noise.',
    problem: 'India\'s software boom of the 1990s created enormous wealth in Bengaluru and other IT cities — but the villages around them had no sanitation, no libraries, and no healthcare. The wealth was visible; the deprivation was invisible to the industry generating it.',
    solution: 'Infosys Foundation, led by Sudha Murty for over 25 years, invested in unglamorous but high-impact programmes: 48,000+ individual toilets in Karnataka villages, 70,000+ school libraries, 16,000+ houses for the destitute, and 100+ computer learning centres. No branding on the assets, no press conferences. Just work.',
    impact: 'Over 2 crore people impacted. 48,000+ toilets ending open defecation. 70,000+ libraries giving rural children access to books. 16,000 houses provided. 100+ computer labs in rural schools. ₹300+ crore spent annually. Sudha Murty\'s personal involvement — she visits every site — is a model of accountable CSR.',
    quote: '"I will not put the Infosys logo on a toilet. The toilet is not for PR — it is for a woman who had to walk to a field in the dark. Her dignity doesn\'t need our branding."— Sudha Murty',
    lessons: [
      'No-logo CSR: the beneficiary\'s dignity, not the donor\'s brand, is the priority in genuine philanthropy',
      'Founder-led accountability: Sudha Murty personally visiting sites is more effective than any audit system',
      'Infrastructure first: toilets and libraries are not glamorous — but they are the foundation for every other outcome',
      '₹1 = ₹1 accountability: Infosys Foundation is known for low overhead and high field investment ratios',
    ],
    keyMetrics: [
      { label: 'People Impacted', value: '2 Crore+' },
      { label: 'Toilets Built', value: '48,000+' },
      { label: 'Libraries', value: '70,000+' },
      { label: 'Houses Provided', value: '16,000+' },
      { label: 'Annual Spend', value: '₹300 Cr+' },
      { label: 'Founded', value: '1996' },
    ],
    featured: true,
  },
  {
    id: 'reliance-csr',
    name: 'Reliance Foundation', org: 'Reliance Foundation', location: 'Pan India',
    category: 'csr', tag: 'Scale at Corporate Speed',
    coverPhoto: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80',
    reach: '6 Crore People', founded: '2010',
    headline: 'Reliance Foundation: India\'s Largest CSR Programme by Beneficiary Count',
    subline: 'Nita Ambani\'s Foundation reaches 6 crore people across rural livelihoods, education, and disaster relief.',
    problem: 'India\'s wealthiest company had the resources but lacked a structured framework to channel social investment systematically across diverse areas — education, rural livelihoods, disaster response, arts, and sports — at scale comparable to a government programme.',
    solution: 'Reliance Foundation, led by Nita Ambani, was structured as a full-service social organisation across 5 programme areas: rural transformation (farmer income), education (Digital Sakhi women\'s digital literacy), health, sports (Paralympic support), and disaster response. RF deployed resources with corporate speed and scale — during COVID, RF provided 8 crore meals.',
    impact: 'Over 6 crore people reached across 51,000 villages and urban locations. 5 lakh farmers receiving agri advisory services. Digital Sakhi programme trained 1 lakh rural women in digital literacy. During COVID, RF provided 8 crore meals and 5 lakh PPE kits. Paralympic athletes supported by RF won India\'s first Paralympic gold medals.',
    quote: '"Corporate responsibility is not charity — it is the business of making India stronger. A company that does not invest in the society it operates in is mining a resource it is not replenishing."',
    lessons: [
      'Disaster response capability as a CSR vertical: RF\'s 48-hour mobilisation during COVID showed corporate speed in social delivery',
      'Agri-advisory as a rural livelihood CSR programme: farmer income growth is the most durable form of rural development',
      'Sports as social development: RF\'s Paralympic investment produced gold medals and national pride, not just participation',
      'Scale with local knowledge: 51,000 villages requires deep local partnerships — RF works through 100+ implementing organisations',
    ],
    keyMetrics: [
      { label: 'People Reached', value: '6 Crore+' },
      { label: 'Villages', value: '51,000+' },
      { label: 'Farmer Services', value: '5 Lakh+' },
      { label: 'Meals (COVID)', value: '8 Crore' },
      { label: 'Digital Sakhi Women', value: '1 Lakh' },
      { label: 'Founded', value: '2010' },
    ],
    featured: false,
  },
];

/* ════════════════════════════════
   PAGE COMPONENT
════════════════════════════════ */
export default function SocialImpact({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug ?? 'ngo';
  const cat = IMPACT_CATEGORIES.find(c => c.slug === slug) ?? IMPACT_CATEGORIES[0];
  const stories = STORIES.filter(s => s.category === slug);
  const featured = stories.find(s => s.featured) ?? stories[0];

  const [active, setActive] = useState<ImpactStory>(featured);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const s = STORIES.filter(st => st.category === slug);
    setActive(s.find(st => st.featured) ?? s[0]);
  }, [slug]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const catIcons: Record<string, React.ReactNode> = {
    ngo: <Heart className="w-4 h-4" />,
    education: <Award className="w-4 h-4" />,
    healthcare: <Users className="w-4 h-4" />,
    environment: <Leaf className="w-4 h-4" />,
    'village-development': <Globe className="w-4 h-4" />,
    csr: <Award className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-black">

      {/* ── Top bar ── */}
      <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-bold tracking-wider text-[11px] uppercase">ProfileBizz</span>
            </a>
            <span className="text-gray-300">|</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-editorial">Social Impact Stories</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-black px-3 py-1.5 border border-gray-200 hover:border-black transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-editorial px-3 py-1.5 transition-colors">
              <BookmarkPlus className="w-3.5 h-3.5" /> Save
            </button>
          </div>
        </div>
      </header>

      {/* ── Category Hero ── */}
      <div className="mt-14" style={{ background: cat.color }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-white/50 text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block">Social Impact Stories</span>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl">{cat.icon}</span>
              <h1 className="font-serif text-white text-4xl md:text-5xl font-bold">{cat.label}</h1>
            </div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-white/10 text-white px-3 py-1.5 mt-1">{cat.tag}</span>
          </div>
          <p className="text-white/60 text-sm md:text-base max-w-sm leading-relaxed">
            {stories.length} stories of organisations changing India from the ground up.
          </p>
        </div>
      </div>

      {/* ── Category Switcher ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40 overflow-x-auto">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex">
          {IMPACT_CATEGORIES.map(c => (
            <a key={c.slug} href={`/impact/${c.slug}`}
              className={`flex items-center gap-2 px-4 py-3.5 border-b-2 flex-shrink-0 transition-colors text-sm font-medium whitespace-nowrap
                ${c.slug === slug ? 'border-editorial text-editorial' : 'border-transparent text-gray-500 hover:text-black'}`}>
              <span>{c.icon}</span> {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─ Story List ─ */}
          <div className="lg:col-span-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">{stories.length} Stories · {cat.label}</p>
            <div className="space-y-3">
              {stories.map(story => (
                <button key={story.id}
                  onClick={() => { setActive(story); window.scrollTo({ top: 120, behavior: 'smooth' }); }}
                  className={`w-full text-left border transition-all duration-150 overflow-hidden group ${active.id === story.id ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
                  <div className="flex">
                    <div className="w-24 h-20 flex-shrink-0 overflow-hidden">
                      <img src={story.coverPhoto} alt={story.org} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex-1 min-w-0 bg-white">
                      {story.featured && (
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-1.5 py-0.5 mb-1 inline-block">Featured</span>
                      )}
                      <p className="text-sm font-bold leading-tight group-hover:text-editorial transition-colors truncate">{story.org}</p>
                      <p className="text-[11px] text-gray-500 truncate">{story.name}</p>
                      <p className="text-[10px] font-bold text-editorial mt-1">{story.reach}</p>
                    </div>
                    {active.id === story.id && <div className="w-1 bg-editorial flex-shrink-0" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ─ Story Detail ─ */}
          <div className="lg:col-span-2">
            {active && (
              <div className="bg-white border border-gray-200">
                {/* Hero */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <img src={active.coverPhoto} alt={active.org} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-1">{active.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold tracking-widest uppercase mb-1">
                      {catIcons[active.category]}
                      <span>{active.location} · Est. {active.founded}</span>
                    </div>
                    <h2 className="font-serif text-white text-xl md:text-2xl font-bold leading-tight mb-1">{active.headline}</h2>
                    <p className="text-white/70 text-sm italic">{active.subline}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-px bg-gray-200 mb-6">
                    {active.keyMetrics.map((m, i) => (
                      <div key={i} className="bg-white px-4 py-3">
                        <p className="text-[10px] font-bold tracking-wider uppercase text-gray-400">{m.label}</p>
                        <p className="text-base font-serif font-bold text-black">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Problem → Solution → Impact */}
                  <div className="space-y-4 mb-6">
                    <div className="border-l-4 border-gray-300 pl-5 py-1">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">The Problem</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{active.problem}</p>
                    </div>
                    <div className="border-l-4 border-editorial pl-5 py-1">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-editorial mb-2">The Solution</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{active.solution}</p>
                    </div>
                    <div className="border-l-4 border-black pl-5 py-1">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-black mb-2">The Impact</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{active.impact}</p>
                    </div>
                  </div>

                  {/* Pull Quote */}
                  <blockquote className="bg-black text-white p-5 mb-6">
                    <p className="font-serif text-base md:text-lg leading-relaxed italic">{active.quote}</p>
                    <p className="text-white/50 text-[10px] font-bold tracking-wider uppercase mt-3">— {active.name}, {active.org}</p>
                  </blockquote>

                  {/* Lessons */}
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-editorial" /> Lessons for Change-Makers
                    </p>
                    <div className="space-y-2">
                      {active.lessons.map((l, i) => (
                        <div key={i} className="flex gap-3 items-start group hover:bg-gray-50 px-3 py-2 transition-colors">
                          <span className="flex-shrink-0 w-5 h-5 bg-black group-hover:bg-editorial flex items-center justify-center text-white text-[10px] font-bold transition-colors">{i + 1}</span>
                          <p className="text-sm text-gray-700 leading-snug">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
