import site from '../config/site.js'
import './Countdown.css'

/**
 * Renders the four countdown boxes (days / hours / minutes / seconds).
 * Purely presentational — the timing lives in the useCountdown hook.
 */
export default function Countdown({ state, tone = 'dark' }) {
  if (!state?.valid) return null

  const labels = site.countdownLabels
  const boxes = [
    { key: 'days', value: state.days, label: labels.days },
    { key: 'hours', value: state.hours, label: labels.hours },
    { key: 'minutes', value: state.minutes, label: labels.minutes },
    { key: 'seconds', value: state.seconds, label: labels.seconds },
  ]

  return (
    <div className={`countdown countdown--${tone}`} role="group" aria-label="Birthday countdown">
      {boxes.map((b) => (
        <div className="countdown__box" key={b.key}>
          <span className="countdown__value">{String(b.value).padStart(2, '0')}</span>
          <span className="countdown__label">{b.label}</span>
        </div>
      ))}
    </div>
  )
}
