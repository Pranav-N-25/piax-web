import { Brain, Droplet, Dumbbell, Globe, GraduationCap, Heart, Leaf, MessageSquareText, ShieldCheck, Users } from 'lucide-react'
import { DoodleNote, Foliage, PillLink, RoundArrow, Tag } from './HomeUi.jsx'
import { barIcon, barStrong, barText, cn, container, h2, iconRow, iconRowIcon, iconRowItem, section, accent, tile, tileText, tileTitle, tones } from './homeStyles.js'
import learnWoman from '../../assets/24_need_first_period_photo.png'

const perks = [
  { icon: GraduationCap, text: <>Expert-backed<br />content</> },
  { icon: Heart, text: <>Simple &amp;<br />judgement-free</> },
  { icon: Users, text: <>For every stage<br />of your journey</> },
  { icon: Globe, text: <>Available in<br />English &amp; தமிழ்</> },
]

const topics = [
  { icon: Droplet, title: <>Understanding<br />Periods</>, text: 'The basics, explained simply.', tone: 'pink' },
  { icon: Heart, title: 'Your Body & Health', text: 'Hormones, symptoms, conditions and more.', tone: 'mint' },
  { icon: Brain, title: 'Mental Wellbeing', text: 'Mood, stress, self-care and confidence.', tone: 'lilac' },
  { icon: Dumbbell, title: 'Lifestyle & Nutrition', text: 'Tips for a healthier, happier you.', tone: 'cream' },
  { icon: Users, title: 'Myths vs Facts', text: 'Let’s bust the myths together.', tone: 'mint' },
  { icon: MessageSquareText, title: 'Real Stories', text: 'Women. Real journeys. Real strength.', tone: 'blue' },
]

const notes = [
  { icon: Users, title: 'For every woman', text: 'Teens, working professionals, mothers — and everyone in between.' },
  { icon: ShieldCheck, title: 'Trusted information', text: 'Reviewed by healthcare experts.' },
  { icon: Leaf, title: 'A healthier, more confident you', text: 'Knowledge that empowers.' },
]

export default function LearnSection() {
  return (
    <section className={section}>
      <Foliage art="shadowFrond" className="-top-8 -right-20 w-[clamp(200px,20vw,320px)] -scale-x-100 opacity-70 max-md:hidden" />
      <div className={cn(container, 'flex flex-col')}>
        <div className="grid flex-1 items-stretch gap-8 md:grid-cols-2 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.05fr)]">
          <div>
            <Tag>Learn</Tag>
            <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(32px,3vw,42px)]')}>Knowledge today.<br /><em className={accent}>A brighter tomorrow.</em></h2>
            <p className="mb-8">Periods are natural, and so are your questions. Explore expert-backed, easy-to-understand resources on menstrual health, wellness and more — in English and தமிழ்.</p>
            <PillLink to="/learn">Explore All Articles</PillLink>
            <ul className={cn(iconRow, 'mt-8')}>
              {perks.map(({ icon: Icon, text }, index) => (
                <li key={index} className={iconRowItem}><span className={iconRowIcon}><Icon size={22} strokeWidth={1.5} /></span>{text}</li>
              ))}
            </ul>
          </div>

          <div data-stagger className="grid grid-cols-2 gap-3 rounded-[18px] bg-white/55 p-3 md:grid-cols-3">
            {topics.map(({ icon: Icon, title, text, tone }) => (
              <article key={text} className={cn(tile, 'min-h-[150px]', tones[tone].bg)}>
                <Icon size={34} strokeWidth={1.5} className={cn('brightness-70 saturate-300', tones[tone].icon)} />
                <h4 className={tileTitle}>{title}</h4>
                <p className={tileText}>{text}</p>
                <RoundArrow to="/learn" label="Read more" className="size-[34px] bg-white" />
              </article>
            ))}
          </div>

          <div className="hidden lg:block">
            <img src={learnWoman} alt="Young woman smiling while holding her notebook" loading="lazy" decoding="async" className="h-full min-h-[360px] w-full rounded-tl-[200px] object-cover object-[55%_center]" />
          </div>
        </div>

        <div className="relative mt-10 flex justify-center">
          <DoodleNote arrow="right" className="top-3 left-0 hidden text-xl min-[1400px]:block">Curious minds create<br />healthier tomorrows.</DoodleNote>
          <ul className="flex max-w-[760px] flex-col gap-4 rounded-[18px] bg-white px-6 py-5 shadow-soft md:flex-row md:gap-0">
            {notes.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className={cn('flex w-full flex-1 items-center gap-3 md:w-auto md:px-4', index > 0 && 'md:border-l md:border-line')}>
                <Icon size={34} strokeWidth={1.4} className={barIcon} />
                <span className={barText}><strong className={cn(barStrong, 'text-brand-2')}>{title}</strong>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
