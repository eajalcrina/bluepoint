import Link from 'next/link'
import Rotulo from './Rotulo'
import { IconoCorreo, IconoFacebook, IconoLinkedin, IconoWhatsapp } from './Iconos'
import Logo from './Logo'
import {
  ALIANZA, CIFRAS, CLIENTES, CONTACTO, DIRECTOR, EQUIPO, FAQ, FICHAS, HERO, MIRADAS, PASOS, PIE, SECTORES, SERVICIOS, SITIO,
  agendaTexto, agendaUrl, nn, whatsappUrl,
} from '@/lib/contenido'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="titulo-hero">
      <picture>
        <source media="(max-width: 767px)" srcSet="/img/hero-planta-960.webp" />
        <img className="hero__foto" src="/img/hero-planta.webp" alt="" width={1920} height={1280} fetchPriority="high" />
      </picture>
      <div className="hero__velo" aria-hidden="true" />
      <div className="contenedor hero__contenido">
        <p className="hero__estado"><span className="led" aria-hidden="true" />{HERO.estado}</p>
        <h1 id="titulo-hero" className="titulo-1">{HERO.titulo}</h1>
        <div className="hero__textos">
          <p>{HERO.bajada}</p>
          <p>{HERO.bajada2}</p>
        </div>
        <div className="hero__acciones">
          <a className="btn btn--primario" href={agendaUrl} target="_blank" rel="noopener">{agendaTexto}</a>
          <a className="btn btn--linea" href={HERO.secundario.href}>{HERO.secundario.texto}</a>
        </div>
        <div className="cifras">
          {CIFRAS.items.map((c) => (
            <div className="cifra" key={c.rotulo}>
              <span className="cifra__rotulo">{c.rotulo}</span>
              <span className="cifra__valor">{c.valor}</span>
              <span className="cifra__barra" aria-hidden="true">{c.barra ? <span style={{ width: `${c.barra}%` }} /> : null}</span>
              <span className="cifra__texto">{c.texto}</span>
            </div>
          ))}
          <p className="cifras__nota">{CIFRAS.nota}</p>
        </div>
      </div>
    </section>
  )
}

export function Pasos() {
  return (
    <section className="seccion sobre-claro" aria-labelledby="titulo-pasos">
      <div className="contenedor">
        <div className="encabezado-seccion encabezado-seccion--doble">
          <Rotulo num="02">{PASOS.rotulo}</Rotulo>
          <h2 id="titulo-pasos" className="titulo-2">{PASOS.titulo}</h2>
          <p className="bajada">{PASOS.bajada}</p>
        </div>
        <ol className="pasos__lista">
          {PASOS.items.map((p, i) => (
            <li className="paso" key={p.nombre}>
              <div className="paso__ilus">
                <img src={`/etapas/a${i + 1}.svg`} alt={p.ilustracion} width={228} height={200} loading="lazy" />
              </div>
              <div className="paso__texto">
                <span className="paso__rotulo">Etapa {nn(i + 1)}</span>
                <h3 className="titulo-3">{p.nombre}</h3>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Miradas() {
  return (
    <section id="nosotros" className="seccion miradas sobre-marino" aria-labelledby="titulo-miradas">
      <div className="contenedor">
        <div className="encabezado-seccion">
          <Rotulo num="03">{MIRADAS.rotulo}</Rotulo>
          <h2 id="titulo-miradas" className="titulo-2">{MIRADAS.titulo}</h2>
          <p className="bajada">{MIRADAS.bajada}</p>
        </div>
        <div className="miradas__grid">
          {MIRADAS.items.map((m) => (
            <div className="mirada" key={m.titulo}>
              <img className="mirada__glifo" src={`/etapas/${m.glifo}.svg`} alt={m.ilustracion} width={249} height={190} loading="lazy" />
              <h3 className="titulo-3">{m.titulo}</h3>
              <p>{m.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Servicios() {
  const porN = (n: number) => FICHAS.find((f) => f.n === n)!
  return (
    <section id="servicios" className="seccion sobre-claro" aria-labelledby="titulo-servicios">
      <div className="contenedor">
        <div className="encabezado-seccion encabezado-seccion--doble">
          <Rotulo num="04">{SERVICIOS.rotulo}</Rotulo>
          <h2 id="titulo-servicios" className="titulo-2">{SERVICIOS.titulo}</h2>
          <p className="bajada">{SERVICIOS.bajada}</p>
        </div>
        <ol className="servicios__lista">
          {SERVICIOS.items.map((s, i) => (
            <li className="servicio" key={s.titulo}>
              <span className="servicio__num">S {nn(i + 1)}</span>
              <h3 className="titulo-3">{s.titulo}</h3>
              <p>{s.texto}</p>
              <div className="servicio__puntos">
                <span>Puntos de la planta</span>
                {s.puntos.map((n) => (
                  <Link key={n} href={`/planta/${porN(n).slug}/`} aria-label={`Punto ${nn(n)}: ${porN(n).titulo}`}>{nn(n)}</Link>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Sectores() {
  return (
    <section id="sectores" className="seccion sobre-oscuro" aria-labelledby="titulo-sectores">
      <div className="contenedor">
        <div className="encabezado-seccion encabezado-seccion--doble">
          <Rotulo num="05">{SECTORES.rotulo}</Rotulo>
          <h2 id="titulo-sectores" className="titulo-2" style={{ color: 'var(--blanco)' }}>{SECTORES.titulo}</h2>
          <div>
            <p className="bajada">{SECTORES.bajada}</p>
            <p className="bajada">{SECTORES.bajada2}</p>
          </div>
        </div>
        <div className="sectores__cab" aria-hidden="true"><span>Sector</span><span>Proceso típico</span><span>Puntos críticos</span></div>
        <ul className="sectores__lista">
          {SECTORES.items.map((s) => (
            <li className="sector" key={s.nombre}>
              <h3 className="sector__nombre">{s.nombre}</h3>
              <p className="sector__proceso">{s.proceso}</p>
              <p className="sector__criticos"><span>Puntos críticos</span>{s.criticos}</p>
            </li>
          ))}
        </ul>
        <p className="sectores__otros">{SECTORES.otros}</p>
      </div>
    </section>
  )
}

export function Clientes() {
  return (
    <section className="clientes sobre-oscuro" aria-labelledby="titulo-clientes">
      <div className="contenedor">
        <div className="encabezado-seccion">
          <Rotulo>{CLIENTES.rotulo}</Rotulo>
          <h2 id="titulo-clientes" className="titulo-2" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)' }}>{CLIENTES.titulo}</h2>
        </div>
        <ul className="clientes__grid">
          {CLIENTES.items.map((c) => (
            <li className="cliente" key={c.nombre}>
              <img src={c.logo} alt={c.nombre} width={c.ancho} height={c.alto} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Direccion() {
  return (
    <section id="equipo" className="seccion sobre-claro" aria-labelledby="titulo-direccion">
      <div className="contenedor direccion">
        <figure className="direccion__foto" style={{ margin: 0 }}>
          <img src={DIRECTOR.foto} alt={`${DIRECTOR.nombre}, director de Grupo BluePoint`} width={800} height={1000} loading="lazy" />
        </figure>
        <div className="direccion__texto">
          <Rotulo num="06">{DIRECTOR.rotulo}</Rotulo>
          <h2 id="titulo-direccion" className="titulo-2">{DIRECTOR.nombre}</h2>
          <p className="direccion__cargo">{DIRECTOR.cargo}</p>
          {DIRECTOR.bio.map((p) => <p className="direccion__bio" key={p.slice(0, 20)}>{p}</p>)}
          <ul className="formacion">{DIRECTOR.formacion.map((f) => <li key={f}>{f}</li>)}</ul>
          <div className="modalidades" aria-label={DIRECTOR.modalidades.titulo}>
            {DIRECTOR.modalidades.items.map((t, i) => (
              <div key={t}><strong>{t}</strong><span>M {nn(i + 1)}</span></div>
            ))}
          </div>
          <p className="direccion__nota">{DIRECTOR.modalidades.nota}</p>
          <a className="enlace" href={DIRECTOR.linkedin} target="_blank" rel="noopener">LinkedIn de Aníbal <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}

export function Equipo() {
  return (
 <section className="seccion sobre-claro" aria-labelledby="titulo-equipo" style={{ borderTop: '1px solid var(--linea-clara)' }}>
      <div className="contenedor">
        <div className="encabezado-seccion encabezado-seccion--doble">
          <Rotulo num="07">{EQUIPO.rotulo}</Rotulo>
          <h2 id="titulo-equipo" className="titulo-2">{EQUIPO.titulo}</h2>
          <p className="bajada">{EQUIPO.bajada}</p>
        </div>
        <div className="equipo__grid">
          {EQUIPO.personas.map((p) => (
            <article className="persona" key={p.nombre}>
              <div className="persona__cab">
                <img src={`${p.foto}-400.webp`} srcSet={`${p.foto}-400.webp 400w, ${p.foto}.webp 800w`} sizes="160px" alt={`${p.nombre}, ${p.area.toLowerCase()}`} width={400} height={400} loading="lazy" />
                <div>
                  <p className="persona__area">{p.area}</p>
                  <h3 className="titulo-3" style={{ fontSize: 24 }}>{p.nombre}</h3>
                </div>
              </div>
              {p.bio.map((b) => <p key={b.slice(0, 20)}>{b}</p>)}
              <ul className="etiquetas" aria-label="Instituciones">{p.instituciones.map((t) => <li key={t}>{t}</li>)}</ul>
              {p.linkedin && <a className="enlace" href={p.linkedin} target="_blank" rel="noopener">LinkedIn de {p.nombre.split(' ')[0]} <span aria-hidden="true">↗</span></a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Alianza() {
  const [antes, despues] = ALIANZA.texto1.split('Eddie Ajalcriña')
  return (
    <section className="alianza sobre-marino" aria-labelledby="titulo-alianza">
      <div className="contenedor alianza__grid">
        <div className="alianza__texto">
          <Rotulo>{ALIANZA.rotulo}</Rotulo>
          <h2 id="titulo-alianza" className="titulo-2" style={{ fontSize: 'clamp(26px, 2.8vw, 40px)', color: 'var(--blanco)' }}>{ALIANZA.titulo}</h2>
          <p>{antes}<a href={ALIANZA.eddie} target="_blank" rel="noopener">Eddie Ajalcriña</a>{despues}</p>
          <p>{ALIANZA.texto2}</p>
        </div>
        <div className="alianza__accion">
          <a className="btn btn--linea" href={ALIANZA.enlace.href} target="_blank" rel="noopener">{ALIANZA.enlace.texto}</a>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="seccion sobre-claro" aria-labelledby="titulo-faq">
      <div className="contenedor faq__grid">
        <div className="encabezado-seccion">
          <Rotulo>{FAQ.rotulo}</Rotulo>
          <h2 id="titulo-faq" className="titulo-2">{FAQ.titulo}</h2>
        </div>
        <div className="faq__lista">
          {FAQ.items.map((q) => (
            <details className="faq__item" key={q.p}>
              <summary>{q.p}</summary>
              <p>{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contacto() {
  return (
    <section id="contacto" className="contacto" aria-labelledby="titulo-contacto">
      <div className="contenedor contacto__grid">
        <div className="encabezado-seccion sobre-oscuro" style={{ background: 'transparent' }}>
          <Rotulo num="08">{CONTACTO.rotulo}</Rotulo>
          <h2 id="titulo-contacto" className="titulo-2" style={{ color: 'var(--blanco)' }}>{CONTACTO.titulo}</h2>
          <p className="bajada">{CONTACTO.bajada}</p>
        </div>
        <div>
          <div className="contacto__acciones">
            <a className="btn btn--primario" href={agendaUrl} target="_blank" rel="noopener">{agendaTexto}</a>
            {agendaUrl !== whatsappUrl && (
              <a className="btn btn--linea btn--icono" href={whatsappUrl} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><IconoWhatsapp size={24} /></a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Pie() {
  const redes = [
    { href: whatsappUrl, texto: '955 123 231', icono: <IconoWhatsapp size={20} />, etiqueta: 'WhatsApp' },
    { href: `mailto:${SITIO.correo}`, texto: SITIO.correo, icono: <IconoCorreo />, etiqueta: 'Correo' },
    { href: SITIO.linkedin, texto: 'LinkedIn', icono: <IconoLinkedin />, etiqueta: 'LinkedIn de Grupo BluePoint' },
    { href: SITIO.facebook, texto: 'Facebook', icono: <IconoFacebook />, etiqueta: 'Facebook de Grupo BluePoint' },
  ]
  return (
    <footer className="pie">
      <div className="contenedor">
        <div className="pie__fila">
          <Logo />
          <ul className="redes" aria-label="Redes y contacto">
            {redes.map((r) => (
              <li key={r.etiqueta}>
                <a href={r.href} target={r.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener" aria-label={`${r.etiqueta}: ${r.texto}`}>{r.icono}<span>{r.texto}</span></a>
              </li>
            ))}
          </ul>
        </div>
        <div className="pie__legal">
          <span>© 2026 {SITIO.nombre}, {SITIO.ciudad}. {PIE.alianza.texto} <a href={PIE.alianza.href} target="_blank" rel="noopener">{PIE.alianza.marca}</a></span>
          <span className="pie__credito">{PIE.credito.texto} <a href={PIE.credito.href} target="_blank" rel="noopener">{PIE.credito.marca}</a></span>
        </div>
      </div>
    </footer>
  )
}
