import { chromium } from 'playwright'

const baseUrl = process.env.BASE_URL || 'http://localhost:3100'
const startUrl = `${baseUrl}/api/preview/dist/planning-brief/PlanningBriefScreen?officeNo=1&userNo=1&projectSlug=default`
const screenshotPath = process.env.SCREENSHOT_PATH || '.sisyphus/evidence/task-3-router.png'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

await page.goto(startUrl, { waitUntil: 'networkidle' })
await page.waitForSelector('[data-plid]')

await page.click('button[data-plana-route="project-overview/ProjectOverviewScreen"]')
await page.waitForURL('**/api/preview/dist/project-overview/ProjectOverviewScreen**')

await page.goBack({ waitUntil: 'networkidle' })
await page.waitForURL('**/api/preview/dist/planning-brief/PlanningBriefScreen**')

await page.screenshot({ path: screenshotPath, fullPage: true })

await browser.close()
