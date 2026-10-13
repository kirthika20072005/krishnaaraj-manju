import { useEffect, useRef, useState } from 'react'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import site from '../config/site.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'
import Particles from './common/Particles.jsx'
import Starfield from './common/Starfield.jsx'
import { Flourish } from './common/Shapes.jsx'
import './OpeningScreen.css'

/**
 * The secret invitation. A glowing envelope among stars and hearts.
 * Click -> the envelope opens -> a handwritten note appears -> enter the site.
 */
export default function OpeningScreen({ onEnter }) {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState('closed') // closed | opening | open | leaving
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => () => clearTimers(), [])

  const handleOpen = () => {
    if (stage !== 'closed') return
    if (reduced) {
      setStage('open')
      return
    }
    setStage('opening')
    timers.current.push(setTimeout(() => setStage('open'), 1500))
  }

  const handleEnter = () => {
    setStage('leaving')
    timers.current.push(
      setTimeout(() => {
        onEnter?.()
      }, reduced ? 0 : 900),
    )
  }

  const isOpen = stage === 'open' || stage === 'leaving'

  return (
    <div className={`opening ${stage === 'leaving' ? 'is-leaving' : ''}`}>
      <Starfield count={80} />
      <Particles count={12} sparkles={30} />

      <div className="opening__glow" aria-hidden="true" />

      <div className="opening__content">
        <p className="eyebrow opening__eyebrow">A little universe, for {site.hisNickname}</p>

        {!isOpen && (
          <div className="opening__intro">
            <h1 className="title-lg opening__line1">{site.opening.line1}</h1>
            <p className="serif-lead opening__line2">{site.opening.line2}</p>
          </div>
        )}

        <div className={`envelope ${isOpen ? 'is-open' : ''}`}>
          <div className="envelope__back" aria-hidden="true" />
          <div className="envelope__letter">
            <div className="envelope__letter-inner paper-tex">
              <Heart size={18} className="envelope__letter-heart" aria-hidden="true" />
              {site.opening.birthdayLine && (
                <p className="envelope__birthday hand">{site.opening.birthdayLine}</p>
              )}
              <p className="envelope__note hand">{site.opening.letter}</p>
              <span className="envelope__from sign">— {site.myName}</span>
            </div>
          </div>
          <button
            type="button"
            className="envelope__front"
            onClick={handleOpen}
            aria-label="Open the envelope"
            tabIndex={isOpen ? -1 : 0}
          />
          <div className="envelope__flap" aria-hidden="true" />
          <div className="envelope__seal" aria-hidden="true">
            <Heart size={20} />
          </div>
        </div>

        {!isOpen ? (
          <button type="button" className="btn opening__btn" onClick={handleOpen}>
            <Sparkles size={18} aria-hidden="true" />
            {site.opening.button}
            <span aria-hidden="true">❤️</span>
          </button>
        ) : (
          <div className="opening__enter">
            <Flourish width={200} />
            <button type="button" className="btn opening__btn" onClick={handleEnter}>
              Step inside
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="opening__hint muted">Take your time — there is no rush.</p>
          </div>
        )}
      </div>

      <p className="opening__footer muted">
        Made by hand, just for you.
      </p>
    </div>
  )
}
