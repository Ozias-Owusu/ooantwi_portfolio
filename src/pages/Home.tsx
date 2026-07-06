import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import SkillGrid from '@/components/SkillGrid'
import Timeline from '@/components/Timeline'
import ScrollReveal from '@/components/ScrollReveal'
import { profile } from '@/data/profile'
import { getFeaturedProjects } from '@/data/projects'

export default function Home() {
  const featured = getFeaturedProjects()

  return (
    <>
      <SEO
        title="Owusu Antwi — Full-Stack & Mobile Developer"
        description={profile.tagline}
        path="/"
      />

      <Hero />

      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Featured Work"
              title="Projects that ship"
              subtitle="From marketplace ecosystems to enterprise mobility — real products for real people."
            />
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} featured />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-10 text-center">
            <Link
              to="/projects"
              className="focus-ring inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              View all 20+ projects
              <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Skills & Stack"
              title="What I work with"
              subtitle="Full-stack development across web, mobile, backend, and cloud."
            />
          </ScrollReveal>
          <SkillGrid />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Experience"
              title="Where I've built"
              subtitle="Enterprise work at Persol Systems, client delivery through Dev's Consult, and a foundation at GCTU."
            />
          </ScrollReveal>
          <Timeline />
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-12">
              <Quote
                size={48}
                className="absolute right-6 top-6 text-[var(--accent)]/20"
                aria-hidden
              />
              <blockquote className="relative">
                <p className="font-display text-xl font-medium leading-relaxed text-[var(--text-primary)] md:text-2xl">
                  &ldquo;{profile.testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm text-[var(--text-muted)]">
                  — {profile.testimonial.context}
                </footer>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-6 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--accent)]/20 via-[var(--bg-card)] to-[var(--accent-2)]/20 p-8 text-center md:p-14">
              <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                {profile.cta}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
                Whether it&apos;s a marketplace, enterprise app, or community tool — I&apos;d love to hear about it.
              </p>
              <Link
                to="/contact"
                className="focus-ring mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-8 py-3 font-semibold text-[#0a0f14] transition-transform hover:scale-[1.02]"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
