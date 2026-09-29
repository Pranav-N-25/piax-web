import { Globe, Heart, Leaf, Package, ShieldCheck, Truck } from 'lucide-react'
import { DoodleNote, PillLink, Tag } from './HomeUi.jsx'
import { bar, barIcon, barStrong, barText, cn, container, h2, heading, sectionPlain, accent, tones } from './homeStyles.js'
import stepPhone from '../../assets/home/piax_assets/49_step1_phone.png'
import stepPad from '../../assets/50_step2_pad.png'
import stepPack from '../../assets/home/piax_assets/51_step3_pack.png'
import stepBox from '../../assets/home/piax_assets/52_step4_box.png'
import womanWithPack from '../../assets/40_loved_woman_with_pack.png'

const steps = [
  { title: 'Tell us about you', text: 'Answer a few simple questions about your flow, lifestyle and preferences.', art: stepPhone },
  { title: 'Get your recommendation', text: 'We suggest the right PIAX pad size and type for your needs.', art: stepPad, sizes: true },
  { title: 'Shop with ease', text: 'Choose your pack, customize your box size and place your order in just a few clicks.', art: stepPack },
  { title: 'Fast & discreet delivery', text: 'Your PIAX order is packed with care and delivered to your doorstep.', art: stepBox },
]

const sizes = [['S', 'peach'], ['M', 'blue'], ['L', 'pink'], ['XL', 'lilac'], ['XXL', 'mint']]

const promises = [
  { icon: Truck, title: 'Free shipping', text: 'on orders above ₹499' },
  { icon: Package, title: 'Discreet packaging', text: '100% privacy' },
  { icon: Heart, title: 'A healthier you', text: 'A kinder planet' },
]

const values = [
  { icon: Leaf, title: 'Sustainable', text: '& responsible' },
  { icon: ShieldCheck, title: 'Safe &', text: 'lab-tested' },
  { icon: Heart, title: 'Loved by', text: '10,000+ women' },
  { icon: Truck, title: 'Pan-India', text: 'delivery' },
  { icon: Globe, title: 'Small choices.', text: 'A big difference.' },
]

export default function HowItWorksSection() {
  return (
    <section className={sectionPlain}>
      <div className={container}>
        <div className="grid items-start gap-8 lg:gap-6 md:grid-cols-[1fr_1.6fr] lg:grid-cols-[minmax(0,.95fr)_minmax(0,2.2fr)_minmax(0,1.1fr)]">
          <div className="relative">
            <Tag>How it works</Tag>
            <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(34px,3.3vw,44px)]')}>Simple steps<br /><em className={accent}>for a better you.</em></h2>
            <p className="mb-8 text-[15.5px]">From understanding your needs to getting PIAX at your doorstep — we make period care simple, personal and stress-free.</p>
            <PillLink to="/products">Get Started</PillLink>
            <DoodleNote inline className="mt-10 ml-2 hidden lg:block">Your period care,<br />your way.</DoodleNote>
          </div>

          <div className="relative md:col-span-full md:row-start-2 lg:col-span-1 lg:row-start-auto">
            <ol data-stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {steps.map(({ title, text, art, sizes: showSizes }, index) => (
                <li key={title} className="flex min-h-[300px] flex-col overflow-hidden rounded-2xl bg-white/60 px-5 pt-5">
                  <b className="mb-4 flex size-[26px] items-center justify-center rounded-full bg-[#8cbfae] text-[13px] text-white">{index + 1}</b>
                  <h3 className={cn(heading, 'mb-2 text-base')}>{title}</h3>
                  <p className="text-[12.5px] leading-[1.35]">{text}</p>
                  <img src={art} alt="" className="mx-auto mt-auto max-h-[150px] object-contain mix-blend-multiply" />
                  {showSizes && (
                    <div className="flex justify-center gap-1 pt-2 pb-4">
                      {sizes.map(([size, tone]) => (
                        <span key={size} className={cn('flex size-7 items-center justify-center rounded-full text-[10.5px] font-semibold', tones[tone].bg)}>{size}</span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3">
            <img src={womanWithPack} alt="Woman hugging a PIAX pad pack" loading="lazy" decoding="async" className="h-60 w-full rounded-[18px] object-cover object-[60%_center]" />
            <ul className="grid gap-2">
              {promises.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-center gap-3 rounded-full bg-white py-1.5 pr-5 pl-1.5 shadow-soft">
                  <span className="flex size-[38px] items-center justify-center rounded-full bg-[#e0f1e9] text-brand"><Icon size={22} strokeWidth={1.5} /></span>
                  <div>
                    <strong className="block text-[12.5px] font-semibold text-ink">{title}</strong>
                    <small className="text-[11px] text-muted">{text}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-10 flex flex-wrap items-center gap-6 rounded-[18px] bg-white/75 p-5 md:mt-15 md:px-8 md:py-5 lg:flex-nowrap">
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
    </section>
  )
}
