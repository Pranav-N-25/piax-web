import { useState } from 'react'
import { MapPin, Truck } from 'lucide-react'
import { btn, cn } from '../home/homeStyles.js'

// Delivery check on a product page. Validates the pincode; the delivery date itself is confirmed at checkout.
export default function Pincode() {
  const [pin, setPin] = useState('')
  const [result, setResult] = useState(null)
  const check = (event) => {
    event.preventDefault()
    setResult(/^[1-9]\d{5}$/.test(pin) ? { ok: true, text: `We’ll confirm delivery to ${pin} and show your delivery date at checkout.` } : { ok: false, text: 'Please enter a valid 6-digit pincode.' })
  }
  return (
    <form onSubmit={check} className="mt-4">
      <label htmlFor="pincode" className="flex items-center gap-2 text-[13px] font-semibold text-ink"><Truck size={17} className="text-brand" aria-hidden="true" /> Deliver to your pincode</label>
      <div className="mt-2 flex gap-2">
        <input id="pincode" inputMode="numeric" maxLength={6} value={pin} onChange={(event) => { setPin(event.target.value.replace(/\D/g, '')); setResult(null) }} placeholder="Enter pincode" aria-invalid={result?.ok === false} aria-describedby={result ? 'pincode-result' : undefined} className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-white px-4 text-[14px] outline-none focus:border-brand" />
        <button type="submit" className={cn(btn.base, btn.solid, 'min-h-11 px-5 text-[14px]')}>Check</button>
      </div>
      {result && <p id="pincode-result" role="status" className={cn('mt-2 flex items-start gap-1.5 text-[12.5px]', result.ok ? 'text-brand' : 'text-[#c23a55]')}>{result.ok && <MapPin size={14} className="mt-0.5 shrink-0" />}{result.text}</p>}
    </form>
  )
}
