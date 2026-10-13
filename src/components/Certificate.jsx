import { useRef, useState } from 'react'
import { Heart, Printer, RotateCcw, Stamp } from 'lucide-react'
import site from '../config/site.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import { Flourish, OrnateCorner } from './common/Shapes.jsx'
import SignaturePad from './SignaturePad.jsx'
import './Certificate.css'

const CERT = site.certificate

export default function Certificate() {
  const padRef = useRef(null)
  const [sealed, setSealed] = useLocalStorage('forever-promise-sealed', null)
  const [hasInk, setHasInk] = useState(false)
  const [burst, setBurst] = useState(0)

  const seal = () => {
    const dataURL = padRef.current?.toDataURL()
    if (!dataURL) return
    setSealed({
      signature: dataURL,
      date: new Date().toISOString(),
    })
    setBurst((b) => b + 1)
  }

  const reset = () => {
    setSealed(null)
    setHasInk(false)
    padRef.current?.clear()
  }

  const dateLabel = sealed
    ? new Date(sealed.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

  return (
    <section id="promise" className="section certificate" aria-label="Our forever promise">
      <div className="container-narrow">
        <SectionHead
          eyebrow="Our Little Promise"
          title="The Forever Promise"
          lead="Not a legal document — just a promise, written down so it lasts longer than a memory."
        />

        <Reveal className="certificate__paper paper-tex" >
          <span className="certificate__corner certificate__corner--tl" aria-hidden="true"><OrnateCorner /></span>
          <span className="certificate__corner certificate__corner--tr" aria-hidden="true"><OrnateCorner /></span>
          <span className="certificate__corner certificate__corner--bl" aria-hidden="true"><OrnateCorner /></span>
          <span className="certificate__corner certificate__corner--br" aria-hidden="true"><OrnateCorner /></span>

          <header className="certificate__head">
            <p className="certificate__number">{CERT.number}</p>
            <h3 className="certificate__title">{CERT.title}</h3>
            <p className="certificate__subtitle">{CERT.subtitle}</p>
            <Flourish width={220} />
          </header>

          <p className="certificate__body">{CERT.body}</p>

          <ul className="certificate__promises">
            {CERT.promises.map((p, i) => (
              <li key={i}>
                <Heart size={14} aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <p className="certificate__closing hand">{CERT.closing}</p>

          <div className="certificate__signatures">
            <div className="certificate__sig-block">
              <div className="certificate__sig-area">
                {sealed ? (
                  <img
                    src={sealed.signature}
                    alt={`${site.hisName}'s signature`}
                    className="certificate__sig-image"
                  />
                ) : (
                  <SignaturePad
                    ref={padRef}
                    label={`For ${site.hisName}`}
                    onChange={setHasInk}
                  />
                )}
              </div>
              <p className="certificate__sig-name">{site.hisName}</p>
              <p className="certificate__sig-meta">{sealed ? dateLabel : 'Your signature'}</p>
            </div>

            <div className="certificate__sig-block">
              <div className="certificate__sig-area certificate__sig-area--static">
                <span className="sign certificate__my-sign">{site.myName}</span>
              </div>
              <p className="certificate__sig-name">{site.myName}</p>
              <p className="certificate__sig-meta">{dateLabel}</p>
            </div>
          </div>

          <p className="certificate__place">{CERT.place}</p>
          <p className="certificate__fine">{CERT.fine}</p>

          {sealed && (
            <div className="certificate__wax" key={burst} aria-hidden="true">
              <Stamp size={22} />
              <span>sealed</span>
            </div>
          )}
        </Reveal>

        <div className="certificate__actions no-print">
          {!sealed ? (
            <>
              <button
                type="button"
                className="btn certificate__seal-btn"
                onClick={seal}
                disabled={!hasInk}
              >
                Seal Our Promise <span aria-hidden="true">❤️</span>
              </button>
              <p className="certificate__seal-hint muted">
                {hasInk
                  ? 'Beautiful. Now make it official.'
                  : 'Sign above to seal this promise.'}
              </p>
            </>
          ) : (
            <>
              <button type="button" className="btn" onClick={() => window.print()}>
                <Printer size={17} aria-hidden="true" /> Keep a copy
              </button>
              <button type="button" className="btn btn-ghost certificate__reset" onClick={reset}>
                <RotateCcw size={16} aria-hidden="true" /> Sign again
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
