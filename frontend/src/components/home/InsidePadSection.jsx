import { BadgeCheck, Droplet, Leaf } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { DoodleNote, Foliage, PillLink } from './HomeUi.jsx'
import { cn, container, eyebrow, h2, section, accent } from './homeStyles.js'
import PadLayerExplorer from './insidePad/PadLayerExplorer.jsx'

const badges = [
  { icon: Leaf, text: <>Soft<br />top sheet</> },
  { icon: BadgeCheck, text: <>Anion-infused<br />design</> },
  { icon: Droplet, text: <>Leak-management<br />design</> },
  { icon: Leaf, text: <>Winged<br />design</> },
]

export default function InsidePadSection() {
  const [revealRef, inView] = useInView()

  return (
    <section className={section}>
      <Foliage art="twigRight" className="top-6 -right-10 w-[clamp(80px,8vw,130px)] opacity-50 max-lg:hidden" />
      <div ref={revealRef} className={cn(container, 'flex flex-col gap-10 lg:gap-12')}>
        {/* Story on the left, the interactive 8-layer pad on the right */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.6fr)] lg:gap-12">
          <div className="md:max-w-[640px] lg:max-w-none">
            <p className={eyebrow}>Inside the pad</p>
            <h2 className={cn(h2, 'mb-4')}>8 layers.<br />Thoughtfully designed<br /><em className={accent}>for your comfort.</em></h2>
            <p className="mb-8">Every PIAX pad is crafted with a multi-layer protection system that keeps you dry, comfortable and confident — while being kinder to your skin and the planet.</p>
            <PillLink to="/find-my-pad" variant="outline">Find your size</PillLink>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {badges.map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex flex-col items-center gap-2 text-center text-[11px] leading-[1.25]">
                  <span className="flex size-[50px] items-center justify-center rounded-full border-[1.5px] border-brand text-brand"><Icon size={26} strokeWidth={1.4} /></span>
                  {text}
                </li>
              ))}
            </ul>
            <DoodleNote inline arrow="right" className="mt-10 hidden lg:block">Care that goes deeper.</DoodleNote>
          </div>

          <PadLayerExplorer revealed={inView} />
        </div>
      </div>
    </section>
  )
}
