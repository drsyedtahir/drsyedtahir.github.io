import PageHead, { Bullets } from '../components/PageHead'
import {teachingEffectiveness, trainings, service, certifications, conferencesArranged, conferencesAttended, stats } from '../data'

export default function Teaching() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <PageHead label="Classroom" title="Teaching & Service" sub="Courses, supervision, professional training and international engagement." />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Teaching effectiveness</h2>
          <Bullets items={teachingEffectiveness} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Trainings conducted</h2>
          <Bullets items={trainings} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Editorial and professional service</h2>
          <Bullets items={service} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Certification and development</h2>
          <Bullets items={certifications} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Conferences arranged</h2>
          <Bullets items={conferencesArranged} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Conferences attended</h2>
          <Bullets items={conferencesAttended} />
        </div>
      </div>
    </main>
  )
}
