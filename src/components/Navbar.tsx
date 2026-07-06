import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Download, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '@/data/profile'
import ThemeToggle from './ThemeToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-primary)_80%,transparent)] backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="focus-ring group flex items-center gap-2 rounded-lg"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] font-display text-sm font-bold text-[#0a0f14]">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold text-[var(--text-primary)] sm:block">
            {profile.name.split(' ')[0]}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <a
            href={profile.resumePath}
            download
            className="focus-ring hidden items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex"
          >
            <Download size={16} />
            Resume
          </a>
          <button
            type="button"
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--border)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'focus-ring rounded-lg px-3 py-3 text-base font-medium',
                      isActive
                        ? 'bg-[var(--bg-card)] text-[var(--accent)]'
                        : 'text-[var(--text-muted)]',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-[var(--border)] pt-4">
                <ThemeToggle />
                <a
                  href={profile.resumePath}
                  download
                  className="focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm font-medium"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
