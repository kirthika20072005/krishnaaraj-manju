import { useEffect, useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'
import site from '../config/site.js'
import './SiteNav.css'

/**
 * Floating chapter navigation. Highlights the section you're viewing.
 * On mobile it collapses into a menu overlay.
 */
export default function SiteNav({ items = [] }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(items[0]?.id)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className={`site-nav no-print ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-nav__inner">
          <button type="button" className="site-nav__brand" onClick={() => go(items[0]?.id)}>
            <Heart size={16} className="site-nav__brand-heart" aria-hidden="true" />
            <span>{site.hisName}</span>
          </button>

          <nav className="site-nav__links" aria-label="Sections">
            {items.map((it) => (
              <button
                key={it.id}
                type="button"
                className={`site-nav__link ${active === it.id ? 'is-active' : ''}`}
                onClick={() => go(it.id)}
                aria-current={active === it.id ? 'true' : undefined}
              >
                {it.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="site-nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className={`site-nav__overlay ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true">
        <div className="site-nav__overlay-inner">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`site-nav__overlay-link ${active === it.id ? 'is-active' : ''}`}
              onClick={() => go(it.id)}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
