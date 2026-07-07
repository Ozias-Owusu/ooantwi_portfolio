/**
 * Capture HostelHub mobile app screenshots from the Flutter web build.
 *
 * Prerequisites:
 *   1. hostel_mobile_app repo with capture mode
 *   2. flutter build web (in that repo)
 *
 * Run: npm run capture:hostelhub-mobile
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MOBILE_ROOT = process.env.HOSTELHUB_MOBILE_ROOT
  ?? path.resolve(__dirname, '../../hostel_mobile_app')
const WEB_ROOT = path.join(MOBILE_ROOT, 'build/web')
const OUT_DIR = path.resolve(__dirname, '../public/projects/hostelhub/mobile')
const PORT = Number(process.env.HOSTELHUB_MOBILE_WEB_PORT ?? 5204)
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

async function screenshot(page, name, waitMs = 2500) {
  await page.waitForTimeout(waitMs)
  await page.screenshot({
    path: path.join(OUT_DIR, `${name}.png`),
    fullPage: false,
  })
  console.log(`  ✓ ${name}.png`)
}

async function captureScene(page, capture, name, waitMs = 3500) {
  await page.goto(`${BASE}/?capture=${capture}`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.waitForTimeout(waitMs)
  await screenshot(page, name, 1000)
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

  console.log('Loading HostelHub mobile web build with capture scenes...')

  await captureScene(page, 'splash', '01-splash', 3000)
  await captureScene(page, 'login', '02-login', 3500)
  await captureScene(page, 'hostel-list', '03-hostel-list', 4500)
  await captureScene(page, 'hostel-detail', '04-hostel-detail', 4500)
  await captureScene(page, 'room-selection', '05-room-selection', 4500)
  await captureScene(page, 'booking-confirmation', '06-booking-confirmation', 4500)
  await captureScene(page, 'owner-home', '07-owner-home', 4000)

  await context.close()
  console.log('HostelHub mobile captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (server) server.close()
}
