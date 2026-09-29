import { useState } from 'react'
import { BookOpen, ChevronDown, Leaf, Mail, MessagesSquare, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DoodleNote, Foliage, PillLink, Tag } from './HomeUi.jsx'
import { cn, container, h2, heading, section, accent } from './homeStyles.js'
import faqWoman from '../../assets/faq_woman_with_pack.png'

const faqs = [
  ['Is it normal to have cramps during periods?', 'Yes, mild to moderate cramps are common during periods. They usually happen due to uterine contractions. If the pain is severe or affects your daily life, it’s best to consult a healthcare professional.'],
  ['Why is my cycle irregular?', 'Stress, sleep, diet, exercise, travel and hormonal changes can all shift your cycle. Occasional changes are normal; if it stays irregular for three months or more, talk to a doctor.'],
  ['How do I choose the right pad size?', 'Pick by flow and time of day — Regular for light days, L or XL for heavier flow, and XXL for overnight. Our 30-second PIAX match quiz can recommend one for you.'],
  ['Are PIAX pads safe for sensitive skin?', 'Yes. PIAX pads have a soft bamboo top sheet, are dermatologically tested, hypoallergenic and free from harsh chemicals.'],
  ['Can I use PIAX pads at night?', 'Absolutely. Our Night Protection pads offer longer coverage and leak-lock channels for up to 12 hours of worry-free sleep.'],
  ['Are PIAX pads eco-friendly?', 'PIAX pads use plant-based materials and a compostable, oxo-biodegradable back sheet, shipped in plastic-conscious packaging.'],
  ['How can I track my period with the PIAX app?', 'Download the PIAX app, log your last period and symptoms, and get cycle predictions, reminders and personalised insights.'],
  ['Where can I buy PIAX products?', 'Shop on the PIAX website and app, on quick-commerce platforms, and at partner retail stores across India.'],
]

const channels = [
  { icon: BookOpen, title: 'Help Center', text: 'Explore articles', to: '/support' },
  { icon: MessageSquare, title: 'Live Chat', text: 'Chat with us', to: '/support' },
  { icon: Mail, title: 'Email Us', text: 'support@piax.co.in', href: 'mailto:support@piax.co.in' },
]

const panel = 'rounded-[18px] bg-white/55'

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className={section}>
      <Foliage art="twigRight" className="bottom-8 -left-8 w-[clamp(80px,8vw,120px)] -scale-x-100 opacity-45 max-lg:hidden" />
      <div className={cn(container, 'grid items-stretch gap-8 lg:gap-10 md:grid-cols-[1fr_1.4fr] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.05fr)]')}>
        <div className="flex flex-col items-start">
          <Tag>FAQ</Tag>
          <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(32px,3vw,42px)]')}>
            Your questions.<br />
            <em className={accent}><u className="decoration-2 underline-offset-[6px]">Our</u> honest answers.</em>
          </h2>
          <p>No awkwardness. No judgement.<br />Just real information, always.</p>
          <DoodleNote inline arrow="right" className="mt-6 ml-1 hidden lg:block">Curious today.<br />Confident tomorrow.</DoodleNote>
          <img src={faqWoman} alt="Smiling woman hugging a pack of PIAX pads" loading="lazy" decoding="async" className="mt-8 min-h-56 w-full flex-1 object-contain object-bottom" />
        </div>

        {/* Sized to its questions; grows as an answer opens instead of stretching to the row. */}
        <div className="self-start rounded-[22px] bg-white/60 px-6 py-4">
          {faqs.map(([question, answer], index) => {
            const isOpen = open === index
            return (
              <div key={question} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full cursor-pointer items-center gap-4 py-3 text-left text-ink"
                >
                  <b className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e2f1ea] text-[11px] font-semibold text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </b>
                  <span className="flex-1 text-[14.5px] font-medium">{question}</span>
                  <i
                    className={cn(
                      'flex size-[30px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-[transform,background] duration-200',
                      isOpen ? 'rotate-180 border-brand bg-brand text-white' : 'border-[#c9dcd4] text-brand',
                    )}
                  >
                    <ChevronDown size={18} />
                  </i>
                </button>
                {isOpen && <p className="pb-4 pl-12 text-[12.5px] leading-normal text-muted md:pr-12">{answer}</p>}
              </div>
            )
          })}
        </div>

        <aside className="relative grid gap-4 md:col-span-full md:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          <div className={cn(panel, 'flex flex-col items-center gap-2 p-6 text-center text-brand')}>
            <MessagesSquare size={42} strokeWidth={1.3} />
            <h3 className={cn(heading, 'mt-1 text-lg')}>Still have a question?</h3>
            <p className="mb-4 max-w-60 text-[13px] text-body">We&apos;re here for you. Reach out anytime — our team is happy to help.</p>
            <PillLink to="/support">Contact Support</PillLink>
          </div>
          <div className={cn(panel, 'p-5')}>
            <h4 className="mb-4 text-[13px] font-semibold text-ink">Other ways to get support</h4>
            <ul className="grid grid-cols-3">
              {channels.map(({ icon: Icon, title, text, to, href }, index) => {
                const linkClass = 'flex flex-col items-center gap-1 text-center'
                const content = (
                  <>
                    <span className="mb-2 flex size-[38px] items-center justify-center rounded-full bg-[#e2f1ea] text-brand"><Icon size={24} strokeWidth={1.5} /></span>
                    <strong className={cn('text-xs font-semibold', index === 1 ? 'text-brand-2' : 'text-ink')}>{title}</strong>
                    <small className="text-[10.5px] text-muted">{text}</small>
                  </>
                )
                return (
                  <li key={title} className={cn(index > 0 && 'border-l border-line')}>
                    {href ? <a href={href} className={linkClass}>{content}</a> : <Link to={to} className={linkClass}>{content}</Link>}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex items-center gap-5 rounded-[18px] bg-[#fdf5e4] px-6 py-4 text-brand md:col-span-full lg:col-span-1">
            <Leaf size={34} strokeWidth={1.3} aria-hidden="true" className="shrink-0" />
            <DoodleNote inline className="border-l border-[#e9dcc0] pl-5 text-xl">Real questions.<br />Real support. Always.</DoodleNote>
          </div>
        </aside>
      </div>
    </section>
  )
}
