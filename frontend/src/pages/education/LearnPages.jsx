import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { articleService } from '../../services/articleService.js'
import { Loading, NotFound } from '../../components/common/FeedbackStates.jsx'
import { articleAccents, cn, ui } from '../../components/common/ui.js'

const artCaption = 'rotate-[-8deg] font-playfair text-[29px] leading-[.9] italic text-white/90'

export default function Learn() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => { Promise.all([articleService.getArticles(), articleService.getCategories()]).then(([a, c]) => { setArticles(a); setCategories(c) }) }, [])

  return <div className={ui.page}>
    <div className={ui.pageHeadingNarrow}>
      <span className={ui.eyebrow}>The PIAX guide</span>
      <h1 className={ui.h1}>Questions are<br /><em className={ui.accent}>welcome here.</em></h1>
      <p className={ui.lead}>Clear, considered reading for every stage of your cycle.</p>
    </div>
    <div className="mb-12 flex flex-wrap gap-2.5">
      {categories.map((category) => (
        <Link
          key={category.slug}
          to={`/learn/${category.slug}/${articles.find((article) => article.category === category.slug)?.slug || articles[0]?.slug}`}
          className="flex items-center gap-2.5 rounded-[30px] bg-mint px-4 py-3 text-xs text-leaf"
        >
          {category.name}<ArrowRight size={14} />
        </Link>
      ))}
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {articles.map((article, index) => <ArticleCard key={article.id} article={article} featured={index === 0} />)}
    </div>
  </div>
}

export function ArticleCard({ article, featured }) {
  return <Link
    className={cn(
      'block min-h-[220px] bg-white min-[431px]:grid min-[431px]:grid-cols-[120px_1fr]',
      featured ? 'md:col-span-2 md:grid-cols-2' : 'md:grid-cols-[180px_1fr]',
    )}
    to={`/learn/${article.category}/${article.slug}`}
  >
    <div className={cn('flex min-h-[130px] items-center justify-center min-[431px]:min-h-[180px] md:min-h-[220px]', articleAccents[article.accent])}>
      <span className={artCaption}>PIAX<br />notes</span>
    </div>
    <div className="p-4 md:p-6">
      <span className={ui.eyebrow}>{article.category.replaceAll('-', ' ')}</span>
      <h3 className="mt-3 mb-2 font-playfair text-xl font-medium leading-[1.25] md:text-[26px]">{article.title}</h3>
      <p className="mb-4 text-[13px] text-stone">{article.subtitle}</p>
      <span className={cn(ui.textLink, 'mt-4')}>Read {article.readingTime} min <ArrowRight size={15} /></span>
    </div>
  </Link>
}

export function Article() {
  const { category, articleSlug } = useParams()
  const [article, setArticle] = useState()
  useEffect(() => { articleService.getArticleBySlug(category, articleSlug).then(setArticle) }, [category, articleSlug])
  if (article === undefined) return <Loading />
  if (!article) return <NotFound />

  return <article className={cn(ui.page, 'max-w-[1060px]')}>
    <div className="mx-auto mb-12 max-w-[760px] text-center">
      <Link className={cn(ui.textLink, 'mb-10')} to="/learn"><ChevronLeft size={17} /> All articles</Link>
      <span className={cn(ui.eyebrow, 'justify-center')}>{category.replaceAll('-', ' ')}</span>
      <h1 className={cn(ui.h1, 'text-[clamp(48px,6vw,78px)] md:text-[clamp(48px,6vw,78px)]')}>{article.title}</h1>
      <p className="mb-4 text-lg text-stone">{article.subtitle}</p>
      <div className="text-xs text-stone">By {article.author} · Reviewed by {article.reviewer} · {article.readingTime} min read</div>
    </div>
    <div className={cn('mb-12 flex h-[330px] items-center justify-center', articleAccents[article.accent])}>
      <span className={cn(artCaption, 'text-[54px]')}>PIAX<br />notes</span>
    </div>
    <div className="mx-auto max-w-[680px]">
      {article.content.map((paragraph) => <p key={paragraph} className="mb-[1em] font-playfair text-[21px] leading-[1.65]">{paragraph}</p>)}
      <div className="mt-8 flex items-center gap-3 bg-mint p-5 font-dm text-sm text-[#536b63]">
        <Sparkles size={19} className="shrink-0 text-leaf" />
        <span>Need a more personal starting point? <Link to="/ai">Ask PIAX AI</Link></span>
      </div>
    </div>
  </article>
}
