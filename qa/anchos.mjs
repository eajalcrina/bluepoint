import { chromium } from 'playwright'
const nav = await chromium.launch()
for (const w of [1024, 1100, 1180, 1280, 1440]) {
  const p = await nav.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })
  await p.goto('http://localhost:3200/', { waitUntil: 'networkidle' })
  const r = await p.evaluate(() => {
    const fila = document.querySelector('.cabecera__fila').getBoundingClientRect()
    const els = [...document.querySelectorAll('.cabecera__fila > *')].filter((e) => getComputedStyle(e).display !== 'none').map((e) => { const b = e.getBoundingClientRect(); return [e.className.split(' ')[0], Math.round(b.left), Math.round(b.right), Math.round(b.height)] })
    return { ancho: innerWidth, desborde: document.documentElement.scrollWidth - innerWidth, fila: Math.round(fila.right), els }
  })
  console.log(JSON.stringify(r))
  await p.screenshot({ path: `qa/cab-${w}.png`, clip: { x: 0, y: 0, width: w, height: 90 } })
  await p.close()
}
await nav.close()
