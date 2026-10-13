import { useRef } from 'react'
import { Heart, ChevronDown, Gift } from 'lucide-react'
import site from '../config/site.js'
import useCountdown from '../hooks/useCountdown.js'
import Countdown from './Countdown.jsx'
import Reveal from './common/Reveal.jsx'
import { Flourish } from './common/Shapes.jsx'
import './Hero.css'

export default function Hero({ onBegin }) {
  const birthday = useCountdown(site.birthdayDate)
  const ourTime = useCountdown(site.ourDate)
  const sectionRef = useRef(null)

  const status = (() => {
    if (!birthday.valid) return { heading: 'A day worth celebrating', boxed: false }
    if (birthday.isToday)
      return { heading: 'Today is the day. Happy Birthday.', boxed: false, celebrate: true }
    if (!birthday.isPast) return { heading: 'Counting down to your birthday', boxed: true }
    return { heading: 'Since we started counting our days', boxed: true }
  })()

  return (
    <section id="hero" className="hero" ref={sectionRef} aria-label="Welcome">
      <div className="hero__veil" aria-hidden="true" />

      <div className="container hero__inner">
        <Reveal as="p" className="eyebrow">
          {site.hero.eyebrow}
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="hero__name display">
            <span className="gold-text">{site.hisName}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.14} className="hero__ornament">
          <Flourish width={230} />
        </Reveal>

        <Reveal as="p" delay={0.18} className="hero__message serif-lead">
          {site.hero.message}
        </Reveal>
        <Reveal as="p" delay={0.24} className="hero__subline muted">
          {site.hero.subline}
        </Reveal>

        {/* Constellation heart */}
        <Reveal delay={0.28} className="hero__constellation">
          <ConstellationHeart />
        </Reveal>

        {/* Timer */}
        <Reveal delay={0.34} className="hero__timer">
          <p className="hero__status hand">
            {status.celebrate && <Gift size={18} aria-hidden="true" />}
            {status.heading}
          </p>
          <Countdown state={birthday} />
          {ourTime.valid && ourTime.isPast && (
            <p className="hero__us muted">
              We have been us for{' '}
              <strong>{ourTime.days.toLocaleString()}</strong> days
              {ourTime.days > 0 ? ' — and counting.' : '.'}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.4}>
          <button type="button" className="btn hero__cta" onClick={onBegin}>
            <Heart size={18} aria-hidden="true" />
            {site.hero.cta}
          </button>
        </Reveal>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={onBegin}
        aria-label="Scroll to our story"
      >
        <span>scroll</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
    </section>
  )
}

/** A tiny constellation arranged into a heart, gently pulsing. */
function ConstellationHeart() {
  const pts = [
    [50, 22],
    [30, 40],
    [18, 58],
    [34, 72],
    [50, 84],
    [66, 72],
    [82, 58],
    [70, 40],
    [50, 40],
    [50, 56],
  ]
  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 0],
    [1, 8],
    [7, 8],
    [8, 9],
    [9, 4],
  ]
  return (
    <svg viewBox="0 0 100 100" className="constellation" role="img" aria-label="A constellation shaped like a heart">
      <g stroke="var(--gold-line)" strokeWidth="0.4" opacity="0.75">
        {lines.map(([a, b], i) => (
          <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />
        ))}
      </g>
      {pts.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 9 ? 1.6 : 1.1}
          fill="#fff2e4"
          className="constellation__star"
          style={{ animationDelay: `${(i % 5) * 0.45}s` }}
        />
      ))}
    </svg>
  )
}
