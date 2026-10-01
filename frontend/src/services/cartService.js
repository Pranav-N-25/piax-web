const CART_STORAGE_KEY = 'piax-cart'
// Most of one item a single order can hold; matches the quantity steppers.
export const MAX_ITEM_QUANTITY = 10
const clamp = (quantity) => Math.max(1, Math.min(MAX_ITEM_QUANTITY, quantity))

export function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function persistCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  return items
}

export function addCartItem(items, product, quantity = 1) {
  if (items.some((item) => item.id === product.id)) {
    return items.map((item) => item.id === product.id
      ? { ...item, quantity: clamp(item.quantity + quantity) }
      : item)
  }

  return [...items, { ...product, quantity: clamp(quantity) }]
}

export function changeCartQuantity(items, id, amount) {
  return items.map((item) => item.id === id
    ? { ...item, quantity: clamp(item.quantity + amount) }
    : item)
}

export function removeCartItem(items, id) {
  return items.filter((item) => item.id !== id)
}

export function getCartSubtotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartTotal(items) {
  const subtotal = getCartSubtotal(items)
  return subtotal + (subtotal ? 40 : 0)
}

export function getCartItemCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0)
}
