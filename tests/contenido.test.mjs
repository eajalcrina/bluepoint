// Pruebas del repositorio: integridad de datos y reglas de texto que no deben romperse.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const fichas = JSON.parse(readFileSync('data/fichas.json', 'utf8'))
const contenido = readFileSync('lib/contenido.ts', 'utf8')

test('las 24 fichas tienen número, slug único, textos y punto en el plano', () => {
  assert.equal(fichas.length, 24)
  const slugs = new Set(fichas.map((f) => f.slug))
  assert.equal(slugs.size, 24)
  for (const f of fichas) {
    assert.match(f.slug, /^[a-z0-9-]+$/)
    assert.ok(f.titulo && f.opera && f.exige && f.autoridades, `ficha ${f.n} incompleta`)
    assert.equal(f.pin.length, 2)
  }
})

test('cada punto citado en servicios existe', () => {
  const puntos = [...contenido.matchAll(/puntos: \[([\d, ]+)\]/g)].flatMap((m) => m[1].split(',').map(Number))
  for (const n of puntos) assert.ok(fichas.some((f) => f.n === n), `punto ${n}`)
})

const textos = []
const recorrer = (d) => { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) recorrer(p); else if (/\.(tsx|ts)$/.test(n) && !/svgs|isotipo/.test(n)) textos.push([p, readFileSync(p, 'utf8')]) } }
recorrer('app'); recorrer('components'); recorrer('lib')

test('sin «·» ni rayas como separador en textos', () => {
  for (const [p, t] of textos) {
    assert.ok(!/'[^'\n]*\s·\s[^'\n]*'/.test(t), `«·» en ${p}`)
    assert.ok(!/[a-záéíóú] — [a-záéíóú]/i.test(t), `raya en ${p}`)
  }
})

test('nombre oficial: nunca «Bluepoint Advisory» fuera de la advertencia de llms.txt', () => {
  for (const [p, t] of textos) if (!p.includes('llms')) assert.ok(!/BluePoint Advisory/i.test(t), p)
})

test('Textil no está entre los sectores', () => {
  assert.ok(!/nombre: 'Textil'/.test(contenido))
})
