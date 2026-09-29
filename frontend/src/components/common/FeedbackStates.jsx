import { Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { button, cn, ui } from './ui.js'

const centered = 'flex min-h-[370px] flex-col items-center justify-center text-center'
const title = 'mt-4 mb-1.5 font-playfair text-[39px] font-medium leading-[1.02] tracking-[-.045em]'

export function EmptyState({ title: heading, text = 'Try another path through the PIAX experience.', action, to }) {
  return <div className={centered}>
    <Heart size={26} className="text-leaf" />
    <h2 className={title}>{heading}</h2>
    <p className="mb-4 text-stone">{text}</p>
    {action && <Link className={cn(button.base, button.outline)} to={to}>{action}<ArrowRight size={16} /></Link>}
  </div>
}

export function Loading() {
  return <div className={centered}>
    <div className="size-[31px] rounded-full border-3 border-mint border-t-leaf" />
    <p className="mb-4 text-stone">Making space for you...</p>
  </div>
}

export function NotFound() {
  return <div className={cn(ui.page, centered)}>
    <span className={ui.eyebrow}>404 · page not found</span>
    <h1 className={title}>This page took<br /><em className={ui.accent}>a different route.</em></h1>
    <Link className={cn(button.base, button.primary)} to="/">Back to PIAX <ArrowRight size={17} /></Link>
  </div>
}
