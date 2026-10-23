export default function PageHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <>
      <p className="label-mono animate-fade-up">{label}</p>
      <h1 className="page-title animate-fade-up-delay-1 mt-2">{title}</h1>
      {sub && <p className="animate-fade-up-delay-2 mt-3 max-w-xl text-mute">{sub}</p>}
    </>
  )
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-mute">
      {items.map((x) => (
        <li key={x} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  )
}
