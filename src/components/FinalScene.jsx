import { Heart, RotateCcw } from 'lucide-react'
import site from '../config/site.js'
import Reveal from './common/Reveal.jsx'
import { Flourish, HeartGlyph } from './common/Shapes.jsx'
import './FinalScene.css'

export default function FinalScene({ onReplay }) {
  const { final } = site

  return (
    <section id="finale" className="section finale" aria-label="A final message">
      <div className="finale__hearts" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <HeartGlyph key={i} size={14 + (i % 3) * 6} className="finale__heart" />
        ))}
      </div>

      <div className="container-narrow center">
        {final.photo && (
          <Reveal className="finale__photo-frame">
            <img
              className="finale__photo"
              src={final.photo}
              alt="Us"
              loading="lazy"
              onError={e => {
                e.currentTarget.closest('.finale__photo-frame')?.classList.add('is-missing')
              }}
            />
            <span className="finale__photo-glow" aria-hidden="true" />
          </Reveal>
        )}

        <Reveal className="finale__lines" delay={0.05}>
          {final.lines.map((line, i) => (
            <p key={i} className="finale__line serif-lead">
              {line}
            </p>
          ))}
        </Reveal>

        <Reveal className="finale__closing" delay={0.1}>
          <Flourish width={240} />
          <h2 className="finale__closing-text">{final.closing}</h2>
          <Flourish width={240} />
        </Reveal>

        <Reveal className="finale__remember glass" delay={0.15}>
          <p className="finale__remember-lead">{final.remember}</p>
          <p className="finale__remember-big hand">{final.rememberBig}</p>
        </Reveal>

        <Reveal className="finale__sign" delay={0.2}>
          <p className="finale__sign-line">{final.signatureLine}</p>
          <p className="sign finale__sign-name">{site.myName}</p>
        </Reveal>

        <Reveal className="finale__actions no-print" delay={0.25}>
          <button type="button" className="btn btn-dark finale__replay" onClick={onReplay}>
            <RotateCcw size={17} aria-hidden="true" /> {final.replay}
          </button>
        </Reveal>

        <p className="finale__made muted no-print">
          <Heart size={13} aria-hidden="true" /> Made with far too much love, and a lot of late
          nights.
        </p>
      </div>
    </section>
  )
}
