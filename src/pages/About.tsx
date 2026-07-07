import { Link } from 'react-router-dom'
import { Download, FolderGit2, Globe, Mail } from 'lucide-react'
import SEO from '@/components/SEO'
import SectionHeading from '@/components/SectionHeading'
import Timeline from '@/components/Timeline'
import ScrollReveal from '@/components/ScrollReveal'
import { profile } from '@/data/profile'

export default function About() {
  const aboutParagraphs = profile.about.split('\n\n')

  return (
    <>
      <SEO
        title="About"
        description={`Learn about ${profile.name} — ${profile.title} based in ${profile.location}.`}
        path="/about"
      />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="About Me"
              title={profile.name}
              subtitle={profile.title}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card mb-12 rounded-3xl p-6 md:p-10">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] font-display text-2xl font-bold text-[#0a0f14]">
                {profile.initials}
              </div>
              {aboutParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="mb-4 text-[var(--text-muted)] leading-relaxed last:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: para
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)]">$1</strong>'),
                  }}
                />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h3 className="mb-4 font-display text-xl font-semibold text-[var(--text-primary)]">
              Current Focus
            </h3>
            <p className="mb-10 text-[var(--text-muted)] leading-relaxed">
              {profile.currentFocus}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h3 className="mb-4 font-display text-xl font-semibold text-[var(--text-primary)]">
              Languages
            </h3>
            <div className="mb-12 flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-sm text-[var(--text-muted)]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <SectionHeading
              eyebrow="Journey"
              title="Experience & Education"
            />
          </ScrollReveal>
          <Timeline />

          <ScrollReveal className="mt-12">
            <div className="flex flex-wrap gap-3">
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-5 py-2.5 text-sm font-semibold text-[#0a0f14]"
              >
                <Download size={16} />
                Download Resume
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--accent)]"
              >
                <FolderGit2 size={16} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--accent)]"
              >
                <Globe size={16} />
                LinkedIn
              </a>
              <Link
                to="/contact"
                className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--accent)]"
              >
                <Mail size={16} />
                Contact
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
