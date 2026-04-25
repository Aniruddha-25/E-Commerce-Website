import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { fetchProductById } from '../../services/products'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/format'

export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedPreview, setSelectedPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) {
      setError('Invalid product id')
      setLoading(false)
      return
    }

    let active = true

    fetchProductById(productId)
      .then((item) => {
        if (!active) {
          return
        }

        setProduct(item)
        setSelectedPreview(item.preview)
      })
      .catch(() => {
        if (!active) {
          return
        }

        setError('Unable to load product details.')
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
  }, [productId])

  if (loading) {
    return <p className="state-message">Loading product details...</p>
  }

  if (error || !product) {
    return <p className="state-message state-message--error">{error ?? 'Product not found.'}</p>
  }

  return (
    <section className="details-page">
      <div className="details-page__image">
        <img src={selectedPreview} alt={product.name} />
      </div>

      <div className="details-page__content">
        <h1>{product.name}</h1>
        <p className="muted-text">{product.brand}</p>

        <h2>{formatPrice(product.price)}</h2>

        <h3>Description</h3>
        <p>{product.description}</p>

        <h3>Product Preview</h3>
        <div className="preview-strip">
          {product.photos.map((photo) => (
            <button
              key={photo}
              type="button"
              className={`preview-thumb ${photo === selectedPreview ? 'is-active' : ''}`}
              onClick={() => setSelectedPreview(photo)}
            >
              <img src={photo} alt={`${product.name} preview`} />
            </button>
          ))}
        </div>

        <button type="button" className="primary-button" onClick={() => addItem(product.id)}>
          Add to Cart
        </button>
      </div>
    </section>
  )
}
