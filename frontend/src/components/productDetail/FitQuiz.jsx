import { useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, Check, Droplet, Lightbulb, Lock, Moon, Package, RotateCcw, Sparkles, Sun, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { colours, padById, pads } from '../../data/piaxRange.js'
import { AddButton, DiscountTag, padItem, Price, tint } from '../products/RangeUi.jsx'
import { btn, cn, heading } from '../home/homeStyles.js'

// Four quick questions → a pad and a pack size. Flow maps to the report's usage guide (LUMA light, VERA regular,
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
    id: 'pack', label: 'Preference', question: 'How would you like to buy?', hint: 'Every size comes in three pack sizes.',
    options: [
      { value: 'trial', title: 'Try it first', text: '4-pad Trial Pack', icon: Sparkles },
      { value: 'standard', title: 'Everyday pack', text: '10-pad Standard Pack', icon: Package },
      { value: 'value', title: 'Best value', text: '30-pad Value Pack', icon: Wallet },
    ],
  },
]

const order = pads.map((pad) => pad.id)

export function recommendFit({ flow, usage, pack }) {
  const index = Math.min(order.length - 1, flow + (usage === 'day' ? 0 : 1))
  const pad = padById[order[index]]
  return { pad, pack: pad.packs.find((item) => item.format === pack) ?? pad.packs[1] }
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
          <div role="radiogroup" aria-label={current.question} className={cn('mt-5 grid gap-3', current.options.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-3')}>
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
            <button type="button" onClick={() => setStep((value) => value - 1)} disabled={step === 0} className="inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-semibold text-brand disabled:invisible"><ArrowLeft size={16} /> Back</button>
            <button type="button" onClick={() => setStep((value) => value + 1)} disabled={chosen === undefined} className={cn(btn.base, btn.solid, 'min-w-[180px]')}>{step === steps.length - 1 ? 'See my match' : 'Next'} <ArrowRight size={18} /></button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-muted"><Lock size={13} aria-hidden="true" /> Your answers stay on this device.</p>
        </div>
      ) : (
        <Result {...recommendFit(answers)} onRestart={restart} onClose={onClose} />
      )}
    </div>
  )
}

function Result({ pad, pack, onRestart, onClose }) {
  const { hex } = colours[pad.colour]
  return (
    <div className="motion-drop mt-7 grid items-center gap-6 rounded-[22px] bg-white p-5 shadow-soft sm:grid-cols-[200px_1fr] sm:p-6">
      <div className="relative rounded-2xl p-3" style={tint(hex)}>
        <DiscountTag pack={pack} className="absolute top-2 right-2" />
        <img src={pack.image} alt={`${pad.name} ${pack.formatName}`} className="aspect-[820/720] w-full object-contain" />
      </div>
      <div>
        <p className="text-[12px] font-semibold tracking-[.16em] text-brand uppercase">Your PIAX match</p>
        <h3 className={cn(heading, 'mt-1 text-[24px]')}>{pad.name} <span className="font-medium text-muted">· {pad.variant}</span></h3>
        <p className="mt-1 text-[13.5px]">{pad.size} · {pad.lengthLabel} · {pad.flow}. {pack.formatName}, {pack.count} pads.</p>
        <div className="mt-3"><Price pack={pack} /></div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="w-[180px]"><AddButton item={padItem(pad, pack)} /></div>
          <Link to={`/products/${pad.id}`} onClick={onClose} className={cn(btn.base, btn.outline, btn.small)}>View {pad.name.replace('PIAX ', '')}</Link>
          <button type="button" onClick={onRestart} className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline"><RotateCcw size={14} /> Start again</button>
        </div>
        <p className="mt-3 text-[12px] text-muted">A suggestion based on your answers, not medical advice. Length is about coverage; choose what feels comfortable.</p>
      </div>
    </div>
  )
}
