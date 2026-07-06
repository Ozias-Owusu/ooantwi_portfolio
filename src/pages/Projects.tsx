import { useMemo, useState } from 'react'
import SEO from '@/components/SEO'
import SectionHeading from '@/components/SectionHeading'
import ProjectFilter from '@/components/ProjectFilter'
import ProjectCard from '@/components/ProjectCard'
import ScrollReveal from '@/components/ScrollReveal'
import { filterProjects, type FilterCategory } from '@/data/projects'

export default function Projects() {
  const [category, setCategory] = useState<FilterCategory>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => filterProjects(category, search),
    [category, search],
  )

  return (
    <>
      <SEO
        title="Projects"
        description="Portfolio of 20+ web, mobile, and backend projects — marketplaces, enterprise apps, and community tools."
        path="/projects"
      />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="All Projects"
              subtitle="Enterprise mobility, marketplaces, tax systems, and community apps — filter by category or search by tech."
            />
          </ScrollReveal>

          <ProjectFilter
            active={category}
            onCategoryChange={setCategory}
            search={search}
            onSearchChange={setSearch}
            resultCount={filtered.length}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ScrollReveal key={project.slug} delay={(i % 6) * 0.05}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-[var(--text-muted)]">
              No projects match your search. Try a different filter or keyword.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
