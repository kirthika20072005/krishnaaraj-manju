import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal hook.
 * Attach the returned ref to an element and add the `reveal` class in CSS.
 * The element gets `is-visible` when it scrolls into view (once).
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return [ref, visible]
}

export default useReveal
