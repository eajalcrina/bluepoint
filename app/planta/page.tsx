import type { Metadata } from 'next'
import Link from 'next/link'
import Cabecera from '@/components/Cabecera'
import Rotulo from '@/components/Rotulo'
import { Pie } from '@/components/Secciones'
import JsonLd from '@/components/JsonLd'
import { ETAPAS, FICHAS, OG_IMAGEN, PLANTA, SITIO, nn } from '@/lib/contenido'

const descripcion = 'Cómo opera cada sistema de una planta industrial y qué le exige la autoridad: agua, energía, proceso, efluentes, emisiones, residuos y gestión ambiental.'

export const metadata: Metadata = {
  title: 'Los sistemas de la planta',
  description: descripcion,
  alternates: { canonical: '/planta/' },
  openGraph: { url: '/planta/', title: 'Los sistemas de la planta | Grupo BluePoint', description: descripcion, images: [OG_IMAGEN] },
}

export default function IndicePlanta() {
  return (
    <>
      <Cabecera />
      <main id="contenido" className="pagina">
        <div className="contenedor">
          <ol className="migas" aria-label="Ruta">
            <li><Link href="/">Inicio</Link></li>
            <li>La planta</li>
          </ol>
          <div className="ficha-pagina__cab">
            <Rotulo num="01">{PLANTA.rotulo}</Rotulo>
            <h1 className="titulo-1" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>Los sistemas de la planta</h1>
            <p className="bajada">{descripcion}</p>
          </div>
          <div className="indice">
            {ETAPAS.slice(1).map((e) => (
              <section className="indice-etapa" key={e.n} aria-labelledby={`etapa-${e.n}`}>
                <h2 id={`etapa-${e.n}`} className="titulo-3" style={{ color: 'var(--blanco)' }}>{nn(e.n)} {e.nombre}: {e.titulo.toLowerCase()}</h2>
                <ol>
                  {FICHAS.filter((f) => f.etapa === e.n).map((f) => (
                    <li key={f.n}>
                      <Link href={`/planta/${f.slug}/`}>
                        <span className="indice-etapa__n">{nn(f.n)}</span>
                        <span><strong>{f.titulo}</strong><em>Autoridades: {f.autoridades}</em></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
          <p className="ficha-pagina__nota" style={{ marginTop: 40 }}>{PLANTA.nota}</p>
        </div>
      </main>
      <Pie />
      <JsonLd datos={{
        '@context': 'https://schema.org', '@type': 'CollectionPage', url: `${SITIO.url}/planta/`, name: 'Los sistemas de la planta', inLanguage: 'es-PE',
        hasPart: FICHAS.map((f) => ({ '@type': 'WebPage', name: f.titulo, url: `${SITIO.url}/planta/${f.slug}/` })),
      }} />
    </>
  )
}
