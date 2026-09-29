import { useEffect } from 'react'
import { CircleCheck, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { focusRing } from './productStyles.js'

// Small confirmation after adding to cart; the user stays on the page.
export default function CartToast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined
    const timer = setTimeout(onDismiss, 3500)
    return () => clearTimeout(timer)
  }, [message, onDismiss])

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex justify-center md:bottom-6">
      {message && (
        <div className="pointer-events-auto flex w-full max-w-[420px] items-center gap-3 rounded-2xl bg-charcoal px-4 py-3 text-sm text-white shadow-[0_16px_40px_rgba(0,0,0,.25)]">
          <CircleCheck size={20} className="shrink-0 text-sage" />
          <p className="min-w-0 flex-1">{message}</p>
          <Link to="/cart" className={`shrink-0 rounded font-semibold text-sage hover:underline ${focusRing}`}>View cart</Link>
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className={`flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-white/10 ${focusRing}`}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
