/**
 * Capture authenticated Frankates screenshots.
 *
 * Credentials via environment variables (never commit passwords):
 *   FRANKATES_CUSTOMER_EMAIL / FRANKATES_CUSTOMER_PASSWORD
 *   FRANKATES_VENDOR_EMAIL / FRANKATES_VENDOR_PASSWORD
 *   FRANKATES_ADMIN_EMAIL / FRANKATES_ADMIN_PASSWORD
 *   FRANKATES_DRIVER_EMAIL / FRANKATES_DRIVER_PASSWORD
 *
 * Run: npm run capture:frankates:auth
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '../public/projects/frankates-marketplace')
const BASE = 'https://franskate-marketplace.onrender.com'

const creds = {
  customer: {
    email: process.env.FRANKATES_CUSTOMER_EMAIL,
    password: process.env.FRANKATES_CUSTOMER_PASSWORD,
  },
  vendor: {
    email: process.env.FRANKATES_VENDOR_EMAIL,
    password: process.env.FRANKATES_VENDOR_PASSWORD,
  },
  admin: {
    email: process.env.FRANKATES_ADMIN_EMAIL,
    password: process.env.FRANKATES_ADMIN_PASSWORD,
  },
  driver: {
    email: process.env.FRANKATES_DRIVER_EMAIL,
    password: process.env.FRANKATES_DRIVER_PASSWORD,
  },
}

function requireCreds(role) {
  const { email, password } = creds[role]
  if (!email || !password) {
    throw new Error(`Missing credentials for ${role}. Set FRANKATES_${role.toUpperCase()}_EMAIL and FRANKATES_${role.toUpperCase()}_PASSWORD`)
  }
  return { email, password }
}

async function screenshot(page, name, waitMs = 5000) {
  await page.waitForTimeout(waitMs)
  await page.screenshot({
    path: path.join(OUT_DIR, `${name}.png`),
    fullPage: false,
  })
  console.log(`  ✓ ${name}.png`)
}

async function goto(page, route, timeout = 90000) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout })
}

async function captureCustomer(browser) {
  const { email, password } = requireCreds('customer')
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  console.log('Customer portal')
  await goto(page, '/shop/login')
  await page.getByPlaceholder('you@email.com').fill(email)
  await page.getByPlaceholder('Enter password').fill(password)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.waitForURL(/\/shop/, { timeout: 60000 })
  await screenshot(page, '07-shop-home', 8000)

  await goto(page, '/shop/products')
  await screenshot(page, '08-shop-products', 6000)

  await goto(page, '/shop')
  await page.waitForTimeout(3000)
  const productLink = page.locator('a[href*="/shop/products/"]').first()
  if (await productLink.count()) {
    await productLink.click()
    await page.waitForTimeout(4000)
    const addButton = page.getByRole('button', { name: /add to cart/i }).first()
    if (await addButton.count()) {
      await addButton.click()
      await page.waitForTimeout(2000)
    }
    await screenshot(page, '08b-product-detail', 3000)
  }

  await goto(page, '/shop/cart')
  await screenshot(page, '09-shop-cart', 5000)

  await goto(page, '/shop/checkout')
  await screenshot(page, '10-shop-checkout', 6000)

  await goto(page, '/shop/orders')
  await screenshot(page, '11-customer-orders', 5000)

  const orderLink = page.locator('a[href*="/shop/orders/"]').first()
  if (await orderLink.count()) {
    await orderLink.click()
    await page.waitForTimeout(6000)
    await screenshot(page, '12-order-tracking', 4000)
  }

  await context.close()
}

async function captureVendor(browser) {
  const { email, password } = requireCreds('vendor')
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  console.log('Vendor portal')
  await goto(page, '/auth/login')
  await page.waitForTimeout(20000)
  await page.getByPlaceholder('you@company.com').fill(email)
  await page.getByPlaceholder('Enter your password').fill(password)
  await page.getByRole('button', { name: 'Sign in to Vendor Portal' }).click()
  await page.waitForURL(/\/vendor/, { timeout: 60000 })

  await goto(page, '/vendor/dashboard')
  await screenshot(page, '13-vendor-dashboard', 8000)

  await goto(page, '/vendor/analytics')
  await screenshot(page, '14-vendor-analytics', 6000)

  await goto(page, '/vendor/orders')
  await screenshot(page, '15-vendor-orders', 5000)

  await goto(page, '/vendor/inventory')
  await screenshot(page, '16-vendor-inventory', 5000)

  await context.close()
}

async function captureAdmin(browser) {
  const { email, password } = requireCreds('admin')
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  console.log('Admin portal')
  await goto(page, '/admin/login')
  await page.locator('#admin-email').fill(email)
  await page.locator('#admin-password').fill(password)
  await page.getByRole('button', { name: 'Access Admin Portal' }).click()
  await page.waitForURL(/\/admin\/dashboard/, { timeout: 60000 })
  await page.waitForTimeout(12000)

  await goto(page, '/admin/dashboard')
  await screenshot(page, '17-admin-dashboard', 3000)

  await goto(page, '/admin/orders')
  await screenshot(page, '18-admin-orders', 5000)

  await goto(page, '/admin/vendors')
  await screenshot(page, '19-admin-vendors', 5000)

  await context.close()
}

async function captureDriver(browser) {
  const { email, password } = requireCreds('driver')
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  console.log('Driver portal')
  await goto(page, '/driver/login')
  await page.getByPlaceholder('driver@example.com').fill(email)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.waitForURL(/\/driver/, { timeout: 60000 })
  await screenshot(page, '20-driver-dashboard', 8000)

  await context.close()
}

await mkdir(OUT_DIR, { recursive: true })
const browser = await chromium.launch({ headless: true })

try {
  await captureCustomer(browser)
  await captureVendor(browser)
  await captureAdmin(browser)
  await captureDriver(browser)
  console.log('Authenticated captures complete.')
} catch (error) {
  console.error('Capture failed:', error.message)
  process.exitCode = 1
} finally {
  await browser.close()
}
