import { ImageResponse } from 'next/og'
import { ISO_NEGATIVO, ISO_VIEWBOX } from '@/lib/isotipo'

export const alt = 'Grupo BluePoint, ambiental y regulatorio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Imagen() {
  const iso = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ISO_VIEWBOX}">${ISO_NEGATIVO}</svg>`)}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(155deg, #18386c 0%, #0d2147 45%, #070f20 100%)', color: '#ffffff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img src={iso} width={112} height={112} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 20, letterSpacing: 10 }}>GRUPO</span>
            <span style={{ fontSize: 56, fontWeight: 700, lineHeight: 1 }}>BluePoint</span>
            <span style={{ fontSize: 16, letterSpacing: 4 }}>AMBIENTAL Y REGULATORIO</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 960 }}>Cumple la normativa sin detener tus operaciones</span>
          <span style={{ fontSize: 26, color: '#d5ddea' }}>Consultoría ambiental y regulatoria en Lima, Perú</span>
        </div>
        <div style={{ display: 'flex', width: 120, height: 6, background: '#f2a93b' }} />
      </div>
    ),
    size,
  )
}
