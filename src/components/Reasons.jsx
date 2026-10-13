import { useState } from 'react'
import { Heart, Shuffle } from 'lucide-react'
import reasons from '../config/reasons.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import './Reasons.css'

export default function Reasons() {
  const [spotlight, setSpotlight] = useState(null)

  const pick = () => {
    let next = Math.floor(Math.random() * reasons.length)
    if (reasons.length > 1 && next === spotlight) next = (next + 1) % reasons.length
    setSpotlight(next)
  }

  return (
    <section id="reasons" className="section reasons bg-cream" aria-label="Reasons I love you">
      <div className="container">
        <SectionHead
          eyebrow="Just Because"
          title="The Little Things I Love About You"
          lead="If I wrote them all down, I would never finish. Here are a few that came to mind first."
        />

        <Reveal className="reasons__spotlight-wrap">
          <button type="button" className="btn btn-dark reasons__spotlight-btn" onClick={pick}>
            <Shuffle size={17} aria-hidden="true" />
            Tell me a reason
          </button>
          <div className={`reasons__spotlight ${spotlight === null ? '' : 'is-shown'}`} aria-live="polite">
            {spotlight !== null && (
              <p key={spotlight} className="reasons__spotlight-text hand">
                <Heart size={16} aria-hidden="true" /> {reasons[spotlight]}
              </p>
            )}
          </div>
        </Reveal>

        <ol className="reasons__grid">
          {reasons.map((reason, i) => (
            <Reveal
              as="li"
              key={i}
              delay={(i % 6) * 0.05}
              className="reason"
            >
              <span className="reason__num">{String(i + 1).padStart(2, '0')}</span>
              <p className="reason__text">{reason}</p>
              <Heart size={14} className="reason__heart" aria-hidden="true" />
            </Reveal>
          ))}
        </ol>

        <Reveal as="p" className="reasons__foot center serif-lead" delay={0.1}>
          …and I could keep going forever.
        </Reveal>
      </div>
    </section>
  )
}
