import { mockApi } from './mockApi'
import { searchProducts } from '../utils/productFilters.js'

export const productService = {
  getProducts: () => mockApi.getProducts(),
  getProductBySlug: (slug) => mockApi.getProductBySlug(slug),
  getCategories: () => mockApi.getProductCategories(),
  getCustomPackOptions: () => mockApi.getCustomPackOptions(),
  getSubscriptionOptions: () => mockApi.getSubscriptionOptions(),
  searchProducts: async (query) => searchProducts(await mockApi.getProducts(), query),
}
