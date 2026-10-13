/* Small reusable SVG shapes: heart glyph + ornamental flourish. */

export function HeartGlyph({ size = 16, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path d="M12 21s-6.7-4.35-9.33-7.86C.9 10.9 1.9 7.1 5.1 6.1c2-.63 3.9.28 4.9 2 .9-1.72 2.9-2.63 4.9-2 3.2 1 4.2 4.8 2.43 7.04C18.7 16.65 12 21 12 21z" />
    </svg>
  )
}

/**
 * A decorative gold flourish used under titles.
 */
export function Flourish({ width = 220, className = '' }) {
  return (
    <svg
      width={width}
      height="20"
      viewBox="0 0 220 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 10c24 0 34 6 54 6s30-12 54-12 34 12 54 12 30-6 54-6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="110" cy="4" r="1.6" fill="currentColor" />
      <path d="M110 10l6-4-6-4-6 4z" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

/**
 * An ornamental corner used on the certificate / cards.
 */
export function OrnateCorner({ className = '' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      width="56"
      height="56"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 58V22C2 10 10 2 22 2h36"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M9 58V24C9 15 15 9 24 9h34"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="22" cy="22" r="2.2" fill="currentColor" />
    </svg>
  )
}
