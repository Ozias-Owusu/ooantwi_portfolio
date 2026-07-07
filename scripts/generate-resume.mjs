/**
 * Generate a valid PDF resume for the portfolio download link.
 * Run: npm run generate:resume
 */
import { chromium } from 'playwright'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public')
const HTML_PATH = path.join(OUT_DIR, 'resume-source.html')
const PDF_PATH = path.join(OUT_DIR, 'resume.pdf')

const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Ozias Owusu-Antwi — Resume</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", Arial, sans-serif;
      color: #1a1a2e;
      line-height: 1.45;
      font-size: 11pt;
      padding: 36px 42px;
    }
    h1 {
      font-size: 24pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }
    .subtitle {
      font-size: 12pt;
      color: #4f46e5;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .contact {
      font-size: 9.5pt;
      color: #475569;
      margin-bottom: 18px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
    }
    .contact span::after { content: "•"; margin-left: 14px; color: #cbd5e1; }
    .contact span:last-child::after { content: ""; }
    h2 {
      font-size: 11pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #4f46e5;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
      margin: 18px 0 10px;
    }
    .summary { color: #334155; margin-bottom: 4px; }
    .entry { margin-bottom: 12px; }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 2px;
    }
    .entry-title { font-weight: 700; font-size: 11pt; }
    .entry-org { font-weight: 600; color: #334155; }
    .entry-period { font-size: 9.5pt; color: #64748b; white-space: nowrap; }
    .entry-notes { color: #475569; font-size: 10pt; }
    ul { margin: 6px 0 0 18px; color: #475569; font-size: 10pt; }
    li { margin-bottom: 3px; }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 20px;
      font-size: 10pt;
      color: #475569;
    }
    .skill-group strong { color: #1e293b; display: block; margin-bottom: 2px; }
    .project { margin-bottom: 8px; }
    .project strong { color: #1e293b; }
  </style>
</head>
<body>
  <h1>Ozias Owusu-Antwi</h1>
  <div class="subtitle">Full-Stack &amp; Mobile Developer</div>
  <div class="contact">
    <span>Accra, Ghana</span>
    <span>ozykay42@gmail.com</span>
    <span>+233 246 37 5590</span>
    <span>linkedin.com/in/owusu-ozias-baa572207</span>
    <span>github.com/Ozias-Owusu</span>
  </div>

  <h2>Summary</h2>
  <p class="summary">
    Software developer with 4+ years building production mobile and web systems for enterprise teams
    and community-facing products. Experienced across Flutter, React, ASP.NET Core, Node.js, and
    Kotlin. I ship reliable software for marketplaces, logistics, tax systems, visitor management,
    and local businesses — using AI-assisted development to move from idea to production quickly
    without sacrificing architecture quality.
  </p>

  <h2>Experience</h2>
  <div class="entry">
    <div class="entry-header">
      <div><span class="entry-title">Software Developer</span> — <span class="entry-org">Persol Systems</span></div>
      <div class="entry-period">Present</div>
    </div>
    <p class="entry-notes">Enterprise mobile and web products across logistics, tax systems, visitor management, and internal operations.</p>
    <ul>
      <li>Build production Flutter and native Android apps for field and enterprise workflows</li>
      <li>Develop ASP.NET Core APIs, SQL Server backends, and secure authentication layers</li>
      <li>Deliver offline-capable mobile features, integrations, and deployment-ready releases</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-header">
      <div><span class="entry-title">Founder &amp; Lead Developer</span> — <span class="entry-org">Dev's Consult</span></div>
      <div class="entry-period">Present</div>
    </div>
    <p class="entry-notes">Client projects and end-to-end product delivery for startups and small businesses.</p>
    <ul>
      <li>Led delivery of Frankates Marketplace — multi-role e-commerce platform for local vendors</li>
      <li>Shipped hostel management, church management, loan tracking, and logistics products</li>
      <li>Own architecture, mobile/web development, API design, and client delivery</li>
    </ul>
  </div>

  <h2>Education</h2>
  <div class="entry">
    <div class="entry-header">
      <div><span class="entry-title">BSc Computer Engineering</span> — <span class="entry-org">Ghana Communication Technology University (GCTU)</span></div>
      <div class="entry-period">2024</div>
    </div>
    <p class="entry-notes">Focused on software engineering, mobile development, and building practical systems for real-world use.</p>
  </div>

  <h2>Selected Projects</h2>
  <div class="project"><strong>Frankates Marketplace</strong> — Flutter + ASP.NET Core multi-vendor marketplace with customer, vendor, driver, and admin apps.</div>
  <div class="project"><strong>GRA eVAT Mobile</strong> — Enterprise tax and e-invoicing mobile solution for Ghana Revenue Authority workflows.</div>
  <div class="project"><strong>ChurchOS</strong> — Flutter church management app with attendance, giving, events, and admin dashboards.</div>
  <div class="project"><strong>HostelHub Suite</strong> — Flutter mobile booking app, web admin portal, and Node.js/MongoDB API.</div>
  <div class="project"><strong>Lend Ledger</strong> — Flutter loan management app with ASP.NET Core 8 API and SQL Server.</div>

  <h2>Technical Skills</h2>
  <div class="skills-grid">
    <div class="skill-group"><strong>Frontend</strong>React, TypeScript, Vite, Tailwind CSS, JavaScript</div>
    <div class="skill-group"><strong>Mobile</strong>Flutter, Dart, Kotlin, Jetpack Compose, Android SDK</div>
    <div class="skill-group"><strong>Backend</strong>ASP.NET Core, Node.js/Express, REST APIs, JWT/OAuth</div>
    <div class="skill-group"><strong>Data &amp; Cloud</strong>SQL Server, SQLite, MongoDB, Firebase, Render, Git</div>
  </div>

  <h2>Languages</h2>
  <p class="entry-notes">English (fluent), Twi</p>
</body>
</html>`

await mkdir(OUT_DIR, { recursive: true })
await writeFile(HTML_PATH, resumeHtml, 'utf8')

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

try {
  await page.goto(`file:///${HTML_PATH.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' })
  await page.pdf({
    path: PDF_PATH,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
  })
  console.log(`Resume generated: ${PDF_PATH}`)
} finally {
  await browser.close()
}
