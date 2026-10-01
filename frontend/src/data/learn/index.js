// The one place Learn pages get their content from. Swap these functions for CMS calls later; the pages stay the same.
import { categories, categoryBySlug, learnPromises } from './categories.js'
import { allArticles } from './articles.js'

export { categories, categoryBySlug, learnPromises }

export const articlesIn = (slug) => (slug ? allArticles.filter((article) => article.category === slug) : allArticles)
export const findArticle = (category, slug) => allArticles.find((article) => article.category === category && article.slug === slug) ?? null

// Same category first, then the featured guides of other categories.
export function relatedTo(article, limit = 4) {
  const same = allArticles.filter((other) => other.category === article.category && other.slug !== article.slug)
  const others = allArticles.filter((other) => other.category !== article.category && other.featured)
  return [...same, ...others].slice(0, limit)
}

export const articlePath = (article) => `/learn/${article.category}/${article.slug}`

export const formatDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
