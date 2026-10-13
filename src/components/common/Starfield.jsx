import { useMemo } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js'
import './Starfield.css'

/**
 * A fixed night sky behind everything — tiny twinkling stars,
 * with a few larger "named" ones. Decorative only.
 */
export default function Starfield({ count = 90 }) {
  const reduced = usePrefersReducedMotion()

  const stars = useMemo(() => {
    let seed = 20260214
    const rng = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: rng() < 0.86 ? 1 + rng() * 1.6 : 2.2 + rng() * 2.2,
      delay: rng() * 8,
      duration: 2.5 + rng() * 5,
      opacity: 0.25 + rng() * 0.6,
    }))
  }, [count])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="starfield__star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: reduced ? '0s' : `${s.delay}s`,
            animationDuration: reduced ? '0s' : `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
