// Site search over data/searchIndex.js. A query word matches when it starts a word in the entry ("xl" matches XL
// but not XXL). Most query words must match; title matches count most, so the best answer comes first.
const words = (text) => String(text).toLowerCase().normalize('NFKD').replace(/[^\p{Letter}\p{Number}]+/gu, ' ').trim().split(' ').filter(Boolean)

// Light plural folding so "pads" finds "pad" and "nights" finds "night".
const stem = (word) => (word.length > 3 && word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word)

const prepared = new WeakMap()
function fieldsOf(entry) {
  if (!prepared.has(entry)) {
    prepared.set(entry, {
      title: words(entry.title).map(stem),
      text: words(entry.text).map(stem),
      keywords: words(entry.keywords ?? '').map(stem),
    })
  }
  return prepared.get(entry)
}

const hits = (list, term) => list.some((word) => word.startsWith(term))

// Filler words people type in questions ("which size for night?"); ignored unless the query is only filler.
const STOP = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'do', 'does', 'i', 'me', 'my', 'how', 'what', 'which', 'when', 'where', 'why', 'can', 'should', 'with', 'about'])

export function search(index, query, limit = Infinity) {
  const all = words(query).map(stem)
  const meaningful = all.filter((term) => !STOP.has(term))
  const terms = meaningful.length ? meaningful : all
  if (terms.length === 0) return []
  return index
    .map((entry) => {
      const { title, text, keywords } = fieldsOf(entry)
      let score = 0
      let matched = 0
      for (const term of terms) {
        if (hits(title, term)) score += title.includes(term) ? 6 : 4
        else if (hits(keywords, term)) score += 3
        else if (hits(text, term)) score += 1
        else continue
        matched += 1
      }
      // Most of the words must match (all of them for one- or two-word searches).
      if (matched < Math.max(1, Math.ceil(terms.length * 0.6))) return null
      return { entry, score: score + matched * 2 }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry)
}
