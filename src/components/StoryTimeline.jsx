import {
  Sparkles,
  MessageCircle,
  Heart,
  Laugh,
  Camera,
  Infinity as InfinityIcon,
  Star,
} from 'lucide-react'
import storyMilestones from '../config/story.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import './StoryTimeline.css'

const ICONS = {
  sparkles: Sparkles,
  'message-circle': MessageCircle,
  heart: Heart,
  laugh: Laugh,
  camera: Camera,
  infinity: InfinityIcon,
  star: Star,
}

export default function StoryTimeline() {
  return (
    <section id="story" className="section story" aria-label="Our story">
      <div className="container">
        <SectionHead
          eyebrow="Our Story"
          title="Every Little Thing Led Me to You"
          lead="A few of the moments that made this story ours — in the order I remember them."
        />

        <ol className="story__timeline">
          {storyMilestones.map((m, i) => {
            const Icon = ICONS[m.icon] || Heart
            const side = i % 2 === 0 ? 'left' : 'right'
            return (
              <li className={`story__item story__item--${side}`} key={`${m.title}-${i}`}>
                <span className="story__node" aria-hidden="true">
                  <Icon size={16} />
                </span>

                <Reveal
                  as="article"
                  variant={side === 'left' ? 'right' : 'left'}
                  className="story__card glass"
                >
                  <span className="story__date">{m.date}</span>
                  <h3 className="story__title title-md">{m.title}</h3>

                  {m.image ? (
                    <img
                      className="story__image"
                      src={m.image}
                      alt={m.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="story__illustration" aria-hidden="true">
                      <Icon size={26} />
                      <span className="story__illustration-line" />
                    </div>
                  )}

                  <p className="story__text">{m.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
