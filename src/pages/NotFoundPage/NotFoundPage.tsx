import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="state-message">
      <h1>Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="primary-button">
        Go to Home
      </Link>
    </section>
  )
}
