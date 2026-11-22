// Prueba en WebKit (motor de Safari) con perfiles de iPhone y Android.
import { webkit, chromium, devices } from 'playwright'
const B = process.argv[2] || 'http://localhost:3200'
const perfiles = [['iphone-13', webkit, devices['iPhone 13']], ['iphone-se', webkit, devices['iPhone SE']], ['pixel-7', chromium, devices['Pixel 7']]]
for (const [nombre, motor, dev] of perfiles) {
  const nav = await motor.launch(); const ctx = await nav.newContext({ ...dev }); const p = await ctx.newPage()
  const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => m.type() === 'error' && errores.push(m.text()))
  await p.goto(B + '/', { waitUntil: 'networkidle' })
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  await p.screenshot({ path: `qa/${nombre}-1-hero.png` })
  await p.evaluate(() => document.querySelector('.etapas').scrollIntoView({ block: 'start' }))
  await p.waitForTimeout(1800)
  await p.screenshot({ path: `qa/${nombre}-2-planta.png` })
  await p.tap('.zona-boton >> nth=2'); await p.waitForTimeout(1800)
  await p.screenshot({ path: `qa/${nombre}-3-salidas.png` })
  await p.tap('.pin[aria-label^="Punto 12"]', { force: true }); await p.waitForTimeout(1800)
  await p.tap('.ficha__acciones .btn'); await p.waitForTimeout(1500)
  await p.screenshot({ path: `qa/${nombre}-4-ficha.png` })
  const datos = await p.evaluate(() => {
    const caminan = [...document.querySelectorAll('.bp-walk')]
    const cs = caminan[0] ? getComputedStyle(caminan[0]) : null
    return { personas: caminan.length, offsetPath: cs ? (cs.offsetPath || cs.getPropertyValue('offset-path')) : '', animacion: cs ? cs.animationName : '', hoja: document.querySelector('.hoja').getAttribute('data-abierta'), titulo: document.querySelector('.ficha__titulo')?.textContent, mundo: document.querySelector('.mundo').style.transform }
  })
  await p.tap('.cabecera__boton'); await p.waitForTimeout(400)
  await p.screenshot({ path: `qa/${nombre}-5-menu.png` })
  console.log(nombre, JSON.stringify({ desborde, ...datos, errores }))
  await nav.close()
}
