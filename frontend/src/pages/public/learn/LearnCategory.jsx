import { useMemo, useRef, useState } from 'react'
import { ChevronDown, LayoutGrid, List } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import HomeHeader from '../../../components/home/HomeHeader.jsx'
import HomeFooter from '../../../components/home/HomeFooter.jsx'
import { AskPiax, ArticleCard, CategoryNav, LearnHero, LearnIcon, Pagination } from '../../../components/learn/LearnUi.jsx'
import { cn, container, poppinsPage, tones } from '../../../components/home/homeStyles.js'
import { usePageMeta } from '../../../hooks/usePageMeta.js'
import { useMotion } from '../../../hooks/useMotion.js'
import { articlesIn, categories, categoryBySlug } from '../../../data/learn/index.js'

const PER_PAGE = 9

// Suggested questions for the Ask PIAX banner, per category.
const prompts = {
  'first-period': ['What age do periods start?', 'What should I carry to school?'],
  'menstrual-cycle': ['Is a short cycle normal?', 'When do I ovulate?'],
  'period-care': ['How often should I change a pad?', 'Which pad for night?'],
  'flow-products': ['Is my flow heavy?', 'Which pad size should I use?'],
  'period-pain': ['How can I ease cramps?', 'When is period pain not normal?'],
  'pms-symptoms': ['What is PMS?', 'Why do I feel low before my period?'],
  hygiene: ['How do I dispose of pads?', 'Is it safe to bathe on my period?'],
  'myths-facts': ['Can I exercise on my period?', 'Is period blood dirty?'],
}

// /learn (all topics) and /learn/:category — the education hub and its category pages.
// Keyed by category so filters, sort and page reset when moving between categories.
export default function LearnCategory() {
  const { category } = useParams()
  return <LearnCategoryPage key={category ?? 'all'} />
}

function LearnCategoryPage() {
  const { category: slug } = useParams()
  const category = slug ? categoryBySlug[slug] : null
  const mainRef = useRef(null)
  useMotion(mainRef)
  const [topic, setTopic] = useState('All')
  const [sort, setSort] = useState('latest')
  const [layout, setLayout] = useState(slug === 'menstrual-cycle' ? 'list' : 'grid')
  const [page, setPage] = useState(1)
  const listTop = useRef(null)

  usePageMeta(
    category ? `${category.name} | PIAX Learn` : 'PIAX Learn — Period & menstrual health guides',
    category ? category.description : 'Clear, judgement-free guides on periods, the menstrual cycle, period care, pain, PMS, hygiene and myths.',
  )

  const all = useMemo(() => articlesIn(slug), [slug])
  const topics = category ? category.topics : categories.map((item) => item.name)
  const count = (name) => all.filter((article) => (category ? article.topic === name : categoryBySlug[article.category].name === name)).length
  const filtered = useMemo(() => {
    const list = topic === 'All' ? all : all.filter((article) => (category ? article.topic === topic : categoryBySlug[article.category].name === topic))
    return [...list].sort((a, b) => (sort === 'quick' ? a.minutes - b.minutes : sort === 'az' ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)))
  }, [all, topic, sort, category])
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  if (slug && !category) return <Navigate to="/learn" replace />

  const chooseTopic = (name) => { setTopic(name); setPage(1) }
  const changePage = (next) => { setPage(next); listTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const related = categories.filter((item) => item.slug !== slug).slice(0, 6)

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-mist text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main ref={mainRef}>
        <LearnHero category={category} />
        <CategoryNav />

        <div className={cn(container, 'py-10 md:py-14')}>
          <div ref={listTop} id="articles" className="grid scroll-mt-28 gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="grid content-start gap-8">
              <nav aria-label={`Topics in ${category?.name ?? 'Learn'}`}>
                <h2 className="mb-3 text-[14px] font-semibold text-ink">{category ? `Topics in ${category.name}` : 'Filter by topic'}</h2>
                <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:gap-0.5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
                  {['All', ...topics].map((name) => {
                    const on = topic === name
                    return (
                      <li key={name} className="shrink-0">
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => chooseTopic(name)}
                          className={cn('flex w-full cursor-pointer items-center justify-between gap-4 rounded-full px-4 py-2 text-left text-[13.5px] transition-colors lg:rounded-none lg:border-l-2 lg:px-3', on ? 'bg-brand-soft font-semibold text-brand lg:border-brand' : 'bg-white text-body hover:text-ink lg:border-transparent lg:bg-transparent')}
                        >
                          {name === 'All' ? 'All articles' : name}
                          <span className="tabular-nums text-muted">{name === 'All' ? all.length : count(name)}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Opens the category at its article list, where the reader already is, not at the top of the page. */}
              <nav aria-label="Related topics" className="max-lg:hidden">
                <h2 className="mb-3 text-[14px] font-semibold text-ink">{category ? 'Related topics' : 'Browse by category'}</h2>
                <ul className="grid gap-2.5">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/learn/${item.slug}#articles`} className="group flex items-center gap-3 text-[13.5px] text-body hover:text-brand">
                        <span className={cn('flex size-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105', tones[item.tone].bg)}><LearnIcon name={item.icon} size={20} strokeWidth={1.6} className="text-brand" /></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <section aria-labelledby="articles-title" className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 id="articles-title" className="text-[14px] font-semibold text-ink" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</h2>
                <div className="flex items-center gap-2">
                  <div role="group" aria-label="Layout" className="flex rounded-full bg-white p-1 shadow-soft">
                    {[['grid', LayoutGrid, 'Grid'], ['list', List, 'List']].map(([value, Icon, label]) => (
                      <button key={value} type="button" aria-pressed={layout === value} aria-label={`${label} view`} onClick={() => setLayout(value)} className={cn('flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors', layout === value ? 'bg-brand text-white' : 'text-muted hover:text-ink')}><Icon size={16} /></button>
                    ))}
                  </div>
                  <label className="relative flex items-center gap-2 text-[13px] text-muted">
                    Sort by
                    <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 cursor-pointer appearance-none rounded-full border border-line bg-white pr-9 pl-4 text-[13px] font-semibold text-ink">
                      <option value="latest">Latest</option>
                      <option value="quick">Quickest reads</option>
                      <option value="az">A–Z</option>
                    </select>
                    <ChevronDown size={15} className="pointer-events-none absolute right-3 text-ink" />
                  </label>
                </div>
              </div>

              <div key={`${topic}-${sort}-${layout}-${page}`} className={layout === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-4'}>
                {shown.map((article, index) => <ArticleCard key={article.slug} article={article} layout={layout} index={index} />)}
              </div>
              <Pagination page={page} pages={pages} onChange={changePage} />
            </section>
          </div>

          <div className="mt-14">
            <AskPiax prompts={prompts[slug] ?? ['How often should I change a pad?', 'Is it normal to have cramps?', 'What is PMS?', 'Which pad size should I use?']} />
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  )
}
