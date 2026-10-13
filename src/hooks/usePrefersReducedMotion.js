import { useEffect, useState } from 'react'

/**
 * Returns true when the visitor has "reduce motion" turned on.
 * We use it to disable heavy/looping animations while keeping the site usable.
 */
export default function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  return prefersReduced
}
