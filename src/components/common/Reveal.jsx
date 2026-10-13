import useReveal from '../../hooks/useReveal.js'

/**
 * Wraps children in a scroll-reveal container.
 * variant: 'up' | 'left' | 'right'
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  ...rest
}) {
  const [ref, visible] = useReveal()
  const variantClass = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
