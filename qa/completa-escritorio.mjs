import { chromium } from 'playwright'
const B = 'http://localhost:3200'
const nav = await chromium.launch(); const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage()
for (const [r, n] of [['/', 'inicio'], ['/planta/', 'planta'], ['/planta/tratamiento-de-efluentes/', 'ficha']]) {
  await p.goto(B + r, { waitUntil: 'networkidle' })
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) } scrollTo(0, 0) })
  await p.waitForTimeout(600)
  await p.screenshot({ path: `qa/completas/1440_${n}.png`, fullPage: true })
}
await nav.close()
