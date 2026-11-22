import type { Metadata, Viewport } from 'next'
import { Archivo, JetBrains_Mono, Inter_Tight, Montserrat } from 'next/font/google'
import './globals.css'
import './planta-animacion.css'
import { SITIO } from '@/lib/contenido'

const texto = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--f-texto', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' })
const logoA = Inter_Tight({ subsets: ['latin'], weight: ['700'], variable: '--f-logo-a', display: 'swap' })
const logoB = Montserrat({ subsets: ['latin'], weight: ['500'], variable: '--f-logo-b', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: { default: 'Consultoría ambiental y regulatoria en Perú | Grupo BluePoint', template: '%s | Grupo BluePoint' },
  description: SITIO.descripcionCorta,
  applicationName: SITIO.nombre,
  openGraph: { type: 'website', siteName: SITIO.nombre, locale: 'es_PE' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#0b0e12' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${texto.variable} ${mono.variable} ${logoA.variable} ${logoB.variable}`}>
      <body>
        <a className="saltar" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  )
}
