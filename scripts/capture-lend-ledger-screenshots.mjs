/**
 * Capture Lend Ledger screenshots from the Flutter web build.
 *
 * Prerequisites:
 *   1. lend_ledger on test branch with capture mode
 *   2. flutter build web (in that repo)
 *
 * Run: npm run capture:lend-ledger
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LEND_LEDGER_ROOT = process.env.LEND_LEDGER_ROOT
  ?? path.resolve(__dirname, '../../lend_ledger')
const WEB_ROOT = path.join(LEND_LEDGER_ROOT, 'build/web')
const OUT_DIR = path.resolve(__dirname, '../public/projects/lend-ledger')
const PORT = Number(process.env.LEND_LEDGER_WEB_PORT ?? 5201)
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

async function settle(page, ms = 2000) {
  await page.waitForTimeout(ms)
}

async function captureScene(page, capture, name, waitMs = 3500) {
  await page.goto(`${BASE}/?capture=${capture}`, { waitUntil: 'networkidle', timeout: 120000 })
  await settle(page, waitMs)
  await screenshot(page, name, 1000)
}

await mkdir(OUT_DIR, { recursive: true })

let server
const browser = await chromium.launch({ headless: true })

try {
  server = await startStaticServer(WEB_ROOT, PORT)

  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  console.log('Loading Lend Ledger web build with capture scenes...')

  await captureScene(page, 'landing', '01-landing', 4500)
  await captureScene(page, 'login', '02-login', 4000)
  await captureScene(page, 'dashboard', '03-dashboard', 5000)
  await captureScene(page, 'customers', '04-customers', 4500)
  await captureScene(page, 'ledger', '05-customer-ledger', 4500)
  await captureScene(page, 'insights', '06-loan-insights', 5000)
  await captureScene(page, 'notifications', '07-notifications', 4500)
  await captureScene(page, 'settings', '08-settings', 4000)

  await context.close()
  console.log('Lend Ledger captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (server) server.close()
}
