import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Cabecera from '@/components/Cabecera'
import Rotulo from '@/components/Rotulo'
import { Pie } from '@/components/Secciones'
import JsonLd from '@/components/JsonLd'
import { ETAPAS, FICHAS, OG_IMAGEN, PLANTA, SERVICIOS, agendaTexto, agendaUrl, fichaPorSlug, nn } from '@/lib/contenido'
import { grafoFicha } from '@/lib/jsonld'

export const dynamicParams = false
export function generateStaticParams() {
  return FICHAS.map((f) => ({ slug: f.slug }))
}

const recorte = (t: string, max: number) => {
  if (t.length <= max) return t
  const c = t.slice(0, max)
  return c.slice(0, c.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…'
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const f = fichaPorSlug((await params).slug)
  if (!f) return {}
  const descripcion = recorte(`${f.opera} ${f.exige}`, 158)
  return {
    title: f.titulo,
    description: descripcion,
    alternates: { canonical: `/planta/${f.slug}/` },
    openGraph: { url: `/planta/${f.slug}/`, title: `${f.titulo} | Grupo BluePoint`, description: descripcion, type: 'article', images: [OG_IMAGEN] },
  }
}

export default async function FichaPagina({ params }: { params: Promise<{ slug: string }> }) {
  const f = fichaPorSlug((await params).slug)
  if (!f) notFound()
  const etapa = ETAPAS[f.etapa]
  const vecinas = FICHAS.filter((x) => x.etapa === f.etapa && x.n !== f.n)
  const servicios = SERVICIOS.items.filter((s) => s.puntos.includes(f.n))
  return (
    <>
      <Cabecera />
      <main id="contenido" className="pagina">
        <div className="contenedor">
          <ol className="migas" aria-label="Ruta">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/planta/">La planta</Link></li>
            <li>{etapa.nombre}</li>
          </ol>
          <article className="ficha-pagina">
            <header className="ficha-pagina__cab">
              <Rotulo num={nn(f.n)}>{etapa.nombre}</Rotulo>
              <h1 className="titulo-1" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}>{f.titulo}</h1>
              <p className="bajada">Autoridades: {f.autoridades}</p>
            </header>
            <div className="ficha-pagina__cuerpo">
              <section className="ficha-pagina__bloque" aria-labelledby="como-opera">
                <h2 id="como-opera">Cómo opera</h2>
                <p>{f.opera}</p>
              </section>
              <section className="ficha-pagina__bloque" aria-labelledby="que-se-exige">
                <h2 id="que-se-exige">Qué se exige</h2>
                <p>{f.exige}</p>
              </section>
              <p className="ficha-pagina__nota">{PLANTA.nota}</p>
            </div>
            <aside className="ficha-pagina__lado">
              {servicios.length > 0 && (
                <div className="caja">
                  <h2>Cómo te ayudamos</h2>
                  <ul>{servicios.map((s) => <li key={s.titulo}><Link href="/#servicios">{s.titulo}</Link></li>)}</ul>
                </div>
              )}
              <div className="caja">
                <h2>Otros puntos de {etapa.nombre.toLowerCase()}</h2>
                <ul>{vecinas.map((v) => <li key={v.n}><Link href={`/planta/${v.slug}/`}><span>{nn(v.n)}</span>{v.titulo}</Link></li>)}</ul>
              </div>
              <div className="caja">
                <p>¿Necesitas revisar este punto en tu planta?</p>
                <a className="btn btn--primario" href={agendaUrl} target="_blank" rel="noopener">{agendaTexto}</a>
              </div>
            </aside>
          </article>
        </div>
      </main>
      <Pie />
      <JsonLd datos={grafoFicha(f, etapa.nombre)} />
    </>
  )
}
