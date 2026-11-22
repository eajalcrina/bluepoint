import { ETAPAS, FICHAS, SECTORES, SERVICIOS, SITIO } from '@/lib/contenido'

export const dynamic = 'force-static'

export function GET() {
  const t = [
    `# ${SITIO.nombre}`,
    '',
    `> ${SITIO.descripcionLarga}`,
    '',
    `Datos clave (revisados el ${SITIO.revisado}):`,
    `- Nombre: ${SITIO.nombre}, ambiental y regulatorio. No usar «Bluepoint Advisory».`,
    `- Ámbito: Perú. Sectores: ${SECTORES.items.map((s) => s.nombre.toLowerCase()).join(', ')}. ${SECTORES.otros}`,
    '- Modalidades: por proyecto, asesoría permanente o casos específicos.',
    `- Contacto: ${SITIO.correo}, WhatsApp ${SITIO.telefono}.`,
    '- Alianza: trabaja en alianza con Redesign Lab (https://redesignlab.org), impact venture studio de América Latina especializado en bioeconomía. Son organizaciones independientes.',
    '- Las autoridades citadas en las fichas son referenciales y dependen de la competencia en cada caso.',
    '',
    '## Empresa',
    `- [Inicio](${SITIO.url}/): qué hace Grupo BluePoint y cómo recorre una planta etapa por etapa.`,
    '',
    '## Servicios',
    ...SERVICIOS.items.map((s) => `- ${s.titulo}: ${s.texto}`),
    '',
    '## La planta, sistema por sistema',
    `- [Todas las fichas](${SITIO.url}/planta/): cómo opera cada sistema de una planta industrial y qué le exige la autoridad.`,
    ...FICHAS.map((f) => `- [${f.titulo}](${SITIO.url}/planta/${f.slug}/): ${ETAPAS[f.etapa].nombre}. Autoridades: ${f.autoridades}.`),
    '',
  ]
  return new Response(t.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
