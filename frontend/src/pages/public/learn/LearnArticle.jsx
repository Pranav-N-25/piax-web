import { useRef, useState } from 'react'
import { ArrowRight, Calendar, Check, ChevronDown, Clock, Info, Link2, ListChecks, Stethoscope } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import HomeHeader from '../../../components/home/HomeHeader.jsx'
import HomeFooter from '../../../components/home/HomeFooter.jsx'
import { DoodleNote } from '../../../components/home/HomeUi.jsx'
import { AskPiax, ArticleCard, Breadcrumbs, LearnIcon } from '../../../components/learn/LearnUi.jsx'
import { cn, container, eyebrow, heading, poppinsPage, tones } from '../../../components/home/homeStyles.js'
import { usePageMeta } from '../../../hooks/usePageMeta.js'
import { useMotion } from '../../../hooks/useMotion.js'
import { articlePath, categoryBySlug, findArticle, formatDate, relatedTo } from '../../../data/learn/index.js'

// Brand marks for the share buttons.
const WhatsApp = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.2-.3-.2-.6-.4Z" /></svg>
const Facebook = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" /></svg>
const LinkedIn = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6.9 21H3.3V9h3.6v12ZM5.1 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM21 21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.5V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5V21Z" /></svg>

function Share({ title }) {
  const [copied, setCopied] = useState(false)
  const url = window.location.href
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked: the other share options still work */ }
  }
  const round = 'flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand'
  const encoded = encodeURIComponent(url)
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-[13px] text-muted">Share</span>
      <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} className={round}>{copied ? <Check size={16} className="text-brand" /> : <Link2 size={16} />}</button>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener" aria-label="Share on WhatsApp" className={round}><WhatsApp /></a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener" aria-label="Share on Facebook" className={round}><Facebook /></a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn" className={round}><LinkedIn /></a>
      <span role="status" className="sr-only">{copied ? 'Link copied' : ''}</span>
    </div>
  )
}

// A "how it works" sequence: circles joined by arrows, wrapping to a column on phones.
function Steps({ steps }) {
  return (
    <ol className="my-6 grid gap-3 rounded-[22px] bg-[#eef7f2] p-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.text} className="relative flex flex-col items-center rounded-2xl bg-white p-4 text-center shadow-soft" data-anim style={{ '--d': `${index * 0.1}s` }}>
          <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand"><LearnIcon name={step.icon} size={22} strokeWidth={1.6} /></span>
          <span className="mt-1 text-[11px] font-bold text-brand">Step {index + 1}</span>
          <span className="mt-1 text-[13px] leading-[1.35] text-ink">{step.text}</span>
          {index < steps.length - 1 && <ArrowRight size={18} aria-hidden="true" className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 text-brand lg:block" />}
        </li>
      ))}
    </ol>
  )
}

function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="grid gap-2">
      {items.map(([question, answer], index) => (
        <div key={question} className="rounded-2xl bg-white shadow-soft">
          <h3>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-ink">
              {question}<ChevronDown size={18} className={cn('shrink-0 text-brand transition-transform', open === index && 'rotate-180')} />
            </button>
          </h3>
          {open === index && <p className="motion-drop px-5 pb-4 text-[14.5px] leading-[1.6]">{answer}</p>}
        </div>
      ))}
    </div>
  )
}

// /learn/:category/:article — keyed by article so moving between articles starts fresh.
export default function LearnArticle() {
  const { category, article } = useParams()
  return <LearnArticlePage key={`${category}/${article}`} />
}

function LearnArticlePage() {
  const { category: categorySlug, article: slug } = useParams()
  const article = findArticle(categorySlug, slug)
  const category = categoryBySlug[categorySlug]
  const mainRef = useRef(null)
  useMotion(mainRef)
  usePageMeta(article ? `${article.title} | PIAX Learn` : 'PIAX Learn', article?.excerpt ?? '')

  if (!article || !category) return <Navigate to={category ? `/learn/${category.slug}` : '/learn'} replace />

  const related = relatedTo(article, 5)
  const contents = [...article.sections.map(({ id, heading: title }) => ({ id, title })), { id: 'faqs', title: 'FAQs' }]

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-mist text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main ref={mainRef} className={cn(container, 'py-8 md:py-12')}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learn', to: '/learn' }, { label: category.name, to: `/learn/${category.slug}` }, { label: article.title }]} />

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-14">
          <article className="min-w-0">
            <header data-anim>
              <p className={eyebrow}>{category.name}</p>
              <h1 className={cn(heading, 'text-[clamp(32px,4vw,52px)]')}>{article.title}</h1>
              <p className="mt-4 max-w-[640px] text-[17px]">{article.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-muted">
                  <span className="flex items-center gap-2.5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand"><Stethoscope size={18} /></span>
                    <span><strong className="block text-ink">By the {article.author}</strong>{article.review === 'pending' ? 'Medical review pending' : `Reviewed by ${article.reviewer}`}</span>
                  </span>
                  <span className="flex items-center gap-1.5"><Calendar size={15} /> {formatDate(article.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={15} /> {article.minutes} min read</span>
                </div>
                <Share title={article.title} />
              </div>
            </header>

            <figure className="relative mt-8 overflow-hidden rounded-[26px]" data-anim style={{ '--d': '.1s' }}>
              <img src={category.image} alt="" className="aspect-[16/8] w-full object-cover object-[center_28%]" />
              {category.note && <DoodleNote className="top-6 right-6 hidden text-white drop-shadow md:block">{category.note}</DoodleNote>}
            </figure>

            <nav aria-labelledby="contents-title" className={cn('mt-8 rounded-[22px] p-6', tones[category.tone].bg)} data-anim>
              <h2 id="contents-title" className="flex items-center gap-2 text-[16px] font-semibold text-ink"><ListChecks size={18} className="text-brand" /> In this article</h2>
              <ol className="mt-3 grid gap-x-8 gap-y-2 text-[14px] sm:grid-cols-2">
                {contents.map(({ id, title }, index) => (
                  <li key={id}><a href={`#${id}`} className="hover:text-brand hover:underline">{index + 1}. {title}</a></li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 grid gap-10">
              {article.sections.map((section, index) => (
                <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="scroll-mt-28" data-anim>
                  <h2 id={`${section.id}-h`} className={cn(heading, 'text-[clamp(22px,2.2vw,28px)]')}>{index + 1}. {section.heading}</h2>
                  <div className="mt-3 grid gap-3 text-[16px] leading-[1.7]">
                    {section.body?.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
                  </div>
                  {section.list && (
                    <ul className="mt-4 grid gap-2.5">
                      {section.list.map((item) => <li key={item} className="flex gap-3 text-[15.5px] leading-[1.6]"><Check size={18} className="mt-1 shrink-0 text-brand" aria-hidden="true" />{item}</li>)}
                    </ul>
                  )}
                  {section.steps && <Steps steps={section.steps} />}
                  {section.note && <p className="mt-5 flex gap-3 rounded-2xl bg-[#e2f2ea] p-4 text-[14.5px] text-ink"><Info size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />{section.note}</p>}
                </section>
              ))}

              <section id="faqs" aria-labelledby="faqs-h" className="scroll-mt-28" data-anim>
                <h2 id="faqs-h" className={cn(heading, 'mb-4 text-[clamp(22px,2.2vw,28px)]')}>{article.sections.length + 1}. FAQs</h2>
                <Faq items={article.faqs} />
              </section>

              <p className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-[13px] text-muted">
                <Info size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                This article is general information, not medical advice. For diagnosis or treatment, please speak to a qualified healthcare professional. In an emergency, call 112.
              </p>
            </div>
          </article>

          <aside className="grid content-start gap-6 lg:sticky lg:top-24">
            <section aria-labelledby="related-title" className="rounded-[22px] bg-white p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <h2 id="related-title" className="text-[16px] font-semibold text-ink">Related articles</h2>
                <Link to={`/learn/${category.slug}`} className="flex items-center gap-1 text-[12.5px] font-semibold text-brand hover:underline">See all <ArrowRight size={14} /></Link>
              </div>
              <ul className="grid gap-1">
                {related.slice(0, 4).map((item) => {
                  const itemCategory = categoryBySlug[item.category]
                  return (
                    <li key={item.slug}>
                      <Link to={articlePath(item)} className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-mist">
                        <span className={cn('flex size-14 shrink-0 items-center justify-center rounded-xl', tones[itemCategory.tone].bg)}><LearnIcon name={itemCategory.icon} size={22} strokeWidth={1.6} className="text-brand" /></span>
                        <span className="min-w-0">
                          <span className="text-[10.5px] font-semibold tracking-[.06em] text-brand uppercase">{itemCategory.name}</span>
                          <span className="block text-[13.5px] leading-snug font-semibold text-ink group-hover:text-brand">{item.title}</span>
                          <span className="text-[12px] text-muted">{item.minutes} min read</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
            <AskPiax compact />
          </aside>
        </div>

        <section aria-labelledby="more-title" className="mt-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="more-title" className={cn(heading, 'text-[24px]')}>You might also like</h2>
            <Link to="/learn" className="flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline">See all articles <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((item, index) => <ArticleCard key={item.slug} article={item} index={index} />)}
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  )
}
