import Link from 'next/link'
import { ISO_NEGATIVO, ISO_VIEWBOX } from '@/lib/isotipo'

// Logo aprobado a una tinta: sobre los fondos oscuros del sitio va el negativo en blanco.
export function Isotipo({ className }: { className?: string }) {
  return <svg className={className} viewBox={ISO_VIEWBOX} aria-hidden="true" dangerouslySetInnerHTML={{ __html: ISO_NEGATIVO }} />
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
