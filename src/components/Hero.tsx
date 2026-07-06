import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import StatsStrip from './StatsStrip'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const easeOut = 'easeOut' as const

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
    },
  }

  const item = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  }

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-sm text-[var(--text-muted)]"
          >
            <MapPin size={14} className="text-[var(--accent)]" />
            {profile.location}
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl"
          >
            {profile.heroHeadline.split(' ').map((word, i, arr) =>
              i === arr.length - 2 ? (
                <span key={i}>
                  <span className="text-gradient">{word} </span>
                </span>
              ) : (
                <span key={i}>{word} </span>
              ),
            )}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-lg text-[var(--text-muted)] md:text-xl"
          >
            {profile.heroSubhead}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-3 font-semibold text-[#0a0f14] transition-transform hover:scale-[1.02]"
            >
              View Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-3 font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
            >
              Contact Me
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-12">
            <StatsStrip />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="glass-card relative overflow-hidden rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-amber-400/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
                portfolio.config.ts
              </span>
            </div>
            <pre className="overflow-hidden font-mono text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
              <code>{`const developer = {
  name: "${profile.name}",
  location: "${profile.location}",
  stack: [
    "React", "Flutter",
    "ASP.NET Core", "Kotlin"
  ],
  focus: [
    "Marketplaces",
    "Logistics", "eVAT",
    "Community apps"
  ],
  shipping: true
}`}</code>
            </pre>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {['Flutter', 'React', '.NET', 'Kotlin'].map((tech) => (
                <div
                  key={tech}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-center font-mono text-xs text-[var(--accent)]"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-2)]/20 blur-2xl" />
        </motion.div>
      </div>
    </section>
  )
}
