import type { Metadata } from 'next'
import Cabecera from '@/components/Cabecera'
import Planta from '@/components/Planta'
import Rotulo from '@/components/Rotulo'
import JsonLd from '@/components/JsonLd'
import { Alianza, Clientes, Contacto, Direccion, Equipo, Faq, Hero, Miradas, Pasos, Pie, Sectores, Servicios } from '@/components/Secciones'
import { OG_IMAGEN, PLANTA, SITIO } from '@/lib/contenido'
import { grafoSitio } from '@/lib/jsonld'
import { PLANTA_ANIMACION } from '@/lib/svgs'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/', title: 'Grupo BluePoint, ambiental y regulatorio', description: SITIO.descripcionCorta, images: [OG_IMAGEN] },
}

export default function Inicio() {
  return (
    <>
      <Cabecera />
      <main id="contenido">
        <Hero />
        <section id="planta" className="planta" aria-labelledby="titulo-planta">
          <div className="contenedor planta__intro">
            <Rotulo num="01">{PLANTA.rotulo}</Rotulo>
            <h2 id="titulo-planta" className="titulo-2" style={{ color: 'var(--blanco)', maxWidth: 880 }}>{PLANTA.titulo}</h2>
            <p className="bajada">{PLANTA.bajada}</p>
            <p className="bajada">{PLANTA.bajada2}</p>
          </div>
          <Planta>
            <g dangerouslySetInnerHTML={{ __html: PLANTA_ANIMACION }} />
          </Planta>
        </section>
        <Pasos />
        <Miradas />
        <Servicios />
        <Sectores />
        <Clientes />
        <Direccion />
        <Equipo />
        <Alianza />
        <Faq />
        <Contacto />
      </main>
      <Pie />
      <JsonLd datos={grafoSitio()} />
    </>
  )
}
