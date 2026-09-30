import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BadgeCheck, Bus, CalendarDays, Check, Clock, Droplet, Feather, GitCompareArrows, Heart,
  House, Info, Moon, RotateCcw, ShieldCheck, Sparkles, Sun, Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { DoodleNote, Foliage, Tag } from '../../components/home/HomeUi.jsx'
import { accent, btn, cn, container, heading, sectionPlain } from '../../components/home/homeStyles.js'
import { AddButton, bundleItem, LengthBar, padItem, Price, tint } from '../../components/products/RangeUi.jsx'
import { questions, recommend } from '../../data/padQuiz.js'
import { colours, pads } from '../../data/piaxRange.js'

const icons = { moon: Moon, sun: Sun, home: House, clock: Clock, bus: Bus, calendar: CalendarDays, feather: Feather, shield: ShieldCheck, heart: Heart, wallet: Wallet, sparkles: Sparkles, check: BadgeCheck }
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function Drops({ count }) {
  return (
    <span className="flex flex-wrap justify-center gap-px text-brand" aria-hidden="true">
      {Array.from({ length: count }, (_, drop) => <Droplet key={drop} size={count > 2 ? 11 : 15} strokeWidth={1.8} className="fill-brand/80" />)}
    </span>
  )
}

function Option({ option, selected, onPick }) {
  const Icon = icons[option.icon]
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onPick}
      className={cn(
        'relative flex min-h-[92px] cursor-pointer items-center gap-3.5 rounded-[18px] border bg-white p-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand',
        selected ? 'border-brand shadow-[0_0_0_3px_var(--color-brand-soft)]' : 'border-line',
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        {option.drops ? <Drops count={option.drops} /> : <Icon size={20} strokeWidth={1.7} />}
      </span>
      <span className="flex min-w-0 flex-col">
        <strong className="text-[15px] leading-tight text-ink">{option.label}</strong>
        {option.hint && <span className="mt-1 text-[12.5px] leading-snug text-muted">{option.hint}</span>}
      </span>
      {selected && <span className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-brand text-white"><Check size={13} strokeWidth={3} /></span>}
    </button>
  )
}

function Quiz({ answers, onAnswer, onDone }) {
  const [step, setStep] = useState(0)
  const current = questions[step]
  const chosen = answers[current.id]
  const last = step === questions.length - 1

  const advance = useRef(null)
  useEffect(() => () => clearTimeout(advance.current), [])

  const next = () => (last ? onDone() : setStep(step + 1))
  const back = () => { clearTimeout(advance.current); setStep(step - 1) }
  const pick = (value) => {
    onAnswer(current.id, value)
    // Move on by itself after a beat, so a tap is all it takes; a second quick tap only restarts the beat.
    clearTimeout(advance.current)
    advance.current = setTimeout(() => (last ? onDone({ ...answers, [current.id]: value }) : setStep(step + 1)), reducedMotion() ? 0 : 280)
  }

  return (
    <div className="rounded-[26px] bg-white p-5 shadow-soft sm:p-8">
      <div className="flex items-center justify-between text-[12.5px] font-semibold text-muted">
        <span>Question {step + 1} of {questions.length}</span>
        <span>{questions.length - step === 1 ? 'Last one!' : `${questions.length - step} to go`}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={step + 1} aria-label="Quiz progress">
        <span className="block h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>

      <div key={current.id} className="motion-safe:animate-[home-rise_.4s_ease-out]">
        <h2 id="quiz-question" className={cn(heading, 'mt-7 text-[clamp(22px,2.4vw,30px)]')}>{current.question}</h2>
        <p className="mt-3 flex items-start gap-2 rounded-[14px] bg-mist px-4 py-3 text-[13px] leading-snug">
          <Info size={16} className="mt-px shrink-0 text-brand" /><span><strong className="text-ink">Why we ask:</strong> {current.why}</span>
        </p>
        <div role="radiogroup" aria-labelledby="quiz-question" className={cn('mt-6 grid gap-3', current.options.length > 2 && 'sm:grid-cols-2')}>
          {current.options.map((option) => (
            <Option key={String(option.value)} option={option} selected={chosen === option.value} onPick={() => pick(option.value)} />
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <button type="button" onClick={back} disabled={step === 0} className={cn(btn.base, btn.outline, btn.small, 'disabled:invisible')}>
          <ArrowLeft size={16} /> Back
        </button>
        <button type="button" onClick={next} disabled={chosen === undefined} className={cn(btn.base, btn.solid, btn.small)}>
          {last ? 'See my match' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

function MatchCard({ label, icon: Icon, pad, reasons, pack }) {
  const { hex, name: colourName } = colours[pad.colour]
  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-soft">
      <div className="relative px-5 pt-5" style={tint(hex)}>
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-ink shadow-soft"><Icon size={14} className="text-brand" /> {label}</span>
        <img src={pack.image} alt={`${pad.name} ${pad.variant} box in ${colourName}`} className="mx-auto mt-2 aspect-[820/720] w-full max-w-[280px] object-contain" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-brand">{pad.size} · {pad.length}mm · {colourName}</p>
        <h3 className={cn(heading, 'mt-1.5 text-[24px]')}>{pad.name.replace('PIAX ', '')} <span className="font-medium text-muted">· {pad.variant}</span></h3>
        <LengthBar pad={pad} className="mt-3" />
        <ul className="mt-4 flex flex-col gap-2 text-[13.5px]">
          {reasons.map((reason) => <li key={reason} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand" />{reason}</li>)}
        </ul>
        <div className="mt-auto pt-5">
          <p className="mb-2 text-[12.5px] font-semibold text-ink">{pack.count} pads</p>
          <Price pack={pack} />
          <AddButton className="mt-4" item={padItem(pad, pack)} />
        </div>
      </div>
    </article>
  )
}

function Results({ answers, onRetake }) {
  const result = recommend(answers)
  const { day, night, kit, bundle } = result
  const same = night && night.id === day.id
  const packOf = (pad) => kit.find((item) => item.pad.id === pad.id).pack

  // Compare the match with its neighbours in the range.
  const matched = [...new Set([day.id, night?.id].filter(Boolean))]
  if (matched.length === 1) {
    const index = pads.findIndex((pad) => pad.id === matched[0])
    matched.push(pads[index + 1]?.id ?? pads[index - 1].id)
  }
  const compareLink = `/products?compare=${matched.join(',')}#compare`

  const summary = questions.map((question) => question.options.find((option) => option.value === answers[question.id])?.label)

  return (
    <div className="motion-safe:animate-[home-rise_.5s_ease-out]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Tag><Sparkles size={14} /> Your PIAX match</Tag>
          <h2 className={cn(heading, 'mt-4 text-[clamp(30px,3.4vw,46px)]')}>
            {night && !same ? <>Here’s your <em className={accent}>perfect pair.</em></> : <>Here’s your <em className={accent}>perfect pad.</em></>}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your answers">
            {summary.map((text) => <li key={text} className="rounded-full border border-line bg-white px-3 py-1 text-[12px] text-body">{text}</li>)}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={compareLink} className={cn(btn.base, btn.outline, btn.small)}><GitCompareArrows size={16} /> Compare these pads</Link>
          <button type="button" onClick={onRetake} className={cn(btn.base, btn.outline, btn.small)}><RotateCcw size={16} /> Retake quiz</button>
        </div>
      </div>

      <div className={cn('mt-8 grid gap-5', night && !same ? 'md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.1fr]' : 'md:grid-cols-2 xl:grid-cols-[1fr_1.1fr]')}>
        <MatchCard label={same ? 'For days & nights' : 'For your days'} icon={Sun} pad={day} reasons={result.dayReasons} pack={packOf(day)} />
        {night && !same && <MatchCard label="For your nights" icon={Moon} pad={night} reasons={result.nightReasons} pack={packOf(night)} />}

        <div className={cn('flex flex-col gap-5', night && !same && 'md:col-span-2 xl:col-span-1')}>
          <article className="rounded-[22px] bg-white p-5 shadow-soft sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-brand">Your cycle kit</p>
            <h3 className={cn(heading, 'mt-1.5 text-[22px]')}>About {result.total} pads per cycle</h3>
            <p className="mt-1.5 text-[13px] text-muted">
              {night ? <>{result.dayCount} for your days + {result.nightCount} for your nights</> : <>{result.dayCount} for your days</>}, based on your flow and period length.
            </p>
            <ul className="mt-4 flex flex-col divide-y divide-line">
              {kit.map(({ pad, pack, quantity }) => (
                <li key={pack.id} className="flex items-center gap-3 py-3">
                  <img src={pack.image} alt="" className="size-14 shrink-0 rounded-[12px] object-contain p-0.5" style={tint(colours[pad.colour].hex)} />
                  <span className="min-w-0 flex-1 text-[13.5px]">
                    <strong className="block text-ink">{pack.label}{quantity > 1 && <> × {quantity}</>}</strong>
                    {pad.variant} · {pack.count * quantity} pads
                  </span>
                  <strong className="text-ink">₹{pack.price * quantity}</strong>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between border-t border-line pt-3 text-[15px]">
              <span className="font-semibold text-ink">Kit total</span><strong className="text-[20px] text-ink">₹{result.kitPrice}</strong>
            </div>
            <p className="mt-1 text-right text-[12px] text-muted">{result.cycles > 1 ? `Lasts about ${result.cycles} cycles` : 'Covers one full cycle'}</p>
            <AddButton className="mt-4" label="Add my kit to cart" items={kit.map(({ pad, pack, quantity }) => ({ item: padItem(pad, pack), quantity }))} />
          </article>

          {bundle && (
            <article className="rounded-[22px] bg-brand p-5 text-white shadow-soft sm:p-6">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.16em] text-brand-soft"><Sparkles size={13} /> Smart pick</p>
              <div className="mt-3 flex items-center gap-4">
                <img src={bundle.image} alt={`${bundle.name} box`} className="w-24 shrink-0 rounded-[14px] bg-white/90 object-contain p-1" />
                <div>
                  <h3 className="text-[19px] leading-tight font-bold">{bundle.name.replace('PIAX ', '')} · {bundle.count} pads</h3>
                  <p className="mt-1 text-[13px] text-white/85">{bundle.why}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 [&_del]:text-white/60 [&_p]:text-white/75 [&_strong]:text-white">
                <div className="flex-1"><Price pack={bundle} /></div>
                <div className="w-[150px]"><AddButton item={bundleItem(bundle)} className="border-white bg-white text-brand" /></div>
              </div>
            </article>
          )}
        </div>
      </div>

      <p className="mt-8 flex items-start gap-2 text-[12.5px] text-muted">
        <Info size={15} className="mt-px shrink-0" />
        This is a product guide, not medical advice. If your periods are very heavy, painful or irregular, please talk to a doctor.
      </p>
    </div>
  )
}

// /find-my-pad: a six-question quiz that matches a day pad and a night pad from the PIAX range, sizes a
// cycle kit and links into the comparison on /products.
export default function FindMyPad() {
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [final, setFinal] = useState(null)
  const top = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const finish = (all) => {
    setFinal(all ?? answers)
    setDone(true)
    top.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
  }
  const retake = () => {
    setAnswers({})
    setDone(false)
    top.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div className="overflow-x-clip bg-mist font-sans text-base leading-[1.45] text-body">
      <HomeHeader />
      <main>
        <section ref={top} className={cn(sectionPlain, 'scroll-mt-16 overflow-hidden')}>
          <Foliage art="shadowFrond" className="top-0 -left-16 w-[clamp(180px,20vw,300px)] opacity-70 max-md:hidden" />
          <Foliage art="broad" className="-right-[120px] -bottom-10 w-[clamp(200px,22vw,320px)] opacity-50 max-lg:hidden" />
          <div className={cn(container, 'relative z-10')}>
            {done ? (
              <Results answers={final} onRetake={retake} />
            ) : (
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.3fr)] lg:gap-14">
                <div className="relative lg:pt-6">
                  <Tag><Sparkles size={14} /> Find My Pad</Tag>
                  <h1 className={cn(heading, 'mt-4 mb-4 text-[clamp(38px,4.4vw,60px)] leading-none tracking-[-.035em]')}>
                    The pad that fits <em className={accent}>your</em> flow.
                  </h1>
                  <p className="mb-6 max-w-[460px] text-[17px]">Six quick questions, about 45 seconds. We’ll match a pad for your days and your nights, and size a kit that lasts your whole cycle.</p>
                  <ul className="flex flex-col gap-3 text-[15px]">
                    {['Based on how you actually use pads', 'A day pad and a night pad, matched to you', 'Your cycle kit, priced up in one tap'].map((text) => (
                      <li key={text} className="flex items-center gap-3"><span className="flex size-6 items-center justify-center rounded-full bg-brand text-white"><Check size={14} strokeWidth={3} /></span>{text}</li>
                    ))}
                  </ul>
                  <DoodleNote inline arrow="right" className="mt-10 hidden lg:block">No sign-up.<br />Just answers.</DoodleNote>
                </div>
                <Quiz answers={answers} onAnswer={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))} onDone={finish} />
              </div>
            )}
          </div>
        </section>
        <AppBanner />
      </main>
      <HomeFooter />
    </div>
  )
}
