export default function Rotulo({ num, children }: { num?: string; children: React.ReactNode }) {
  return (
    <p className="rotulo">
      {num && <span className="rotulo-num">{num}</span>}
      <span>{children}</span>
    </p>
  )
}
