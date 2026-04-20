import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

interface ScreenshotOptions {
  componentPath?: string
  url?: string
  outputPath?: string
  width?: number
  height?: number
}

async function screenshot(options: ScreenshotOptions): Promise<string> {
  const { 
    componentPath, 
    url: providedUrl,
    outputPath,
    width = 375, 
    height = 812 
  } = options

  let url = providedUrl
  if (!url && componentPath) {
    url = `http://localhost:5173?component=${encodeURIComponent(componentPath.replace('.tsx', ''))}`
  }

  if (!url) {
    throw new Error('Either --url or componentPath must be provided')
  }

  let finalOutputPath = outputPath
  if (!finalOutputPath && componentPath) {
    finalOutputPath = path.join(
      ROOT, 
      'components', 
      path.dirname(componentPath),
      `${path.basename(componentPath, '.tsx')}.png`
    )
  }

  if (!finalOutputPath) {
    throw new Error('Either --output or componentPath must be provided')
  }

  await fs.mkdir(path.dirname(finalOutputPath), { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2, // Retina
  })
  const page = await context.newPage()

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    const hasError = await page.locator('text=/로드 실패|error/i').count() > 0
    if (hasError) {
      throw new Error('Component failed to load')
    }

    let frame = null
    try {
      const iframeHandle = await page.waitForSelector('iframe.sp-preview-iframe', { timeout: 5000 })
      frame = await iframeHandle?.contentFrame()
    } catch {
      frame = null
    }

    if (frame) {
      await frame.waitForSelector('#root', { timeout: 30000 })
      await frame.evaluate(() => (document as any).fonts?.ready)
      await page.waitForTimeout(300)
      await frame.locator('body').screenshot({
        path: finalOutputPath,
        animations: 'disabled',
      })
    } else {
      await page.waitForSelector('#root', { timeout: 5000 })
      await page.evaluate(() => (document as any).fonts?.ready)
      await page.waitForTimeout(300)
      await page.screenshot({
        path: finalOutputPath,
        fullPage: true,
      })
    }

    console.log(`Screenshot saved: ${finalOutputPath}`)
    return finalOutputPath

  } finally {
    await browser.close()
  }
}

async function main() {
  const args = process.argv.slice(2)
  
  const options: ScreenshotOptions = {}
  const positionalArgs: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--url' && args[i + 1]) {
      options.url = args[++i]
    } else if (arg === '--output' && args[i + 1]) {
      options.outputPath = args[++i]
    } else if (arg === '--width' && args[i + 1]) {
      options.width = parseInt(args[++i], 10)
    } else if (arg === '--height' && args[i + 1]) {
      options.height = parseInt(args[++i], 10)
    } else if (!arg.startsWith('--')) {
      positionalArgs.push(arg)
    }
  }

  if (positionalArgs.length === 0 && !options.url) {
    console.error('Usage: npm run screenshot <componentPath> [--url <url>] [--output <path>] [--width <w>] [--height <h>]')
    console.error('Example: npm run screenshot login/LoginScreen')
    console.error('Example: npm run screenshot --url http://localhost:5173?component=login/LoginScreen --output ./out.png')
    process.exit(1)
  }

  const componentPath = positionalArgs[0]
  
  const normalizedPath = componentPath 
    ? (componentPath.endsWith('.tsx') ? componentPath : `${componentPath}.tsx`)
    : undefined

  try {
    await screenshot({ 
      ...options,
      componentPath: normalizedPath 
    })
  } catch (error) {
    console.error('Screenshot failed:', error)
    process.exit(1)
  }
}

main()
