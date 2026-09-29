import { useEffect, useState } from 'react'
import { ArrowRight, Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { aiService } from '../../services/aiService.js'
import { articleService } from '../../services/articleService.js'
import { productService } from '../../services/productService.js'
import { money } from '../../utils/formatters.js'
import { articleAccents, cn, productTones, ui } from '../../components/common/ui.js'

const promptButton = 'flex cursor-pointer items-center gap-2 rounded-[20px] border border-rule bg-paper px-3 py-2.5 text-xs text-leaf'
const miniResult = 'flex items-center gap-3 border border-rule bg-white p-2'
const miniText = 'flex flex-col text-xs font-bold'
const miniSub = 'text-[11px] font-normal text-stone'

function PromptRow({ prompts, send }) {
  return <div className="mt-5 flex flex-wrap justify-center gap-2">
    {prompts?.map((prompt) => <button key={prompt} className={promptButton} onClick={() => send(prompt)}>{prompt} <ArrowRight size={14} /></button>)}
  </div>
}

export default function AiPage() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const send = async (text = query) => {
    if (!text.trim()) return
    setMessages((current) => [...current, { role: 'user', text }])
    setQuery('')
    const response = await aiService.askQuestion(text)
    setMessages((current) => [...current, { role: 'ai', ...response }])
  }

  return <div className={cn(ui.page, 'min-h-[750px] max-w-none bg-[#e8f2ed]')}>
    <div className="mx-auto max-w-[560px] pt-6 text-center">
      <span className={cn(ui.eyebrow, 'justify-center')}><Sparkles size={14} /> PIAX AI</span>
      <h1 className={cn(ui.h1, 'mb-4 text-[55px] md:text-[70px]')}>A softer place<br /><em className={ui.accent}>to ask.</em></h1>
      <p className="mb-4 text-stone">Friendly, educational guidance for the questions you might not know how to phrase.</p>
    </div>
    <div className="mx-auto mt-12 min-h-[425px] max-w-[800px] rounded-lg border border-rule bg-white p-4 md:p-8">
      {messages.length === 0 && <div className="px-2.5 py-10 text-center">
        <div className="mx-auto mb-4 flex size-[60px] items-center justify-center rounded-full bg-mint text-leaf"><Sparkles size={23} /></div>
        <h2 className={cn(ui.h2, 'mb-1.5 text-[30px]')}>What’s on your mind?</h2>
        <p className="mb-4 text-stone">Try one of these to begin.</p>
        <PromptRow prompts={['What should I use for heavy flow?', 'Why do cramps happen?', 'Help me with my first period']} send={send} />
      </div>}
      {messages.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={cn(
            'my-4 max-w-[80%]',
            message.role === 'user' ? 'ml-auto rounded-[18px_18px_2px_18px] bg-leaf px-4 py-3 text-white' : 'rounded-[2px_18px_18px_18px] bg-paper p-4',
          )}
        >
          {message.role === 'user' ? <p>{message.text}</p> : <>
            <span className="mb-1.5 flex items-center gap-1 text-[10px] font-bold text-leaf"><Sparkles size={13} /> PIAX AI</span>
            <p>{message.answer}</p>
            <div className="mt-3.5 grid gap-2">
              {message.productIds?.map((id) => <AiProduct key={id} id={id} />)}
              {message.articleIds?.map((id) => <AiArticle key={id} id={id} />)}
            </div>
            <PromptRow prompts={message.followUp} send={send} />
          </>}
        </div>
      ))}
      <form className="mt-7 flex gap-2.5 border-t border-rule pt-4" onSubmit={(event) => { event.preventDefault(); send() }}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask anything about your cycle..."
          aria-label="Ask PIAX"
          className="block w-full flex-1 rounded-[3px] bg-white p-3 outline-none"
        />
        <button aria-label="Send question" className="flex size-10 shrink-0 cursor-pointer items-center justify-center self-center rounded-full bg-leaf text-white"><Send size={18} /></button>
      </form>
    </div>
  </div>
}

function AiProduct({ id }) {
  const [product, setProduct] = useState()
  useEffect(() => { productService.getProducts().then((products) => setProduct(products.find((item) => item.id === id))) }, [id])
  return product ? <Link className={miniResult} to={`/products/${product.slug}`}>
    <div className={cn(ui.miniArt, productTones[product.tone])} />
    <span className={miniText}>{product.name}<small className={miniSub}>{money(product.price)}</small></span>
    <ArrowRight size={15} className="ml-auto text-leaf" />
  </Link> : null
}

function AiArticle({ id }) {
  const [article, setArticle] = useState()
  useEffect(() => { articleService.getArticles().then((articles) => setArticle(articles.find((item) => item.id === id))) }, [id])
  return article ? <Link className={miniResult} to={`/learn/${article.category}/${article.slug}`}>
    <div className={cn(ui.miniArt, articleAccents[article.accent])} />
    <span className={miniText}>{article.title}<small className={miniSub}>Read {article.readingTime} min</small></span>
    <ArrowRight size={15} className="ml-auto text-leaf" />
  </Link> : null
}
