import { useEffect, useState } from 'react'
import VideoAvatar from '../components/VideoAvatar'
import { FaGraduationCap } from 'react-icons/fa'
import { SiOrcid } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'
import { profile, stats, roles, reviewerFor } from '../data'

function TypedRoles() {
  const [text, setText] = useState(roles[0])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let r = 0, c = roles[0].length, deleting = true
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      if (deleting) {
        c--
        if (c <= 0) { deleting = false; r = (r + 1) % roles.length; c = 0 }
      } else {
        c++
        if (c >= roles[r].length) { deleting = true; setText(roles[r]); t = setTimeout(tick, 1800); return }
      }
      setText(roles[r].slice(0, c))
      t = setTimeout(tick, deleting ? 28 : 55)
    }
    t = setTimeout(tick, 1800)
    return () => clearTimeout(t)
  }, [])
  return (<>{text}<span className="typed-caret" aria-hidden /></>)
}

export default function Home() {
  return (
    <main id="main">
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="label-mono animate-fade-up">{profile.title}</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              <span className="rise-line"><b>Proffessor Dr. Syed Tahir</b></span>
              <span className="rise-line"><b>Hussain</b> <b className="text-beam">Rizvi.</b></span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-5 min-h-[2rem] font-display text-xl font-medium sm:text-2xl">
              <span className="text-ink">Teaching and research in </span>
              <span className="text-signal"><TypedRoles /></span>
            </p>
            <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              {profile.summary} {profile.tagline}.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
              <a href={profile.cv} download className="btn-primary">Download CV</a>
              {profile.email && <a href={`mailto:${profile.email}`} className="btn-ghost">Contact Me</a>}
            </div>
            <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-3">
              <a href={profile.scholar} target="_blank" rel="noreferrer" className="social-icon" aria-label="Google Scholar"><FaGraduationCap size={18} /></a>
              <a href={profile.orcid} target="_blank" rel="noreferrer" className="social-icon" aria-label="ORCID"><SiOrcid size={18} /></a>
              {profile.email && <a href={`mailto:${profile.email}`} className="social-icon" aria-label="Email"><HiOutlineMail size={18} /></a>}
            </div>
          </div>
          <div className="animate-fade-up-delay-2 w-full"><VideoAvatar /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.l} className="panel p-4 text-center">
              <p className="font-display text-2xl font-extrabold text-signal">{s.v}</p>
              <p className="mt-1 text-xs text-mute">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="panel p-6 sm:p-8">
          <p className="label-mono">Objective</p>
          <h2 className="page-title mt-2">{profile.objective}</h2>
          <p className="mt-6 text-sm font-semibold text-ink">Reviewer for</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {reviewerFor.map((j) => (
              <span key={j} className="rounded-full bg-[var(--accent-dim)] px-3 py-1 text-xs font-semibold text-beam">{j}</span>
            ))}
          </div>
          <p className="mt-6 text-xs text-mute">ORCID: {profile.orcidId}</p>
        </div>
      </section>
    </main>
  )
}
