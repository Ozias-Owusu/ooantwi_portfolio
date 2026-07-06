import { cn } from '@/lib/utils'

interface TechBadgeProps {
  label: string
  className?: string
  accent?: boolean
}

export default function TechBadge({ label, className, accent }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs',
        accent
          ? 'border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]'
          : 'border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)]',
        className,
      )}
    >
      {label}
    </span>
  )
}
