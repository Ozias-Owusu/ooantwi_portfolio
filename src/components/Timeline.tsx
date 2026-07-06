import { timeline } from '@/data/timeline'
import ScrollReveal from './ScrollReveal'

const typeColors = {
  work: 'var(--accent)',
  leadership: 'var(--accent-2)',
  education: '#8b5cf6',
}

export default function Timeline() {
  return (
    <div className="relative space-y-0">
      <div className="absolute bottom-0 left-[7px] top-2 w-px bg-[var(--border)] md:left-[11px]" />
      {timeline.map((entry, i) => (
        <ScrollReveal key={`${entry.org}-${entry.title}`} delay={i * 0.08}>
          <div className="relative flex gap-4 pb-8 md:gap-6">
            <div
              className="relative z-10 mt-1.5 h-4 w-4 shrink-0 rounded-full border-2 md:h-6 md:w-6"
              style={{
                borderColor: typeColors[entry.type],
                backgroundColor: 'var(--bg-primary)',
              }}
            />
            <div className="glass-card flex-1 rounded-2xl p-5">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {entry.period}
                </span>
                <span className="text-xs text-[var(--text-muted)]">·</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {entry.org}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{entry.notes}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
