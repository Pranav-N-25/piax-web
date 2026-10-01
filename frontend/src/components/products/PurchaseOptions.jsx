import { useEffect, useId, useState } from 'react'
import { ArrowRight, Check, RefreshCw, ShoppingBag, Sparkles } from 'lucide-react'
import { bestTerm, maxSubscribeDiscount, subscribePrice, subscription, termFor } from '../../data/piaxRange.js'
import { btn, cn } from '../home/homeStyles.js'

// Default purchase choice: a one-time buy, with the best-value (longest) subscription pre-selected for subscribing.
export const defaultPlan = { mode: 'once', months: bestTerm.months }

const option = (on) => cn(
  'relative block cursor-pointer rounded-2xl border bg-white px-4 py-3 transition-[border-color,box-shadow]',
  on ? 'border-brand bg-[#f2faf6] shadow-[0_0_0_3px_rgba(0,127,109,.12)]' : 'border-line hover:border-brand',
)
const radio = (on) => cn('flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors', on ? 'border-brand bg-brand text-white' : 'border-line bg-white')

// "Buy once" or "Subscribe & save": two radio cards. The page's own Add to cart always buys once; the subscribe card
// opens to pick how often it arrives and has its own Subscribe button, which calls `onSubscribe(months)`.
// `price` is the one-time price of one box; `plan` / `onChange` hold `{ mode, months }`. `disabledReason` turns the
// Subscribe button off and says why (an unfinished combo).
export default function PurchaseOptions({ price, plan, onChange, onSubscribe, disabledReason, className = '' }) {
  const name = useId()
  const titleId = useId()
  const [subscribed, setSubscribed] = useState(false)
  useEffect(() => {
    if (!subscribed) return undefined
    const timer = setTimeout(() => setSubscribed(false), 1800)
    return () => clearTimeout(timer)
  }, [subscribed])
  const subscribing = plan.mode === 'subscribe'
  const set = (next) => onChange({ ...plan, ...next })
  const subscribe = () => { onSubscribe(plan.months); setSubscribed(true) }
  const subPrice = subscribePrice(price, plan.months)
  // What each monthly box would save on the best (longest) subscription compared with the one chosen.
  const extraSaving = subPrice - subscribePrice(price, bestTerm.months)
  const term = termFor(plan.months)
  return (
    <div role="group" aria-labelledby={titleId} className={cn('grid gap-2.5', className)}>
      <p id={titleId} className="text-[13px] font-semibold text-ink">How would you like it?</p>

      <label className={option(!subscribing)}>
        <input type="radio" name={name} checked={!subscribing} onChange={() => set({ mode: 'once' })} className="sr-only" />
        <span className="flex items-center gap-3">
          <span className={radio(!subscribing)} aria-hidden="true">{!subscribing && <Check size={12} strokeWidth={3} />}</span>
          <ShoppingBag size={17} className="text-brand" aria-hidden="true" />
          <span className="flex-1 text-[14px] font-semibold text-ink">Buy once</span>
          <strong className="text-[15px] text-ink">₹{price}</strong>
        </span>
      </label>

      {/* Not chosen yet, the card breathes a soft green glow with a reflection sweeping across it, to invite a subscribe.
          Chosen, it pulses once and keeps a steady glow. */}
      <div className={cn(
        option(subscribing),
        subscribing
          ? 'shadow-[0_0_0_3px_rgba(0,127,109,.12),0_0_18px_rgba(0,160,130,.22)] motion-safe:animate-[subscribe-glow_.9s_ease-out]'
          : 'border-brand/50 bg-[linear-gradient(100deg,#fff_0%,#f0faf5_100%)] motion-safe:animate-[subscribe-attract_2.8s_ease-in-out_infinite]',
      )}>
        {!subscribing && <span aria-hidden="true" className="shine pointer-events-none absolute inset-0 rounded-[inherit]" />}
        <label className="flex cursor-pointer items-center gap-3">
          <input type="radio" name={name} checked={subscribing} onChange={() => set({ mode: 'subscribe' })} className="sr-only" />
          <span className={radio(subscribing)} aria-hidden="true">{subscribing && <Check size={12} strokeWidth={3} />}</span>
          <RefreshCw size={17} className="text-brand" aria-hidden="true" />
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[14px] font-semibold text-ink">Subscribe &amp; save</span>
            <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">{subscribing ? `${term.discountPercent}% OFF` : `Up to ${maxSubscribeDiscount}% OFF`}</span>
          </span>
          <span className="text-right leading-tight">
            <strong className="block text-[15px] text-ink">{!subscribing && <span className="text-[11px] font-medium text-muted">from </span>}₹{subPrice}</strong>
            <del className="text-[12px] text-muted">₹{price}</del>
          </span>
        </label>

        {subscribing && (
          <div className="motion-drop mt-3 border-t border-line pt-3">
            <p className="mb-2 text-[12.5px] font-semibold text-ink">Subscribe for <span className="font-normal text-muted">· a box every month</span></p>
            <div role="radiogroup" aria-label="Subscription length" className="grid grid-cols-3 gap-2 pt-2">
              {subscription.terms.map((item) => {
                const on = plan.months === item.months
                return (
                  <button
                    key={item.months}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => set({ months: item.months })}
                    className={cn(
                      'relative cursor-pointer rounded-xl border px-2 pt-2.5 pb-2 text-center transition-colors',
                      on ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand',
                      item.best && !on && 'border-[#e0a33a] bg-[#fff8ea]',
                    )}
                  >
                    {item.best && <span aria-hidden="true" className="shine absolute inset-0 rounded-[inherit]" />}
                    {item.best && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#e0a33a] px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-white">Best value</span>}
                    <span className="block text-[12.5px] font-semibold whitespace-nowrap">{item.label}</span>
                    <span className={cn('block text-[11px] font-semibold', on ? 'text-white/85' : 'text-brand')}>{item.discountPercent}% off</span>
                  </button>
                )
              })}
            </div>
            {extraSaving > 0 && (
              <button type="button" onClick={() => set({ months: bestTerm.months })} className="mt-2.5 flex w-full cursor-pointer items-center gap-2 rounded-xl bg-[#fff8ea] px-3 py-2 text-left text-[12px] text-ink transition-colors hover:bg-[#fff0d4]">
                <Sparkles size={14} className="shrink-0 text-[#c98a1e]" aria-hidden="true" />
                <span className="flex-1">Choose <strong>{bestTerm.label}</strong> and save <strong>₹{extraSaving} more</strong> on every box.</span>
                <ArrowRight size={14} className="shrink-0 text-[#c98a1e]" aria-hidden="true" />
              </button>
            )}
            <p className="mt-3 rounded-xl bg-white px-3 py-2 text-[12.5px] text-ink">
              <strong>₹{subPrice}</strong> a month × {term.deliveries} deliveries
              <span className="text-muted"> · you save ₹{(price - subPrice) * term.deliveries} over {term.label}</span>
            </p>
            <ul className="mt-3 grid gap-1 text-[12px] text-body">
              {subscription.perks.map((perk) => <li key={perk} className="flex items-center gap-1.5"><Check size={13} className="shrink-0 text-brand" aria-hidden="true" />{perk}</li>)}
            </ul>
            <button type="button" onClick={subscribe} disabled={Boolean(disabledReason)} className={cn(btn.base, btn.solid, 'shine relative mt-3 min-h-11 w-full text-[14px] shadow-[0_6px_20px_-8px_rgba(0,127,109,.6)] hover:shadow-[0_0_0_4px_rgba(0,160,130,.18),0_10px_26px_-8px_rgba(0,127,109,.65)]', subscribed && 'motion-safe:animate-[subscribe-burst_.7s_ease-out]')}>
              {subscribed ? <><Check size={16} /> Subscription added</> : <><RefreshCw size={16} /> Subscribe · ₹{subPrice}/month</>}
            </button>
            {disabledReason && <p className="mt-1.5 text-center text-[12px] text-[#b26b00]">{disabledReason}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
