'use client'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import { IconoMenu } from './Iconos'
import { MENU, agendaTexto, agendaUrl } from '@/lib/contenido'

export default function Cabecera() {
  const [solida, setSolida] = useState(false)
  const [abierta, setAbierta] = useState(false)

  useEffect(() => {
    const alDesplazar = () => setSolida(window.scrollY > 40)
    alDesplazar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => window.removeEventListener('scroll', alDesplazar)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = abierta ? 'hidden' : ''
    if (!abierta) return
    const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && setAbierta(false)
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [abierta])

  return (
    <header className="cabecera" data-solida={solida} data-abierta={abierta}>
      <div className="contenedor cabecera__fila">
        <Logo />
        <nav aria-label="Principal" className="cabecera__menu">
          {MENU.map((m) => (
            <a key={m.href} href={m.href}>{m.texto}</a>
          ))}
        </nav>
        <a className="btn btn--primario cabecera__cta" href={agendaUrl} target="_blank" rel="noopener">{agendaTexto}</a>
        <button type="button" className="cabecera__boton" aria-expanded={abierta} aria-controls="menu-movil" aria-label={abierta ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setAbierta(!abierta)}>
          <IconoMenu abierto={abierta} />
        </button>
      </div>
      {abierta && (
        <nav id="menu-movil" aria-label="Principal" className="cabecera__panel">
          {MENU.map((m) => (
            <a key={m.href} href={m.href} onClick={() => setAbierta(false)}>{m.texto}</a>
          ))}
          <a className="btn btn--primario" href={agendaUrl} target="_blank" rel="noopener" onClick={() => setAbierta(false)}>{agendaTexto}</a>
        </nav>
      )}
    </header>
  )
}
