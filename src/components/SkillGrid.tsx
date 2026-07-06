import ScrollReveal from './ScrollReveal'
import { skillCategories } from '@/data/skills'

export default function SkillGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((cat, i) => {
        const Icon = cat.icon
        return (
          <ScrollReveal key={cat.id} delay={i * 0.05}>
            <div className="glass-card h-full rounded-2xl p-5 transition-colors hover:border-[var(--accent)]/30">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-[var(--text-primary)]">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 font-mono text-xs text-[var(--text-muted)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
