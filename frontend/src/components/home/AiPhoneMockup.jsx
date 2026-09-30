import { useEffect, useState } from 'react'
import { BatteryFull, Copy, Leaf, Menu, Mic, Send, Signal, ThumbsDown, ThumbsUp, Wifi } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { cn } from './homeStyles.js'

// A PIAX AI chat shown on a phone, built in HTML so text and icons stay sharp
// on every screen density. Purely illustrative: read out as one image.
// The first question and answer are always on screen. While the phone is in view the chat carries on
// from there: each follow-up question is typed into the composer and sent, PIAX AI "types" and its
// answer slides in. After the last reply the chat fades back to the opening exchange and continues again.
const conversation = [
  { from: 'user', text: 'Is it normal to have period cramps on day 1?' },
  { from: 'ai', text: 'Yes, it’s completely normal to have cramps on the first day of your period. This happens due to natural muscle contractions in the uterus. 💚' },
  { from: 'user', text: 'What can I do to feel better?' },
  { from: 'ai', text: 'You can try a warm compress, stay hydrated, light movement and rest. If the pain is severe or unusual, it’s best to consult a doctor.' },
  { from: 'user', text: 'Which PIAX pad is best for heavy days?' },
  { from: 'ai', text: 'Try PIAX NOCTE (330mm) for heavy days and nights, or SEREN (360mm) for your heaviest days. 💚', reactions: true },
]

// Messages always on screen: the opening question and answer.
const OPENING = 2

const timing = { intro: 1600, fade: 400, start: 700, perChar: 38, beforeSend: 450, afterSend: 500, aiTyping: 1500, afterReply: 1400, hold: 4200 }
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// The resting chat: the opening exchange, nothing being typed.
const opening = { shown: OPENING, draft: '', aiTyping: false, sending: false, fading: false }
// With reduced motion the whole conversation is shown at once instead.
const complete = { ...opening, shown: conversation.length }

// Script state: how many messages are visible, the draft in the composer, whether the AI is typing and
// whether the chat is fading back to its opening. Out of view it rests on the opening exchange.
function useChatScript(playing, messages) {
  const [still] = useState(reducedMotion)
  const [state, setState] = useState(opening)

  useEffect(() => {
    if (!playing || still) return undefined
    let cancelled = false
    const timers = []
    const wait = (ms) => new Promise((resolve) => { timers.push(setTimeout(resolve, ms)) })
    const set = (patch) => !cancelled && setState((prev) => ({ ...prev, ...patch }))

    const run = async () => {
      await wait(timing.intro)
      while (!cancelled) {
        for (let index = OPENING; index < messages.length && !cancelled; index += 1) {
          const { from, text } = messages[index]
          if (from === 'user') {
            for (let chars = 1; chars <= text.length && !cancelled; chars += 1) {
              set({ draft: text.slice(0, chars) })
              await wait(timing.perChar)
            }
            await wait(timing.beforeSend)
            set({ sending: true })
            await wait(160)
            set({ shown: index + 1, draft: '', sending: false })
            await wait(timing.afterSend)
          } else {
            set({ aiTyping: true })
            await wait(timing.aiTyping)
            set({ aiTyping: false, shown: index + 1 })
            await wait(timing.afterReply)
          }
        }
        await wait(timing.hold)
        // Fade out, drop back to the opening exchange, fade in and carry on.
        set({ fading: true })
        await wait(timing.fade)
        set({ ...opening, fading: true })
        await wait(60)
        set({ fading: false })
        await wait(timing.start)
      }
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      setState(opening)
    }
  }, [playing, still, messages])

  return still ? complete : state
}

function LeafAvatar({ size = 'sm' }) {
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand', size === 'lg' ? 'size-12' : 'size-6')}>
      <Leaf size={size === 'lg' ? 24 : 13} strokeWidth={1.8} />
    </span>
  )
}

const aiBubble = 'rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[10.5px] leading-[1.4] shadow-[0_2px_8px_rgba(15,60,50,.06)]'

export default function AiPhoneMockup({ className = '' }) {
  const [ref, inView] = useInView({ once: false, threshold: 0.35 })
  const messages = conversation
  const { shown, draft, aiTyping, sending, fading } = useChatScript(inView, messages)

  return (
    <div
      ref={ref}
      role="img"
      aria-label="PIAX AI chat on a phone: asking whether period cramps on day one are normal, with a reassuring answer, tips to feel better and a pad suggestion for heavy days"
      className={cn('w-[250px] rounded-[42px] bg-[#1d2322] p-[7px] shadow-[0_24px_50px_-12px_rgba(15,60,50,.35)] ring-1 ring-black/10', className)}
    >
      <div aria-hidden="true" className="relative flex h-[500px] flex-col overflow-hidden rounded-[35px] bg-linear-to-b from-[#f4fbf8] to-[#eaf6f0] text-ink select-none">
        {/* Status bar + dynamic island */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="absolute top-2.5 left-1/2 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-[#1d2322]" />
          <span className="flex items-center gap-1"><Signal size={12} strokeWidth={2.4} /><Wifi size={12} strokeWidth={2.4} /><BatteryFull size={15} strokeWidth={2} /></span>
        </div>

        {/* App bar */}
        <div className="flex items-center justify-between px-4 py-2">
          <Menu size={17} strokeWidth={1.8} className="text-body" />
          <strong className="text-[13px] font-semibold">PIAX AI</strong>
          <LeafAvatar />
        </div>

        {/* Conversation: pinned to the bottom so new messages push older ones up, as in a real chat. */}
        <div className={cn('flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 pb-3 transition-opacity duration-400', fading && 'opacity-0')}>
          <div className={cn('flex flex-col items-center gap-2 px-3 pb-2 text-center transition-opacity duration-500', shown > OPENING && 'opacity-60')}>
            <LeafAvatar size="lg" />
            <p className="text-[10.5px] leading-[1.4] text-body">Here for your questions,<br />thoughts and overthinking. 💚</p>
          </div>
          {messages.slice(0, shown).map(({ from, text, reactions }) => (from === 'user' ? (
            <p key={text} className="ml-10 origin-bottom-right rounded-2xl rounded-tr-md bg-[#cfe9dc] px-3 py-2 text-[10.5px] leading-[1.4] motion-safe:animate-chat-in">{text}</p>
          ) : (
            <div key={text} className="flex origin-bottom-left items-start gap-1.5 motion-safe:animate-chat-in">
              <LeafAvatar />
              <div className="flex-1">
                <p className={aiBubble}>{text}</p>
                {reactions && (
                  <span className="mt-1.5 flex gap-2.5 pl-1 text-muted">
                    <ThumbsUp size={11} /><ThumbsDown size={11} /><Copy size={11} />
                  </span>
                )}
              </div>
            </div>
          )))}
          {aiTyping && (
            <div className="flex origin-bottom-left items-start gap-1.5 motion-safe:animate-chat-in">
              <LeafAvatar />
              <span className={cn(aiBubble, 'flex items-center gap-1 py-2.5')}>
                {[0, 1, 2].map((dot) => (
                  <i key={dot} className="size-1.5 rounded-full bg-brand/60 motion-safe:animate-typing-dot" style={{ animationDelay: `${dot * 0.16}s` }} />
                ))}
              </span>
            </div>
          )}
        </div>

        {/* Composer: the question is typed here, then sent. */}
        <div className="mx-3 mb-4 flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-3 shadow-[0_2px_10px_rgba(15,60,50,.08)]">
          <Mic size={14} strokeWidth={1.8} className="shrink-0 text-brand" />
          <span className={cn('min-w-0 flex-1 truncate text-[10.5px]', draft ? 'text-ink' : 'text-muted')}>
            {draft || 'Ask anything...'}
            {draft && <i className="ml-px inline-block h-3 w-px translate-y-0.5 bg-ink motion-safe:animate-caret" />}
          </span>
          <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-150', sending && 'scale-90')}>
            <Send size={12} strokeWidth={2} />
          </span>
        </div>
        <span className="mx-auto mb-2 h-1 w-24 rounded-full bg-ink/80" />
      </div>
    </div>
  )
}
