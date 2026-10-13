import Reveal from './Reveal.jsx'
import { Flourish } from './Shapes.jsx'

/**
 * Consistent section header: eyebrow, title, optional lead paragraph,
 * and an ornamental flourish.
 */
export default function SectionHead({ eyebrow, title, lead, ornament = true, id }) {
  return (
    <div className="section-head">
      {eyebrow && (
        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" id={id} className="title-xl" delay={0.05}>
        {title}
      </Reveal>
      {ornament && (
        <Reveal delay={0.1} className="divider-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
          <span className="divider" style={{ marginBlock: '0.4rem' }}>
            <Flourish width={200} />
          </span>
        </Reveal>
      )}
      {lead && (
        <Reveal as="p" className="serif-lead muted" delay={0.12}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
