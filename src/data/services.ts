import { Globe, Server, Smartphone, WifiOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  title: string
  icon: LucideIcon
  description: string
  deliverables: string[]
  proofSlugs: string[]
}

export const services: Service[] = [
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: Smartphone,
    description:
      'Cross-platform Flutter apps and native Android (Kotlin/Compose) — from MVP to production release.',
    deliverables: [
      'Flutter iOS & Android apps',
      'Native Kotlin / Jetpack Compose',
      'Play Store release & updates',
    ],
    proofSlugs: ['timetrakker-logistics', 'crm-consumer'],
  },
  {
    id: 'web',
    title: 'Full-Stack Web Apps',
    icon: Globe,
    description:
      'React front-ends backed by ASP.NET Core or Node.js — dashboards, portals, and multi-vendor marketplaces.',
    deliverables: [
      'React + TypeScript + Tailwind',
      'Admin dashboards & portals',
      'PWA support & deployment',
    ],
    proofSlugs: ['frankates-marketplace', 'hostelhub'],
  },
  {
    id: 'backend',
    title: 'APIs & Integrations',
    icon: Server,
    description:
      'Secure REST APIs, OAuth/JWT auth, and integrations with third-party systems, hardware, and government services.',
    deliverables: [
      'ASP.NET Core & Express APIs',
      'OAuth 2.0 / JWT / Auth0',
      'RFID, biometrics & eVAT integrations',
    ],
    proofSlugs: ['evat-vsdc-extension', 'crm-manufacturer'],
  },
  {
    id: 'field',
    title: 'Offline-First & Field Apps',
    icon: WifiOff,
    description:
      'Apps that keep working with poor connectivity — local storage, background sync, GPS tracking, and biometrics.',
    deliverables: [
      'SQLite offline queues & sync',
      'Background GPS & geofencing',
      'Face / fingerprint verification',
    ],
    proofSlugs: ['erdms-approval', 'pama-attendance'],
  },
]
