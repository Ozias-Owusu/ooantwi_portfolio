/**
 * Capture Car Rental GH mobile app screenshots from Flutter web build.
 * Run: npm run capture:car-rental-mobile
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { extname, join } from 'node:path'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MOBILE_ROOT = process.env.CAR_RENTAL_MOBILE_ROOT
  ?? path.resolve(__dirname, '../../car_rental_mobile_app')
const WEB_ROOT = path.join(MOBILE_ROOT, 'build/web')
const OUT_DIR = path.resolve(__dirname, '../public/projects/car-rental/mobile')
const PORT = Number(process.env.CAR_RENTAL_MOBILE_PORT ?? 5213)
const BASE = `http://127.0.0.1:${PORT}`

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
}

function startStaticServer(root, port) {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0])
      const relativePath = urlPath === '/' ? '/index.html' : urlPath
      const filePath = join(root, relativePath)
      const data = await readFile(filePath)
      const type = MIME_TYPES[extname(filePath)] ?? 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' })
      res.end(data)
    } catch {
      res.writeHead(404).end('Not found')
    }
  })

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve(server))
  })
}

async function captureScene(page, capture, name, waitMs = 4000) {
  await page.goto(`${BASE}/?capture=${capture}`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForTimeout(waitMs)
  await page.screenshot({
    path: path.join(OUT_DIR, `${name}.png`),
    fullPage: false,
  })
  console.log(`  ✓ ${name}.png`)
}

await mkdir(OUT_DIR, { recursive: true })

let server
const browser = await chromium.launch({ headless: true })

try {
  server = await startStaticServer(WEB_ROOT, PORT)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  console.log('Loading Car Rental mobile web build with capture scenes...')

  await captureScene(page, 'login', '01-login', 3500)
  await captureScene(page, 'register', '02-register', 3500)
  await captureScene(page, 'home', '03-home', 4500)
  await captureScene(page, 'search', '04-search', 4500)
  await captureScene(page, 'vehicle-detail', '05-vehicle-detail', 4500)
  await captureScene(page, 'create-booking', '06-create-booking', 4500)
  await captureScene(page, 'bookings', '07-bookings', 4500)
  await captureScene(page, 'booking-detail', '08-booking-detail', 4500)
  await captureScene(page, 'profile', '09-profile', 4500)
  await captureScene(page, 'notifications', '10-notifications', 4500)

  await context.close()
  console.log('Car Rental mobile captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (server) server.close()
}
