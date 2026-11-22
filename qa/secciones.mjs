import { chromium } from 'playwright'
const nav = await chromium.launch(); const p = await nav.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
await p.goto('http://localhost:3200/', { waitUntil: 'networkidle' })
for (const [sel, n] of [['#nosotros', 'miradas'], ['#equipo', 'direccion'], ['.alianza', 'alianza'], ['.pie', 'pie'], ['.clientes', 'clientes']]) {
  await p.evaluate((s) => document.querySelector(s).scrollIntoView(), sel); await p.waitForTimeout(500)
  const el = await p.$(sel); await el.screenshot({ path: `qa/sec-${n}.png` })
}
await nav.close()
