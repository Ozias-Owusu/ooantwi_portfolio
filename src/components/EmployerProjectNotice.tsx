import { Shield } from 'lucide-react'
import { EMPLOYER_PROJECT_DISCLAIMER } from '@/data/projects'

export default function EmployerProjectNotice() {
  return (
    <div
      className="mb-8 flex gap-3 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-4 md:p-5"
      role="note"
    >
      <Shield
        size={20}
        className="mt-0.5 shrink-0 text-[var(--accent)]"
        aria-hidden
      />
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
        {EMPLOYER_PROJECT_DISCLAIMER}
      </p>
    </div>
  )
}
