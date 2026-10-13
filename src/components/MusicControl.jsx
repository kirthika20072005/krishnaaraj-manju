import { useEffect, useRef, useState } from 'react'
import { Music2, VolumeX } from 'lucide-react'
import site from '../config/site.js'
import './MusicControl.css'

/**
 * Optional background music. NEVER autoplays — the visitor presses play.
 * If the audio file is missing, the control quietly hides itself.
 */
export default function MusicControl() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  const src = site?.music?.src

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = site.music.volume ?? 0.3
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch {
      // Autoplay policy or decode issue — leave it paused, do not crash.
      setPlaying(false)
    }
  }

  if (!src || !available) return null

  return (
    <div className="music-control no-print">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onError={() => setAvailable(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`music-control__btn ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        title={site.music.title || 'Background music'}
      >
        <span className="music-control__ring" aria-hidden="true" />
        {playing ? <Music2 size={18} /> : <VolumeX size={18} />}
      </button>
      <span className="music-control__label">
        {playing ? 'Now playing' : 'Play our song'}
      </span>
    </div>
  )
}
