--
-- PostgreSQL database dump
--

\restrict d0X9mUcSfh1usE17ZA5Kh2KFiRat1e83jgLPFM0zv0AXwZ96LV1waTgHPLY6HkZ

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    color text DEFAULT '#6B7280'::text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: founder_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.founder_sections (
    id integer NOT NULL,
    founder_id integer NOT NULL,
    section_key text NOT NULL,
    pull_quote text,
    body_paragraphs text[] DEFAULT '{}'::text[],
    json_data jsonb,
    sort_order integer DEFAULT 0 NOT NULL,
    locale text DEFAULT 'en'::text NOT NULL
);


--
-- Name: founder_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.founder_sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: founder_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.founder_sections_id_seq OWNED BY public.founder_sections.id;


--
-- Name: founders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.founders (
    id integer NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    designation text NOT NULL,
    profile_type text,
    profile_tag text,
    category text,
    location text,
    founded text,
    revenue text,
    employees text,
    age text,
    photo_url text,
    cover_photo_url text,
    one_liner text,
    executive_summary text,
    published boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: founders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.founders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: founders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.founders_id_seq OWNED BY public.founders.id;


--
-- Name: seo_meta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seo_meta (
    id integer NOT NULL,
    founder_id integer NOT NULL,
    seo_title text,
    seo_description text,
    keywords text,
    canonical_url text,
    og_image text,
    og_title text,
    twitter_card text DEFAULT 'summary_large_image'::text,
    schema_type text DEFAULT 'Person'::text,
    focus_keyword text,
    robots text DEFAULT 'index, follow'::text
);


--
-- Name: seo_meta_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.seo_meta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: seo_meta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.seo_meta_id_seq OWNED BY public.seo_meta.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    sid text NOT NULL,
    sess text NOT NULL,
    expire timestamp without time zone NOT NULL
);


--
-- Name: sub_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sub_categories (
    id integer NOT NULL,
    category_id integer NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sub_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sub_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sub_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sub_categories_id_seq OWNED BY public.sub_categories.id;


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: founder_sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founder_sections ALTER COLUMN id SET DEFAULT nextval('public.founder_sections_id_seq'::regclass);


--
-- Name: founders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founders ALTER COLUMN id SET DEFAULT nextval('public.founders_id_seq'::regclass);


--
-- Name: seo_meta id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_meta ALTER COLUMN id SET DEFAULT nextval('public.seo_meta_id_seq'::regclass);


--
-- Name: sub_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_categories ALTER COLUMN id SET DEFAULT nextval('public.sub_categories_id_seq'::regclass);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_users (id, username, password_hash, created_at) FROM stdin;
1	admin	$2b$12$IDD2sGLLLWynjnv8kRrrJ.wDS2Y8NQikWgveqXi8pmlA9KdImgfH.	2026-07-22 14:33:44.804207+00
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, slug, description, color, sort_order, created_at) FROM stdin;
1	Founder Story	founder-story	Indian founders who built businesses from scratch	#1a1a1a	1	2026-07-23 15:26:01.589373+00
2	Social Hero	social-hero	Changemakers and social entrepreneurs transforming India	#dc2626	2	2026-07-23 15:26:01.630574+00
3	Business Stories	business-story	Export, family, rural and women entrepreneur business stories	#2563eb	3	2026-07-23 15:26:01.643551+00
4	Brand Stories	brand-story	How iconic Indian brands were built and scaled	#7c3aed	4	2026-07-23 15:26:01.649507+00
5	Industry Stories	industry-story	Deep dives into Indian industries and sectors	#059669	5	2026-07-23 15:26:01.653899+00
6	Women Story	women-story	Indian women who built businesses against the odds	#db2777	6	2026-07-23 15:26:01.658034+00
\.


--
-- Data for Name: founder_sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.founder_sections (id, founder_id, section_key, pull_quote, body_paragraphs, json_data, sort_order, locale) FROM stdin;
886	2	प्रारंभिक जीवन	"हमारे घर में 12 साल की उम्र तक बिजली नहीं थी। माँ दीपक की रोशनी में खाना बनाती थीं। उस अंधेरे ने मुझे रोशनी — यानी तरक्की — का दीवाना बना दिया।"	{"राजेश कुमार वेदास का जन्म 1980 में उत्तर प्रदेश के रायबरेली जिले के बछरावाँ गाँव में हुआ। पाँच बच्चों में सबसे छोटे राजेश के पिता किसान थे और माँ गाँव की एकमात्र प्राथमिक पाठशाला चलाती थीं।","पिता रामलाल वेदास दो एकड़ में गेहूँ और सरसों उगाते थे। परिवार की मासिक आमदनी मुश्किल से ₹3,000 पार करती थी। बिजली नहीं थी, पाइप से पानी नहीं था, सात लोग एक कमरे में रहते थे।","लेकिन माँ सावित्री देवी ने एक बात तय कर रखी थी — चाहे कुछ भी हो, बच्चे पढ़ेंगे। यही ज़िद राजेश की ज़िंदगी बदलने वाली थी।","बचपन में राजेश ने अपने पिता को मंडी के बिचौलियों के हाथों लागत से भी कम दाम पर गेहूँ बेचते देखा। वही दृश्य वेदास एग्रो की नींव बना।"}	\N	0	hi
887	2	शिक्षा	\N	{"राजेश की पढ़ाई पूरी तरह छात्रवृत्ति और अंशकालिक काम से चली। रायबरेली के सरकारी इंटर कॉलेज से जिला टॉपर रहे, फिर सैम हिग्गिनबॉटम विश्वविद्यालय से कृषि में स्नातक किया।","IRMA, आनंद (गुजरात) से MBA (ग्रामीण प्रबंधन) में स्वर्ण पदक हासिल किया। उनकी थीसिस — \\"उत्तर प्रदेश की गेहूँ खरीद में बिचौलियों की भूमिका\\" — NABARD ने 2007 की नीति रिपोर्ट में उद्धृत की।","थीसिस सुपरवाइज़र प्रोफेसर अरविंद पटेल कहते हैं: \\"राजेश सबसे होनहार छात्र नहीं थे, लेकिन सबसे जिद्दी ज़रूर थे। उनकी हर समस्या का एक निजी आयाम था — इसलिए उनका काम असाधारण रूप से ज़मीनी था।\\""}	\N	1	hi
811	1	Early Life	"I lost money before I made any. The market taught me everything the classroom never could — about risk, about discipline, and about what people really need."	{"Bengaluru, 1996. A seventeen-year-old boy from a middle-class family walks into a brokerage office, fills out an account-opening form, and hands over his savings. His name is Nithin Kamath. Within weeks, he has lost most of it.","Most people would have walked away. Nithin did not. He was not angry at the market — he was curious about it. Why did prices move the way they did? What separated the traders who survived from those who didn't? These questions would consume the next fourteen years of his life, and the answers would eventually reshape how 73 million Indians invest their money.","Growing up in Bengaluru — the elder of two brothers in a family where his father worked in the public sector — Nithin had always been drawn to numbers and systems. But it was the stock market that gave that curiosity a direction. Unlike a textbook, the market responded to you in real time, with real consequences. Lose attention for a moment, and you paid for it. Understand something others hadn't yet, and you were rewarded.","So instead of quitting after his early losses, Nithin did something that would define his character as a founder: he took a night-shift job at a call centre in Bengaluru, working from late evening to early morning, so that his days remained completely free for trading. While his peers were building careers, collecting experience letters, and preparing for MBA entrance exams, Nithin was reading Jack Schwager at 2 pm and placing trades at 10 am. He was, in every sense, building a different kind of education — one the market would never let him fake."}	\N	0	en
812	1	Education	\N	{"There is no IIT or IIM in Nithin Kamath's story. No analyst programme, no CFA, no MBA with a finance specialisation. His entire formal education ended before the stock market began to educate him properly.","Over seven years of daily trading, he read everything he could find: Benjamin Graham on value, Jack Schwager's Market Wizards on trading psychology, academic papers on order flow and market microstructure. But unlike a student reading for an exam, Nithin was cross-referencing every idea against the trades he placed that same week. Theory met reality every single day — and when they disagreed, it cost him money.","\\"Most people in financial services have studied markets. I traded them. There's a difference — you understand things viscerally when your own money is on the line,\\" he has said."}	{"htmlContent": "<table style=\\"width:100%;border-collapse:collapse\\"><tbody><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">1996</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Opened first trading account at age 17 — lost money immediately, chose to stay and learn</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">1997–2004</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Worked night shifts at a BPO/call centre; traded equities and derivatives during the day</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2004–2009</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Quit night shifts — became a full-time proprietary trader, building expertise in F&O and market microstructure</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2009</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Began mapping the gap: what retail investors needed versus what the brokerage industry was offering</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2010</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Co-founded Zerodha with brother Nikhil Kamath — ₹10–15 lakh of personal savings, zero outside capital</td></tr></tbody></table>"}	1	en
888	2	करियर	\N	{"IRMA के बाद राजेश ने जानबूझकर ऐसा करियर चुना जो तनख्वाह नहीं, गहरी समझ देता हो। NABARD में तीन साल UP के ग्रामीण इलाकों में घूमते हुए किसानों की तकलीफें दर्ज कीं।","ITC के ई-चौपाल प्रभाग में 600 से ज़्यादा गाँवों को डिजिटल खरीद प्लेटफॉर्म से जोड़ा। DCM श्रीराम में पाँच राज्यों में ₹300 करोड़ के कृषि-इनपुट वितरण का काम संभाला।","यहीं उन्हें वह खाई दिखी जो वेदास एग्रो भरने वाली थी: भारत अपनी कृषि उपज का मात्र 8% ही प्रसंस्कृत करता था — बाकी कच्चा निर्यात होता था, मूल्य बाहर जाता था।"}	\N	2	hi
813	1	Career	\N	{"By 2004, Nithin had become profitable enough to leave the night shifts entirely. He was twenty-five years old, with no formal credentials, no professional network in finance, and no employer willing to hire him — but he could trade. He spent the next five years honing his skills across equities, futures, and options, building a systematic edge that few retail traders in India had.","But the more profitable he became, the more something else gnawed at him. Every single trade, a percentage went to the broker. Not a large percentage — but relentless, compounding, unavoidable. He started running the numbers. If a retail investor placed fifty trades a month, a standard percentage broker was collecting ₹15,000 to ₹25,000 every year — not in taxes, not in stamp duty, but purely in brokerage.","That calculation — which he had experienced personally, painfully, for nearly a decade — became the founding insight of Zerodha. The brokerage industry in India was not just inefficient. It was structured, deliberately or not, to benefit brokers rather than clients."}	{"htmlContent": "<table style=\\"width:100%;border-collapse:collapse\\"><tbody><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">1997–2004</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Night-shift Agent — BPO / Call Centre, Bengaluru</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2004–2009</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Full-time Proprietary Trader — Self-directed, Bengaluru</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2010–Present</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Co-Founder & CEO — Zerodha</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2014–Present</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Founder — Rainmatter Capital (FinTech Investments & Incubation)</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2021–Present</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Trustee — Rainmatter Foundation (Climate & Social Impact)</td></tr></tbody></table>"}	2	en
814	1	Entrepreneurial Journey	"We were never trying to be the biggest broker. We were trying to be the most honest one. The size came later — and it came because of the honesty, not in spite of it."	{"On 15 August 2010 — Independence Day — Nithin and his brother Nikhil registered Zerodha. The name was a deliberate declaration: Zero + Rodha, the Sanskrit word for barrier. Remove the barriers. All of them. The brothers put in ₹10–15 lakh of their own savings. No venture capital, no angel investors, no pitch deck.","That idea: charge a flat ₹20 per executed order. Not a percentage. Not a tiered structure. Twenty rupees — the same whether you traded ₹10,000 or ₹10 crore. At a time when every major Indian broker was charging 0.3% to 0.5% of trade value, this was heresy.","The first two years were, in Nithin's own words, \\"painfully slow.\\" Zerodha had no marketing budget, no celebrity face, no newspaper ads. Nithin and Nikhil personally called every new sign-up to walk them through the platform.","The story changed in 2015, when Zerodha launched Kite. In an industry still shipping bloated desktop software built in the early 2000s, Kite was a shock — clean, fast, mobile-first, and genuinely beautiful to use.","By 2020, Zerodha had crossed 10 lakh active clients. By 2022, that number had reached 60 lakh — making Zerodha the single largest broker on the National Stock Exchange."}	\N	3	en
815	1	Challenges	\N	{}	{"htmlContent": "<div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">The Trust Problem: Building a Brand from Zero</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">When Zerodha launched in 2010, the brokers Indians trusted were ICICI Direct, HDFC Securities, Kotak Securities — names backed by the country's largest banks. Zerodha was an unknown startup asking people to hand over their life savings. \\"We had no brand, so we had to build trust one conversation at a time.\\" For three years, every new customer received a personal call.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Scaling Without Someone Else's Money</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">In 2010, no VC was interested in funding a discount stockbroker. By 2015, when Zerodha was clearly working, VCs began calling. Nithin said no. \\"Not raising money means every rupee you spend has to earn its keep. You can't paper over bad decisions with someone else's capital.\\"</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">When the Platform Goes Down at the Worst Possible Moment</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">In 2020 and 2021, during episodes of extreme market volatility, Zerodha's systems experienced outages. What made the difference was how Nithin responded: not with a PR statement, but with a detailed public post — every time — explaining exactly what had failed, why, what the fix was.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">The Stroke — And What It Forced Him to Say Out Loud</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">In early 2023, at forty-three years old, Nithin Kamath suffered a mild stroke. He chose to disclose it publicly. \\"No amount of success is worth destroying your health for. I was not taking care of myself, and my body gave me a warning I had to listen to.\\"</p></div>"}	4	en
816	1	Success	\N	{"The numbers are extraordinary on their own terms. FY24: ₹8,320 crore in revenue, ₹4,700 crore in net profit, 73 lakh active clients. In an Indian startup ecosystem where many of the most celebrated companies have never turned a profit, Zerodha has been profitable every single year since it was founded.","But the numbers miss the more important story. What Nithin Kamath actually built was not just a profitable brokerage — it was proof that an entire industry could be restructured in favour of the customer and still generate extraordinary returns.","Beyond Zerodha, Nithin has channelled his capital into Rainmatter Capital — backing over 100 startups across fintech, climate technology, and health."}	{"htmlContent": "<div style=\\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px\\"><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Active Clients</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">73 Lakh+</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">FY24 Revenue</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">₹8,320 Cr</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">FY24 Net Profit</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">₹4,700 Cr</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">VC Raised</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">₹0</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Rainmatter Portfolio</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">100+ Startups</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Varsity Learners</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">15 Million+</div></div></div>"}	5	en
817	1	Leadership Style	"Transparency is not a PR strategy for us. It is a survival mechanism. In a trust-based business, the moment you start hiding things, you start dying — slowly, invisibly, but certainly."	{}	{"htmlContent": "<div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Radical Transparency</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">When Zerodha receives a SEBI order, Nithin posts about it publicly — before the media does. When the platform fails during peak trading, he writes a detailed post-mortem before the trading day ends. In India's financial services industry, historically defined by opacity, this approach has earned Zerodha a loyalty that no advertising campaign could purchase.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Bootstrapped Discipline</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Fourteen years in, Zerodha has never taken a rupee of outside capital. \\"When you are spending someone else's money, every mistake is expensive but survivable. When you are spending your own, every mistake is personal.\\" That relationship with capital explains why Zerodha has been profitable every year of its existence.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Education as Core Strategy</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Varsity, Zerodha's free financial education platform, was built at a time when Zerodha was still small. Nithin's reasoning was contrarian: an investor who understands what they are doing makes better decisions, stays in the market longer, and trusts the platform more when things go wrong.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Long-term Over Short-term</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Zerodha has consciously passed on revenue opportunities that would have damaged customer outcomes. \\"Our business grows when our customers grow. If they lose money and leave, so do we. That alignment of interests is not a slogan — it is what makes every difficult decision simple.\\"</p></div>"}	6	en
818	1	Awards	\N	{}	[{"year": "2024", "title": "Forbes Asia — 50 Over 50 (Business & Finance)", "organization": "Forbes Asia"}, {"year": "2023", "title": "Forbes India Rich List — Self-made billionaire, FinTech", "organization": "Forbes India"}, {"year": "2022", "title": "Economic Times ET Awards — Entrepreneur of the Year", "organization": "The Economic Times"}, {"year": "2021", "title": "Business Today Most Powerful CEO in Indian FinTech", "organization": "Business Today"}, {"year": "2020", "title": "CNBC-TV18 India Business Leader Award — Disruptor of the Decade", "organization": "CNBC-TV18"}, {"year": "2019", "title": "Hurun India — Zerodha ranked #1 Bootstrapped Unicorn", "organization": "Hurun Research Institute"}]	7	en
819	1	Interviews	\N	{}	[{"url": "", "year": "January 2024", "title": "Zerodha is now fourteen years old and still hasn't raised money. Is that still a conscious choice, or just inertia?", "publication": "The Ken"}, {"url": "", "year": "September 2023", "title": "You disclosed your stroke publicly. Why did you feel the need to share something so personal?", "publication": "Moneycontrol"}, {"url": "", "year": "March 2022", "title": "Zerodha has been criticised for system outages during peak volatility. How do you respond to that?", "publication": "YourStory"}]	8	en
820	1	प्रारंभिक जीवन	"मैंने पैसे कमाने से पहले गंवाए। बाजार ने मुझे वह सब सिखाया जो क्लासरूम कभी नहीं सिखा सका — जोखिम के बारे में, अनुशासन के बारे में, और लोगों की असली जरूरतों के बारे में।"	{"5 अक्टूबर 1979 को कर्नाटक के शिमोगा में जन्मे नितिन कामथ का शुरुआती जीवन किसी आम मध्यमवर्गीय परिवार की तरह ही था। उनके पिता केनरा बैंक में अधिकारी थे और उनकी मां वीणा बजाना सिखाती थीं। आगे चलकर उनका परिवार बेंगलुरु शिफ्ट हो गया।","कम उम्र से ही नितिन को शेयर बाजार में दिलचस्पी होने लगी थी। किशोरावस्था के दौरान ही उन्होंने अपने पिता का ट्रेडिंग अकाउंट इस्तेमाल करना शुरू कर दिया था। बाजार उन्हें किताबों से ज्यादा आकर्षित करता था — क्योंकि यहाँ हर गलती का तुरंत हिसाब चुकाना पड़ता था।","अपने शुरुआती दिनों में उन्होंने एक कॉल सेंटर में सीनियर टेली-सेल्स एसोसिएट के रूप में भी काम किया। वह दिन में शेयर बाजार में ट्रेडिंग करते थे और रात के वक्त कॉल सेंटर में नाइट शिफ्ट करते थे।"}	\N	0	hi
821	1	शिक्षा	\N	{"नितिन कामथ की शिक्षा का कोई पारंपरिक रास्ता नहीं था। कोई IIT, IIM, CFA या MBA नहीं। उनकी असली पाठशाला शेयर बाजार थी — जहाँ हर गलती का हिसाब तुरंत चुकाना पड़ता था और हर सही फैसले का इनाम मिलता था।","सात साल की रोजाना ट्रेडिंग में उन्होंने बेंजामिन ग्राहम, जैक श्वागर जैसे महान निवेशकों की किताबें पढ़ीं। लेकिन हर किताब की थ्योरी उसी हफ्ते के ट्रेड से जांची जाती थी। जब थ्योरी और असलियत में फर्क आता, उसकी कीमत अपनी जेब से चुकानी पड़ती थी। यही तनाव उनकी असली शिक्षा बना।"}	\N	1	hi
822	1	करियर	\N	{"2004 तक नितिन इतने कुशल ट्रेडर बन चुके थे कि उन्होंने नाइट शिफ्ट छोड़ दी। पच्चीस साल की उम्र में — बिना किसी डिग्री के, बिना किसी प्रोफेशनल नेटवर्क के।","जैसे-जैसे वे प्रॉफिटेबल होते गए, एक बात उन्हें खलने लगी। हर ट्रेड पर ब्रोकर को प्रतिशत जाता था — एक रिटेल निवेशक साल भर में ₹15,000 से ₹25,000 सिर्फ ब्रोकरेज में चुका देता था। यही गणना जेरोधा के जन्म का कारण बनी।"}	\N	2	hi
823	1	उद्यमशीलता की यात्रा	"हम कभी सबसे बड़े ब्रोकर बनने की कोशिश नहीं कर रहे थे। हम सबसे ईमानदार बनने की कोशिश कर रहे थे। बड़ा आकार बाद में आया — और यह ईमानदारी की वजह से आया, उसके बावजूद नहीं।"	{"15 अगस्त 2010 को — स्वतंत्रता दिवस पर — नितिन ने भाई निखिल कामथ के साथ जेरोधा की नींव रखी। नाम जानबूझकर चुना गया: Zero + Rodha (संस्कृत में \\"रुकावट\\")। दोनों भाइयों ने ₹10–15 लाख की अपनी बचत लगाई। कोई वेंचर कैपिटल नहीं।","जेरोधा ने प्रति ट्रेड मात्र ₹20 फ्लैट-फी का मॉडल अपनाया — जबकि बड़े ब्रोकर ट्रेड वैल्यू का 0.3%–0.5% चार्ज करते थे।","शुरुआती दो साल कठिन रहे। कोई मार्केटिंग बजट नहीं। नितिन और निखिल ने हर नए ग्राहक को व्यक्तिगत फोन किया, हर शिकायत का जवाब खुद दिया। 2015 में काइट (Kite) लॉन्च हुआ — एक मोबाइल-फर्स्ट ट्रेडिंग प्लेटफॉर्म। उसी साल वार्सिटी (Varsity) भी शुरू हुई — मुफ्त वित्तीय शिक्षा प्लेटफॉर्म।","2022 तक जेरोधा के 60 लाख सक्रिय ग्राहक थे — NSE पर सबसे बड़ा ब्रोकर। ₹15 लाख की बचत से शुरू हुई कंपनी आज ₹8,000 करोड़ से अधिक का सालाना राजस्व कमाती है। और एक रुपया भी बाहर से नहीं लिया।"}	\N	3	hi
889	2	उद्यमशीलता की यात्रा	"हर निवेशक ने कहा ग्रामीण बाज़ार बहुत जोखिम भरा है। मैंने कहा — मैं बाज़ार पर दाँव नहीं लगा रहा, किसान पर लगा रहा हूँ। फर्क समझिए।"	{"2011 में ₹18 लाख की बचत और UP राज्य औद्योगिक विकास निगम से ₹40 लाख के कर्ज़ के साथ राजेश ने DCM श्रीराम से इस्तीफा दिया और उन्नाव के एक किराये के शेड से वेदास एग्रो इंडस्ट्रीज़ की शुरुआत की।","मॉडल सरल लेकिन क्रांतिकारी था: मंडी भाव से 15% ज़्यादा पर किसानों से सीधे खरीद, स्थानीय प्रसंस्करण, फिर ब्रांडेड आटा-सरसों तेल-चावल शहरी आधुनिक रिटेल तक। बिचौलियों की चार परतें काट दो।","पहले 18 महीने बेहद कठिन रहे। बैंकों ने कार्यशील पूँजी देने से मना किया। पाँच में से तीन पहले रिटेल खाते \\"आपूर्ति में अनियमितता\\" बताकर रद्द हो गए। अप्रैल 2012 की ओलावृष्टि में अनुबंधित गेहूँ की 40% फसल तबाह हो गई।","मोड़ आया 2012 के आखिर में — जब बिग बाज़ार के कैटेगरी खरीदार ने वेदास गोल्ड आटा चखा और 5,000 किग्रा का ट्रायल ऑर्डर दिया। छह महीने में यह 50,000 किग्रा हो गया।"}	\N	3	hi
890	2	चुनौतियाँ	\N	{"2014 का कार्यशील पूँजी संकट: देरी से मानसून और बैंकों की सतर्कता के कारण वेदास एग्रो चरम सीज़न में गेहूँ खरीदने लायक नकदी से लगभग खाली हो गई। राजेश ने तीन हफ्तों में 28 बैंकों को फोन किया — सबने मना किया। आखिरकार परिवार का घर गिरवी रखकर रायबरेली के एक सहकारी बैंक से ₹2 करोड़ की आपातकालीन सीमा मिली।","FMCG दिग्गजों से मुकाबला: 2016 में ₹50 करोड़ का राजस्व पार करते ही दो राष्ट्रीय FMCG ब्रांड सक्रिय हो गए। उन्होंने प्रतिस्पर्धी SKU पर रिटेल मार्जिन घटाया और वितरकों पर दबाव बनाया। राजेश ने जवाब दिया — 12 शहरों में वितरकों को पूरी तरह काटकर सीधे रिटेलर नेटवर्क बनाया।","COVID और आपूर्ति श्रृंखला का ढहना: मार्च 2020 में 1,100 मीट्रिक टन अनाज रास्ते में था जब राष्ट्रव्यापी लॉकडाउन लगा। राजेश ने 72 घंटे राज्य सरकार के अधिकारियों और लॉजिस्टिक्स पार्टनरों से फोन पर बात की। कंपनी न सिर्फ बची — FY2021 में 34% बढ़ी।"}	\N	4	hi
891	2	सफलता	\N	{"आज वेदास एग्रो UP, बिहार और पंजाब में छह प्रसंस्करण संयंत्रों के साथ भारत की सबसे तेज़ी से बढ़ती कृषि-प्रसंस्करण कंपनियों में से एक है। वेदास गोल्ड आटा UP के मॉडर्न ट्रेड में 12% बाज़ार हिस्सेदारी रखता है।","2022 में ऑम्निवोर पार्टनर्स से ₹85 करोड़ की Series B फंडिंग हुई — कंपनी की वैल्यूएशन ₹650 करोड़। Forbes India ने 2023 की \\"एग्री-चैंपियंस\\" सूची में राजेश को जगह दी।","राजेश के लिए सबसे बड़ी उपलब्धि: उनके नेटवर्क के 18,000 किसानों को अब उपज खरीद के 48 घंटे के भीतर भुगतान मिलता है — यह सेवा किसी मंडी ने आज तक नहीं दी।"}	\N	5	hi
892	2	नेतृत्व शैली	"मैं कभी ऐसे किसी को नहीं रखता जिससे मैं खुद कुछ न सीख सकूँ। मेरी कंपनी का हर इंसान कुछ ऐसा जानता है जो मैं नहीं जानता — यह कमज़ोरी नहीं, यह डिज़ाइन है।"	{"राजेश हर महीने कम से कम एक खरीद क्षेत्र खुद जाकर देखते हैं। उनका मानना है — ज़मीन से कटा नेतृत्व एक दिन झूठा साबित होता है।","मासिक ऑल-हैंड्स मीटिंग में P&L डेटा — नुकसान सहित — फैक्ट्री कर्मचारियों तक हर किसी के साथ साझा होता है। इसे वे \\"ज़िम्मेदारी की खेती\\" कहते हैं।","वेदास एग्रो ने कभी डाउन राउंड नहीं किया और कभी ऐसा कर्ज़ नहीं लिया जो 18 महीने में नहीं चुक सके। राजेश इसे \\"उन संस्थापकों का अनुशासन\\" कहते हैं जो गलती का खर्च नहीं उठा सकते।"}	\N	6	hi
893	2	पुरस्कार	\N	{"• Forbes India एग्री-चैंपियंस सूची — 2023\n• DPIIT, भारत सरकार — शीर्ष 50 एग्री-स्टार्टअप — 2023\n• EY इंडिया — एंटरप्रेन्योर ऑफ द ईयर (एग्री एवं खाद्य प्रसंस्करण) — 2022\n• CII राष्ट्रीय पुरस्कार — सर्वश्रेष्ठ ग्रामीण उद्यम — 2021\n• NABARD कृषि-व्यवसाय नेतृत्व पुरस्कार — 2019\n• उद्योग रत्न, उत्तर प्रदेश सरकार — 2017"}	\N	7	hi
894	2	साक्षात्कार	\N	{"The Economic Times (मार्च 2024): शुरुआती कृषि-संस्थापक सबसे ज़्यादा कौन सी गलती करते हैं? राजेश: \\"वे मंडी के खिलाफ लड़ने की कोशिश करते हैं। हमने मंडी को बाईपास किया — इसे खत्म नहीं किया। सिस्टम से लड़ने में ऊर्जा बर्बाद मत करो, सिस्टम के आसपास बनाओ।\\"","Forbes India (नवंबर 2023): एक बड़े FMCG समूह का अधिग्रहण प्रस्ताव ठुकरा दिया। क्यों? राजेश: \\"उन्होंने एक ब्रांड खरीदना चाहा। मैंने एक मिशन बनाया है। ये दोनों एक साथ नहीं रह सकते।\\"","IIM अहमदाबाद बिज़नेस रिव्यू (जून 2022): बड़े FMCG ब्रांडों से प्रतिस्पर्धा कैसे देखते हैं? राजेश: \\"उनके पास मार्केटिंग बजट है। हमारे पास किसान हैं जो 48 घंटे में भुगतान पाते हैं। देखते हैं कौन जीतता है।\\""}	\N	8	hi
824	1	चुनौतियाँ	\N	{"2010 में जेरोधा एक अनजान स्टार्टअप था जो लोगों से उनकी जीवनभर की बचत संभालने को कह रहा था। \\"हमारे पास कोई ब्रांड नहीं था, इसलिए हमें एक-एक बातचीत से भरोसा बनाना पड़ा।\\"","2010 में कोई VC डिस्काउंट ब्रोकर में पैसा नहीं लगाना चाहता था। 2015 में जब जेरोधा सफल हो चुका था, VCs ने फोन करना शुरू किया। नितिन ने हर बार मना किया। \\"अपनी पूंजी से हर गलती व्यक्तिगत होती है।\\"","2020-21 में अत्यधिक बाजार उतार-चढ़ाव के दौरान जेरोधा के सिस्टम में खामियां आईं। नितिन ने हर बार विस्तृत सार्वजनिक पोस्ट लिखी — क्या गलत हुआ, क्यों, और क्या किया जाएगा।","2023 में 43 साल की उम्र में नितिन को हल्का स्ट्रोक आया। उन्होंने इसे सार्वजनिक रूप से साझा किया: \\"कोई भी सफलता आपकी सेहत को बर्बाद करने लायक नहीं है।\\""}	\N	4	hi
825	1	सफलता	\N	{"आज के स्टार्टअप युग में जहां कंपनियां करोड़ों-अरबों की फंडिंग के पीछे भागती हैं, जेरोधा ने बिना किसी बाहरी VC फंडिंग और बिना एक भी बड़े विज्ञापन के अपने दम पर ग्रोथ हासिल की।","FY24 में ₹8,320 करोड़ का राजस्व और ₹4,700 करोड़ का शुद्ध लाभ — यह एक बूटस्ट्रैप्ड व्यवसाय की उपलब्धि है जो भारतीय स्टार्टअप इतिहास में दुर्लभ है।","नितिन ने 2015 में रेनमैटर (Rainmatter) नाम से एक इनक्यूबेटर और फंड की शुरुआत की, जो 100 से अधिक फिनटेक स्टार्टअप्स का समर्थन करता है। वार्सिटी के आज 1.5 करोड़ से अधिक पाठक हैं।"}	\N	5	hi
826	1	नेतृत्व शैली	"पारदर्शिता हमारे लिए PR रणनीति नहीं है। यह जीवित रहने का तरीका है।"	{"जब जेरोधा को SEBI का आदेश मिलता है, नितिन मीडिया से पहले उसे सार्वजनिक करते हैं। भारत के वित्तीय क्षेत्र में यह दृष्टिकोण असाधारण है।","चौदह साल में जेरोधा ने एक रुपया भी बाहरी पूंजी नहीं ली। \\"जब आप दूसरे की पूंजी खर्च करते हैं, हर गलती महंगी पर सुधरने योग्य होती है। जब अपनी खर्च करते हैं, हर गलती व्यक्तिगत होती है।\\"","वार्सिटी — जेरोधा का मुफ्त वित्तीय शिक्षा प्लेटफॉर्म — तब बनाया गया जब जेरोधा अभी छोटा था। नितिन की सोच: जो निवेशक समझकर निवेश करता है, वह बाजार में लंबे समय तक रहता है।"}	\N	6	hi
827	1	पुरस्कार	\N	{"• Forbes Asia — 50 Over 50, 2024\n• Forbes India रिच लिस्ट — सेल्फ-मेड अरबपति, 2023\n• Economic Times ET Awards — एंटरप्रेन्योर ऑफ द ईयर, 2022\n• Business Today — भारतीय फिनटेक का सबसे शक्तिशाली CEO, 2021\n• CNBC-TV18 — दशक का सबसे बड़ा डिसरप्टर, 2020\n• Hurun India — जेरोधा #1 बूटस्ट्रैप्ड यूनिकॉर्न, 2019"}	\N	7	hi
828	1	साक्षात्कार	\N	{"The Ken (जनवरी 2024): जेरोधा 14 साल पुरानी है और अभी तक कोई फंडिंग नहीं ली। नितिन: \\"बिल्कुल सोची-समझी पसंद है। हम सिर्फ एक stakeholder को optimize करते हैं: ग्राहक। यह मौलिक रूप से अलग कंपनी है।\\"","Moneycontrol (सितंबर 2023): स्ट्रोक के बारे में सार्वजनिक रूप से क्यों बताया? नितिन: \\"भारत में founder culture overwork को जिस तरह glorify करती है, वह वाकई खतरनाक है। दूसरे founders को यह किसी ऐसे से सुनना था जो खुद इससे गुजरा हो।\\"","YourStory (मार्च 2022): सिस्टम आउटेज पर: \\"हम इसे fix करके पूरी जानकारी देते हैं — विस्तार से, सार्वजनिक रूप से। ग्राहक perfection की उम्मीद नहीं करते। जो वे माफ नहीं कर सकते, वह है बेईमानी।\\""}	\N	8	hi
829	2	Early Life	"We had no electricity at home till I was 12. My mother cooked by lamplight. That darkness taught me to be obsessed with light — with progress."	{"Rajesh Kumar Vedas was born in 1980 in Bachhrawan, a small village in Rae Bareli district of Uttar Pradesh. The youngest of five children born to a farmer father and schoolteacher mother, Rajesh grew up in conditions that most urban Indians cannot imagine — erratic power, no piped water, and a single-room home shared by seven people.","His father, Ramlal Vedas, cultivated two acres of wheat and mustard. The family income rarely crossed ₹3,000 a month. Yet his mother, Savitri Devi, ran the village's only primary school from their courtyard and insisted all her children complete their education, no matter what.","It was watching his father sell wheat at distress prices to local middlemen — often for less than the cost of production — that planted the first seed of what would become Vedas Agro."}	\N	0	en
830	2	Education	\N	{"Rajesh's academic journey was funded almost entirely by scholarships and part-time work. At IRMA, he was exposed for the first time to the formal economics of agricultural value chains. His thesis — \\"Disintermediation in UP's Wheat Procurement: A Field Study\\" — was cited by NABARD in a 2007 policy paper.","Professor Arvind Patel, his thesis supervisor at IRMA, recalls: \\"Rajesh was not the most brilliant student in the room, but he was the most driven. Every problem he studied had a personal dimension for him. That made his work extraordinarily grounded.\\""}	{"htmlContent": "<table style=\\"width:100%;border-collapse:collapse\\"><tbody><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">1994</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Matriculation from Government Inter College, Rae Bareli — District topper</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">1996</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Intermediate (Science) from Allahabad Board — Scored 89%</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2000</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">B.Sc. Agriculture, Sam Higginbottom University, Allahabad — First Class</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2003</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">MBA (Rural Management), IRMA Anand, Gujarat — Gold Medal</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2018</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Executive Programme in Business Strategy, IIM Ahmedabad</td></tr></tbody></table>"}	1	en
831	2	Career	\N	{"Rajesh's early career was deliberately chosen to build domain depth, not income. At NABARD, he spent three years travelling UP's rural hinterland, documenting farmer distress and credit gaps. At ITC's eChoupal division, he helped onboard over 600 villages onto the digital procurement platform.","At DCM Shriram, he managed a ₹300 Crore agri-input distribution business across five states. It was here that he spotted the structural gap: India processed less than 8% of its agricultural output, losing billions in value that went overseas."}	{"htmlContent": "<table style=\\"width:100%;border-collapse:collapse\\"><tbody><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2003–2006</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Field Officer — NABARD, Lucknow Regional Office</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2006–2009</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Agri-Business Manager — ITC Limited, Agri Division, Kanpur</td></tr><tr><td style=\\"padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151\\">2009–2011</td><td style=\\"padding:8px 0;font-size:15px;line-height:1.6;color:#374151\\">Regional Head (North India) — DCM Shriram Industries</td></tr></tbody></table>"}	2	en
832	2	Entrepreneurial Journey	"Every investor I met told me the rural market was too risky. I told them: I'm not betting on the market. I'm betting on the farmer. There's a difference."	{"In 2011, with ₹18 lakh in personal savings and a ₹40 lakh loan from the UP State Industrial Development Corporation, Rajesh resigned from DCM Shriram and launched Vedas Agro Industries from a rented shed in Unnao.","The founding thesis was simple but radical: buy directly from farmers at a 15% premium over mandi price, process locally, and sell packaged commodities — atta, mustard oil, rice — directly to modern trade retailers in cities. Cut out four layers of middlemen.","The first 18 months were brutal. Banks refused working capital loans. Three of his first five retail accounts cancelled orders citing \\"supply inconsistency.\\" A hailstorm wiped out 40% of his contracted wheat crop in April 2012.","The turning point came in late 2012 when Big Bazaar's category buyer tasted the Vedas Gold atta and placed a 5,000 kg trial order. That order became 50,000 kg within six months."}	\N	3	en
833	2	Challenges	\N	{}	{"htmlContent": "<div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">The 2014 Working Capital Crisis</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">A delayed monsoon and a banking sector cautious of agri-lending meant Vedas Agro nearly ran out of cash to procure wheat during peak season. Rajesh personally called 28 banks over 3 weeks. All said no. He finally secured a ₹2 Crore emergency line from a cooperative bank in Rae Bareli by pledging his family home.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Competing with FMCG Giants</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">When Vedas Agro crossed ₹50 Crore in revenue in 2016, it attracted the counter-marketing budgets of two national FMCG brands. They slashed retail margins on competing SKUs and pressured distributors to deprioritize Vedas. Rajesh responded by building a direct-to-retailer network, cutting distributors entirely in 12 cities.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">COVID and the Supply Chain Collapse</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">In March 2020, Vedas Agro had 1,100 MT of grain in transit when the national lockdown was announced. Rajesh spent 72 hours on calls with state government officials and logistics partners. The company not only survived but grew 34% in FY2021 as branded packaged foods surged.</p></div>"}	4	en
834	2	Success	\N	{"Today, Vedas Agro is one of India's fastest-growing agri-processing companies, with six processing plants across UP, Bihar, and Punjab. The company's flagship Vedas Gold Atta commands a 12% market share in modern trade in UP.","In 2022, the company raised ₹85 Crore in Series B funding from Omnivore Partners, valuing it at ₹650 Crore. Forbes India profiled Rajesh in its 2023 \\"Agri-Champions\\" list.","More personally meaningful to Rajesh: 18,000 farmers in his network now receive payments within 48 hours of procurement — a service no mandi has ever offered."}	{"htmlContent": "<div style=\\"display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px\\"><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Annual Revenue (FY24)</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">₹210 Crore</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Farmer Partners</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">18,000+</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">States Present</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">14</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Retail Touchpoints</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">85,000+</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">SKUs</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">62</div></div><div style=\\"border:1px solid #e5e7eb;padding:12px\\"><div style=\\"font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px\\">Employee Strength</div><div style=\\"font-size:22px;font-weight:700;color:#111827\\">1,400+</div></div></div>"}	5	en
835	2	Leadership Style	"I never hire someone I wouldn't be comfortable learning from. Every person in my company knows something I don't. That's not a weakness — that's design."	{}	{"htmlContent": "<div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Field-First</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Rajesh visits at least one procurement zone personally every month. He believes leadership disconnected from the field becomes fiction.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Radical Transparency</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Monthly all-hands meetings where P&L data — including losses — is shared with every employee, down to factory workers.</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Patient Capital Mindset</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Vedas Agro has never done a down round and has never taken on debt it could not service within 18 months. Rajesh calls this \\"the discipline of founders who can't afford a mistake.\\"</p></div><div style=\\"margin-bottom:24px\\"><h3 style=\\"font-size:18px;font-weight:700;margin:0 0 8px;color:#111827\\">Farmer-Centric Design</h3><p style=\\"margin:0;line-height:1.75;color:#374151\\">Every product decision is run through a single filter: does this help us pay farmers more? If yes, it gets prioritized.</p></div>"}	6	en
836	2	Awards	\N	{}	[{"year": "2023", "title": "Forbes India Agri-Champions List", "organization": "Forbes India"}, {"year": "2023", "title": "Top 50 Agri-Startups", "organization": "DPIIT, Government of India"}, {"year": "2022", "title": "Ernst & Young Entrepreneur of the Year — Agri & Food Processing", "organization": "EY India"}, {"year": "2021", "title": "Best Rural Enterprise of the Year", "organization": "CII National Awards"}, {"year": "2019", "title": "NABARD Agri-Business Leadership Award", "organization": "NABARD"}, {"year": "2017", "title": "Udyog Ratna, Uttar Pradesh Government", "organization": "Government of UP"}]	7	en
837	2	Interviews	\N	{}	[{"url": "", "year": "March 2024", "title": "What is the one mistake early-stage agri-founders make most often?", "publication": "The Economic Times"}, {"url": "", "year": "November 2023", "title": "You turned down an acquisition offer from a large FMCG conglomerate. Why?", "publication": "Forbes India"}, {"url": "", "year": "June 2022", "title": "How do you think about competition from large FMCG brands?", "publication": "IIM Ahmedabad Business Review"}]	8	en
\.


--
-- Data for Name: founders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.founders (id, slug, name, designation, profile_type, profile_tag, category, location, founded, revenue, employees, age, photo_url, cover_photo_url, one_liner, executive_summary, published, created_at, updated_at) FROM stdin;
1	nithin-kamath	Nithin Kamath	Co-Founder & CEO, Zerodha	Startup Founder	Zero to One	Founder Story	Bengaluru, Karnataka	2010	₹8,320 Crore (FY24)	1,200+	44	/nithin-kamath.webp	https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80	The man who challenged traditional brokerages with a ₹20 flat-fee model—and transformed investing in India.	73 Lakh clients · ₹8,320 Cr revenue · Zero VC funding · India's largest broker	t	2026-07-22 14:34:15.107453+00	2026-07-26 12:25:40.331+00
2	rajesh-kumar-vedas	Rajesh Kumar Vedas	Founder & CEO, Vedas Agro Industries	Rural Founder	Bharat Builder	Founder Story	Lucknow, Uttar Pradesh	2011	₹210 Crore	1,400+	44	https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80	https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80	From a small UP village with no electricity to building India's fastest-growing agri-processing company.	18,000 farmer partners · ₹210 Cr revenue · 6 processing plants · 85,000+ retail touchpoints	t	2026-07-22 14:34:15.204796+00	2026-07-26 12:25:40.506+00
\.


--
-- Data for Name: seo_meta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.seo_meta (id, founder_id, seo_title, seo_description, keywords, canonical_url, og_image, og_title, twitter_card, schema_type, focus_keyword, robots) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (sid, sess, expire) FROM stdin;
s5hVW140a1nCew64kbPJs1gJd44Ig7nH	{"cookie":{"originalMaxAge":604800000,"expires":"2026-07-29T14:36:23.439Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"userId":1,"username":"admin"}	2026-07-29 14:36:24
h77_Zy196xPN25h9e5xH0P-6_59aLES9	{"cookie":{"originalMaxAge":604800000,"expires":"2026-07-29T15:22:47.434Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"userId":1,"username":"admin"}	2026-07-29 15:22:48
qAUEhxUpnh1LwGWUilo7UhNUR-gwx-Ri	{"cookie":{"originalMaxAge":604800000,"expires":"2026-07-29T15:24:38.950Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"userId":1,"username":"admin"}	2026-07-29 15:24:39
J4drn-WIIpQzfM6q-tjE_8Q9rdPKWvvW	{"cookie":{"originalMaxAge":604800000,"expires":"2026-07-29T15:58:08.109Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"userId":1,"username":"admin"}	2026-08-02 10:45:29
\.


--
-- Data for Name: sub_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sub_categories (id, category_id, name, slug, description, sort_order, created_at) FROM stdin;
\.


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: founder_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.founder_sections_id_seq', 894, true);


--
-- Name: founders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.founders_id_seq', 11, true);


--
-- Name: seo_meta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.seo_meta_id_seq', 1, false);


--
-- Name: sub_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sub_categories_id_seq', 1, false);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_unique UNIQUE (username);


--
-- Name: categories categories_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_unique UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);


--
-- Name: founder_sections founder_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founder_sections
    ADD CONSTRAINT founder_sections_pkey PRIMARY KEY (id);


--
-- Name: founders founders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founders
    ADD CONSTRAINT founders_pkey PRIMARY KEY (id);


--
-- Name: founders founders_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founders
    ADD CONSTRAINT founders_slug_unique UNIQUE (slug);


--
-- Name: seo_meta seo_meta_founder_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_meta
    ADD CONSTRAINT seo_meta_founder_id_unique UNIQUE (founder_id);


--
-- Name: seo_meta seo_meta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_meta
    ADD CONSTRAINT seo_meta_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: sub_categories sub_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_pkey PRIMARY KEY (id);


--
-- Name: sub_categories sub_categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_slug_unique UNIQUE (slug);


--
-- Name: founder_sections founder_sections_founder_id_founders_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.founder_sections
    ADD CONSTRAINT founder_sections_founder_id_founders_id_fk FOREIGN KEY (founder_id) REFERENCES public.founders(id) ON DELETE CASCADE;


--
-- Name: seo_meta seo_meta_founder_id_founders_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_meta
    ADD CONSTRAINT seo_meta_founder_id_founders_id_fk FOREIGN KEY (founder_id) REFERENCES public.founders(id) ON DELETE CASCADE;


--
-- Name: sub_categories sub_categories_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sub_categories
    ADD CONSTRAINT sub_categories_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict d0X9mUcSfh1usE17ZA5Kh2KFiRat1e83jgLPFM0zv0AXwZ96LV1waTgHPLY6HkZ

