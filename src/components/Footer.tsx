import { Link } from 'react-router-dom'
import { FolderGit2, Globe, Mail } from 'lucide-react'
import { profile } from '@/data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] font-display text-sm font-bold text-[#0a0f14]">
              {profile.initials}
            </div>
            <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{profile.title}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{profile.location}</p>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
              Navigate
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/projects', label: 'Projects' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
              Connect
            </p>
            <div className="flex gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="GitHub"
              >
                <FolderGit2 size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="LinkedIn"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="font-mono text-xs">Built with React + Vite</p>
        </div>
      </div>
    </footer>
  )
}
