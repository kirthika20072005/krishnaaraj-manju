import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal hook.
 * Attach the returned ref to an element and add the `reveal` class in CSS.
 * The element gets `is-visible` when it scrolls into view (once).
 */
export function useReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  root = null,
} = {}) {
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
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin, root }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, root])

  return [ref, visible]
}

export default useReveal
