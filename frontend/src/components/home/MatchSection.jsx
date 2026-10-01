import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CircleCheck, Droplet, Heart, Leaf, Shield, ShoppingCart, Sparkles, Truck, Wind } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { DoodleNote, Foliage, Tag } from './HomeUi.jsx'
import { accent, btn, cn, container, heading, section, tones } from './homeStyles.js'
import { padById, standardPack } from '../../data/piaxRange.js'
import { DiscountTag } from '../products/RangeUi.jsx'

const steps = [
  {
    label: 'Your Flow',
    question: 'How is your flow usually?',
    hint: 'This helps us suggest the right coverage for you.',
    options: [
      { value: 'Light', text: 'Just a little', drops: 1 },
      { value: 'Regular', text: 'Moderate flow', drops: 2 },
      { value: 'Heavy', text: 'Heavier flow', drops: 2 },
      { value: 'Very Heavy', text: 'Extra protection', drops: 3 },
    ],
  },
  {
    label: 'When do you need it?',
    question: 'When do you need it most?',
    hint: 'Day, night or on the go — we have you covered.',
    options: [
      { value: 'Day', text: 'Work, college, errands', drops: 1 },
      { value: 'Night', text: 'Long, restful sleep', drops: 2 },
      { value: 'Day & Night', text: 'All-round care', drops: 2 },
      { value: 'Travel', text: 'Compact & on the go', drops: 1 },
    ],
  },
  {
    label: 'What matters most?',
    question: 'What matters most to you?',
    hint: 'Pick the one thing you never compromise on.',
    options: [
      { value: 'Comfort', text: 'Soft top sheet', drops: 1 },
      { value: 'Protection', text: 'Leak-management design', drops: 2 },
      { value: 'Fit', text: 'Winged design that stays put', drops: 1 },
      { value: 'Value', text: 'Better price per pad', drops: 1 },
    ],
  },
]

// Each flow maps to a pad in the range; the recommendation shows its box.
const toMatch = (padId, fit) => {
  const pad = padById[padId]
  const pack = standardPack(pad)
  return { id: pack.id, name: `${pad.name} ${pad.variant}`, size: pad.size, fit: `${fit} | ${pad.lengthLabel} · ${pack.count} pads`, price: pack.price, mrp: pack.mrp, boxCount: pack.count, image: pack.image }
}

const matches = {
  Light: toMatch('vera', 'Best for light flow'),
  Regular: toMatch('luma', 'Best for regular flow'),
  Heavy: toMatch('nocte', 'Best for heavy flow & nights'),
  'Very Heavy': toMatch('seren', 'Best for very heavy flow'),
}

const specs = [
  { icon: Wind, text: <>Soft<br />top sheet</> },
  { icon: Shield, text: <>8-layer<br />construction</> },
  { icon: Sparkles, text: <>Anion-infused<br />design</> },
  { icon: Leaf, text: <>Winged<br />design</> },
]

const perks = [
  { icon: Truck, text: <>Free shipping<br />on orders above ₹499</> },
  { icon: Leaf, text: <>Plain, discreet<br />packaging</> },
  { icon: Shield, text: <>Mix any 12 pads<br />in the ₹249 Cycle Pack</> },
  { icon: Heart, text: <>Trusted by<br />10,000+ women</> },
]

export default function MatchSection() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(['Heavy', null, null])
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const current = steps[step]
  const match = matches[answers[0]] ?? matches.Heavy
  const done = step === steps.length

  const choose = (value) => setAnswers(answers.map((answer, index) => (index === step ? value : answer)))

  const addToCart = () => {
    addItem(match)
    setAdded(true)
  }

  return (
    <section className={section} id="match">
      <Foliage art="broad" className="-bottom-10 -right-[120px] w-[clamp(200px,22vw,340px)] opacity-60 max-lg:hidden" />
      <Foliage art="shadowFrond" className="top-0 -left-16 w-[clamp(180px,20vw,300px)] opacity-80 max-md:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <div className="grid flex-1 items-center gap-6 lg:gap-8 md:grid-cols-[1fr_1.3fr] lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="relative">
            <Tag>Personalised just for you</Tag>
            <h2 className={cn(heading, 'mt-4 mb-4 text-[clamp(40px,4.2vw,58px)] leading-none tracking-[-.035em]')}>
              Find your<br /><em className={accent}>PIAX</em> match
            </h2>
            <p className="mb-6 text-[17px]">Answer a few simple questions and we’ll recommend the perfect PIAX pad for you in 30 seconds.</p>
            <ul className="grid gap-3">
              {['Personalised recommendations', 'Based on your flow, lifestyle & preference', 'No sign-up required'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px]">
                  <CircleCheck size={22} className="shrink-0 fill-brand text-white" /> {item}
                </li>
              ))}
            </ul>
            <DoodleNote inline arrow="right" className="mt-12 ml-2 hidden lg:block">Every body.<br />A happier period.</DoodleNote>
          </div>

          {/* Sized to its content and centred in the row, like the columns beside it. */}
          <div className="flex flex-col rounded-[26px] bg-white p-4 text-center shadow-soft md:p-6">
            <ol className="mx-auto mb-4 grid max-w-[420px] grid-cols-3">
              {steps.map(({ label }, index) => {
                const isDone = index < step || done
                const isActive = index === step
                return (
                  <li
                    key={label}
                    className={cn(
                      'relative flex flex-col items-center gap-1',
                      index > 0 && "before:absolute before:top-[11px] before:-left-1/2 before:z-0 before:h-0.5 before:w-full before:content-['']",
                      index > 0 && (index <= step || done ? 'before:bg-brand' : 'before:bg-[#d9e3df]'),
                    )}
                  >
                    <span className={cn('relative z-1 flex size-6 items-center justify-center rounded-full text-xs font-bold text-white', isDone || isActive ? 'bg-brand' : 'bg-[#d9e0dd]')}>
                      {isDone ? <Check size={14} /> : index + 1}
                    </span>
                    <small className={cn('text-[10px] md:text-[11px]', isActive ? 'font-semibold text-brand' : 'text-muted')}>{label}</small>
                  </li>
                )
              })}
            </ol>

            <div className="flex min-h-[212px] flex-col justify-center rounded-2xl bg-[#fafcfb] p-4 md:p-5">
              {done ? (
                <div className="flex flex-col items-center gap-2 pt-2 text-brand">
                  <Sparkles size={30} />
                  <h3 className={cn(heading, 'text-xl')}>Your PIAX match is ready!</h3>
                  <p className="text-sm text-body">{answers.filter(Boolean).join(' • ')}</p>
                  <p className="text-sm text-muted">We recommend <strong>{match.name}</strong> — {match.fit}</p>
                  <button type="button" className={cn(btn.base, btn.outline, 'mt-4 min-h-10')} onClick={() => setStep(0)}>
                    <ArrowLeft size={18} /> Start again
                  </button>
                </div>
              ) : (
                <>
                  <h3 className={cn(heading, 'text-xl')}>{current.question}</h3>
                  <p className="mt-2 mb-4 text-[13px] text-muted">{current.hint}</p>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4" role="radiogroup" aria-label={current.question}>
                    {current.options.map(({ value, text, drops }) => {
                      const selected = answers[step] === value
                      return (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => choose(value)}
                          className={cn(
                            'relative flex min-h-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-[10px] border-[1.5px] px-1.5 py-3 transition-[border-color,background] duration-200 hover:border-[#9cc7b8]',
                            selected ? 'border-brand bg-[#eef7f3]' : 'border-transparent bg-[#f1f5f3]',
                          )}
                        >
                          {selected && (
                            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-brand text-white"><Check size={13} /></span>
                          )}
                          <span className={cn('flex gap-px', selected ? 'text-brand' : 'text-[#94c9b8]')}>
                            {Array.from({ length: drops }, (_, index) => <Droplet key={index} size={18} fill="currentColor" />)}
                          </span>
                          <strong className="mt-2 text-sm font-semibold text-ink">{value}</strong>
                          <small className="text-[11px] text-muted">{text}</small>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            {!done && (
              <button
                type="button"
                disabled={!answers[step]}
                onClick={() => setStep(step + 1)}
                className={cn(btn.base, btn.solid, 'mt-6 w-full md:w-auto md:min-w-[260px]')}
              >
                {(step === steps.length - 1 ? 'See my match' : 'Next')} <ArrowRight size={18} />
              </button>
            )}
          </div>

          <div className={cn('relative mx-auto flex w-full max-w-[440px] flex-col rounded-[26px] border border-white/80 p-6 shadow-soft md:col-span-full lg:col-span-1 lg:mx-0 lg:max-w-none', tones.mint.fade)}>
            <p className="flex items-center gap-2 text-[13px] font-semibold text-ink"><Sparkles size={16} /> Recommended for you</p>
            <DiscountTag pack={match} className="absolute top-5 right-5" />
            <img key={match.id} src={match.image} alt={`${match.name} box of ${match.boxCount} pads`} className="mx-auto my-4 w-[88%] motion-safe:animate-[home-rise_.45s_ease-out]" />
            <h3 className={cn(heading, 'text-xl')}>{match.name}</h3>
            <p className="mt-1 text-[13px] text-muted">{match.fit}</p>
            <ul className="my-4 grid grid-cols-4 gap-2">
              {specs.map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex flex-col items-center gap-1 text-center text-[10.5px] leading-[1.2] text-muted">
                  <Icon size={22} strokeWidth={1.5} className="text-brand" />{text}
                </li>
              ))}
            </ul>
            {/* Price, MRP, discount and Add to Cart always share one row. When the box is too narrow for the
                full label (the three-column layout just above lg), the button becomes a round cart icon. */}
            <div className="@container mt-auto pt-2">
              <div className="flex flex-row flex-nowrap items-center gap-2 @min-[15rem]:gap-3">
                <strong className="shrink-0 text-[22px] leading-none text-ink">₹{match.price}</strong>
                <del className="shrink-0 text-sm text-[#8d9a96]">₹{match.mrp}</del>
                <button
                  type="button"
                  onClick={addToCart}
                  aria-label={(added ? 'Added to cart' : 'Add to Cart')}
                  className={cn(btn.base, btn.solid, 'ml-auto min-h-10 shrink-0 gap-2 px-0 text-sm @max-[15rem]:size-10 @max-[15rem]:min-h-10 @min-[15rem]:flex-1 @min-[15rem]:px-4')}
                >
                  {added ? <Check size={18} /> : <ShoppingCart size={18} className="@min-[15rem]:hidden" />}
                  <span className="@max-[15rem]:hidden">{(added ? 'Added' : 'Add to Cart')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-10 grid max-w-260 grid-cols-2 gap-x-6 gap-y-5 rounded-[20px] bg-white/70 px-6 py-5 sm:px-8 md:grid-cols-4 md:gap-x-0 md:gap-y-0 md:rounded-[30px] md:px-4 md:py-6">
          {perks.map(({ icon: Icon, text }, index) => (
            <li key={index} className={cn('flex items-center gap-3 text-[13px] leading-[1.3] text-body md:justify-center md:px-6', index > 0 && 'md:border-l md:border-line')}>
              <Icon size={28} strokeWidth={1.5} className="shrink-0 text-brand" /><span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
