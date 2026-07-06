import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="bg-tech-layer" />
        <div className="bg-tech-scrim" />
        <div
          className="absolute -left-32 top-0 h-96 w-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            opacity: 'var(--orb-opacity)',
          }}
        />
        <div
          className="absolute -right-32 top-1/3 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)',
            opacity: 'var(--orb-opacity)',
          }}
        />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
