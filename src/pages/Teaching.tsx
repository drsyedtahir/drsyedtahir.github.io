import PageHead, { Bullets } from '../components/PageHead'
import { coursesUG, coursesPhD} from '../data'

export default function Teaching() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <PageHead label="Classroom" title="Teaching & Service" sub="Courses, supervision, professional training and international engagement." />

      

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Undergraduate, MBA and Executive MBA</h2>
          <Bullets items={coursesUG} />
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-ink">Doctoral level</h2>
          <Bullets items={coursesPhD} />
        </div>
      </div>
    </main>
  )
}
