// Product reviews. Same shape as auth/userStore.js: one small async interface, so this development store can be
// swapped for the PostgreSQL/Prisma store (models Review, ReviewComment, ReviewHelpful in prisma/schema.prisma)
// without touching the routes.
//
// Development store: reviews kept in memory and saved to backend/.data/reviews.json (gitignored). Refused in
// production, where local files are not durable — set up the database store before launch.
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { isProduction } = require('../auth/config')
const { StoreUnavailableError } = require('../auth/userStore')

const FILE = path.join(__dirname, '..', '.data', 'reviews.json')

let reviews = null
let writing = Promise.resolve()

function load() {
  if (isProduction) throw new StoreUnavailableError('The development review store is disabled in production. Configure the database store.')
  if (reviews) return reviews
  try {
    reviews = new Map(JSON.parse(fs.readFileSync(FILE, 'utf8')).map((review) => [review.id, review]))
  } catch {
    reviews = new Map()
  }
  return reviews
}

// Saves are queued so two quick writes never interleave; written to a temp file, then renamed into place.
function save() {
  const snapshot = JSON.stringify([...reviews.values()], null, 2)
  writing = writing.then(async () => {
    await fs.promises.mkdir(path.dirname(FILE), { recursive: true })
    const temp = `${FILE}.${process.pid}.tmp`
    await fs.promises.writeFile(temp, snapshot, { mode: 0o600 })
    await fs.promises.rename(temp, FILE)
  })
  return writing
}

const now = () => new Date().toISOString()

const reviewStore = {
  async forProduct(productId) { return [...load().values()].filter((review) => review.productId === productId) },
  async all() { return [...load().values()] },
  async findById(id) { return load().get(id) ?? null },
  async findByUser(productId, userId) { return [...load().values()].find((review) => review.productId === productId && review.userId === userId) ?? null },

  // One review per person per product: writing again replaces their earlier review (comments and helpful votes stay).
  async upsert(productId, userId, fields) {
    const existing = await this.findByUser(productId, userId)
    if (existing) {
      Object.assign(existing, fields, { updatedAt: now() })
    } else {
      const review = { id: crypto.randomUUID(), productId, userId, verified: false, helpful: [], comments: [], createdAt: now(), updatedAt: now(), ...fields }
      load().set(review.id, review)
    }
    await save()
    return this.findByUser(productId, userId)
  },

  async remove(id) {
    load().delete(id)
    await save()
  },

  async toggleHelpful(id, userId) {
    const review = load().get(id)
    if (!review) return null
    review.helpful = review.helpful.includes(userId) ? review.helpful.filter((voter) => voter !== userId) : [...review.helpful, userId]
    await save()
    return review
  },

  async addComment(id, comment) {
    const review = load().get(id)
    if (!review) return null
    review.comments.push({ id: crypto.randomUUID(), createdAt: now(), ...comment })
    await save()
    return review
  },

  async removeComment(id, commentId) {
    const review = load().get(id)
    if (!review) return null
    review.comments = review.comments.filter((comment) => comment.id !== commentId)
    await save()
    return review
  },
}

module.exports = { reviewStore }
