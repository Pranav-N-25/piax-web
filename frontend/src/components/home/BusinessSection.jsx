import { Bike, Building2, ChartColumn, Handshake, Heart, Leaf, Monitor, ShoppingCart, Sprout, Store, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DoodleNote, PillLink, RoundArrow, Tag } from './HomeUi.jsx'
import { barIcon, barStrong, barText, btn, cn, container, h2, heading, iconRow, iconRowIcon, iconRowItem, section, accent, tile, tileText, tileTitle, tones } from './homeStyles.js'

const perks = [
  { icon: ChartColumn, text: <>High-quality<br />products</> },
  { icon: Leaf, text: <>Sustainable<br />and innovative</> },
  { icon: Users, text: <>End-to-end<br />support</> },
  { icon: Handshake, text: <>A purpose-<br />driven partnership</> },
]

const types = [
  { icon: Store, title: 'Distributor', text: 'Partner with us for distribution across regions.', tone: 'mint' },
  { icon: ShoppingCart, title: 'Retailer', text: 'Stock PIAX products in your store.', tone: 'cream' },
  { icon: Bike, title: 'Quick Commerce', text: 'List PIAX on your platform.', tone: 'mint' },
  { icon: Building2, title: 'Institution', text: 'For schools, colleges, workplaces and NGOs.', tone: 'pink' },
  { icon: Heart, title: 'CSR', text: 'Partner for social impact initiatives.', tone: 'mint' },
  { icon: Monitor, title: 'Vending', text: 'Bring PIAX closer with smart vending solutions.', tone: 'lilac' },
]

const impact = [
  { icon: Leaf, title: '10M+', text: 'Menstrual products to be made accessible' },
  { icon: Users, title: '1000+', text: 'Institutions to partner' },
  { icon: Sprout, title: 'Lower', text: 'environmental footprint', small: true },
  { icon: Heart, text: 'Healthier, more confident communities' },
]

export default function BusinessSection() {
  return (
    <section className={section}>
      <div className={cn(container, 'flex flex-col')}>
        <div className="grid flex-1 items-stretch gap-8 md:grid-cols-2 lg:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)_minmax(0,1.05fr)]">
          <div>
            <Tag>For business</Tag>
            <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(32px,3vw,42px)]')}>Partner with PIAX<br /><em className={accent}>for a healthier tomorrow.</em></h2>
            <p className="mb-8 text-[17px]">Let&apos;s make menstrual care more accessible, sustainable and stigma-free — together.</p>
            <ul className={cn(iconRow, 'mb-8')}>
              {perks.map(({ icon: Icon, text }, index) => (
                <li key={index} className={iconRowItem}><span className={iconRowIcon}><Icon size={24} strokeWidth={1.5} /></span>{text}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <PillLink to="/business">Become a Partner</PillLink>
              <Link className={cn(btn.base, btn.outline)} to="/business">Download Brochure</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className={cn(heading, 'text-[17px]')}>Choose your partnership type</h3>
            <p className="mt-1 mb-4 text-[13px] text-body">Different needs. A common purpose.</p>
            <div data-stagger className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-3">
              {types.map(({ icon: Icon, title, text, tone }) => (
                <article key={title} className={cn(tile, tones[tone].bg)}>
                  <Icon size={30} strokeWidth={1.5} className="text-brand" />
                  <h4 className={tileTitle}>{title}</h4>
                  <p className={tileText}>{text}</p>
                  <RoundArrow to="/business" label={title} className="size-[34px] bg-white" />
                </article>
              ))}
            </div>
          </div>

          <div className="relative flex md:col-span-full lg:col-span-1">
            <figure className="relative m-0 flex min-h-[300px] flex-1 flex-col justify-end overflow-hidden rounded-[30px] bg-linear-to-br from-brand to-[#11755f] p-8 text-white lg:min-h-[340px] lg:rounded-[60px_0_0_60px] lg:pl-12">
              <DoodleNote className="top-8 left-8 text-[26px] text-white/85 lg:left-12">Collaborate<br />for change.</DoodleNote>
              <Handshake aria-hidden="true" size={150} strokeWidth={0.8} className="pointer-events-none absolute -top-4 -right-4 text-white/12" />
              <span className="mb-6 flex size-14 items-center justify-center rounded-full bg-white/15"><Handshake size={28} strokeWidth={1.5} /></span>
              <blockquote className="m-0">
                <p className="font-serif text-[clamp(22px,2vw,28px)] leading-[1.25] italic">&ldquo;Healthy people. Thriving communities. A cleaner planet.&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[.18em] text-white/80">The PIAX Promise</figcaption>
            </figure>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-[880px]">
          <DoodleNote className="top-3 -left-[240px] hidden min-[1400px]:block">Better access.<br />Bigger impact.</DoodleNote>
          <ul className="flex flex-col items-center gap-4 rounded-[18px] bg-white px-6 py-5 shadow-soft md:flex-row md:gap-0">
            {impact.map(({ icon: Icon, title, text, small }, index) => (
              <li key={text} className={cn('flex w-full flex-1 items-center justify-start gap-3 md:w-auto md:justify-center md:px-4', index > 0 && 'md:border-l md:border-line')}>
                <Icon size={32} strokeWidth={1.4} className={barIcon} />
                <span className={barText}>
                  {title && <strong className={cn(barStrong, small ? 'text-[13px]' : 'text-[17px] font-bold')}>{title}</strong>}
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
