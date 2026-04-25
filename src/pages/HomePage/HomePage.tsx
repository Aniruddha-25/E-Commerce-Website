import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../../components/ProductCard'
import { fetchProducts, splitProductsByCategory } from '../../services/products'
import type { Product } from '../../types/product'
import img1 from '../../assets/legacy/img1.png'
import img2 from '../../assets/legacy/img2.png'
import img3 from '../../assets/legacy/img3.png'
import img4 from '../../assets/legacy/img4.png'

const heroSlides = [img1, img2, img3, img4]

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

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

        setError('Unable to load products right now.')
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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 3500)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  const groupedProducts = useMemo(() => splitProductsByCategory(products), [products])

  if (loading) {
    return <p className="state-message">Loading products...</p>
  }

  if (error) {
    return <p className="state-message state-message--error">{error}</p>
  }

  return (
    <div className="page-content">
      <section className="hero-banner" aria-label="Promotional banners">
        {heroSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={`Promotional banner ${index + 1}`}
            className={`hero-banner__image ${index === activeSlide ? 'is-active' : ''}`}
          />
        ))}
        <div className="hero-banner__dots" aria-hidden="true">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`hero-banner__dot ${index === activeSlide ? 'is-active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <h1>Clothing for Men and Women</h1>
        <div className="catalog-grid">
          {groupedProducts.clothing.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="catalog-section">
        <h1>Accessories for Men and Women</h1>
        <div className="catalog-grid">
          {groupedProducts.accessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
