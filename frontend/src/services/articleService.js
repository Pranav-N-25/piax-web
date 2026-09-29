import { mockApi } from './mockApi'

export const articleService = {
  getArticles: () => mockApi.getArticles(),
  getArticleBySlug: (category, slug) => mockApi.getArticleBySlug(category, slug),
  getCategories: () => mockApi.getCategories(),
}
