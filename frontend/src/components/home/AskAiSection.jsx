import { BookOpen, Calendar, FileText, Heart, Lock, MessageCircle, MessagesSquare, Pill, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'
import { DoodleBurst, Foliage, Tag } from './HomeUi.jsx'
import { btn, cn, container, h2, heading, section, accent, tones } from './homeStyles.js'
import AiPhoneMockup from './AiPhoneMockup.jsx'
import { aiAssistants, aiDisclaimer, appLinks } from '../../data/appFeatures.js'

const features = [
  { icon: MessageCircle, title: 'Quick, everyday answers', text: 'Cycles, cramps, workouts and diet' },
  { icon: Lock, title: 'Private to you', text: 'Never used for ads' },
  { icon: Heart, title: 'Specialist assistants', text: `${aiAssistants.slice(0, 3).join(', ')} and more` },
  { icon: Stethoscope, title: 'Real doctors, too', text: 'Book a private consultation with a gynaecologist in the app' },
]

const supports = [
  { icon: Calendar, title: 'Cycle Insights', text: 'Understand your body better', tone: 'mint' },
  { icon: FileText, title: 'Symptom Guidance', text: 'Get clarity on what’s normal', tone: 'pink' },
  { icon: Heart, title: 'Self-Care Tips', text: 'Small steps for a healthier you', tone: 'lilac' },
  { icon: Pill, title: 'Product Recommendations', text: 'Find the right PIAX pad for your needs', tone: 'mint' },
  { icon: MessagesSquare, title: 'When to See a Doctor', text: 'Know when to seek professional help', tone: 'peach' },
  { icon: BookOpen, title: 'Wellness Tips', text: 'Food, movement and rest ideas for each phase', tone: 'blue' },
]

export default function AskAiSection() {
  return (
    <section className={section}>
      <Foliage art="sprigArch" className="bottom-4 -right-10 w-[clamp(110px,11vw,170px)] -scale-x-100 opacity-70 max-md:hidden" />
      <div className={cn(container, 'grid items-stretch gap-8 md:grid-cols-2 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.05fr)]')}>
        <div>
          <Tag>PIAX AI</Tag>
          <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(34px,3.4vw,46px)]')}>Ask without<br /><em className={accent}>awkwardness.</em></h2>
          <p className="mb-6 text-[15.5px]">Your personal period and wellness companion. Get trusted answers, personalized insights and support — anytime, in your language.</p>
          <ul className="mb-8 grid gap-4">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#b8d5ca] text-ink"><Icon size={20} strokeWidth={1.5} /></span>
                <div>
                  <strong className="block text-sm font-semibold text-ink">{title}</strong>
                  <small className="text-xs text-muted">{text}</small>
                </div>
              </li>
            ))}
          </ul>
          <a href={appLinks.web} target="_blank" rel="noopener" className={cn(btn.base, btn.solid, 'min-w-[230px]')}>Ask PIAX Now</a>
          <p className="mt-4 text-[11.5px] text-muted">{aiDisclaimer}</p>
        </div>

        <div className="relative flex items-center justify-center pt-8">
          <div className="relative">
            {/* Doodle bursts around the phone: top-right, left, lower-left and right, like the reference. */}
            <DoodleBurst className="absolute -top-2 -right-9 rotate-20 max-sm:hidden" />
            <DoodleBurst className="absolute top-[38%] -left-12 rotate-[-70deg] max-sm:hidden" />
            <DoodleBurst className="absolute -bottom-3 -left-8 rotate-200 max-sm:hidden" />
            <DoodleBurst className="absolute top-[52%] -right-12 rotate-100 max-sm:hidden" />
            <AiPhoneMockup className="mx-auto" />
          </div>
        </div>

        <div className="relative flex flex-col pt-2 md:col-span-full lg:col-span-1 lg:pt-12">
          <h3 className={cn(heading, 'mb-4 flex items-center gap-2 text-[19px]')}>
            <Sparkles size={24} className="text-brand" /> More than answers. <em className={accent}>Real support.</em>
          </h3>
          <div data-stagger className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-3">
            {supports.map(({ icon: Icon, title, text, tone }) => (
              <article key={title} className={cn('flex flex-col gap-1 rounded-[14px] p-4', tones[tone].bg)}>
                <span className={cn('mb-2 flex size-9 items-center justify-center rounded-full text-ink', tones[tone].accent)}><Icon size={22} strokeWidth={1.5} /></span>
                <strong className="text-[12.5px] font-semibold text-ink">{title}</strong>
                <small className="text-[11.5px] leading-[1.3] text-muted">{text}</small>
              </article>
            ))}
          </div>
          <div className="relative mt-4 flex items-center gap-4 rounded-2xl bg-[#e2f2ea] p-5">
            <ShieldCheck size={34} strokeWidth={1.4} className="shrink-0 text-brand" />
            <div>
              <strong className="block text-sm text-ink">Safe. Supportive. Always here.</strong>
              <small className="text-[11px] text-muted">PIAX AI is designed with your privacy, safety and well-being in mind.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
