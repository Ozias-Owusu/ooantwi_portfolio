import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, FolderGit2 } from 'lucide-react'
import type { Project } from '@/data/projects'
import TechBadge from './TechBadge'
import DeviceMockup from './DeviceMockup'
import { getProjectCoverPath } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

function ProjectVisual({ project, featured }: { project: Project; featured?: boolean }) {
  const cover = project.coverImage ?? getProjectCoverPath(project.slug)

  if (project.coverImage || !featured) {
    return (
      <img
        src={cover}
        alt={`${project.displayName} cover`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    )
  }

  return <DeviceMockup variant={project.slug} className="h-full w-full" />
}

export default function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group glass-card flex h-full flex-col overflow-hidden rounded-2xl transition-shadow hover:glow-accent"
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)]">
          <ProjectVisual project={project} featured={featured} />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link to={`/projects/${project.slug}`}>
            <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)] md:text-xl">
              {project.displayName}
            </h3>
          </Link>
          <Link
            to={`/projects/${project.slug}`}
            className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]"
            aria-label={`View ${project.displayName} case study`}
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>

        <p className="mb-4 flex-1 text-sm text-[var(--text-muted)]">
          {project.shortDescription}
        </p>

        {project.scopeLabel && (
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
            {project.scopeLabel}
          </p>
        )}

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
          {project.stack.length > 4 && (
            <TechBadge label={`+${project.stack.length - 4}`} />
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="focus-ring text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Case Study
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
              <FolderGit2 size={14} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
