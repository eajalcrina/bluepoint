import type { MetadataRoute } from 'next'
import { FICHAS, SITIO } from '@/lib/contenido'

export default function sitemap(): MetadataRoute.Sitemap {
  const fecha = new Date(SITIO.revisado)
  return [
    { url: `${SITIO.url}/`, lastModified: fecha, priority: 1 },
    { url: `${SITIO.url}/planta/`, lastModified: fecha, priority: 0.8 },
    ...FICHAS.map((f) => ({ url: `${SITIO.url}/planta/${f.slug}/`, lastModified: fecha, priority: 0.6 })),
  ]
}
