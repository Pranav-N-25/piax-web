import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from './ui.js'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const panels = {
  modal: 'm-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[560px] rounded-3xl',
  sheet: 'mt-auto max-h-[88dvh] w-full rounded-t-3xl md:m-auto md:max-h-[calc(100dvh-48px)] md:max-w-[520px] md:rounded-3xl',
  drawer: 'ml-auto h-full w-[min(360px,88vw)] rounded-l-3xl',
  search: 'h-full w-full md:mx-auto md:mt-20 md:h-auto md:max-h-[calc(100dvh-160px)] md:w-[calc(100%-48px)] md:max-w-[640px] md:rounded-3xl',
}

// Accessible dialog: portal, focus trap, Escape to close, scroll lock and focus restore.
// `bare` drops the standard header and body padding for custom layouts: the title stays for screen readers and a
// floating close button is kept.
export default function Dialog({ open, onClose, title, description, variant = 'modal', className = '', children, footer, bare = false }) {
  const panelRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const onCloseRef = useRef(onClose)

  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (!open) return undefined
    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    const first = panel?.querySelector('[data-autofocus]') || panel?.querySelector(FOCUSABLE)
    first?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const focusable = [...panel.querySelectorAll(FOCUSABLE)].filter((node) => node.offsetParent !== null)
      if (focusable.length === 0) return
      const [firstNode, lastNode] = [focusable[0], focusable[focusable.length - 1]]
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault()
        lastNode.focus()
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault()
        firstNode.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex bg-[rgba(12,40,34,.45)] font-poppins" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn('relative flex flex-col overflow-hidden bg-white text-charcoal shadow-[0_24px_60px_rgba(12,40,34,.25)]', panels[variant], className)}
      >
        {bare ? (
          <>
            <h2 id={titleId} className="sr-only">{title}</h2>
            {description && <p id={descriptionId} className="sr-only">{description}</p>}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-charcoal shadow-soft backdrop-blur transition-transform hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf motion-reduce:transition-none"
            >
              <X size={18} />
            </button>
            <div className="flex min-h-0 flex-1 overflow-y-auto">{children}</div>
          </>
        ) : (
          <>
          <header className="flex items-start justify-between gap-4 border-b border-rule px-6 pt-6 pb-4">
            <div>
              <h2 id={titleId} className="text-lg font-semibold text-charcoal">{title}</h2>
              {description && <p id={descriptionId} className="mt-1 text-sm text-stone">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foam text-charcoal hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
            >
              <X size={18} />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </>
        )}
        {footer && <footer className="border-t border-rule px-6 py-4">{footer}</footer>}
      </section>
    </div>,
    document.body,
  )
}
