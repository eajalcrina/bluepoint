import Link from 'next/link'
import { ISO_OSCURO, ISO_VIEWBOX } from '@/lib/isotipo'

// Logo aprobado: isotipo en color (pedido de Aníbal, 22-nov-2026) y letras blancas sobre fondo oscuro.
export function Isotipo({ className }: { className?: string }) {
  return <svg className={className} viewBox={ISO_VIEWBOX} aria-hidden="true" dangerouslySetInnerHTML={{ __html: ISO_OSCURO }} />
}

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Grupo BluePoint, inicio">
      <Isotipo className="logo__iso" />
      <span className="logo__texto" aria-hidden="true">
        <span className="logo__grupo">GRUPO</span>
        <span className="logo__marca">BluePoint</span>
        <span className="logo__respaldo">Ambiental y regulatorio</span>
      </span>
    </Link>
  )
}
