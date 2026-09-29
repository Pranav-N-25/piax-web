import { useId, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import Dialog from '../common/Dialog.jsx'
import { money } from '../../utils/formatters.js'
import { button, choice, focusRing } from './productStyles.js'

const STORAGE_KEY = 'piax-subscriptions'

function saveSubscription(subscription) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, subscription]))
  } catch {
    // Demo only: ignore storage failures.
  }
}

export default function SubscriptionModal({ open, onClose, products, options }) {
  const eligible = products.filter((product) => product.subscriptionEligible)
  const [productId, setProductId] = useState('')
  const [frequency, setFrequency] = useState('4w')
  const [packs, setPacks] = useState(1)
  const [confirmed, setConfirmed] = useState(null)
  const selectId = useId()

  if (!options) return null
  const product = eligible.find((item) => item.id === productId) ?? eligible[0]
  const regular = product ? product.price * packs : 0
  const discounted = Math.round(regular * (1 - options.discountPercent / 100))
  const frequencyLabel = options.frequencies.find((option) => option.value === frequency)?.label

  const close = () => {
    onClose()
    setConfirmed(null)
  }

  const subscribe = (event) => {
    event.preventDefault()
    const subscription = { productId: product.id, name: product.name, frequency: frequencyLabel, packs, price: discounted, createdAt: new Date().toISOString() }
    saveSubscription(subscription)
    setConfirmed(subscription)
  }

  return (
    <Dialog open={open} onClose={close} title="Subscribe & Save" description={confirmed ? undefined : `Save ${options.discountPercent}% on regular deliveries. Pause or cancel anytime.`}>
      {confirmed ? (
        <div className="flex flex-col items-center py-4 text-center" role="status">
          <CircleCheck size={44} strokeWidth={1.5} className="text-leaf" />
          <h3 className="mt-4 text-lg font-semibold text-charcoal">You’re subscribed!</h3>
          <p className="mt-2 max-w-[380px] text-sm text-stone">
            {confirmed.packs} × {confirmed.name}, {confirmed.frequency.toLowerCase()} for {money(confirmed.price)} per delivery.
          </p>
          <p className="mt-1 text-xs text-stone">This is a demo — no payment has been taken.</p>
          <button type="button" onClick={close} className={`${button.primary} mt-6`}>Done</button>
        </div>
      ) : (
        <form onSubmit={subscribe} className="grid gap-6">
          <div>
            <label htmlFor={selectId} className="mb-3 block text-sm font-semibold text-charcoal">Product</label>
            <select
              id={selectId}
              value={product?.id}
              onChange={(event) => setProductId(event.target.value)}
              className={`h-12 w-full cursor-pointer rounded-xl border border-rule bg-white px-4 text-sm text-charcoal ${focusRing}`}
            >
              {eligible.map((item) => <option key={item.id} value={item.id}>{item.name} — {item.subtitle}</option>)}
            </select>
          </div>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-charcoal">Delivery frequency</legend>
            <div className="flex flex-wrap gap-2">
              {options.frequencies.map((option) => (
                <button key={option.value} type="button" aria-pressed={frequency === option.value} onClick={() => setFrequency(option.value)} className={choice(frequency === option.value)}>
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-charcoal">Packs per delivery</legend>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((count) => (
                <button key={count} type="button" aria-pressed={packs === count} onClick={() => setPacks(count)} className={`${choice(packs === count)} min-w-12`}>
                  {count}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-foam p-4">
            <p className="text-sm text-stone">
              Per delivery
              <span className="flex items-baseline gap-2">
                <strong className="text-xl font-semibold text-charcoal">{money(discounted)}</strong>
                {discounted < regular && <del className="text-sm">{money(regular)}</del>}
              </span>
            </p>
            <button type="submit" className={button.primary}>Start subscription</button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
