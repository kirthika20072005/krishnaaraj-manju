import { useMemo, useState } from 'react'
import { Gift, Heart, Sparkles, RotateCcw } from 'lucide-react'
import site from '../config/site.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import { Flourish } from './common/Shapes.jsx'
import './GiftBox.css'

const CONFETTI_COLORS = ['#b76e79', '#d4af7a', '#e0a899', '#c9b8db', '#f4d4cd', '#fbf6ef']

export default function GiftBox() {
  const [open, setOpen] = useState(false)
  const [burstKey, setBurstKey] = useState(0)

  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.2 + Math.random() * 1.6,
        rotate: Math.random() * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 8,
        round: Math.random() > 0.6,
      })),
    [burstKey],
  )

  const openIt = () => {
    setOpen(true)
    setBurstKey((k) => k + 1)
  }

  return (
    <section id="gift" className="section gift" aria-label="A gift for you">
      <div className="container-narrow center">
        <SectionHead
          eyebrow="A Little Gift"
          title="There's Something Inside for You"
          lead="No wrapping paper needed — go on, open it."
        />

        <Reveal className="gift__stage">
          <div className={`giftbox ${open ? 'is-open' : ''}`}>
            <div className="giftbox__glow" aria-hidden="true" />

            {open && (
              <div className="giftbox__confetti" key={burstKey} aria-hidden="true">
                {confetti.map((c) => (
                  <span
                    key={c.id}
                    className="confetti-piece"
                    style={{
                      left: `${c.left}%`,
                      width: c.size,
                      height: c.size,
                      background: c.color,
                      borderRadius: c.round ? '50%' : '2px',
                      transform: `rotate(${c.rotate}deg)`,
                      animationDelay: `${c.delay}s`,
                      animationDuration: `${c.duration}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              className="giftbox__body"
              onClick={open ? undefined : openIt}
              aria-label={open ? 'Gift opened' : 'Open the gift'}
            >
              <span className="giftbox__lid" aria-hidden="true">
                <span className="giftbox__bow" />
              </span>
              <span className="giftbox__box" aria-hidden="true">
                <span className="giftbox__ribbon-v" />
                <span className="giftbox__ribbon-h" />
              </span>
              {!open && (
                <span className="giftbox__hint">
                  <Gift size={18} aria-hidden="true" /> Tap to open
                </span>
              )}
            </button>

            {open && (
              <div className="giftbox__reveal">
                <Sparkles size={20} className="giftbox__reveal-icon" aria-hidden="true" />
                <p className="giftbox__reveal-title hand">{site.gift.title}</p>
                <Flourish width={180} />
                <p className="giftbox__reveal-text serif-lead">{site.gift.message}</p>
              </div>
            )}
          </div>
        </Reveal>

        {open && (
          <button type="button" className="btn btn-ghost gift__again" onClick={() => setOpen(false)}>
            <RotateCcw size={16} aria-hidden="true" /> Wrap it again
          </button>
        )}

        <p className="gift__ps muted">
          <Heart size={14} aria-hidden="true" /> {site.gift.ps}
        </p>
      </div>
    </section>
  )
}
