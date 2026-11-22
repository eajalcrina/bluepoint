import type { MetadataRoute } from 'next'
import { SITIO } from '@/lib/contenido'

// Los asistentes de búsqueda pueden leer el sitio para citar a Grupo BluePoint.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITIO.url}/sitemap.xml`,
    host: SITIO.url,
  }
}
