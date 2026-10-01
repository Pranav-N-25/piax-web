import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { popularSearches, searchIndex } from '../../data/searchIndex.js'
import { search } from '../../utils/search.js'
import { cn } from '../common/ui.js'

const LIMIT = 6

// Opens a result: site pages through the router, the PIAX web app in a new tab.
export function useOpenResult() {
  const navigate = useNavigate()
  return (entry) => {
    if (entry.href) window.open(entry.href, '_blank', 'noopener')
    else navigate(entry.to)
  }
}

// Header search (combobox): suggestions while typing, ↑/↓ to move, Enter to open, Escape to close.
// Enter with nothing highlighted shows every result on /search.
export default function HeaderSearch({ className = '' }) {
  const navigate = useNavigate()
  const { pathname, search: locationSearch } = useLocation()
  const openResult = useOpenResult()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const listId = useId()
  const rootRef = useRef(null)
  const inputRef = useRef(null)

  const results = useMemo(() => search(searchIndex, query, LIMIT), [query])
  const showList = open && query.trim().length > 0

  // Clear and close after moving to another page.
  useEffect(() => {
    setOpen(false)
    setActive(-1)
  }, [pathname, locationSearch])

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const choose = (entry) => {
    setOpen(false)
    setQuery('')
    inputRef.current?.blur()
    openResult(entry)
  }

  const submit = (event) => {
    event.preventDefault()
    const q = query.trim()
    if (active >= 0 && results[active]) return choose(results[active])
    if (!q) return inputRef.current?.focus()
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown' && showList) {
      event.preventDefault()
      setActive((index) => (index + 1) % Math.max(results.length, 1))
    } else if (event.key === 'ArrowUp' && showList) {
      event.preventDefault()
      setActive((index) => (index <= 0 ? results.length - 1 : index - 1))
    } else if (event.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    }
  }

  return (
    <form ref={rootRef} role="search" onSubmit={submit} className={cn('relative', className)}>
      <label className="flex min-h-10 w-full items-center gap-2.5 rounded-full border border-[#dfe8e3] bg-[#f5f8f6] px-4 text-ink transition-[border-color,box-shadow] focus-within:border-brand focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,127,109,.1)]">
        <Search size={20} aria-hidden="true" />
        <span className="sr-only">Search PIAX</span>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
          value={query}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); setActive(-1) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search pads, sizes, or your questions..."
          autoComplete="off"
          enterKeyHint="search"
          className="w-full min-w-0 bg-transparent text-[13px] outline-none [&::-webkit-search-cancel-button]:hidden"
        />
      </label>

      {showList && (
        <div className="motion-drop absolute top-full right-0 left-0 z-40 mt-2 min-w-[320px] overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-12px_rgba(15,60,50,.35)] ring-1 ring-line">
          <ul id={listId} role="listbox" aria-label="Search suggestions" className="max-h-[60vh] overflow-y-auto p-2">
            {results.map((entry, index) => (
              <li
                key={entry.id}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(entry)}
                onMouseEnter={() => setActive(index)}
                className={cn('flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5', index === active && 'bg-mist')}
              >
                {entry.image
                  ? <img src={entry.image} alt="" className="size-10 shrink-0 rounded-lg bg-[#f1f7f4] object-contain" />
                  : <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand"><Search size={16} /></span>}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-semibold text-ink">{entry.title}</span>
                  <span className="block truncate text-[12px] text-muted">{entry.text}</span>
                </span>
                <span className="shrink-0 rounded-full bg-[#eef5f1] px-2 py-0.5 text-[10.5px] font-semibold text-brand">{entry.type}</span>
              </li>
            ))}
            {results.length === 0 && (
              <li role="option" aria-selected="false" aria-disabled="true" className="px-3 py-3 text-[13px] text-muted">
                No matches for “{query.trim()}”. Try {popularSearches.slice(0, 3).join(', ')}.
              </li>
            )}
          </ul>
          <button type="submit" className="flex w-full cursor-pointer items-center justify-between border-t border-line px-5 py-3 text-[13px] font-semibold text-brand hover:bg-mist">
            See all results for “{query.trim()}” <ArrowRight size={16} />
          </button>
        </div>
      )}
    </form>
  )
}
