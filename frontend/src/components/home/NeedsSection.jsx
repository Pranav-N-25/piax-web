import { ArrowRight } from 'lucide-react'
import { CenterHead, Divider, RoundArrow } from './HomeUi.jsx'
import { accent, cardGrid, cn, container, roundArrow, sectionPlain, tones } from './homeStyles.js'
import padPack from '../../assets/04_card_pad_pack.png'
import shieldPad from '../../assets/05_card_shield_pad.png'
import cyclePhone from '../../assets/06_card_cycle_phone.png'
import aiRobot from '../../assets/07_card_ai_robot.png'
import locationPin from '../../assets/08_card_location_pin.png'
import stockBoxes from '../../assets/09_card_stock_boxes.png'
import leafSprig from '../../assets/home/piax_assets/10_leaf_sprig.png'

const needs = [
  { title: 'I need pads', text: 'Shop PIAX pads now', tone: 'pink', art: padPack, to: '/products' },
  { title: 'Help me find my size', text: 'Get a personalised recommendation', tone: 'mint', art: shieldPad, to: '#match' },
  { title: 'I want to track my cycle', text: 'Understand your body better', tone: 'lilac', art: cyclePhone, to: '/app/cycle' },
  { title: 'I have a health question', text: 'Ask PIAX AI', tone: 'blue', art: aiRobot, to: '/ai' },
  { title: 'I need pads urgently', text: 'Find nearby availability', tone: 'peach', art: locationPin, to: '/support' },
  { title: 'I want to stock PIAX', text: 'For retailers, distributors & more', tone: 'sage', art: stockBoxes, to: '/business' },
]


export default function NeedsSection() {
  return (
    <section className={sectionPlain}>
      <div className={container}>
        <CenterHead
          tag="Let PIAX guide you"
          title={<>What do you need <em className={accent}>today?</em></>}
          text={<>Choose a path that&apos;s right for you. We&apos;ll guide you from here.</>}
        >
          <img src={leafSprig} alt="" className="absolute -top-1.5 right-0 hidden w-14 md:block" />
        </CenterHead>

        <div data-stagger className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6', cardGrid)}>
          {needs.map(({ title, text, tone, art, to }) => (
            <article
              key={title}
              className={cn(
                'flex min-h-60 flex-col items-center rounded-[22px] border border-white/80 p-5 text-center shadow-soft transition-transform duration-250 hover:-translate-y-1 md:min-h-[272px]',
                tones[tone].fade,
              )}
            >
              <img src={art} alt="" className="h-[118px] w-full object-contain mix-blend-multiply" />
              <h3 className="mt-4 mb-2 max-w-[150px] text-lg font-bold leading-[1.08] tracking-[-.025em] text-ink">{title}</h3>
              <p className="mb-6 max-w-40 text-sm leading-[1.3] text-body">{text}</p>
              {to.startsWith('#')
                ? <a className={cn(roundArrow, 'mt-auto', tones[tone].accent)} href={to} aria-label={title}><ArrowRight size={18} /></a>
                : <RoundArrow to={to} label={title} className={cn('mt-auto', tones[tone].accent)} />}
            </article>
          ))}
        </div>

        <Divider />
      </div>
    </section>
  )
}

