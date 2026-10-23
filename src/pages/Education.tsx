import PageHead from '../components/PageHead'
import { education } from '../data'

export default function Education() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <PageHead label="Academia" title="Education" sub="From economics and HRM to a PhD in Organizational Behaviour." />
      <ol className="animate-fade-up-delay-3 relative mt-12 border-l border-[var(--border)] pl-8">
        {education.map((e, i) => (
          <li key={e.title} className="relative pb-10 last:pb-0">
            <span className="timeline-dot" />
            <div className="panel p-5 sm:p-6">
              <span className="font-mono text-[0.65rem] text-mute">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-1 text-xl font-semibold text-ink">{e.title}</h2>
              <p className="mt-1 text-sm text-mute">{e.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{e.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  )
}
