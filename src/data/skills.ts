import {
  Cloud,
  Code2,
  Database,
  Globe,
  Layers,
  Smartphone,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SkillCategory {
  id: string
  title: string
  icon: LucideIcon
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Globe,
    skills: [
      'React',
      'Vite',
      'Tailwind CSS',
      'TypeScript',
      'JavaScript',
      'HTML/CSS',
      'Framer Motion',
      'Leaflet',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    icon: Smartphone,
    skills: [
      'Flutter',
      'Dart',
      'Kotlin',
      'Jetpack Compose',
      'Android SDK',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Code2,
    skills: [
      'ASP.NET Core',
      'Node.js / Express',
      'REST APIs',
      'JWT / OAuth',
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    skills: [
      'SQLite',
      'SQL Server',
      'MongoDB',
      'Firebase Firestore',
      'Hive',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['Git', 'Render', 'Firebase', 'Swagger', 'Auth0'],
  },
  {
    id: 'tools',
    title: 'Tools & Integrations',
    icon: Wrench,
    skills: ['Cursor', 'ML Kit', 'RFID integrations', 'Lottie', 'Workmanager'],
  },
  {
    id: 'domains',
    title: 'Domains',
    icon: Layers,
    skills: [
      'E-commerce',
      'Logistics',
      'eVAT / Tax',
      'Visitor Management',
      'Church / Community',
      'Hostel booking',
      'Biometrics',
    ],
  },
]
