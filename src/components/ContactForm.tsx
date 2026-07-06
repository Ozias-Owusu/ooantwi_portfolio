import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { profile } from '@/data/profile'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address'
    }
    if (!form.message.trim()) next.message = 'Message is required'
    else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters'
    }
    return next
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="font-display text-xl font-semibold text-[var(--text-primary)]">
          Opening your email client...
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          If it didn&apos;t open, email me directly at{' '}
          <a href={`mailto:${profile.email}`} className="text-[var(--accent)] hover:underline">
            {profile.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="focus-ring mt-4 text-sm text-[var(--accent)] hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-6 md:p-8" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)]"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="focus-ring w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)]"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="focus-ring w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)]"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-3 font-semibold text-[#0a0f14] transition-transform hover:scale-[1.01] sm:w-auto"
      >
        <Send size={18} />
        Send Message
      </button>
    </form>
  )
}
