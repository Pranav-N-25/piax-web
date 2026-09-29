import { BatteryFull, Copy, Leaf, Menu, Mic, Send, Signal, ThumbsDown, ThumbsUp, Wifi } from 'lucide-react'
import { cn } from './homeStyles.js'

// A PIAX AI chat shown on a phone, built in HTML so text and icons stay sharp
// on every screen density. Purely illustrative: read out as one image.
const conversation = [
  { from: 'user', text: 'Is it normal to have period cramps on day 1?' },
  { from: 'ai', text: 'Yes, it’s completely normal to have cramps on the first day of your period. This happens due to natural muscle contractions in the uterus. 💚' },
  { from: 'user', text: 'What can I do to feel better?' },
  { from: 'ai', text: 'You can try a warm compress, stay hydrated, light movement and rest. If the pain is severe or unusual, it’s best to consult a doctor.', reactions: true },
]

function LeafAvatar({ size = 'sm' }) {
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand', size === 'lg' ? 'size-12' : 'size-6')}>
      <Leaf size={size === 'lg' ? 24 : 13} strokeWidth={1.8} />
    </span>
  )
}

export default function AiPhoneMockup({ className = '' }) {
  return (
    <div
      role="img"
      aria-label="PIAX AI chat on a phone: asking whether period cramps on day one are normal, with a reassuring answer and tips to feel better"
      className={cn('w-[250px] rounded-[42px] bg-[#1d2322] p-[7px] shadow-[0_24px_50px_-12px_rgba(15,60,50,.35)] ring-1 ring-black/10', className)}
    >
      <div aria-hidden="true" className="relative flex flex-col overflow-hidden rounded-[35px] bg-linear-to-b from-[#f4fbf8] to-[#eaf6f0] text-ink select-none">
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

        {/* Welcome */}
        <div className="flex flex-col items-center gap-2 px-6 pt-2 pb-3 text-center">
          <LeafAvatar size="lg" />
          <p className="text-[10.5px] leading-[1.4] text-body">Here for your questions,<br />thoughts and overthinking. 💚</p>
        </div>

        {/* Conversation */}
        <div className="flex flex-col gap-2.5 px-3 pb-3">
          {conversation.map(({ from, text, reactions }) => (from === 'user' ? (
            <p key={text} className="ml-10 rounded-2xl rounded-tr-md bg-[#cfe9dc] px-3 py-2 text-[10.5px] leading-[1.4]">{text}</p>
          ) : (
            <div key={text} className="flex items-start gap-1.5">
              <LeafAvatar />
              <div className="flex-1">
                <p className="rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[10.5px] leading-[1.4] shadow-[0_2px_8px_rgba(15,60,50,.06)]">{text}</p>
                {reactions && (
                  <span className="mt-1.5 flex gap-2.5 pl-1 text-muted">
                    <ThumbsUp size={11} /><ThumbsDown size={11} /><Copy size={11} />
                  </span>
                )}
              </div>
            </div>
          )))}
        </div>

        {/* Composer */}
        <div className="mx-3 mb-4 flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-3 shadow-[0_2px_10px_rgba(15,60,50,.08)]">
          <Mic size={14} strokeWidth={1.8} className="text-brand" />
          <span className="flex-1 text-[10.5px] text-muted">Ask anything...</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white"><Send size={12} strokeWidth={2} /></span>
        </div>
        <span className="mx-auto mb-2 h-1 w-24 rounded-full bg-ink/80" />
      </div>
    </div>
  )
}
