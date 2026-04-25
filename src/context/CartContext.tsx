import { createContext, useContext, useMemo, useState } from 'react'
import { addToCartIds, clearCartStorage, readCartIds, writeCartIds } from '../utils/cart'

type CartContextValue = {
  cartIds: string[]
  cartCount: number
  addItem: (productId: string) => void
  clearItems: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

type CartProviderProps = {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartIds, setCartIds] = useState<string[]>(() => readCartIds())

  const addItem = (productId: string) => {
    setCartIds((current) => {
      const next = addToCartIds(current, productId)
      writeCartIds(next)
      return next
    })
  }

  const clearItems = () => {
    setCartIds([])
    clearCartStorage()
  }

  const value = useMemo<CartContextValue>(
    () => ({
      cartIds,
      cartCount: cartIds.length,
      addItem,
      clearItems,
    }),
    [cartIds],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
