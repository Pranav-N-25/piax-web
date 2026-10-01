import { useRef, useState } from 'react'
import {
  ArrowRight, BookOpen, Briefcase, Check, ChevronDown, CircleHelp, Clock, Droplet, Heart, MapPin,
  MessageCircleHeart, Moon, Package, Plane, RefreshCw, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Star, Sun,
  Trash2, Truck, Wind, Zap,
} from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { DoodleNote, Foliage } from '../../components/home/HomeUi.jsx'
import PadLayerExplorer from '../../components/home/insidePad/PadLayerExplorer.jsx'
import PadCompare from '../../components/products/PadCompare.jsx'
import { PadCard } from '../../components/home/ProductRangeSection.jsx'
import { AddButton, CompareIcon, DiscountTag, FavouriteButton, InstitutionalBanner, padItem, tint } from '../../components/products/RangeUi.jsx'
import FitQuiz from '../../components/productDetail/FitQuiz.jsx'
import CustomizeBoxModal from '../../components/productDetail/CustomizeBoxModal.jsx'
import Dialog from '../../components/common/Dialog.jsx'
import { accent, btn, cn, container, eyebrow, h2, heading, poppinsPage, sectionPlain } from '../../components/home/homeStyles.js'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { useMotion } from '../../hooks/useMotion.js'
import { colours, directionsOfUse, discount, packFormats, padById, pads, perPad, standardPack } from '../../data/piaxRange.js'
import { appLinks } from '../../data/appFeatures.js'
import materialsPad from '../../assets/home/materials_pad.webp'
import workPhoto from '../../assets/learn/menstrual-cycle.webp'
import nightPhoto from '../../assets/learn/period-pain.webp'
import travelPhoto from '../../assets/learn/period-care.webp'
import activePhoto from '../../assets/learn/flow-products.webp'
import everydayPhoto from '../../assets/learn/first-period.webp'

const rise = (delay = 0) => ({ 'data-anim': '', style: { '--d': `${delay}s` } })


// ---------- 1. Hero + purchase panel ----------
function Gallery({ pad, pack, onPick }) {
  const { hex } = colours[pad.colour]
  return (
    <div className="relative" {...rise(0.1)}>
      <div className="relative overflow-hidden rounded-[28px] p-6" style={tint(hex)}>
        <Foliage art="sprigArch" className="-top-2 -left-4 w-24 opacity-50" />
        <DiscountTag pack={pack} className="absolute top-5 right-5" />
        <img key={pack.id} src={pack.image} alt={`${pad.name} ${pack.formatName}, ${pack.count} pads`} className="relative mx-auto aspect-[820/720] w-full max-w-[520px] object-contain drop-shadow-[0_24px_40px_rgba(0,64,52,.18)] motion-safe:animate-[home-rise_.5s_ease-out]" />
      </div>
      <div role="radiogroup" aria-label="Pack photos" className="mt-4 grid grid-cols-3 gap-3">
        {pad.packs.map((item) => (
          <button key={item.id} type="button" role="radio" aria-checked={item.id === pack.id} aria-label={`${item.formatName}, ${item.count} pads`} onClick={() => onPick(item.format)} className={cn('cursor-pointer rounded-2xl border-2 p-2 transition-colors', item.id === pack.id ? 'border-brand' : 'border-transparent hover:border-line')} style={tint(hex)}>
            <img src={item.image} alt="" className="aspect-[820/720] w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  )
}

function Pincode() {
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

function PurchasePanel({ pad, pack, setFormat, onCustomize }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const off = discount(pack)
  const buyNow = () => { addItem(padItem(pad, pack)); navigate('/cart') }
  return (
    <div className="rounded-[26px] bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,60,50,.35)] md:p-7" {...rise(0.2)}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#0c4a40] px-3 py-1 text-[11.5px] font-semibold text-white">{pad.size} · {pad.lengthLabel}</span>
        <FavouriteButton id={pad.id} name={pad.name} />
      </div>
      <h1 className={cn(heading, 'mt-4 text-[clamp(28px,2.6vw,36px)]')}>{pad.name} <span className="font-medium text-muted">· {pad.variant}</span></h1>
      <p className="mt-2 text-[15px]">{pad.text}</p>
      <a href="#reviews" className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-brand"><Star size={15} className="text-[#e0a33a]" aria-hidden="true" /> No reviews yet — be the first</a>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <strong className="text-[38px] leading-none text-ink">₹{pack.price}</strong>
        {off > 0 && <del className="text-[18px] text-muted">₹{pack.mrp}</del>}
        {off > 0 && <span className="rounded-full bg-[#fde6ea] px-3 py-1 text-[13px] font-bold text-[#c23a55]">{off}% OFF</span>}
      </div>
      <p className="mt-1 text-[12.5px] text-muted">Inclusive of all taxes · ₹{perPad(pack)} per pad</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="relative block rounded-2xl border border-line bg-[#f8fbf9] px-4 py-2.5">
          <span className="block text-[11.5px] text-muted">Size</span>
          <select value={pad.id} onChange={(event) => navigate(`/products/${event.target.value}`)} className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[14px] font-semibold text-ink outline-none">
            {pads.map((item) => <option key={item.id} value={item.id}>{item.name.replace('PIAX ', '')} — {item.size} · {item.lengthLabel}</option>)}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 bottom-3.5 text-ink" aria-hidden="true" />
        </label>
        <div className="rounded-2xl border border-line bg-[#f8fbf9] px-4 py-2.5">
          <span className="block text-[11.5px] text-muted">Wear it</span>
          <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">{pad.wear.includes('Day') && <Sun size={15} className="text-brand" />}{pad.wear.toLowerCase().includes('night') && <Moon size={15} className="text-brand" />}{pad.wear} · {pad.flow}</span>
        </div>
      </div>

      <div role="radiogroup" aria-label="Box size" className="mt-3 grid grid-cols-3 gap-2">
        {packFormats.map((format) => {
          const item = pad.packs.find((p) => p.format === format.id)
          const on = item.id === pack.id
          return (
            <button key={format.id} type="button" role="radio" aria-checked={on} onClick={() => setFormat(format.id)} className={cn('cursor-pointer rounded-2xl border px-3 py-2.5 text-left transition-colors', on ? 'border-brand bg-[#eef8f3]' : 'border-line hover:border-brand')}>
              <span className="block text-[13.5px] font-semibold text-ink">{format.count} pads</span>
              <span className="block text-[11.5px] text-muted">{format.name.replace(' Pack', '')} · ₹{item.price}</span>
            </button>
          )
        })}
      </div>

      <button type="button" onClick={onCustomize} className="group mt-3 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-[#eef5f1] px-4 py-3 text-left transition-colors hover:bg-brand-soft">
        <SlidersHorizontal size={20} className="text-brand" aria-hidden="true" />
        <span className="flex-1"><strong className="block text-[14px] text-ink">Customize your box</strong><span className="text-[12px] text-muted">Choose sizes, box size and number of boxes</span></span>
        <ArrowRight size={18} className="text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>

      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3 text-[12.5px] text-muted">
        <RefreshCw size={18} className="shrink-0 text-brand" aria-hidden="true" />
        <span><strong className="text-ink">Subscribe &amp; save</strong> — automatic refills are coming soon.</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <AddButton item={padItem(pad, pack)} className="min-h-12 text-[15px]" />
        <button type="button" onClick={buyNow} className={cn(btn.base, btn.outline, 'min-h-12 text-[15px]')}><Zap size={17} /> Buy now</button>
      </div>
      <Pincode />
    </div>
  )
}

// ---------- page ----------
export default function ProductDetail() {
  const { slug } = useParams()
  return padById[slug] ? <ProductDetailPage key={slug} pad={padById[slug]} /> : <Navigate to="/products" replace />
}

function ProductDetailPage({ pad }) {
  const [format, setFormat] = useState('standard')
  const [customizing, setCustomizing] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [compare, setCompare] = useState([])
  const toggleCompare = (id) => setCompare((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  const { currentUser, openAuth } = useAuth()
  const mainRef = useRef(null)
  useMotion(mainRef)
  const pack = pad.packs.find((item) => item.format === format) ?? standardPack(pad)
  const short = pad.name.replace('PIAX ', '')
  usePageMeta(`${pad.name} ${pad.variant} — ${pad.size} ${pad.lengthLabel} sanitary pads | PIAX`, `${pad.name}: ${pad.text} ${pad.lengthLabel}, in 4, 10 and 30-pad packs.`)

  const moments = [
    { icon: Briefcase, title: 'Work & study', text: 'Comfort through long hours and big goals.', photo: workPhoto, to: '/learn/menstrual-cycle/what-is-the-menstrual-cycle' },
    { icon: Moon, title: 'Restful nights', text: 'More length for back coverage while you sleep.', photo: nightPhoto, to: '/learn/period-care/day-vs-night-pads' },
    { icon: Plane, title: 'On the go', text: 'A small kit so you’re ready wherever you are.', photo: travelPhoto, to: '/learn/period-care/how-to-use-a-sanitary-pad' },
    { icon: Zap, title: 'Active days', text: 'Move freely with wings that hold the pad in place.', photo: activePhoto, to: '/learn/myths-facts/can-you-exercise-on-your-period' },
    { icon: Heart, title: 'First periods', text: 'Gentle guidance for new beginnings.', photo: everydayPhoto, to: '/learn/first-period/preparing-for-your-first-period' },
  ]

  const faqs = [
    ['Which size is right for me?', `${short} (${pad.lengthLabel}) is made for ${pad.flow.toLowerCase()}. Most people use more than one size across their period — take the quiz above or compare all four sizes below.`],
    ['How often should I change my pad?', 'Every 4 to 6 hours, even on lighter days, and sooner if it feels full or damp.'],
    ['Can I use PIAX overnight?', 'Yes. NOCTE (330–340mm) and SEREN (360mm) give more length for back coverage while you lie down.'],
    ['Is PIAX suitable for sensitive skin?', 'PIAX pads have a soft top sheet and a comfort-focused design. Everyone’s skin is different — if you notice irritation, stop using the pad and speak to a doctor.'],
    ['How do I dispose of a used pad?', 'Roll it up, wrap it in its wrapper or paper and put it in a covered bin. Never flush pads.'],
  ]

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-mist text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main ref={mainRef}>
        {/* 1. Hero + purchase panel */}
        <section className="relative overflow-hidden bg-[linear-gradient(115deg,#eef8f4_0%,#e3f3ec_55%,#d4ece2_100%)]">
          <div className={cn(container, 'pt-6 pb-12')}>
            <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted"><Link to="/" className="hover:text-brand">Home</Link> › <Link to="/products" className="hover:text-brand">Shop</Link> › <span aria-current="page" className="font-medium text-ink">{pad.name}</span></nav>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-10">
              <div>
                <Gallery pad={pad} pack={pack} onPick={setFormat} />
              </div>
              <div className="lg:sticky lg:top-24">
                <PurchasePanel pad={pad} pack={pack} setFormat={setFormat} onCustomize={() => setCustomizing(true)} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Find Your PIAX */}
        <section className={sectionPlain} aria-labelledby="fit-title">
          <div className={cn(container, 'grid items-start gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)]')}>
            <div {...rise()}>
              <p className={eyebrow}>Find your PIAX</p>
              <h2 id="fit-title" className={h2}>Every period is <em className={accent}>different.</em></h2>
              <p className="mt-3 text-[16px]">Answer three quick questions and we’ll suggest a size and pack for you.</p>
              <ul className="mt-6 grid gap-3">
                {[[Sparkles, 'Personal suggestion', 'Based on your flow and day'], [ShieldCheck, 'The right coverage', 'For your day, night and in between'], [Heart, 'No pressure', 'Change sizes any time']].map(([Icon, title, text]) => (
                  <li key={title} className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon size={19} /></span><span><strong className="block text-[14px] text-ink">{title}</strong><span className="text-[12.5px] text-muted">{text}</span></span></li>
                ))}
              </ul>
              <DoodleNote inline className="mt-6 text-brand">Different bodies,<br />different needs.</DoodleNote>
            </div>
            <div className="rounded-[26px] bg-white p-6 shadow-soft md:p-8" {...rise(0.1)}><FitQuiz /></div>
          </div>
        </section>

        {/* 3. Inside PIAX */}
        <section className={sectionPlain} aria-labelledby="inside-title">
          <div className={container}>
            <div className="mb-8 max-w-[640px]" {...rise()}>
              <p className={eyebrow}>Inside PIAX</p>
              <h2 id="inside-title" className={h2}>8 layers of <em className={accent}>thoughtful design.</em></h2>
              <p className="mt-3 text-[16px]">Each layer has a job, working together for a comfortable, secure feel. Tap a layer to explore.</p>
            </div>
            <PadLayerExplorer />
          </div>
        </section>

        {/* 4. Close-ups */}
        <section className={cn(container, 'grid gap-5 md:grid-cols-2')} aria-label="Design details">
          {[
            { title: 'Soft on top.', accentText: 'Comfortable all day.', text: 'A soft top sheet sits against your skin, designed for an easy, comfortable feel.', chips: ['Soft top sheet', 'Anion-infused design'], image: materialsPad },
            { title: 'Built to stay put.', accentText: 'So you can move.', text: 'An 8-layer construction with a leak-management design, and wings that fold around your underwear to hold the pad in place.', chips: ['8-layer construction', 'Winged design'], image: standardPack(pad).image },
          ].map(({ title, accentText, text, chips, image }, index) => (
            <article key={title} className="grid items-center gap-4 overflow-hidden rounded-[26px] bg-white p-6 shadow-soft sm:grid-cols-[minmax(0,1fr)_160px]" {...rise(index * 0.12)}>
              <div>
                <h3 className={cn(heading, 'text-[24px]')}>{title} <em className={accent}>{accentText}</em></h3>
                <p className="mt-2 text-[14.5px]">{text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{chips.map((chip) => <li key={chip} className="flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[12.5px] font-semibold text-brand"><Check size={13} />{chip}</li>)}</ul>
              </div>
              <img src={image} alt="" className="mx-auto w-40 rounded-2xl bg-[#eef7f2] object-contain p-2" />
            </article>
          ))}
        </section>

        {/* 5. The range: the same pad cards as the shop (price, discount, pack sizes, Add to cart). */}
        <section className={sectionPlain} aria-labelledby="range-title">
          <div className={container}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4" {...rise()}>
              <div>
                <h2 id="range-title" className={cn(heading, 'text-[clamp(24px,2.4vw,32px)]')}>Choose from a range <em className={accent}>made for real life.</em></h2>
                <p className="mt-1 text-[14px] text-muted">Four lengths, each in its own colour.</p>
              </div>
              <a href="#compare" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand hover:underline"><CompareIcon size={16} /> Compare sizes</a>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {pads.map((item, index) => {
                const on = item.id === pad.id
                return (
                  <li key={item.id} aria-current={on ? 'page' : undefined} className={cn('relative grid rounded-[24px]', on && 'ring-2 ring-brand ring-offset-4 ring-offset-mist')}>
                    {on && <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold whitespace-nowrap text-white shadow-soft">You’re viewing</span>}
                    <PadCard pad={item} comparing={compare.includes(item.id)} onCompare={toggleCompare} animDelay={index * 0.08} />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* 6. Not sure yet? */}
        <section className={container} aria-labelledby="help-title">
          <div className="grid items-center gap-6 rounded-[26px] bg-[#e2f2ea] p-6 md:grid-cols-[minmax(0,1fr)_repeat(3,auto)_auto] md:p-8" {...rise()}>
            <div>
              <h2 id="help-title" className={cn(heading, 'text-[24px]')}>Not sure yet?</h2>
              <p className="mt-1 text-[13.5px] text-muted">Take a short quiz or explore our guides.</p>
            </div>
            {[[BookOpen, 'Size guide', 'Match sizes to your days', '/learn/flow-products/choosing-the-right-pad-size'], [MessageCircleHeart, 'Ask PIAX', 'Answers to your questions', '/search'], [CircleHelp, 'Find My Pad', 'A fuller cycle-kit quiz', '/find-my-pad']].map(([Icon, title, text, to]) => (
              <Link key={title} to={to} className="group flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-full bg-white text-brand transition-transform group-hover:scale-110"><Icon size={20} /></span><span><strong className="block text-[14px] text-ink group-hover:text-brand">{title}</strong><span className="text-[12px] text-muted">{text}</span></span></Link>
            ))}
            <button type="button" onClick={() => setQuizOpen(true)} className={cn(btn.base, btn.solid)}>Take the quiz <ArrowRight size={18} /></button>
          </div>
        </section>

        {/* 7. User guide */}
        <section className={sectionPlain} aria-labelledby="guide-title">
          <div className={container}>
            <div className="mb-8 max-w-[640px]" {...rise()}>
              <p className={eyebrow}>User guide</p>
              <h2 id="guide-title" className={h2}>Simple steps for a <em className={accent}>worry-free day.</em></h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {directionsOfUse.map((text, index) => {
                const Icon = [Package, Sparkles, ShieldCheck, Trash2, Check][index] ?? Check
                return (
                  <li key={text} className="rounded-[22px] bg-white p-5 shadow-soft" {...rise(index * 0.08)}>
                    <span className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-[15px] font-bold text-brand">{index + 1}</span><Icon size={22} className="text-brand/70" aria-hidden="true" /></span>
                    <p className="mt-3 text-[14px] text-ink">{text}</p>
                  </li>
                )
              })}
            </ol>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="rounded-[22px] bg-white p-6 shadow-soft" {...rise()}>
                <h3 className={cn(heading, 'text-[20px]')}>Changing your pad</h3>
                <ul className="mt-4 grid gap-3 text-[14px]">
                  {[[Clock, 'Change every 4–6 hours, even on lighter days.'], [Droplet, 'Change sooner on heavier days or if it feels damp.'], [Moon, 'A longer pad at night gives more back coverage.']].map(([Icon, text]) => <li key={text} className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon size={17} /></span>{text}</li>)}
                </ul>
              </div>
              <div className="rounded-[22px] bg-white p-6 shadow-soft" {...rise(0.1)}>
                <h3 className={cn(heading, 'text-[20px]')}>Care tips</h3>
                <ul className="mt-4 grid gap-3 text-[14px]">
                  {[[Wind, 'Wear clean, breathable cotton underwear.'], [ShoppingBag, 'Carry a spare pad and a pouch for used ones.'], [Heart, 'Notice any irritation? Stop using the pad and speak to a doctor.']].map(([Icon, text]) => <li key={text} className="flex items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon size={17} /></span>{text}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 8. PIAX in your life */}
        <section className={container} aria-labelledby="life-title">
          <div className="mb-8 max-w-[640px]" {...rise()}>
            <p className={eyebrow}>PIAX in your life</p>
            <h2 id="life-title" className={h2}>Different days. <em className={accent}>Same confidence.</em></h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {moments.map(({ icon: Icon, title, text, photo, to }, index) => (
              <li key={title} {...rise(index * 0.08)}>
                <Link to={to} className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-soft transition-transform hover:-translate-y-1">
                  <span className="relative block"><img src={photo} alt="" className="aspect-[4/3] w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105" /><span className="absolute -bottom-5 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-brand shadow-soft"><Icon size={20} /></span></span>
                  <span className="flex flex-1 flex-col p-5 pt-8 text-center"><strong className="text-[16px] text-ink">{title}</strong><span className="mt-1 text-[13px] text-muted">{text}</span><span className="mt-3 inline-flex items-center justify-center gap-1 text-[13px] font-semibold text-brand">Learn more <ArrowRight size={14} /></span></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. Reviews */}
        <section id="reviews" className={cn(sectionPlain, 'scroll-mt-24')} aria-labelledby="reviews-title">
          <div className={cn(container, 'grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]')}>
            <div className="rounded-[22px] bg-white p-6 shadow-soft" {...rise()}>
              <h2 id="reviews-title" className={cn(heading, 'text-[22px]')}>Customer reviews</h2>
              <p className="mt-3 flex items-center gap-1" aria-label="No ratings yet">{[1, 2, 3, 4, 5].map((n) => <Star key={n} size={22} className="text-line" aria-hidden="true" />)}</p>
              <p className="mt-2 text-[13.5px] text-muted">No reviews yet for {pad.name}.</p>
              <button type="button" onClick={() => openAuth('login')} disabled={Boolean(currentUser)} className={cn(btn.base, btn.solid, 'mt-5 w-full')}>{currentUser ? 'Reviews open after delivery' : 'Log in to review'}</button>
              <p className="mt-3 text-[12px] text-muted">Only customers with a delivered order can review, so every review is verified.</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-line bg-white/60 p-10 text-center" {...rise(0.1)}>
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand"><MessageCircleHeart size={26} /></span>
              <h3 className="mt-4 text-[18px] font-semibold text-ink">Real experiences will appear here.</h3>
              <p className="mt-1.5 max-w-[420px] text-[14px] text-muted">We only show reviews from verified purchases — no made-up ratings.</p>
            </div>
          </div>
        </section>

        {/* 10. Questions */}
        <section className={container} aria-labelledby="faq-title">
          <div className="grid gap-6 rounded-[26px] bg-white p-6 shadow-soft md:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] md:p-8" {...rise()}>
            <div>
              <p className={eyebrow}>Questions</p>
              <h2 id="faq-title" className={cn(heading, 'text-[clamp(24px,2.4vw,32px)]')}>Honest answers to <em className={accent}>common concerns.</em></h2>
              <a href={appLinks.web} target="_blank" rel="noopener" className={cn(btn.base, btn.outline, btn.small, 'mt-5')}>Ask PIAX AI <ArrowRight size={16} /></a>
            </div>
            <div className="grid gap-2">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-2xl bg-[#f6faf8] px-5 py-4 open:bg-[#eef7f2]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown size={18} className="shrink-0 text-brand transition-transform group-open:rotate-180" /></summary>
                  <p className="mt-2 text-[14px] leading-[1.6]">{answer}</p>
                </details>
              ))}
              <p className="mt-2 text-[12px] text-muted">General information, not medical advice.</p>
            </div>
          </div>
        </section>

        {/* 11. Compare + 12. Business */}
        <section className={sectionPlain} aria-label="Compare sizes">
          <div className={container}>
            <PadCompare selected={compare.length >= 2 ? compare : []} onToggle={toggleCompare} onSelect={setCompare} />
            <div className="mt-10" {...rise()}><InstitutionalBanner /></div>
          </div>
        </section>
      </main>
      <HomeFooter />

      {/* Mounted fresh on each open, so it starts from the size and pack chosen on the page. */}
      {customizing && <CustomizeBoxModal open onClose={() => setCustomizing(false)} initialPad={pad.id} initialFormat={format} />}
      <Dialog open={quizOpen} onClose={() => setQuizOpen(false)} title="Find your PIAX" variant="sheet" className="md:max-w-[860px]">
        <FitQuiz onClose={() => setQuizOpen(false)} />
      </Dialog>
    </div>
  )
}
