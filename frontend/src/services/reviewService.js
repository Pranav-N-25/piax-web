// Calls to the PIAX reviews API (backend/reviews/routes.js). Writing needs the signed-in session cookie, which the
// browser sends automatically.

export class ReviewError extends Error {
  constructor(message, field, status) {
    super(message)
    this.field = field
    this.status = status
  }
}

async function call(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`/api/reviews${path}`, {
      method,
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ReviewError('You seem to be offline. Check your connection and try again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ReviewError(data.error || 'Something went wrong. Please try again.', data.field, res.status)
  return data
}

// Star summaries for the shop cards, fetched once per visit and shared by every card.
let summaries = null
export const reviewSummaries = () => {
  summaries ??= call('/summary').catch(() => ({}))
  return summaries
}
const forgetSummaries = () => { summaries = null }

export const reviewService = {
  list: (productId, sort) => call(`/${productId}?sort=${encodeURIComponent(sort)}`),
  save: (productId, review) => call(`/${productId}`, { method: 'POST', body: review }).finally(forgetSummaries),
  removeMine: (productId) => call(`/${productId}/mine`, { method: 'DELETE' }).finally(forgetSummaries),
  toggleHelpful: (id) => call(`/item/${id}/helpful`, { method: 'POST' }),
  comment: (id, body) => call(`/item/${id}/comments`, { method: 'POST', body: { body } }),
  removeComment: (id, commentId) => call(`/item/${id}/comments/${commentId}`, { method: 'DELETE' }),
}
