import { Globe, Heart, Leaf, Package, ShieldCheck, Truck } from 'lucide-react'
import { DoodleNote, Foliage, PillLink, Tag } from './HomeUi.jsx'
import { bar, barIcon, barStrong, barText, cn, container, h2, heading, sectionPlain, accent, tones } from './homeStyles.js'
import { DeliveryVan, MatchPad, QuizPhone, ShopBag } from './StepArt.jsx'

const stepArt = [QuizPhone, MatchPad, ShopBag, DeliveryVan]
import womanWithPack from '../../assets/40_loved_woman_with_pack.png'

const steps = [
  { title: 'Tell us about you', text: 'Answer a few simple questions about your flow, lifestyle and preferences.' },
  { title: 'Get your recommendation', text: 'We suggest the right PIAX pad size and type for your needs.', sizes: true },
  { title: 'Shop with ease', text: 'Choose your pack, customize your box size and place your order in just a few clicks.' },
  { title: 'Fast & discreet delivery', text: 'Your PIAX order is packed with care and delivered to your doorstep.' },
]

const sizes = [['S', 'peach'], ['M', 'blue'], ['L', 'pink'], ['XL', 'lilac'], ['XXL', 'mint']]

const promises = [
  { icon: Truck, title: 'Free shipping', text: 'on orders above ₹499' },
  { icon: Package, title: 'Discreet packaging', text: '100% privacy' },
  { icon: Heart, title: 'A healthier you', text: 'A kinder planet' },
]

const values = [
  { icon: Leaf, title: 'Four sizes,', text: '240–360mm' },
  { icon: ShieldCheck, title: '8-layer', text: 'construction' },
  { icon: Heart, title: 'Loved by', text: '10,000+ women' },
  { icon: Truck, title: 'Pan-India', text: 'delivery' },
  { icon: Globe, title: 'Small choices.', text: 'A big difference.' },
]

export default function HowItWorksSection() {
  return (
    <section className={sectionPlain}>
      {/* Botanical frame from the reference: leaves rising from both lower corners. */}
      <Foliage art="clusterLeft" className="-bottom-10 -left-24 w-[clamp(160px,18vw,280px)] opacity-80 max-lg:hidden" />
      <Foliage art="broad" className="bottom-16 -right-[110px] w-[clamp(150px,14vw,220px)] opacity-55 max-lg:hidden" />
      <div className={container}>
        <div className="grid items-start gap-8 lg:gap-6 md:grid-cols-[1fr_1.6fr] lg:grid-cols-[minmax(0,.95fr)_minmax(0,2.2fr)_minmax(0,1.15fr)]">
          <div className="relative">
            <Tag>How it works</Tag>
            <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(34px,3.3vw,44px)]')}>Simple steps<br /><em className={accent}>for a better you.</em></h2>
            <p className="mb-8 text-[15.5px]">From understanding your needs to getting PIAX at your doorstep — we make period care simple, personal and stress-free.</p>
            <PillLink to="/products">Get Started</PillLink>
            <DoodleNote inline className="mt-8 ml-2 hidden lg:block">Your period care,<br />your way.</DoodleNote>
          </div>

          <div className="relative md:col-span-full md:row-start-2 lg:col-span-1 lg:row-start-auto">
            <ol data-stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {steps.map(({ title, text, sizes: showSizes }, index) => {
                const Art = stepArt[index]
                return (
                <li key={title} className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[20px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,.75)_0%,#e3f3eb_100%)] px-5 pt-5 shadow-soft">
                  <b className="mb-4 flex size-7 items-center justify-center rounded-full bg-brand-2 text-[13px] text-white">{index + 1}</b>
                  <h3 className={cn(heading, 'mb-2 text-base')}>{title}</h3>
                  <p className="text-[12.5px] leading-[1.35]">{text}</p>
                  {/* Same-height art slot in every card, art centred, so the four illustrations line up. */}
                  <div className="relative mt-auto flex h-[176px] items-center justify-center pb-8">
                    <Art />
                    {showSizes && (
                      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
                        {sizes.map(([size, tone]) => (
                          <span key={size} className={cn('flex size-7 items-center justify-center rounded-full text-[10.5px] font-semibold', tones[tone].bg)}>{size}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
                )
              })}
            </ol>
            <DoodleNote inline arrow="up" className="mt-3 ml-[4%] hidden text-lg lg:block" heart={false}>Personalized care<br />starts here.</DoodleNote>
          </div>

          <div className="relative flex flex-col gap-3 lg:block lg:min-h-[380px]">
            <DoodleNote className="top-0 left-2 z-2 hidden text-xl lg:block">Care that<br />fits your life.</DoodleNote>
            {/* The photo melts into the page instead of sitting in a card. */}
            <img
              src={womanWithPack}
              alt="Woman hugging a PIAX pad pack"
              loading="lazy"
              decoding="async"
              className="h-64 w-full rounded-[18px] object-cover object-[60%_center] lg:absolute lg:inset-y-0 lg:-right-6 lg:h-full lg:w-[125%] lg:max-w-none lg:rounded-none lg:object-[58%_30%] lg:[mask-image:radial-gradient(ellipse_62%_70%_at_60%_45%,#000_45%,transparent_100%)]"
            />
            <ul className="relative z-1 grid gap-2 lg:absolute lg:bottom-6 lg:-left-4 lg:w-[70%]">
              {promises.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-center gap-3 rounded-full border border-white/90 bg-white/85 py-1.5 pr-5 pl-1.5 shadow-soft backdrop-blur-sm">
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#e0f1e9] text-brand"><Icon size={22} strokeWidth={1.5} /></span>
                  <div>
                    <strong className="block text-[12.5px] font-semibold text-ink">{title}</strong>
                    <small className="text-[11px] text-muted">{text}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid items-center gap-6 md:mt-12 lg:grid-cols-[minmax(0,.55fr)_minmax(0,3fr)]">
          <DoodleNote inline className="hidden lg:block">Small steps.<br />Brighter days.</DoodleNote>
          <div className="relative flex flex-wrap items-center gap-6 rounded-[18px] bg-white/80 p-5 shadow-soft md:px-8 md:py-5 lg:flex-nowrap">
            <ul className="flex flex-1 basis-full flex-col gap-4 md:flex-row md:flex-wrap md:justify-between md:gap-0 md:gap-y-4 lg:basis-auto lg:flex-nowrap">
              {values.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className={cn(bar, 'flex-1 justify-start md:justify-center', index > 0 && 'md:border-l md:border-line')}>
                  <Icon size={30} strokeWidth={1.4} className={barIcon} />
                  <span className={barText}><strong className={cn(barStrong, 'text-[13px]')}>{title}</strong>{text}</span>
                </li>
              ))}
            </ul>
            <PillLink to="/products" className="w-full md:w-auto">Shop Now</PillLink>
          </div>
        </div>
      </div>
    </section>
  )
}
