import { useMemo } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js'
import { HeartGlyph } from './Shapes.jsx'
import './Particles.css'

/**
 * Gentle floating hearts + sparkle dots that rise up the screen.
 * Purely decorative and disabled when reduced-motion is on.
 */
export default function Particles({
  count = 18,
  sparkles = 26,
  className = '',
  color = 'var(--rose-gold-light)',
}) {
  const reduced = usePrefersReducedMotion()

  const hearts = useMemo(() => {
    const rng = mulberry32(1337)
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: rng() * 100,
      size: 8 + rng() * 18,
      duration: 12 + rng() * 16,
      delay: -rng() * 24,
      drift: (rng() - 0.5) * 80,
      opacity: 0.25 + rng() * 0.45,
    }))
  }, [count])

  const dots = useMemo(() => {
    const rng = mulberry32(99)
    return Array.from({ length: sparkles }).map((_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: 1 + rng() * 2.4,
      delay: rng() * 6,
      duration: 3 + rng() * 4,
    }))
  }, [sparkles])

  if (reduced) return null

  return (
    <div className={`particles ${className}`.trim()} aria-hidden="true">
      {dots.map((d) => (
        <span
          key={`d-${d.id}`}
          className="particles__dot"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
      {hearts.map((h) => (
        <span
          key={`h-${h.id}`}
          className="particles__heart"
          style={{
            left: `${h.left}%`,
            color,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
            opacity: h.opacity,
          }}
        >
          <HeartGlyph size={h.size} />
        </span>
      ))}
    </div>
  )
}

/* Small deterministic PRNG so particles don't jump between renders. */
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
