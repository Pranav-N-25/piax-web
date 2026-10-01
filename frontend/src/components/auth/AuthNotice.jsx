import { useEffect } from 'react'
import { CircleAlert, CircleCheck, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { cn } from '../common/ui.js'

// Short confirmation after signing in or out (or a problem coming back from social sign-in). Hides after 5 seconds.
export default function AuthNotice() {
  const { notice, clearNotice } = useAuth()

  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(clearNotice, 5000)
    return () => clearTimeout(timer)
  }, [notice, clearNotice])

  if (!notice) return null
  const error = notice.tone === 'error'
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4 font-poppins">
      <p
        role={error ? 'alert' : 'status'}
        className={cn('motion-drop pointer-events-auto flex items-center gap-2.5 rounded-full py-2.5 pr-2 pl-4 text-[14px] font-medium shadow-[0_14px_36px_-10px_rgba(15,60,50,.4)]', error ? 'bg-[#fdecef] text-[#a52d47]' : 'bg-[#0c4a40] text-white')}
      >
        {error ? <CircleAlert size={18} /> : <CircleCheck size={18} className="text-[#bfe8d5]" />}
        {notice.text}
        <button type="button" onClick={clearNotice} aria-label="Dismiss" className="flex size-7 cursor-pointer items-center justify-center rounded-full hover:bg-white/15"><X size={15} /></button>
      </p>
    </div>
  )
}
