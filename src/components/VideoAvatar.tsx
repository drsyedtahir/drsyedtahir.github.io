import { useCallback, useEffect, useRef, useState } from 'react'

// The video file is 2 frames wide: colour on the left, alpha mask on the right.
// We combine them on a canvas so the avatar has a transparent background in every browser.
const SRC = `${import.meta.env.BASE_URL}video/avatar-intro.mp4`
const W = 540
const H = 692
const GESTURES = ['pointerup', 'keydown', 'touchend'] as const

export default function VideoAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const armed = useRef<(() => void) | null>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [missing, setMissing] = useState(false)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const disarm = useCallback(() => {
    const h = armed.current
    if (h) GESTURES.forEach((e) => window.removeEventListener(e, h))
    armed.current = null
  }, [])

  const run = useRef(0)
   const start = useCallback(async () => {
     const v = videoRef.current
     if (!v) return
     const id = ++run.current // a newer start() or an unmount makes this one stale
     disarm()
     v.currentTime = 0
     v.muted = false
     try {
       await v.play()
       if (run.current === id) setMuted(false)
     } catch {
       if (run.current !== id) return // interrupted, so leave the video alone
       // Sound is blocked until the visitor interacts: play silently,
       // then restart with sound on the first click, tap or key press.
       v.muted = true
       setMuted(true)
       try {
         await v.play()
       } catch {
         /* nothing more we can do */
       }
       if (run.current !== id) return
       const h = () => {
         disarm()
         start()
       }
       armed.current = h
       GESTURES.forEach((e) => window.addEventListener(e, h))
     }
   }, [disarm])

  useEffect(() => {
    const v = videoRef.current
    const canvas = canvasRef.current
    if (!v || !canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const work = document.createElement('canvas')
    work.width = W * 2
    work.height = H
    const wctx = work.getContext('2d', { willReadFrequently: true })
    if (!ctx || !wctx) return

    let raf = 0

    const draw = () => {
      if (v.readyState < 2 || !v.videoWidth) return
      const vw = v.videoWidth
      const vh = v.videoHeight
      const ratio = vw / vh
      if (ratio > 1.5 && ratio < 1.62) {
        // Packed format: colour on the left, alpha mask on the right
        wctx.drawImage(v, 0, 0, W * 2, H)
        const color = wctx.getImageData(0, 0, W, H)
        const mask = wctx.getImageData(W, 0, W, H)
        const c = color.data
        const m = mask.data
        for (let i = 0; i < c.length; i += 4) c[i + 3] = m[i]
        ctx.putImageData(color, 0, 0)
        return
      }
      // Plain video: fit to the bottom of the canvas and key out pure green (#00FF00) if present
      wctx.clearRect(0, 0, W * 2, H)
      const s = Math.min(W / vw, H / vh)
      wctx.drawImage(v, (W - vw * s) / 2, H - vh * s, vw * s, vh * s)
      const img = wctx.getImageData(0, 0, W, H)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], bl = d[i + 2]
        if (g > 90 && g > r * 1.4 && g > bl * 1.4) d[i + 3] = 0
        else if (g > Math.max(r, bl)) d[i + 1] = Math.max(r, bl) // remove green fringe
      }
      ctx.putImageData(img, 0, 0)
    }

    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    const onPlay = () => {
      setPlaying(true)
      cancelAnimationFrame(raf)
      loop()
    }
    const onStop = () => {
      setPlaying(false)
      cancelAnimationFrame(raf)
      draw()
    }

    v.addEventListener('loadeddata', draw)
    v.addEventListener('seeked', draw)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onStop)
    v.addEventListener('ended', onStop)

    if (!reduce) start()

    return () => {
      cancelAnimationFrame(raf)
      disarm()
      v.pause()
      v.removeEventListener('loadeddata', draw)
      v.removeEventListener('seeked', draw)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onStop)
      v.removeEventListener('ended', onStop)
    }
  }, [start, disarm, reduce])

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-x-0 top-[6%] mx-auto aspect-square w-[88%] rounded-full"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent), transparent 68%)',
          }}
        />
        <video
          ref={videoRef}
          src={SRC}
          playsInline
          preload="auto"
          onError={() => setMissing(true)}
          className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
        />
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          role="img"
          aria-label="Video of Dr. Syed Tahir Hussain Rizvi introducing himself"
          className="relative block h-auto w-full"
        />
      </div>

      {missing && (
        <p className="text-center text-sm text-mute">Add your intro video at public/video/avatar-intro.mp4</p>
      )}
      <div className="mt-2 flex flex-col items-center gap-3">
        {playing && muted && (
          <p className="text-sm text-mute">Click or tap anywhere to hear the intro</p>
        )}
        <button type="button" className="btn-ghost" onClick={() => start()}>
          {reduce && !playing ? 'Play intro' : 'Replay intro'}
        </button>
      </div>
    </div>
  )
}
