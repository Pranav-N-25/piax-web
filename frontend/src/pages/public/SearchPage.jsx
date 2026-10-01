import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Search, SearchX } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { btn, cn, container, eyebrow, h2, accent, poppinsPage, sectionPlain } from '../../components/home/homeStyles.js'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { popularSearches, searchIndex } from '../../data/searchIndex.js'
import { search } from '../../utils/search.js'

const groupOrder = ['Pad', 'Pack', 'Article', 'Page', 'FAQ', 'PIAX app']
const groupTitles = { Pad: 'Pads', Pack: 'Pack sizes', Article: 'Guides & articles', Page: 'Pages', FAQ: 'Questions', 'PIAX app': 'In the PIAX app' }

function Result({ entry }) {
  const body = (
    <>
      {entry.image
        ? <img src={entry.image} alt="" className="size-16 shrink-0 rounded-xl bg-[#f1f7f4] object-contain" />
        : <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Search size={22} /></span>}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-ink group-hover:text-brand">{entry.title}</span>
        <span className="mt-1 line-clamp-2 block text-[13px] text-muted">{entry.text}</span>
      </span>
      {entry.href ? <ExternalLink size={18} className="shrink-0 text-brand" aria-label="Opens the PIAX app" /> : <ArrowRight size={18} className="shrink-0 text-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />}
    </>
  )
  const card = 'group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(15,60,50,.3)]'
  return entry.href
    ? <a href={entry.href} target="_blank" rel="noopener" className={card}>{body}</a>
    : <Link to={entry.to} className={card}>{body}</Link>
}

// /search?q=… — every match from the header search, grouped by kind.
export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const [draft, setDraft] = useState(query)
  const inputRef = useRef(null)
  usePageMeta(query ? `Search: ${query} | PIAX` : 'Search | PIAX', 'Search PIAX pads, pack sizes, questions and app features.')

  useEffect(() => { setDraft(query) }, [query])
  useEffect(() => { if (!query) inputRef.current?.focus() }, [query])

  const results = useMemo(() => search(searchIndex, query), [query])
  const groups = groupOrder.map((type) => ({ type, items: results.filter((entry) => entry.type === type) })).filter((group) => group.items.length)
  const run = (q) => setParams(q.trim() ? { q: q.trim() } : {})

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-mist text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main className={sectionPlain}>
        <div className={cn(container, 'max-w-[960px]')}>
          <p className={eyebrow}>Search</p>
          <h1 className={h2}>{query ? <>Results for <em className={accent}>“{query}”</em></> : <>What are you <em className={accent}>looking for?</em></>}</h1>

          <form role="search" onSubmit={(event) => { event.preventDefault(); run(draft) }} className="mt-6 flex gap-3">
            <label className="flex h-13 min-w-0 flex-1 items-center gap-3 rounded-full border border-[#dfe8e3] bg-white px-5 shadow-soft focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(0,127,109,.1)]">
              <Search size={20} className="shrink-0 text-brand" aria-hidden="true" />
              <span className="sr-only">Search PIAX</span>
              <input ref={inputRef} type="search" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Pads, sizes, or your questions…" enterKeyHint="search" className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none" />
            </label>
            <button type="submit" className={cn(btn.base, btn.solid, 'h-13')}>Search</button>
          </form>

          {query && (
            <p className="mt-6 text-[14px] text-muted" aria-live="polite">
              {results.length ? <><strong className="text-ink">{results.length}</strong> {results.length === 1 ? 'result' : 'results'}</> : 'No results'}
            </p>
          )}

          {query && results.length === 0 && (
            <div role="status" className="mt-6 flex flex-col items-center rounded-[22px] bg-white px-6 py-12 text-center shadow-soft">
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand"><SearchX size={26} strokeWidth={1.6} /></span>
              <h2 className="mt-4 text-lg font-semibold text-ink">Nothing matched “{query}”.</h2>
              <p className="mt-1.5 max-w-95 text-sm text-muted">Try a size, a flow or a question, or let the quiz pick a pad for you.</p>
              <Link to="/find-my-pad" className={cn(btn.base, btn.solid, btn.small, 'mt-5')}>Take the Find My Pad quiz</Link>
            </div>
          )}

          {groups.map(({ type, items }) => (
            <section key={type} aria-labelledby={`results-${type}`} className="mt-10">
              <h2 id={`results-${type}`} className="mb-4 text-[13px] font-semibold tracking-[.16em] text-brand uppercase">{groupTitles[type]}</h2>
              <div className="grid gap-3">{items.map((entry) => <Result key={entry.id} entry={entry} />)}</div>
            </section>
          ))}

          {(!query || results.length === 0) && (
            <div className="mt-10">
              <p className="mb-3 text-[13px] font-semibold text-ink">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button key={term} type="button" onClick={() => run(term)} className="h-10 cursor-pointer rounded-full border border-line bg-white px-4 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand">{term}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <HomeFooter />
    </div>
  )
}
