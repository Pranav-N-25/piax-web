import { CircleCheck, Leaf, ShieldCheck, Star, Users } from 'lucide-react'
import { DoodleHeart, DoodleNote, Foliage, PillLink, Stars, Tag } from './HomeUi.jsx'
import { accent, barIcon, barStrong, barText, btn, cn, container, h2, section, sectionHead, tones } from './homeStyles.js'
import photo1 from '../../assets/reviews/review_1.jpg'
import photo2 from '../../assets/reviews/review_2.jpg'
import photo3 from '../../assets/reviews/review_3.jpg'
import photo4 from '../../assets/reviews/review_4.jpg'
import photo5 from '../../assets/reviews/review_5.jpg'
import photo6 from '../../assets/reviews/review_6.jpg'

const distribution = [[5, 68], [4, 24], [3, 6], [2, 1], [1, 1]]

const stats = [
  { icon: Users, title: '10,000+', text: 'Happy Customers' },
  { icon: Star, title: '4.8/5', text: 'Average Rating' },
  { icon: ShieldCheck, title: 'Verified Reviews', text: 'Real Customers. Real Experiences.', teal: true },
  { icon: Leaf, title: 'Women Across India', text: 'From metros to small towns', teal: true },
]

// Stats stack on phones, wrap two-by-two on tablets and sit in one row on desktop.
const statDivider = (index) => cn(
  index % 2 === 1 && 'md:justify-center md:border-l md:border-line',
  index > 0 && 'lg:justify-center lg:border-l lg:border-line',
)

const reviews = [
  { photo: photo1, sticker: 'Super comfortable!', tone: 'pink', quote: 'So soft and comfortable! No rashes, no leaks. Finally a pad I can trust.', name: 'Diya S.', place: 'Chennai, TN' },
  { photo: photo2, sticker: 'Perfect for heavy days', tone: 'mint', quote: 'Handles my heavy flow days so well. I can go about my day without worrying.', name: 'Aishwarya K.', place: 'Bengaluru, KA' },
  { photo: photo3, sticker: 'No rashes at all!', tone: 'mint', quote: 'I have sensitive skin and PIAX is a game changer. No irritation at all!', name: 'Meera V.', place: 'Coimbatore, TN' },
  { photo: photo4, sticker: 'Love the sustainable approach!', tone: 'pink', quote: 'I love using a product that cares for me and the planet.', name: 'Sahana R.', place: 'Hyderabad, TG' },
  { photo: photo5, sticker: 'My go-to brand now!', tone: 'lilac', quote: 'Amazing quality, thoughtful packaging and super reliable delivery!', name: 'Nivetha P.', place: 'Madurai, TN' },
  { photo: photo6, sticker: 'Highly recommend!', tone: 'lilac', quote: 'PIAX made my period journey so much easier. Truly recommend it!', name: 'Kavya M.', place: 'Pune, MH' },
]

export default function ReviewsSection() {
  return (
    <section className={section}>
      <Foliage art="sprigRound" className="top-[38%] -right-14 w-[clamp(100px,10vw,160px)] opacity-70 max-md:hidden" />
      <Foliage art="broad" className="-bottom-20 -left-[210px] w-[clamp(200px,20vw,300px)] -scale-x-100 rotate-[20deg] opacity-45 max-lg:hidden" />
      <div className={container}>
        <div className={cn('relative flex items-start gap-6', sectionHead)}>
          <div>
            <Tag>Real women • Real stories</Tag>
            <h2 className={cn(h2, 'mt-4 mb-4 text-[clamp(34px,3.4vw,48px)]')}>
              Loved by <em className={accent}>10,000+ women</em>{' '}
              <span className="font-hand text-[1.1em] font-normal text-brand" aria-hidden="true">♡</span>
            </h2>
            <p className="text-lg">Real experiences. Real periods. Real confidence.</p>
          </div>
          <DoodleNote arrow="down-left" className="top-8 right-0 hidden text-[26px] lg:block">“Finally a pad<br />that actually understands us.”</DoodleNote>
        </div>

        {/* Template layout: rating panel plus all six reviews in one row on wide screens; 3/2/1 columns below. */}
        <div data-stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[minmax(0,1.15fr)_repeat(6,minmax(0,1fr))]">
          <aside className="col-span-full flex flex-col rounded-[22px] bg-[linear-gradient(180deg,var(--color-brand-soft),rgb(255_255_255/.6))] p-6 md:grid md:grid-cols-2 md:gap-x-10 xl:col-span-1 xl:flex xl:px-5">
            <div>
              <p className="text-[26px] font-bold leading-none text-ink"><strong className="text-[46px] tracking-[-.03em]">4.8</strong>/5</p>
              <div className="mt-3"><Stars size={26} /></div>
              <p className="mt-2 text-sm text-body">from 2,500+ verified reviews</p>
            </div>
            <div className="flex flex-1 flex-col">
              <ul className="mt-5 mb-6 grid gap-2.5 md:mt-0 xl:mt-5">
                {distribution.map(([stars, percent]) => (
                  <li key={stars} className="grid grid-cols-[28px_1fr_34px] items-center gap-2 text-[13px] text-ink">
                    <span>{stars} ★</span>
                    <i className="h-2 overflow-hidden rounded-full bg-white/80">
                      <b className="block h-full rounded-full bg-brand-2" style={{ width: `${percent}%` }} />
                    </i>
                    <span className="text-right tabular-nums text-muted">{percent}%</span>
                  </li>
                ))}
              </ul>
              <PillLink to="/products" variant="outline" className={cn(btn.small, 'mt-auto w-full bg-transparent')}>Read all reviews</PillLink>
            </div>
          </aside>

          {reviews.map(({ photo, sticker, tone, quote, name, place }) => (
            <article key={name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft">
              <img src={photo} alt={`${name}, $PIAX customer`} loading="lazy" decoding="async" className="aspect-[173/122] w-full object-cover object-[center_30%]" />
              <div className="flex flex-1 flex-col p-4">
                <span className={cn('mb-3 inline-flex items-center gap-1.5 self-start rounded-xl px-2.5 py-1 font-hand text-[14px] leading-[1.2] font-medium text-ink [font-size-adjust:.34]', tones[tone].bg)}>
                  {sticker}
                  <DoodleHeart className={cn('shrink-0 text-[10px]', tones[tone].icon)} />
                </span>
                <Stars />
                <p className="mt-2 mb-4 text-[13.5px] leading-[1.45] text-ink">“{quote}”</p>
                <footer className="mt-auto text-xs">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                    <strong className="text-[13px] text-ink">{name}</strong>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                      <CircleCheck size={14} fill="currentColor" stroke="#fff" className="text-brand-2" /> Verified Buyer
                    </span>
                  </div>
                  <small className="mt-1 block text-xs text-muted">{place}</small>
                </footer>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-10 flex flex-wrap items-center gap-y-4 lg:flex-nowrap">
          {stats.map(({ icon: Icon, title, text, teal }, index) => (
            <div key={title} className={cn('flex flex-[1_1_100%] items-center justify-start gap-3 md:flex-[1_1_45%] lg:flex-1', statDivider(index))}>
              <Icon size={30} strokeWidth={1.4} className={barIcon} />
              <span className={barText}><strong className={cn(barStrong, teal && 'text-brand-2')}>{title}</strong>{text}</span>
            </div>
          ))}
          <DoodleNote inline className="hidden shrink-0 pl-6 xl:block">Different stories.<br />Same confidence.</DoodleNote>
        </div>
      </div>
    </section>
  )
}
