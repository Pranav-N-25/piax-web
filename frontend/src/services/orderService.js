import { mockApi } from './mockApi'

export const orderService = {
  getOrders: () => mockApi.getOrders(),
  createOrder: (items, total) => Promise.resolve({ id: `PX-${Date.now().toString().slice(-4)}`, status: 'Processing', date: 'Today', items: items.map((item) => item.name), total }),
}
