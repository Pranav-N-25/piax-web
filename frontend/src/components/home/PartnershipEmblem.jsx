import { useId } from 'react'
import { Handshake } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { cn } from './homeStyles.js'

// Partnership emblem: the Lucide handshake in a badge resting on a stack of PIAX boxes — a partnership
// built on the product. Motion tells the story: the boxes land, the handshake draws itself in, then gives
// a periodic shake with a heart rising from it, sparkles twinkle and a dashed ring turns slowly. The
// artwork is centred and always fits its frame whatever the aspect ratio; it pauses off screen and stays
// still for people who prefer reduced motion.
const css = `
.pe * { transform-box: fill-box; }
.pe-paused * { animation-play-state: paused !important; }
.pe-ring { transform-origin: center; animation: pe-spin 40s linear infinite; }
.pe-drop { animation: pe-drop .8s cubic-bezier(.22, 1, .36, 1) both; }
.pe-shake { transform-origin: center; animation: pe-shake 4.6s ease-in-out 1.2s infinite; }
.pe-heart { transform-origin: center bottom; opacity: 0; animation: pe-heart 4.6s ease-out 1.2s infinite; }
.pe-draw path { stroke-dasharray: 100; stroke-dashoffset: 100; animation: pe-draw 1.4s cubic-bezier(.65, 0, .35, 1) .9s forwards; }
.pe-badge { transform-origin: center; animation: pe-pop .6s cubic-bezier(.34, 1.56, .64, 1) .6s both; }
.pe-twinkle { transform-origin: center; animation: pe-twinkle 2.8s ease-in-out infinite; }
.pe-float { animation: pe-float 5s ease-in-out infinite; }

@keyframes pe-spin { to { transform: rotate(360deg); } }
@keyframes pe-drop { from { opacity: 0; transform: translateY(-70px); } to { opacity: 1; transform: none; } }
@keyframes pe-shake {
  0%, 58%, 100% { transform: translateY(0) rotate(0); }
  62% { transform: translateY(-8px) rotate(-2deg); }
  66% { transform: translateY(6px) rotate(1.5deg); }
  70% { transform: translateY(-7px) rotate(-1.5deg); }
  74% { transform: translateY(4px) rotate(1deg); }
  78% { transform: translateY(0) rotate(0); }
}
@keyframes pe-heart {
  0%, 68% { opacity: 0; transform: translateY(12px) scale(.4); }
  76% { opacity: 1; transform: translateY(0) scale(1); }
  96% { opacity: 0; transform: translateY(-34px) scale(1.05); }
  100% { opacity: 0; }
}
@keyframes pe-draw { to { stroke-dashoffset: 0; } }
@keyframes pe-pop { from { opacity: 0; transform: scale(.6); } to { opacity: 1; transform: none; } }
@keyframes pe-twinkle { 0%, 100% { opacity: .25; transform: scale(.6); } 50% { opacity: 1; transform: scale(1); } }
@keyframes pe-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

@media (prefers-reduced-motion: reduce) {
  .pe, .pe * { animation: none !important; }
  .pe-heart { opacity: 0; }
  .pe-draw path { stroke-dashoffset: 0; }
}
`

const brand = '#0b5b4e'

// The PIAX lotus mark, centred on 0,0 (~40 wide).
function Lotus({ x, y, size = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} fill="none" stroke={brand} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 -15 C9 -7 9 6 0 13 C-9 6 -9 -7 0 -15 Z" />
      <path d="M0 -4 C4 0 3.5 6 0 10 C-2.5 6 -2.5 0 0 -4 Z" fill={brand} stroke="none" />
      <path d="M-5 13 C-15 11 -19 1 -17 -8 L-12 -6" />
      <path d="M5 13 C15 11 19 1 17 -8 L12 -6" />
    </g>
  )
}

// A PIAX box with a lighter top and a shaded side, front face `w` × `h`.
function Box({ x, y, w, h, depth = 14, delay, id }) {
  return (
    <g className="pe-drop" style={{ animationDelay: `${delay}s` }}>
      <path d={`M${x} ${y} l${depth} -${depth * 0.8} h${w} l-${depth} ${depth * 0.8} Z`} fill="#e2f4eb" />
      <path d={`M${x + w} ${y} l${depth} -${depth * 0.8} v${h} l-${depth} ${depth * 0.8} Z`} fill="#9fd3bd" />
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#${id}-box)`} />
      <Lotus x={x + w / 2 - 34} y={y + h / 2} size={h / 70} />
      <text x={x + w / 2 - 14} y={y + h / 2 + h * 0.15} fill={brand} fontFamily="inherit" fontSize={h * 0.42} fontWeight="800" letterSpacing="1.5">PIAX</text>
    </g>
  )
}

function Sparkle({ x, y, size = 1, delay = 0, color = '#f5b73b' }) {
  return (
    <path
      className="pe-twinkle"
      style={{ animationDelay: `${delay}s` }}
      transform={`translate(${x} ${y}) scale(${size})`}
      d="M0 -9 C1 -2 2 -1 9 0 C2 1 1 2 0 9 C-1 2 -2 1 -9 0 C-2 -1 -1 -2 0 -9 Z"
      fill={color}
    />
  )
}

export default function PartnershipEmblem({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const [ref, inView] = useInView({ once: false, threshold: 0.2 })

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${id}-title`}
      className={cn('pe', !inView && 'pe-paused', className)}
    >
      <title id={`${id}-title`}>Illustration: a handshake badge on top of a stack of PIAX pad boxes</title>
      <style>{css}</style>
      <defs>
        <radialGradient id={`${id}-disc`} cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfeadd" />
        </radialGradient>
        <linearGradient id={`${id}-box`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9ecdc" />
          <stop offset="1" stopColor="#b0dfca" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0f3c32" floodOpacity=".18" />
        </filter>
      </defs>

      {/* Backdrop disc and a slowly turning dashed ring */}
      <circle cx="200" cy="200" r="150" fill={`url(#${id}-disc)`} />
      <circle className="pe-ring" cx="200" cy="200" r="178" fill="none" stroke="#9fd3bd" strokeWidth="2" strokeDasharray="3 12" strokeLinecap="round" />
      <ellipse cx="200" cy="352" rx="120" ry="12" fill="#0f3c32" opacity=".08" />

      {/* Stack of PIAX boxes */}
      <g filter={`url(#${id}-shadow)`}>
        <Box id={id} x={98} y={290} w={190} h={58} delay={0.1} />
        <Box id={id} x={114} y={234} w={160} h={50} delay={0.35} />
      </g>

      {/* Lucide handshake in a badge resting on the stack: pops in, draws itself, then shakes now and then */}
      <g className="pe-badge">
        <g className="pe-shake" filter={`url(#${id}-shadow)`}>
          <circle cx="200" cy="170" r="58" fill="#fff" />
          <circle cx="200" cy="170" r="50" fill="#e6f4ed" />
          <Handshake x={158} y={128} width={84} height={84} color={brand} strokeWidth={1.6} absoluteStrokeWidth={false} className="pe-draw" aria-hidden="true" />
        </g>
      </g>
      <path className="pe-heart" d="M262 118 c-7 -10 -22 -5 -20 6 c2 9 20 18 20 18 s18 -9 20 -18 c2 -11 -13 -16 -20 -6 Z" fill="#e5577a" />

      {/* Sparkles */}
      <Sparkle x={104} y={118} size={1.6} delay={0} />
      <Sparkle x={300} y={112} size={1.2} delay={0.9} color="#3f9d7e" />
      <Sparkle x={316} y={262} size={1.5} delay={1.6} />
      <Sparkle x={86} y={256} size={1.1} delay={2.2} color="#3f9d7e" />

      {/* Partnership chip */}
      <g className="pe-float" filter={`url(#${id}-shadow)`}>
        <rect x="118" y="50" width="164" height="36" rx="18" fill="#fff" />
        <circle cx="138" cy="68" r="10" fill={brand} />
        <path d="M133.5 68 l3.3 3.3 l6 -6.6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="155" y="72.5" fill="#0f2622" fontFamily="inherit" fontSize="12.5" fontWeight="700">Partnership sealed</text>
      </g>
    </svg>
  )
}
