import { useCallback, useEffect, useState } from 'react'
import { BadgeCheck, ChevronDown, MessageCircle, MessageCircleHeart, Pencil, Send, ThumbsUp, Trash2, X } from 'lucide-react'
import Dialog from '../common/Dialog.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { reviewService } from '../../services/reviewService.js'
import { StarInput, Stars } from './Stars.jsx'
import { btn, cn, heading } from '../home/homeStyles.js'

const PAGE = 5
const MIN_BODY = 20
const MAX_BODY = 1000
const TAGS = { wear: ['Day', 'Night', 'Day & night'], flow: ['Light', 'Regular', 'Heavy', 'Very heavy'] }
const sorts = [['helpful', 'Most helpful'], ['newest', 'Newest'], ['highest', 'Highest rated'], ['lowest', 'Lowest rated']]

const date = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const chip = (on) => cn('cursor-pointer rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors', on ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body hover:border-brand')
const field = 'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brand aria-[invalid=true]:border-[#c23a55]'

// Write or edit your review. `existing` pre-fills the form when editing.
function ReviewForm({ productId, productName, existing, onClose, onSaved }) {
  const [rating, setRating] = useState(existing?.rating ?? 0)
  const [title, setTitle] = useState(existing?.title ?? '')
  const [body, setBody] = useState(existing?.body ?? '')
  const [tags, setTags] = useState(existing?.tags ?? { wear: null, flow: null })
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (!rating) return setError({ message: 'Please choose a star rating.', field: 'rating' })
    if (body.trim().length < MIN_BODY) return setError({ message: `Please write at least ${MIN_BODY} characters about your experience.`, field: 'body' })
    setSaving(true)
    try {
      await reviewService.save(productId, { rating, title, body, tags })
      onSaved()
    } catch (err) {
      setError({ message: err.message, field: err.field })
      setSaving(false)
    }
  }

  return (
    <Dialog open onClose={onClose} title={existing ? 'Edit your review' : `Review ${productName}`} description="Tell others how it felt for you." variant="sheet" className="md:max-w-[560px]">
      <form onSubmit={submit} className="grid gap-5" noValidate>
        <div>
          <p className="mb-2 text-[13px] font-semibold text-ink">Your rating</p>
          <StarInput value={rating} onChange={(value) => { setRating(value); setError(null) }} invalid={error?.field === 'rating'} />
        </div>
        {Object.entries({ wear: 'When did you use it?', flow: 'Your flow' }).map(([key, label]) => (
          <fieldset key={key}>
            <legend className="mb-2 text-[13px] font-semibold text-ink">{label} <span className="font-normal text-muted">(optional)</span></legend>
            <div className="flex flex-wrap gap-2">
              {TAGS[key].map((value) => (
                <button key={value} type="button" aria-pressed={tags[key] === value} onClick={() => setTags((all) => ({ ...all, [key]: all[key] === value ? null : value }))} className={chip(tags[key] === value)}>{value}</button>
              ))}
            </div>
          </fieldset>
        ))}
        <label className="grid gap-1.5">
          <span className="text-[13px] font-semibold text-ink">Title <span className="font-normal text-muted">(optional)</span></span>
          <input value={title} maxLength={80} onChange={(event) => setTitle(event.target.value)} placeholder="Sum it up in a few words" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[13px] font-semibold text-ink">Your review</span>
          <textarea
            value={body}
            maxLength={MAX_BODY}
            rows={5}
            onChange={(event) => { setBody(event.target.value); if (error?.field === 'body') setError(null) }}
            placeholder="How was the comfort, fit and coverage? Would you buy it again?"
            aria-invalid={error?.field === 'body'}
            className={cn(field, 'resize-y')}
          />
          <span className={cn('text-right text-[11.5px]', body.trim().length < MIN_BODY ? 'text-muted' : 'text-brand')}>
            {body.trim().length < MIN_BODY ? `${MIN_BODY - body.trim().length} more characters needed` : `${body.length} / ${MAX_BODY}`}
          </span>
        </label>
        {error && <p role="alert" className="rounded-xl bg-[#fde6ea] px-4 py-2.5 text-[13px] text-[#a52a44]">{error.message}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted">Shown with your first name and last initial.</p>
          <button type="submit" disabled={saving} className={cn(btn.base, btn.solid)}>{saving ? 'Posting…' : existing ? 'Update review' : 'Post review'}</button>
        </div>
      </form>
    </Dialog>
  )
}

function Comments({ review, onChange }) {
  const { currentUser, openAuth } = useAuth()
  const [text, setText] = useState('')
  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)

  const send = async (event) => {
    event.preventDefault()
    if (!text.trim()) return
    setSending(true)
    try {
      onChange((await reviewService.comment(review.id, text)).review)
      setText('')
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }
  const remove = async (commentId) => {
    try { onChange((await reviewService.removeComment(review.id, commentId)).review) } catch (err) { setError(err.message) }
  }

  return (
    <div className="motion-drop mt-4 rounded-2xl bg-[#f6faf8] p-4">
      {review.comments.length === 0 && <p className="text-[13px] text-muted">No comments yet.</p>}
      <ul className="grid gap-3">
        {review.comments.map((comment) => (
          <li key={comment.id} className="text-[13.5px]">
            <p className="flex flex-wrap items-center gap-x-2 text-[12px] text-muted">
              <strong className="text-ink">{comment.author}</strong>{date(comment.createdAt)}
              {comment.mine && <button type="button" onClick={() => remove(comment.id)} className="ml-auto inline-flex cursor-pointer items-center gap-1 hover:text-[#c23a55]"><Trash2 size={12} /> Delete</button>}
            </p>
            <p className="mt-0.5 whitespace-pre-line text-body">{comment.body}</p>
          </li>
        ))}
      </ul>
      {currentUser ? (
        <form onSubmit={send} className="mt-3 flex gap-2">
          <label className="sr-only" htmlFor={`comment-${review.id}`}>Add a comment</label>
          <input id={`comment-${review.id}`} value={text} maxLength={500} onChange={(event) => setText(event.target.value)} placeholder="Add a comment" className={cn(field, 'py-2')} />
          <button type="submit" disabled={sending || !text.trim()} aria-label="Post comment" className={cn(btn.base, btn.solid, 'min-h-10 shrink-0 px-4')}><Send size={15} /></button>
        </form>
      ) : (
        <button type="button" onClick={() => openAuth('login')} className="mt-3 cursor-pointer text-[13px] font-semibold text-brand hover:underline">Log in to comment</button>
      )}
      {error && <p role="alert" className="mt-2 text-[12.5px] text-[#a52a44]">{error}</p>}
    </div>
  )
}

function ReviewCard({ review, onChange, onEdit, onDelete }) {
  const { currentUser, openAuth } = useAuth()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const helpful = async () => {
    if (!currentUser) return openAuth('login')
    try { onChange((await reviewService.toggleHelpful(review.id)).review) } catch (err) { setError(err.message) }
  }
  const action = 'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors'

  return (
    <article className="rounded-[22px] bg-white p-5 shadow-soft">
      <header className="flex flex-wrap items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-[15px] font-bold text-brand" aria-hidden="true">{review.author[0]}</span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2 text-[14px] font-semibold text-ink">
            {review.author}
            {review.mine && <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] text-brand">Your review</span>}
            {review.verified && <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand"><BadgeCheck size={14} /> Verified purchase</span>}
            {review.sample && <span className="rounded-full bg-[#fff1d6] px-2 py-0.5 text-[10.5px] font-semibold text-[#8a5a00]">Sample — not a real review</span>}
          </p>
          <p className="text-[12px] text-muted">{date(review.createdAt)}{review.edited && ' · edited'}</p>
        </div>
        <Stars value={review.rating} size={16} />
        <span className="sr-only">{review.rating} out of 5 stars</span>
      </header>
      {review.title && <h3 className="mt-3 text-[15.5px] font-semibold text-ink">{review.title}</h3>}
      <p className="mt-1.5 whitespace-pre-line text-[14px] leading-[1.6] text-body">{review.body}</p>
      {(review.tags?.wear || review.tags?.flow) && (
        <ul className="mt-3 flex flex-wrap gap-2 text-[11.5px]">
          {review.tags.wear && <li className="rounded-full bg-[#eef5f1] px-2.5 py-1 text-ink">Used: {review.tags.wear}</li>}
          {review.tags.flow && <li className="rounded-full bg-[#eef5f1] px-2.5 py-1 text-ink">Flow: {review.tags.flow}</li>}
        </ul>
      )}
      <footer className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
        {!review.mine && (
          <button type="button" aria-pressed={review.votedHelpful} onClick={helpful} className={cn(action, review.votedHelpful ? 'bg-brand text-white' : 'bg-[#eef5f1] text-ink hover:bg-brand-soft')}>
            <ThumbsUp size={14} /> Helpful{review.helpful > 0 && ` (${review.helpful})`}
          </button>
        )}
        {review.mine && review.helpful > 0 && <span className="text-[12.5px] text-muted">{review.helpful} found this helpful</span>}
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className={cn(action, 'bg-[#eef5f1] text-ink hover:bg-brand-soft')}>
          <MessageCircle size={14} /> {review.comments.length ? `Comments (${review.comments.length})` : 'Comment'}
          <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
        </button>
        {review.mine && (
          <span className="ml-auto flex gap-1">
            <button type="button" onClick={onEdit} className={cn(action, 'text-brand hover:bg-brand-soft')}><Pencil size={13} /> Edit</button>
            <button type="button" onClick={onDelete} className={cn(action, 'text-muted hover:bg-[#fde6ea] hover:text-[#a52a44]')}><Trash2 size={13} /> Delete</button>
          </span>
        )}
      </footer>
      {error && <p role="alert" className="mt-2 text-[12.5px] text-[#a52a44]">{error}</p>}
      {open && <Comments review={review} onChange={onChange} />}
    </article>
  )
}

// Customer reviews for one product: rating summary, the reviews themselves with helpful votes and comments, and
// writing your own. Every review comes from a signed-in customer; nothing is pre-filled.
export default function ProductReviews({ productId, productName }) {
  const { currentUser, openAuth } = useAuth()
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')
  const [sort, setSort] = useState('helpful')
  const [stars, setStars] = useState(null)
  const [shown, setShown] = useState(PAGE)
  const [form, setForm] = useState(null)
  const viewer = currentUser?.id

  const load = useCallback(async () => {
    try {
      setData(await reviewService.list(productId, sort))
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [productId, sort])
  // Reload when the product, the sort order or the signed-in person changes ("Your review" depends on who is looking).
  useEffect(() => { load() }, [load, viewer])

  const replace = (review) => setData((all) => ({ ...all, reviews: all.reviews.map((item) => (item.id === review.id ? review : item)) }))
  const mine = data?.reviews.find((review) => review.mine)
  const write = () => (currentUser ? setForm({ existing: mine ?? null }) : openAuth('login'))
  const remove = async () => {
    if (!window.confirm('Delete your review?')) return
    await reviewService.removeMine(productId).catch(() => {})
    load()
  }

  const summary = data?.summary
  const list = (data?.reviews ?? []).filter((review) => !stars || review.rating === stars)

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="self-start rounded-[22px] bg-white p-6 shadow-soft lg:sticky lg:top-24">
        <h2 id="reviews-title" className={cn(heading, 'text-[22px]')}>Customer reviews</h2>
        {summary?.count ? (
          <>
            <p className="mt-3 flex items-end gap-3">
              <strong className="text-[44px] leading-none text-ink">{summary.average.toFixed(1)}</strong>
              <span className="pb-1"><Stars value={summary.average} size={18} /><span className="block text-[12.5px] text-muted">{summary.count} review{summary.count === 1 ? '' : 's'}</span></span>
            </p>
            <ul className="mt-4 grid gap-1.5" aria-label="Filter by rating">
              {[5, 4, 3, 2, 1].map((n) => {
                const count = summary.breakdown[n]
                const on = stars === n
                return (
                  <li key={n}>
                    <button type="button" aria-pressed={on} disabled={!count} onClick={() => { setStars(on ? null : n); setShown(PAGE) }} className={cn('flex w-full cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-[12.5px] transition-colors disabled:cursor-default', on ? 'bg-brand-soft' : 'hover:bg-mist disabled:hover:bg-transparent')}>
                      <span className="w-9 text-left text-ink">{n} ★</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist"><span className="block h-full rounded-full bg-[#e0a33a]" style={{ width: `${(count / summary.count) * 100}%` }} /></span>
                      <span className="w-6 text-right tabular-nums text-muted">{count}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <>
            <p className="mt-3 flex items-center gap-2"><Stars value={0} size={20} /></p>
            <p className="mt-2 text-[13.5px] text-muted">{status === 'loading' ? 'Loading reviews…' : `No reviews yet for ${productName}.`}</p>
          </>
        )}
        <button type="button" onClick={write} className={cn(btn.base, btn.solid, 'mt-5 w-full')}>{mine ? <><Pencil size={16} /> Edit your review</> : currentUser ? 'Write a review' : 'Log in to write a review'}</button>
        <p className="mt-3 text-[12px] text-muted">Reviews come from signed-in PIAX customers. “Verified purchase” marks a review linked to a delivered order.</p>
        {data?.reviews.some((review) => review.sample) && <p className="mt-3 rounded-xl bg-[#fff1d6] px-3 py-2 text-[12px] text-[#8a5a00]">Showing sample reviews for a design preview (development data only).</p>}
      </aside>

      <section aria-label="Reviews" className="min-w-0">
        {status === 'error' && <p role="alert" className="rounded-[22px] bg-white p-6 text-[14px] text-muted shadow-soft">Reviews couldn’t load right now. Please try again later.</p>}
        {status === 'ready' && !summary?.count && (
          <div className="flex h-full flex-col items-center justify-center rounded-[22px] border-2 border-dashed border-line bg-white/60 p-10 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand"><MessageCircleHeart size={26} /></span>
            <h3 className="mt-4 text-[18px] font-semibold text-ink">Be the first to share your experience.</h3>
            <p className="mt-1.5 max-w-[420px] text-[14px] text-muted">How did {productName} feel? Your review helps others pick the right size.</p>
            <button type="button" onClick={write} className={cn(btn.base, btn.outline, btn.small, 'mt-5')}>Write a review</button>
          </div>
        )}
        {status === 'ready' && summary?.count > 0 && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-ink" aria-live="polite">
                {list.length} review{list.length === 1 ? '' : 's'}
                {stars && <button type="button" onClick={() => setStars(null)} className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[12px] text-brand">{stars} ★ only <X size={12} /></button>}
              </p>
              <label className="relative flex items-center gap-2 text-[13px] text-muted">
                Sort by
                <select value={sort} onChange={(event) => { setSort(event.target.value); setShown(PAGE) }} className="h-10 cursor-pointer appearance-none rounded-full border border-line bg-white pr-9 pl-4 text-[13px] font-semibold text-ink">
                  {sorts.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-3 text-ink" />
              </label>
            </div>
            <div className="grid gap-4">
              {list.slice(0, shown).map((review) => (
                <ReviewCard key={review.id} review={review} onChange={replace} onEdit={() => setForm({ existing: review })} onDelete={remove} />
              ))}
            </div>
            {list.length > shown && <button type="button" onClick={() => setShown(shown + PAGE)} className={cn(btn.base, btn.outline, btn.small, 'mx-auto mt-5 flex')}>Show more reviews</button>}
          </>
        )}
      </section>

      {form && <ReviewForm productId={productId} productName={productName} existing={form.existing} onClose={() => setForm(null)} onSaved={() => { setForm(null); load() }} />}
    </div>
  )
}
