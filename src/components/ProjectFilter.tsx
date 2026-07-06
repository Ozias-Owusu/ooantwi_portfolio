import { Search } from 'lucide-react'
import type { FilterCategory } from '@/data/projects'
import { filterCategories } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectFilterProps {
  active: FilterCategory
  onCategoryChange: (category: FilterCategory) => void
  search: string
  onSearchChange: (value: string) => void
  resultCount: number
}

export default function ProjectFilter({
  active,
  onCategoryChange,
  search,
  onSearchChange,
  resultCount,
}: ProjectFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-all',
              active === cat
                ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--accent)]/50',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or tech..."
            className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            aria-label="Search projects"
          />
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          {resultCount} project{resultCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
