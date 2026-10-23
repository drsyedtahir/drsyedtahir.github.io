import PageHead, { Bullets } from '../components/PageHead'
import { interests, impact, topPubs, otherPubs, hecPubs, bookChapter, conferencePapers, profile, stats } from '../data'

const doi = (d: string) => `https://doi.org/${d}`

export default function Research() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <PageHead label="Scholarship" title="Research" sub="Leadership, psychological capital and workplace behavior in emerging economies." />
      <div className="animate-fade-up-delay-3 mt-10 grid gap-4 sm:grid-cols-2">
              {stats.slice(4).map((s) => (
                <div key={s.l} className="panel p-5 text-center">
                  <p className="font-display text-3xl font-extrabold text-signal">{s.v}</p>
                  <p className="mt-1 text-xs text-mute">{s.l}</p>
                </div>
              ))}
            </div>

      <div className="animate-fade-up-delay-3 mt-10 grid gap-4 sm:grid-cols-4">
        {stats.slice(1, 4).map((s) => (
          <div key={s.l} className="panel p-5 text-center">
            <p className="font-display text-3xl font-extrabold text-signal">{s.v}</p>
            <p className="mt-1 text-xs text-mute">{s.l}</p>
          </div>
        ))}
        <a href={profile.scholar} target="_blank" rel="noreferrer" className="panel flex items-center justify-center p-5 text-sm font-semibold text-beam">
          Google Scholar profile
        </a>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Research interests</h2>
          <Bullets items={interests} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Research impact</h2>
          <p className="mt-4 text-sm leading-relaxed text-mute">{impact}</p>
        </div>
      </div>

      <h2 className="mt-14 text-lg font-semibold text-ink">International refereed journal publications</h2>
      <div className="mt-6 grid gap-4">
        {topPubs.map((p) => (
          <article key={p.t} className="panel p-5 sm:p-6">
            <span className="font-mono text-xs text-signal">{p.y} · {p.j}</span>
            <h3 className="mt-1 font-semibold leading-snug text-ink">{p.t}</h3>
            <p className="mt-2 text-xs text-mute">{p.m}</p>
            {p.doi && (
              <a href={doi(p.doi)} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-beam hover:underline">
                DOI: {p.doi}
              </a>
            )}
          </article>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-semibold text-ink">Other peer-reviewed journals</h2>
      <div className="panel mt-6 p-6"><Bullets items={otherPubs} /></div>

      <h2 className="mt-14 text-lg font-semibold text-ink">HEC recognized journal articles ({hecPubs.length})</h2>
      <div className="panel mt-6 p-6"><Bullets items={hecPubs} /></div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Book chapter</h2>
          <p className="mt-4 text-sm leading-relaxed text-mute">{bookChapter}</p>
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Conference papers</h2>
          <Bullets items={conferencePapers} />
        </div>
      </div>
    </main>
  )
}
