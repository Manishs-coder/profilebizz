/**
 * Production seed — runs on server startup if data is missing.
 * Safe to run multiple times (upserts by slug).
 */
import { db, foundersTable, founderSectionsTable } from "@workspace/db";
import { eq, and, count, inArray } from "drizzle-orm";
import { logger } from "./lib/logger";

// ── HTML builders ──────────────────────────────────────────────────────────────
function tl(rows: { year?: string; event?: string; role?: string; org?: string }[]) {
  const trs = rows.map(r => {
    const yr = r.year ?? '';
    const desc = r.event ?? (r.role ? `${r.role} — ${r.org}` : r.org ?? '');
    return `<tr><td style="padding:8px 16px 8px 0;font-weight:700;white-space:nowrap;vertical-align:top;font-size:14px;color:#374151">${yr}</td><td style="padding:8px 0;font-size:15px;line-height:1.6;color:#374151">${desc}</td></tr>`;
  });
  return `<table style="width:100%;border-collapse:collapse"><tbody>${trs.join('')}</tbody></table>`;
}
function ch(cs: { title: string; body: string }[]) {
  return cs.map(c => `<div style="margin-bottom:24px"><h3 style="font-size:18px;font-weight:700;margin:0 0 8px;color:#111827">${c.title}</h3><p style="margin:0;line-height:1.75;color:#374151">${c.body}</p></div>`).join('');
}
function st(ss: { label: string; value: string }[]) {
  const items = ss.map(s => `<div style="border:1px solid #e5e7eb;padding:12px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:4px">${s.label}</div><div style="font-size:22px;font-weight:700;color:#111827">${s.value}</div></div>`).join('');
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">${items}</div>`;
}
function tr2(ts: { trait: string; desc: string }[]) {
  return ts.map(t => `<div style="margin-bottom:24px"><h3 style="font-size:18px;font-weight:700;margin:0 0 8px;color:#111827">${t.trait}</h3><p style="margin:0;line-height:1.75;color:#374151">${t.desc}</p></div>`).join('');
}

// ── Upsert helpers ─────────────────────────────────────────────────────────────
async function upsertFounder(d: Record<string, any>) {
  const existing = await db.select({
    id: foundersTable.id,
    photoUrl: foundersTable.photoUrl,
    coverPhotoUrl: foundersTable.coverPhotoUrl,
  }).from(foundersTable).where(eq(foundersTable.slug, d.slug)).limit(1);
  if (existing.length) {
    // Never overwrite photo URLs that admin has already set — preserve them
    const keepPhoto = existing[0].photoUrl || d.photoUrl || null;
    const keepCover = existing[0].coverPhotoUrl || d.coverPhotoUrl || null;
    await db.update(foundersTable).set({
      name: d.name, designation: d.designation, profileType: d.profileType ?? null,
      profileTag: d.profileTag ?? null, category: d.category ?? null, location: d.location ?? null,
      founded: d.founded ?? null, revenue: d.revenue ?? null, employees: d.employees ?? null,
      age: d.age ?? null, photoUrl: keepPhoto, coverPhotoUrl: keepCover,
      oneLiner: d.oneLiner ?? null, executiveSummary: d.executiveSummary ?? null, published: d.published ?? true,
    }).where(eq(foundersTable.slug, d.slug));
    return existing[0].id;
  }
  const [row] = await db.insert(foundersTable).values({
    slug: d.slug, name: d.name, designation: d.designation, profileType: d.profileType ?? null,
    profileTag: d.profileTag ?? null, category: d.category ?? null, location: d.location ?? null,
    founded: d.founded ?? null, revenue: d.revenue ?? null, employees: d.employees ?? null,
    age: d.age ?? null, photoUrl: d.photoUrl ?? null, coverPhotoUrl: d.coverPhotoUrl ?? null,
    oneLiner: d.oneLiner ?? null, executiveSummary: d.executiveSummary ?? null, published: d.published ?? true,
  }).returning({ id: foundersTable.id });
  return row.id;
}

/**
 * Inserts sections ONLY if none exist yet for this founder+locale.
 * Admin edits are preserved — this never deletes or overwrites existing rows.
 */
async function seedSectionsIfEmpty(founderId: number, locale: string, sections: any[]) {
  const [{ value: existing }] = await db
    .select({ value: count() })
    .from(founderSectionsTable)
    .where(and(eq(founderSectionsTable.founderId, founderId), eq(founderSectionsTable.locale, locale)));
  if (existing > 0) return; // admin may have edited — leave untouched

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    await db.insert(founderSectionsTable).values({
      founderId, locale, sectionKey: s.sectionKey,
      pullQuote: s.pullQuote ?? null,
      bodyParagraphs: s.bodyParagraphs ?? [],
      jsonData: s.jsonData !== undefined ? s.jsonData : null,
      sortOrder: i,
    });
  }
}

// ── Section data ───────────────────────────────────────────────────────────────

const nkSectionsHi = [
  { sectionKey: 'प्रारंभिक जीवन', pullQuote: '"मैंने पैसे कमाने से पहले गंवाए। बाजार ने मुझे वह सब सिखाया जो क्लासरूम कभी नहीं सिखा सका — जोखिम के बारे में, अनुशासन के बारे में, और लोगों की असली जरूरतों के बारे में।"', bodyParagraphs: [
    '5 अक्टूबर 1979 को कर्नाटक के शिमोगा में जन्मे नितिन कामथ का शुरुआती जीवन किसी आम मध्यमवर्गीय परिवार की तरह ही था। उनके पिता केनरा बैंक में अधिकारी थे और उनकी मां वीणा बजाना सिखाती थीं। आगे चलकर उनका परिवार बेंगलुरु शिफ्ट हो गया।',
    'कम उम्र से ही नितिन को शेयर बाजार में दिलचस्पी होने लगी थी। किशोरावस्था के दौरान ही उन्होंने अपने पिता का ट्रेडिंग अकाउंट इस्तेमाल करना शुरू कर दिया था। बाजार उन्हें किताबों से ज्यादा आकर्षित करता था — क्योंकि यहाँ हर गलती का तुरंत हिसाब चुकाना पड़ता था।',
    'अपने शुरुआती दिनों में उन्होंने एक कॉल सेंटर में सीनियर टेली-सेल्स एसोसिएट के रूप में भी काम किया। वह दिन में शेयर बाजार में ट्रेडिंग करते थे और रात के वक्त कॉल सेंटर में नाइट शिफ्ट करते थे।',
  ]},
  { sectionKey: 'शिक्षा', bodyParagraphs: [
    'नितिन कामथ की शिक्षा का कोई पारंपरिक रास्ता नहीं था। कोई IIT, IIM, CFA या MBA नहीं। उनकी असली पाठशाला शेयर बाजार थी — जहाँ हर गलती का हिसाब तुरंत चुकाना पड़ता था और हर सही फैसले का इनाम मिलता था।',
    'सात साल की रोजाना ट्रेडिंग में उन्होंने बेंजामिन ग्राहम, जैक श्वागर जैसे महान निवेशकों की किताबें पढ़ीं। लेकिन हर किताब की थ्योरी उसी हफ्ते के ट्रेड से जांची जाती थी। जब थ्योरी और असलियत में फर्क आता, उसकी कीमत अपनी जेब से चुकानी पड़ती थी। यही तनाव उनकी असली शिक्षा बना।',
  ]},
  { sectionKey: 'करियर', bodyParagraphs: [
    '2004 तक नितिन इतने कुशल ट्रेडर बन चुके थे कि उन्होंने नाइट शिफ्ट छोड़ दी। पच्चीस साल की उम्र में — बिना किसी डिग्री के, बिना किसी प्रोफेशनल नेटवर्क के।',
    'जैसे-जैसे वे प्रॉफिटेबल होते गए, एक बात उन्हें खलने लगी। हर ट्रेड पर ब्रोकर को प्रतिशत जाता था — एक रिटेल निवेशक साल भर में ₹15,000 से ₹25,000 सिर्फ ब्रोकरेज में चुका देता था। यही गणना जेरोधा के जन्म का कारण बनी।',
  ]},
  { sectionKey: 'उद्यमशीलता की यात्रा', pullQuote: '"हम कभी सबसे बड़े ब्रोकर बनने की कोशिश नहीं कर रहे थे। हम सबसे ईमानदार बनने की कोशिश कर रहे थे। बड़ा आकार बाद में आया — और यह ईमानदारी की वजह से आया, उसके बावजूद नहीं।"', bodyParagraphs: [
    '15 अगस्त 2010 को — स्वतंत्रता दिवस पर — नितिन ने भाई निखिल कामथ के साथ जेरोधा की नींव रखी। नाम जानबूझकर चुना गया: Zero + Rodha (संस्कृत में "रुकावट")। दोनों भाइयों ने ₹10–15 लाख की अपनी बचत लगाई। कोई वेंचर कैपिटल नहीं।',
    'जेरोधा ने प्रति ट्रेड मात्र ₹20 फ्लैट-फी का मॉडल अपनाया — जबकि बड़े ब्रोकर ट्रेड वैल्यू का 0.3%–0.5% चार्ज करते थे।',
    'शुरुआती दो साल कठिन रहे। कोई मार्केटिंग बजट नहीं। नितिन और निखिल ने हर नए ग्राहक को व्यक्तिगत फोन किया, हर शिकायत का जवाब खुद दिया। 2015 में काइट (Kite) लॉन्च हुआ — एक मोबाइल-फर्स्ट ट्रेडिंग प्लेटफॉर्म। उसी साल वार्सिटी (Varsity) भी शुरू हुई — मुफ्त वित्तीय शिक्षा प्लेटफॉर्म।',
    '2022 तक जेरोधा के 60 लाख सक्रिय ग्राहक थे — NSE पर सबसे बड़ा ब्रोकर। ₹15 लाख की बचत से शुरू हुई कंपनी आज ₹8,000 करोड़ से अधिक का सालाना राजस्व कमाती है। और एक रुपया भी बाहर से नहीं लिया।',
  ]},
  { sectionKey: 'चुनौतियाँ', bodyParagraphs: [
    '2010 में जेरोधा एक अनजान स्टार्टअप था जो लोगों से उनकी जीवनभर की बचत संभालने को कह रहा था। "हमारे पास कोई ब्रांड नहीं था, इसलिए हमें एक-एक बातचीत से भरोसा बनाना पड़ा।"',
    '2010 में कोई VC डिस्काउंट ब्रोकर में पैसा नहीं लगाना चाहता था। 2015 में जब जेरोधा सफल हो चुका था, VCs ने फोन करना शुरू किया। नितिन ने हर बार मना किया। "अपनी पूंजी से हर गलती व्यक्तिगत होती है।"',
    '2020-21 में अत्यधिक बाजार उतार-चढ़ाव के दौरान जेरोधा के सिस्टम में खामियां आईं। नितिन ने हर बार विस्तृत सार्वजनिक पोस्ट लिखी — क्या गलत हुआ, क्यों, और क्या किया जाएगा।',
    '2023 में 43 साल की उम्र में नितिन को हल्का स्ट्रोक आया। उन्होंने इसे सार्वजनिक रूप से साझा किया: "कोई भी सफलता आपकी सेहत को बर्बाद करने लायक नहीं है।"',
  ]},
  { sectionKey: 'सफलता', bodyParagraphs: [
    'आज के स्टार्टअप युग में जहां कंपनियां करोड़ों-अरबों की फंडिंग के पीछे भागती हैं, जेरोधा ने बिना किसी बाहरी VC फंडिंग और बिना एक भी बड़े विज्ञापन के अपने दम पर ग्रोथ हासिल की।',
    'FY24 में ₹8,320 करोड़ का राजस्व और ₹4,700 करोड़ का शुद्ध लाभ — यह एक बूटस्ट्रैप्ड व्यवसाय की उपलब्धि है जो भारतीय स्टार्टअप इतिहास में दुर्लभ है।',
    'नितिन ने 2015 में रेनमैटर (Rainmatter) नाम से एक इनक्यूबेटर और फंड की शुरुआत की, जो 100 से अधिक फिनटेक स्टार्टअप्स का समर्थन करता है। वार्सिटी के आज 1.5 करोड़ से अधिक पाठक हैं।',
  ]},
  { sectionKey: 'नेतृत्व शैली', pullQuote: '"पारदर्शिता हमारे लिए PR रणनीति नहीं है। यह जीवित रहने का तरीका है।"', bodyParagraphs: [
    'जब जेरोधा को SEBI का आदेश मिलता है, नितिन मीडिया से पहले उसे सार्वजनिक करते हैं। भारत के वित्तीय क्षेत्र में यह दृष्टिकोण असाधारण है।',
    'चौदह साल में जेरोधा ने एक रुपया भी बाहरी पूंजी नहीं ली। "जब आप दूसरे की पूंजी खर्च करते हैं, हर गलती महंगी पर सुधरने योग्य होती है। जब अपनी खर्च करते हैं, हर गलती व्यक्तिगत होती है।"',
    'वार्सिटी — जेरोधा का मुफ्त वित्तीय शिक्षा प्लेटफॉर्म — तब बनाया गया जब जेरोधा अभी छोटा था। नितिन की सोच: जो निवेशक समझकर निवेश करता है, वह बाजार में लंबे समय तक रहता है।',
  ]},
  { sectionKey: 'पुरस्कार', bodyParagraphs: [
    '• Forbes Asia — 50 Over 50, 2024\n• Forbes India रिच लिस्ट — सेल्फ-मेड अरबपति, 2023\n• Economic Times ET Awards — एंटरप्रेन्योर ऑफ द ईयर, 2022\n• Business Today — भारतीय फिनटेक का सबसे शक्तिशाली CEO, 2021\n• CNBC-TV18 — दशक का सबसे बड़ा डिसरप्टर, 2020\n• Hurun India — जेरोधा #1 बूटस्ट्रैप्ड यूनिकॉर्न, 2019',
  ]},
  { sectionKey: 'साक्षात्कार', bodyParagraphs: [
    'The Ken (जनवरी 2024): जेरोधा 14 साल पुरानी है और अभी तक कोई फंडिंग नहीं ली। नितिन: "बिल्कुल सोची-समझी पसंद है। हम सिर्फ एक stakeholder को optimize करते हैं: ग्राहक। यह मौलिक रूप से अलग कंपनी है।"',
    'Moneycontrol (सितंबर 2023): स्ट्रोक के बारे में सार्वजनिक रूप से क्यों बताया? नितिन: "भारत में founder culture overwork को जिस तरह glorify करती है, वह वाकई खतरनाक है। दूसरे founders को यह किसी ऐसे से सुनना था जो खुद इससे गुजरा हो।"',
    'YourStory (मार्च 2022): सिस्टम आउटेज पर: "हम इसे fix करके पूरी जानकारी देते हैं — विस्तार से, सार्वजनिक रूप से। ग्राहक perfection की उम्मीद नहीं करते। जो वे माफ नहीं कर सकते, वह है बेईमानी।"',
  ]},
];

const nkSectionsEn = [
  { sectionKey: 'Early Life', pullQuote: `"I lost money before I made any. The market taught me everything the classroom never could — about risk, about discipline, and about what people really need."`, bodyParagraphs: [
    `Bengaluru, 1996. A seventeen-year-old boy from a middle-class family walks into a brokerage office, fills out an account-opening form, and hands over his savings. His name is Nithin Kamath. Within weeks, he has lost most of it.`,
    `Most people would have walked away. Nithin did not. He was not angry at the market — he was curious about it. Why did prices move the way they did? What separated the traders who survived from those who didn't? These questions would consume the next fourteen years of his life, and the answers would eventually reshape how 73 million Indians invest their money.`,
    `Growing up in Bengaluru — the elder of two brothers in a family where his father worked in the public sector — Nithin had always been drawn to numbers and systems. But it was the stock market that gave that curiosity a direction. Unlike a textbook, the market responded to you in real time, with real consequences. Lose attention for a moment, and you paid for it. Understand something others hadn't yet, and you were rewarded.`,
    `So instead of quitting after his early losses, Nithin did something that would define his character as a founder: he took a night-shift job at a call centre in Bengaluru, working from late evening to early morning, so that his days remained completely free for trading. While his peers were building careers, collecting experience letters, and preparing for MBA entrance exams, Nithin was reading Jack Schwager at 2 pm and placing trades at 10 am. He was, in every sense, building a different kind of education — one the market would never let him fake.`,
  ]},
  { sectionKey: 'Education', bodyParagraphs: [
    `There is no IIT or IIM in Nithin Kamath's story. No analyst programme, no CFA, no MBA with a finance specialisation. His entire formal education ended before the stock market began to educate him properly.`,
    `Over seven years of daily trading, he read everything he could find: Benjamin Graham on value, Jack Schwager's Market Wizards on trading psychology, academic papers on order flow and market microstructure. But unlike a student reading for an exam, Nithin was cross-referencing every idea against the trades he placed that same week. Theory met reality every single day — and when they disagreed, it cost him money.`,
    `"Most people in financial services have studied markets. I traded them. There's a difference — you understand things viscerally when your own money is on the line," he has said.`,
  ], jsonData: { htmlContent: tl([
    { year: '1996', event: 'Opened first trading account at age 17 — lost money immediately, chose to stay and learn' },
    { year: '1997–2004', event: 'Worked night shifts at a BPO/call centre; traded equities and derivatives during the day' },
    { year: '2004–2009', event: 'Quit night shifts — became a full-time proprietary trader, building expertise in F&O and market microstructure' },
    { year: '2009', event: 'Began mapping the gap: what retail investors needed versus what the brokerage industry was offering' },
    { year: '2010', event: 'Co-founded Zerodha with brother Nikhil Kamath — ₹10–15 lakh of personal savings, zero outside capital' },
  ]) }},
  { sectionKey: 'Career', bodyParagraphs: [
    `By 2004, Nithin had become profitable enough to leave the night shifts entirely. He was twenty-five years old, with no formal credentials, no professional network in finance, and no employer willing to hire him — but he could trade. He spent the next five years honing his skills across equities, futures, and options, building a systematic edge that few retail traders in India had.`,
    `But the more profitable he became, the more something else gnawed at him. Every single trade, a percentage went to the broker. Not a large percentage — but relentless, compounding, unavoidable. He started running the numbers. If a retail investor placed fifty trades a month, a standard percentage broker was collecting ₹15,000 to ₹25,000 every year — not in taxes, not in stamp duty, but purely in brokerage.`,
    `That calculation — which he had experienced personally, painfully, for nearly a decade — became the founding insight of Zerodha. The brokerage industry in India was not just inefficient. It was structured, deliberately or not, to benefit brokers rather than clients.`,
  ], jsonData: { htmlContent: tl([
    { year: '1997–2004', event: 'Night-shift Agent — BPO / Call Centre, Bengaluru' },
    { year: '2004–2009', event: 'Full-time Proprietary Trader — Self-directed, Bengaluru' },
    { year: '2010–Present', event: 'Co-Founder & CEO — Zerodha' },
    { year: '2014–Present', event: 'Founder — Rainmatter Capital (FinTech Investments & Incubation)' },
    { year: '2021–Present', event: 'Trustee — Rainmatter Foundation (Climate & Social Impact)' },
  ]) }},
  { sectionKey: 'Entrepreneurial Journey', pullQuote: `"We were never trying to be the biggest broker. We were trying to be the most honest one. The size came later — and it came because of the honesty, not in spite of it."`, bodyParagraphs: [
    `On 15 August 2010 — Independence Day — Nithin and his brother Nikhil registered Zerodha. The name was a deliberate declaration: Zero + Rodha, the Sanskrit word for barrier. Remove the barriers. All of them. The brothers put in ₹10–15 lakh of their own savings. No venture capital, no angel investors, no pitch deck.`,
    `That idea: charge a flat ₹20 per executed order. Not a percentage. Not a tiered structure. Twenty rupees — the same whether you traded ₹10,000 or ₹10 crore. At a time when every major Indian broker was charging 0.3% to 0.5% of trade value, this was heresy.`,
    `The first two years were, in Nithin's own words, "painfully slow." Zerodha had no marketing budget, no celebrity face, no newspaper ads. Nithin and Nikhil personally called every new sign-up to walk them through the platform.`,
    `The story changed in 2015, when Zerodha launched Kite. In an industry still shipping bloated desktop software built in the early 2000s, Kite was a shock — clean, fast, mobile-first, and genuinely beautiful to use.`,
    `By 2020, Zerodha had crossed 10 lakh active clients. By 2022, that number had reached 60 lakh — making Zerodha the single largest broker on the National Stock Exchange.`,
  ]},
  { sectionKey: 'Challenges', jsonData: { htmlContent: ch([
    { title: 'The Trust Problem: Building a Brand from Zero', body: `When Zerodha launched in 2010, the brokers Indians trusted were ICICI Direct, HDFC Securities, Kotak Securities — names backed by the country's largest banks. Zerodha was an unknown startup asking people to hand over their life savings. "We had no brand, so we had to build trust one conversation at a time." For three years, every new customer received a personal call.` },
    { title: `Scaling Without Someone Else's Money`, body: `In 2010, no VC was interested in funding a discount stockbroker. By 2015, when Zerodha was clearly working, VCs began calling. Nithin said no. "Not raising money means every rupee you spend has to earn its keep. You can't paper over bad decisions with someone else's capital."` },
    { title: 'When the Platform Goes Down at the Worst Possible Moment', body: `In 2020 and 2021, during episodes of extreme market volatility, Zerodha's systems experienced outages. What made the difference was how Nithin responded: not with a PR statement, but with a detailed public post — every time — explaining exactly what had failed, why, what the fix was.` },
    { title: 'The Stroke — And What It Forced Him to Say Out Loud', body: `In early 2023, at forty-three years old, Nithin Kamath suffered a mild stroke. He chose to disclose it publicly. "No amount of success is worth destroying your health for. I was not taking care of myself, and my body gave me a warning I had to listen to."` },
  ]) }},
  { sectionKey: 'Success', bodyParagraphs: [
    `The numbers are extraordinary on their own terms. FY24: ₹8,320 crore in revenue, ₹4,700 crore in net profit, 73 lakh active clients. In an Indian startup ecosystem where many of the most celebrated companies have never turned a profit, Zerodha has been profitable every single year since it was founded.`,
    `But the numbers miss the more important story. What Nithin Kamath actually built was not just a profitable brokerage — it was proof that an entire industry could be restructured in favour of the customer and still generate extraordinary returns.`,
    `Beyond Zerodha, Nithin has channelled his capital into Rainmatter Capital — backing over 100 startups across fintech, climate technology, and health.`,
  ], jsonData: { htmlContent: st([
    { label: 'Active Clients', value: '73 Lakh+' },
    { label: 'FY24 Revenue', value: '₹8,320 Cr' },
    { label: 'FY24 Net Profit', value: '₹4,700 Cr' },
    { label: 'VC Raised', value: '₹0' },
    { label: 'Rainmatter Portfolio', value: '100+ Startups' },
    { label: 'Varsity Learners', value: '15 Million+' },
  ]) }},
  { sectionKey: 'Leadership Style', pullQuote: `"Transparency is not a PR strategy for us. It is a survival mechanism. In a trust-based business, the moment you start hiding things, you start dying — slowly, invisibly, but certainly."`, jsonData: { htmlContent: tr2([
    { trait: 'Radical Transparency', desc: `When Zerodha receives a SEBI order, Nithin posts about it publicly — before the media does. When the platform fails during peak trading, he writes a detailed post-mortem before the trading day ends. In India's financial services industry, historically defined by opacity, this approach has earned Zerodha a loyalty that no advertising campaign could purchase.` },
    { trait: 'Bootstrapped Discipline', desc: `Fourteen years in, Zerodha has never taken a rupee of outside capital. "When you are spending someone else's money, every mistake is expensive but survivable. When you are spending your own, every mistake is personal." That relationship with capital explains why Zerodha has been profitable every year of its existence.` },
    { trait: 'Education as Core Strategy', desc: `Varsity, Zerodha's free financial education platform, was built at a time when Zerodha was still small. Nithin's reasoning was contrarian: an investor who understands what they are doing makes better decisions, stays in the market longer, and trusts the platform more when things go wrong.` },
    { trait: 'Long-term Over Short-term', desc: `Zerodha has consciously passed on revenue opportunities that would have damaged customer outcomes. "Our business grows when our customers grow. If they lose money and leave, so do we. That alignment of interests is not a slogan — it is what makes every difficult decision simple."` },
  ]) }},
  { sectionKey: 'Awards', jsonData: [
    { year: '2024', title: 'Forbes Asia — 50 Over 50 (Business & Finance)', organization: 'Forbes Asia' },
    { year: '2023', title: 'Forbes India Rich List — Self-made billionaire, FinTech', organization: 'Forbes India' },
    { year: '2022', title: 'Economic Times ET Awards — Entrepreneur of the Year', organization: 'The Economic Times' },
    { year: '2021', title: 'Business Today Most Powerful CEO in Indian FinTech', organization: 'Business Today' },
    { year: '2020', title: 'CNBC-TV18 India Business Leader Award — Disruptor of the Decade', organization: 'CNBC-TV18' },
    { year: '2019', title: 'Hurun India — Zerodha ranked #1 Bootstrapped Unicorn', organization: 'Hurun Research Institute' },
  ]},
  { sectionKey: 'Interviews', jsonData: [
    { publication: 'The Ken', year: 'January 2024', title: `Zerodha is now fourteen years old and still hasn't raised money. Is that still a conscious choice, or just inertia?`, url: '' },
    { publication: 'Moneycontrol', year: 'September 2023', title: `You disclosed your stroke publicly. Why did you feel the need to share something so personal?`, url: '' },
    { publication: 'YourStory', year: 'March 2022', title: `Zerodha has been criticised for system outages during peak volatility. How do you respond to that?`, url: '' },
  ]},
];

const rkSectionsEn = [
  { sectionKey: 'Early Life', pullQuote: `"We had no electricity at home till I was 12. My mother cooked by lamplight. That darkness taught me to be obsessed with light — with progress."`, bodyParagraphs: [
    `Rajesh Kumar Vedas was born in 1980 in Bachhrawan, a small village in Rae Bareli district of Uttar Pradesh. The youngest of five children born to a farmer father and schoolteacher mother, Rajesh grew up in conditions that most urban Indians cannot imagine — erratic power, no piped water, and a single-room home shared by seven people.`,
    `His father, Ramlal Vedas, cultivated two acres of wheat and mustard. The family income rarely crossed ₹3,000 a month. Yet his mother, Savitri Devi, ran the village's only primary school from their courtyard and insisted all her children complete their education, no matter what.`,
    `It was watching his father sell wheat at distress prices to local middlemen — often for less than the cost of production — that planted the first seed of what would become Vedas Agro.`,
  ]},
  { sectionKey: 'Education', bodyParagraphs: [
    `Rajesh's academic journey was funded almost entirely by scholarships and part-time work. At IRMA, he was exposed for the first time to the formal economics of agricultural value chains. His thesis — "Disintermediation in UP's Wheat Procurement: A Field Study" — was cited by NABARD in a 2007 policy paper.`,
    `Professor Arvind Patel, his thesis supervisor at IRMA, recalls: "Rajesh was not the most brilliant student in the room, but he was the most driven. Every problem he studied had a personal dimension for him. That made his work extraordinarily grounded."`,
  ], jsonData: { htmlContent: tl([
    { year: '1994', event: 'Matriculation from Government Inter College, Rae Bareli — District topper' },
    { year: '1996', event: 'Intermediate (Science) from Allahabad Board — Scored 89%' },
    { year: '2000', event: 'B.Sc. Agriculture, Sam Higginbottom University, Allahabad — First Class' },
    { year: '2003', event: 'MBA (Rural Management), IRMA Anand, Gujarat — Gold Medal' },
    { year: '2018', event: 'Executive Programme in Business Strategy, IIM Ahmedabad' },
  ]) }},
  { sectionKey: 'Career', bodyParagraphs: [
    `Rajesh's early career was deliberately chosen to build domain depth, not income. At NABARD, he spent three years travelling UP's rural hinterland, documenting farmer distress and credit gaps. At ITC's eChoupal division, he helped onboard over 600 villages onto the digital procurement platform.`,
    `At DCM Shriram, he managed a ₹300 Crore agri-input distribution business across five states. It was here that he spotted the structural gap: India processed less than 8% of its agricultural output, losing billions in value that went overseas.`,
  ], jsonData: { htmlContent: tl([
    { year: '2003–2006', event: 'Field Officer — NABARD, Lucknow Regional Office' },
    { year: '2006–2009', event: 'Agri-Business Manager — ITC Limited, Agri Division, Kanpur' },
    { year: '2009–2011', event: 'Regional Head (North India) — DCM Shriram Industries' },
  ]) }},
  { sectionKey: 'Entrepreneurial Journey', pullQuote: `"Every investor I met told me the rural market was too risky. I told them: I'm not betting on the market. I'm betting on the farmer. There's a difference."`, bodyParagraphs: [
    `In 2011, with ₹18 lakh in personal savings and a ₹40 lakh loan from the UP State Industrial Development Corporation, Rajesh resigned from DCM Shriram and launched Vedas Agro Industries from a rented shed in Unnao.`,
    `The founding thesis was simple but radical: buy directly from farmers at a 15% premium over mandi price, process locally, and sell packaged commodities — atta, mustard oil, rice — directly to modern trade retailers in cities. Cut out four layers of middlemen.`,
    `The first 18 months were brutal. Banks refused working capital loans. Three of his first five retail accounts cancelled orders citing "supply inconsistency." A hailstorm wiped out 40% of his contracted wheat crop in April 2012.`,
    `The turning point came in late 2012 when Big Bazaar's category buyer tasted the Vedas Gold atta and placed a 5,000 kg trial order. That order became 50,000 kg within six months.`,
  ]},
  { sectionKey: 'Challenges', jsonData: { htmlContent: ch([
    { title: 'The 2014 Working Capital Crisis', body: `A delayed monsoon and a banking sector cautious of agri-lending meant Vedas Agro nearly ran out of cash to procure wheat during peak season. Rajesh personally called 28 banks over 3 weeks. All said no. He finally secured a ₹2 Crore emergency line from a cooperative bank in Rae Bareli by pledging his family home.` },
    { title: 'Competing with FMCG Giants', body: `When Vedas Agro crossed ₹50 Crore in revenue in 2016, it attracted the counter-marketing budgets of two national FMCG brands. They slashed retail margins on competing SKUs and pressured distributors to deprioritize Vedas. Rajesh responded by building a direct-to-retailer network, cutting distributors entirely in 12 cities.` },
    { title: 'COVID and the Supply Chain Collapse', body: `In March 2020, Vedas Agro had 1,100 MT of grain in transit when the national lockdown was announced. Rajesh spent 72 hours on calls with state government officials and logistics partners. The company not only survived but grew 34% in FY2021 as branded packaged foods surged.` },
  ]) }},
  { sectionKey: 'Success', bodyParagraphs: [
    `Today, Vedas Agro is one of India's fastest-growing agri-processing companies, with six processing plants across UP, Bihar, and Punjab. The company's flagship Vedas Gold Atta commands a 12% market share in modern trade in UP.`,
    `In 2022, the company raised ₹85 Crore in Series B funding from Omnivore Partners, valuing it at ₹650 Crore. Forbes India profiled Rajesh in its 2023 "Agri-Champions" list.`,
    `More personally meaningful to Rajesh: 18,000 farmers in his network now receive payments within 48 hours of procurement — a service no mandi has ever offered.`,
  ], jsonData: { htmlContent: st([
    { label: 'Annual Revenue (FY24)', value: '₹210 Crore' },
    { label: 'Farmer Partners', value: '18,000+' },
    { label: 'States Present', value: '14' },
    { label: 'Retail Touchpoints', value: '85,000+' },
    { label: 'SKUs', value: '62' },
    { label: 'Employee Strength', value: '1,400+' },
  ]) }},
  { sectionKey: 'Leadership Style', pullQuote: `"I never hire someone I wouldn't be comfortable learning from. Every person in my company knows something I don't. That's not a weakness — that's design."`, jsonData: { htmlContent: tr2([
    { trait: 'Field-First', desc: `Rajesh visits at least one procurement zone personally every month. He believes leadership disconnected from the field becomes fiction.` },
    { trait: 'Radical Transparency', desc: `Monthly all-hands meetings where P&L data — including losses — is shared with every employee, down to factory workers.` },
    { trait: 'Patient Capital Mindset', desc: `Vedas Agro has never done a down round and has never taken on debt it could not service within 18 months. Rajesh calls this "the discipline of founders who can't afford a mistake."` },
    { trait: 'Farmer-Centric Design', desc: `Every product decision is run through a single filter: does this help us pay farmers more? If yes, it gets prioritized.` },
  ]) }},
  { sectionKey: 'Awards', jsonData: [
    { year: '2023', title: 'Forbes India Agri-Champions List', organization: 'Forbes India' },
    { year: '2023', title: 'Top 50 Agri-Startups', organization: 'DPIIT, Government of India' },
    { year: '2022', title: 'Ernst & Young Entrepreneur of the Year — Agri & Food Processing', organization: 'EY India' },
    { year: '2021', title: 'Best Rural Enterprise of the Year', organization: 'CII National Awards' },
    { year: '2019', title: 'NABARD Agri-Business Leadership Award', organization: 'NABARD' },
    { year: '2017', title: 'Udyog Ratna, Uttar Pradesh Government', organization: 'Government of UP' },
  ]},
  { sectionKey: 'Interviews', jsonData: [
    { publication: 'The Economic Times', year: 'March 2024', title: `What is the one mistake early-stage agri-founders make most often?`, url: '' },
    { publication: 'Forbes India', year: 'November 2023', title: `You turned down an acquisition offer from a large FMCG conglomerate. Why?`, url: '' },
    { publication: 'IIM Ahmedabad Business Review', year: 'June 2022', title: `How do you think about competition from large FMCG brands?`, url: '' },
  ]},
];

const rkSectionsHi = [
  { sectionKey: 'प्रारंभिक जीवन', pullQuote: '"हमारे घर में 12 साल की उम्र तक बिजली नहीं थी। माँ दीपक की रोशनी में खाना बनाती थीं। उस अंधेरे ने मुझे रोशनी — यानी तरक्की — का दीवाना बना दिया।"', bodyParagraphs: [
    'राजेश कुमार वेदास का जन्म 1980 में उत्तर प्रदेश के रायबरेली जिले के बछरावाँ गाँव में हुआ। पाँच बच्चों में सबसे छोटे राजेश के पिता किसान थे और माँ गाँव की एकमात्र प्राथमिक पाठशाला चलाती थीं।',
    'पिता रामलाल वेदास दो एकड़ में गेहूँ और सरसों उगाते थे। परिवार की मासिक आमदनी मुश्किल से ₹3,000 पार करती थी। बिजली नहीं थी, पाइप से पानी नहीं था, सात लोग एक कमरे में रहते थे।',
    'लेकिन माँ सावित्री देवी ने एक बात तय कर रखी थी — चाहे कुछ भी हो, बच्चे पढ़ेंगे। यही ज़िद राजेश की ज़िंदगी बदलने वाली थी।',
    'बचपन में राजेश ने अपने पिता को मंडी के बिचौलियों के हाथों लागत से भी कम दाम पर गेहूँ बेचते देखा। वही दृश्य वेदास एग्रो की नींव बना।',
  ]},
  { sectionKey: 'शिक्षा', bodyParagraphs: [
    'राजेश की पढ़ाई पूरी तरह छात्रवृत्ति और अंशकालिक काम से चली। रायबरेली के सरकारी इंटर कॉलेज से जिला टॉपर रहे, फिर सैम हिग्गिनबॉटम विश्वविद्यालय से कृषि में स्नातक किया।',
    'IRMA, आनंद (गुजरात) से MBA (ग्रामीण प्रबंधन) में स्वर्ण पदक हासिल किया। उनकी थीसिस — "उत्तर प्रदेश की गेहूँ खरीद में बिचौलियों की भूमिका" — NABARD ने 2007 की नीति रिपोर्ट में उद्धृत की।',
    'थीसिस सुपरवाइज़र प्रोफेसर अरविंद पटेल कहते हैं: "राजेश सबसे होनहार छात्र नहीं थे, लेकिन सबसे जिद्दी ज़रूर थे। उनकी हर समस्या का एक निजी आयाम था — इसलिए उनका काम असाधारण रूप से ज़मीनी था।"',
  ]},
  { sectionKey: 'करियर', bodyParagraphs: [
    'IRMA के बाद राजेश ने जानबूझकर ऐसा करियर चुना जो तनख्वाह नहीं, गहरी समझ देता हो। NABARD में तीन साल UP के ग्रामीण इलाकों में घूमते हुए किसानों की तकलीफें दर्ज कीं।',
    'ITC के ई-चौपाल प्रभाग में 600 से ज़्यादा गाँवों को डिजिटल खरीद प्लेटफॉर्म से जोड़ा। DCM श्रीराम में पाँच राज्यों में ₹300 करोड़ के कृषि-इनपुट वितरण का काम संभाला।',
    'यहीं उन्हें वह खाई दिखी जो वेदास एग्रो भरने वाली थी: भारत अपनी कृषि उपज का मात्र 8% ही प्रसंस्कृत करता था — बाकी कच्चा निर्यात होता था, मूल्य बाहर जाता था।',
  ]},
  { sectionKey: 'उद्यमशीलता की यात्रा', pullQuote: '"हर निवेशक ने कहा ग्रामीण बाज़ार बहुत जोखिम भरा है। मैंने कहा — मैं बाज़ार पर दाँव नहीं लगा रहा, किसान पर लगा रहा हूँ। फर्क समझिए।"', bodyParagraphs: [
    '2011 में ₹18 लाख की बचत और UP राज्य औद्योगिक विकास निगम से ₹40 लाख के कर्ज़ के साथ राजेश ने DCM श्रीराम से इस्तीफा दिया और उन्नाव के एक किराये के शेड से वेदास एग्रो इंडस्ट्रीज़ की शुरुआत की।',
    'मॉडल सरल लेकिन क्रांतिकारी था: मंडी भाव से 15% ज़्यादा पर किसानों से सीधे खरीद, स्थानीय प्रसंस्करण, फिर ब्रांडेड आटा-सरसों तेल-चावल शहरी आधुनिक रिटेल तक। बिचौलियों की चार परतें काट दो।',
    'पहले 18 महीने बेहद कठिन रहे। बैंकों ने कार्यशील पूँजी देने से मना किया। पाँच में से तीन पहले रिटेल खाते "आपूर्ति में अनियमितता" बताकर रद्द हो गए। अप्रैल 2012 की ओलावृष्टि में अनुबंधित गेहूँ की 40% फसल तबाह हो गई।',
    'मोड़ आया 2012 के आखिर में — जब बिग बाज़ार के कैटेगरी खरीदार ने वेदास गोल्ड आटा चखा और 5,000 किग्रा का ट्रायल ऑर्डर दिया। छह महीने में यह 50,000 किग्रा हो गया।',
  ]},
  { sectionKey: 'चुनौतियाँ', bodyParagraphs: [
    '2014 का कार्यशील पूँजी संकट: देरी से मानसून और बैंकों की सतर्कता के कारण वेदास एग्रो चरम सीज़न में गेहूँ खरीदने लायक नकदी से लगभग खाली हो गई। राजेश ने तीन हफ्तों में 28 बैंकों को फोन किया — सबने मना किया। आखिरकार परिवार का घर गिरवी रखकर रायबरेली के एक सहकारी बैंक से ₹2 करोड़ की आपातकालीन सीमा मिली।',
    'FMCG दिग्गजों से मुकाबला: 2016 में ₹50 करोड़ का राजस्व पार करते ही दो राष्ट्रीय FMCG ब्रांड सक्रिय हो गए। उन्होंने प्रतिस्पर्धी SKU पर रिटेल मार्जिन घटाया और वितरकों पर दबाव बनाया। राजेश ने जवाब दिया — 12 शहरों में वितरकों को पूरी तरह काटकर सीधे रिटेलर नेटवर्क बनाया।',
    'COVID और आपूर्ति श्रृंखला का ढहना: मार्च 2020 में 1,100 मीट्रिक टन अनाज रास्ते में था जब राष्ट्रव्यापी लॉकडाउन लगा। राजेश ने 72 घंटे राज्य सरकार के अधिकारियों और लॉजिस्टिक्स पार्टनरों से फोन पर बात की। कंपनी न सिर्फ बची — FY2021 में 34% बढ़ी।',
  ]},
  { sectionKey: 'सफलता', bodyParagraphs: [
    'आज वेदास एग्रो UP, बिहार और पंजाब में छह प्रसंस्करण संयंत्रों के साथ भारत की सबसे तेज़ी से बढ़ती कृषि-प्रसंस्करण कंपनियों में से एक है। वेदास गोल्ड आटा UP के मॉडर्न ट्रेड में 12% बाज़ार हिस्सेदारी रखता है।',
    '2022 में ऑम्निवोर पार्टनर्स से ₹85 करोड़ की Series B फंडिंग हुई — कंपनी की वैल्यूएशन ₹650 करोड़। Forbes India ने 2023 की "एग्री-चैंपियंस" सूची में राजेश को जगह दी।',
    'राजेश के लिए सबसे बड़ी उपलब्धि: उनके नेटवर्क के 18,000 किसानों को अब उपज खरीद के 48 घंटे के भीतर भुगतान मिलता है — यह सेवा किसी मंडी ने आज तक नहीं दी।',
  ]},
  { sectionKey: 'नेतृत्व शैली', pullQuote: '"मैं कभी ऐसे किसी को नहीं रखता जिससे मैं खुद कुछ न सीख सकूँ। मेरी कंपनी का हर इंसान कुछ ऐसा जानता है जो मैं नहीं जानता — यह कमज़ोरी नहीं, यह डिज़ाइन है।"', bodyParagraphs: [
    'राजेश हर महीने कम से कम एक खरीद क्षेत्र खुद जाकर देखते हैं। उनका मानना है — ज़मीन से कटा नेतृत्व एक दिन झूठा साबित होता है।',
    'मासिक ऑल-हैंड्स मीटिंग में P&L डेटा — नुकसान सहित — फैक्ट्री कर्मचारियों तक हर किसी के साथ साझा होता है। इसे वे "ज़िम्मेदारी की खेती" कहते हैं।',
    'वेदास एग्रो ने कभी डाउन राउंड नहीं किया और कभी ऐसा कर्ज़ नहीं लिया जो 18 महीने में नहीं चुक सके। राजेश इसे "उन संस्थापकों का अनुशासन" कहते हैं जो गलती का खर्च नहीं उठा सकते।',
  ]},
  { sectionKey: 'पुरस्कार', bodyParagraphs: [
    '• Forbes India एग्री-चैंपियंस सूची — 2023\n• DPIIT, भारत सरकार — शीर्ष 50 एग्री-स्टार्टअप — 2023\n• EY इंडिया — एंटरप्रेन्योर ऑफ द ईयर (एग्री एवं खाद्य प्रसंस्करण) — 2022\n• CII राष्ट्रीय पुरस्कार — सर्वश्रेष्ठ ग्रामीण उद्यम — 2021\n• NABARD कृषि-व्यवसाय नेतृत्व पुरस्कार — 2019\n• उद्योग रत्न, उत्तर प्रदेश सरकार — 2017',
  ]},
  { sectionKey: 'साक्षात्कार', bodyParagraphs: [
    'The Economic Times (मार्च 2024): शुरुआती कृषि-संस्थापक सबसे ज़्यादा कौन सी गलती करते हैं? राजेश: "वे मंडी के खिलाफ लड़ने की कोशिश करते हैं। हमने मंडी को बाईपास किया — इसे खत्म नहीं किया। सिस्टम से लड़ने में ऊर्जा बर्बाद मत करो, सिस्टम के आसपास बनाओ।"',
    'Forbes India (नवंबर 2023): एक बड़े FMCG समूह का अधिग्रहण प्रस्ताव ठुकरा दिया। क्यों? राजेश: "उन्होंने एक ब्रांड खरीदना चाहा। मैंने एक मिशन बनाया है। ये दोनों एक साथ नहीं रह सकते।"',
    'IIM अहमदाबाद बिज़नेस रिव्यू (जून 2022): बड़े FMCG ब्रांडों से प्रतिस्पर्धा कैसे देखते हैं? राजेश: "उनके पास मार्केटिंग बजट है। हमारे पास किसान हैं जो 48 घंटे में भुगतान पाते हैं। देखते हैं कौन जीतता है।"',
  ]},
];

const SOCIAL_HEROES = [
  {
    slug: 'anshu-gupta', name: 'Anshu Gupta', designation: 'Founder, Goonj — The Clothing Man of India',
    profileType: 'social-hero', profileTag: 'The Clothing Man of India', category: 'NGO Founders',
    location: 'New Delhi', founded: '1999', photoUrl: '/anshu-gupta.webp', coverPhotoUrl: '/anshu-gupta.webp',
    oneLiner: `"Not trash, this is someone's dignity — the urban surplus, rural India's self-respect."`,
    executiveSummary: '5 Million+ Lives · 4,000 Tons/Year',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `It was the 1990s. In the bone-chilling winter of Delhi, while people huddled inside their homes under warm quilts, a young journalist named Anshu Gupta met a man named Habib. Habib's job was to pick up unclaimed dead bodies. During their conversation, Habib said something that shook the very foundation of Anshu's thought process: "I face no issues during summers when I collect bodies, but in winter, I have to pick up two to three bodies every day. People don't die of cold — people die of the lack of clothing in the cold."`,
        `This single encounter forced Anshu Gupta to reflect on a devastating irony: while urban wardrobes overflowed with unused clothes and discarded fabrics treated as trash, a vast part of the nation was losing lives merely for the lack of a piece of cloth.`,
        `Driven by this vision, in 1999, they left their corporate jobs, gathered just 67 clothes from their own home in Delhi, and laid the foundation of their organisation — naming it Goonj, meaning 'echo.' What began in a single room in Delhi grew into one of India's most radical and innovative humanitarian organisations, operating across 25+ states, processing over 4,000 tonnes of urban material every year.`,
        `Anshu strongly believed that handing out free items to the underprivileged trivialises their plight and hurts their self-respect. So he crafted an innovative model: Cloth for Work. Villagers collectively identify problems in their community — repairing roads, cleaning wells, building bamboo bridges. Once the community completes the work together, Goonj honours them with a Family Kit. This instils a sense of pride: they earned these goods through hard work, not as charity.`,
        `Menstrual hygiene and the lack of cloth were severe, unaddressed problems for women in rural India. To tackle this, Goonj launched the 'Not Just a Piece of Cloth' campaign — recycling cotton fabrics into clean, reusable cotton pads called MY Pad.`,
        `What started with 67 clothes in a Delhi home gradually expanded into collection centres across Mumbai, Kolkata, Bengaluru, Hyderabad, and Chennai. Anshu Gupta was honoured with Asia's highest award — the Ramon Magsaysay Award in 2015.`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Lives Touched Annually', value: '5 Million+' }, { label: 'Material Processed/Year', value: '4,000 Tons' }, { label: 'States Covered', value: '25+' }, { label: 'Founded With', value: 'Just 67 Clothes' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Ramon Magsaysay Award 2015 — Manila, Philippines', 'Ashoka Fellow', 'CNN-IBN Indian of the Year — Social', 'NDTV Social Entrepreneur of the Year', 'Padma Shri Nominee'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`Cloth is not charity — it is a basic human need. Every discarded shirt in an urban home is a resource waiting to restore someone's dignity in a village. When we treat urban surplus as rural necessity, and when we exchange it for community effort rather than giving it free, we stop being donors and start being partners.`] },
    ],
    sectionsHi: [
      { sectionKey: 'story', bodyParagraphs: [
        `1990 के दशक की बात है। दिल्ली की कड़कड़ाती ठंड में जब लोग अपने घरों में रज़ाइयों में दुबके थे, तब एक युवा पत्रकार अंशू गुप्ता की मुलाकात हबीब नाम के एक व्यक्ति से हुई। हबीब का काम लावारिस शवों को उठाना था। बातचीत के दौरान हबीब ने एक ऐसी बात कही: "गर्मियों में जब शव मिलता है तो मुझे कोई दिक्कत नहीं होती, लेकिन सर्दियों में मुझे रोज़ दो से तीन शव उठाने पड़ते हैं। लोग ठंड से नहीं मरते... लोग ठंड में कपड़ों के अभाव से मरते हैं।"`,
        `इस एक घटना ने अंशू गुप्ता को यह सोचने पर मजबूर कर दिया कि जहाँ शहरों में अलमारियाँ पुराने कपड़ों से भरी पड़ी हैं, वहीं देश का एक बड़ा हिस्सा सिर्फ एक कपड़े के टुकड़े के अभाव में अपनी जान गंवा देता है।`,
        `इसी सोच के साथ 1999 में अपनी कॉर्पोरेट नौकरी छोड़कर, उन्होंने दिल्ली में अपने ही घर से मात्र 67 कपड़ों के साथ अपनी संस्था का नाम 'गूंज' रखा।`,
        `अंशू जी का स्पष्ट मानना था कि किसी भी गरीब इंसान को मुफ्त में सामान देना उसकी लाचारी का मज़ाक उड़ाना है। इसलिए उन्होंने 'Cloth for Work' (काम के बदले कपड़ा) का अनोखा मॉडल तैयार किया।`,
        `ग्रामीण भारत में महिलाओं के लिए मासिक धर्म के समय स्वच्छता की कमी एक भयंकर समस्या थी। इसके लिए उन्होंने 'Not Just a Piece of Cloth' अभियान शुरू किया।`,
        `2015 में मनीला, फिलीपींस में अंशू गुप्ता को एशिया के सर्वोच्च सम्मान — रमन मैग्सेसे पुरस्कार — से सम्मानित किया गया।`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'वार्षिक लाभान्वित', value: '5 करोड़+' }, { label: 'वार्षिक सामग्री', value: '4,000 टन' }, { label: 'राज्य', value: '25+' }, { label: 'शुरुआत हुई', value: 'मात्र 67 कपड़ों से' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['रमन मैग्सेसे पुरस्कार 2015 — मनीला, फिलीपींस', 'अशोका फेलो', 'CNN-IBN इंडियन ऑफ द ईयर — सोशल', 'NDTV सोशल आंत्रप्रेन्योर ऑफ द ईयर', 'पद्म श्री नामांकित'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`कपड़ा दान नहीं — यह एक बुनियादी ज़रूरत है। जब हम शहरी अतिरिक्त को ग्रामीण ज़रूरत मानते हैं, और इसे मुफ्त देने की बजाय सामुदायिक श्रम के बदले देते हैं — तो हम दाता नहीं, बल्कि साझेदार बन जाते हैं।`] },
    ],
  },
  {
    slug: 'sonam-wangchuk', name: 'Sonam Wangchuk', designation: 'Engineer, Educator & Innovator',
    profileType: 'social-hero', profileTag: 'Ice Stupa Inventor', category: 'Changemakers',
    location: 'Leh, Ladakh', founded: '1988',
    photoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    oneLiner: `"Nature does not waste. Ice melts in summer — exactly when crops need water. We just had to learn to store winter's gift for summer's need."`,
    executiveSummary: 'Glaciers & 1,000 Villages',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `Sonam Wangchuk is many things: the engineer who invented the Ice Stupa (artificial glaciers that store winter water for spring irrigation), the educator who reformed Ladakh's failing school system, and the activist whose 21-day fast in 2024 put Ladakh's rights on national television.`,
        `His most famous innovation — the Ice Stupa — is a cone-shaped artificial glacier built in winter. By draining river water through pipes and letting it freeze in cone shapes, villages in Ladakh's high-altitude desert can store millions of litres of water that melts precisely when spring crops need irrigation.`,
        `Before the Ice Stupa, Wangchuk reformed Ladakh's education system. He founded SECMOL (Students' Educational and Cultural Movement of Ladakh) — a school that runs entirely on solar energy and teaches students in their mother tongue. Rajkumar Hirani's character Phunsukh Wangdu in 3 Idiots was inspired by him.`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Ice Stupas Built', value: '100+' }, { label: 'Villages Benefited', value: '1,000+' }, { label: 'Students Transformed', value: '35,000+' }, { label: 'Water Stored (per stupa)', value: '10 Mn Litres' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Ramon Magsaysay Award 2018', 'TIME100 Most Influential 2024', 'Rolex Award for Enterprise', 'Global Thinker — Foreign Policy'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`Education is not about passing exams. It is about solving the real problems around you. Every village has problems. Every problem has a solution. Education is the bridge.`] },
    ],
    sectionsHi: null,
  },
  {
    slug: 'bindeshwar-pathak', name: 'Dr. Bindeshwar Pathak', designation: 'Founder, Sulabh International',
    profileType: 'social-hero', profileTag: 'The Man Who Dignified Sanitation', category: 'Changemakers',
    location: 'Patna / New Delhi', founded: '1970',
    photoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
    oneLiner: `"Untouchability cannot be ended by law alone. It ends when the Dalit who cleans your toilet is given a toilet of his own."`,
    executiveSummary: '600 Million Toilets, 10 Million Lives',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `Dr. Bindeshwar Pathak founded Sulabh International in 1970 with one mission: eliminate manual scavenging in India and provide affordable sanitation to the poor. At the time, millions of Indians — mostly Dalit women — were forced to manually clean dry latrines, carrying human waste on their heads. It was India's most dehumanising practice.`,
        `Sulabh's first innovation was the two-pit ecological toilet — a low-cost, waterless latrine that composted waste safely without requiring manual cleaning. At ₹600–₹1,200, it was affordable for the rural poor. Sulabh eventually built and maintained 1.5 million household toilets and 8,500 public toilet complexes across India.`,
        `Dr. Pathak also worked to rehabilitate and reintegrate liberated scavengers — giving them vocational training, education for their children, and social respect. He passed away in 2023, but Sulabh continues under his legacy, serving 20 million people daily.`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Household Toilets Built', value: '1.5 Million' }, { label: 'Public Complexes', value: '8,500+' }, { label: 'Daily Users', value: '20 Million' }, { label: 'Scavengers Liberated', value: '60,000+' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Padma Bhushan 1991', 'WHO Global 500 Award', 'International Gandhi Peace Prize', 'Energy Globe Award'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`Sanitation is a human right. It is the foundation of dignity. A nation that does not provide toilets cannot claim to be civilised — no matter how many satellites it launches.`] },
    ],
    sectionsHi: null,
  },
  {
    slug: 'ela-bhatt', name: 'Ela Bhatt', designation: 'Labour Rights Activist & Founder of SEWA',
    profileType: 'social-hero', profileTag: 'The Quiet Revolutionary', category: 'Women Empowerment',
    location: 'Ahmedabad, Gujarat', founded: '1972',
    photoUrl: '/ela-bhatt.webp', coverPhotoUrl: '/ela-bhatt.webp',
    oneLiner: `"If the work is theirs and the labor is theirs, then the right to be recognized as workers belongs to them too."`,
    executiveSummary: '2.5 Million Women, 18+ States',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `The scorching streets of Ahmedabad, during the sixties and seventies. Shantaben, a street vendor, spent her days carrying a heavy basket of vegetables under the blazing sun. By evening, when she earned a modest sum to feed her family, a local moneylender would snatch away more than half of it in the name of interest. She had no bank account, no identification card, and no legal rights.`,
        `This was not just Shantaben's reality. It was the daily struggle of millions of women working in the informal sector — garment stitchers, bidi rollers, and waste pickers. The nation did not even recognize them as "workers" simply because they lacked formal appointment letters. However, one woman observed their daily hardships closely — Ela Bhatt.`,
        `A lawyer by training and a devout follower of Gandhian principles, Ela Bhatt could have easily chosen a comfortable life. But witnessing the vulnerability of these hardworking women, she vowed to become their voice. Ela Bhatt responded with calm yet unshakeable conviction: "If the work is theirs and the labor is theirs, then the right to be recognized as workers belongs to them too."`,
        `In the early seventies, Ela Bhatt founded SEWA (Self-Employed Women's Association). When these impoverished women attempted to open accounts at traditional financial institutions, the banks turned them away. This obstacle inspired Ela Bhatt to establish the SEWA Cooperative Bank. For the first time in history, illiterate women who used thumbprints instead of signatures became owners of their own savings.`,
        `Ela Bhatt's innovative model captured international attention. Nelson Mandela invited her to become a founding member of The Elders, an elite group of global leaders working together for peace and human rights.`,
        `In November 2022, at the age of eighty-nine, Ela Bhatt passed away. Today, SEWA unites over two and a half million self-employed women across more than eighteen Indian states.`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Women Members', value: '2.5 Million+' }, { label: 'States Covered', value: '18+' }, { label: 'Countries Reached', value: '5+ (South Asia)' }, { label: 'SEWA Bank Founded', value: '1974' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Ramon Magsaysay Award — 1977', 'Padma Bhushan — 1986', 'Right Livelihood Award — 1984', 'Indira Gandhi Peace Prize — 2011', `Founding Member — The Elders (Nelson Mandela's global peace group)`, 'ILO recognition — SEWA as global benchmark for informal sector workers'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`True women's empowerment does not come from speeches. It begins when a woman holds her own hard-earned money and controls her own bank account.`] },
    ],
    sectionsHi: [
      { sectionKey: 'story', bodyParagraphs: [
        `अहमदाबाद की तपती सड़कें, साठ और सत्तर के दशक का दौर। सब्जी बेचने वाली शांताबेन दिनभर कड़कती धूप में टोकरी सिर पर उठाए घूमती थी। शाम को जब वह कुछ पैसे कमाकर घर लौटती, तो स्थानीय साहूकार आधे से ज़्यादा पैसे ब्याज के नाम पर छीन लेता।`,
        `यह कहानी सिर्फ शांताबेन की नहीं थी। कपड़ा सिलने वाली, बीड़ी बनाने वाली और कचरा बीनने वाली लाखों अनौपचारिक महिला श्रमिकों की यही दास्तान थी। लेकिन एक महिला थी जो हर दिन इन महिलाओं के संघर्ष को करीब से देख रही थी — इला भट्ट।`,
        `पेशे से वकील और गांधीवादी विचारों से प्रेरित इला भट्ट ने तय किया कि वे इनकी आवाज़ बनेंगी। इला जी का जवाब साफ़ और निडर था: "अगर काम उनका है, मेहनत उनकी है, तो मज़दूर होने का हक़ भी उनका है।"`,
        `सत्तर के दशक की शुरुआत में इला भट्ट ने SEWA की नींव रखी। जब ये गरीब महिलाएँ सामान्य बैंकों में खाता खुलवाने गईं, तो बैंकों ने मना कर दिया। इस रुकावट ने इला जी को "SEWA सहकारी बैंक" की शुरुआत करने पर मजबूर किया।`,
        `नवंबर 2022 में नवासी वर्ष की आयु में इला भट्ट जी का निधन हो गया। आज भारत के 18 से ज़्यादा राज्यों में 25 लाख से अधिक महिलाएँ SEWA से जुड़ी हैं।`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'महिला सदस्य', value: '25 लाख+' }, { label: 'राज्य कवर', value: '18+' }, { label: 'देश पहुँच', value: '5+ (दक्षिण एशिया)' }, { label: 'SEWA बैंक स्थापना', value: '1974' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['रमन मैगसेसे पुरस्कार — 1977', 'पद्म भूषण — 1986', 'राइट लाइवलीहुड अवॉर्ड — 1984', 'इंदिरा गांधी शांति पुरस्कार — 2011', 'The Elders संस्थापक सदस्य', 'ILO मान्यता — असंगठित क्षेत्र के लिए वैश्विक आदर्श मॉडल'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`महिला सशक्तिकरण भाषणों से नहीं आता। यह तब आता है जब महिला के हाथ में उसका अपना कमाया पैसा और बैंक खाता होता है।`] },
    ],
  },
  {
    slug: 'arunachalam-muruganantham', name: 'Arunachalam Muruganantham', designation: 'Social Entrepreneur & Inventor',
    profileType: 'social-hero', profileTag: 'The Pad Man of India', category: 'Rural Heroes',
    location: 'Coimbatore, Tamil Nadu', founded: '2006',
    photoUrl: '/arunachalam-muruganantham.webp', coverPhotoUrl: '/arunachalam-muruganantham.webp',
    oneLiner: `"I am not Pad Man. I am a school dropout who stumbled upon a billion-dollar problem and refused to give up for 4 years."`,
    executiveSummary: '4,400+ Villages, 1.3 Mn Women',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `This is the story of Arunachalam Muruganantham, a very simple man from Coimbatore, Tamil Nadu. Having lost his father at a young age, he was forced to drop out of school to work as a laborer to support his family.`,
        `The turning point in his life came after his marriage. He noticed his wife hiding a dirty, old rag. Upon asking, he discovered she used it during her periods. When he suggested buying sanitary pads from the store, his wife replied that buying pads would ruin their monthly grocery budget. He went to the market, bought a pad, and was shocked to see how expensive a small piece of cotton was. At that very moment, he resolved to make affordable pads for his wife himself.`,
        `When medical students in his town refused to help due to social inhibition, Muruganantham decided to experiment on himself. He filled a rubber bladder with animal blood and tied it around his waist. Seeing this, the villagers branded him a "madman." His wife left him, his mother abandoned him, and the villagers threatened to outcast him. Yet he refused to abandon his mission.`,
        `After nearly two years of research, he realized that the key was a specialized cellulose fiber. Muruganantham spent nearly four years developing a simple, low-cost machine that could be built for a fraction of the cost, enabling any ordinary woman to produce pads easily.`,
        `Once the machine was ready, instead of patenting the technology to sell it to a large corporation, he decided to hand it over to rural women across India. His life inspired the hit Bollywood film Pad Man, and a documentary based on his journey won an Academy Award.`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Villages Covered', value: '4,400+' }, { label: 'Women Entrepreneurs', value: '1.3 Million' }, { label: 'Countries Reached', value: '106' }, { label: 'Cost Reduction vs MNCs', value: '95%' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Padma Shri 2016 — Government of India', 'TIME 100 Most Influential People — 2014', 'Forbes 48 Heroes of Philanthropy', 'IIT Madras Honorary Doctorate', 'Oscar-Winning Documentary — "Period. End of Sentence."', 'Bollywood Film — Pad Man (2018) based on his life'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`If I had taken the money, it would have helped one person — me. By refusing it and franchising the machine, it helped 1.3 million women earn their independence. The poorest women in the world deserve profit, not pity.`] },
    ],
    sectionsHi: [
      { sectionKey: 'story', bodyParagraphs: [
        `यह कहानी तमिलनाडु के कोयंबटूर में रहने वाले एक बेहद साधारण इंसान अरुणाचलम मुरुगनांथम् की है। बचपन में ही पिता का साया उठ जाने के कारण उन्हें अपनी पढ़ाई छोड़कर बहुत छोटी उम्र में मजदूरी और छोटे-मोटे काम करने पड़े।`,
        `उनकी जिंदगी में असली मोड़ तब आया जब उनकी शादी हुई। जब उन्होंने अपनी पत्नी से दुकान से सेनेटरी पैड खरीदने को कहा, तो पत्नी का जवाब था कि अगर पैड खरीदने लगेंगे तो घर के राशन का बजट बिगड़ जाएगा।`,
        `जब गाँव की मेडिकल छात्राओं ने संकोच के कारण उनकी मदद करने से इनकार कर दिया, तो मुरुगनांथम् ने खुद पर ही प्रयोग करने का फैसला किया। समाज के तानों से तंग आकर उनकी पत्नी उन्हें छोड़कर चली गई। लेकिन उन्होंने अपना मिशन नहीं छोड़ा।`,
        `करीब दो साल के कठिन शोध के बाद उन्हें समझ आया कि असली खेल एक खास तरह के सेलुलोज़ फाइबर का है। मुरुगनांथम् ने लगभग चार साल की कड़ी मेहनत से एक ऐसी आसान और कम लागत वाली मशीन तैयार की।`,
        `जब मशीन बनकर तैयार हो गई, तो उन्होंने इसे ग्रामीण भारत की महिलाओं को सौंपने का फैसला किया। उनकी कहानी पर बॉलीवुड में 'Pad Man' फिल्म बनी और उनकी कहानी पर बनी डॉक्यूमेंट्री ने ऑस्कर पुरस्कार भी जीता।`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'गाँव कवर', value: '4,400+' }, { label: 'महिला उद्यमी', value: '1.3 करोड़' }, { label: 'देश पहुँच', value: '106' }, { label: 'लागत में कमी', value: '95%' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['पद्म श्री 2016 — भारत सरकार', 'TIME 100 सर्वाधिक प्रभावशाली — 2014', 'Forbes 48 दानवीर हीरो', 'IIT मद्रास मानद डॉक्टरेट', 'Oscar विजेता डॉक्यूमेंट्री', 'बॉलीवुड फिल्म — Pad Man (2018)'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`अगर मैंने पैसा ले लिया होता, तो एक इंसान की मदद होती — मेरी। मशीन बाँटकर 1.3 करोड़ महिलाओं को अपनी आज़ादी मिली।`] },
    ],
  },
  {
    slug: 'rajendra-singh', name: 'Rajendra Singh', designation: 'Waterman of India',
    profileType: 'social-hero', profileTag: `When Medicine Was Left Behind and the Hoe Took Its Place`,
    category: 'Rural Heroes', location: 'Alwar, Rajasthan', founded: '1985',
    photoUrl: '/rajendra-singh.webp', coverPhotoUrl: '/rajendra-singh.webp',
    oneLiner: `"Son, give us medicine later. Give us water first. If water comes back, half our illnesses will disappear on their own." — Mangu Lal Meena`,
    executiveSummary: '12,000 Villages, 11 Rivers',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `There was a time when Bhikampura, a small village in Rajasthan's Alwar district, was completely crushed under scorching heat, dust, and severe drought. Wells had run bone-dry, fields lay barren, and driven by relentless thirst, the youth were abandoning their homeland to migrate to cities.`,
        `During this desperate time, a young man who had just finished his studies in Ayurvedic medicine stepped into the village. His name was Rajendra Singh. As he began talking to the locals, an elderly villager named Mangu Lal Meena shared a truth that altered Rajendra's purpose forever: "Son, give us medicine later. Give us water first. If water comes back, half our illnesses will disappear on their own."`,
        `Those words struck a deep chord. Rajendra realized that the true cure for this parched earth was water conservation. Without hesitation, he set aside his stethoscope and medicine bag, picking up a shovel and a hoe. He began learning the forgotten traditional art of building Johads — earthen check dams designed to catch rainwater.`,
        `When the monsoon arrived, a miracle unfolded. Rainwater stopped in its tracks, caught by the Johad. The thirsty soil soaked it in, and soon, dry wells overflowed with life once again. Rivers like Arvari and Ruparel, which had been dead for decades, revived and began flowing naturally once more.`,
        `Fields bloomed again, migration stopped, and the barren terrain of Alwar turned green. Rajendra Singh earned the title: the "Waterman of India."`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Johads Built', value: '11,000+' }, { label: 'Rivers Revived', value: '11' }, { label: 'Villages Benefited', value: '12,000' }, { label: 'Water Table Rise', value: '6 Metres' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Stockholm Water Prize 2015 — "Nobel of Water"', 'Ramon Magsaysay Award 2001', 'Padma Bhushan 2013', 'Earth Care Award'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`Water is not a resource to be managed by engineers. It is a relationship to be maintained by communities. Give people control over their water, and they will restore their rivers.`] },
    ],
    sectionsHi: [
      { sectionKey: 'story', bodyParagraphs: [
        `एक समय था जब राजस्थान के अलवर जिले का भीकमपुरा गाँव धूल, कड़कती धूप और भयंकर सूखे की मार झेल रहा था। कुएँ सूखकर पाताल जा चुके थे, खेत बंजर पड़े थे।`,
        `इसी दौरान, आयुर्वेदिक चिकित्सा की पढ़ाई पूरी करके एक नौजवान गाँव में कदम रखता है — राजेन्द्र सिंह। गाँव के एक बुजुर्ग मंगू लाल मीणा ने कहा: "बेटा, हमें बीमारियों की दवा बाद में देना, पहले हमें पानी दो।"`,
        `राजेन्द्र सिंह ने बिना देर किए अपना स्टेथोस्कोप एक तरफ रख दिया और अपने हाथों में कुदाल और फावड़ा उठा लिया। उन्होंने बुजुर्गों से "जोहड़" बनाने की पुरानी कला सीखी।`,
        `जब बारिश का मौसम आया, बारिश का बहता पानी उस जोहड़ में थमने लगा। देखते ही देखते कुएँ फिर से पानी से लबालब भर गए।`,
        `खेती लहलहा उठी, पलायन रुक गया और अलवर का वो बंजर इलाका फिर से हरा-भरा हो गया। राजेन्द्र सिंह को आज दुनिया सम्मान से "वॉटरमैन ऑफ इंडिया" के नाम से जानती है।`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'जोहड़ बनाए', value: '11,000+' }, { label: 'नदियाँ पुनर्जीवित', value: '11' }, { label: 'लाभान्वित गाँव', value: '12,000' }, { label: 'भूजल स्तर वृद्धि', value: '6 मीटर' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['स्टॉकहोम वॉटर प्राइज 2015', 'रमन मैगसेसे पुरस्कार 2001', 'पद्म भूषण 2013', 'अर्थ केयर अवॉर्ड'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`पानी कोई इंजीनियरों के प्रबंधन की चीज़ नहीं है — यह एक ऐसा रिश्ता है जिसे समुदाय को निभाना होता है।`] },
    ],
  },
  {
    slug: 'dashrath-manjhi', name: 'Dashrath Manjhi', designation: 'The Mountain Man of Gehlaur',
    profileType: 'social-hero', profileTag: 'The Lone Hero of an Unstoppable Journey',
    category: 'Rural Heroes', location: 'Gehlaur, Gaya, Bihar', founded: '1960',
    photoUrl: '/dashrath-manjhi.webp', coverPhotoUrl: '/dashrath-manjhi.webp',
    oneLiner: `"Passion so fierce that even the mountain was forced to yield a path."`,
    executiveSummary: '55 km → 15 km · Thousands of Lives Saved',
    sectionsEn: [
      { sectionKey: 'story', bodyParagraphs: [
        `Born into an impoverished family in Gehlaur village near Gaya, Bihar, Dashrath Manjhi grew up facing immense hardships. A massive and treacherous mountain stood right in front of his village, completely severing it from nearby towns, markets, and hospitals. In any medical emergency, villagers were forced to travel a perilous 55-kilometer detour around the mountain.`,
        `One day, his wife Falguni Devi slipped and suffered severe injuries while crossing the mountain to bring him food. Due to the long route, reaching the hospital was tragically delayed, and she passed away without receiving proper treatment. This overwhelming grief forged a fierce, unyielding resolve. He vowed that the mountain which claimed his wife's life would no longer stand as a deadly barrier for anyone else.`,
        `Lacking money to purchase tools, he sold his few goats to buy a basic hammer and chisel, embarking on his daunting task entirely alone. Initially, villagers and relatives mocked him as 'crazy.' Harsh weather conditions could not shake his spirit — through scorching Bihar summers, freezing winters, and heavy monsoons, he never missed a day of work.`,
        `Finally, after 22 years of continuous labor, in 1982, he carved out a 360-foot-long, 30-foot-wide, and 25-foot-deep passage straight through the mountain. This cut the distance between Atri and Wazirganj from 55 kilometers down to just 15 kilometers, saving thousands of lives.`,
        `On August 17, 2007, Dashrath Manjhi passed away at AIIMS, New Delhi due to gallbladder cancer, and the Bihar Government accorded him a full State Funeral. Today, the dirt path he carved has been converted into a fully paved tar road officially named "Dashrath Manjhi Path".`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'Years of Labor', value: '22' }, { label: 'Distance Reduced', value: '55 km → 15 km' }, { label: 'Passage Carved', value: '360 ft long' }, { label: 'Tool Used', value: 'Hammer & Chisel' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['Government of India Commemorative Postage Stamp — 2016', 'Bihar State Funeral — 2007', 'Bollywood Film — Manjhi: The Mountain Man (2015)', '"Dashrath Manjhi Path" — Official road named in his honor', 'Dashrath Manjhi Dwar — Memorial gate at Gehlaur'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`When I started hammering the hill, people called me a lunatic. But I had made a vow to my wife. What the government couldn't do in decades, love and grief pushed one man to do alone — with nothing but a hammer, a chisel, and 22 years of will.`] },
    ],
    sectionsHi: [
      { sectionKey: 'story', bodyParagraphs: [
        `बिहार के गया जिले के पास स्थित गेहलौर गाँव में जन्मे दशरथ मांझी एक बेहद गरीब परिवार से थे। गाँव के ठीक सामने एक विशाल पहाड़ था जो पूरे गाँव को नजदीकी शहर, बाजार और अस्पताल से पूरी तरह अलग कर देता था।`,
        `एक दिन उनकी पत्नी फागुनी देवी पहाड़ के उस पार उनके लिए खाना ले जा रही थीं, तभी पहाड़ पर पैर फिसलने के कारण वे गंभीर रूप से घायल हो गईं। सही समय पर इलाज न मिलने की वजह से उनकी मृत्यु हो गई। इस दुख ने मांझी को तोड़ा नहीं, बल्कि एक ज़िद्दी संकल्प में बदल दिया।`,
        `उन्होंने अपनी कुछ बकरियाँ बेचकर छैनी और हथौड़ा खरीदा और अकेले ही उस विशाल पहाड़ को तोड़ना शुरू कर दिया। शुरुआत में गाँव वालों ने उन्हें 'पागल' समझकर मज़ाक उड़ाया। मौसम की मार भी उनके हौसले को नहीं तोड़ सकी।`,
        `आखिरकार 22 साल की अटूट मेहनत के बाद 1982 में उन्होंने 360 फुट लंबा रास्ता पहाड़ के बीच से काटकर बना दिया। इससे अत्रि और वजीरगंज के बीच की दूरी 55 किलोमीटर से घटकर सिर्फ 15 किलोमीटर रह गई।`,
        `17 अगस्त 2007 को एम्स, नई दिल्ली में उनका निधन हो गया। आज उनके बनाए रास्ते को आधिकारिक रूप से 'दशरथ मांझी पथ' कहा जाता है।`,
      ]},
      { sectionKey: 'achievements', jsonData: { items: [{ label: 'मेहनत के साल', value: '22' }, { label: 'दूरी घटाई', value: '55 किमी → 15 किमी' }, { label: 'रास्ते की लंबाई', value: '360 फुट' }, { label: 'औज़ार', value: 'छैनी और हथौड़ा' }] }},
      { sectionKey: 'recognition', jsonData: { items: ['भारत सरकार का स्मारक डाक टिकट — 2016', 'बिहार सरकार द्वारा राजकीय अंत्येष्टि — 2007', 'बॉलीवुड फिल्म — मांझी: द माउंटेन मैन (2015)', 'आधिकारिक सड़क — "दशरथ मांझी पथ"', 'गेहलौर में "दशरथ मांझी द्वार"'] }},
      { sectionKey: 'philosophy', bodyParagraphs: [`जब मैंने पहाड़ तोड़ना शुरू किया तो लोगों ने मुझे पागल कहा। लेकिन मैंने अपनी पत्नी को वचन दिया था। जो काम सरकार दशकों में नहीं कर पाई, वो एक आदमी ने प्रेम और दर्द की ताकत से कर दिखाया।`] },
    ],
  },
];

// ── Main export ────────────────────────────────────────────────────────────────
export async function seedAllContent() {
  try {
    // Check if already seeded
    const existing = await db.select({ id: foundersTable.id }).from(foundersTable)
      .where(eq(foundersTable.slug, 'nithin-kamath')).limit(1);

    // Seed Nithin Kamath
    logger.info('Seeding nithin-kamath...');
    const nkId = await upsertFounder({
      slug: 'nithin-kamath', name: 'Nithin Kamath', designation: 'Co-Founder & CEO, Zerodha',
      profileType: 'Startup Founder', profileTag: 'Zero to One', category: 'Founder Story',
      location: 'Bengaluru, Karnataka', founded: '2010', revenue: '₹8,320 Crore (FY24)',
      employees: '1,200+', age: '44', photoUrl: '/nithin-kamath.webp',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80',
      oneLiner: 'The man who challenged traditional brokerages with a ₹20 flat-fee model—and transformed investing in India.',
      executiveSummary: '73 Lakh clients · ₹8,320 Cr revenue · Zero VC funding · India\'s largest broker',
      published: true,
    });
    await seedSectionsIfEmpty(nkId, 'en', nkSectionsEn);
    await seedSectionsIfEmpty(nkId, 'hi', nkSectionsHi);
    logger.info({ id: nkId }, 'nithin-kamath seeded');

    // Seed Rajesh Kumar Vedas
    logger.info('Seeding rajesh-kumar-vedas...');
    const rkId = await upsertFounder({
      slug: 'rajesh-kumar-vedas', name: 'Rajesh Kumar Vedas', designation: 'Founder & CEO, Vedas Agro Industries',
      profileType: 'Rural Founder', profileTag: 'Bharat Builder', category: 'Founder Story',
      location: 'Lucknow, Uttar Pradesh', founded: '2011', revenue: '₹210 Crore',
      employees: '1,400+', age: '44',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
      coverPhotoUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
      oneLiner: 'From a small UP village with no electricity to building India\'s fastest-growing agri-processing company.',
      executiveSummary: '18,000 farmer partners · ₹210 Cr revenue · 6 processing plants · 85,000+ retail touchpoints',
      published: true,
    });
    await seedSectionsIfEmpty(rkId, 'en', rkSectionsEn);
    await seedSectionsIfEmpty(rkId, 'hi', rkSectionsHi);
    logger.info({ id: rkId }, 'rajesh-kumar-vedas seeded');

    // Remove any social heroes that were previously mis-seeded into foundersTable
    const socialHeroSlugs = SOCIAL_HEROES.map(h => h.slug);
    if (socialHeroSlugs.length > 0) {
      const staleHeroes = await db
        .select({ id: foundersTable.id })
        .from(foundersTable)
        .where(inArray(foundersTable.slug, socialHeroSlugs));
      if (staleHeroes.length > 0) {
        const ids = staleHeroes.map(r => r.id);
        await db.delete(founderSectionsTable).where(inArray(founderSectionsTable.founderId, ids));
        await db.delete(foundersTable).where(inArray(foundersTable.slug, socialHeroSlugs));
        logger.info({ count: ids.length }, 'Cleaned up social heroes from foundersTable');
      }
    }

    logger.info('All content seeded successfully');
  } catch (err) {
    logger.error({ err }, 'Failed to seed content');
  }
}
