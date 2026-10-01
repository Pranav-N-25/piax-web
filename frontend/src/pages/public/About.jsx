import { useRef } from 'react'
import {
  ArrowRight, BadgeCheck, BookOpen, BrainCircuit, ChartColumn, ChevronRight, Feather, Gem, Globe, Heart, Leaf, Lightbulb,
  Quote, Recycle, Rocket, Settings, Sprout, Target, Users, UsersRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import { DoodleNote, Foliage } from '../../components/home/HomeUi.jsx'
import { accent, btn, cn, container, eyebrow, h2, heading, poppinsPage, sectionPlain, tones } from '../../components/home/homeStyles.js'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { useMotion } from '../../hooks/useMotion.js'
import CountUp from '../../components/common/CountUp.jsx'
import { pads, standardPack } from '../../data/piaxRange.js'
import { commitments, differences, founder, impact, journey, pillars } from '../../data/aboutContent.js'
import heroPhoto from '../../assets/about/about-hero.webp'

const icons = {
  BadgeCheck, BookOpen, BrainCircuit, ChartColumn, Feather, Gem, Globe, Heart, Leaf, Lightbulb, Recycle, Rocket, Settings, Sprout, Target, Users, UsersRound,
}

// Entrance animation for an element (index.css, "Page motion"): the Business page's fade-up, after `delay` seconds.
const rise = (delay = 0) => ({ 'data-anim': '', style: { '--d': `${delay}s` } })

// Titles follow the home page format: bold sans in ink, with the closing phrase in brand green (`accent`).
const band = 'rounded-[28px] bg-[#f1f8f4] p-6 md:p-10'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(115deg,#eef8f4_0%,#e3f3ec_60%,#d4ece2_100%)]">
      <div className={cn(container, 'grid items-center gap-8 pt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-12')}>
        <div className="pb-4 lg:pb-16">
          <nav aria-label="Breadcrumb" {...rise()}>
            <ol className="flex items-center gap-1.5 text-[13px] text-muted">
              <li><Link to="/" className="hover:text-brand">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" className="font-medium text-ink">About</li>
            </ol>
          </nav>
          <p className={cn(eyebrow, 'mt-8')} {...rise(.1)}>About PIAX</p>
          <h1 className={cn(heading, 'mb-0 text-[clamp(36px,4.4vw,56px)]')} {...rise(.2)}>A healthier period<br /><em className={accent}>for a brighter tomorrow.</em></h1>
          <p className="mt-5 max-w-[520px] text-[17px] text-body" {...rise(.4)}>
            PIAX is a menstrual and wellness brand committed to better products, smarter technology and a more informed, confident generation of women.
          </p>
          <a href="#story" className={cn(btn.base, btn.solid, 'mt-8 hover:-translate-y-0.5')} {...rise(.55)}>Our Story <ArrowRight size={18} /></a>
        </div>
        <div className="relative self-end">
          <Foliage art="sprigArch" className="-top-4 -left-6 w-[clamp(90px,10vw,150px)] opacity-60 max-md:hidden" />
          <img
            src={heroPhoto}
            alt="A smiling woman relaxing at home"
            width="1200"
            height="900"
            fetchPriority="high"
            {...rise(.15)}
            className="relative mx-auto w-full max-w-[640px] rounded-t-[200px] object-cover xl:max-w-[500px]"
          />
          <DoodleNote className="-top-2 -right-6 hidden text-brand xl:block">Better periods.<br />Brighter futures.</DoodleNote>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section aria-label="Mission, vision, purpose and impact" className={cn(container, 'relative z-10 -mt-6 md:-mt-10')}>
      <ul className="grid gap-6 rounded-[28px] bg-white p-6 shadow-soft sm:grid-cols-2 md:p-8 lg:grid-cols-4 lg:gap-0">
        {pillars.map(({ icon, title, text }, index) => {
          const Icon = icons[icon]
          return (
            <li key={title} className={cn('group flex flex-col items-center px-4 text-center', index > 0 && 'lg:border-l lg:border-line')} {...rise(index * 0.12)}>
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand transition-[transform,background-color,color] duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white" {...rise(0.25 + index * 0.12)}><Icon size={26} strokeWidth={1.6} /></span>
              <h2 className={cn(heading, 'mt-4 text-[19px]')}>{title}</h2>
              <p className="mt-2 text-[13.5px] leading-[1.45] text-muted">{text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function FounderStory() {
  return (
    <section id="story" className={cn(sectionPlain, 'scroll-mt-20')} aria-labelledby="story-title">
      <div className={cn(container, 'grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)_minmax(0,.75fr)]')}>
        <div className="self-center" {...rise()}>
          <p className={eyebrow}>Founder’s story</p>
          <h2 id="story-title" className={h2}>Built from a <em className={accent}>real need.</em></h2>
          {founder.story.map((paragraph) => <p key={paragraph} className="mt-4 max-w-[520px] text-[15.5px] text-body">{paragraph}</p>)}
        </div>

        <figure {...rise(.15)} className="relative min-h-[320px] overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#dcefe6,#bcdccd)]">
          {founder.photo
            ? <img src={founder.photo} alt={`${founder.name}, ${founder.role} of PIAX`} className="absolute inset-0 size-full object-cover object-top" />
            : <span aria-hidden="true" className={cn(heading, 'absolute inset-0 flex items-center justify-center pb-16 text-[96px] text-brand/70')}>{founder.initials}</span>}
          <figcaption className="absolute inset-x-4 bottom-4 rounded-[14px] bg-white/90 px-4 py-3 text-[12.5px] text-muted backdrop-blur">
            <strong className="block text-[15px] text-ink">{founder.name}</strong>
            {founder.role}<br />{founder.company}
          </figcaption>
        </figure>

        <blockquote className="flex flex-col justify-center rounded-[24px] bg-[#e2f2ea] p-7" {...rise(.3)}>
          <Quote size={30} className="text-brand" aria-hidden="true" />
          <p className="mt-3 text-[17px] leading-[1.45] font-medium text-ink italic">“{founder.quote}”</p>
          <footer className="mt-6 flex items-center gap-3 text-[13px] text-muted">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            <span><strong className="block text-ink">{founder.name}</strong>{founder.role}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section aria-labelledby="impact-title" className={container}>
      <div className={cn(band, 'grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]')}>
        <div {...rise()}>
          <p className={eyebrow}>Our impact so far</p>
          <h2 id="impact-title" className={h2}>Small steps. <em className={accent}>Real change.</em></h2>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0">
          {impact.map(({ icon, value, label }, index) => {
            const Icon = icons[icon]
            return (
              <li key={label} className={cn('flex flex-col items-center px-3 text-center', index > 0 && 'md:border-l md:border-line')} {...rise(index * 0.12)}>
                <Icon size={30} strokeWidth={1.5} className="text-brand" aria-hidden="true" />
                <strong className="mt-3 text-[26px] font-bold text-ink tabular-nums"><CountUp value={value} /></strong>
                <span className="mt-1 text-[13px] leading-[1.35] text-muted">{label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Differences() {
  return (
    <section aria-labelledby="different-title" className={cn(container, 'mt-6 md:mt-8')}>
      <div className={cn(band, 'grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]')}>
        <div {...rise()}>
          <p className={eyebrow}>What makes PIAX different</p>
          <h2 id="different-title" className={h2}>More than <em className={accent}>a pad.</em></h2>
          <p className="mt-4 max-w-[420px] text-[15px] text-body">We combine thoughtful products, smarter technology and meaningful education to support women at every stage.</p>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {differences.map(({ icon, title, text, tone }, index) => {
            const Icon = icons[icon]
            return (
              <li key={title} className="group flex flex-col items-center text-center" {...rise(index * 0.12)}>
                <span className={cn('flex size-16 items-center justify-center rounded-full text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6', tones[tone].bg)} {...rise(0.2 + index * 0.12)}><Icon size={28} strokeWidth={1.5} /></span>
                <h3 className="mt-3 text-[15px] font-semibold leading-tight text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.4] text-muted">{text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section aria-labelledby="journey-title" className={sectionPlain}>
      <div className={cn(container, 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]')}>
        <div {...rise()}>
          <p className={eyebrow}>Our journey</p>
          <h2 id="journey-title" className={h2}>From an idea<br /><em className={accent}>to a movement.</em></h2>
          <p className="mt-4 text-[15px] text-body">Key milestones in building PIAX, and where we’re going next.</p>
        </div>
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute top-7 right-[12%] left-[12%] hidden border-t-2 border-dotted border-brand/40 lg:block" {...rise(.2)} />
          {journey.map(({ icon, year, title, text }, index) => {
            const Icon = icons[icon]
            return (
              <li key={year} className="relative" {...rise(0.2 + index * 0.3)}>
                <span className="relative flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand ring-8 ring-white" {...rise(0.3 + index * 0.3)}><Icon size={24} strokeWidth={1.6} /></span>
                <p className="mt-4 text-[15px] font-bold text-ink">{year}</p>
                <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.45] text-muted">{text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function Commitment() {
  return (
    <section aria-labelledby="commitment-title" className={container}>
      <div className="relative grid items-center gap-8 overflow-hidden rounded-[28px] bg-[linear-gradient(110deg,#eef8f4,#e0f2ea)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,.7fr)]">
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[380px]" aria-hidden="true" {...rise()}>
          {pads.slice(0, 3).map((pad, index) => (
            <img
              key={pad.id}
              src={standardPack(pad).image}
              alt=""
              loading="lazy"
              className={cn('absolute w-[62%] object-contain drop-shadow-[0_14px_24px_rgba(0,64,52,.15)]', ['left-0 top-0 -rotate-6', 'right-0 top-[8%] rotate-6', 'left-[18%] bottom-0'][index])}
            />
          ))}
        </div>
        <div {...rise()}>
          <p className={eyebrow}>Our commitment</p>
          <h2 id="commitment-title" className={h2}>Healthier women.<br /><em className={accent}>A kinder future.</em></h2>
          <p className="mt-4 max-w-[520px] text-[15px] text-body">
            We are committed to menstrual care that is comfortable, honest and considerate of the planet. We only make product claims that testing supports, and we are working towards more responsible materials and packaging.
          </p>
          <Link to="/products" className={cn(btn.base, btn.solid, 'mt-6')}>Explore PIAX Products <ArrowRight size={18} /></Link>
        </div>
        <ul className="grid gap-4">
          {commitments.map(({ icon, text }, index) => {
            const Icon = icons[icon]
            return <li key={text} className="flex items-center gap-3 text-[14px] text-ink" {...rise(0.2 + index * 0.1)}><Icon size={22} strokeWidth={1.5} className="shrink-0 text-brand" aria-hidden="true" />{text}</li>
          })}
        </ul>
      </div>
    </section>
  )
}

// /about: who PIAX is, from the About page reference design.
export default function About() {
  usePageMeta('About PIAX — Comfort. Care. Confidence.', 'PIAX is a menstrual and wellness brand from PIAX LIFE PRIVATE LIMITED, combining thoughtful pads, the PIAX app and clear education to help women feel confident through their periods.')
  const mainRef = useRef(null)
  useMotion(mainRef)

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-white text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main ref={mainRef}>
        <Hero />
        <Pillars />
        <FounderStory />
        <Impact />
        <Differences />
        <Journey />
        <Commitment />
        <AppBanner />
      </main>
      <HomeFooter />
    </div>
  )
}
