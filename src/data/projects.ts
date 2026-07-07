export type FilterCategory =
  | 'All'
  | 'Web'
  | 'Mobile'
  | 'Backend'
  | 'Enterprise'
  | 'Personal'
  | 'POC'

export interface ProjectScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface Project {
  slug: string
  displayName: string
  category: string
  categories: Exclude<FilterCategory, 'All'>[]
  role?: string
  scopeLabel?: string
  employerProject?: boolean
  stack: string[]
  liveUrl?: string
  apiUrl?: string
  githubUrl?: string
  repos?: string[]
  coverImage?: string
  screenshots?: ProjectScreenshot[]
  description: string
  shortDescription: string
  problem: string
  solution: string
  features: string[]
  architecture: string
  technicalHighlights: string[]
  outcome: string
  featured: boolean
  hidden?: boolean
  priority: number
  accentColor: string
  timeline?: string
  year?: string
}

export const EMPLOYER_PROJECT_DISCLAIMER =
  'Built as part of my work at Persol Systems. Details are shared at a high level in line with confidentiality requirements. Visuals are conceptual mockups, not production screenshots or live systems.'

export const projects: Project[] = [
  {
    slug: 'frankates-marketplace',
    displayName: 'Frankates Marketplace',
    category: 'Web + Backend + Mobile ecosystem',
    categories: ['Web', 'Mobile', 'Backend', 'Enterprise'],
    role: 'Lead Developer (Dev\'s Consult)',
    stack: [
      'React',
      'Vite',
      'Tailwind',
      'ASP.NET Core 8',
      'EF Core',
      'Flutter',
      'Leaflet',
      'Render',
    ],
    liveUrl: 'https://franskate-marketplace.onrender.com',
    apiUrl: 'https://frankatesmarketplacebackend.onrender.com',
    repos: ['frankates-web-app', 'franskatemarketplacebackend', 'frankatesdeliveryapp'],
    description:
      'Ghana-focused multi-vendor marketplace connecting local vendors, customers, drivers, and super admins in one cohesive ecosystem.',
    shortDescription:
      'Multi-vendor marketplace with vendor portal, driver tracking, and super admin controls.',
    problem:
      'Local vendors in Ghana relied on foot traffic and informal channels. They lacked a unified platform to list inventory, manage orders, and reach customers beyond their immediate area — while customers wanted reliable delivery and order tracking.',
    solution:
      'I led development of a full marketplace ecosystem: React customer storefront, ASP.NET Core API, vendor and admin portals, and a Flutter driver app with live GPS tracking via Leaflet and OSRM routing.',
    features: [
      'Customer shop: browse, cart, checkout, orders, wishlist, and delivery tracking maps',
      'Vendor portal: onboarding, inventory, batches, orders, analytics, and marketing tools',
      'Super admin: users, vendors, drivers, orders, audit logs, and advertisements',
      'Driver portal (web) plus Frankates Driver Flutter app with background GPS',
      'JWT authentication with email verification and PWA install support',
      'Live delivery tracking with Leaflet maps and OSRM routing',
      'Role-based access across customer, vendor, driver, and admin experiences',
      'Deployed on Render with separate frontend and API services',
    ],
    architecture: `graph LR
  A[React Web App] --> B[ASP.NET Core API]
  C[Flutter Driver App] --> B
  D[Vendor Portal] --> B
  E[Super Admin] --> B
  B --> F[(SQL Server / EF Core)]
  C --> G[Leaflet + OSRM Maps]`,
    technicalHighlights: [
      'JWT auth with email verification',
      'PWA install support for mobile shoppers',
      'Background GPS on Flutter driver app',
      'Leaflet/OSRM live delivery routing',
      'Multi-role RBAC across four portals',
    ],
    outcome:
      'Built for Dev\'s Consult\'s first client. Helped local vendors reach customers beyond foot traffic with a production-deployed marketplace.',
    featured: true,
    priority: 1,
    accentColor: '#22c55e',
    timeline: '6 months',
    year: '2025',
    coverImage: '/projects/frankates-marketplace/07-shop-home.png',
    screenshots: [
      {
        src: '/projects/frankates-marketplace/01-landing.png',
        alt: 'Frankates multi-portal landing page with customer, vendor, admin, and driver entry points',
        caption: 'Platform hub — four portals in one ecosystem',
      },
      {
        src: '/projects/frankates-marketplace/07-shop-home.png',
        alt: 'Frankates Mart customer marketplace home with categories, deals, and product discovery',
        caption: 'Frankates Mart — customer storefront',
      },
      {
        src: '/projects/frankates-marketplace/08b-product-detail.png',
        alt: 'Product detail page with images, pricing, variants, and add-to-cart actions',
        caption: 'Product detail — variants, pricing, and cart actions',
      },
      {
        src: '/projects/frankates-marketplace/10-shop-checkout.png',
        alt: 'Frankates Mart multi-step checkout with delivery options and Ghana VAT',
        caption: 'Checkout — delivery, tax, and MoMo-ready payments',
      },
      {
        src: '/projects/frankates-marketplace/12-order-tracking.png',
        alt: 'Live delivery tracking with Leaflet map, courier status, and order timeline',
        caption: 'Live order tracking with map routing',
      },
      {
        src: '/projects/frankates-marketplace/13-vendor-dashboard.png',
        alt: 'Vendor dashboard with revenue stats, sales chart, and recent orders',
        caption: 'Vendor dashboard — sales and order operations',
      },
      {
        src: '/projects/frankates-marketplace/14-vendor-analytics.png',
        alt: 'Vendor analytics with sales charts and category breakdown',
        caption: 'Vendor analytics and performance insights',
      },
      {
        src: '/projects/frankates-marketplace/16-vendor-inventory.png',
        alt: 'Vendor inventory management with stock levels, batches, and product listings',
        caption: 'Vendor inventory — stock, batches, and listings',
      },
      {
        src: '/projects/frankates-marketplace/17-admin-dashboard.png',
        alt: 'Super admin dashboard with platform revenue, vendors, and orders overview',
        caption: 'Super admin — platform-wide operations',
      },
      {
        src: '/projects/frankates-marketplace/18-admin-orders.png',
        alt: 'Super admin order management with status filters and fulfillment oversight',
        caption: 'Admin orders — platform-wide fulfillment oversight',
      },
      {
        src: '/projects/frankates-marketplace/20-driver-dashboard.png',
        alt: 'Frankates driver mobile dashboard with active deliveries and online status',
        caption: 'Driver portal — mobile-first delivery workflow',
      },
    ],
  },
  {
    slug: 'timetrakker-logistics',
    displayName: 'Enterprise Logistics Driver App',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Mobile Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'Riverpod', 'GoRouter', 'SQLite', 'ML Kit', 'Geolocator', 'OAuth'],
    description:
      'Production logistics driver app with shift management, biometric enrollment, and trip tracking for field operations.',
    shortDescription:
      'Enterprise driver app with shifts, biometrics, and background trip tracking.',
    problem:
      'Field logistics teams needed verified driver identity, structured shift workflows, and reliable trip tracking — without paper logs or unsecured personal apps.',
    solution:
      'I built a Flutter driver app with Riverpod state management, biometric enrollment via ML Kit, OAuth integration, and background geolocation for trip lifecycle management.',
    features: [
      'Driver dashboard with shift status and daily overview',
      'Shift management: clock-in, active shift, and end-of-day summaries',
      'Face and fingerprint enrollment for driver verification',
      'Trip setup with route and cargo details',
      'Background location tracking during active trips',
      'Offline-capable SQLite storage for field connectivity gaps',
      'Performance metrics for supervisors',
      'OAuth-secured enterprise API integration',
    ],
    architecture: `graph LR
  A[Flutter Driver App] --> B[Enterprise API]
  A --> C[(SQLite Local DB)]
  A --> D[ML Kit Biometrics]
  A --> E[Background Geolocator]`,
    technicalHighlights: [
      'ML Kit face detection enrollment',
      'Background location during trips',
      'Riverpod + GoRouter architecture',
      'OAuth/AppAuth enterprise SSO',
    ],
    outcome:
      'Production enterprise deployment supporting logistics teams with biometric accountability and trip visibility.',
    featured: false,
    priority: 2,
    accentColor: '#3b82f6',
    timeline: '4 months',
    year: '2025',
  },
  {
    slug: 'crm-consumer',
    displayName: 'Taxpayer Services Mobile App',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Mobile Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'GoRouter', 'OAuth', 'AppAuth', 'Dio', 'QR', 'Lottie'],
    description:
      'Consumer-facing mobile app for taxpayer self-service, including virtual card features and secure account access.',
    shortDescription:
      'Taxpayer mobile app with virtual card, QR services, and secure OAuth login.',
    problem:
      'Taxpayers needed mobile access to essential services — virtual cards, verification, and account management — without relying on desktop-only portals or in-person visits.',
    solution:
      'I developed a Flutter consumer app with OAuth-secured authentication, virtual card display, QR-based services, and polished Lottie-driven onboarding flows.',
    features: [
      'Secure OAuth/AppAuth login for taxpayer accounts',
      'Virtual card display with QR code generation',
      'Profile and service request management',
      'QR scanner for document and invoice verification',
      'Lottie animations for onboarding and status feedback',
      'GoRouter-based navigation with deep link support',
      'Dio HTTP client with token refresh handling',
      'Responsive layouts for varied Android device sizes',
    ],
    architecture: `graph LR
  A[Flutter Consumer App] --> B[Enterprise API]
  A --> C[OAuth / AppAuth]
  A --> D[QR Services]
  B --> E[(Secure Records)]`,
    technicalHighlights: [
      'OAuth 2.0 with AppAuth',
      'Virtual card + QR generation',
      'Enterprise API integration via Dio',
      'Lottie micro-interactions',
    ],
    outcome:
      'Production deployment giving taxpayers mobile-first access to core self-service workflows.',
    featured: false,
    hidden: true,
    priority: 3,
    accentColor: '#8b5cf6',
    timeline: '5 months',
    year: '2025',
  },
  {
    slug: 'churchos',
    displayName: 'ChurchOS',
    category: 'Personal / Community',
    categories: ['Mobile', 'Personal'],
    role: 'Solo Developer',
    stack: ['Flutter', 'Provider', 'QR', 'Local-first storage'],
    description:
      'Church management app with admin and member experiences for attendance, giving, events, and membership.',
    shortDescription:
      'Community church app for attendance, giving, events, and member management.',
    problem:
      'Many churches in Ghana still track attendance, offerings, and events on paper or scattered WhatsApp groups — making reporting slow and member engagement inconsistent.',
    solution:
      'I built ChurchOS as a local-first Flutter app with separate admin and member flows: QR check-in, digital giving records, event calendars, and member directories.',
    features: [
      'Member home with upcoming events and announcements',
      'QR-based attendance check-in',
      'Digital giving tracking and history',
      'Event creation and RSVP for admins',
      'Member directory with role-based visibility',
      'Admin dashboard for attendance and giving reports',
      'Local-first storage for offline church sessions',
      'Provider state management for clean separation of concerns',
    ],
    architecture: `graph LR
  A[Member App] --> C[Local Storage]
  B[Admin App] --> C
  B --> D[QR Attendance]
  A --> D`,
    technicalHighlights: [
      'Local-first architecture',
      'QR attendance check-in',
      'Dual admin/member experiences',
      'Provider pattern state management',
    ],
    outcome:
      'Community-facing product designed for churches that need simple, reliable management without enterprise complexity.',
    featured: false,
    priority: 4,
    accentColor: '#f59e0b',
    timeline: '3 months',
    year: '2024',
  },
  {
    slug: 'persol-canteen',
    displayName: 'Employee Canteen App',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Android Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Auth0'],
    description:
      'Native Android lunch ordering app for employees with menu browsing, cart, and order history.',
    shortDescription: 'Native Compose app for employee meal ordering.',
    problem:
      'Employees needed a fast, reliable way to order meals without queues or manual cash handling.',
    solution:
      'Built a native Kotlin/Compose app with Hilt DI, Auth0 authentication, and integration with a secure enterprise ordering API.',
    features: [
      'Daily menu browsing with categories',
      'Cart and checkout flow',
      'Order history and status tracking',
      'Auth0 SSO for employee accounts',
      'Material 3 Compose UI',
      'Hilt dependency injection',
    ],
    architecture: `graph LR
  A[Kotlin Compose App] --> B[Enterprise API]
  A --> C[Auth0]
  B --> D[(Order Store)]`,
    technicalHighlights: ['Jetpack Compose', 'Hilt DI', 'Auth0 integration'],
    outcome: 'Production app used daily for internal employee meal ordering.',
    featured: false,
    priority: 5,
    accentColor: '#ef4444',
    year: '2025',
  },
  {
    slug: 'visitor-management-android',
    displayName: 'Facility Visitor Check-In',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Android Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Fingerprint'],
    description:
      'Android visitor management app with check-in workflows and fingerprint verification for secure facilities.',
    shortDescription: 'Secure visitor check-in with biometric verification.',
    problem:
      'Facilities needed digitized visitor logs with identity verification beyond paper sign-in sheets.',
    solution:
      'Native Android app with Compose UI, fingerprint capture, and real-time sync with a secure enterprise API.',
    features: [
      'Visitor registration and check-in',
      'Fingerprint biometric capture',
      'Host notification on arrival',
      'Visit history tracking',
      'Hilt-powered modular architecture',
    ],
    architecture: `graph LR
  A[Check-In App] --> B[Enterprise API]
  A --> C[Fingerprint SDK]
  B --> D[(Visitor Records)]`,
    technicalHighlights: ['Fingerprint biometrics', 'Compose UI', 'Enterprise API sync'],
    outcome: 'Production deployment for secure facility visitor management.',
    featured: false,
    priority: 6,
    accentColor: '#06b6d4',
    year: '2025',
  },
  {
    slug: 'vms-host-app',
    displayName: 'Visitor Host Portal',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Flutter Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'GetX', 'OAuth', 'Biometrics'],
    description:
      'Host-facing mobile app for approving visitors, viewing schedules, and managing facility access.',
    shortDescription: 'Host app for visitor approvals and facility access.',
    problem: 'Hosts needed mobile tools to pre-approve visitors and manage access without desktop dependency.',
    solution: 'Flutter app with GetX state management, OAuth login, and biometric quick-unlock.',
    features: [
      'Visitor pre-approval workflow',
      'Visitor arrival notifications',
      'Biometric app unlock',
      'OAuth enterprise authentication',
      'Host schedule and visit calendar',
    ],
    architecture: `graph LR
  A[Flutter Host App] --> B[Enterprise API]
  A --> C[Biometrics]
  A --> D[GetX State]`,
    technicalHighlights: ['GetX architecture', 'OAuth', 'Biometric unlock'],
    outcome: 'Production companion app for host-side visitor management workflows.',
    featured: false,
    priority: 7,
    accentColor: '#14b8a6',
    year: '2025',
  },
  {
    slug: 'erdms-approval',
    displayName: 'Document Approval Mobile',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Flutter Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'GoRouter', 'OAuth', 'SQLite', 'Workmanager', 'QR'],
    description:
      'Mobile approval workflow app for document review with offline queueing and QR verification.',
    shortDescription: 'Document approval app with offline sync and QR verification.',
    problem: 'Approvers needed to review and sign off documents in the field, often without stable connectivity.',
    solution: 'Flutter app with SQLite offline queue, Workmanager background sync, and QR document linking.',
    features: [
      'Document approval inbox',
      'Offline action queue with background sync',
      'QR code document linking',
      'OAuth-secured API access',
      'GoRouter navigation with deep links',
    ],
    architecture: `graph LR
  A[Approval App] --> B[Enterprise API]
  A --> C[(SQLite Queue)]
  A --> D[Workmanager Sync]`,
    technicalHighlights: ['Offline-first SQLite', 'Workmanager sync', 'QR document linking'],
    outcome: 'Production mobile workflows for enterprise document approvals.',
    featured: false,
    hidden: true,
    priority: 8,
    accentColor: '#6366f1',
    year: '2025',
  },
  {
    slug: 'vehicle-management',
    displayName: 'Fleet Management Mobile',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Flutter Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'GoRouter', 'SQLite', 'OAuth', 'Lottie'],
    description:
      'Fleet and vehicle tracking app for assignments, maintenance logs, and driver accountability.',
    shortDescription: 'Fleet management with assignments and maintenance tracking.',
    problem: 'Fleet coordinators lacked a mobile tool to assign vehicles, log maintenance, and track utilization.',
    solution: 'Flutter app with local SQLite cache, OAuth auth, and Lottie status animations.',
    features: [
      'Vehicle assignment and return workflows',
      'Maintenance log entry',
      'Driver assignment tracking',
      'Offline-capable local storage',
      'Lottie loading and status feedback',
    ],
    architecture: `graph LR
  A[Vehicle App] --> B[Enterprise API]
  A --> C[(SQLite)]
  B --> D[(Fleet Store)]`,
    technicalHighlights: ['SQLite offline cache', 'OAuth', 'GoRouter'],
    outcome: 'Production fleet tool supporting vehicle assignment and maintenance workflows.',
    featured: false,
    priority: 9,
    accentColor: '#f97316',
    year: '2025',
  },
  {
    slug: 'crm-manufacturer',
    displayName: 'Manufacturer Inventory Mobile',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Flutter Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'RFID', 'OAuth'],
    description:
      'Manufacturer-facing mobile app with RFID tag scanning for inventory and compliance workflows.',
    shortDescription: 'RFID-powered inventory app for manufacturer compliance workflows.',
    problem: 'Manufacturers needed RFID-based tracking integrated with regulated inventory and compliance systems.',
    solution: 'Flutter app with TSL RFID plugin integration, OAuth auth, and manufacturer-specific workflows.',
    features: [
      'RFID tag scanning via TSL plugin',
      'Inventory batch registration',
      'OAuth-secured enterprise API integration',
      'Manufacturer dashboard and reports',
      'Offline scan buffering',
    ],
    architecture: `graph LR
  A[Manufacturer App] --> B[Enterprise API]
  A --> C[RFID TSL Plugin]
  B --> D[(Inventory Store)]`,
    technicalHighlights: ['RFID TSL integration', 'OAuth', 'Batch inventory workflows'],
    outcome: 'Production manufacturer tool supporting inventory and compliance operations.',
    featured: false,
    priority: 10,
    accentColor: '#a855f7',
    year: '2025',
  },
  {
    slug: 'evat-invoice-verification',
    displayName: 'Invoice Verification Mobile',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Flutter Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'QR Scanner', 'SQLite', 'Encryption'],
    description:
      'Invoice verification app with QR scanning, local encrypted storage, and offline validation.',
    shortDescription: 'QR-based invoice verification with encrypted local storage.',
    problem: 'Field teams needed to verify invoice authenticity quickly, including in low-connectivity environments.',
    solution: 'Flutter app with QR scanner, encrypted SQLite storage, and sync with enterprise verification services.',
    features: [
      'QR invoice scanning and validation',
      'Encrypted local invoice cache',
      'Offline verification against cached rules',
      'Verification history and audit trail',
      'Sync when connectivity returns',
    ],
    architecture: `graph LR
  A[Verification App] --> B[Enterprise API]
  A --> C[(Encrypted SQLite)]
  A --> D[QR Scanner]`,
    technicalHighlights: ['Encrypted SQLite', 'QR verification', 'Offline validation'],
    outcome: 'Production field tool supporting invoice verification and compliance workflows.',
    featured: false,
    priority: 11,
    accentColor: '#10b981',
    year: '2025',
  },
  {
    slug: 'evat-vsdc-extension',
    displayName: 'Tax Compliance Extension Library',
    category: 'Production · Employer library',
    categories: ['Backend', 'Enterprise'],
    role: 'Backend Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Kotlin/JVM', 'Ktor', 'Encryption'],
    description:
      'JVM extension library for sales data controller integration with encrypted communication.',
    shortDescription: 'Kotlin/Ktor compliance extension with encrypted comms.',
    problem: 'POS systems needed a secure, reusable integration layer for regulated sales data reporting.',
    solution: 'Kotlin/JVM library using Ktor for HTTP and encryption for sensitive data transmission.',
    features: [
      'Regulated protocol implementation',
      'Encrypted request/response handling',
      'Ktor HTTP client integration',
      'Reusable JVM library for POS integrators',
    ],
    architecture: `graph LR
  A[POS System] --> B[Compliance Extension]
  B --> C[Enterprise Gateway]
  B --> D[Encryption Layer]`,
    technicalHighlights: ['Ktor HTTP', 'Encryption at rest and transit', 'JVM library'],
    outcome: 'Shared library supporting compliance integrations across enterprise tax products.',
    featured: false,
    hidden: true,
    priority: 12,
    accentColor: '#64748b',
    year: '2025',
  },
  {
    slug: 'pama-attendance',
    displayName: 'Workforce Attendance Mobile',
    category: 'Production · Employer mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Flutter Developer · Persol Systems',
    scopeLabel: 'Production · Employer project',
    employerProject: true,
    stack: ['Flutter', 'Firebase', 'Geolocation', 'Workmanager'],
    description:
      'Workforce attendance app with geofenced check-in, cloud sync, and background location validation.',
    shortDescription: 'Geofenced workforce attendance with cloud backend.',
    problem: 'Organizations needed verifiable attendance with location proof, not just manual sign-in.',
    solution: 'Flutter app with geolocation validation, Firebase Firestore sync, and Workmanager for background tasks.',
    features: [
      'Geofenced check-in and check-out',
      'Firebase Auth and Firestore sync',
      'Background location validation via Workmanager',
      'Attendance history and reports',
      'Admin override and exception handling',
    ],
    architecture: `graph LR
  A[Attendance App] --> B[Firebase]
  A --> C[Geolocation]
  A --> D[Workmanager]`,
    technicalHighlights: ['Geofencing', 'Firebase', 'Background Workmanager'],
    outcome: 'Production attendance solution with location-verified check-ins.',
    featured: false,
    priority: 13,
    accentColor: '#0ea5e9',
    year: '2024',
  },
  {
    slug: 'hostelhub',
    displayName: 'HostelHub Suite',
    category: 'Personal / Client',
    categories: ['Web', 'Mobile', 'Backend', 'Personal'],
    role: 'Full-Stack Developer',
    stack: ['Flutter', 'Node.js', 'Express', 'MongoDB'],
    apiUrl: 'https://hostel-management-backend-hu0m.onrender.com',
    description:
      'Full hostel management suite with Flutter mobile app, web portal, and Node/Express/MongoDB backend.',
    shortDescription: 'Hostel booking and management across mobile, web, and API.',
    problem: 'Hostel managers juggled spreadsheets for rooms, tenants, and payments with no unified system.',
    solution: 'Built a three-part suite: Flutter mobile for tenants, Flutter web portal for managers, and Express API on MongoDB.',
    features: [
      'Room and bed allocation management',
      'Tenant registration and payment tracking',
      'Flutter mobile app for student tenants',
      'Web portal for hostel administrators',
      'REST API deployed on Render',
      'MongoDB for flexible hostel data models',
    ],
    architecture: `graph LR
  A[Flutter Mobile] --> C[Express API]
  B[Flutter Web] --> C
  C --> D[(MongoDB)]`,
    technicalHighlights: ['Multi-platform Flutter', 'Express REST API', 'MongoDB'],
    outcome: 'Client-ready hostel management platform with live API deployment.',
    featured: false,
    priority: 14,
    accentColor: '#ec4899',
    year: '2024',
  },
  {
    slug: 'lend-ledger',
    displayName: 'Lend Ledger',
    category: 'Personal',
    categories: ['Mobile', 'Personal'],
    role: 'Solo Developer',
    stack: ['Flutter', 'SQLite', 'PDF/CSV export', 'Biometrics', 'Firebase'],
    description:
      'Personal lending tracker with biometric lock, local SQLite storage, and PDF/CSV export for records.',
    shortDescription: 'Personal loan tracker with biometrics and export.',
    problem: 'Informal lenders and small groups needed a simple way to track who owes what without complex spreadsheets.',
    solution: 'Flutter app with SQLite persistence, biometric app lock, and one-tap PDF/CSV export.',
    features: [
      'Borrower and loan entry management',
      'Payment history and balance tracking',
      'Biometric app lock',
      'PDF and CSV export',
      'Firebase backup option',
      'Offline-first SQLite storage',
    ],
    architecture: `graph LR
  A[Lend Ledger App] --> B[(SQLite)]
  A --> C[Biometrics]
  A --> D[PDF Export]`,
    technicalHighlights: ['SQLite offline', 'Biometric lock', 'PDF/CSV export'],
    outcome: 'Personal finance tool for informal lending circles and small groups.',
    featured: false,
    priority: 15,
    accentColor: '#84cc16',
    year: '2024',
  },
  {
    slug: 'frankates-driver',
    displayName: 'Frankates Driver App',
    category: 'Mobile',
    categories: ['Mobile', 'Enterprise'],
    role: 'Lead Developer (Dev\'s Consult)',
    stack: ['Flutter', 'Riverpod', 'Background location', 'OSRM'],
    description:
      'Dedicated Flutter driver app for Frankates Marketplace with background GPS and OSRM route navigation.',
    shortDescription: 'Delivery driver app with background GPS and OSRM routing.',
    problem: 'Drivers needed a reliable mobile app for accepting deliveries, navigating routes, and updating order status on the move.',
    solution: 'Flutter app with Riverpod, background location services, and OSRM map integration — companion to the Frankates ecosystem.',
    features: [
      'Delivery assignment inbox',
      'Background GPS location updates',
      'OSRM-powered route navigation',
      'Order status updates (picked up, en route, delivered)',
      'Riverpod state management',
    ],
    architecture: `graph LR
  A[Driver App] --> B[Marketplace API]
  A --> C[OSRM Maps]
  A --> D[Background GPS]`,
    technicalHighlights: ['Background location', 'OSRM routing', 'Riverpod'],
    outcome: 'Production driver companion for the Frankates Marketplace ecosystem.',
    featured: false,
    priority: 16,
    accentColor: '#22c55e',
    year: '2025',
  },
  {
    slug: 'bridgecare-face-poc',
    displayName: 'BridgeCare Biometric Attendance POC',
    category: 'POC',
    categories: ['Mobile', 'POC'],
    role: 'Solo Developer',
    stack: ['Flutter', 'ML Kit', 'TFLite', 'Hive'],
    description:
      'Proof-of-concept for face-based attendance using ML Kit, TFLite models, and Hive local storage.',
    shortDescription: 'Face recognition attendance proof-of-concept.',
    problem: 'Explored whether on-device face recognition could replace manual attendance in low-connectivity settings.',
    solution: 'POC Flutter app with ML Kit face detection, TFLite inference, and Hive for embedding storage.',
    features: [
      'Face enrollment and recognition',
      'ML Kit face detection pipeline',
      'TFLite on-device inference',
      'Hive local embedding storage',
      'Attendance log with timestamps',
    ],
    architecture: `graph LR
  A[BridgeCare POC] --> B[ML Kit]
  A --> C[TFLite]
  A --> D[(Hive)]`,
    technicalHighlights: ['ML Kit', 'TFLite on-device', 'Hive storage'],
    outcome: 'Successful POC validating on-device face attendance feasibility.',
    featured: false,
    priority: 17,
    accentColor: '#f43f5e',
    year: '2024',
  },
  {
    slug: 'whatsapp-clone',
    displayName: 'WhatsApp Clone',
    category: 'Learning Project',
    categories: ['Mobile', 'POC', 'Personal'],
    role: 'Solo Developer',
    stack: ['Flutter', 'Hive', 'Camera', 'Voice notes'],
    description:
      'Feature-rich messaging clone with local Hive storage, camera integration, and voice note recording.',
    shortDescription: 'Messaging UI clone with camera and voice notes.',
    problem: 'Learning exercise to understand real-time messaging UX patterns and media handling in Flutter.',
    solution: 'Built a WhatsApp-inspired UI with Hive for local message storage, camera capture, and voice note playback.',
    features: [
      'Chat list and conversation views',
      'Text, image, and voice message types',
      'Camera integration for photo messages',
      'Voice note recording and playback',
      'Hive local message persistence',
    ],
    architecture: `graph LR
  A[Chat App] --> B[(Hive)]
  A --> C[Camera]
  A --> D[Audio Recorder]`,
    technicalHighlights: ['Hive local DB', 'Camera plugin', 'Audio recording'],
    outcome: 'Learning project demonstrating messaging UX and media handling in Flutter.',
    featured: false,
    priority: 18,
    accentColor: '#25d366',
    year: '2023',
  },
  {
    slug: 'simple-chat',
    displayName: 'Simple Chat App',
    category: 'Learning Project',
    categories: ['Mobile', 'POC'],
    role: 'Solo Developer',
    stack: ['Flutter', 'Firebase Auth', 'Firestore'],
    description:
      'Real-time chat app with Firebase Authentication and Cloud Firestore for message sync.',
    shortDescription: 'Firebase-powered real-time chat.',
    problem: 'Learning exercise for Firebase real-time data patterns and auth flows.',
    solution: 'Flutter chat app with Firebase Auth login and Firestore real-time message streams.',
    features: [
      'Firebase email/password authentication',
      'Real-time Firestore message sync',
      'Chat rooms and user presence',
      'Simple Material UI',
    ],
    architecture: `graph LR
  A[Chat App] --> B[Firebase Auth]
  A --> C[Cloud Firestore]`,
    technicalHighlights: ['Firebase Auth', 'Firestore streams', 'Real-time sync'],
    outcome: 'Learning project for Firebase backend integration patterns.',
    featured: false,
    priority: 19,
    accentColor: '#ffca28',
    year: '2023',
  },
  {
    slug: 'kiosk-demo',
    displayName: 'Android Kiosk Demo',
    category: 'POC',
    categories: ['Mobile', 'POC'],
    role: 'Solo Developer',
    stack: ['Kotlin', 'Compose', 'Device Admin API'],
    description:
      'Android kiosk mode demo using Device Admin API and Jetpack Compose for locked-down single-app experiences.',
    shortDescription: 'Kiosk mode demo with Device Admin API.',
    problem: 'Explored how to lock Android devices to a single app for field terminals and check-in stations.',
    solution: 'Kotlin/Compose demo app leveraging Device Admin API for kiosk lockdown mode.',
    features: [
      'Device Admin API kiosk lockdown',
      'Single-app mode enforcement',
      'Jetpack Compose kiosk UI',
      'Exit PIN protection',
    ],
    architecture: `graph LR
  A[Kiosk App] --> B[Device Admin API]
  A --> C[Compose UI]`,
    technicalHighlights: ['Device Admin API', 'Kiosk lockdown', 'Compose'],
    outcome: 'POC for dedicated field terminal and check-in station deployments.',
    featured: false,
    priority: 20,
    accentColor: '#475569',
    year: '2024',
  },
]

export const filterCategories: FilterCategory[] = [
  'All',
  'Web',
  'Mobile',
  'Backend',
  'Enterprise',
  'Personal',
  'POC',
]

export function getProjectBySlug(slug: string): Project | undefined {
  const project = projects.find((p) => p.slug === slug)
  if (!project || project.hidden) return undefined
  return project
}

export function getVisibleProjects(): Project[] {
  return projects.filter((p) => !p.hidden)
}

export function getVisibleProjectCount(): number {
  return getVisibleProjects().length
}

/** Rounds down for display (e.g. 17 → "15+") while staying below the true count. */
export function formatProjectCountPlus(count: number): string {
  if (count <= 1) return `${count}`
  if (count <= 5) return `${count - 1}+`
  const rounded = Math.floor(count / 5) * 5
  return `${rounded}+`
}

export function getFeaturedProjects(): Project[] {
  return getVisibleProjects()
    .filter((p) => p.featured)
    .sort((a, b) => a.priority - b.priority)
}

export function getSortedProjects(): Project[] {
  return [...getVisibleProjects()].sort((a, b) => a.priority - b.priority)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const sorted = getSortedProjects()
  const index = sorted.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? sorted[index - 1]! : null,
    next: index < sorted.length - 1 ? sorted[index + 1]! : null,
  }
}

export function filterProjects(
  category: FilterCategory,
  search: string,
): Project[] {
  let result = getSortedProjects()

  if (category !== 'All') {
    result = result.filter((p) => p.categories.includes(category))
  }

  if (search.trim()) {
    const q = search.toLowerCase()
    result = result.filter(
      (p) =>
        p.displayName.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.shortDescription.toLowerCase().includes(q),
    )
  }

  return result
}
