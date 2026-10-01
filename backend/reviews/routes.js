// /api/reviews — customer reviews, star ratings and comments on PIAX products.
// Anyone can read. Writing (a review, a comment, a "helpful" vote) needs a signed-in account, and each person
// has one review per product. `verified` stays false until orders exist and a delivered order can be matched.
const express = require('express')
const { rateLimit } = require('express-rate-limit')
const { appUrl, isProduction } = require('../auth/config')
const { userStore, StoreUnavailableError } = require('../auth/userStore')
const { readSession } = require('../auth/tokens')
const { reviewStore } = require('./store')

const router = express.Router()

// The products that can be reviewed: the four pads and the PIAX Cycle Pack (frontend/src/data/productCatalog.json).
const PRODUCTS = new Set(['vera', 'luma', 'nocte', 'seren', 'cycle'])
const TAGS = { wear: ['Day', 'Night', 'Day & night'], flow: ['Light', 'Regular', 'Heavy', 'Very heavy'] }
const LIMITS = { title: 80, body: 1000, comment: 500 }
const MIN_BODY = 20

const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Too many changes. Please wait a few minutes and try again.' } })

// Same cross-site guard as /api/auth for anything that changes data.
const allowedOrigins = new Set([appUrl, ...(process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) ?? [])])
router.use((req, res, next) => {
  if (req.method === 'GET') return next()
  const { origin } = req.headers
  if (origin && !allowedOrigins.has(origin) && isProduction) return res.status(403).json({ error: 'Request not allowed.' })
  next()
})

const handle = (fn) => async (req, res) => {
  try {
    await fn(req, res)
  } catch (err) {
    if (err instanceof StoreUnavailableError) return res.status(503).json({ error: 'Reviews are not available right now. Please try again later.' })
    console.error('[reviews]', err.message)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}

async function currentUser(req) {
  const session = readSession(req)
  const user = session && await userStore.findById(session.sub)
  return user && user.tokenVersion === session.v ? user : null
}

const requireUser = (fn) => handle(async (req, res) => {
  const user = await currentUser(req)
  if (!user) return res.status(401).json({ error: 'Please log in to continue.' })
  await fn(req, res, user)
})

// "Priya S." — first name and last initial only, so reviews never show a full name, email or phone.
function displayName(user) {
  const parts = String(user.name ?? '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'PIAX customer'
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0]
}

const clean = (value, max) => String(value ?? '').trim().replace(/\s+\n/g, '\n').replace(/[ \t]+/g, ' ').slice(0, max)
// Reviews and comments are about the product: links are refused to keep spam out.
const hasLink = (text) => /(https?:\/\/|www\.)\S+/i.test(text)

function summarise(list) {
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  list.forEach((review) => { breakdown[review.rating] += 1 })
  const count = list.length
  const average = count ? Math.round((list.reduce((sum, review) => sum + review.rating, 0) / count) * 10) / 10 : 0
  return { count, average, breakdown }
}

// What the website may show about a review. Never user ids, and only the viewer learns which items are theirs.
const publicReview = (review, viewerId) => ({
  id: review.id,
  author: review.authorName,
  rating: review.rating,
  title: review.title,
  body: review.body,
  tags: review.tags,
  verified: review.verified,
  // Development preview data from scripts/seed-sample-reviews.js; the website labels it as not a real review.
  sample: Boolean(review.sample),
  createdAt: review.createdAt,
  edited: review.updatedAt !== review.createdAt,
  helpful: review.helpful.length,
  votedHelpful: Boolean(viewerId && review.helpful.includes(viewerId)),
  mine: Boolean(viewerId && review.userId === viewerId),
  comments: review.comments.map((comment) => ({ id: comment.id, author: comment.authorName, body: comment.body, createdAt: comment.createdAt, mine: Boolean(viewerId && comment.userId === viewerId) })),
})

const sorters = {
  helpful: (a, b) => b.helpful.length - a.helpful.length || b.createdAt.localeCompare(a.createdAt),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  highest: (a, b) => b.rating - a.rating || b.createdAt.localeCompare(a.createdAt),
  lowest: (a, b) => a.rating - b.rating || b.createdAt.localeCompare(a.createdAt),
}

// Star summary for every product at once, for the shop cards.
router.get('/summary', handle(async (req, res) => {
  const all = await reviewStore.all()
  res.json(Object.fromEntries([...PRODUCTS].map((id) => {
    const { count, average } = summarise(all.filter((review) => review.productId === id))
    return [id, { count, average }]
  })))
}))

router.get('/:productId', handle(async (req, res) => {
  const { productId } = req.params
  if (!PRODUCTS.has(productId)) return res.status(404).json({ error: 'Product not found.' })
  const viewer = await currentUser(req)
  const list = await reviewStore.forProduct(productId)
  const sort = sorters[req.query.sort] ?? sorters.helpful
  res.json({ summary: summarise(list), reviews: [...list].sort(sort).map((review) => publicReview(review, viewer?.id)) })
}))

router.post('/:productId', writeLimiter, requireUser(async (req, res, user) => {
  const { productId } = req.params
  if (!PRODUCTS.has(productId)) return res.status(404).json({ error: 'Product not found.' })
  const rating = Number(req.body?.rating)
  const title = clean(req.body?.title, LIMITS.title)
  const body = clean(req.body?.body, LIMITS.body)
  const wear = TAGS.wear.includes(req.body?.tags?.wear) ? req.body.tags.wear : null
  const flow = TAGS.flow.includes(req.body?.tags?.flow) ? req.body.tags.flow : null
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ error: 'Please choose a star rating.', field: 'rating' })
  if (body.length < MIN_BODY) return res.status(400).json({ error: `Please write at least ${MIN_BODY} characters about your experience.`, field: 'body' })
  if (hasLink(title) || hasLink(body)) return res.status(400).json({ error: 'Please leave out links.', field: 'body' })
  const review = await reviewStore.upsert(productId, user.id, { authorName: displayName(user), rating, title, body, tags: { wear, flow } })
  res.status(201).json({ review: publicReview(review, user.id) })
}))

router.delete('/:productId/mine', writeLimiter, requireUser(async (req, res, user) => {
  const review = await reviewStore.findByUser(req.params.productId, user.id)
  if (review) await reviewStore.remove(review.id)
  res.json({ ok: true })
}))

router.post('/item/:id/helpful', writeLimiter, requireUser(async (req, res, user) => {
  const review = await reviewStore.findById(req.params.id)
  if (!review) return res.status(404).json({ error: 'Review not found.' })
  if (review.userId === user.id) return res.status(400).json({ error: 'You can’t vote on your own review.' })
  const updated = await reviewStore.toggleHelpful(review.id, user.id)
  res.json({ review: publicReview(updated, user.id) })
}))

router.post('/item/:id/comments', writeLimiter, requireUser(async (req, res, user) => {
  const review = await reviewStore.findById(req.params.id)
  if (!review) return res.status(404).json({ error: 'Review not found.' })
  const body = clean(req.body?.body, LIMITS.comment)
  if (body.length < 2) return res.status(400).json({ error: 'Please write a comment.', field: 'comment' })
  if (hasLink(body)) return res.status(400).json({ error: 'Please leave out links.', field: 'comment' })
  const updated = await reviewStore.addComment(review.id, { userId: user.id, authorName: displayName(user), body })
  res.status(201).json({ review: publicReview(updated, user.id) })
}))

router.delete('/item/:id/comments/:commentId', writeLimiter, requireUser(async (req, res, user) => {
  const review = await reviewStore.findById(req.params.id)
  const comment = review?.comments.find((item) => item.id === req.params.commentId)
  if (!comment) return res.status(404).json({ error: 'Comment not found.' })
  if (comment.userId !== user.id) return res.status(403).json({ error: 'You can only delete your own comments.' })
  const updated = await reviewStore.removeComment(review.id, comment.id)
  res.json({ review: publicReview(updated, user.id) })
}))

module.exports = router
