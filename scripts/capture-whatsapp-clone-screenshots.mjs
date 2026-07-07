/**
 * Capture WhatsApp Clone screenshots from the Flutter web build.
 *
 * Prerequisites:
 *   1. whatsapp repo on master branch with capture mode
 *   2. flutter build web (in that repo)
 *
 * Run: npm run capture:whatsapp-clone
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WHATSAPP_ROOT = process.env.WHATSAPP_CLONE_ROOT
  ?? path.resolve(__dirname, '../../whatsapp')
const WEB_ROOT = path.join(WHATSAPP_ROOT, 'build/web')
const OUT_DIR = path.resolve(__dirname, '../public/projects/whatsapp-clone')
const PORT = Number(process.env.WHATSAPP_CLONE_WEB_PORT ?? 5203)
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
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
  const page = await context.newPage()

  console.log('Loading WhatsApp Clone web build with capture scenes...')

  await captureScene(page, 'chats', '01-chats', 4500)
  await captureScene(page, 'chat-detail', '02-chat-conversation', 5000)
  await captureScene(page, 'chat-voice', '03-chat-voice-note', 4500)
  await captureScene(page, 'updates', '04-updates', 4500)
  await captureScene(page, 'calls', '05-calls', 4000)
  await captureScene(page, 'communities', '06-communities', 4500)
  await captureScene(page, 'contact-info', '07-contact-info', 4500)
  await captureScene(page, 'settings', '08-settings', 3500)

  await context.close()
  console.log('WhatsApp Clone captures complete.')
} catch (error) {
  console.error('Capture failed:', error)
  process.exitCode = 1
} finally {
  await browser.close()
  if (server) server.close()
}
