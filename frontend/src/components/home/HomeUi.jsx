import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { btn, cn, h2, roundArrow, sectionHead } from './homeStyles.js'
import leafClusterLeft from '../../assets/home/leaves/cluster-bottom-left.svg'
import leafClusterRight from '../../assets/home/leaves/cluster-bottom-right.svg'
import leafSprigArch from '../../assets/home/leaves/sprig-arch.svg'
import leafSprigRound from '../../assets/home/leaves/sprig-round.svg'
import leafTwigLeft from '../../assets/home/leaves/twig-left.svg'
import leafTwigRight from '../../assets/home/leaves/twig-right.svg'
import leafBroad from '../../assets/home/leaves/leaf-broad.svg'
import leafShadowFrond from '../../assets/home/leaves/shadow-frond.svg'
import leafShadowLeaves from '../../assets/home/leaves/shadow-leaves.svg'

export function Tag({ children, className = '' }) {
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] text-brand', className)}>
      {children}
    </span>
  )
}

// Hand-drawn doodles in the PIAX style: a handwriting font with a sketched heart. All decorative: hidden from assistive tech
// and never interactive. Callers decide placement and breakpoints.
const ink = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

export function DoodleHeart({ className = '' }) {
  return (
    <svg viewBox="0 0 40 36" aria-hidden="true" className={cn('inline-block h-[.8em] w-auto align-[-.05em]', className)}>
      <path {...ink} strokeWidth="3.4" d="M20 33C12 26 3 19 3.5 10.5 4 4.5 10 1.5 14.5 4.5 17.5 6.5 19 9.5 20 12 21.5 7.5 25 2.5 30.5 3 36 3.5 38 9.5 36 15 33.5 21.5 26 27.5 20 33Z" />
    </svg>
  )
}

// Hand-drawn arrow with a small loop, drawn heading down-right; `arrowTurn` re-aims it. Sideways arrows
// sit after the text, downward ones hang below it.
const arrowTurn = {
  right: 'ml-2 inline-block -rotate-[38deg] align-middle',
  left: 'mr-2 inline-block -scale-x-100 -rotate-[38deg] align-middle',
  'down-right': 'mt-1 ml-[35%] block',
  'down-left': 'mt-1 ml-[20%] block -scale-x-100',
  up: 'mr-1 inline-block -scale-y-100 -rotate-[62deg] align-middle',
}

// Three short hand-drawn strokes fanning out, like a "sparkle" tick mark; rotate to aim it.
export function DoodleBurst({ className = '' }) {
  return (
    <svg viewBox="0 0 40 30" aria-hidden="true" className={cn('pointer-events-none h-auto w-8 overflow-visible text-brand', className)}>
      <path {...ink} strokeWidth="2.6" d="M6 26 3 14M20 24V8M34 26l4-12" />
    </svg>
  )
}

export function DoodleArrow({ direction = 'right', className = '' }) {
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className={cn('h-auto w-[2.2em] overflow-visible', arrowTurn[direction], className)}>
      <path {...ink} strokeWidth="3" d="M5 9C22 3 40 6 48 18c5 8 0 15-6 12-6-3-2-13 8-11 11 2 17 13 20 28" />
      <path {...ink} strokeWidth="3" d="M60 40l10 8 5-13" />
    </svg>
  )
}

export function DoodleNote({ children, className = '', heart = true, inline = false, arrow }) {
  return (
    <p aria-hidden="true" className={cn('pointer-events-none z-0 m-0 -rotate-6 font-doodle text-[22px] leading-[1.1] font-semibold whitespace-nowrap text-brand select-none', inline ? 'relative' : 'absolute', className)}>
      {(arrow === 'left' || arrow === 'up') && <DoodleArrow direction={arrow} />}
      {children}
      {heart && <DoodleHeart className="ml-2" />}
      {arrow && arrow !== 'left' && arrow !== 'up' && <DoodleArrow direction={arrow} />}
    </p>
  )
}

// PIAX botanical set (generated artwork in assets/home/leaves): sage sprigs, thin twigs, one broad
// leaf, soft frond shadows and two corner clusters. Each piece's stem enters from one edge of its
// artwork, so place it against a section or viewport edge and let the page crop it. Render it
// before the section's container so all content paints above it.
const foliage = {
  clusterLeft: leafClusterLeft,
  clusterRight: leafClusterRight,
  sprigArch: leafSprigArch,
  sprigRound: leafSprigRound,
  twigLeft: leafTwigLeft,
  twigRight: leafTwigRight,
  broad: leafBroad,
  shadowFrond: leafShadowFrond,
  shadowLeaves: leafShadowLeaves,
}

export function Foliage({ art, className = '' }) {
  return (
    <img
      src={foliage[art]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn('pointer-events-none absolute z-0 h-auto max-w-none select-none', className)}
    />
  )
}

export function PillLink({ to, children, variant = 'solid', className = '' }) {
  return (
    <Link className={cn(btn.base, btn[variant], className)} to={to}>
      {children}
      <ArrowRight size={18} />
    </Link>
  )
}

export function RoundArrow({ to = '/products', label, className = 'bg-brand-soft' }) {
  return (
    <Link className={cn(roundArrow, className)} to={to} aria-label={label}>
      <ArrowRight size={18} />
    </Link>
  )
}

export function Divider({ children = 'Care for a brighter you' }) {
  return (
    <div className="mt-10 flex items-center justify-center gap-6" aria-hidden="true">
      <span className="h-px w-[min(200px,22vw)] bg-[#c8d9d1]" />
      <em className="text-[10px] not-italic uppercase tracking-[.38em] text-[#8a9c97]">{children}</em>
      <span className="h-px w-[min(200px,22vw)] bg-[#c8d9d1]" />
    </div>
  )
}

export function Stars({ size = 16 }) {
  return (
    <span className="inline-flex gap-0.5 leading-none tracking-normal text-[#f5a524]" aria-label="5 out of 5 stars">
      {'★★★★★'.split('').map((star, index) => <span key={index} style={{ fontSize: size }}>{star}</span>)}
    </span>
  )
}

export function CenterHead({ tag, title, text, className = '', children }) {
  return (
    <div className={cn('relative text-center', sectionHead, className)}>
      <Tag>{tag}</Tag>
      <h2 className={cn(h2, 'mt-4 mb-4')}>{title}</h2>
      {text && <p className="m-0 text-[17px] text-body">{text}</p>}
      {children}
    </div>
  )
}
