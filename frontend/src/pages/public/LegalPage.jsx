import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronRight, FileText, Info, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { accent, cn, container, eyebrow, h2, poppinsPage, sectionPlain } from '../../components/home/homeStyles.js'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { legalPages } from '../../data/legal.js'

// The section currently being read, for the contents list: the last section whose top has passed a reading line
// just below the sticky header (a quarter of the way down short screens). At the very bottom of the page the last
// section wins, even if it is too short to reach that line. Recomputed once per frame while scrolling or resizing.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = Math.min(window.innerHeight * 0.25, 160) + 96
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = ids[0]
      for (const id of ids) {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= line) current = id
      }
      setActive(atBottom ? ids[ids.length - 1] : current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])
  return active
}

// /terms and /privacy: long-form legal text with a sticky contents list on desktop.
export default function LegalPage({ page: key }) {
  const page = legalPages[key]
  const other = key === 'terms' ? legalPages.privacy : legalPages.terms
  usePageMeta(`${page.title} | PIAX`, page.lead)
  const ids = useMemo(() => page.sections.map((section) => section.id), [page])
  const active = useActiveSection(ids)
  const Icon = key === 'privacy' ? ShieldCheck : FileText

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-mist text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main>
        <header className="bg-[linear-gradient(115deg,#eef8f4_0%,#e3f3ec_60%,#d4ece2_100%)]">
          <div className={cn(container, 'py-10 md:py-14')}>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-[13px] text-muted">
                <li><Link to="/" className="hover:text-brand">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li aria-current="page" className="font-medium text-ink">{page.title}</li>
              </ol>
            </nav>
            <p className={cn(eyebrow, 'mt-8 flex items-center gap-2')}><Icon size={14} /> Legal</p>
            <h1 className={cn(h2, 'text-[clamp(34px,4vw,52px)]')}>{page.title.split(' ')[0]} <em className={accent}>{page.title.split(' ').slice(1).join(' ')}</em></h1>
            <p className="mt-4 max-w-[640px] text-[17px]">{page.lead}</p>
            <p className="mt-4 text-[13px] text-muted">Last updated: <strong className="text-ink">{page.updated}</strong></p>
          </div>
        </header>

        <div className={cn(sectionPlain, '!pt-10')}>
          <div className={cn(container, 'grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14')}>
            <nav aria-label={`${page.title} contents`} className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 text-[12px] font-semibold tracking-[.16em] text-muted uppercase">On this page</p>
              <ol className="grid gap-1 rounded-2xl bg-white p-3 shadow-soft">
                {page.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={active === section.id ? 'true' : undefined}
                      className={cn('flex gap-2.5 rounded-xl px-3 py-2 text-[13.5px] transition-colors', active === section.id ? 'bg-brand-soft font-semibold text-brand' : 'text-body hover:bg-mist hover:text-ink')}
                    >
                      <span className="w-5 shrink-0 tabular-nums text-muted">{index + 1}.</span>{section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="min-w-0">
              {page.status === 'draft' && (
                <p className="mb-8 flex items-start gap-3 rounded-2xl bg-[#fff6e5] p-4 text-[13.5px] text-[#7a5200]">
                  <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  This page is being finalised with our legal advisers. The wording may change before it takes final effect.
                </p>
              )}
              <div className="grid gap-5">
                {page.sections.map((section, index) => (
                  <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28 rounded-[22px] bg-white p-6 shadow-soft md:p-8">
                    <h2 id={`${section.id}-title`} className="flex items-baseline gap-3 text-[21px] font-bold tracking-[-.01em] text-ink">
                      <span className="text-[15px] tabular-nums text-brand">{String(index + 1).padStart(2, '0')}</span>{section.title}
                    </h2>
                    <div className="mt-3 grid gap-3 text-[15px] leading-[1.65]">
                      {section.body.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
                    </div>
                  </section>
                ))}
              </div>
              <Link to={other.path} className="group mt-8 flex items-center justify-between rounded-[22px] bg-brand p-6 text-white transition-[background-color] hover:bg-[#006a5b]">
                <span><span className="block text-[12px] tracking-[.16em] text-white/75 uppercase">Also read</span><strong className="text-[18px]">{other.title}</strong></span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  )
}
