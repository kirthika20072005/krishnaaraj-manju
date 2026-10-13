import { useEffect, useState } from 'react'
import './ScrollProgress.css'

/** A slim rose-gold progress bar showing how far through the story you are. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress no-print" aria-hidden="true">
      <span className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
