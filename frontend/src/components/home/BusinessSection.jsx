import { Bike, Building2, ChartColumn, Handshake, Heart, Leaf, Monitor, ShoppingCart, Sprout, Store, Users } from 'lucide-react'
import { DoodleNote, Foliage, PillLink, RoundArrow, Tag } from './HomeUi.jsx'
import PartnershipEmblem from './PartnershipEmblem.jsx'
import { barIcon, barStrong, barText, cn, container, h2, heading, iconRow, iconRowIcon, iconRowItem, section, accent, tile, tileText, tileTitle, tones } from './homeStyles.js'

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
      <Foliage art="clusterLeft" className="bottom-0 -left-[150px] w-[clamp(160px,16vw,250px)] opacity-80 max-lg:hidden" />
      <Foliage art="clusterRight" className="bottom-0 -right-[150px] w-[clamp(160px,16vw,250px)] opacity-80 max-lg:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <div className="grid flex-1 items-stretch gap-8 md:grid-cols-2 lg:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.1fr)_minmax(0,1.05fr)]">
          <div>
            <Tag>For business</Tag>
            <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(32px,3vw,42px)]')}>Partner with PIAX<br /><em className={accent}>for a healthier tomorrow.</em></h2>
            <p className="mb-8 text-[17px]">Let’s make menstrual care more accessible, sustainable and stigma-free — together.</p>
            <ul className={cn(iconRow, 'mb-8')}>
              {perks.map(({ icon: Icon, text }, index) => (
                <li key={index} className={iconRowItem}><span className={iconRowIcon}><Icon size={24} strokeWidth={1.5} /></span>{text}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <PillLink to="/business">Become a Partner</PillLink>
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
            <figure className="relative m-0 flex min-h-[300px] flex-1 lg:min-h-[340px]">
              <PartnershipEmblem className="absolute inset-0 size-full p-4 md:p-6" />
            </figure>
            <DoodleNote arrow="down-right" className="-top-3 left-0 z-10 hidden text-[20px] md:block lg:-left-6">Built for businesses<br />that care.</DoodleNote>
            <DoodleNote arrow="up" className="bottom-0 left-0 z-10 hidden text-[20px] md:block lg:-left-4">Your workplace + PIAX.<br />Care that shows up!</DoodleNote>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-[880px]">
          <DoodleNote arrow="right" className="top-3 -left-[250px] hidden min-[1400px]:block">Better access.<br />Bigger impact.</DoodleNote>
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
