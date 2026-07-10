/**
 * Capture Car Rental GH admin/partner web app screenshots.
 * Run: npm run capture:car-rental-admin
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ADMIN_ROOT = process.env.CAR_RENTAL_ADMIN_ROOT
  ?? path.resolve(__dirname, '../../car_rental_web_admin')
const OUT_DIR = path.resolve(__dirname, '../public/projects/car-rental/admin')
const PORT = Number(process.env.CAR_RENTAL_ADMIN_PORT ?? 5211)
const BASE = `http://127.0.0.1:${PORT}`
const STAGING_API = 'https://car-rental-api-test.onrender.com'

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

async function wakeStagingApi() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`${STAGING_API}/swagger/index.html`, { redirect: 'manual' })
      if (res.status >= 200 && res.status < 500) return
    } catch {
      // Render cold start
    }
    await sleep(3000)
  }
}

function unwrapAuth(body) {
  if (body && typeof body === 'object' && 'data' in body) return body.data
  return body
}

async function postJson(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

async function loginViaProxy(base, email, password) {
  const { ok, body } = await postJson(`${base}/api/auth/login`, { email, password })
  if (ok) return unwrapAuth(body)

  const stamp = Date.now()
  const registerPath = email.includes('partner')
    ? '/api/auth/register/partner'
    : '/api/auth/register/admin'

  const registerPayload = email.includes('partner')
    ? {
        email: `portfolio.partner.${stamp}@carrentalgh.com`,
        password,
        firstName: 'Kwame',
        lastName: 'Mensah',
        phone: '+233244123456',
        businessName: 'Golden Fleet Ghana Ltd',
        businessRegistrationNumber: `BN-GH-${stamp}`,
        address: 'Ring Road Central, Accra',
        city: 'Accra',
      }
    : {
        email: `portfolio.admin.${stamp}@carrentalgh.com`,
        password,
        firstName: 'System',
        lastName: 'Admin',
        phone: '+233200000001',
      }

  const registered = await postJson(`${base}${registerPath}`, registerPayload)
  if (registered.ok) return unwrapAuth(registered.body)

  throw new Error(
    `Could not authenticate ${email}: login ${body?.error ?? 'failed'}, register ${registered.body?.error ?? 'failed'}`,
  )
}

async function waitForProxyAuth(base, email, password) {
  for (let i = 0; i < 15; i++) {
    try {
      return await loginViaProxy(base, email, password)
    } catch {
      await sleep(2000)
    }
  }
  throw new Error(`Proxy auth unavailable for ${email}`)
}

let previewProcess

async function startDev() {
  previewProcess = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: ADMIN_ROOT,
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

async function createAuthedContext(browser, auth, password) {
  if (!auth?.accessToken || !auth?.refreshToken || !auth?.email) {
    throw new Error('Missing auth tokens from API login/register flow')
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })

  const page = await context.newPage()
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.getByLabel('Email address').fill(auth.email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: /sign in to dashboard/i }).click()
  await page.getByText(/Good to see you|Platform Overview|Your Fleet Dashboard/).first().waitFor({
    timeout: 90000,
  })

  return { context, page }
}

async function openPage(page, route) {
  await page.goto(`${BASE}/${route}`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForTimeout(1500)
}

const browser = await chromium.launch({ headless: true })

try {
  await wakeStagingApi()
  await startDev()

  console.log('Capturing Car Rental admin web app...')

  {
    const loginContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    })
    const loginPage = await loginContext.newPage()
    await loginPage.goto(`${BASE}/login`, { waitUntil: 'networkidle', timeout: 120000 })
    await screenshot(loginPage, '01-login')
    await loginContext.close()
  }

  const adminAuth = await waitForProxyAuth(BASE, 'admin@carrentalgh.com', 'Admin123!')
  const { context: adminContext, page: adminPage } = await createAuthedContext(browser, adminAuth, 'Admin123!')
  await screenshot(adminPage, '02-dashboard')

  for (const [route, name] of [
    ['vehicles', '03-vehicles'],
    ['bookings', '04-bookings'],
    ['customers', '05-customers'],
    ['partners', '06-partners'],
    ['approvals', '07-approvals'],
    ['disputes', '08-disputes'],
    ['promos', '09-promos'],
    ['reports', '10-reports'],
  ]) {
    await openPage(adminPage, route)
    await screenshot(adminPage, name)
  }

  await adminContext.close()

  const partnerAuth = await waitForProxyAuth(BASE, 'partner@carrentalgh.com', 'Partner123!')
  const { context: partnerContext, page: partnerPage } = await createAuthedContext(browser, partnerAuth, 'Partner123!')
  await screenshot(partnerPage, '11-partner-dashboard')

  for (const [route, name] of [
    ['fleet', '12-partner-fleet'],
    ['bookings', '13-partner-bookings'],
    ['profile', '14-partner-profile'],
  ]) {
    await openPage(partnerPage, route)
    await screenshot(partnerPage, name)
  }

  await partnerContext.close()
  console.log('Admin captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (previewProcess) previewProcess.kill()
}
