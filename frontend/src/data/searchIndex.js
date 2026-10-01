// Everything the header search can find: pads, pack sizes, pages, FAQ answers and PIAX app features.
// Built from the same data the pages use, so results never drift from what the site shows.
import { combo, pads, standardPack } from './piaxRange.js'
import { faqs } from './faqs.js'
import { appFeatures, appLinks } from './appFeatures.js'
import { articlePath, articlesIn, categories } from './learn/index.js'

const padEntries = pads.map((pad) => ({
  id: `pad-${pad.id}`,
  type: 'Pad',
  title: `${pad.name} · ${pad.variant}`,
  text: `${pad.size} · ${pad.lengthLabel} · ${pad.flow}. ${pad.text}`,
  keywords: `${pad.id} ${pad.size} ${pad.length} ${pad.lengthLabel} ${pad.flow} ${pad.flowTags.join(' ')} ${pad.wear} ${pad.variant} sanitary pad pads napkin`,
  to: `/products#pad-${pad.id}`,
  image: standardPack(pad).image,
}))

const packEntries = [{
  id: 'pack-cycle',
  type: 'Pack',
  title: `${combo.name} · ${combo.count} pads · ₹${combo.price}`,
  text: combo.text,
  keywords: `cycle pack combo mix match custom customise customize mixed sizes ${combo.count} pack box price value ${combo.presets.map((preset) => preset.name).join(' ')}`,
  to: combo.path,
  image: combo.image,
}]

const pageEntries = [
  { id: 'page-shop', title: 'Shop PIAX pads', text: 'All four sizes, the Cycle Pack, prices and a side-by-side comparison.', keywords: 'shop buy products range price compare cart order', to: '/products' },
  { id: 'page-compare', title: 'Compare pads', text: 'See sizes, lengths and price per pad side by side.', keywords: 'compare comparison difference which size', to: '/products#compare' },
  { id: 'page-find', title: 'Find My Pad quiz', text: 'Answer a few questions and get your size and cycle kit.', keywords: 'find my pad size quiz recommend match which', to: '/find-my-pad' },
  { id: 'page-about', title: 'About PIAX', text: 'Our mission, founder’s story and journey.', keywords: 'about company founder mission story team piax life', to: '/about' },
  { id: 'page-business', title: 'PIAX for Business', text: 'Bulk quotes for retailers, distributors, schools, workplaces and NGOs.', keywords: 'business bulk wholesale distributor retailer school ngo csr institutional partner', to: '/business' },
  { id: 'page-app', title: 'Get the PIAX app', text: 'Track your cycle, ask PIAX AI and get pads delivered.', keywords: 'app download android ios play store mobile', to: '/#download' },
].map((entry) => ({ ...entry, type: 'Page' }))

const faqEntries = faqs.map(([question, answer], index) => ({
  id: `faq-${index}`,
  type: 'FAQ',
  title: question,
  text: answer,
  keywords: 'question help faq',
  to: `/?faq=${index}#faq`,
}))

const appEntries = appFeatures.map((feature) => ({
  id: `app-${feature.key}`,
  type: 'PIAX app',
  title: feature.title,
  text: feature.text,
  keywords: `app ${feature.key.replace('-', ' ')}`,
  href: appLinks.web,
}))

const articleEntries = articlesIn().map((article) => ({
  id: `article-${article.slug}`,
  type: 'Article',
  title: article.title,
  text: article.excerpt,
  keywords: `${article.category.replace('-', ' ')} ${article.topic} learn guide ${article.sections.map((section) => section.heading).join(' ')}`,
  to: articlePath(article),
}))

const learnEntries = categories.map((category) => ({
  id: `learn-${category.slug}`,
  type: 'Page',
  title: `Learn: ${category.name}`,
  text: category.description,
  keywords: `learn education guide ${category.topics.join(' ')}`,
  to: `/learn/${category.slug}`,
}))

export const searchIndex = [...padEntries, ...packEntries, ...pageEntries, ...learnEntries, ...articleEntries, ...faqEntries, ...appEntries]

// Shown before anything is typed, and when nothing matches.
export const popularSearches = ['Night pads', 'Heavy flow', 'Cycle Pack', 'Which size?', 'Bulk order', 'Track my cycle']
