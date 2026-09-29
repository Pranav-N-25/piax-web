import { BookOpen, Calendar, FileText, Heart, Languages, Lock, MessageCircle, MessagesSquare, Pill, ShieldCheck, Sparkles } from 'lucide-react'
import { PillLink, Tag } from './HomeUi.jsx'
import { cn, container, h2, heading, section, accent, tones } from './homeStyles.js'
import AiPhoneMockup from './AiPhoneMockup.jsx'

const features = [
  { icon: MessageCircle, title: 'Evidence-based answers', text: 'Trusted, clinician-reviewed information' },
  { icon: Lock, title: 'Private and confidential', text: 'Your data stays yours' },
  { icon: Heart, title: 'Personalized to you', text: 'Answers that consider your cycle, symptoms and lifestyle' },
  { icon: Languages, title: 'Available in English & தமிழ்', text: 'Talk in the language you’re comfortable with' },
]

const questionsLeft = [
  ['Is this normal?', 'pink'],
  ['My period is late. Should I worry?', 'lilac'],
  ['What’s the best pad for heavy flow?', 'pink'],
  ['Can I exercise during my period?', 'lilac'],
]
const questionsRight = [
  ['Why do I get mood swings?', 'pink'],
  ['How can I reduce period cramps?', 'lilac'],
  ['What’s a healthy cycle length?', 'lilac'],
  ['Is spotting normal?', 'pink'],
]

const supports = [
  { icon: Calendar, title: 'Cycle Insights', text: 'Understand your body better', tone: 'mint' },
  { icon: FileText, title: 'Symptom Guidance', text: 'Get clarity on what’s normal', tone: 'pink' },
  { icon: Heart, title: 'Self-Care Tips', text: 'Small steps for a healthier you', tone: 'lilac' },
  { icon: Pill, title: 'Product Recommendations', text: 'Find the right PIAX pad for your needs', tone: 'mint' },
  { icon: MessagesSquare, title: 'When to See a Doctor', text: 'Know when to seek professional help', tone: 'peach' },
  { icon: BookOpen, title: 'Trusted Resources', text: 'Backed by experts, always', tone: 'blue' },
]

const bubble = 'rounded-[14px] px-4 py-3 text-xs leading-[1.3] text-ink shadow-soft'

export default function AskAiSection() {
  return (
    <section className={section}>
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
          <PillLink to="/ai" className="min-w-[230px]">Ask PIAX Now</PillLink>
          <p className="mt-4 text-[11.5px] text-muted">Not a replacement for a doctor. For educational support only.</p>
        </div>

        <div className="relative grid items-center justify-items-center gap-4 pt-8 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch">
          <div className="hidden gap-6 md:grid">
            {questionsLeft.map(([text, tone], index) => (
              <span key={text} className={cn(bubble, tones[tone].bg, index % 2 === 0 && 'translate-x-3')}>{text}</span>
            ))}
          </div>
          <AiPhoneMockup className="mx-auto" />
          <div className="hidden gap-6 md:grid">
            {questionsRight.map(([text, tone], index) => (
              <span key={text} className={cn(bubble, tones[tone].bg, index % 2 === 1 && '-translate-x-2.5')}>{text}</span>
            ))}
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
