import { CenterHead, Divider, DoodleNote, Foliage } from './HomeUi.jsx'
import { cn, container, sectionPlain, accent } from './homeStyles.js'
import labIcon from '../../assets/14_trust_icon_lab.png'
import leafIcon from '../../assets/15_trust_icon_leaf.png'
import deliveryIcon from '../../assets/16_trust_icon_delivery.png'
import paymentIcon from '../../assets/17_trust_icon_payment.png'
import packageIcon from '../../assets/18_trust_icon_package.png'
import supportIcon from '../../assets/19_trust_icon_support.png'

const points = [
  { title: 'Lab Tested', text: 'Meets IS 5405:2019 standards for safety and quality', icon: labIcon },
  { title: 'Sustainable & Compostable', text: 'Thoughtfully made for a healthier planet', icon: leafIcon },
  { title: 'Fast & Reliable Delivery', text: 'Across India, right to your doorstep', icon: deliveryIcon },
  { title: 'Secure Payments', text: '100% safe and encrypted transactions', icon: paymentIcon },
  { title: 'Discreet Packaging', text: 'Your privacy is always protected', icon: packageIcon },
  { title: 'Real Women Real Support', text: 'A caring team, ready to help you always', icon: supportIcon },
]

// Column dividers: 2 columns on phones, 3 on tablets, 6 on desktop.
const divider = (index) => cn(
  'border-line',
  index % 2 === 1 && 'border-l',
  index % 3 === 0 ? 'md:border-l-0' : 'md:border-l',
  index > 0 && 'lg:border-l',
)

export default function TrustSection() {
  return (
    <section className={sectionPlain}>
      <Foliage art="twigLeft" className="top-4 -left-8 w-[clamp(110px,12vw,190px)] opacity-70 max-md:hidden" />
      <div className={container}>
        {/* Doodles sit just outside the white panel: above its top-right corner and below its bottom-left corner. */}
        <DoodleNote className="-top-[72px] right-6 hidden text-left xl:block">Safe. Thoughtful.<br />Always for you.</DoodleNote>
        <DoodleNote className="-bottom-14 left-6 hidden xl:block">Small choices.<br />Big change.</DoodleNote>
        <div className="relative rounded-[30px] border border-white/90 bg-white/50 p-6 pt-8 md:p-10 lg:mx-10">
          <CenterHead
            className="-mt-[49px] md:-mt-[57px]"
            tag="Trust & Transparency"
            title={<>Because your health and comfort <em className={accent}>matter.</em></>}
            text="We are committed to safe, sustainable and reliable period care — always."
          />
          <div data-stagger className="grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
            {points.map(({ title, text, icon }, index) => (
              <article key={title} className={cn('px-4 text-center', divider(index))}>
                <img src={icon} alt="" className="mx-auto mb-4 size-[76px] rounded-full mix-blend-multiply md:size-24" />
                <h3 className="mb-2 text-[17px] font-bold leading-[1.08] tracking-[-.025em] text-ink">{title}</h3>
                <p className="text-sm text-body">{text}</p>
              </article>
            ))}
          </div>
          <Divider />
        </div>
      </div>
    </section>
  )
}
