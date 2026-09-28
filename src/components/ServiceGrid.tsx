import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { services } from '@/data/services'
import { getProjectBySlug } from '@/data/projects'

export default function ServiceGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service, i) => {
        const Icon = service.icon
        const proof = service.proofSlugs
          .map(getProjectBySlug)
          .filter((p) => p !== undefined)

        return (
          <ScrollReveal key={service.id} delay={i * 0.08}>
            <div className="glass-card flex h-full flex-col rounded-2xl p-6 md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <Icon size={24} />
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                {service.title}
              </h3>
              <p className="mt-2 text-[var(--text-muted)]">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[var(--text-primary)]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
              {proof.length > 0 && (
                <p className="mt-auto pt-5 text-sm text-[var(--text-muted)]">
                  See it in:{' '}
                  {proof.map((p, idx) => (
                    <span key={p.slug}>
                      <Link
                        to={`/projects/${p.slug}`}
                        className="focus-ring text-[var(--accent)] hover:underline"
                      >
                        {p.displayName}
                      </Link>
                      {idx < proof.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
