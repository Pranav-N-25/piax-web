import { CircleAlert, SearchX } from 'lucide-react'
import { button } from './productStyles.js'

function State({ icon: Icon, title, text, action, onAction, role }) {
  return (
    <div role={role} className="flex flex-col items-center rounded-2xl bg-foam px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-white text-leaf"><Icon size={26} strokeWidth={1.6} /></span>
      <h3 className="mt-5 text-lg font-semibold text-charcoal">{title}</h3>
      <p className="mt-2 max-w-[420px] text-sm text-stone">{text}</p>
      <button type="button" onClick={onAction} className={`${button.primary} mt-6`}>{action}</button>
    </div>
  )
}

export function ProductEmptyState({ onClear }) {
  return (
    <State
      icon={SearchX}
      title="No PIAX products match your current filters."
      text="Try removing a filter or two, or choose another category."
      action="Clear Filters"
      onAction={onClear}
      role="status"
    />
  )
}

export function ProductErrorState({ onRetry }) {
  return (
    <State
      icon={CircleAlert}
      title="We couldn’t load products right now."
      text="Please check your connection and try again."
      action="Try Again"
      onAction={onRetry}
      role="alert"
    />
  )
}
