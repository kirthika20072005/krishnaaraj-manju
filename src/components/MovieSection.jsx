import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Film, RotateCcw } from 'lucide-react'
import site from '../config/site.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import './MovieSection.css'

function fmt(sec) {
  if (!Number.isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Resolve a media path so it works on any deploy target.
 * - http(s) URLs pass through untouched (recommended for large videos)
 * - "/media/..." is resolved against Vite's BASE_URL (Vercel, subpaths, etc.)
 */
function resolveMedia(p) {
  if (!p) return null
  if (/^https?:\/\//i.test(p) || p.startsWith('blob:') || p.startsWith('data:')) return p
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${String(p).replace(/^\//, '')}`
}

export default function MovieSection() {
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(false)
  const [posterError, setPosterError] = useState(false)

  const videoUrl = resolveMedia(site.video.src)
  const posterUrl = resolveMedia(site.video.poster)
  const isRemote = videoUrl ? /^https?:\/\//i.test(videoUrl) : false

  // If the configured src changes, allow the player to try again.
  useEffect(() => {
    setError(false)
    setPosterError(false)
  }, [videoUrl])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setCurrent(v.currentTime)
    const onMeta = () => setDuration(v.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnd = () => setPlaying(false)
    const onErr = () => setError(true)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnd)
    v.addEventListener('error', onErr)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnd)
      v.removeEventListener('error', onErr)
    }
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }

  const restart = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
  }

  const seek = e => {
    const v = videoRef.current
    if (!v) return
    const val = Number(e.target.value)
    v.currentTime = val
    setCurrent(val)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const goFullscreen = () => {
    const el = frameRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      el.requestFullscreen?.().catch(() => {})
    }
  }

  return (
    <section id="movie" className="section movie" aria-label="Our movie">
      <div className="container-narrow">
        <SectionHead eyebrow="Our Movie" title={site.video.heading} lead={site.video.intro} />

        <Reveal className="movie__frame glass">
          <div className="movie__screen" ref={frameRef}>
            {error || !videoUrl ? (
              <div className="movie__fallback">
                {posterUrl && !posterError ? (
                  <img
                    src={posterUrl}
                    alt="Our movie poster"
                    className="movie__fallback-poster"
                    onError={() => setPosterError(true)}
                  />
                ) : null}
                <div className="movie__fallback-overlay">
                  <Film size={30} aria-hidden="true" />
                  <p className="movie__fallback-title">{site.video.title}</p>
                  <p className="movie__fallback-text">
                    {isRemote ? (
                      'The video could not be loaded. Check the video URL in src/config/site.js.'
                    ) : (
                      <>
                        Drop your video at <code>public/media/video/our-movie.mp4</code> to play it
                        here.
                      </>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="movie__video"
                poster={posterUrl && !posterError ? posterUrl : undefined}
                preload="metadata"
                playsInline
                onClick={toggle}
                onError={() => setError(true)}
              >
                <source src={videoUrl} type="video/mp4" onError={() => setError(true)} />
              </video>
            )}

            {!error && !playing && (
              <button
                type="button"
                className="movie__bigPlay"
                onClick={toggle}
                aria-label="Play video"
              >
                <Play size={30} fill="currentColor" />
              </button>
            )}
          </div>

          <div className="movie__controls no-print">
            <button
              type="button"
              className="movie__btn"
              onClick={toggle}
              aria-label={playing ? 'Pause' : 'Play'}
              disabled={error}
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              type="button"
              className="movie__btn"
              onClick={restart}
              aria-label="Restart"
              disabled={error}
            >
              <RotateCcw size={16} />
            </button>

            <span className="movie__time">{fmt(current)}</span>
            <input
              type="range"
              className="movie__seek"
              min="0"
              max={duration || 0}
              step="0.1"
              value={current}
              onChange={seek}
              aria-label="Seek"
              disabled={error || !duration}
              style={{ '--pct': `${duration ? (current / duration) * 100 : 0}%` }}
            />
            <span className="movie__time">{fmt(duration)}</span>

            <button
              type="button"
              className="movie__btn"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              disabled={error}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              type="button"
              className="movie__btn"
              onClick={goFullscreen}
              aria-label="Fullscreen"
            >
              <Maximize size={18} />
            </button>
          </div>
        </Reveal>

        {site.video.caption && (
          <Reveal as="p" className="movie__caption center hand" delay={0.1}>
            {site.video.caption}
          </Reveal>
        )}
      </div>
    </section>
  )
}
