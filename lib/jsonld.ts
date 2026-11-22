import { DIRECTOR, EQUIPO, FAQ, SECTORES, SERVICIOS, SITIO, type Ficha } from './contenido'

const U = SITIO.url
export const ID = {
  org: `${U}/#organizacion`,
  web: `${U}/#sitio`,
  anibal: `${U}/#anibal-boca-acosta`,
  redesign: 'https://redesignlab.org/#organization',
  thousandfold: 'https://thousandfold.la/#organization',
  eddie: 'https://www.linkedin.com/in/eddieajalcrina',
}

export function grafoSitio() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ID.org,
        name: SITIO.nombre,
        alternateName: 'BluePoint',
        slogan: 'Cumple la normativa sin detener tus operaciones',
        description: SITIO.descripcionLarga,
        url: `${U}/`,
        logo: `${U}/icon.svg`,
        image: `${U}/opengraph-image`,
        email: SITIO.correo,
        telephone: SITIO.telefono,
        address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressCountry: 'PE' },
        areaServed: { '@type': 'Country', name: 'Perú' },
        knowsAbout: ['Gestión ambiental', 'Fiscalización ambiental', 'Instrumentos de gestión ambiental', 'Tratamiento de efluentes', 'Cumplimiento normativo', 'Residuos sólidos', 'Monitoreo ambiental', 'ISO 14001'],
        employee: [{ '@id': ID.anibal }],
        sameAs: [SITIO.linkedin, SITIO.facebook],
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: SITIO.correo, telephone: SITIO.telefono, availableLanguage: 'es' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios',
          itemListElement: SERVICIOS.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.titulo, description: s.texto } })),
        },
        mentions: [{ '@id': ID.redesign }],
        audience: { '@type': 'BusinessAudience', audienceType: SECTORES.items.map((s) => s.nombre).join(', ') },
      },
      {
        '@type': 'Person',
        '@id': ID.anibal,
        name: DIRECTOR.nombre,
        jobTitle: 'Director',
        worksFor: { '@id': ID.org },
        description: DIRECTOR.bio[0],
        sameAs: [DIRECTOR.linkedin],
        knowsAbout: ['Gestión ambiental', 'Cumplimiento normativo', 'Auditorías ISO 14001', 'Tratamiento de efluentes'],
      },
      ...EQUIPO.personas.map((p) => ({
        '@type': 'Person',
        '@id': `${U}/#${p.nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')}`,
        name: p.nombre,
        jobTitle: `Experto asociado, ${p.area.toLowerCase()}`,
        affiliation: { '@id': ID.org },
        description: p.bio[0],
        ...(p.linkedin ? { sameAs: [p.linkedin] } : {}),
      })),
      {
        '@type': 'Organization',
        '@id': ID.redesign,
        name: 'Redesign Lab',
        url: 'https://redesignlab.org',
        description: 'Impact venture studio de América Latina especializado en bioeconomía.',
        founder: { '@type': 'Person', '@id': ID.eddie, name: 'Eddie Ajalcriña', url: ID.eddie },
      },
      {
        '@type': 'Organization',
        '@id': ID.thousandfold,
        name: 'ThousandFold Studio',
        url: 'https://thousandfold.la',
      },
      {
        '@type': 'WebSite',
        '@id': ID.web,
        url: `${U}/`,
        name: SITIO.nombre,
        inLanguage: 'es-PE',
        publisher: { '@id': ID.org },
        contributor: { '@id': ID.thousandfold },
      },
      {
        '@type': 'FAQPage',
        '@id': `${U}/#preguntas`,
        mainEntity: FAQ.items.map((q) => ({ '@type': 'Question', name: q.p, acceptedAnswer: { '@type': 'Answer', text: q.r } })),
      },
    ],
  }
}

export function grafoFicha(f: Ficha, etapa: string) {
  const url = `${U}/planta/${f.slug}/`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: f.titulo,
        description: f.opera,
        inLanguage: 'es-PE',
        isPartOf: { '@id': ID.web },
        about: { '@type': 'Thing', name: f.titulo },
        publisher: { '@id': ID.org },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${U}/` },
          { '@type': 'ListItem', position: 2, name: 'La planta', item: `${U}/planta/` },
          { '@type': 'ListItem', position: 3, name: `${etapa}: ${f.titulo}`, item: url },
        ],
      },
    ],
  }
}
