import { useEffect, useId, useRef, useState } from 'react'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

// Header account control: opens the login popup when signed out; when signed in, shows the person's initial and
// a small menu with their details and Log out.
export default function AccountMenu() {
  const { currentUser, openAuth, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false) }
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!currentUser) {
    return (
      <button type="button" onClick={() => openAuth('login')} className="relative flex cursor-pointer flex-col items-center gap-0.5 text-[11px] text-ink hover:text-brand">
        <User size={24} strokeWidth={1.6} /><span className="max-md:sr-only">Log in</span>
      </button>
    )
  }

  const label = currentUser.name || currentUser.email || currentUser.phone || 'Your account'
  const initial = (currentUser.name || currentUser.email || 'P').trim()[0].toUpperCase()

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer flex-col items-center gap-0.5 text-[11px] text-ink hover:text-brand"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">{initial}</span>
        <span className="max-w-16 truncate max-md:sr-only">{currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}</span>
      </button>
      {open && (
        <div id={menuId} role="menu" className="motion-drop absolute top-full right-0 z-40 mt-3 w-60 rounded-2xl bg-white p-2 shadow-[0_18px_40px_-12px_rgba(15,60,50,.35)] ring-1 ring-line">
          <div className="px-3 py-2.5">
            <p className="truncate text-[14px] font-semibold text-ink">{label}</p>
            {currentUser.name && (currentUser.email || currentUser.phone) && <p className="truncate text-[12px] text-muted">{currentUser.email || currentUser.phone}</p>}
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => { setOpen(false); logout() }}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink hover:bg-mist"
          >
            <LogOut size={17} className="text-brand" /> Log out
          </button>
        </div>
      )}
    </div>
  )
}
