import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'
import { getAdjacentProjects } from '@/data/projects'
import SEO from './SEO'
import TechBadge from './TechBadge'
import DeviceMockup from './DeviceMockup'
import ScrollReveal from './ScrollReveal'
import EmployerProjectNotice from './EmployerProjectNotice'
import ScreenshotGallery from './ScreenshotGallery'

interface CaseStudyLayoutProps {
  project: Project
}

function ArchitectureBlock({ diagram }: { diagram: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
      <pre className="font-mono text-xs leading-relaxed text-[var(--accent-2)] md:text-sm">
        {diagram}
      </pre>
    </div>
  )
}

export default function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  const { prev, next } = getAdjacentProjects(project.slug)

  return (
    <>
      <SEO
        title={`${project.displayName} — Case Study`}
        description={project.shortDescription}
        path={`/projects/${project.slug}`}
      />

      <article className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/projects"
            className="focus-ring mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          <ScrollReveal>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechBadge key={tech} label={tech} accent />
              ))}
            </div>
            <h1 className="font-display text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
              {project.displayName}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              {project.scopeLabel && (
                <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs text-[var(--accent)]">
                  {project.scopeLabel}
                </span>
              )}
              {project.role && <span>{project.role}</span>}
              {project.timeline && (
                <>
                  <span>·</span>
                  <span>{project.timeline}</span>
                </>
              )}
              {project.year && (
                <>
                  <span>·</span>
                  <span>{project.year}</span>
                </>
              )}
            </div>
            <p className="mt-6 text-lg text-[var(--text-muted)]">{project.description}</p>

            {project.employerProject && (
              <div className="mt-6">
                <EmployerProjectNotice />
              </div>
            )}

            {(project.liveUrl || project.githubUrl || (project.apiUrl && !project.employerProject)) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-4 py-2 text-sm font-semibold text-[#0a0f14]"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--accent)]"
                  >
                    View on GitHub
                  </a>
                )}
                {project.apiUrl && !project.employerProject && (
                  <a
                    href={project.apiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-primary)] hover:border-[var(--accent)]"
                  >
                    API Docs
                  </a>
                )}
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal className="mt-12">
            <div
              className="overflow-hidden rounded-3xl border"
              style={
                project.brandTheme
                  ? {
                      borderColor: `${project.brandTheme.primary}40`,
                      boxShadow: `0 24px 80px -24px ${project.brandTheme.primary}55`,
                    }
                  : undefined
              }
            >
              {project.coverImage || project.screenshots?.[0] ? (
                <div className="relative">
                  {project.brandTheme && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${project.brandTheme.primary}, ${project.brandTheme.secondary})`,
                      }}
                    />
                  )}
                  <img
                    src={project.coverImage ?? project.screenshots![0].src}
                    alt={project.coverImage ? `${project.displayName} cover` : project.screenshots![0].alt}
                    loading="lazy"
                    className={`relative w-full object-cover object-top ${
                      project.screenshotLayout === 'mobile' ? 'mx-auto max-w-sm' : ''
                    }`}
                  />
                </div>
              ) : (
                <DeviceMockup variant={project.slug} />
              )}
            </div>
          </ScrollReveal>

          <div className="prose prose-invert mt-16 max-w-none space-y-16">
            <ScrollReveal>
              <section>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  The Problem
                </h2>
                <p className="mt-4 text-[var(--text-muted)] leading-relaxed">{project.problem}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  The Solution
                </h2>
                <p className="mt-4 text-[var(--text-muted)] leading-relaxed">{project.solution}</p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Key Features
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-[var(--text-muted)] before:text-[var(--accent)] before:content-['→']"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Architecture
                </h2>
                <div className="mt-4">
                  <ArchitectureBlock diagram={project.architecture} />
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {project.screenshots?.length ? 'Screenshots' : project.employerProject ? 'Concept Preview' : 'Screenshots'}
                </h2>
                {project.employerProject && !project.screenshots?.length && (
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    Illustrative mockups only — not production UI or client data.
                  </p>
                )}
                {project.screenshots?.length ? (
                  <ScreenshotGallery project={project} />
                ) : (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <DeviceMockup variant={project.slug} type="browser" className="rounded-2xl border border-[var(--border)] overflow-hidden" />
                    <DeviceMockup variant={project.slug} type="phone" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]" />
                  </div>
                )}
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Technical Highlights
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technicalHighlights.map((item) => (
                    <TechBadge key={item} label={item} accent />
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="glass-card rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Outcome & Impact
                </h2>
                <p className="mt-4 text-[var(--text-muted)] leading-relaxed">{project.outcome}</p>
              </section>
            </ScrollReveal>
          </div>

          <nav
            className="mt-16 grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2"
            aria-label="Project navigation"
          >
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="focus-ring glass-card group rounded-2xl p-5 transition-colors hover:border-[var(--accent)]/30"
              >
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <ArrowLeft size={14} />
                  Previous
                </span>
                <span className="mt-1 block font-display font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                  {prev.displayName}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="focus-ring glass-card group rounded-2xl p-5 text-right transition-colors hover:border-[var(--accent)]/30 sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-[var(--text-muted)]">
                  Next
                  <ArrowRight size={14} />
                </span>
                <span className="mt-1 block font-display font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                  {next.displayName}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  )
}
