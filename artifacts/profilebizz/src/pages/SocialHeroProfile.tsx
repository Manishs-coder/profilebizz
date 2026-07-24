import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Share2, BookmarkPlus, Award, Heart, Users, Languages } from 'lucide-react';

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
    photo: '/anshu-gupta.png',
    coverPhoto: '/anshu-gupta.png',
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
    title: 'Social Entrepreneur & Inventor',
    tag: 'The Pad Man of India',
    photo: '/arunachalam-muruganantham.png',
    coverPhoto: '/arunachalam-muruganantham.png',
    location: 'Coimbatore, Tamil Nadu',
    impact: '4,400+ Villages, 1.3 Mn Women',
    founded: '2006',
    category: 'Rural Heroes',
    pullQuote: '"I am not Pad Man. I am a school dropout who stumbled upon a billion-dollar problem and refused to give up for 4 years."',
    story: [
      'This is the story of Arunachalam Muruganantham, a very simple man from Coimbatore, Tamil Nadu. Having lost his father at a young age, he was forced to drop out of school to work as a laborer and take up odd jobs to support his family. Despite living through poverty, he always possessed a drive to innovate.',
      'The turning point in his life came after his marriage. A few days into their marriage, he noticed his wife hiding a dirty, old rag. Upon asking, he discovered she used it during her periods. When he suggested buying sanitary pads from the store, his wife replied that buying pads would ruin their monthly grocery budget. This response deeply affected Muruganantham. He went to the market, bought a pad, and was shocked to see how expensive a small piece of cotton was. At that very moment, he resolved to make affordable pads for his wife himself.',
      'From there began a period of struggle that no one could have imagined. He made a pad out of cotton and had his wife test it, but it failed. The biggest challenge was that he had to wait an entire month for the results of each test. When medical students in his town refused to help due to social inhibition, Muruganantham took a step that few would ever dare to take — he decided to experiment on himself.',
      'He filled a rubber bladder with animal blood and tied it around his waist, attaching a tube that led into his underwear. He cycled and walked around all day to check whether the pad absorbed the blood properly. Soon, a foul smell and bloodstains appeared on his clothes. Seeing this, the villagers branded him a "madman" and "pervert." Driven away by public ridicule, his wife left him, his mother abandoned him, and the villagers threatened to outcast him. Yet, despite these immense sacrifices, he refused to abandon his mission.',
      'After nearly two years of grueling research, he realized that the key was not regular cotton, but a specialized cellulose fiber that absorbs liquid efficiently. While multinational corporations used multimillion-dollar machinery for this process, Muruganantham spent nearly four years of hard work developing a simple, low-cost machine that could be built for a fraction of the cost, enabling any ordinary woman to produce pads easily.',
      'Once the machine was ready, instead of patenting the technology to sell it to a large corporation for profit, he decided to hand it over to rural women across India. He distributed these machines to women\'s Self-Help Groups in villages. This triggered a massive revolution in India. Pads that were once unaffordable for poor women were now produced at extremely low costs — not only protecting millions of women from health issues but also providing thousands of rural women with employment and dignity.',
      'His dedication and innovative vision captured global attention. Eventually, his wife and family returned to him. The Government of India honored him with the prestigious Padma Shri award, and TIME magazine named him one of the 100 most influential people in the world. His life inspired the hit Bollywood film Pad Man, and a documentary based on his journey went on to win an Academy Award. The story of Arunachalam Muruganantham proves that with noble intentions and unwavering determination, a single individual can transform the mindset and lives of an entire society.',
    ],
    achievements: [
      { label: 'Villages Covered',      value: '4,400+' },
      { label: 'Women Entrepreneurs',   value: '1.3 Million' },
      { label: 'Countries Reached',     value: '106' },
      { label: 'Cost Reduction vs MNCs', value: '95%' },
    ],
    recognition: [
      'Padma Shri 2016 — Government of India',
      'TIME 100 Most Influential People — 2014',
      'Forbes 48 Heroes of Philanthropy',
      'IIT Madras Honorary Doctorate',
      'Oscar-Winning Documentary — "Period. End of Sentence."',
      'Bollywood Film — Pad Man (2018) based on his life',
    ],
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

/* ══════════════════════════════════════
   HINDI OVERRIDES
══════════════════════════════════════ */
const HEROES_HI: Record<string, Partial<typeof FEATURED_HEROES[0]>> = {
  'arunachalam-muruganantham': {
    name: 'अरुणाचलम मुरुगनांथम्',
    title: 'सामाजिक उद्यमी और आविष्कारक',
    tag: 'Pad Man of India',
    location: 'कोयंबटूर, तमिलनाडु',
    impact: '4,400+ गाँव, 1.3 करोड़ महिलाएं',
    category: 'ग्रामीण हीरो',
    pullQuote: '"मैं Pad Man नहीं हूँ। मैं एक स्कूल छोड़ा हुआ वह इंसान हूँ, जिसने एक अरब डॉलर की समस्या को ठोकर खाकर खोजा — और 4 साल तक हार नहीं मानी।"',
    story: [
      'यह कहानी तमिलनाडु के कोयंबटूर में रहने वाले एक बेहद साधारण इंसान अरुणाचलम मुरुगनांथम् की है। बचपन में ही पिता का साया उठ जाने के कारण उन्हें अपनी पढ़ाई छोड़कर बहुत छोटी उम्र में मजदूरी और छोटे-मोटे काम करने पड़े। गरीबी का दौर देखा, लेकिन उनके भीतर कुछ नया करने की तड़प हमेशा से थी।',
      'उनकी जिंदगी में असली मोड़ तब आया जब उनकी शादी हुई। शादी के कुछ दिनों बाद उन्होंने देखा कि उनकी पत्नी कपड़े का एक गंदा और पुराना टुकड़ा छिपाकर ले जा रही है। पूछने पर पता चला कि वह पीरियड्स के दिनों में इसका इस्तेमाल करती है। जब उन्होंने अपनी पत्नी से दुकान से सेनेटरी पैड खरीदने को कहा, तो पत्नी का जवाब था कि अगर पैड खरीदने लगेंगे तो घर के राशन का बजट बिगड़ जाएगा। यह बात मुरुगनांथम् के दिल में सीधे चुभ गई। वे बाजार गए और पैड खरीदा, तो उन्हें यह देखकर बहुत हैरानी हुई कि रुई के एक छोटे से टुकड़े की कीमत इतनी ज्यादा क्यों है। उसी पल उन्होंने ठान लिया कि वे अपनी पत्नी के लिए खुद सस्ते पैड बनाएंगे।',
      'यहाँ से उनके संघर्ष का एक ऐसा दौर शुरू हुआ जिसकी किसी ने कल्पना भी नहीं की थी। उन्होंने रुई से पैड बनाकर अपनी पत्नी को इस्तेमाल करने दिया, लेकिन वह तरीका नाकाम रहा। सबसे बड़ी दिक्कत यह थी कि हर महीने प्रयोग का परिणाम देखने के लिए उन्हें पूरा एक महीना इंतजार करना पड़ता था। जब गाँव की मेडिकल छात्राओं ने संकोच के कारण उनकी मदद करने से इनकार कर दिया, तो मुरुगनांथम् ने एक ऐसा कदम उठाया जिसकी हिम्मत कोई नहीं कर सकता — उन्होंने खुद पर ही प्रयोग करने का फैसला किया।',
      'उन्होंने एक रबर की थैली में जानवर का खून भरा और उसमें एक ट्यूब लगाकर उसे अपनी कमर पर बांध लिया, जो उनके अंडरवेयर तक जाती थी। वे दिनभर साइकिल चलाते और काम करते ताकि यह देख सकें कि पैड खून को सोख पाता है या नहीं। इस दौरान उनके कपड़ों से बदबू आने लगी और खून के धब्बे दिखने लगे। यह सब देखकर गाँव के लोगों ने उन्हें \'पागल\' और \'चरित्रहीन\' समझ लिया। समाज के तानों से तंग आकर उनकी पत्नी उन्हें छोड़कर चली गई, उनकी माँ ने भी उनका साथ छोड़ दिया और गाँव वालों ने उन्हें गाँव से बाहर निकालने की धमकी दी। लेकिन इतनी बड़ी कुर्बानियों के बावजूद उन्होंने अपना मिशन नहीं छोड़ा।',
      'करीब दो साल के कठिन शोध के बाद उन्हें समझ आया कि असली खेल सिर्फ रुई का नहीं, बल्कि एक खास तरह के सेलुलोज़ फाइबर का है, जो लिक्विड को सोखता है। बड़ी विदेशी कंपनियाँ इसके लिए करोड़ों रुपये की बड़ी-बड़ी मशीनें इस्तेमाल करती थीं। मुरुगनांथम् ने लगभग चार साल की कड़ी मेहनत से एक ऐसी आसान और कम लागत वाली मशीन तैयार की, जिसे बहुत ही कम खर्च में बनाया जा सकता था और जिससे कोई भी सामान्य महिला आसानी से पैड तैयार कर सकती थी।',
      'जब मशीन बनकर तैयार हो गई, तो उन्होंने अपनी इस तकनीक का पेटेंट कराकर इसे किसी बड़ी कंपनी को बेचने के बजाय ग्रामीण भारत की महिलाओं को सौंपने का फैसला किया। उन्होंने ये मशीनें गाँव-गाँव में महिलाओं के स्व-सहायता समूहों को दीं। इसके नतीजे से भारत में एक बहुत बड़ी क्रांति आई। जिस पैड को खरीदना गरीब महिलाओं के लिए नामुमकिन था, वही पैड बेहद सस्ते दाम में बनने लगा। इससे न केवल लाखों महिलाओं को बीमारियों से सुरक्षा मिली, बल्कि हजारों ग्रामीण महिलाओं को रोजगार और सम्मान से जीने का जरिया भी मिला।',
      'उनकी इस लगन और अनोखी सोच ने पूरी दुनिया का ध्यान अपनी ओर खींचा। आगे चलकर उनकी पत्नी और परिवार वापस उनके पास आ गए। भारत सरकार ने उन्हें देश के प्रतिष्ठित सम्मान \'पद्म श्री\' से सम्मानित किया और \'टाइम\' मैगजीन ने उन्हें दुनिया के सबसे प्रभावशाली लोगों की सूची में जगह दी। उनके जीवन पर बॉलीवुड में \'Pad Man\' जैसी मशहूर फिल्म बनी और उनकी कहानी पर बनी डॉक्यूमेंट्री ने ऑस्कर पुरस्कार भी जीता। अरुणाचलम मुरुगनांथम् की यह कहानी साबित करती है कि अगर इंसान की नीयत साफ हो और इरादे मजबूत हों, तो एक अकेला इंसान भी पूरे समाज की सोच और जिंदगी बदल सकता है।',
    ],
    achievements: [
      { label: 'गाँव कवर',          value: '4,400+' },
      { label: 'महिला उद्यमी',      value: '1.3 करोड़' },
      { label: 'देश पहुँच',         value: '106' },
      { label: 'लागत में कमी',      value: '95% (बड़ी कंपनियों से)' },
    ],
    recognition: [
      'पद्म श्री 2016 — भारत सरकार',
      'TIME 100 सर्वाधिक प्रभावशाली — 2014',
      'Forbes 48 दानवीर हीरो',
      'IIT मद्रास मानद डॉक्टरेट',
      'Oscar विजेता डॉक्यूमेंट्री — "Period. End of Sentence."',
      'बॉलीवुड फिल्म — Pad Man (2018) उनके जीवन पर आधारित',
    ],
    philosophy: 'अगर मैंने पैसा ले लिया होता, तो एक इंसान की मदद होती — मेरी। मशीन बाँटकर 1.3 करोड़ महिलाओं को अपनी आज़ादी मिली। दुनिया की सबसे गरीब महिलाएं मुनाफे की हकदार हैं, दया की नहीं।',
  },
  'anshu-gupta': {
    name: 'अंशू गुप्ता',
    title: 'संस्थापक, गूंज — भारत के कपड़ा पुरुष',
    tag: 'भारत के कपड़ा पुरुष',
    location: 'नई दिल्ली',
    impact: '5 करोड़+ जीवन · 4,000 टन/वर्ष',
    category: 'NGO संस्थापक',
    pullQuote: '"कबाड़ नहीं, यह किसी की गरिमा है — शहरों का अतिरिक्त सामान, ग्रामीण भारत का आत्म-सम्मान।"',
    story: [
      '1990 के दशक की बात है। दिल्ली की कड़कड़ाती ठंड में जब लोग अपने घरों में रज़ाइयों में दुबके थे, तब एक युवा पत्रकार अंशू गुप्ता की मुलाकात हबीब नाम के एक व्यक्ति से हुई। हबीब का काम लावारिस शवों को उठाना था। बातचीत के दौरान हबीब ने एक ऐसी बात कही जिसने अंशू जी की सोच की नींव हिला दी: "गर्मियों में जब शव मिलता है तो मुझे कोई दिक्कत नहीं होती, लेकिन सर्दियों में मुझे रोज़ दो से तीन शव उठाने पड़ते हैं। लोग ठंड से नहीं मरते... लोग ठंड में कपड़ों के अभाव से मरते हैं।"',
      'इस एक घटना ने अंशू गुप्ता को यह सोचने पर मजबूर कर दिया कि जहाँ शहरों में अलमारियाँ पुराने कपड़ों से भरी पड़ी हैं या लोग उन्हें कबाड़ समझकर फेंक देते हैं, वहीं देश का एक बड़ा हिस्सा सिर्फ एक कपड़े के टुकड़े के अभाव में अपनी जान गंवा देता है। \'रोटी, कपड़ा और मकान\' की चर्चा तो सब करते थे, लेकिन कपड़ों को हमेशा केवल दान या पुरानी चीज़ मानकर छोड़ दिया जाता था।',
      'अंशू जी और उनकी पत्नी मीनाक्षी गुप्ता एक ऐसी आवाज़ उठाना चाहते थे जो शहरों के अतिरिक्त सामान और ग्रामीण भारत की ज़रूरतों के बीच पूरे देश में गूँज उठे। इसी सोच के साथ 1999 में अपनी कॉर्पोरेट नौकरी छोड़कर, उन्होंने दिल्ली में अपने ही घर से मात्र 67 कपड़ों के साथ अपनी संस्था का नाम \'गूंज\' रखा और इसकी नींव रखी।',
      'अंशू जी का स्पष्ट मानना था कि किसी भी गरीब इंसान को मुफ्त में सामान देना उसकी लाचारी का मज़ाक उड़ाना है और इससे उसका आत्म-सम्मान चोटिल होता है। इसलिए उन्होंने \'Cloth for Work\' (काम के बदले कपड़ा) का अनोखा मॉडल तैयार किया। गाँव के लोग मिलकर अपने क्षेत्र की समस्याओं को चिन्हित करते — रास्ता बनाना, कुआं साफ करना, बांस का पुल तैयार करना या स्कूल की मरम्मत। काम पूरा होने पर \'गूंज\' उन्हें \'फैमिली किट\' (कपड़े, बर्तन, राशन) उपहार स्वरूप देता है। इससे गाँव का विकास भी होता है और लोगों में यह भाव रहता है कि उन्होंने यह सामान अपनी मेहनत से कमाया है, किसी की भीख में नहीं लिया।',
      'ग्रामीण भारत में महिलाओं के लिए मासिक धर्म के समय स्वच्छता और कपड़े की कमी एक भयंकर समस्या थी। इसके लिए उन्होंने \'Not Just a Piece of Cloth\' अभियान शुरू किया, जिसमें शहरों से आने वाले सूती कपड़ों को रीसायकल करके साफ, री-यूजेबल कॉटन पैड्स (MY Pad) बनाकर गाँव-गाँव पहुँचाए गए।',
      'दिल्ली से शुरू हुआ यह काम धीरे-धीरे मुंबई, कोलकाता, बेंगलुरु, हैदराबाद और चेन्नई जैसे बड़े शहरों में संग्रह केंद्रों के रूप में फैल गया। 67 कपड़ों से शुरू हुआ यह सफर जब हर साल 4,000 टन से ज़्यादा सामग्री को रीसायकल करने लगा, तो 2015 में मनीला, फिलीपींस में अंशू गुप्ता को एशिया के सर्वोच्च सम्मान — रमन मैग्सेसे पुरस्कार — से सम्मानित किया गया। दुनिया उन्हें "The Clothing Man of India" के नाम से जानने लगी।',
    ],
    achievements: [
      { label: 'वार्षिक लाभान्वित', value: '5 करोड़+' },
      { label: 'वार्षिक सामग्री', value: '4,000 टन' },
      { label: 'राज्य', value: '25+' },
      { label: 'शुरुआत हुई', value: 'मात्र 67 कपड़ों से' },
    ],
    recognition: [
      'रमन मैग्सेसे पुरस्कार 2015 — मनीला, फिलीपींस',
      'अशोका फेलो',
      'CNN-IBN इंडियन ऑफ द ईयर — सोशल',
      'NDTV सोशल आंत्रप्रेन्योर ऑफ द ईयर',
      'पद्म श्री नामांकित',
    ],
    philosophy: 'कपड़ा दान नहीं — यह एक बुनियादी ज़रूरत है। शहर की हर पुरानी कमीज़ किसी गाँव में किसी की गरिमा बहाल कर सकती है। जब हम शहरी अतिरिक्त को ग्रामीण ज़रूरत मानते हैं, और इसे मुफ्त देने की बजाय सामुदायिक श्रम के बदले देते हैं — तो हम दाता नहीं, बल्कि साझेदार बन जाते हैं। और यही वह तरीका है जिससे गरिमा जीवित रहती है।',
  },
};

export default function SocialHeroProfile({ params, locale }: { params?: { slug?: string }; locale?: 'en' | 'hi' }) {
  const slug = params?.slug ?? '';
  const lang = locale ?? 'en';
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
    const hiData = HEROES_HI[selected.slug];
    const activeHero = (lang === 'hi' && hiData) ? { ...selected, ...hiData } : selected;
    const hf: React.CSSProperties = lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};
    const hfl: React.CSSProperties = lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: '2' } : {};
    const photoSrc = (selected as any).photo || selected.coverPhoto;
    const otherHeroes = FEATURED_HEROES.filter(h => h.slug !== selected.slug);

    const _heroDetailUrl    = `https://profilebizz.com/social-hero/${selected.slug}`;
    const _heroDetailJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: `${selected.name} — Social Hero Profile | ProfileBizz`,
          description: `${selected.name} is one of India's leading ${selected.category}. Read their full story on ProfileBizz.`,
          image: selected.coverPhoto,
          url: _heroDetailUrl,
          author: { '@type': 'Organization', name: 'ProfileBizz Editorial', url: 'https://profilebizz.com' },
          publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
          about: { '@type': 'Person', name: selected.name, url: _heroDetailUrl },
        },
        {
          '@type': 'Person',
          name: selected.name,
          url: _heroDetailUrl,
          image: selected.coverPhoto,
          knowsAbout: selected.category,
          nationality: { '@type': 'Country', name: 'India' },
        },
      ],
    });

    return (
      <>
        <Helmet>
          <title>{`${selected.name} — Social Hero Profile | ProfileBizz`}</title>
          <meta name="description" content={`Read the inspiring story of ${selected.name}, one of India's leading ${selected.category}. Full profile and impact journey curated by ProfileBizz.`} />
          <link rel="canonical" href={_heroDetailUrl} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={_heroDetailUrl} />
          <meta property="og:site_name" content="ProfileBizz" />
          <meta property="og:title" content={`${selected.name} — Social Hero Profile | ProfileBizz`} />
          <meta property="og:description" content={`${selected.name} is one of India's leading ${selected.category}. Read their full story on ProfileBizz.`} />
          <meta property="og:image" content={selected.coverPhoto} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_IN" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@profilebizz" />
          <meta name="twitter:title" content={`${selected.name} — Social Hero Profile | ProfileBizz`} />
          <meta name="twitter:description" content={`${selected.name} — ${selected.category} — story on ProfileBizz.`} />
          <meta name="twitter:image" content={selected.coverPhoto} />
          <script type="application/ld+json">{_heroDetailJsonLd}</script>
        </Helmet>
        <div className="min-h-screen bg-[#f9f9f9] text-black">

        {/* ── Sticky Top Bar ── */}
        <header className={`fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href={`${import.meta.env.BASE_URL}social-hero`} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="font-bold tracking-wider text-[11px] uppercase" style={hf}>
                  {lang === 'hi' ? 'सोशल हीरो' : 'ProfileBizz'}
                </span>
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-editorial" style={hf}>
                {lang === 'hi' ? 'सोशल हीरो प्रोफाइल' : 'Social Hero Profiles'}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[11px] font-bold tracking-widest uppercase bg-editorial text-white px-2 py-0.5" style={hf}>
                {activeHero.tag}
              </span>
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

        {/* ── Article Hero — centered, white background ── */}
        <div className="bg-white mt-14">
          <div className="max-w-3xl mx-auto px-6 md:px-10 pt-12 pb-10 text-center">

            {/* Category badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.18em] uppercase text-editorial border border-editorial px-3 py-1.5" style={hf}>
                {activeHero.category}
                <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400" style={hf}>{activeHero.tag}</span>
            </div>

            {/* Portrait photo — circular */}
            <div className="flex justify-center mb-7">
              <img
                src={photoSrc}
                alt={activeHero.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-white shadow-xl border border-gray-100"
              />
            </div>

            {/* Name */}
            <h1 className="font-serif text-5xl md:text-[68px] font-bold text-black leading-[1.06] tracking-tight mb-5"
              style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '3rem', lineHeight: '1.3' } : {}}>
              {activeHero.name}
            </h1>

            {/* Title */}
            <p className="text-lg md:text-xl text-gray-500 font-medium mb-6" style={hf}>{activeHero.title}</p>

            {/* Pull quote as tagline */}
            <p className="text-base md:text-[17px] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-9 italic font-serif"
              style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: '1.9' } : {}}>
              {activeHero.pullQuote}
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
              <span style={hf}>{activeHero.location}</span>
              <span className="text-gray-300">•</span>
              <span style={hf}>{lang === 'hi' ? 'सक्रिय' : 'Active Since'} {selected.founded}</span>
              <span className="text-gray-300">•</span>
              <span className="text-editorial font-semibold" style={hf}>{lang === 'hi' ? '10 मिनट पढ़ें' : '10 min read'}</span>
            </div>

            {/* Stats grid — bordered like FounderProfile */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 divide-x divide-y md:divide-y-0 divide-gray-200">
              {activeHero.achievements.map((a, i) => (
                <div key={i} className="px-5 py-4 text-left">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-1" style={lang === 'hi' ? { ...hf, letterSpacing: '0' } : {}}>{a.label}</p>
                  <p className="font-serif text-xl font-bold text-black" style={hf}>{a.value}</p>
                </div>
              ))}
            </div>

            {/* Language switch */}
            <div className="mt-6 flex justify-center">
              <a
                href={lang === 'en'
                  ? `${import.meta.env.BASE_URL}social-hero/hi/${selected.slug}`
                  : `${import.meta.env.BASE_URL}social-hero/${selected.slug}`}
                className="flex items-center gap-2 border border-gray-300 hover:border-black px-5 py-2 text-sm font-semibold text-gray-600 hover:text-black transition-all group"
                style={lang === 'hi' ? hf : {}}
              >
                <Languages className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-black transition-colors" />
                {lang === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}
              </a>
            </div>
          </div>
        </div>

        {/* ── Body: Left Sidebar + Main Article ── */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

          {/* Sticky Left Sidebar */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-20 space-y-6">

              {/* Recognition */}
              <div className="border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-3.5 h-3.5 text-editorial" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400" style={hf}>
                    {lang === 'hi' ? 'पुरस्कार' : 'Recognition'}
                  </p>
                </div>
                <div className="space-y-2">
                  {activeHero.recognition.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-editorial mt-0.5 flex-shrink-0 text-xs">▸</span>
                      <span className="text-xs text-gray-600 leading-snug" style={hf}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="border border-editorial p-4">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1" style={hf}>
                  {lang === 'hi' ? 'कुल प्रभाव' : 'Total Impact'}
                </p>
                <p className="font-serif text-xl font-bold text-editorial" style={hf}>{activeHero.impact}</p>
              </div>

              {/* More Heroes */}
              <div className="border border-gray-200 bg-white p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">
                  {lang === 'hi' ? 'और हीरो' : 'More Heroes'}
                </p>
                <div className="flex flex-col gap-2">
                  {otherHeroes.slice(0, 4).map((h) => (
                    <a key={h.slug}
                      href={`${import.meta.env.BASE_URL}social-hero${lang === 'hi' ? '/hi' : ''}/${h.slug}`}
                      className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-editorial transition-colors">
                      <ChevronRight className="w-3 h-3 flex-shrink-0 group-hover:text-editorial" />
                      <span className="leading-snug text-xs">{h.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="border border-gray-200 bg-white p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Share Profile</p>
                <div className="flex gap-2 flex-wrap">
                  {['LinkedIn', 'Twitter', 'WhatsApp'].map((p) => (
                    <a key={p} href="#" className="text-[10px] font-bold tracking-wider uppercase text-gray-500 hover:text-editorial transition-colors border border-gray-200 px-2 py-1 hover:border-editorial">{p}</a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Article ── */}
          <article className="flex-1 min-w-0 max-w-3xl">

            {/* The Story */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest">01</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm font-bold tracking-[0.12em] uppercase" style={hf}>
                  {lang === 'hi' ? 'कहानी' : 'The Story'}
                </span>
                <div className="w-8 h-px bg-gray-200" />
              </div>

              {activeHero.story.map((para, i) => (
                <p key={i} className="text-[17px] md:text-[18px] text-gray-700 mb-5"
                  style={lang === 'hi' ? { ...hfl, lineHeight: '2.1' } : { lineHeight: '1.9' }}>{para}</p>
              ))}
            </section>

            {/* Philosophy — black block like FounderProfile leadership quote */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest">02</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm font-bold tracking-[0.12em] uppercase" style={hf}>
                  {lang === 'hi' ? 'मूल दर्शन' : 'Core Philosophy'}
                </span>
                <div className="w-8 h-px bg-gray-200" />
              </div>
              <blockquote className="border-l-4 border-editorial pl-6 mb-6">
                <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic"
                  style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: '1.9' } : {}}>
                  {activeHero.pullQuote}
                </p>
              </blockquote>
              <div className="bg-black text-white p-6">
                <p className="text-base font-serif leading-relaxed italic text-white/90"
                  style={lang === 'hi' ? { fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: '2' } : {}}>
                  {activeHero.philosophy}
                </p>
              </div>
            </section>

            {/* Recognition — mobile only (sidebar is hidden on mobile) */}
            <section className="lg:hidden mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest">03</span>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm font-bold tracking-[0.12em] uppercase" style={hf}>
                  {lang === 'hi' ? 'पुरस्कार एवं सम्मान' : 'Recognition & Awards'}
                </span>
                <div className="w-8 h-px bg-gray-200" />
              </div>
              <div className="space-y-3">
                {activeHero.recognition.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-3">
                    <span className="text-editorial flex-shrink-0 font-bold">▸</span>
                    <span className="text-base text-gray-700" style={hf}>{r}</span>
                  </div>
                ))}
              </div>
            </section>

          </article>
        </div>
      </div>
      </>
    );
  }

  // Listing page
  const _heroListUrl    = 'https://profilebizz.com/social-hero';
  const _heroListJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Social Hero Profiles — ProfileBizz',
    description: 'Profiles of India\'s social heroes — changemakers, NGO founders, CSR champions, rural heroes, women leaders, and youth icons who are transforming India.',
    url: _heroListUrl,
    publisher: { '@type': 'NewsMediaOrganization', '@id': 'https://profilebizz.com/#organization' },
    inLanguage: 'en-IN',
  });

  return (
    <>
      <Helmet>
        <title>Social Hero Profiles — India's Changemakers | ProfileBizz</title>
        <meta name="description" content="Profiles of India's social heroes — changemakers, NGO founders, CSR champions, rural heroes, women leaders, and youth icons transforming Bharat. Curated by ProfileBizz." />
        <link rel="canonical" href={_heroListUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={_heroListUrl} />
        <meta property="og:site_name" content="ProfileBizz" />
        <meta property="og:title" content="Social Hero Profiles — India's Changemakers | ProfileBizz" />
        <meta property="og:description" content="Profiles of India's social heroes — changemakers, NGO founders, CSR champions, rural heroes, and youth icons curated by ProfileBizz." />
        <meta property="og:image" content="https://profilebizz.com/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@profilebizz" />
        <meta name="twitter:title" content="Social Hero Profiles — India's Changemakers | ProfileBizz" />
        <meta name="twitter:description" content="India's social heroes — changemakers, NGO founders, CSR champions curated by ProfileBizz." />
        <meta name="twitter:image" content="https://profilebizz.com/og-cover.jpg" />
        <script type="application/ld+json">{_heroListJsonLd}</script>
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
    </>
  );
}
