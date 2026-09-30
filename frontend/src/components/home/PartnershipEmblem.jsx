import { useId } from 'react'
import { Handshake } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { cn } from './homeStyles.js'

// Partnership emblem: the Lucide handshake in a badge resting on a stack of PIAX boxes, in front of a
// partner's corporate campus — a partnership built on the product. Motion tells the story: the office
// towers rise, the boxes land, the handshake draws itself in, then gives a periodic shake with a heart
// rising from it; office panes light up, a sheen crosses the glass, the rooftop beacon blinks, the flag waves, sparkles twinkle
// and a dashed ring turns slowly. The
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
.pe-rise { transform-origin: center bottom; animation: pe-rise .9s cubic-bezier(.22, 1, .36, 1) both; }
.pe-pane { opacity: 0; animation: pe-pane 4.2s ease-in-out infinite; }
.pe-sheen { animation: pe-sheen 6s ease-in-out infinite; }
.pe-beacon { transform-origin: center; animation: pe-beacon 1.6s ease-in-out infinite; }
.pe-flag { transform-origin: left center; animation: pe-flag 1.8s ease-in-out infinite; }
.pe-cloud { animation: pe-cloud 14s ease-in-out infinite; }

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
@keyframes pe-rise { from { opacity: 0; transform: scaleY(.35); } to { opacity: 1; transform: none; } }
@keyframes pe-pane { 0%, 30%, 100% { opacity: 0; } 45%, 85% { opacity: .9; } }
@keyframes pe-sheen { 0%, 55% { transform: translateX(0); opacity: 0; } 60% { opacity: .45; } 85% { opacity: .45; } 100% { transform: translateX(140px); opacity: 0; } }
@keyframes pe-beacon { 0%, 100% { opacity: .25; transform: scale(.7); } 50% { opacity: 1; transform: scale(1.15); } }
@keyframes pe-flag { 0%, 100% { transform: skewY(0) scaleX(1); } 50% { transform: skewY(-8deg) scaleX(.9); } }
@keyframes pe-cloud { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(26px); } }

@media (prefers-reduced-motion: reduce) {
  .pe, .pe * { animation: none !important; }
  .pe-heart { opacity: 0; }
  .pe-draw path { stroke-dashoffset: 0; }
  .pe-beacon { opacity: 1; }
  .pe-sheen { opacity: 0; }
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

// A partner's glass office block: a curtain wall of ribbon windows split by thin mullions, pale floor
// bands between floors, a shaded side and a sheen that sweeps across the glass now and then. `lit`
// picks panes that glow warm (people at work); `delay` staggers the rise.
function Office({ id, x, top, w, bottom = 344, delay = 0, lit = () => false, sheen = 0, children }) {
  const depth = 10
  const floor = 15
  const floors = Math.floor((bottom - top - 6) / floor)
  const panes = Math.max(3, Math.round(w / 12))
  const paneW = (w - 6) / panes
  const clip = `${id}-office-${x}`
  return (
    <g className="pe-rise" style={{ animationDelay: `${delay}s` }}>
      <defs>
        <clipPath id={clip}><rect x={x} y={top} width={w} height={bottom - top} /></clipPath>
      </defs>
      <path d={`M${x + w} ${top} l${depth} -${depth * 0.8} V${bottom} h-${depth} Z`} fill="#8cc4b3" />
      <path d={`M${x} ${top} l${depth} -${depth * 0.8} h${w} l-${depth} ${depth * 0.8} Z`} fill="#eef9f4" />
      <rect x={x} y={top} width={w} height={bottom - top} fill="#e4f3ec" />
      <g clipPath={`url(#${clip})`}>
        {Array.from({ length: floors }, (_, row) => {
          const y = top + 5 + row * floor
          return (
            <g key={row}>
              <rect x={x + 3} y={y} width={w - 6} height="10" fill={`url(#${id}-glass)`} />
              {Array.from({ length: panes }, (_, col) => (lit(row, col) ? (
                <rect
                  key={col}
                  className="pe-pane"
                  style={{ animationDelay: `${((row * 3 + col * 5) % 11) * 0.37}s` }}
                  x={x + 3 + col * paneW + 0.6}
                  y={y + 0.6}
                  width={paneW - 1.2}
                  height="8.8"
                  fill="#fbd78e"
                />
              ) : null))}
              {Array.from({ length: panes - 1 }, (_, col) => (
                <line key={col} x1={x + 3 + (col + 1) * paneW} y1={y} x2={x + 3 + (col + 1) * paneW} y2={y + 10} stroke="#e4f3ec" strokeWidth="1.1" />
              ))}
            </g>
          )
        })}
        {/* Sheen sweeping across the glass */}
        <path className="pe-sheen" style={{ animationDelay: `${sheen}s` }} d={`M${x - 40} ${bottom} L${x - 10} ${top} h14 L${x - 26} ${bottom} Z`} fill="#fff" opacity=".45" />
      </g>
      {children}
    </g>
  )
}

// A small corporate logo plate for the HQ crown.
function LogoSign({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="30" height="12" rx="3" fill="#fff" />
      <rect x={x + 5} y={y + 6} width="2.6" height="3.5" rx=".6" fill={brand} />
      <rect x={x + 9} y={y + 4} width="2.6" height="5.5" rx=".6" fill={brand} />
      <rect x={x + 13} y={y + 2.4} width="2.6" height="7.1" rx=".6" fill={brand} />
      <rect x={x + 18} y={y + 4.6} width="8" height="2.2" rx="1.1" fill="#8cc4b3" />
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
      <title id={`${id}-title`}>Illustration: a handshake badge on a stack of PIAX pad boxes in front of a partner company’s office towers</title>
      <style>{css}</style>
      <defs>
        <radialGradient id={`${id}-disc`} cx="50%" cy="42%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfeadd" />
        </radialGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b5dcd6" />
          <stop offset=".55" stopColor="#8fc9c0" />
          <stop offset="1" stopColor="#a9d6cc" />
        </linearGradient>
        <clipPath id={`${id}-scene`}>
          <circle cx="200" cy="200" r="150" />
          <rect x="40" y="200" width="320" height="152" />
        </clipPath>
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

      {/* The partner's corporate campus, framed by the disc: a tall HQ tower with a flag and a lower
          tower with a blinking rooftop beacon, behind the stack of boxes. */}
      <g clipPath={`url(#${id}-scene)`}>
        <g className="pe-cloud" fill="#fff" opacity=".9">
          <path d="M152 96 a10 10 0 0 1 19 -4 a13 13 0 0 1 24 6 a8 8 0 0 1 -2 16 h-38 a9 9 0 0 1 -3 -18 Z" />
        </g>
        {/* HQ: glass tower with a setback crown carrying the company's logo sign */}
        <Office id={id} x={80} top={112} w={66} delay={0} sheen={0} lit={(row, col) => (row * 7 + col * 3) % 9 === 0}>
          <rect x={90} y={92} width={46} height={20} fill="#d9eee5" />
          <path d="M136 92 l7 -5.6 V112 h-7 Z" fill="#8cc4b3" />
          <path d="M90 92 l7 -5.6 h46 l-7 5.6 Z" fill="#eef9f4" />
          <LogoSign x={98} y={96} />
        </Office>
        {/* A stepped office block: a slimmer upper tier on a wider base, rooftop plant and a beacon */}
        <Office id={id} x={264} top={152} w={46} bottom={200} delay={0.12} sheen={1.4} lit={(row, col) => (row + col) % 4 === 1}>
          <rect x={270} y={144} width={12} height={8} rx="1" fill="#cfe7dc" />
          <rect x={285} y={146} width={9} height={6} rx="1" fill="#cfe7dc" />
          <line x1="301" y1="152" x2="301" y2="126" stroke="#5f9f89" strokeWidth="2" strokeLinecap="round" />
          <circle className="pe-beacon" cx="301" cy="123" r="3.5" fill="#e5577a" />
        </Office>
        <Office id={id} x={252} top={198} w={70} delay={0.18} sheen={2.2} lit={(row, col) => (row * 5 + col * 4) % 7 === 0} />
      </g>
      {/* The HQ flag rises with its tower but sits above the disc, so it is drawn outside the frame. */}
      <g className="pe-rise">
        <line x1="94" y1="88" x2="94" y2="58" stroke="#5f9f89" strokeWidth="2" strokeLinecap="round" />
        <path className="pe-flag" d="M95 59 h20 l-5 6 l5 6 h-20 Z" fill={brand} />
      </g>

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
      <Sparkle x={52} y={132} size={1.5} delay={0} />
      <Sparkle x={330} y={96} size={1.2} delay={0.9} color="#3f9d7e" />
      <Sparkle x={352} y={250} size={1.5} delay={1.6} />
      <Sparkle x={46} y={286} size={1.1} delay={2.2} color="#3f9d7e" />

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
