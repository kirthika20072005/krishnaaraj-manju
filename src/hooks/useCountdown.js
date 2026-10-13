import { useEffect, useMemo, useState } from 'react'

const DAY = 1000 * 60 * 60 * 24
const HOUR = 1000 * 60 * 60
const MINUTE = 1000 * 60
const SECOND = 1000

/**
 * Live countdown / elapsed timer for a target date.
 * - If the target is in the future  -> { isPast: false, days, hours, minutes, seconds, total }
 * - If the target is today          -> { isToday: true, ... }
 * - If the target is in the past    -> { isPast: true, elapsed: {...} }
 */
export default function useCountdown(targetDateString) {
  const target = useMemo(() => new Date(targetDateString), [targetDateString])
  const valid = !Number.isNaN(target.getTime())

  const compute = () => {
    if (!valid) {
      return { valid: false, isPast: false, isToday: false, days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    const isToday =
      target.getFullYear() === now.getFullYear() &&
      target.getMonth() === now.getMonth() &&
      target.getDate() === now.getDate()

    if (diff > 0) {
      const days = Math.floor(diff / DAY)
      const hours = Math.floor((diff % DAY) / HOUR)
      const minutes = Math.floor((diff % HOUR) / MINUTE)
      const seconds = Math.floor((diff % MINUTE) / SECOND)
      return { valid: true, isPast: false, isToday, days, hours, minutes, seconds, diff }
    }

    // Past: how long since
    const abs = Math.abs(diff)
    const days = Math.floor(abs / DAY)
    const hours = Math.floor((abs % DAY) / HOUR)
    const minutes = Math.floor((abs % HOUR) / MINUTE)
    const seconds = Math.floor((abs % MINUTE) / SECOND)
    return { valid: true, isPast: true, isToday, days, hours, minutes, seconds, diff }
  }

  const [state, setState] = useState(compute)

  useEffect(() => {
    if (!valid) return
    setState(compute())
    const id = window.setInterval(() => setState(compute()), 1000)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid, targetDateString])

  return state
}
