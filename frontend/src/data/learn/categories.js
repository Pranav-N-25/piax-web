// PIAX Learn: the eight menstrual-care categories (CLAUDE.md §17) and the topics that filter each one.
// Content is kept here until the CMS exists; pages read it only through data/learn/index.js.
import firstPeriod from '../../assets/learn/first-period.webp'
import menstrualCycle from '../../assets/learn/menstrual-cycle.webp'
import periodCare from '../../assets/learn/period-care.webp'
import flowProducts from '../../assets/learn/flow-products.webp'
import periodPain from '../../assets/learn/period-pain.webp'
import pmsSymptoms from '../../assets/learn/pms-symptoms.webp'
import hygiene from '../../assets/learn/hygiene.webp'
import mythsFacts from '../../assets/learn/myths-facts.webp'

// icon: a lucide-react icon name, resolved by components/learn/LearnIcon.jsx. tone: a homeStyles tone.
export const categories = [
  {
    slug: 'first-period', name: 'First Period', icon: 'Smile', tone: 'rose', image: firstPeriod,
    description: 'Everything you need to know about your first period: how to prepare for it, what to expect, and how to feel more confident.',
    note: 'A new chapter, and it’s okay.',
    topics: ['Understanding', 'Getting ready', 'Talking about it'],
  },
  {
    slug: 'menstrual-cycle', name: 'Menstrual Cycle', icon: 'RefreshCw', tone: 'mint', image: menstrualCycle,
    description: 'Understand the four phases of your cycle, what happens in your body, and how it can affect your mood and health.',
    note: 'Know your rhythm.',
    topics: ['Cycle basics', 'Phases explained', 'Irregular cycles'],
  },
  {
    slug: 'period-care', name: 'Period Care', icon: 'Feather', tone: 'sage', image: periodCare,
    description: 'Practical, easy-to-follow guidance to help you feel clean, comfortable and confident during your period.',
    note: 'Care for every day of your period.',
    topics: ['Using pads', 'Day vs night', 'On the go'],
  },
  {
    slug: 'flow-products', name: 'Flow & Products', icon: 'Droplet', tone: 'pink', image: flowProducts,
    description: 'Understand your flow and choose the size and pack that suit each day of your period.',
    note: 'The right fit, every day.',
    topics: ['Understanding flow', 'Choosing a size'],
  },
  {
    slug: 'period-pain', name: 'Period Pain', icon: 'Zap', tone: 'peach', image: periodPain,
    description: 'Why cramps happen, what’s normal, simple ways to feel better, and when to see a doctor.',
    note: 'Understand your body. Care for your period.',
    topics: ['Why it happens', 'Easing pain', 'When to get help'],
  },
  {
    slug: 'pms-symptoms', name: 'PMS & Symptoms', icon: 'Flower2', tone: 'lilac', image: pmsSymptoms,
    description: 'The physical and emotional changes before your period, and gentle ways to look after yourself.',
    note: 'Be gentle with yourself.',
    topics: ['Understanding PMS', 'Mood & energy'],
  },
  {
    slug: 'hygiene', name: 'Hygiene', icon: 'Leaf', tone: 'mint', image: hygiene,
    description: 'Simple, effective menstrual hygiene habits to stay clean, healthy and comfortable during your period.',
    note: 'Clean habits. A healthier you.',
    topics: ['Daily hygiene', 'Disposal'],
  },
  {
    slug: 'myths-facts', name: 'Myths & Facts', icon: 'CircleHelp', tone: 'cream', image: mythsFacts,
    description: 'Common period myths, and what’s actually true, in plain language.',
    note: 'Same questions. Honest answers.',
    topics: ['Everyday myths', 'Body & health'],
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug, category]))

// The three promises shown under every category title.
export const learnPromises = [
  { icon: 'BookOpen', text: 'Simple, clear explanations' },
  { icon: 'ShieldCheck', text: 'Calm, judgement-free guidance' },
  { icon: 'Heart', text: 'Practical tips for everyday life' },
]
