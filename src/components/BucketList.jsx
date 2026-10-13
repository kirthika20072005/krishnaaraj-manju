import { useMemo, useState } from 'react'
import { Check, Plus, Sparkles, Trash2 } from 'lucide-react'
import bucketList from '../config/bucketList.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import SectionHead from './common/SectionHead.jsx'
import Reveal from './common/Reveal.jsx'
import './BucketList.css'

const DEFAULT_ITEMS = bucketList.map((item, i) => ({
  id: `d-${i}`,
  text: item.text,
  emoji: item.emoji || '💫',
  custom: false,
}))

export default function BucketList() {
  const [custom, setCustom] = useLocalStorage('bucket-list-custom', [])
  const [done, setDone] = useLocalStorage('bucket-list-done', [])
  const [draft, setDraft] = useState('')

  const items = useMemo(() => [...DEFAULT_ITEMS, ...custom], [custom])
  const doneSet = useMemo(() => new Set(done), [done])
  const completed = items.filter((i) => doneSet.has(i.id)).length
  const pct = items.length ? Math.round((completed / items.length) * 100) : 0

  const toggle = (id) => {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const addDream = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const item = { id: `c-${Date.now()}`, text, emoji: '💫', custom: true }
    setCustom((prev) => [...prev, item])
    setDraft('')
  }

  const removeDream = (id) => {
    setCustom((prev) => prev.filter((i) => i.id !== id))
    setDone((prev) => prev.filter((x) => x !== id))
  }

  return (
    <section id="future" className="section bucket bg-burgundy" aria-label="Our future bucket list">
      <div className="container-narrow">
        <SectionHead
          eyebrow="Still To Come"
          title="Our Little Bucket List"
          lead="A list of small and big things I want to do with you. Tick them off as we go — and add your own."
        />

        <Reveal className="bucket__meter">
          <div className="bucket__bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <span className="bucket__bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="bucket__count">
            <Sparkles size={14} aria-hidden="true" /> {completed} of {items.length} dreams ticked
          </p>
        </Reveal>

        <ul className="bucket__list">
          {items.map((item, i) => {
            const isDone = doneSet.has(item.id)
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(i, 8) * 0.04}
                className={`bucket__item ${isDone ? 'is-done' : ''}`}
              >
                <button
                  type="button"
                  className="bucket__check"
                  onClick={() => toggle(item.id)}
                  aria-pressed={isDone}
                  aria-label={`${isDone ? 'Untick' : 'Tick'}: ${item.text}`}
                >
                  {isDone ? <Check size={15} aria-hidden="true" /> : <span className="bucket__dot" aria-hidden="true" />}
                </button>
                <span className="bucket__emoji" aria-hidden="true">{item.emoji}</span>
                <span className="bucket__text">{item.text}</span>
                {item.custom && (
                  <button
                    type="button"
                    className="bucket__remove"
                    onClick={() => removeDream(item.id)}
                    aria-label={`Remove: ${item.text}`}
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                )}
              </Reveal>
            )
          })}
        </ul>

        <Reveal as="form" className="bucket__add" onSubmit={addDream}>
          <input
            type="text"
            className="bucket__input"
            placeholder="Add another dream…"
            value={draft}
            maxLength={90}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Add another dream"
          />
          <button type="submit" className="btn bucket__add-btn" disabled={!draft.trim()}>
            <Plus size={16} aria-hidden="true" /> Add
          </button>
        </Reveal>
      </div>
    </section>
  )
}
