import { useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import Dialog from '../common/Dialog.jsx'
import { money } from '../../utils/formatters.js'
import { productImages } from './productImages.js'
import { button, choice, toneBackgrounds } from './productStyles.js'

const steps = [
  { key: 'flow', question: 'How is your flow usually?', options: ['Light', 'Moderate', 'Heavy', 'Very heavy'] },
  { key: 'time', question: 'When do you need protection most?', options: ['Day', 'Night', 'Day & Night'] },
  { key: 'priority', question: 'What matters most to you?', options: ['Comfort', 'Sensitive skin', 'Eco-friendly', 'Long protection'] },
]

// Maps quiz answers to a product id in dummyData.json, with the reason shown to the user.
function recommend({ flow, time, priority }) {
  if (flow === 'Light') return ['piax-panty-liners', 'Light days need light, breathable protection.']
  if (time === 'Day & Night') return ['piax-care-bundle', 'Day pads, night pads and liners cover your whole cycle.']
  if (time === 'Night') return ['piax-night-pads', 'Longer, wider coverage keeps you protected while you sleep.']
  if (flow === 'Very heavy' || priority === 'Long protection') return ['piax-heavy-flow', 'A high-absorbency core with leak-lock channels for your heaviest days.']
  if (flow === 'Heavy') return ['piax-soft-xl', 'Extra length and 8-layer protection, still ultra-thin.']
  return ['piax-day-pads', 'Breathable everyday comfort for moderate-flow days.']
}

export default function FindMySizeModal({ open, onClose, products, onAdd }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const close = () => {
    onClose()
    setStep(0)
    setAnswers({})
  }

  const done = step === steps.length
  const current = steps[step]
  const [productId, reason] = done ? recommend(answers) : []
  const product = done ? products.find((item) => item.id === productId) : null

  return (
    <Dialog open={open} onClose={close} title="Find Your PIAX Match" description={done ? 'Here’s the pad we recommend for you.' : `Question ${step + 1} of ${steps.length}`}>
      {!done ? (
        <div>
          <div className="mb-6 flex gap-2" aria-hidden="true">
            {steps.map((item, index) => <span key={item.key} className={`h-1.5 flex-1 rounded-full ${index <= step ? 'bg-leaf' : 'bg-foam'}`} />)}
          </div>
          <fieldset>
            <legend className="mb-4 text-lg font-semibold text-charcoal">{current.question}</legend>
            <div className="grid grid-cols-2 gap-3">
              {current.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={answers[current.key] === option}
                  onClick={() => setAnswers({ ...answers, [current.key]: option })}
                  className={`${choice(answers[current.key] === option)} min-h-14`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 flex justify-between gap-3">
            <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className={`${button.ghost} disabled:invisible`}>
              <ArrowLeft size={16} /> Back
            </button>
            <button type="button" onClick={() => setStep(step + 1)} disabled={!answers[current.key]} className={button.primary}>
              {step === steps.length - 1 ? 'See my match' : 'Next'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : product && (
        <div>
          <div className="flex gap-4 rounded-2xl bg-foam p-4">
            <span className={`flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl ${toneBackgrounds[product.tone]}`}>
              <img src={productImages[product.image][0]} alt="" className="size-20 object-contain mix-blend-multiply" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-leaf">Recommended for you</p>
              <h3 className="mt-1 text-base font-semibold text-charcoal">{product.name}</h3>
              <p className="text-[13px] text-stone">{product.subtitle}</p>
              <p className="mt-1 font-semibold text-charcoal">{money(product.price)}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-stone">{reason}</p>
          <p className="mt-1 text-xs text-stone">Your answers: {Object.values(answers).join(' · ')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => { onAdd(product); close() }} className={button.primary}>
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <Link to={`/products/${product.slug}`} onClick={close} className={button.secondary}>View details</Link>
            <button type="button" onClick={() => { setStep(0); setAnswers({}) }} className={button.ghost}>
              <RotateCcw size={16} /> Start again
            </button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
