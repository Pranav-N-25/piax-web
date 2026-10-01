import { useState } from 'react'
import { Link } from 'react-router-dom'
import { colours, pads } from '../../data/piaxRange.js'
import { AddButton, CompareButton, DiscountTag, FavouriteButton, InstitutionalBanner, PackPicker, padItem, Price, QuantityPicker, tint } from '../products/RangeUi.jsx'
import { ComboProductCard } from '../products/ComboPack.jsx'
import { RatingBadge } from '../reviews/Stars.jsx'
import { DoodleNote, Foliage } from './HomeUi.jsx'
import { accent, cn, container, eyebrow, h2, heading, section } from './homeStyles.js'

// One pad with its pack picker, price and Add to cart. Also used by the product detail page's range section.
// `animDelay` staggers the card's entrance on pages that run useMotion (ignored elsewhere).
export function PadCard({ pad, comparing, onCompare, animDelay = 0 }) {
  const [index, setIndex] = useState(0)
  const [boxes, setBoxes] = useState(1)
  const pack = pad.packs[index]
  const { hex, name: colourName } = colours[pad.colour]
  const short = pad.name.replace('PIAX ', '')

  return (
    <article id={`pad-${pad.id}`} data-anim style={{ '--d': `${animDelay}s` }} className="group flex scroll-mt-28 flex-col overflow-hidden rounded-[22px] bg-white shadow-soft transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-14px_rgba(15,60,50,.28)]">
      <div className="relative overflow-hidden px-5 pt-5 pb-11" style={tint(hex)}>
        <div className="flex items-center justify-between gap-2 text-[11.5px] font-semibold text-ink">
          <span className="rounded-full bg-white px-3 py-1 shadow-soft">{pad.size} · {pad.lengthLabel}</span>
          <span className="flex gap-2">
            <FavouriteButton id={pad.id} name={`${short} ${pad.variant}`} />
            {onCompare && <CompareButton on={comparing} name={short} onToggle={() => onCompare(pad.id)} />}
          </span>
        </div>
        <DiscountTag pack={pack} className="absolute right-5 bottom-3" />
        <Link to={`/products/${pad.id}`} tabIndex={-1} aria-hidden="true" className="block">
        <img
          key={pack.id}
          src={pack.image}
          alt={`${pad.name} ${pad.variant} box of ${pack.count} pads in ${colourName}`}
          loading="lazy"
          decoding="async"
          className="mx-auto mt-2 aspect-[820/720] w-full max-w-[280px] -translate-y-1 object-contain transition-[translate,scale] duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03] motion-safe:animate-[home-rise_.45s_ease-out]"
        />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[.16em]" style={{ color: pad.colour === 'slate' ? hex : '#0b5b4e' }}>{pad.flow}</p>
        <h3 className={cn(heading, 'mt-1.5 text-[22px]')}><Link to={`/products/${pad.id}`} className="hover:text-brand">{short} <span className="font-medium text-muted">· {pad.variant}</span></Link></h3>
        <RatingBadge productId={pad.id} showEmpty className="mt-1.5" />
        <p className="mt-2 text-[13px] leading-[1.4]">{pad.text}</p>

        <PackPicker pad={pad} index={index} onChange={setIndex} className="mt-4" />

        <div className="mt-auto pt-5">
          {pad.packs.length === 1 && <p className="mb-2 text-[12.5px] font-semibold text-ink">{pack.count} pads per box</p>}
          <div className="flex items-end justify-between gap-3">
            <Price pack={pack} />
            <QuantityPicker value={boxes} onChange={setBoxes} label={short} />
          </div>
          <AddButton className="mt-4" item={padItem(pad, pack)} quantity={boxes} />
        </div>
      </div>
    </article>
  )
}

// `compare` (the ids ticked for comparison) and `onCompare` turn on each pad's Compare checkbox;
// `afterPads` renders straight after the pad cards (the comparison table on /products).
// `toolbar` sits between the heading and the cards (the filter toggle on /products), and `shownPads`
// limits the cards to a filtered list; `emptyState` replaces the cards when that list is empty.
export default function ProductRangeSection({ titleAs: Title = 'h2', compare = [], onCompare, afterPads, toolbar, shownPads = pads, emptyState }) {
  return (
    <section id="range" className={section}>
      <Foliage art="sprigRound" className="top-10 -right-12 w-[clamp(100px,10vw,160px)] opacity-70 max-lg:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <div className="relative mb-8 max-w-[780px] lg:mb-10" data-anim>
          <p className={eyebrow}>The PIAX range</p>
          <Title className={cn(h2, 'mb-4')}>A pad for every day <em className={accent}>of your cycle.</em></Title>
          <p className="text-[17px]">Four lengths, each in its own colour, so you can grab the right one at a glance.</p>
          <DoodleNote arrow="down-right" className="top-6 -right-[200px] hidden xl:block">Colour-coded<br />by size!</DoodleNote>
        </div>

        {toolbar}

        {shownPads.length === 0 && emptyState ? emptyState : (
          // Keyed on the visible pads, so a filter change replays the cards' entrance.
          // The combo is listed as a fifth product, after the pads.
          <div key={shownPads.map((pad) => pad.id).join()} data-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {shownPads.map((pad, index) => <PadCard key={pad.id} pad={pad} comparing={compare.includes(pad.id)} onCompare={onCompare} animDelay={0.1 + index * 0.1} />)}
            <ComboProductCard animDelay={0.1 + shownPads.length * 0.1} />
          </div>
        )}

        {/* With a comparison table (/products), the bulk banner sits right above it; otherwise it closes the section. */}
        {afterPads && <div data-anim><InstitutionalBanner className="mt-14" /></div>}
        {afterPads && <div data-anim>{afterPads}</div>}

        {!afterPads && <div data-anim><InstitutionalBanner className="mt-10" /></div>}
      </div>
    </section>
  )
}
