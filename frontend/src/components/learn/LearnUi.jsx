import { useState } from 'react'
import {
  Activity, ArrowRight, BookOpen, Bot, ChevronRight, CircleHelp, Clock, Crosshair, Droplet, Droplets, Feather, FileText,
  Flower2, Hand, Heart, LayoutGrid, Leaf, Moon, Package, RefreshCw, Search, ShieldCheck, Shrink, Smile, Sprout, Sun,
  Trash2, Waves, Zap,
} from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DoodleNote, Foliage } from '../home/HomeUi.jsx'
import { accent, btn, cn, container, eyebrow, heading, tones } from '../home/homeStyles.js'
import { appLinks } from '../../data/appFeatures.js'
import { articlePath, categories, categoryBySlug, formatDate, learnPromises } from '../../data/learn/index.js'

const icons = {
  Activity, BookOpen, CircleHelp, Crosshair, Droplet, Droplets, Feather, FileText, Flower2, Hand, Heart, LayoutGrid, Leaf,
  Moon, Package, RefreshCw, ShieldCheck, Shrink, Smile, Sprout, Sun, Trash2, Waves, Zap,
}
export const LearnIcon = ({ name, ...props }) => {
  const Icon = icons[name] ?? BookOpen
  return <Icon aria-hidden="true" {...props} />
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
        {items.map(({ label, to }, index) => (
          <li key={label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {to ? <Link to={to} className="hover:text-brand">{label}</Link> : <span aria-current="page" className="font-medium text-ink">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Category (or hub) header: title, description, promises and the category photo.
export function LearnHero({ category }) {
  const title = category ? category.name : 'PIAX Learn'
  const words = title.split(' ')
  return (
    <header className="relative overflow-hidden bg-[linear-gradient(115deg,#eef8f4_0%,#e3f3ec_60%,#d4ece2_100%)]">
      <div className={cn(container, 'grid items-center gap-8 pt-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]')}>
        <div className="pb-6 lg:pb-14" data-anim>
          <Breadcrumbs items={category ? [{ label: 'Home', to: '/' }, { label: 'Learn', to: '/learn' }, { label: category.name }] : [{ label: 'Home', to: '/' }, { label: 'Learn' }]} />
          <p className={cn(eyebrow, 'mt-7')}>{category ? 'Menstrual care' : 'Education hub'}</p>
          <h1 className={cn(heading, 'text-[clamp(36px,4.4vw,56px)]')}>
            {words.length > 1 ? <>{words.slice(0, -1).join(' ')} <em className={accent}>{words.at(-1)}</em></> : <em className={accent}>{title}</em>}
          </h1>
          <p className="mt-4 max-w-[540px] text-[17px]">{category ? category.description : 'Clear, judgement-free guides on periods, your cycle, care and comfort — written in plain language.'}</p>
          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
            {learnPromises.map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-[13px] text-ink"><LearnIcon name={icon} size={22} strokeWidth={1.5} className="text-brand" />{text}</li>
            ))}
          </ul>
        </div>
        <div className="relative self-end max-lg:hidden" data-anim style={{ '--d': '.15s' }}>
          <Foliage art="sprigArch" className="-top-4 -left-4 w-[clamp(90px,9vw,140px)] opacity-60" />
          <img src={(category ?? categories[0]).image} alt="" className="relative ml-auto h-[340px] w-full max-w-[520px] rounded-t-[200px] object-cover object-[center_25%]" />
          {category?.note && <DoodleNote className="bottom-10 -left-24 hidden max-w-[180px] text-brand xl:block">{category.note}</DoodleNote>}
        </div>
      </div>
    </header>
  )
}

// Icon tabs for "All topics" and the eight categories.
export function CategoryNav() {
  // Every icon sits on the same mint circle; the active category's circle turns white on its highlighted tab.
  const items = [{ slug: '', name: 'All Topics', icon: 'LayoutGrid' }, ...categories]
  return (
    <nav aria-label="Learn categories" className="relative z-10 -mt-1 border-b border-line bg-white/80 backdrop-blur">
      <ul className={cn(container, '-mb-px flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-between')}>
        {items.map(({ slug, name, icon }) => (
          <li key={name} className="shrink-0">
            <NavLink
              to={slug ? `/learn/${slug}` : '/learn'}
              end
              className={({ isActive }) => cn('flex w-[104px] flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center text-[12.5px] font-medium transition-colors', isActive ? 'bg-brand-soft font-semibold text-brand' : 'text-body hover:bg-mist hover:text-ink')}
            >
              {({ isActive }) => (
                <>
                  <span className={cn('flex size-11 items-center justify-center rounded-full transition-colors', isActive ? 'bg-white' : 'bg-brand-soft')}><LearnIcon name={icon} size={22} strokeWidth={1.6} className="text-brand" /></span>
                  {name}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Article card with an illustrated header in the category's colour (layout: grid card or wide list row).
export function ArticleCard({ article, layout = 'grid', index = 0 }) {
  const category = categoryBySlug[article.category]
  const list = layout === 'list'
  return (
    <article data-anim style={{ '--d': `${(index % 3) * 0.08}s` }} className={cn('group relative overflow-hidden rounded-[20px] bg-white shadow-soft transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(15,60,50,.3)]', list && 'grid grid-cols-[120px_minmax(0,1fr)] sm:grid-cols-[160px_minmax(0,1fr)]')}>
      <div aria-hidden="true" className={cn('relative flex items-center justify-center overflow-hidden', tones[category.tone].bg, list ? 'h-full min-h-[120px]' : 'aspect-[16/9]')}>
        <span className="absolute -right-6 -bottom-8 size-28 rounded-full bg-white/40" />
        <span className="absolute -top-6 -left-6 size-20 rounded-full bg-white/30" />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-white/85 shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <LearnIcon name={category.icon} size={30} strokeWidth={1.5} className="text-brand" />
        </span>
      </div>
      <div className="flex flex-col p-4">
        <span className="w-fit rounded-md bg-brand-soft px-2 py-0.5 text-[10.5px] font-semibold tracking-[.06em] text-brand uppercase">{article.topic}</span>
        <h3 className="mt-2 text-[15.5px] leading-snug font-semibold text-ink">
          <Link to={articlePath(article)} className="after:absolute after:inset-0 group-hover:text-brand">{article.title}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] text-muted">{article.excerpt}</p>
        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-muted"><Clock size={13} aria-hidden="true" /> {article.minutes} min read · {formatDate(article.date)}</p>
      </div>
    </article>
  )
}

export function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const go = (next) => () => onChange(Math.min(pages, Math.max(1, next)))
  const button = 'flex size-10 cursor-pointer items-center justify-center rounded-full text-[14px] font-semibold transition-colors disabled:cursor-default disabled:opacity-40'
  return (
    <nav aria-label="Pages" className="mt-10 flex items-center justify-center gap-2">
      <button type="button" onClick={go(page - 1)} disabled={page === 1} aria-label="Previous page" className={cn(button, 'text-brand hover:bg-brand-soft')}>←</button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
        <button key={number} type="button" onClick={go(number)} aria-current={number === page ? 'page' : undefined} className={cn(button, number === page ? 'bg-brand text-white' : 'text-ink hover:bg-brand-soft')}>{number}</button>
      ))}
      <button type="button" onClick={go(page + 1)} disabled={page === pages} aria-label="Next page" className={cn(button, 'text-brand hover:bg-brand-soft')}>→</button>
    </nav>
  )
}

// "Ask PIAX": searches the site's own answers; PIAX AI itself lives in the app.
export function AskPiax({ prompts = [], compact = false }) {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const ask = (text) => {
    const q = text.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }
  if (compact) {
    return (
      <aside className="rounded-[22px] bg-[#e2f2ea] p-6">
        <p className="text-[13px] font-semibold text-brand">Have a question?</p>
        <h3 className={cn(heading, 'mt-1 text-[24px]')}>Ask PIAX</h3>
        <p className="mt-2 text-[13px] text-muted">Simple, judgement-free answers to your menstrual health questions.</p>
        <a href={appLinks.web} target="_blank" rel="noopener" className={cn(btn.base, btn.outline, btn.small, 'mt-4')}>Ask PIAX AI <ArrowRight size={16} /></a>
      </aside>
    )
  }
  return (
    <section aria-labelledby="ask-title" className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(110deg,#eef8f4,#dff1e8)] p-7 md:p-10" data-anim>
      <Foliage art="sprigRound" className="-right-6 -bottom-6 w-[clamp(90px,10vw,150px)] opacity-60 max-md:hidden" />
      <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)]">
        <div>
          <p className={eyebrow}>Have a question?</p>
          <h2 id="ask-title" className={cn(heading, 'text-[clamp(30px,3vw,42px)]')}>Ask <em className={accent}>PIAX</em></h2>
          <p className="mt-2 text-[15px]">Get simple, trusted and judgement-free answers to your menstrual health questions.</p>
        </div>
        <div>
          <form role="search" onSubmit={(event) => { event.preventDefault(); ask(question) }} className="flex h-13 items-center gap-2 rounded-full bg-white pr-1.5 pl-5 shadow-soft focus-within:shadow-[0_0_0_4px_rgba(0,127,109,.12)]">
            <Search size={19} className="shrink-0 text-muted" aria-hidden="true" />
            <label className="sr-only" htmlFor="ask-piax">Type your question</label>
            <input id="ask-piax" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Type your question here…" className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none" />
            <button type="submit" aria-label="Ask" className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand text-white hover:bg-[#006a5b]"><ArrowRight size={18} /></button>
          </form>
          {prompts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => ask(prompt)} className="cursor-pointer rounded-full bg-white/80 px-3.5 py-1.5 text-[12.5px] text-ink transition-colors hover:bg-white hover:text-brand">{prompt}</button>
              ))}
            </div>
          )}
          <a href={appLinks.web} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand hover:underline"><Bot size={16} /> Or ask PIAX AI in the app</a>
        </div>
      </div>
    </section>
  )
}
