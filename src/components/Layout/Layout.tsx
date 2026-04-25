import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'

export function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
