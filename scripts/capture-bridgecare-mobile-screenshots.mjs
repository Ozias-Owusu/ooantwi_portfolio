/**
 * Capture BridgeCare Collective mobile app screenshots from Flutter web build.
 *
 * Prerequisites:
 *   flutter create --platforms=web (once)
 *   flutter build web --release
 *
 * Run: npm run capture:bridgecare-mobile
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { extname, join } from 'node:path'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MOBILE_ROOT = process.env.BRIDGECARE_MOBILE_ROOT
  ?? path.resolve(__dirname, '../../bridgeCare_Collective_mobile')
const WEB_ROOT = path.join(MOBILE_ROOT, 'build/web')
const OUT_DIR = path.resolve(__dirname, '../public/projects/bridgecare-collective/mobile')
const PORT = Number(process.env.BRIDGECARE_MOBILE_WEB_PORT ?? 5206)
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

  console.log('Loading BridgeCare mobile web build with capture scenes...')

  await captureScene(page, 'splash', '01-splash', 3000)
  await captureScene(page, 'onboarding', '02-onboarding', 4000)
  await captureScene(page, 'login', '03-login', 4000)
  await captureScene(page, 'home', '04-home', 4500)
  await captureScene(page, 'learn', '05-learn', 4500)
  await captureScene(page, 'article', '06-article', 4500)
  await captureScene(page, 'ask', '07-ask', 4500)
  await captureScene(page, 'question', '08-question', 4500)
  await captureScene(page, 'chat', '09-chat', 4500)
  await captureScene(page, 'conversation', '10-conversation', 4500)
  await captureScene(page, 'doctor-home', '11-doctor-home', 4500)
  await captureScene(page, 'publish', '12-publish', 4500)

  await context.close()
  console.log('BridgeCare mobile captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (server) server.close()
}
