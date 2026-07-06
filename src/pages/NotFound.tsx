import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import SEO from '@/components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />

      <section className="flex min-h-[60vh] items-center justify-center px-4 py-20">
        <div className="text-center">
          <p className="font-mono text-6xl font-bold text-gradient md:text-8xl">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
            Page not found
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">
            This route doesn&apos;t exist — but plenty of projects do.
          </p>
          <Link
            to="/"
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-3 font-semibold text-[#0a0f14]"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  )
}
