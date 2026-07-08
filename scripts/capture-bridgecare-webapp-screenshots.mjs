/**
 * Capture BridgeCare Collective Next.js webapp screenshots.
 *
 * Prerequisites: npm install && npm run build in bridgeCare_Collective_webapp
 * This script starts `next start` on port 5207 unless BRIDGECARE_WEBAPP_URL is set.
 *
 * Run: npm run capture:bridgecare-webapp
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WEBAPP_ROOT = process.env.BRIDGECARE_WEBAPP_ROOT
  ?? path.resolve(__dirname, '../../bridgeCare_Collective_webapp')
const OUT_DIR = path.resolve(__dirname, '../public/projects/bridgecare-collective/webapp')
const PORT = Number(process.env.BRIDGECARE_WEBAPP_PORT ?? 5207)
const EXTERNAL_URL = process.env.BRIDGECARE_WEBAPP_URL
const BASE = EXTERNAL_URL ?? `http://127.0.0.1:${PORT}`

await mkdir(OUT_DIR, { recursive: true })

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForServer(url, attempts = 60) {
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

let serverProcess

async function ensureServer() {
  if (EXTERNAL_URL) {
    await waitForServer(EXTERNAL_URL)
    return
  }

  serverProcess = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['next', 'start', '-p', String(PORT), '-H', '127.0.0.1'],
    {
      cwd: WEBAPP_ROOT,
      stdio: 'ignore',
      shell: process.platform === 'win32',
      env: { ...process.env, PORT: String(PORT) },
    },
  )

  await waitForServer(BASE)
}

async function screenshot(page, name) {
  await page.waitForTimeout(2000)
  await page.screenshot({
    path: path.join(OUT_DIR, `${name}.png`),
    fullPage: false,
  })
  console.log(`  ✓ ${name}.png`)
}

async function loginAs(page, role) {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForTimeout(1500)

  if (role === 'patient') {
    await page.getByRole('button', { name: /Amara[\s\S]*Patient/i }).first().click()
  } else {
    await page.getByRole('button', { name: /Nia[\s\S]*Doctor/i }).first().click()
  }

  await page.waitForURL(/\/home/, { timeout: 30000 }).catch(() => {})
  await page.waitForTimeout(2000)
}

const browser = await chromium.launch({ headless: true })

try {
  await ensureServer()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  console.log('Capturing BridgeCare webapp...')

  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '01-login')

  await loginAs(page, 'patient')
  await screenshot(page, '02-home')

  await page.goto(`${BASE}/learn`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '03-learn')

  await page.goto(`${BASE}/learn/article?id=a1`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '04-article')

  await page.goto(`${BASE}/ask`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '05-ask')

  await page.goto(`${BASE}/ask/q1`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '06-question')

  await page.goto(`${BASE}/chat`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '07-chat')

  await page.goto(`${BASE}/profile`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '08-profile')

  // Switch to doctor demo
  await page.evaluate(() => localStorage.clear())
  await loginAs(page, 'doctor')
  await screenshot(page, '09-doctor-home')

  await page.goto(`${BASE}/publish`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '10-publish')

  await page.goto(`${BASE}/ask`, { waitUntil: 'networkidle', timeout: 120000 })
  await screenshot(page, '11-answer-queue')

  await context.close()
  console.log('BridgeCare webapp captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (serverProcess) {
    serverProcess.kill()
  }
}
