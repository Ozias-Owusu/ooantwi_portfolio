export interface TimelineEntry {
  period: string
  title: string
  org: string
  notes: string
  type: 'work' | 'education' | 'leadership'
}

export const timeline: TimelineEntry[] = [
  {
    period: 'Present',
    title: 'Software Developer',
    org: 'Persol Systems',
    notes:
      'Enterprise mobile and web products across logistics, tax systems, visitor management, and internal operations. Portfolio entries are summarized at a high level.',
    type: 'work',
  },
  {
    period: 'Present',
    title: 'Founder & Lead Developer',
    org: "Dev's Consult",
    notes:
      'Client projects and product delivery. Built Frankates Marketplace as the first shipped client product.',
    type: 'leadership',
  },
  {
    period: '2024',
    title: 'BSc Computer Science',
    org: 'Ghana Communication Technology University (GCTU)',
    notes:
      'Focused on software engineering, mobile development, and building practical systems for real-world use.',
    type: 'education',
  },
]
