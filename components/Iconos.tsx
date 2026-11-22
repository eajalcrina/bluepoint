type P = { size?: number }
const base = (size: number) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true as const })

export const IconoWhatsapp = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
    <path d="M8.6 8.4c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.9 1.3 1.7 2.3 2.2.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .7-.3 1.4-.9 1.7-.6.3-1.5.4-3.2-.4-2.1-1-3.5-3-3.8-3.6-.4-.6-.7-1.5-.6-2.3 0-.5.3-.9.6-1.2Z" fill="currentColor" stroke="none" />
  </svg>
)
export const IconoCorreo = ({ size = 20 }: P) => (
  <svg {...base(size)}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
)
export const IconoLinkedin = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M5 9.5v10M5 4.5v.01M10 19.5v-10M10 14c0-2.6 1.5-4.6 4-4.6 2.3 0 3.5 1.6 3.5 4.3v5.8" strokeWidth={2} /></svg>
)
export const IconoFacebook = ({ size = 20 }: P) => (
  <svg {...base(size)}><path d="M16 3.5h-2.4C11.6 3.5 10.5 4.8 10.5 7v13.5M7.5 10.5h7.5" strokeWidth={2} /></svg>
)
export const IconoMenu = ({ abierto }: { abierto: boolean }) => (
  <svg {...base(22)}>{abierto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
)
