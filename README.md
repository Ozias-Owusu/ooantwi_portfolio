# Owusu Antwi Portfolio

A production-ready personal developer portfolio built with React 19, Vite 8, Tailwind CSS 4, React Router 7, Framer Motion, and TypeScript.

## Stack
- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4
- React Router 7
- Framer Motion
- Lucide React

## Pages and routes
- / ù home page
- /projects ù searchable and filterable project gallery
- /projects/:slug ù project case study pages
- /about ù biography, timeline, and current focus
- /contact ù client-side validated contact form with mailto fallback
- * ù branded 404 page

## Getting started
`ash
npm install
npm run dev
`

Open the local URL shown by Vite.

## Production build
`ash
npm run build
npm run preview
`

The production output is generated in dist/.

## Lint
`ash
npm run lint
`

## Customization checklist
Replace these placeholders before deploying publicly:
- src/data/profile.ts
  - email
  - phone
  - LinkedIn URL
  - GitHub URL
  - exact resume path if needed
- public/resume.pdf
  - replace the placeholder file with your real resume PDF
- Optional: update the degree year or program in src/data/timeline.ts
- Optional: replace generated SVG project covers with real screenshots using scripts/capture-project-screenshots.md

## Project content
The portfolio includes 17 visible projects spanning:
- Marketplace and e-commerce
- Enterprise mobility
- Ghana eVAT and tax systems
- Visitor management and biometrics
- Church and community software
- Logistics and delivery

## Visual assets
- Custom SVG favicon in public/favicon.svg
- Open Graph image in public/og-image.svg
- Per-project SVG cover art in public/projects/
- Reusable mockup component in src/components/DeviceMockup.tsx

## Deploy to Vercel
1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Vercel should detect Vite automatically.
4. Use the default build command:
   `ash
   npm run build
   `
5. Use the default output directory:
   `ash
   dist
   `
6. Deploy.

This repo includes ercel.json for SPA route handling.

## Deploy to Netlify
1. Push the repository to GitHub.
2. Create a new Netlify site from the repo.
3. Set build command to:
   `ash
   npm run build
   `
4. Set publish directory to:
   `ash
   dist
   `
5. Deploy.

This repo includes 
etlify.toml for SPA redirects.

## Suggested domains
- owusuantwi.dev
- ooantwi.dev
- owusu-antwi.dev
- ooantwi.github.io

## Notes
- External links open in a new tab with safe rel attributes.
- Theme preference is stored in localStorage.
- Motion respects reduced-motion preferences.
- Featured case studies are included for Frankates Marketplace, TimeTrakker Logistics, CRM Consumer, and ChurchOS.
