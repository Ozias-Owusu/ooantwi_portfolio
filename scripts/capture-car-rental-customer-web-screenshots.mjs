/**
 * Capture Car Rental GH customer web app screenshots.
 * Run: npm run capture:car-rental-customer-web
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CUSTOMER_ROOT = process.env.CAR_RENTAL_CUSTOMER_WEB_ROOT
  ?? path.resolve(__dirname, '../../car_rental_customer_web')
const OUT_DIR = path.resolve(__dirname, '../public/projects/car-rental/customer-web')
const PORT = Number(process.env.CAR_RENTAL_CUSTOMER_WEB_PORT ?? 5212)
const BASE = `http://127.0.0.1:${PORT}`

await mkdir(OUT_DIR, { recursive: true })

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer(url, attempts = 90) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { redirect: 'manual' })
      if (res.status >= 200 && res.status < 500) return
    } catch {
      // retry
    }
    await sleep(1000)
  }
  throw new Error(`Server not ready at ${url}`)
}

let previewProcess

async function startDev() {
  previewProcess = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: CUSTOMER_ROOT,
      stdio: 'ignore',
      shell: process.platform === 'win32',
      env: { ...process.env },
    },
  )
  await waitForServer(BASE)
}

async function screenshot(page, name) {
  await page.waitForTimeout(2500)
  await page.screenshot({
    path: path.join(OUT_DIR, `${name}.png`),
    fullPage: false,
  })
  console.log(`  ✓ ${name}.png`)
}

async function registerCustomer(page) {
  const stamp = Date.now()
  const email = `portfolio.capture.${stamp}@carrentalgh.com`
  await page.goto(`${BASE}/register`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForTimeout(1500)
  await page.getByLabel('First name').fill('Ama')
  await page.getByLabel('Last name').fill('Boateng')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Phone').fill('+233244000111')
  await page.getByLabel('Password').fill('Customer123!')
  await page.getByRole('button', { name: /create account/i }).click()
  await page.waitForURL((url) => !url.pathname.includes('/register'), { timeout: 45000 }).catch(() => {})
  await page.waitForTimeout(2500)
}

const browser = await chromium.launch({ headless: true })

try {
  await startDev()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  console.log('Capturing Car Rental customer web app...')

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '01-home')

  await page.goto(`${BASE}/search`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '02-search')

  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '03-login')

  await page.goto(`${BASE}/register`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '04-register')

  // Try to open first vehicle detail from search results
  await page.goto(`${BASE}/search`, { waitUntil: 'networkidle', timeout: 120000 })
  const vehicleLink = page.locator('a[href*="/vehicles/"]').first()
  if (await vehicleLink.count()) {
    await vehicleLink.click()
    await page.waitForURL(/\/vehicles\//, { timeout: 30000 }).catch(() => {})
    await screenshot(page, '05-vehicle-detail')
  }

  await registerCustomer(page)
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '06-home-authenticated')

  await page.goto(`${BASE}/bookings`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '07-bookings')

  await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '08-profile')

  await page.goto(`${BASE}/notifications`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '09-notifications')

  await context.close()
  console.log('Customer web captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (previewProcess) previewProcess.kill()
}
