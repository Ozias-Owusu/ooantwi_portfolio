/**
 * Capture BridgeCare Collective marketing website screenshots (live Render deploy).
 * Run: npm run capture:bridgecare-website
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/projects/bridgecare-collective/website')
const BASE = process.env.BRIDGECARE_WEBSITE_URL
  ?? 'https://bridgecare-collective-website.onrender.com'

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch({ headless: true })

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  console.log('Capturing BridgeCare Collective marketing website...')

  const shots = [
    { path: '/', name: '01-home' },
    { path: '/values', name: '02-about-values' },
    { path: '/offer', name: '03-what-we-offer' },
    { path: '/contact', name: '04-contact' },
  ]

  for (const shot of shots) {
    await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle', timeout: 120000 })
    await page.waitForTimeout(2500)
    await page.screenshot({
      path: path.join(OUT_DIR, `${shot.name}.png`),
      fullPage: false,
    })
    console.log(`  ✓ ${shot.name}.png`)
  }

  await context.close()
  console.log('Website captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
}
