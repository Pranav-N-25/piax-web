import { ArrowRight } from 'lucide-react'
import { CenterHead, Divider, Foliage, RoundArrow } from './HomeUi.jsx'
import { accent, cardGrid, cn, container, roundArrow, sectionPlain, tones } from './homeStyles.js'
import shieldPad from '../../assets/04_card_pad_pack.png'
import padBox from '../../assets/05_card_shield_pad.png'
import cyclePhone from '../../assets/06_card_cycle_phone.png'
import aiRobot from '../../assets/07_card_ai_robot.png'
import locationPin from '../../assets/08_card_location_pin.png'
import stockBoxes from '../../assets/09_card_stock_boxes.png'

// `clean` art has a transparent background and pure-white parts, so it skips the multiply blend
// that would tint its whites with the card colour.
const needs = [
  { title: 'I need pads', text: 'Shop PIAX pads now', tone: 'pink', art: shieldPad, to: '/products', clean: true },
  { title: 'Help me find my size', text: 'Get a personalised recommendation', tone: 'mint', art: padBox, to: '#match', clean: true },
  { title: 'I want to track my cycle', text: 'Understand your body better', tone: 'lilac', art: cyclePhone, to: '/app/cycle' },
  { title: 'I have a health question', text: 'Ask PIAX AI', tone: 'blue', art: aiRobot, to: '/ai' },
  { title: 'I need pads urgently', text: 'Find nearby availability', tone: 'peach', art: locationPin, to: '/support' },
  { title: 'I want to stock PIAX', text: 'For retailers, distributors & more', tone: 'sage', art: stockBoxes, to: '/business' },
]


export default function NeedsSection() {
  return (
    <section className={sectionPlain}>
      <Foliage art="sprigRound" className="top-4 -right-10 w-[clamp(100px,11vw,170px)] opacity-75 max-md:hidden" />
      <div className={container}>
        <CenterHead
          tag="Let PIAX guide you"
          title={<>What do you need <em className={accent}>today?</em></>}
          text={<>Choose a path that&apos;s right for you. We&apos;ll guide you from here.</>}
        />

        <div data-stagger className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6', cardGrid)}>
          {needs.map(({ title, text, tone, art, to, clean }) => (
            <article
              key={title}
              className={cn(
                'flex min-h-60 flex-col items-center rounded-[22px] border border-white/80 p-5 text-center shadow-soft transition-transform duration-250 hover:-translate-y-1 md:min-h-[272px]',
                tones[tone].fade,
              )}
            >
              <img src={art} alt="" className={cn('h-[118px] w-full object-contain', !clean && 'mix-blend-multiply')} />
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

