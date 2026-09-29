import { BadgeCheck, Droplet, Globe, Leaf, Recycle, Sprout } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { DoodleNote, PillLink, Tag } from './HomeUi.jsx'
import { cn, container, eyebrow, h2, heading, section, accent } from './homeStyles.js'
import MaterialTexture from './insidePad/MaterialTexture.jsx'
import PadLayerExplorer from './insidePad/PadLayerExplorer.jsx'

const materials = [
  { icon: Sprout, text: <>Plant-based<br />top layer</> },
  { icon: Recycle, text: <>Compostable<br />back sheet</> },
  { icon: Globe, text: <>Lower<br />environmental<br />impact</> },
]

const badges = [
  { icon: BadgeCheck, text: <>IS 5405:2019<br />Tested</> },
  { icon: Droplet, text: <>Dermatologically<br />Tested</> },
  { icon: Leaf, text: <>Hypoallergenic<br />&amp; Rash-Free</> },
  { icon: Leaf, text: <>Compostable<br />&amp; Oxo-biodegradable</> },
]

export default function InsidePadSection() {
  const [revealRef, inView] = useInView()

  return (
    <section className={section}>
      <div ref={revealRef} className={cn(container, 'flex flex-col gap-10 lg:gap-12')}>
        {/* Row 1 · story on the left, the interactive 8-layer pad on the right */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.6fr)] lg:gap-12">
          <div className="md:max-w-[640px] lg:max-w-none">
            <p className={eyebrow}>Inside the pad</p>
            <h2 className={cn(h2, 'mb-4')}>8 layers.<br />Thoughtfully designed<br /><em className={accent}>for your comfort.</em></h2>
            <p className="mb-8">Every PIAX pad is crafted with a multi-layer protection system that keeps you dry, comfortable and confident — while being kinder to your skin and the planet.</p>
            <PillLink to="/sustainability" variant="outline">See full materials &amp; lab reports</PillLink>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {badges.map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex flex-col items-center gap-2 text-center text-[11px] leading-[1.25]">
                  <span className="flex size-[50px] items-center justify-center rounded-full border-[1.5px] border-brand text-brand"><Icon size={26} strokeWidth={1.4} /></span>
                  {text}
                </li>
              ))}
            </ul>
            <DoodleNote inline className="mt-10 hidden lg:block">Care that goes deeper.</DoodleNote>
          </div>

          <PadLayerExplorer revealed={inView} />
        </div>

        {/* Row 2 · materials banner */}
        <aside className="grid overflow-hidden rounded-[26px] bg-linear-to-r from-[#e0f2e9] to-[#eaf6f0] md:grid-cols-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div className="px-6 pt-6 md:pb-6 lg:py-8 lg:pl-10">
            <Tag><Leaf size={14} /> Made with care</Tag>
            <h3 className={cn(heading, 'mt-4 mb-2 text-2xl')}>Better materials<br />for a <em className={accent}>brighter tomorrow.</em></h3>
            <p className="text-[15px]">Sustainable choices for a healthier you and a healthier planet.</p>
          </div>
          <ul className="grid grid-cols-3 gap-2 px-6 py-6 md:col-start-1 md:pt-0 lg:col-start-auto lg:py-8">
            {materials.map(({ icon: Icon, text }, index) => (
              <li key={index} className="flex flex-col items-center gap-2 text-center text-xs leading-[1.25] text-ink">
                <span className="flex size-12 items-center justify-center rounded-full border border-[#bfdccf] bg-white text-brand"><Icon size={24} strokeWidth={1.4} /></span>
                {text}
              </li>
            ))}
          </ul>
          <div className="relative md:col-start-2 md:row-span-2 md:row-start-1 lg:col-start-auto lg:row-span-1 lg:row-start-auto lg:self-stretch">
            <MaterialTexture className="h-40 w-full  md:h-full lg:min-h-[200px]" />
            <DoodleNote className="bottom-5 left-6 text-xl">Thoughtful<br />inside and out.</DoodleNote>
          </div>
        </aside>
      </div>
    </section>
  )
}
