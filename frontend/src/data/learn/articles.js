// PIAX Learn articles. General education only: no diagnosis, no medication doses, and every product mention
// stays within the validated claims in data/productCatalog.json. `review: 'pending'` shows that a qualified
// medical reviewer has not yet signed the article off; set reviewer and review: 'reviewed' when they have.
//
// Section shape: { id, heading, body: [paragraphs], list?: [items], steps?: [{ icon, text }], note? }

const team = 'PIAX Health Team'
const published = '2026-10-01'

export const articles = [
  // ---------- First Period ----------
  {
    slug: 'what-is-a-first-period', category: 'first-period', topic: 'Understanding', featured: true,
    title: 'What happens when you get your first period?',
    excerpt: 'A simple guide to your first period: what it is, the signs it may be coming, and what to expect.',
    sections: [
      { id: 'what', heading: 'What is a first period?', body: ['Your first period (doctors call it menarche) is the first time you bleed from your vagina as part of the menstrual cycle. It is a normal, healthy sign that your body is growing up.', 'Most girls in India get their first period at around 12 or 13, but anywhere from about 9 to 15 is common. Your timing is your own.'] },
      { id: 'signs', heading: 'Signs it may be coming', body: ['There is no exact countdown, but a few changes often come first:'], list: ['Your breasts started developing about two years ago.', 'You have grown hair under your arms and around your genitals.', 'You notice white or clear discharge in your underwear, often 6 to 12 months before.', 'You feel mild cramps, bloating or mood changes for a few days.'] },
      { id: 'expect', heading: 'What to expect', body: ['A first period is often light, and the blood can be red, pink or brown. It usually lasts 2 to 7 days.', 'For the first couple of years your periods may come at uneven gaps. That is normal while your hormones settle.'] },
      { id: 'help', heading: 'When to talk to a doctor', body: ['Speak to a doctor if you are 15 and have not had a period yet, if bleeding is very heavy or lasts more than 7 days, or if pain stops you from going about your day.'], note: 'Talking to a parent, older sister, teacher or school nurse can help. Every woman you know has been through this.' },
    ],
    faqs: [['Can I go to school on my first period?', 'Yes. Pack a small kit — a few pads, spare underwear and a zip pouch — and you can carry on with your day as usual.'], ['Is it normal if my first period is brown?', 'Yes. Brown blood is older blood that took a little longer to leave the body. It is very common with early periods.']],
  },
  {
    slug: 'preparing-for-your-first-period', category: 'first-period', topic: 'Getting ready',
    title: 'How to prepare for your first period',
    excerpt: 'A practical checklist so you feel ready, at home and at school.',
    sections: [
      { id: 'kit', heading: 'Make a small period kit', body: ['Keep a pouch in your school bag so you are never caught out:'], list: ['3 or 4 pads — a shorter size such as PIAX VERA (240mm) suits light first periods.', 'A spare pair of underwear.', 'A small pack of tissues or wipes.', 'A zip pouch or paper bag for used pads.'] },
      { id: 'use', heading: 'Practise using a pad', body: ['Open a pad at home and try placing it in your underwear before you need it. The sticky side goes on the underwear, and the wings fold around the sides.'] },
      { id: 'talk', heading: 'Know who you can talk to', body: ['Decide who you would go to if your period started at school — a teacher, the school nurse or a friend. Asking for a pad is completely normal.'] },
    ],
    faqs: [['What if my period starts when I don’t have a pad?', 'Fold some toilet paper into your underwear as a temporary pad and ask a teacher, nurse or friend for one.']],
  },

  // ---------- Menstrual Cycle ----------
  {
    slug: 'what-is-the-menstrual-cycle', category: 'menstrual-cycle', topic: 'Cycle basics', featured: true,
    title: 'What is the menstrual cycle?',
    excerpt: 'A simple guide to what the menstrual cycle is, how it works, and why it matters for your health.',
    sections: [
      { id: 'what', heading: 'The cycle in one sentence', body: ['Each month your body prepares for a possible pregnancy; when pregnancy does not happen, the lining of the uterus is shed — that is your period.'] },
      { id: 'counting', heading: 'How to count your cycle', body: ['Day 1 is the first day of real bleeding (not spotting). Your cycle runs until the day before your next period starts.', 'In adults a cycle is usually anywhere from 21 to 35 days. In the first few years after periods start, 21 to 45 days is common. 28 days is just an average, not a rule.'] },
      { id: 'why', heading: 'Why it is worth tracking', body: ['Doctors sometimes call the cycle a vital sign. Knowing your usual pattern helps you plan ahead and notice when something changes.'], note: 'Cycle predictions in apps are estimates based on what you log. They are not a method of contraception.' },
    ],
    faqs: [['Is a 26-day cycle normal?', 'Yes. Anything from 21 to 35 days is usual for adults, and many people’s cycles vary by a few days each month.']],
  },
  {
    slug: 'four-phases-of-the-menstrual-cycle', category: 'menstrual-cycle', topic: 'Phases explained',
    title: 'The four phases of the menstrual cycle, explained',
    excerpt: 'Menstruation, follicular, ovulation and luteal: what happens in each phase and how it can feel.',
    sections: [
      { id: 'phases', heading: 'The four phases at a glance', body: ['Hormones rise and fall through the month, which is why energy and mood can change too.'], steps: [{ icon: 'Droplet', text: 'Menstruation: the lining is shed (about days 1–5)' }, { icon: 'Sprout', text: 'Follicular: estrogen rises and an egg matures' }, { icon: 'Sun', text: 'Ovulation: an egg is released' }, { icon: 'Moon', text: 'Luteal: progesterone rises before the next period' }] },
      { id: 'ovulation', heading: 'When does ovulation happen?', body: ['Ovulation usually happens about 14 days before your next period — not always on day 14. The phase after ovulation stays fairly steady at about 12 to 14 days; cycle length changes mostly happen before it.'] },
      { id: 'feel', heading: 'How each phase can feel', body: ['Many people feel more energetic in the follicular phase and around ovulation, and more tired or sensitive in the days before a period. Everyone is different, and tracking helps you learn your own pattern.'] },
    ],
    faqs: [['Can stress change my cycle?', 'Yes. Stress, travel, illness and big changes in weight or exercise can delay ovulation, which delays the next period.']],
  },

  // ---------- Period Care ----------
  {
    slug: 'how-to-use-a-sanitary-pad', category: 'period-care', topic: 'Using pads', featured: true,
    title: 'How to use a sanitary pad correctly',
    excerpt: 'A step-by-step guide to using, changing and disposing of a pad comfortably and hygienically.',
    sections: [
      { id: 'steps', heading: 'Step by step', body: ['Wash your hands first, then:'], steps: [{ icon: 'Hand', text: 'Peel off the backing and place the pad on your underwear' }, { icon: 'Crosshair', text: 'Position it centrally and adjust for comfort' }, { icon: 'Shrink', text: 'Fold the wings around the sides and press to secure' }, { icon: 'Trash2', text: 'Wrap the used pad and put it in a bin — never flush' }] },
      { id: 'change', heading: 'How often to change', body: ['Change your pad every 4 to 6 hours, even on lighter days, and sooner if it feels full or damp. Regular changes help you stay fresh and comfortable.'] },
      { id: 'size', heading: 'Pick the right size', body: ['Shorter pads suit lighter days; longer pads give more coverage for heavier days and nights. PIAX comes in four lengths, from VERA (240mm) to SEREN (360mm), so you can match each day.'] },
    ],
    faqs: [['Can I wear the same pad all day?', 'It is best not to. Changing every 4 to 6 hours keeps you comfortable and lowers the chance of irritation.']],
  },
  {
    slug: 'day-vs-night-pads', category: 'period-care', topic: 'Day vs night',
    title: 'Day pads vs night pads: what’s the difference?',
    excerpt: 'Why many people use a longer pad at night, and how to choose.',
    sections: [
      { id: 'why', heading: 'Why nights need more length', body: ['When you lie down, flow can move towards the back. A longer pad gives more coverage there, so you can sleep without worrying.'] },
      { id: 'choose', heading: 'How to choose', body: ['Use your usual day size if your nights are fine. If you notice leaks at the back, try one size longer at night — for example PIAX NOCTE (330mm) or SEREN (360mm).'] },
      { id: 'tips', heading: 'Tips for a comfortable night', list: ['Put on a fresh pad just before bed.', 'Sleeping on your side with knees slightly bent can help.', 'Snug-fitting underwear keeps the pad in place.'] },
    ],
    faqs: [['Do I need a night pad on light days?', 'Usually not. Many people use a night pad only on their heavier days.']],
  },

  // ---------- Flow & Products ----------
  {
    slug: 'understanding-your-flow', category: 'flow-products', topic: 'Understanding flow', featured: true,
    title: 'Light, regular or heavy? Understanding your flow',
    excerpt: 'How to tell what kind of flow you have, and when heavy bleeding is worth checking.',
    sections: [
      { id: 'measure', heading: 'Judge flow by how often you change', body: ['“Heavy” means different things to different people. A more useful guide is how often you need to change on your heaviest day:'], list: ['Every 6 hours or more: lighter flow.', 'Every 4 to 6 hours: regular flow.', 'Every 2 to 3 hours: heavier flow.', 'Every 1 to 2 hours, or needing to double up: very heavy flow.'] },
      { id: 'normal', heading: 'What is normal?', body: ['Most periods last 2 to 7 days. Blood can be bright red, dark red or brown, and small clots can be normal.'] },
      { id: 'doctor', heading: 'When to see a doctor', body: ['See a doctor if you soak through a pad every 1 to 2 hours for several hours, pass clots larger than a coin often, bleed for more than 7 days, or feel tired and breathless. Heavy periods are common and can be treated.'] },
    ],
    faqs: [['Can my flow change from month to month?', 'Yes. Stress, illness, exercise and age can all change your flow a little.']],
  },
  {
    slug: 'choosing-the-right-pad-size', category: 'flow-products', topic: 'Choosing a size',
    title: 'Choosing the right pad size for each day',
    excerpt: 'Match the four PIAX lengths to the days of your period.',
    sections: [
      { id: 'sizes', heading: 'The four PIAX sizes', list: ['PIAX VERA — 240mm: lighter days and the start or end of your period.', 'PIAX LUMA — 290mm: regular, everyday flow.', 'PIAX NOCTE — 330mm: heavier days and nights.', 'PIAX SEREN — 360mm: more coverage overnight.'] },
      { id: 'mix', heading: 'Most people use more than one size', body: ['Your flow changes over your period, so many people keep two sizes at home: one for the day and a longer one for heavier days or nights.'] },
      { id: 'try', heading: 'Not sure? Start small', body: ['The 12-pad PIAX Cycle Pack lets you try several sizes in one box before you buy a full box of one. You can also take the Find My Pad quiz for a personal suggestion.'], note: 'Length is about coverage. Choose what feels comfortable for you.' },
    ],
    faqs: [['Which size should I start with?', 'If you are unsure, LUMA (290mm) suits regular days for most people. The PIAX Cycle Pack lets you try a few sizes first.']],
  },

  // ---------- Period Pain ----------
  {
    slug: 'why-do-period-cramps-happen', category: 'period-pain', topic: 'Why it happens', featured: true,
    title: 'Why do period cramps happen?',
    excerpt: 'Understand why period pain happens, what’s normal, and simple ways to manage cramps during menstruation.',
    sections: [
      { id: 'what', heading: 'What are period cramps?', body: ['Period cramps, also called menstrual cramps, are a common type of pain you may feel in your lower abdomen before or during your period. The pain can range from mild discomfort to strong, throbbing pain, and may also be felt in your lower back, thighs or hips.'] },
      { id: 'why', heading: 'Why do period cramps happen?', body: ['During your period, your uterus contracts to help shed its lining (the endometrium). These contractions are caused by hormone-like substances called prostaglandins. Higher levels of prostaglandins can lead to stronger contractions, which may cause pain and cramps.'], steps: [{ icon: 'Droplets', text: 'Hormone changes increase prostaglandins' }, { icon: 'Activity', text: 'The uterus contracts to shed its lining' }, { icon: 'Waves', text: 'Contractions briefly reduce blood flow' }, { icon: 'Zap', text: 'This can cause cramps and pain' }] },
      { id: 'feel', heading: 'What does period pain feel like?', body: ['Period pain can feel different for everyone. It may feel like a dull ache, a sharp pain or a throbbing sensation in the lower abdomen. The pain usually starts a day before or on the first day of your period and may last 1 to 3 days.'] },
      { id: 'normal', heading: 'When is period pain normal?', body: ['Mild to moderate cramps that ease with rest, heat or usual pain relief are common.'] },
      { id: 'doctor', heading: 'When to seek medical help', body: ['See a doctor if pain is severe, stops you from going about your day, gets worse over time, or comes with very heavy bleeding, fever or pain outside your period. Conditions such as endometriosis are worth checking.'] },
      { id: 'manage', heading: 'How to manage period cramps', list: ['Rest a hot water bottle (warm, not boiling, wrapped in a towel) on your lower belly for about 15 minutes.', 'Gentle movement such as walking or stretching can ease cramps.', 'Drink water and warm drinks like ginger or jeera water.', 'Ask a pharmacist or doctor which pain relief is right for you.'] },
    ],
    faqs: [['Is it normal to have cramps every period?', 'Yes, for many people. If the pain is severe or getting worse, talk to a doctor.'], ['Can cramps start before my period?', 'Yes. Some people feel cramps a day or two before bleeding begins.']],
  },
  {
    slug: 'simple-ways-to-ease-cramps', category: 'period-pain', topic: 'Easing pain',
    title: 'Simple ways to relieve period cramps',
    excerpt: 'Heat, movement, rest and other gentle ways to feel better.',
    sections: [
      { id: 'heat', heading: 'Use heat', body: ['Heat on the lower belly relaxes the muscles of the uterus. A hot water bottle or a warm shower can help.'] },
      { id: 'move', heading: 'Move gently', body: ['Light movement boosts blood flow. Try these slowly, and stop if anything hurts:'], list: ['Child’s pose: kneel, sit back on your heels and fold forward for 5 slow breaths.', 'Cat–cow: on hands and knees, round your back, then let it dip, 6 times.', 'Knees to chest: lie on your back and hug both knees in.'] },
      { id: 'rest', heading: 'Rest and breathe', body: ['Slow, deep breathing calms your nervous system and can take the edge off cramps. Rest counts as self-care.'] },
    ],
    faqs: [['Does exercise make cramps worse?', 'Usually not. Gentle movement often helps, but rest if you need to.']],
  },

  // ---------- PMS & Symptoms ----------
  {
    slug: 'what-is-pms', category: 'pms-symptoms', topic: 'Understanding PMS', featured: true,
    title: 'What is PMS?',
    excerpt: 'The physical and emotional changes before a period, and when to get support.',
    sections: [
      { id: 'what', heading: 'What PMS is', body: ['Premenstrual syndrome (PMS) is a set of physical and emotional changes that usually start 1 to 2 weeks before a period and ease once bleeding begins.'] },
      { id: 'signs', heading: 'Common signs', list: ['Bloating and breast tenderness.', 'Tiredness or trouble sleeping.', 'Food cravings.', 'Irritability, low mood or feeling more emotional.', 'Headaches or breakouts.'] },
      { id: 'help', heading: 'When to get support', body: ['If symptoms affect your work, studies or relationships, or if low mood feels hard to cope with, talk to a doctor. A more severe form, PMDD, can be treated.'] },
    ],
    faqs: [['Is PMS the same for everyone?', 'No. Symptoms and their strength vary a lot between people and even between cycles.']],
  },
  {
    slug: 'mood-changes-before-your-period', category: 'pms-symptoms', topic: 'Mood & energy',
    title: 'Mood changes before your period: why they happen',
    excerpt: 'Why your mood can follow your cycle, and small things that help.',
    sections: [
      { id: 'why', heading: 'Why mood can change', body: ['Estrogen and progesterone rise and fall through your cycle, and estrogen supports serotonin, a feel-good messenger in the brain. When hormone levels drop before a period, mood can dip too.'] },
      { id: 'help', heading: 'Small things that help', list: ['A short walk and some daylight.', 'Regular meals; pairing sweets with a little protein keeps energy steadier.', 'Going easy on very strong tea or coffee if they leave you jittery.', 'An early night and a few slow breaths.'] },
      { id: 'support', heading: 'You are not too much', body: ['Feeling low or snappy before your period is common. If low mood lasts or feels overwhelming, please reach out to a doctor or someone you trust.'] },
    ],
    faqs: [['Can tracking help?', 'Yes. Logging mood alongside your cycle can show patterns, so you can plan ahead.']],
  },

  // ---------- Hygiene ----------
  {
    slug: 'daily-menstrual-hygiene', category: 'hygiene', topic: 'Daily hygiene', featured: true,
    title: 'Menstrual hygiene: a complete guide',
    excerpt: 'Simple, practical steps for staying clean and comfortable during your period.',
    sections: [
      { id: 'basics', heading: 'The everyday basics', list: ['Wash your hands before and after changing a pad.', 'Change your pad every 4 to 6 hours, even on light days.', 'Wash the outer genital area with plain water once or twice a day.', 'Wear clean, breathable cotton underwear.'] },
      { id: 'avoid', heading: 'What to avoid', body: ['The vagina cleans itself. Avoid douching (washing inside) and strongly scented soaps or sprays, which can upset its natural balance and cause irritation.'] },
      { id: 'out', heading: 'Hygiene on the go', body: ['Carry spare pads, tissues and a pouch for used pads, so you can change wherever you are.'] },
    ],
    faqs: [['Is it safe to bathe during my period?', 'Yes. A warm bath or shower is safe and can even ease cramps.']],
  },
  {
    slug: 'how-to-dispose-of-pads', category: 'hygiene', topic: 'Disposal',
    title: 'How to dispose of pads responsibly',
    excerpt: 'Clean, considerate disposal at home, school and work.',
    sections: [
      { id: 'how', heading: 'The right way', steps: [{ icon: 'Package', text: 'Roll the used pad up' }, { icon: 'FileText', text: 'Wrap it in its wrapper or paper' }, { icon: 'Trash2', text: 'Put it in a covered bin' }, { icon: 'Hand', text: 'Wash your hands' }] },
      { id: 'never', heading: 'Never flush pads', body: ['Pads can block toilets and drains. Always use a bin, even if one is not right next to you.'] },
      { id: 'away', heading: 'When there’s no bin', body: ['Keep a small zip pouch or paper bag in your kit to carry a wrapped pad until you find a bin.'] },
    ],
    faqs: [['Can I burn used pads at home?', 'It is best not to. Wrap them and use the household waste bin.']],
  },

  // ---------- Myths & Facts ----------
  {
    slug: 'period-myths-and-facts', category: 'myths-facts', topic: 'Everyday myths', featured: true,
    title: 'Period myths and facts',
    excerpt: 'Common beliefs about periods, and what’s actually true.',
    sections: [
      { id: 'dirty', heading: 'Myth: period blood is dirty', body: ['Fact: period blood is a normal body fluid made of blood and the lining of the uterus. There is nothing dirty about it.'] },
      { id: 'bath', heading: 'Myth: you shouldn’t bathe on your period', body: ['Fact: bathing is safe, keeps you fresh and warm water may ease cramps.'] },
      { id: 'sync', heading: 'Myth: friends’ periods sync up', body: ['Fact: studies have not found that periods really sync. Similar timing is usually coincidence.'] },
      { id: 'pregnant', heading: 'Myth: you can’t get pregnant on your period', body: ['Fact: it is less likely but possible, especially with shorter cycles, because sperm can survive up to 5 days.'] },
    ],
    faqs: [['Is it okay to talk about periods openly?', 'Yes. Talking about periods openly helps everyone get the care and information they need.']],
  },
  {
    slug: 'can-you-exercise-on-your-period', category: 'myths-facts', topic: 'Body & health',
    title: 'Can you exercise on your period?',
    excerpt: 'Yes — and it may even help. Here’s how to make it comfortable.',
    sections: [
      { id: 'safe', heading: 'Exercise is safe', body: ['Exercising on your period is safe, and gentle movement can lift your mood and ease cramps.'] },
      { id: 'listen', heading: 'Listen to your body', body: ['On heavier or more tiring days, choose lighter activity like walking, yoga or stretching. Rest when you need it.'] },
      { id: 'comfort', heading: 'Stay comfortable', list: ['Wear a fresh pad and snug underwear so it stays in place.', 'A longer size can give more coverage during sport.', 'Drink water before and after.'] },
    ],
    faqs: [['Should I skip sports during my period?', 'No need to, unless you feel unwell. Many athletes train and compete on their periods.']],
  },
]

// Reading time from the words in an article (about 200 words a minute).
const words = (article) => [article.title, article.excerpt, ...article.sections.flatMap((s) => [s.heading, ...(s.body ?? []), ...(s.list ?? []), ...(s.steps?.map((step) => step.text) ?? []), s.note ?? '']), ...article.faqs.flat()].join(' ').split(/\s+/).length

export const allArticles = articles.map((article) => ({
  author: team,
  review: 'pending',
  date: published,
  minutes: Math.max(2, Math.round(words(article) / 200)),
  ...article,
}))
