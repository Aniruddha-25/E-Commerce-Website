import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from "./components/Layout/Layout";
import { CartProvider } from './context/CartContext'
import { CartPage } from './pages/CartPage/CartPage'
import { HomePage } from './pages/HomePage/HomePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { OrderPlacedPage } from './pages/OrderPlacedPage/OrderPlacedPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order-placed" element={<OrderPlacedPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App
