'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ETAPAS, FICHAS, PLANTA, nn, type Ficha } from '@/lib/contenido'
import { PLANTA_CAM, PLANTA_EL, PLANTA_ZL, PLANTA_ZONAS } from '@/lib/svgs'

// Puntos que se muestran como atajo en la vista general (uno por tema).
const DESTACADOS = [1, 6, 11, 13, 18, 21]
// Cámara en celular, calibrada para un visor de 390 × 600 px.
const ZOOM_MOVIL: Record<number, number> = { 0: 0.145, 1: 0.27, 2: 0.25, 3: 0.24, 4: 0.29 }
// Puertas de zona de la vista general en celular: centro aproximado de cada zona en el plano.
const ZONAS_MOVIL: [number, number, number][] = [[1, 1600, 700], [2, 2450, 1100], [3, 1150, 1120], [4, 2050, 1480]]
const DX_MOVIL: Record<number, number> = { 0: -60, 1: 0, 2: 60, 3: -170, 4: 40 }

type Medida = { ancho: number; alto: number; escritorio: boolean }

// La capa animada llega como children desde el servidor para no viajar dentro del JavaScript.
export default function Planta({ children }: { children: React.ReactNode }) {
  const [etapa, setEtapa] = useState(0)
  const [sel, setSel] = useState(12)
  const [cerca, setCerca] = useState(false)
  const [abierta, setAbierta] = useState(false)
  const [plegada, setPlegada] = useState(false)
  const [espejo, setEspejo] = useState(false)
  const [pausaManual, setPausaManual] = useState(false)
  const [fuera, setFuera] = useState(false)
  const [medida, setMedida] = useState<Medida>({ ancho: 1440, alto: 920, escritorio: true })
  // La cámara no se anima hasta tener la medida real del visor (evita el zoom de entrada en celular).
  const [listo, setListo] = useState(false)
  const escenario = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = escenario.current
    if (!el) return
    const medir = () => setMedida({ ancho: el.clientWidth, alto: el.clientHeight, escritorio: window.matchMedia('(min-width: 1024px)').matches })
    const raf = requestAnimationFrame(() => { medir(); requestAnimationFrame(() => setListo(true)) })
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => setFuera(!e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)')
    const alQuieto = () => setPausaManual(quieto.matches)
    quieto.addEventListener('change', alQuieto)
    const raf2 = requestAnimationFrame(alQuieto)
    return () => { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(raf2); quieto.removeEventListener('change', alQuieto) }
  }, [])

  const ficha = FICHAS.find((f) => f.n === sel) ?? FICHAS[0]
  const deEtapa = useMemo(() => FICHAS.filter((f) => f.etapa === etapa), [etapa])
  const lista = etapa === 0 ? FICHAS.filter((f) => DESTACADOS.includes(f.n)) : deEtapa
  const enPunto = cerca && etapa > 0
  const m = espejo ? -1 : 1

  // Cámara: escala, foco y anclaje según el ancho del visor.
  const c = PLANTA_CAM[String(etapa)]
  let z: number, fx: number, fy: number, ancla: string
  if (medida.escritorio) {
    const k = Math.min(Math.max(medida.ancho / 1440, 0.7), 1.25)
    // En las etapas la cámara descuenta la lista de la izquierda y la ficha de la derecha.
    const zb = enPunto ? Math.max(c[2], 0.95) : etapa === 0 ? c[2] : c[2] * 0.88
    z = zb * k
    fx = enPunto ? ficha.pin[0] - (m * 40) / zb : etapa === 0 ? c[0] - (m * 230) / zb : c[0] - (m * 110) / zb
    fy = enPunto ? ficha.pin[1] + 60 : etapa === 0 ? c[1] - 60 / zb : c[1]
    ancla = 'left: calc(50% - 20px); top: calc(50% - 50px);'
  } else {
    const k = Math.min(Math.max(medida.ancho / 390, 0.9), 2.2)
    z = (enPunto ? 0.46 : ZOOM_MOVIL[etapa]) * k
    fx = enPunto ? ficha.pin[0] : c[0] + DX_MOVIL[etapa]
    fy = enPunto ? ficha.pin[1] + 40 : etapa === 0 ? c[1] + 380 : c[1] + 60
    const top = etapa === 0 ? 32 : abierta && enPunto ? 13 : 34
    ancla = `left: 50%; top: ${top}%;`
  }
  const inv = 1 / z
  const mundo: React.CSSProperties = {
    transform: `scale(${z}) scaleX(${m}) translate(${-fx}px, ${-fy}px)`,
  }
  const anclaje = Object.fromEntries(ancla.split(';').filter(Boolean).map((p) => p.split(':').map((s) => s.trim()))) as React.CSSProperties

  const elegir = (f: Ficha) => { setSel(f.n); setEtapa(f.etapa); setCerca(true); setPlegada(false) }
  const cambiarEtapa = (n: number) => {
    setCerca(false); setAbierta(false); setEtapa(n)
    if (n > 0) setSel((FICHAS.find((f) => f.etapa === n) ?? FICHAS[0]).n)
  }
  const idx = Math.max(0, deEtapa.findIndex((f) => f.n === sel))
  const mover = (d: number) => { const f = deEtapa[(idx + d + deEtapa.length) % deEtapa.length]; if (f) { setSel(f.n); setCerca(true) } }

  // Minimapa (escritorio): rectángulo de lo que se ve.
  const mk = 240 / 3540
  const altoVisor = medida.alto
  const x0 = fx - ((medida.ancho / 2 - 20 * (espejo ? -1 : 1)) / z)
  const marco = {
    left: `${(espejo ? 3540 - x0 - medida.ancho / z : x0) * mk}px`,
    top: `${(fy - (altoVisor / 2 - 50) / z) * mk}px`,
    width: `${(medida.ancho / z) * mk}px`,
    height: `${(altoVisor / z) * mk}px`,
  }

  return (
    <>
      <div className="contenedor planta__controles">
        <div role="tablist" aria-label="Etapas de la planta" className="etapas">
          {ETAPAS.map((e) => (
            <button key={e.n} type="button" role="tab" className="etapa" aria-selected={e.n === etapa} aria-controls="escenario-planta" onClick={() => cambiarEtapa(e.n)}>
              <span className="etapa__num">{nn(e.n)}</span>
              <span>{medida.escritorio ? e.nombre : e.corto}</span>
            </button>
          ))}
        </div>
        <div className="planta__herramientas">
          <button type="button" className="herramienta" onClick={() => setEspejo(!espejo)} aria-pressed={espejo}>
            {espejo ? 'Vista norte' : 'Girar vista'}
          </button>
          <button type="button" className="herramienta" onClick={() => setPausaManual(!pausaManual)} aria-pressed={pausaManual}>
            {pausaManual ? 'Reanudar movimiento' : 'Pausar movimiento'}
          </button>
        </div>
      </div>

      <div id="escenario-planta" ref={escenario} className="escenario" data-listo={listo} data-pausa={pausaManual || fuera} role="region" aria-label={`Planta interactiva, vista ${ETAPAS[etapa].nombre.toLowerCase()}`}>
        <span className="esquina esquina--1" aria-hidden="true" />
        <span className="esquina esquina--2" aria-hidden="true" />
        <span className="esquina esquina--3" aria-hidden="true" />
        <span className="esquina esquina--4" aria-hidden="true" />
        <div className="hud" aria-hidden="true">
          <span className="hud__vista"><span className="led" style={{ marginTop: 0 }} />{ETAPAS[etapa].nombre}{espejo ? ', vista espejo' : ''}</span>
          <span className="hud__cam">Zoom {z.toFixed(2)}</span>
        </div>

        <div className="mundo" style={{ ...anclaje, ...mundo }}>
          <img className="mundo__base" src="/planta/planta-ampliada.svg" alt="Complejo industrial de noche en cuatro zonas: entradas, proceso, salidas y gestión" width={3540} height={2240} />
          <svg className="mundo__capa" viewBox="0 0 3540 2240" aria-hidden="true" style={{ overflow: 'visible' }}>
            {PLANTA_ZONAS.map((p, i) => (
              <polygon key={i} className="zona" points={p} style={{ fill: "var(--ambar)", stroke: "var(--ambar)" }} fillOpacity={0.035} strokeWidth={2} strokeDasharray="14 10" opacity={etapa === i + 1 ? 1 : etapa === 0 ? 0.45 : 0.12} />
            ))}
            {children}
          </svg>
          {medida.escritorio ? PLANTA_ZL.map(([n, x, y, t]) => (
            <span key={t} className="rotulo-planta rotulo-planta--zona" data-activa={etapa === n} aria-hidden="true"
              style={{ left: x, top: y, transform: `translate(-50%, -50%) scaleX(${m}) scale(${inv})`, opacity: etapa === 0 || etapa === n ? 1 : 0.7 }}>
              {t}
            </span>
          )) : etapa === 0 && ZONAS_MOVIL.map(([n, x, y]) => (
            // En celular, la vista general muestra una puerta por zona en lugar de los puntos, que se enciman.
            <button key={n} type="button" className="zona-boton" onClick={() => cambiarEtapa(n)}
              style={{ left: x, top: y, transform: `translate(-50%, -50%) scaleX(${m}) scale(${inv})` }}>
              <span>{nn(n)}</span>{ETAPAS[n].nombre}
            </button>
          ))}
          {medida.escritorio && PLANTA_EL.map(([n, x, y, t]) => (
            <span key={t + x} className="rotulo-planta rotulo-planta--equipo" aria-hidden="true"
              style={{ left: x, top: y, transform: `translate(-50%, -50%) scaleX(${m}) scale(${inv})`, opacity: etapa === n ? 1 : 0 }}>
              {t}
            </span>
          ))}
          {(medida.escritorio || etapa > 0) && FICHAS.map((f) => {
            const activa = etapa === 0 || f.etapa === etapa
            const elegido = f.n === sel && etapa > 0
            const t = etapa === 0 && !medida.escritorio ? 26 : elegido ? 36 : 30
            return (
              <button key={f.n} type="button" className="pin" aria-label={`Punto ${nn(f.n)}: ${f.titulo}`}
                data-estado={elegido ? 'elegido' : activa ? 'activo' : 'apagado'} onClick={() => elegir(f)}
                style={{ left: f.pin[0], top: f.pin[1], width: t, height: t, fontSize: etapa === 0 && !medida.escritorio ? 10 : 12, transform: `translate(-50%, -100%) scaleX(${m}) scale(${inv})`, opacity: activa || elegido ? 1 : 0.6, zIndex: elegido ? 4 : activa ? 3 : 2 }}>
                {nn(f.n)}
              </button>
            )
          })}
        </div>

        <div className="minimapa" aria-hidden="true">
          <span className="minimapa__rotulo">Plano general</span>
          <div className="minimapa__caja" style={{ transform: espejo ? 'scaleX(-1)' : undefined }}>
            <img src="/planta/planta-ampliada.svg" alt="" width={240} height={152} loading="lazy" />
            <span className="minimapa__marco" style={marco} />
          </div>
        </div>

        <div className="panel-lista">
          <p className="panel-lista__rotulo">{nn(etapa)} {ETAPAS[etapa].nombre}</p>
          <h3>{ETAPAS[etapa].titulo}</h3>
          <p>{ETAPAS[etapa].bajada}</p>
          {etapa > 0 && (
            <ul>
              {lista.map((f) => (
                <li key={f.n}>
                  <button type="button" aria-current={f.n === sel} onClick={() => elegir(f)}>
                    <span className="panel-lista__n">{nn(f.n)}</span>
                    <span>{f.titulo}</span>
                    <span className="panel-lista__ejes" aria-label={f.ejes.map((e) => PLANTA.ejes[e]).join(', ')}>{f.ejes.join(' ')}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {etapa > 0 && <div className="leyenda" aria-hidden="true">
            <span>O operación</span><span>A ambiental</span><span>R regulatorio</span>
          </div>}
        </div>

        <article className="hoja" data-etapa={etapa > 0} data-abierta={abierta} aria-live="polite">
          <button type="button" className="hoja__asa" aria-expanded={abierta} aria-label={abierta ? 'Cerrar ficha' : 'Abrir ficha'} onClick={() => { setAbierta(!abierta); setCerca(true) }}>
            <span />
          </button>
          {etapa === 0 ? (
            <div className="ficha__general">
              <p className="panel-lista__rotulo">00 Vista general</p>
              <h3 className="ficha__titulo">{ETAPAS[0].titulo}</h3>
              <p>{medida.escritorio ? ETAPAS[0].bajada : ETAPAS[0].bajadaCelular}</p>
            </div>
          ) : (
            <div className="ficha" data-plegada={plegada}>
              <div className="ficha__meta">
                <span>Punto {nn(ficha.n)}, {ETAPAS[ficha.etapa].nombre} {deEtapa.length ? `${idx + 1}/${deEtapa.length}` : ''}</span>
                <span className="ficha__nav">
                  <button type="button" aria-label="Punto anterior" onClick={() => mover(-1)}>‹</button>
                  <button type="button" aria-label="Punto siguiente" onClick={() => mover(1)}>›</button>
                </span>
              </div>
              <h3 className="ficha__titulo">{ficha.titulo}</h3>
              <p className="ficha__autoridades">Autoridades: {ficha.autoridades}</p>
              {(medida.escritorio || abierta) && (
                <div className="ficha__detalle">
                  <div className="ficha__bloque"><h4>Cómo opera</h4><p>{ficha.opera}</p></div>
                  <div className="ficha__bloque"><h4>Qué se exige</h4><p>{ficha.exige}</p></div>
                </div>
              )}
              <div className="ficha__acciones">
                {medida.escritorio ? (
                  <button type="button" className="herramienta" onClick={() => setPlegada(!plegada)} aria-expanded={!plegada}>{plegada ? 'Ver detalle' : 'Plegar ficha'}</button>
                ) : (
                  <button type="button" className={`btn ${abierta ? 'btn--linea' : 'btn--primario'}`} onClick={() => { setAbierta(!abierta); setCerca(true) }} aria-expanded={abierta}>
                    {abierta ? 'Cerrar ficha' : 'Ver qué se exige'}
                  </button>
                )}
                <Link className="enlace ficha__enlace" href={`/planta/${ficha.slug}/`}>Ficha completa <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          )}
        </article>
      </div>

      <div className="contenedor planta__pie">
        <span>{PLANTA.nota}</span>
        <span>
          <Link className="enlace" href="/planta/">Ver todas las fichas de la planta <span aria-hidden="true">→</span></Link>
        </span>
      </div>
    </>
  )
}
