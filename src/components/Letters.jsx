import { useEffect, useState } from 'react'
import { Mail, X, Heart, Sparkles } from 'lucide-react'
import letters from '../config/letters.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import { Flourish } from './common/Shapes.jsx'
import './Letters.css'

export default function Letters() {
  const [openId, setOpenId] = useState(null)
  const active = letters.find((l) => l.id === openId) || null

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section id="letters" className="section letters" aria-label="Letters for you">
      <div className="container">
        <SectionHead
          eyebrow="Letters for You"
          title="Things I Wanted to Say"
          lead="Some feelings are too big for a text message. I sealed them in here instead — open them whenever you need them."
        />

        <div className="letters__grid">
          {letters.map((letter, i) => (
            <Reveal key={letter.id} delay={(i % 4) * 0.06} className="letter-card-wrap">
              <button
                type="button"
                className={`letter-card ${letter.special ? 'is-special' : ''}`}
                onClick={() => setOpenId(letter.id)}
              >
                {letter.special && (
                  <span className="letter-card__ribbon">
                    <Sparkles size={12} aria-hidden="true" /> birthday
                  </span>
                )}
                <span className="letter-card__seal" aria-hidden="true">
                  <Heart size={16} />
                </span>
                <span className="letter-card__kicker">{letter.openWhen}</span>
                <span className="letter-card__title title-md">{letter.label}</span>
                <span className="letter-card__hint muted">{letter.hint}</span>
                <span className="letter-card__open">
                  <Mail size={15} aria-hidden="true" /> Open letter
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="letter-modal no-print"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenId(null)
          }}
        >
          <article className="letter-paper paper-tex">
            <button
              type="button"
              className="letter-paper__close"
              onClick={() => setOpenId(null)}
              aria-label="Close letter"
            >
              <X size={20} />
            </button>

            <header className="letter-paper__head">
              <p className="eyebrow">{active.label}</p>
              <h3 className="title-lg letter-paper__title">{active.openWhen}</h3>
              <Flourish width={190} />
            </header>

            {active.greeting && <p className="letter-paper__greeting hand">{active.greeting}</p>}

            <div className="letter-paper__body">
              {active.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <footer className="letter-paper__foot">
              <span className="sign">{active.signoff || '— Always yours'}</span>
            </footer>
          </article>
        </div>
      )}
    </section>
  )
}
