import Link from 'next/link'
import Cabecera from '@/components/Cabecera'
import { Pie } from '@/components/Secciones'

export const metadata = { title: 'Página no encontrada', robots: { index: false, follow: true } }

export default function NoEncontrada() {
  return (
    <>
      <Cabecera />
      <main id="contenido" className="pagina">
        <div className="contenedor" style={{ display: 'grid', gap: 24, minHeight: '50vh', alignContent: 'center' }}>
          <h1 className="titulo-1" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}>No encontramos esta página</h1>
          <p className="bajada" style={{ color: 'var(--claro-2)' }}>Puede que el enlace haya cambiado. Estas son las rutas principales.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link className="btn btn--primario" href="/">Ir al inicio</Link>
            <Link className="btn btn--linea" href="/planta/">Ver la planta</Link>
          </div>
        </div>
      </main>
      <Pie />
    </>
  )
}
