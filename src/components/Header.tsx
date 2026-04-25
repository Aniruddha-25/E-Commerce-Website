import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export function Header() {
  const { cartCount } = useCart()

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__bold">SHOP</span>LANE
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" className="main-nav__link">
            CLOTHING
          </NavLink>
          <NavLink to="/" className="main-nav__link">
            ACCESSORIES
          </NavLink>
        </nav>

        <div className="header-search">
          <input
            type="search"
            placeholder="Search for Clothing and Accessories"
            disabled
            aria-label="Search products"
          />
        </div>

        <Link to="/cart" className="cart-link" aria-label="Open cart">
          <i className="fa-solid fa-cart-shopping cart-link__icon" aria-hidden="true" />
          <span className="cart-link__badge">{cartCount}</span>
        </Link>
      </div>
    </header>
  )
}
