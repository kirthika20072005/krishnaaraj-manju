import { useMemo, useState } from 'react'
import { Camera } from 'lucide-react'
import gallery from '../config/gallery.js'
import site from '../config/site.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import Lightbox from './Lightbox.jsx'
import './Gallery.css'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const items = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter(p => p.category === filter)),
    [filter]
  )

  const openAt = id => {
    const idx = items.findIndex(p => p === id)
    setLightboxIndex(idx)
  }

  const navigate = dir => {
    setLightboxIndex(cur => {
      if (cur === null) return cur
      const next = (cur + dir + items.length) % items.length
      return next
    })
  }

  return (
    <section id="memories" className="section gallery bg-cream" aria-label="Our memories">
      <div className="container">
        <SectionHead
          eyebrow="Our Memories"
          title="Little Moments, Infinite Memories"
          lead={site.galleryIntro}
        />

        <Reveal className="gallery__filters" role="tablist" aria-label="Photo categories">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={`gallery__filter ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {site.galleryCategories.map(c => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={filter === c.id}
              className={`gallery__filter ${filter === c.id ? 'is-active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </Reveal>

        <div className="gallery__grid">
          {items.map((photo, i) => (
            <Reveal
              key={`${photo.src}-${i}`}
              variant="pop"
              delay={(i % 6) * 0.05}
              className="polaroid-wrap"
              style={{ '--tilt': `${photo.tilt ?? 0}deg` }}
            >
              <button
                type="button"
                className="polaroid"
                onClick={() => openAt(photo)}
                aria-label={`Open photo: ${photo.caption}`}
              >
                <div className="polaroid__image-wrap">
                  <img
                    className="polaroid__image"
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="polaroid__shine" aria-hidden="true" />
                </div>
                <div className="polaroid__meta">
                  <span className="polaroid__caption hand">{photo.caption}</span>
                  {photo.date && <span className="polaroid__date">{photo.date}</span>}
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="gallery__note center">
          <p className="muted">
            <Camera size={15} aria-hidden="true" /> {items.length} little moments here — and room
            for so many more.
          </p>
        </Reveal>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigate}
        />
      )}
    </section>
  )
}
