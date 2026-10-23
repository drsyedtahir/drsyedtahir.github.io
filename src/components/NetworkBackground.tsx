import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; r: number }

const LINK = 140 // max distance for node to node lines
const MOUSE_RADIUS = 190 // cursor reach

export default function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999, on: false }
    let w = 0
    let h = 0
    let nodes: Node[] = []
    let raf = 0
    const colors = { link: '#7c97ff', mouse: '#ffb86b', dot: '#9aa6d4' }
    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      colors.link = s.getPropertyValue('--accent').trim() || colors.link
      colors.mouse = s.getPropertyValue('--signal').trim() || colors.mouse
      colors.dot = s.getPropertyValue('--muted').trim() || colors.dot
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(40, Math.min(120, Math.round((w * h) / 13000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.3
            ctx.strokeStyle = colors.link
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        if (mouse.on) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MOUSE_RADIUS) {
            ctx.globalAlpha = (1 - d / MOUSE_RADIUS) * 0.85
            ctx.strokeStyle = colors.mouse
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
            if (!reduce && d > 40) {
              p.x -= dx * 0.004
              p.y -= dy * 0.004
            }
          }
        }
        ctx.globalAlpha = 0.7
        ctx.fillStyle = colors.dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.on = true
      if (reduce) draw()
    }
    const onLeave = () => {
      mouse.on = false
      mouse.x = mouse.y = -9999
      if (reduce) draw()
    }
    const onResize = () => {
      resize()
      if (reduce) draw()
    }

    readColors()
    const observer = new MutationObserver(() => {
      readColors()
      if (reduce) draw()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const media = window.matchMedia('(prefers-color-scheme: light)')
    media.addEventListener('change', readColors)

    resize()
    draw()
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      media.removeEventListener('change', readColors)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: -1 }}
    />
  )
}
