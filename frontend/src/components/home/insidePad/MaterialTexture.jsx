import { useId } from 'react'
import { cn } from '../homeStyles.js'

// Vector close-up of the PIAX top sheet: soft nonwoven surface, an embossed
// channel ridge, perforation rows that follow it, and two leaves. Drawn as
// SVG so it stays sharp at any size or pixel density.
const WIDTH = 660
const HEIGHT = 298

// Centre line of the embossed ridge; rows of perforations run parallel to it.
const ridgeY = (x) => 150 - 0.36 * x + 0.00022 * (x - 330) ** 2

const perforations = []
for (let row = -7; row <= 9; row += 1) {
  if (row === 0) continue
  for (let x = -10; x < WIDTH + 20; x += 19) {
    const cx = x + (row % 2 ? 9.5 : 0)
    const cy = ridgeY(cx) + row * 21
    if (cy < -6 || cy > HEIGHT + 6) continue
    const depth = 0.7 + (cy / HEIGHT) * 0.6 // nearer rows (lower) read slightly larger
    perforations.push({ cx, cy, rx: 2.3 * depth, ry: 1.5 * depth })
  }
}
const ridgeSlope = (x) => -0.36 + 0.00044 * (x - 330)
const tilt = (x) => (Math.atan(ridgeSlope(x)) * 180) / Math.PI

const ridgePath = (offset = 0) => {
  const points = []
  for (let x = -20; x <= WIDTH + 20; x += 20) points.push(`${x} ${(ridgeY(x) + offset).toFixed(1)}`)
  return `M${points.join('L')}`
}

const LEAF = 'M0 0C48-44 148-58 200 0C150 52 52 42 0 0Z'
const VEINS = [40, 70, 100, 130, 160]

function Leaf({ transform, ids }) {
  return (
    <g transform={transform} filter={`url(#${ids.leafShadow})`}>
      <path d={LEAF} fill={`url(#${ids.leaf})`} />
      <path d={LEAF} fill={`url(#${ids.leafSheen})`} />
      <path d="M6 0Q100-5 198 0" fill="none" stroke="#bfe3cc" strokeOpacity=".75" strokeWidth="1.6" strokeLinecap="round" />
      {VEINS.map((x) => (
        <g key={x} stroke="#a9d8bb" strokeOpacity=".45" strokeWidth=".9" fill="none" strokeLinecap="round">
          <path d={`M${x} -2Q${x + 14} -18 ${x + 30} -${24 - Math.abs(x - 100) / 8}`} />
          <path d={`M${x} 2Q${x + 14} 16 ${x + 30} ${22 - Math.abs(x - 100) / 8}`} />
        </g>
      ))}
    </g>
  )
}

export default function MaterialTexture({ className = '' }) {
  const uid = useId().replace(/[^\w-]/g, '')
  const ids = {
    surface: `${uid}-surface`,
    fibres: `${uid}-fibres`,
    ridgeShadow: `${uid}-ridge-shadow`,
    leaf: `${uid}-leaf`,
    leafSheen: `${uid}-leaf-sheen`,
    leafShadow: `${uid}-leaf-shadow`,
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMaxYMid slice"
      role="img"
      aria-label="Close-up of the soft, perforated PIAX pad surface with a leaf"
      className={cn('block', className)}
    >
      <defs>
        <linearGradient id={ids.surface} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".55" stopColor="#f6f9f7" />
          <stop offset="1" stopColor="#e9f1ed" />
        </linearGradient>
        {/* Fine, low-contrast noise gives the nonwoven fibre feel. */}
        <filter id={ids.fibres} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85 .55" numOctaves="3" seed="7" />
          <feColorMatrix values="0 0 0 0 .55  0 0 0 0 .62  0 0 0 0 .6  0 0 0 -1.1 .72" />
        </filter>
        <filter id={ids.ridgeShadow} x="-5%" y="-40%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id={ids.leaf} x1="0" y1="-40" x2="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3f9b67" />
          <stop offset=".5" stopColor="#2a8157" />
          <stop offset="1" stopColor="#135f44" />
        </linearGradient>
        <linearGradient id={ids.leafSheen} x1="0" y1="-50" x2="0" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={ids.leafShadow} x="-20%" y="-40%" width="140%" height="200%">
          <feDropShadow dx="-6" dy="10" stdDeviation="8" floodColor="#0b5b4e" floodOpacity=".22" />
        </filter>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill={`url(#${ids.surface})`} />
      <rect width={WIDTH} height={HEIGHT} filter={`url(#${ids.fibres})`} opacity=".35" />

      {/* Embossed ridge: soft shadow below, highlight on the crest. */}
      <path d={ridgePath(7)} fill="none" stroke="#c7d6cf" strokeWidth="14" filter={`url(#${ids.ridgeShadow})`} />
      <path d={ridgePath(2)} fill="none" stroke="#dbe6e1" strokeWidth="3" strokeLinecap="round" />
      <path d={ridgePath(-3)} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />

      {perforations.map(({ cx, cy, rx, ry }) => (
        <g key={`${cx}-${cy}`} transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${tilt(cx).toFixed(1)})`}>
          <ellipse cy={ry * 0.55} rx={rx} ry={ry} fill="#fff" />
          <ellipse rx={rx} ry={ry} fill="#b9c9c2" />
        </g>
      ))}

      <Leaf ids={ids} transform="translate(560 18) rotate(56) scale(.9)" />
      <Leaf ids={ids} transform="translate(468 128) rotate(42) scale(1.3)" />
    </svg>
  )
}
