import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { fetchProducts } from '../../services/products'
import type { CartLine, Product } from '../../types/product'
import { groupCartIds } from '../../utils/cart'
import { formatPrice } from '../../utils/format'

function buildCartLines(products: Product[], groupedIds: Record<string, number>): CartLine[] {
  return Object.entries(groupedIds)
    .map(([productId, quantity]) => {
      const product = products.find((item) => item.id === productId)
      if (!product) {
        return null
      }

      return { product, quantity }
    })
    .filter((line): line is CartLine => line !== null)
}

export function CartPage() {
  const { cartIds } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    fetchProducts()
      .then((items) => {
        if (!active) {
          return
        }

        setProducts(items)
      })
      .catch(() => {
        if (!active) {
          return
        }

        setError('Unable to load cart data right now.')
      })
      .finally(() => {
        if (!active) {
          return
        }

        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const groupedIds = useMemo(() => groupCartIds(cartIds), [cartIds])
  const cartLines = useMemo(() => buildCartLines(products, groupedIds), [products, groupedIds])
  const totalAmount = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [cartLines],
  )

  if (loading) {
    return <p className="state-message">Loading cart...</p>
  }

  if (error) {
    return <p className="state-message state-message--error">{error}</p>
  }

  return (
    <section className="checkout-page">
      <div>
        <h1>Checkout</h1>
        <h3>Total Items: {cartIds.length}</h3>

        {cartLines.length === 0 ? (
          <p className="state-message">Your cart is empty.</p>
        ) : (
          <div className="cart-lines">
            {cartLines.map((line) => (
              <article key={line.product.id} className="cart-line">
                <img src={line.product.preview} alt={line.product.name} />
                <div>
                  <h4>
                    {line.product.name} x {line.quantity}
                  </h4>
                  <p>Amount: {formatPrice(line.product.price * line.quantity)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <aside className="checkout-summary">
        <h2>Total Amount</h2>
        <p>{formatPrice(totalAmount)}</p>
        <Link
          to={cartLines.length === 0 ? '/cart' : '/order-placed'}
          className={`primary-button ${cartLines.length === 0 ? 'is-disabled' : ''}`}
          aria-disabled={cartLines.length === 0}
          onClick={(event) => {
            if (cartLines.length === 0) {
              event.preventDefault()
            }
          }}
        >
          Place Order
        </Link>
      </aside>
    </section>
  )
}
