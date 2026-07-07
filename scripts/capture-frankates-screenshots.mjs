/**
 * Capture Frankates Marketplace screenshots from the live Render deployment.
 * Run: node scripts/capture-frankates-screenshots.mjs
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/projects/frankates-marketplace')
const BASE = 'https://franskate-marketplace.onrender.com'

const shots = [
  {
    name: '01-landing',
    url: '/',
    waitMs: 12000,
    fullPage: false,
  },
  {
    name: '02-shop-login',
    url: '/shop/login',
    waitMs: 6000,
    fullPage: false,
  },
  {
    name: '03-shop-register',
    url: '/shop/register',
    waitMs: 6000,
    fullPage: false,
  },
  {
    name: '04-vendor-login',
    url: '/auth/login',
    waitMs: 6000,
    fullPage: false,
  },
  {
    name: '05-admin-login',
    url: '/admin/login',
    waitMs: 6000,
    fullPage: false,
  },
  {
    name: '06-driver-login',
    url: '/driver/login',
    waitMs: 6000,
    fullPage: false,
  },
]

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()

for (const shot of shots) {
  const target = `${BASE}${shot.url}`
  console.log(`Capturing ${shot.name} → ${target}`)
  try {
    await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForTimeout(shot.waitMs)
    // Dismiss loading overlay if still visible
    await page.evaluate(() => {
      const text = document.body?.innerText || ''
      if (text.includes('INITIALIZING')) {
        return new Promise((resolve) => setTimeout(resolve, 8000))
      }
    })
    await page.screenshot({
      path: path.join(OUT_DIR, `${shot.name}.png`),
      fullPage: shot.fullPage,
    })
    console.log(`  ✓ saved ${shot.name}.png`)
  } catch (error) {
    console.error(`  ✗ failed ${shot.name}:`, error.message)
  }
}

await browser.close()
console.log('Done.')
