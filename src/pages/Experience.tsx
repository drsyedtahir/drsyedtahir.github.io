import PageHead, { Bullets } from '../components/PageHead'
import { appointments, leadership, aacsb } from '../data'

export default function Experience() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <PageHead label="Career" title="Experience" sub="Academic appointments and leadership in quality assurance and accreditation." />

      <h2 className="mt-12 text-lg font-semibold text-ink">Academic appointments</h2>
      <ol className="animate-fade-up-delay-3 relative mt-6 border-l border-[var(--border)] pl-8">
        {appointments.map((a) => (
          <li key={a.role + a.when} className="relative pb-8 last:pb-0">
            <span className="timeline-dot" />
            <div className="panel p-5 sm:p-6">
              <span className="font-mono text-xs text-signal">{a.when}</span>
              <h3 className="mt-1 text-xl font-semibold text-ink">{a.role}</h3>
              <p className="mt-1 text-sm text-mute">{a.place}</p>
              {a.note && <p className="mt-2 text-sm text-mute">{a.note}</p>}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 text-lg font-semibold text-ink">Academic leadership and accreditation</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {leadership.map((l) => (
          <div key={l.role} className="panel p-5">
            {l.when && <span className="font-mono text-xs text-signal">{l.when}</span>}
            <h3 className="mt-1 font-semibold text-ink">{l.role}</h3>
            {l.note && <p className="mt-2 text-sm leading-relaxed text-mute">{l.note}</p>}
          </div>
        ))}
      </div>

      <div className="panel mt-14 p-6">
        <h2 className="text-lg font-semibold text-ink">AACSB faculty qualification: Scholarly Academic (SA)</h2>
        <Bullets items={aacsb} />
      </div>
    </main>
  )
}
