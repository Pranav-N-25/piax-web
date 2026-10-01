import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Briefcase, Feather, Flower2, GraduationCap, Heart, Leaf, Moon, Sun } from 'lucide-react'
import { DoodleNote, Foliage, PillLink, RoundArrow } from './HomeUi.jsx'
import { cn, container, eyebrow, h2, section, accent, tones } from './homeStyles.js'
import heavyPhoto from '../../assets/20_need_heavy_flow_photo.png'
import nightPhoto from '../../assets/21_need_night_photo.png'
import everydayPhoto from '../../assets/22_need_everyday_photo.png'
import travelPhoto from '../../assets/23_need_travel_photo.png'
import firstPhoto from '../../assets/24_need_first_period_photo.png'
import sensitivePhoto from '../../assets/25_need_sensitive_skin_photo.png'
import { padById, standardPack } from '../../data/piaxRange.js'

const packImage = (padId) => standardPack(padById[padId]).image
const trialImage = (padId) => padById[padId].packs.find((pack) => pack.format === 'trial').image

const moments = [
  { title: 'Heavy Flow', text: 'More protection for heavier days', icon: Sun, photo: heavyPhoto, pack: packImage('seren'), tone: 'blue' },
  { title: 'Night Protection', text: 'Longer coverage while you sleep', icon: Moon, photo: nightPhoto, pack: packImage('nocte'), tone: 'cream' },
  { title: 'Everyday Comfort', text: 'Stay fresh and confident day after day', icon: Briefcase, photo: everydayPhoto, pack: packImage('vera'), tone: 'mint' },
  { title: 'Lighter Days', text: 'Shorter cover for the start and end', icon: Feather, photo: travelPhoto, pack: packImage('luma'), tone: 'lilac' },
  { title: 'First Period', text: 'Gentle care for new beginnings', icon: GraduationCap, photo: firstPhoto, pack: trialImage('luma'), tone: 'rose' },
  { title: 'New to PIAX', text: 'Try any size in a 4-pad trial pack', icon: Leaf, photo: sensitivePhoto, pack: trialImage('vera'), tone: 'sage' },
]

export default function ShopNeedsSection() {
  const track = useRef(null)
  const scroll = (direction) => track.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })

  return (
    <section className={section}>
      <Foliage art="shadowLeaves" className="-bottom-12 -left-20 w-[clamp(200px,22vw,320px)] max-md:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <div className="relative mb-8 flex flex-col items-start md:flex-row md:items-end md:gap-6 lg:mb-10">
          <div>
            <p className={eyebrow}>Shop by your needs</p>
            <h2 className={cn(h2, 'mb-4')}>Your period isn’t the same <em className={accent}>every day.</em></h2>
            <p className="text-[17px]">Different days. Different needs. The right PIAX pad for every moment.</p>
          </div>
          <DoodleNote arrow="down-right" className="top-2 right-[120px] hidden xl:block">Same you,<br />different days.</DoodleNote>
          <div className="mt-4 flex gap-3 md:mt-0 md:mb-2 md:ml-auto">
            <button type="button" aria-label="Previous" onClick={() => scroll(-1)} className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-muted">
              <ArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Next" onClick={() => scroll(1)} className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-brand-soft text-brand">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div data-stagger
          ref={track}
          className="grid flex-1 snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto pb-2 lg:gap-6 [scrollbar-width:none] md:auto-cols-[230px] lg:auto-cols-[calc((100%-120px)/6)] [&::-webkit-scrollbar]:hidden"
        >
          {moments.map(({ title, text, icon: Icon, photo, pack, tone }) => (
            <article key={title} className={cn('flex min-w-[200px] snap-start flex-col overflow-hidden rounded-[18px] shadow-soft', tones[tone].bg)}>
              <div className="relative min-h-[150px] flex-1">
                <img src={photo} alt={`${title} — PIAX`} className="absolute inset-0 size-full object-cover object-[center_25%]" />
                <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-full bg-white text-ink">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
              </div>
              <div className="flex flex-col p-5">
                <h3 className="text-lg font-semibold leading-[1.08] tracking-[-.025em] text-ink">{title}</h3>
                <p className="mt-2 min-h-9 text-sm leading-[1.3]">{text}</p>
                <div className="mt-4 flex items-center justify-between">
                  <img src={pack} alt={`PIAX pack for ${title.toLowerCase()}`} loading="lazy" decoding="async" className="w-[68%]" />
                  <RoundArrow to="/products" label={`Shop ${title}`} className="bg-white/70" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 items-center justify-items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch">
          <span className="flex items-center gap-3 text-[13px] md:after:h-px md:after:flex-1 md:after:bg-[#c9dbd3] md:after:content-['']">
            <Leaf size={20} strokeWidth={1.5} className="text-brand" /> Care for today. A healthier tomorrow.
          </span>
          <PillLink to="/products">View all products</PillLink>
          <ul className="flex items-center justify-end gap-6 text-[13px] md:before:h-px md:before:flex-1 md:before:bg-[#c9dbd3] md:before:content-['']">
            <li className="flex items-center gap-2"><Heart size={20} strokeWidth={1.5} className="text-brand" /> Safe</li>
            <li className="flex items-center gap-2"><Leaf size={20} strokeWidth={1.5} className="text-brand" /> Four sizes</li>
            <li className="flex items-center gap-2"><Flower2 size={20} strokeWidth={1.5} className="text-brand" /> For every you</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
