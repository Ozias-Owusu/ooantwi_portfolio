import { FolderGit2, Globe, Mail, MapPin, Phone } from 'lucide-react'
import SEO from '@/components/SEO'
import SectionHeading from '@/components/SectionHeading'
import ContactForm from '@/components/ContactForm'
import ScrollReveal from '@/components/ScrollReveal'
import { profile } from '@/data/profile'

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description={`Get in touch with ${profile.name} for project inquiries and collaborations.`}
        path="/contact"
      />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk"
              subtitle="Have a project in mind? Send a message or reach out directly."
            />
          </ScrollReveal>

          <div className="grid gap-10 lg:grid-cols-5">
            <ScrollReveal className="lg:col-span-2">
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="mb-4 font-display font-semibold text-[var(--text-primary)]">
                    Direct Contact
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <a
                        href={`mailto:${profile.email}`}
                        className="focus-ring flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--accent)]"
                      >
                        <Mail size={18} className="shrink-0 text-[var(--accent)]" />
                        {profile.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-[var(--text-muted)]">
                      <Phone size={18} className="shrink-0 text-[var(--accent)]" />
                      {profile.phone}
                    </li>
                    <li className="flex items-center gap-3 text-[var(--text-muted)]">
                      <MapPin size={18} className="shrink-0 text-[var(--accent)]" />
                      {profile.location}
                    </li>
                  </ul>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="mb-4 font-display font-semibold text-[var(--text-primary)]">
                    Social
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      aria-label="GitHub"
                    >
                      <FolderGit2 size={20} />
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      aria-label="LinkedIn"
                    >
                      <Globe size={20} />
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="focus-ring flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      aria-label="Email"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-3" delay={0.1}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
