import { useState } from 'react'
import { ArrowRight, Building2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { bundles, colours, institutional, pads } from '../../data/piaxRange.js'
import { AddButton, bundleItem, CompareButton, Dots, FavouriteButton, LengthBar, PackPicker, padItem, Price, tint } from '../products/RangeUi.jsx'
import { DoodleNote, Foliage } from './HomeUi.jsx'
import { accent, btn, cn, container, eyebrow, h2, heading, section } from './homeStyles.js'

function PadCard({ pad, comparing, onCompare }) {
  const [index, setIndex] = useState(0)
  const pack = pad.packs[index]
  const { hex, name: colourName } = colours[pad.colour]
  const short = pad.name.replace('PIAX ', '')

  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-soft transition-transform duration-200 hover:-translate-y-1">
      <div className="relative px-5 pt-5" style={tint(hex)}>
        <div className="flex items-center justify-between gap-2 text-[11.5px] font-semibold text-ink">
          <span className="rounded-full bg-white px-3 py-1 shadow-soft">{pad.size} · {pad.length}mm</span>
          <span className="flex gap-2">
            <FavouriteButton id={pad.id} name={`${short} ${pad.variant}`} />
            {onCompare && <CompareButton on={comparing} name={short} onToggle={() => onCompare(pad.id)} />}
          </span>
        </div>
        <span className="absolute bottom-3 left-5 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-semibold text-ink shadow-soft">
          <span className="size-2.5 rounded-full" style={{ background: hex }} />{colourName}
        </span>
        <img
          key={pack.id}
          src={pack.image}
          alt={`${pad.name} ${pad.variant} box of ${pack.count} pads in ${colourName}`}
          loading="lazy"
          decoding="async"
          className="mx-auto mt-3 aspect-[820/720] w-full max-w-[300px] object-contain motion-safe:animate-[home-rise_.45s_ease-out]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[.16em]" style={{ color: pad.colour === 'slate' ? hex : '#0b5b4e' }}>{pad.flow}</p>
        <h3 className={cn(heading, 'mt-1.5 text-[22px]')}>{short} <span className="font-medium text-muted">· {pad.variant}</span></h3>
        <p className="mt-2 text-[13px] leading-[1.4]">{pad.text}</p>

        <LengthBar pad={pad} className="mt-4" />
        <PackPicker pad={pad} index={index} onChange={setIndex} className="mt-4" />

        <div className="mt-auto pt-5">
          {pad.packs.length === 1 && <p className="mb-2 text-[12.5px] font-semibold text-ink">{pack.count} pads</p>}
          <Price pack={pack} />
          <AddButton className="mt-4" item={padItem(pad, pack)} />
        </div>
      </div>
    </article>
  )
}

function BundleCard({ bundle }) {
  return (
    <article className={cn(
      'relative grid grid-cols-[42%_1fr] items-center gap-3 rounded-[22px] bg-white p-4 shadow-soft transition-transform duration-200 hover:-translate-y-1',
      bundle.hero && 'ring-2 ring-brand',
    )}>
      {bundle.hero && (
        <span className="absolute -top-3 left-5 flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
          <Star size={12} fill="currentColor" /> Most loved
        </span>
      )}
      <div className="relative">
        <img src={bundle.image} alt={`${bundle.name} box of ${bundle.count} pads`} loading="lazy" decoding="async" className="w-full rounded-[14px] bg-tone-mint/60 object-contain p-1" />
        <span className="absolute top-2 right-2"><FavouriteButton id={bundle.id} name={bundle.name} /></span>
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-brand">{bundle.label} · {bundle.count} pads</p>
        <h4 className={cn(heading, 'mt-1 text-[17px]')}>{bundle.name.replace('PIAX ', '')}</h4>
        <p className="mt-1 flex items-center gap-2 text-[12px] text-muted"><Dots keys={bundle.dots} />{bundle.contents}</p>
        <p className="mt-1.5 text-[12.5px] leading-[1.35]">{bundle.text}</p>
        <div className="mt-3"><Price pack={bundle} /></div>
        <AddButton className="mt-3" item={bundleItem(bundle)} />
      </div>
    </article>
  )
}

// `compare` (the ids ticked for comparison) and `onCompare` turn on each pad's Compare checkbox;
// `afterPads` renders straight after the pad cards (the comparison table on /products).
export default function ProductRangeSection({ titleAs: Title = 'h2', compare = [], onCompare, afterPads }) {
  return (
    <section id="range" className={section}>
      <Foliage art="sprigRound" className="top-10 -right-12 w-[clamp(100px,10vw,160px)] opacity-70 max-lg:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <div className="relative mb-8 max-w-[780px] lg:mb-10">
          <p className={eyebrow}>The PIAX range</p>
          <Title className={cn(h2, 'mb-4')}>A pad for every day <em className={accent}>of your cycle.</em></Title>
          <p className="text-[17px]">Four lengths, each in its own colour, so you can grab the right one at a glance.</p>
          <DoodleNote arrow="down-right" className="top-6 -right-[200px] hidden xl:block">Colour-coded<br />by size!</DoodleNote>
        </div>

        <div data-stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pads.map((pad) => <PadCard key={pad.id} pad={pad} comparing={compare.includes(pad.id)} onCompare={onCompare} />)}
        </div>

        {afterPads}

        <h3 className={cn(heading, 'mt-14 mb-6 text-[clamp(22px,2vw,28px)]')}>Packs &amp; bundles</h3>
        <div data-stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bundles.map((bundle) => <BundleCard key={bundle.id} bundle={bundle} />)}
        </div>

        <div className="mt-10 grid items-center gap-6 overflow-hidden rounded-[24px] bg-brand p-6 text-white md:grid-cols-[180px_1fr_auto] md:p-8">
          <img src={institutional.image} alt={`${institutional.name} bulk pack`} loading="lazy" decoding="async" className="mx-auto w-[180px] rounded-[16px] bg-white/90 p-2" />
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-brand-soft"><Building2 size={14} /> For schools, workplaces &amp; NGOs</p>
            <h3 className="mt-2 text-[22px] font-bold leading-tight">{institutional.name}</h3>
            <p className="mt-2 max-w-[520px] text-[14px] text-white/85">
              Bulk packs of {institutional.count} everyday {institutional.length}mm pads at just <strong className="text-white">₹{institutional.perPad.toFixed(2)} per pad</strong>.
            </p>
          </div>
          <Link to="/business" className={cn(btn.base, 'border-white bg-white text-brand')}>Get a bulk quote <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  )
}
