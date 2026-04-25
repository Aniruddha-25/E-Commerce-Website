import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { submitOrder } from '../../services/orders'

export function OrderPlacedPage() {
  const { cartIds, clearItems } = useCart()

  const orderPayload = useMemo(
    () => ({
      amount: cartIds.length,
      product: cartIds,
    }),
    [cartIds],
  )

  useEffect(() => {
    if (cartIds.length === 0) {
      return
    }

    void submitOrder(orderPayload)
    clearItems()
  }, [cartIds.length, clearItems, orderPayload])

  return (
    <section className="order-placed-page">
      <div className="order-placed-page__check">✔</div>
      <h1>Order Placed Successfully!</h1>
      <p>We&apos;ve sent you an email with the order details.</p>
      <Link to="/" className="primary-button">
        Continue Shopping
      </Link>
    </section>
  )
}
