import { profile } from '@/data/profile'

export default function StatsStrip() {
  const stats = [
    { value: profile.stats.projects, label: 'Projects shipped' },
    { value: profile.stats.years, label: 'Years building' },
    { value: profile.stats.technologies, label: 'Technologies' },
    { value: '4', label: 'Platforms' },
  ]

  return (
    <div className="flex flex-wrap gap-6 md:gap-10">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center md:text-left">
          <p className="font-display text-2xl font-bold text-gradient md:text-3xl">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
