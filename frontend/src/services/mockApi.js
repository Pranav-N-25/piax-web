import data from '../data/dummyData.json'

const wait = (value, delay = 220) => new Promise((resolve) => setTimeout(() => resolve(value), delay))

export const mockApi = {
  getProducts: () => wait(data.products),
  getProductBySlug: (slug) => wait(data.products.find((product) => product.slug === slug) || null),
  getArticles: () => wait(data.articles),
  getArticleBySlug: (category, slug) => wait(data.articles.find((article) => article.category === category && article.slug === slug) || null),
  getCategories: () => wait(data.categories),
  getProductCategories: () => wait(data.productCategories),
  getCustomPackOptions: () => wait(data.customPack, 0),
  getSubscriptionOptions: () => wait(data.subscription, 0),
  getUsers: () => wait(data.users),
  getOrders: () => wait(data.orders),
  getInsights: () => wait(data.insights),
  getAiResponse: (query) => {
    const normalized = query.toLowerCase()
    const key = Object.keys(data.aiResponses).find((candidate) => normalized.includes(candidate)) || 'default'
    return wait(data.aiResponses[key])
  },
}
