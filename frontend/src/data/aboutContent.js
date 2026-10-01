// Copy for the /about page, from the About page reference design supplied by PIAX.
// Figures, dates and the founder's details are company facts: confirm them before launch and edit them here only.
// Sustainability lines are worded as commitments, not product claims (see productCatalog.json `features`).

export const pillars = [
  { icon: 'Leaf', title: 'Our Mission', text: 'To make menstrual care healthier, more comfortable and more accessible for every woman.' },
  { icon: 'Target', title: 'Our Vision', text: 'A future where every woman experiences periods with confidence, comfort and dignity.' },
  { icon: 'Gem', title: 'Our Purpose', text: 'To combine thoughtful products, AI-powered support and education to improve menstrual and overall women’s health.' },
  { icon: 'Sprout', title: 'Our Impact', text: 'Healthier women. Stronger communities. Fewer awkward conversations.' },
]

export const founder = {
  name: 'Kamal Raj P',
  role: 'Founder & CEO',
  company: 'PIAX LIFE PRIVATE LIMITED',
  initials: 'KR',
  photo: null, // add the founder's portrait here (import it at the top of this file)
  story: [
    'PIAX was founded by Kamal Raj P with a simple belief — menstrual care should be more comfortable, more honest and easier to understand.',
    'Seeing how hard it was to find clear information and the right product, PIAX set out to bring better products, trusted information and technology-driven support to every woman.',
  ],
  quote: 'Periods are a natural part of life. Every woman deserves safe, comfortable care — with access to the right information and support.',
}

// Shown as "Our impact so far". Each figure needs a source before launch.
export const impact = [
  { icon: 'Users', value: '200+', label: 'Women in our pilot launch' },
  { icon: 'Heart', value: '95%', label: 'User satisfaction' },
  { icon: 'Leaf', value: '10,000+', label: 'Community followers' },
  { icon: 'UsersRound', value: '1L+', label: 'Women reached through our content' },
]

export const differences = [
  { icon: 'Feather', title: 'Thoughtful Products', text: 'Four sizes with a soft top sheet and 8-layer construction.', tone: 'mint' },
  { icon: 'BrainCircuit', title: 'AI-Powered Support', text: 'Personal insights through the PIAX app and PIAX AI.', tone: 'mint' },
  { icon: 'BookOpen', title: 'Trusted Education', text: 'Clear information in simple language.', tone: 'mint' },
  { icon: 'Heart', title: 'Women-Centric Approach', text: 'Designed for real needs and real lives.', tone: 'pink' },
]

export const journey = [
  { icon: 'Lightbulb', year: '2023', title: 'The Beginning', text: 'An idea to create more comfortable, more honest menstrual care.' },
  { icon: 'Settings', year: '2024', title: 'Product Development', text: 'Developed and tested our first product range, with a focus on safety and comfort.' },
  { icon: 'Rocket', year: '2025', title: 'Launch', text: 'Launched PIAX products and started building our community.' },
  { icon: 'ChartColumn', year: '2025+', title: 'A Bigger Impact', text: 'Expanding with AI, education and the PIAX app to reach more women.' },
]

// Commitments PIAX is working towards — not claims about today's products.
export const commitments = [
  { icon: 'Globe', text: 'Responsible sourcing' },
  { icon: 'Recycle', text: 'Less plastic waste' },
  { icon: 'BadgeCheck', text: 'Only validated product claims' },
  { icon: 'Heart', text: 'A healthier tomorrow' },
]
