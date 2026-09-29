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

  const update = (nextItems) => { setItems(nextItems); persistCart(nextItems) }
  const addItem = (product, quantity = 1) => update(addCartItem(items, product, quantity))
  const changeQuantity = (id, amount) => update(changeCartQuantity(items, id, amount))
  const removeItem = (id) => update(removeCartItem(items, id))
  const subtotal = getCartSubtotal(items)
  const value = { items, addItem, changeQuantity, removeItem, subtotal, total: getCartTotal(items), itemCount: getCartItemCount(items) }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
