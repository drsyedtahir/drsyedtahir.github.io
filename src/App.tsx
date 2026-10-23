import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Education from './pages/Education'
import Experience from './pages/Experience'
import Research from './pages/Research'
import Teaching from './pages/Teaching'
import Resume from './pages/Resume'
import Expertise from './pages/Experitse'
import NetworkBackground from './components/NetworkBackground'
import { profile } from './data'
import './App.css'

const links: { to: string; label: string; end?: boolean }[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/education', label: 'Education' },
  { to: '/experience', label: 'Experience' },
  { to: '/research', label: 'Research' },
  { to: '/teaching', label: 'Teaching' },
  { to: '/expertise', label: 'Expertise'},
  { to: '/resume', label: 'CV' },
]

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : !window.matchMedia('(prefers-color-scheme: light)').matches
    const next = dark ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage can be unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-ink transition-colors hover:border-[var(--accent)]"
    >
      ◐
    </button>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active' : ''}`

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <NavLink
          to="/"
          className="font-display text-lg font-bold text-ink"
          onClick={() => setOpen(false)}
        >
         Proffessor Dr. Tahir Rizvi
        </NavLink>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} className={linkClass} end={end}>
              {label}
            </NavLink>
          ))}
          <span className="ml-3">
            <ThemeToggle />
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-ink"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--bg)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                end={end}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default function App() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved
    } catch {
      /* storage can be unavailable */
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="tech-bg min-h-screen text-ink">
        <NetworkBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/research" element={<Research />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
        <footer className="mt-16 border-t border-[var(--line)]">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 py-8 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-mono text-xs text-mute">
              © {new Date().getFullYear()} {profile.name}
            </span>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="font-mono text-xs text-mute transition-colors hover:text-signal">
                {profile.email}
              </a>
            )}
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
