import { useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, Check, Droplet, Lightbulb, Lock, Moon, Package, RotateCcw, Sparkles, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { colours, combo, comboItem, padById, pads, standardPack } from '../../data/piaxRange.js'
import { AddButton, DiscountTag, padItem, Price, tint } from '../products/RangeUi.jsx'
import { MixLegend } from '../products/ComboPack.jsx'
import { btn, cn, heading } from '../home/homeStyles.js'

// Three quick questions → a pad, as a full box or inside a combo. Flow maps to the usage guide (VERA light, LUMA regular,
// NOCTE heavy and nights, SEREN overnight); night use or long hours move one size longer.
const steps = [
  {
    id: 'flow', label: 'Flow', question: 'How would you describe your flow?', hint: 'This helps us suggest the right length for you.',
    options: [
      { value: 0, title: 'Light', text: 'Change every 6+ hours', drops: 1 },
      { value: 1, title: 'Medium', text: 'Change every 4–6 hours', drops: 2 },
      { value: 2, title: 'Heavy', text: 'Change every 2–3 hours', drops: 3 },
      { value: 3, title: 'Very heavy', text: 'Change every 1–2 hours', drops: 4 },
    ],
  },
  {
    id: 'usage', label: 'Usage', question: 'When will you wear it most?', hint: 'Lying down moves flow towards the back, so nights often need more length.',
    options: [
      { value: 'day', title: 'Daytime', text: 'Work, college, errands', icon: Sun },
      { value: 'night', title: 'Night', text: 'Long, restful sleep', icon: Moon },
      { value: 'long', title: 'Long hours', text: 'Few chances to change', icon: Calendar },
    ],
  },
  {
    id: 'pack', label: 'Preference', question: 'How would you like to buy?', hint: 'Each size comes in its own box, or mix sizes in the Cycle Pack.',
    options: [
      { value: 'box', title: 'One size', text: 'A full box of your match', icon: Package },
      { value: 'combo', title: 'Mix sizes', text: `${combo.count}-pad Cycle Pack · ₹${combo.price}`, icon: Sparkles },
    ],
  },
]

const order = pads.map((pad) => pad.id)

// With `combo`, the match fills two-thirds of the box and the next size up (for heavier days and nights) the rest.
export function recommendFit({ flow, usage, pack }) {
  const index = Math.min(order.length - 1, flow + (usage === 'day' ? 0 : 1))
  const pad = padById[order[index]]
  if (pack !== 'combo') return { pad, pack: standardPack(pad) }
  const partner = order[index + 1] ?? order[index - 1]
  const mix = Object.fromEntries(order.map((id) => [id, 0]))
  mix[pad.id] = combo.count - 4
  mix[partner] = 4
  return { pad, pack: combo, mix }
}

function Drops({ count }) {
  return (
    <span className="flex h-8 items-end justify-center gap-0.5" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => <Droplet key={index} size={index % 2 ? 18 : 22} className="fill-current text-brand" />)}
    </span>
  )
}

// Inline in "Find Your PIAX" and inside the quiz popup. `onClose` (popup only) shows a link to keep shopping.
export default function FitQuiz({ onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const done = step === steps.length
  const current = steps[step]
  const chosen = current && answers[current.id]

  const choose = (value) => setAnswers((all) => ({ ...all, [current.id]: value }))
  const restart = () => { setAnswers({}); setStep(0) }

  return (
    <div>
      {/* Progress: Flow — Usage — Preference — Your match */}
      <ol className="flex items-center gap-2 text-[13px]" aria-label="Quiz progress">
        {[...steps.map((item) => item.label), 'Your match'].map((label, index) => (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none" aria-current={index === step ? 'step' : undefined}>
            <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition-colors', index < step ? 'bg-brand text-white' : index === step ? 'bg-brand text-white ring-4 ring-brand-soft' : 'bg-[#eef5f1] text-muted')}>
              {index < step ? <Check size={15} /> : index + 1}
            </span>
            <span className={cn('whitespace-nowrap max-sm:sr-only', index === step ? 'font-semibold text-ink' : 'text-muted')}>{label}</span>
            {index < steps.length && <span aria-hidden="true" className={cn('h-px min-w-4 flex-1', index < step ? 'bg-brand' : 'bg-line')} />}
          </li>
        ))}
      </ol>

      {!done ? (
        <div key={current.id} className="motion-drop mt-7">
          <h3 className={cn(heading, 'text-[clamp(22px,2.2vw,28px)]')}>{current.question}</h3>
          <p className="mt-1.5 text-[14px] text-muted">{current.hint}</p>
          <div role="radiogroup" aria-label={current.question} className={cn('mt-5 grid gap-3', current.options.length === 4 ? 'grid-cols-2 md:grid-cols-4' : current.options.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
            {current.options.map((option) => {
              const on = chosen === option.value
              const Icon = option.icon
              return (
                <button
                  key={option.title}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => choose(option.value)}
                  className={cn('relative flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border bg-white px-3 py-5 text-center transition-[border-color,box-shadow,transform] hover:-translate-y-0.5', on ? 'border-brand bg-[#eef8f3] shadow-[0_0_0_3px_rgba(0,127,109,.12)]' : 'border-line hover:border-brand')}
                >
                  {on && <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand text-white"><Check size={14} /></span>}
                  {option.drops ? <Drops count={option.drops} /> : <Icon size={26} strokeWidth={1.6} className="text-brand" aria-hidden="true" />}
                  <strong className="mt-1 text-[15px] text-ink">{option.title}</strong>
                  <span className="text-[12.5px] text-muted">{option.text}</span>
                </button>
              )
            })}
          </div>
          {step === 0 && (
            <p className="mt-4 flex items-start gap-3 rounded-2xl bg-[#eef5f1] p-4 text-[13px] text-body">
              <Lightbulb size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              Not sure? Pick your heaviest day. Most people’s flow changes during their cycle, so many keep two sizes at home.
            </p>
          )}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button type="button" onClick={() => setStep((value) => value - 1)} disabled={step === 0} className={cn(btn.base, btn.outline, 'min-w-[180px] disabled:invisible max-sm:min-w-0 max-sm:flex-1')}><ArrowLeft size={18} /> Back</button>
            <button type="button" onClick={() => setStep((value) => value + 1)} disabled={chosen === undefined} className={cn(btn.base, btn.solid, 'min-w-[180px] max-sm:min-w-0 max-sm:flex-1')}>{step === steps.length - 1 ? 'See my match' : 'Next'} <ArrowRight size={18} /></button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-muted"><Lock size={13} aria-hidden="true" /> Your answers stay on this device.</p>
        </div>
      ) : (
        <Result {...recommendFit(answers)} onRestart={restart} onClose={onClose} />
      )}
    </div>
  )
}

function Result({ pad, pack, mix, onRestart, onClose }) {
  const { hex } = colours[pad.colour]
  return (
    <div className="motion-drop mt-7 grid items-center gap-6 rounded-[22px] bg-white p-5 shadow-soft sm:grid-cols-[200px_1fr] sm:p-6">
      <div className="relative rounded-2xl p-3" style={tint(hex)}>
        <DiscountTag pack={pack} className="absolute top-2 right-2" />
        <img src={pack.image} alt={mix ? combo.name : `${pad.name} box`} className="aspect-[820/720] w-full object-contain" />
      </div>
      <div>
        <p className="text-[12px] font-semibold tracking-[.16em] text-brand uppercase">Your PIAX match</p>
        <h3 className={cn(heading, 'mt-1 text-[24px]')}>{pad.name} <span className="font-medium text-muted">· {pad.variant}</span></h3>
        <p className="mt-1 text-[13.5px]">{pad.size} · {pad.lengthLabel} · {pad.flow}. {mix ? `In a ${combo.count}-pad Cycle Pack with the next size up:` : `${pack.count} pads per box.`}</p>
        {mix && <MixLegend mix={mix} className="mt-2" />}
        <div className="mt-3"><Price pack={pack} /></div>
        {/* Three equal buttons: they share one row on wider screens and stack, full width, on phones. */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          <AddButton item={mix ? comboItem(mix) : padItem(pad, pack)} className="min-h-11" />
          <Link to={mix ? combo.path : `/products/${pad.id}`} onClick={onClose} className={cn(btn.base, btn.outline, btn.small, 'min-h-11 w-full')}>View product</Link>
          <button type="button" onClick={onRestart} className={cn(btn.base, btn.outline, btn.small, 'min-h-11 w-full')}><RotateCcw size={15} /> Start again</button>
        </div>
        <p className="mt-3 text-[12px] text-muted">A suggestion based on your answers, not medical advice. Length is about coverage; choose what feels comfortable.</p>
      </div>
    </div>
  )
}
