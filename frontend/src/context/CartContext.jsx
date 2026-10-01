import { createContext, useContext, useState } from 'react'
import {
  addCartItem,
  changeCartQuantity,
  getCartItemCount,
  getCartSubtotal,
  getCartTotal,
  persistCart,
  readCart,
  removeCartItem,
} from '../services/cartService.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  // Updates run on the latest cart, so quick repeated taps (+ + +) all count.
  const update = (change) => setItems((current) => persistCart(change(current)))
  const addItem = (product, quantity = 1) => update((current) => addCartItem(current, product, quantity))
  const changeQuantity = (id, amount) => update((current) => changeCartQuantity(current, id, amount))
  const removeItem = (id) => update((current) => removeCartItem(current, id))
  const subtotal = getCartSubtotal(items)
  const value = { items, addItem, changeQuantity, removeItem, subtotal, total: getCartTotal(items), itemCount: getCartItemCount(items) }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
