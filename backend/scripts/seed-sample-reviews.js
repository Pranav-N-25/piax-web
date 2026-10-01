// Development only: fills the local review store (backend/.data/reviews.json) with clearly labelled SAMPLE reviews,
// so the reviews section can be previewed with several reviewers, ratings and comments. Every sample is flagged
// `sample: true` and the website marks it "Sample — not a real review". Never run against real data.
//
//   node scripts/seed-sample-reviews.js           # add samples (replaces earlier samples)
//   node scripts/seed-sample-reviews.js --clear   # remove all samples, keep real reviews
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

if (process.env.NODE_ENV === 'production') {
  console.error('Refusing to seed sample reviews in production.')
  process.exit(1)
}

const FILE = path.join(__dirname, '..', '.data', 'reviews.json')
const existing = (() => { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')) } catch { return [] } })()
const real = existing.filter((review) => !review.sample)

if (process.argv.includes('--clear')) {
  fs.writeFileSync(FILE, JSON.stringify(real, null, 2))
  console.log(`Removed ${existing.length - real.length} sample reviews. ${real.length} real reviews kept.`)
  process.exit(0)
}

const PRODUCTS = ['vera', 'luma', 'nocte', 'seren', 'cycle']
// Ratings per product: a spread, so the star breakdown shows every bar.
const RATINGS = [5, 4, 5, 3, 4, 5, 2, 4]
const WEAR = ['Day', 'Night', 'Day & night']
const FLOW = ['Light', 'Regular', 'Heavy', 'Very heavy']
const daysAgo = (days) => new Date(Date.now() - days * 86400000).toISOString()
const reviewer = (n) => ({ id: `sample-user-${n}`, name: `Sample reviewer ${n}` })

const samples = PRODUCTS.flatMap((productId, p) => RATINGS.map((rating, i) => {
  const author = reviewer(i + 1)
  const created = daysAgo(3 + i * 6 + p)
  const commenters = i % 3 === 0 ? [reviewer(((i + 2) % 8) + 1), reviewer(((i + 5) % 8) + 1)] : []
  return {
    id: crypto.randomUUID(),
    productId,
    userId: author.id,
    authorName: author.name,
    sample: true,
    verified: false,
    rating,
    title: `Sample ${rating}-star review`,
    body: `Sample review text for previewing the layout (${rating} of 5 stars). A real review would describe comfort, fit, coverage and whether the reviewer would buy again.`,
    tags: { wear: WEAR[i % WEAR.length], flow: FLOW[(i + p) % FLOW.length] },
    helpful: Array.from({ length: (i * 3 + p) % 6 }, (_, n) => `sample-voter-${n}`),
    comments: commenters.map((c, n) => ({ id: crypto.randomUUID(), userId: c.id, authorName: c.name, body: `Sample comment ${n + 1} for previewing comment threads.`, createdAt: daysAgo(1 + n) })),
    createdAt: created,
    updatedAt: created,
  }
}))

fs.mkdirSync(path.dirname(FILE), { recursive: true })
fs.writeFileSync(FILE, JSON.stringify([...real, ...samples], null, 2))
console.log(`Added ${samples.length} sample reviews across ${PRODUCTS.length} products (${real.length} real reviews kept). Restart the API to load them.`)
