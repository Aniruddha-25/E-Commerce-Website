import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/format'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.preview} alt={product.name} className="product-card__image" />
        <div className="product-card__details">
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <strong>{formatPrice(product.price)}</strong>
        </div>
      </Link>
    </article>
  )
}
