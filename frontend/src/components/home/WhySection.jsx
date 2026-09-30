import { Brain, Calendar, Droplet, Feather, Heart, Layers, Leaf, MessageCircle, Recycle, ShieldCheck, Sparkles, Sprout, Users, Wind } from 'lucide-react'
import { CenterHead, DoodleNote, Foliage, PillLink } from './HomeUi.jsx'
import { bar, barIcon, barStrong, barText, cn, container, section, accent, tones } from './homeStyles.js'
import padInHand from '../../assets/home/piax_assets/34_why_pad_in_hand.png'
import layersArt from '../../assets/35_why_layers.png'
import globeArt from '../../assets/home/piax_assets/36_why_globe_leaf.png'
import appArt from '../../assets/home/piax_assets/37_why_app_phone.png'
import avatar1 from '../../assets/reviews/review_1.jpg'
import avatar2 from '../../assets/reviews/review_3.jpg'
import avatar3 from '../../assets/reviews/review_5.jpg'

const avatars = [avatar1, avatar2, avatar3]

const reasons = [
  {
    title: <>Unmatched<br />Comfort</>, text: 'Ultra-thin, ultra-soft and rash-free — even on your heaviest days.', icon: Feather, art: padInHand, fit: 'object-cover object-[center_35%]', tone: 'pink',
    points: [[Leaf, 'Soft bamboo top sheet'], [Wind, 'Breathable layers'], [Heart, 'Gentle on sensitive skin']],
  },
  {
    title: <>Reliable<br />Protection</>, text: '8-layer technology with leak-lock channels for worry-free days and nights.', icon: ShieldCheck, art: layersArt, fit: 'object-contain object-[70%_center] scale-125', tone: 'mint',
    points: [[Layers, '8-layer absorption'], [Droplet, 'Leak-lock channels'], [Calendar, 'Up to 12 hours protection']],
  },
  {
    title: <>Kind to<br />the Planet</>, text: 'Sustainable materials and compostable pads for a cleaner, greener tomorrow.', icon: Sprout, art: globeArt, fit: 'object-cover object-[center_30%]', tone: 'cream',
    points: [[Leaf, 'Plant-based materials'], [Recycle, 'Compostable & oxo-biodegradable'], [Sprout, 'Smaller environmental footprint']],
  },
  {
    title: <>Powered<br />by Intelligence</>, text: 'Track, understand and make better choices with PIAX AI and personalized insights.', icon: Brain, art: appArt, fit: 'object-cover object-top', tone: 'lilac',
    points: [[Calendar, 'Cycle tracking'], [MessageCircle, 'AI health support'], [Sparkles, 'Personalized recommendations']],
  },
]

export default function WhySection() {
  return (
    <section className={section}>
      <Foliage art="shadowFrond" className="-top-10 -left-24 w-[clamp(200px,22vw,340px)] opacity-80 max-md:hidden" />
      <Foliage art="sprigArch" className="bottom-10 -left-12 w-[clamp(110px,11vw,170px)] opacity-70 max-lg:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <CenterHead
          tag="Why PIAX"
          title={<>More than a pad. <em className={accent}>A better</em> period experience.</>}
          text="Thoughtfully designed for your comfort, your health and a healthier planet."
        >
          <DoodleNote arrow="down-left" className="top-0 right-0 hidden text-left xl:block">Care today<br />for brighter<br />tomorrows.</DoodleNote>
        </CenterHead>

        <div data-stagger className="grid flex-1 gap-4 md:grid-cols-2 lg:gap-6 lg:grid-cols-4">
          {reasons.map(({ title, text, icon: Icon, art, fit, tone, points }, index) => (
            <article key={index} className={cn('relative isolate flex min-h-[250px] overflow-hidden rounded-[18px] p-6 shadow-soft', tones[tone].bg)}>
              {/* One art slot per card: same size and anchor, fading in from the left so text stays clear. */}
              <img
                src={art}
                alt=""
                loading="lazy"
                decoding="async"
                className={cn(
                  'pointer-events-none absolute inset-y-0 right-0 -z-1 h-full w-[50%] mix-blend-multiply',
                  'mask-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,.25)_22%,#000_62%)]',
                  fit,
                )}
              />
              <div className="relative min-w-0 max-w-[62%]">
                <span className={cn('mb-4 flex size-11 items-center justify-center rounded-full text-ink', tones[tone].accent)}>
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="mb-2 text-[17px] font-bold leading-[1.08] tracking-[-.025em] text-ink">{title}</h3>
                <p className="mb-4 text-[12.5px] leading-[1.35]">{text}</p>
                <ul>
                  {points.map(([PointIcon, label]) => (
                    <li key={label} className="mt-2 flex items-center gap-2 text-[11px]">
                      <PointIcon size={16} strokeWidth={1.5} className="shrink-0 rounded-full border border-[#3b504b] p-0.5" /> {label}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-[18px] bg-white/70 px-6 py-5 xl:flex-nowrap xl:justify-start">
          {/* The quote wraps onto two balanced lines so the feature items beside it get room to breathe. */}
          <div className="flex w-full min-w-0 flex-col items-center justify-center gap-4 text-center md:flex-row md:text-left lg:w-auto lg:shrink-0 lg:justify-start lg:border-r lg:border-line lg:pr-8">
            <div className="flex shrink-0 -space-x-3" role="img" aria-label="PIAX customers">
              {avatars.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" decoding="async" className="size-11 rounded-full border-2 border-white object-cover object-[center_25%] shadow-soft" />
              ))}
            </div>
            <p className="max-w-[300px] text-sm leading-[1.45] text-balance text-ink lg:w-[220px] xl:w-[260px]">“Finally a pad that feels good, works even better, and is kind to the planet.”</p>
          </div>
          <ul className="flex w-full flex-col items-center justify-evenly gap-4 whitespace-nowrap sm:flex-row sm:flex-wrap sm:gap-x-8 lg:w-auto lg:flex-1 lg:flex-nowrap lg:gap-6">
            <li className={bar}><Users size={26} strokeWidth={1.4} className={barIcon} /><span className={barText}><strong className={barStrong}>10,000+</strong>Happy Customers</span></li>
            <li className={bar}><Leaf size={26} strokeWidth={1.4} className={barIcon} /><span className={barText}><strong className={barStrong}>Sustainable</strong>by Design</span></li>
            <li className={bar}><Heart size={26} strokeWidth={1.4} className={barIcon} /><span className={barText}><strong className={barStrong}>Real Care</strong>Real Impact</span></li>
          </ul>
          <PillLink to="/products">Explore Our Products</PillLink>
        </div>
      </div>
    </section>
  )
}
