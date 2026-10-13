import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Eraser, PenLine } from 'lucide-react'
import './SignaturePad.css'

/**
 * A lightweight signature canvas that works with mouse, pen and touch.
 * Exposes a small imperative API via ref: toDataURL(), isEmpty(), clear().
 */
const SignaturePad = forwardRef(function SignaturePad(
  { label = 'Sign here', onChange, clearLabel = 'Clear' },
  ref,
) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const [hasInk, setHasInk] = useState(false)

  const setupCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, Math.round(rect.width * dpr))
    canvas.height = Math.max(1, Math.round(rect.height * dpr))
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.lineWidth = 2.4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#2b1a22'
  }

  useEffect(() => {
    setupCanvas()
    const onResize = () => {
      setupCanvas()
      setHasInk(false)
      onChange?.(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const start = (e) => {
    e.preventDefault()
    canvasRef.current?.setPointerCapture?.(e.pointerId)
    drawing.current = true
    last.current = pos(e)
  }

  const move = (e) => {
    if (!drawing.current) return
    e.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const p = pos(e)
    ctx.beginPath()
    ctx.moveTo(last.current.x, last.current.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
    if (!hasInk) {
      setHasInk(true)
      onChange?.(true)
    }
  }

  const end = () => {
    drawing.current = false
    last.current = null
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasInk(false)
    onChange?.(false)
  }

  useImperativeHandle(ref, () => ({
    toDataURL: () => (hasInk ? canvasRef.current?.toDataURL('image/png') : null),
    isEmpty: () => !hasInk,
    clear,
  }))

  return (
    <div className={`signpad ${hasInk ? 'has-ink' : ''}`}>
      <div className="signpad__label">
        <PenLine size={15} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="signpad__canvas"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        aria-label={label}
      />
      <div className="signpad__baseline" aria-hidden="true" />
      <div className="signpad__foot">
        <span className="signpad__hint">
          {hasInk ? 'Looks good.' : 'Draw with your finger or mouse.'}
        </span>
        <button type="button" className="signpad__clear" onClick={clear}>
          <Eraser size={14} aria-hidden="true" /> {clearLabel}
        </button>
      </div>
    </div>
  )
})

export default SignaturePad
