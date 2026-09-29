// Pure helpers for product discovery. None of these mutate the source list.

export const emptyFilters = { flows: [], sizes: [], types: [], features: [] }

export const filterOptions = {
  flows: [
    { value: 'Light', label: 'Light Flow' },
    { value: 'Moderate', label: 'Moderate Flow' },
    { value: 'Heavy', label: 'Heavy Flow' },
  ],
  sizes: [
    { value: 'S', label: 'S (240mm)' },
    { value: 'M', label: 'M (260mm)' },
    { value: 'L', label: 'L (275mm)' },
    { value: 'XL', label: 'XL (290mm)' },
    { value: 'XXL', label: 'XXL (320mm)' },
    { value: 'XXXL', label: 'XXXL (360mm)' },
  ],
  types: [
    { value: 'Day Pads', label: 'Day Pads' },
    { value: 'Night Pads', label: 'Night Pads' },
    { value: 'Panty Liners', label: 'Panty Liners' },
    { value: 'Custom Pack', label: 'Custom Pack' },
  ],
  features: ['Ultra-Thin', 'Anion Infused', '8-Layer Protection', 'Compostable', 'Rash-Free', 'Fragrance-Free']
    .map((value) => ({ value, label: value })),
}

export const sortOptions = [
  { value: 'best', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Rating' },
]

const overlaps = (selected, values) => selected.length === 0 || selected.some((value) => values.includes(value))

export function countActiveFilters(filters) {
  return Object.values(filters).reduce((total, values) => total + values.length, 0)
}

// Flow, size and type match any selected value; features must all be present.
export function filterProducts(products, { category = 'all', filters = emptyFilters } = {}) {
  return products.filter((product) => (
    (category === 'all' || product.collections.includes(category))
    && overlaps(filters.flows, product.flows)
    && overlaps(filters.sizes, product.sizes)
    && overlaps(filters.types, [product.type])
    && filters.features.every((feature) => product.features.includes(feature))
  ))
}

const words = (text) => text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)

const searchWords = (product) => words([
  product.name, product.subtitle, product.type, product.category, product.size, product.length,
  ...product.sizes, ...product.flows, ...product.features, ...product.collections,
].join(' '))

// Every query word must start a word in the product's text, so "XL" matches XL but not XXL.
export function searchProducts(products, query = '') {
  const queryWords = words(query)
  if (queryWords.length === 0) return products
  return products.filter((product) => {
    const productWords = searchWords(product)
    return queryWords.every((word) => {
      const singular = word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word
      return productWords.some((candidate) => candidate.startsWith(singular))
    })
  })
}

export function sortProducts(products, sort) {
  const sorted = [...products]
  switch (sort) {
    case 'price-asc': return sorted.sort((a, b) => a.price - b.price || a.popularity - b.popularity)
    case 'price-desc': return sorted.sort((a, b) => b.price - a.price || a.popularity - b.popularity)
    case 'newest': return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    default: return sorted.sort((a, b) => a.popularity - b.popularity)
  }
}

export const discountPercent = (product) => (product.mrp && product.mrp > product.price
  ? Math.round((1 - product.price / product.mrp) * 100)
  : 0)
