import PageHead from '../components/PageHead'
import { profile } from '../data'

export default function Resume() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <PageHead label="Docs" title="Curriculum Vitae" sub="Download the full CV as PDF." />
      <div className="panel animate-fade-up-delay-3 relative mt-12 overflow-hidden p-8 sm:p-12">
        <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs text-signal">DR_SYED_TAHIR_HUSSAIN_RIZVI.pdf</p>
            <p className="mt-2 max-w-md text-sm text-mute">Complete academic record, publications and references.</p>
          </div>
          <a href={profile.cv} download className="btn-primary shrink-0">Download CV</a>
        </div>
      </div>
    </main>
  )
}
