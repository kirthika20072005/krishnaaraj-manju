import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Lightbox.css'

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const dialogRef = useRef(null)

  const photo = items[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
      if (e.key === 'Tab') {
        // simple focus trap
        const focusables = dialogRef.current?.querySelectorAll('button')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNavigate])

  if (!photo) return null

  return (
    <div
      className="lightbox no-print"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption}`}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox__frame">
        <button
          type="button"
          className="lightbox__close"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close photo"
        >
          <X size={22} />
        </button>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={() => onNavigate(-1)}
          aria-label="Previous photo"
        >
          <ChevronLeft size={26} />
        </button>

        <figure className="lightbox__figure">
          <div className="lightbox__image-wrap">
            <img src={photo.src} alt={photo.caption} className="lightbox__image" />
          </div>
          <figcaption className="lightbox__caption">
            <p className="lightbox__caption-title hand">{photo.caption}</p>
            {photo.date && <p className="lightbox__caption-date">{photo.date}</p>}
            {photo.note && <p className="lightbox__caption-note">{photo.note}</p>}
          </figcaption>
        </figure>

        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={() => onNavigate(1)}
          aria-label="Next photo"
        >
          <ChevronRight size={26} />
        </button>

        <p className="lightbox__counter" aria-hidden="true">
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
