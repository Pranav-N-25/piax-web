const CART_STORAGE_KEY = 'piax-cart'

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
      ? { ...item, quantity: item.quantity + quantity }
      : item)
  }

  return [...items, { ...product, quantity }]
}

export function changeCartQuantity(items, id, amount) {
  return items.map((item) => item.id === id
    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
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
