import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronLeft, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { productService } from '../../services/productService.js'
import { money } from '../../utils/formatters.js'
import { Loading, NotFound } from '../../components/common/FeedbackStates.jsx'
import { button, cn, productShape, productTones, ui } from '../../components/common/ui.js'
import { productImages } from '../../components/products/productImages.js'

const label = 'mb-2.5 block text-xs font-bold'
const sizeOption = 'min-w-[55px] cursor-pointer rounded-md border p-2.5'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [customize, setCustomize] = useState(false)
  const { addItem } = useCart()
  useEffect(() => { productService.getProductBySlug(slug).then(setProduct) }, [slug])
  if (product === undefined) return <Loading />
  if (!product) return <NotFound />

  return <div className={cn(ui.page, 'pt-12 md:pt-12')}>
    <Link className={cn(ui.textLink, 'mb-8')} to="/products"><ChevronLeft size={17} /> Back to shop</Link>
    <div className="gap-[clamp(40px,8vw,120px)] md:grid md:grid-cols-2">
      <div className={cn('relative mb-12 flex min-h-[450px] items-center justify-center overflow-hidden rounded-[3px] md:mb-0 md:min-h-[590px]', productTones[product.tone])}>
        {productImages[product.image]
          ? <img src={productImages[product.image][0]} alt={product.name} className="h-[70%] w-[70%] object-contain mix-blend-multiply" />
          : <span className={cn(productShape, 'h-[310px] w-40 text-[47px]')}>PIAX</span>}
        <span className="absolute right-7 bottom-[30px] rotate-4 bg-white px-5 py-3 font-playfair text-[17px] text-leaf">
          soft on skin<br /><strong className="text-charcoal italic">easy on earth</strong>
        </span>
      </div>
      <div className="max-w-[510px] self-center">
        <span className={ui.eyebrow}>{product.category}</span>
        <h1 className={cn(ui.h1, 'my-4 text-[clamp(48px,5vw,73px)] md:text-[clamp(48px,5vw,73px)]')}>{product.name}</h1>
        <div className="mb-6 flex items-center gap-1 text-xs text-leaf">
          <Star size={16} fill="currentColor" /> {product.rating} <span className="ml-1 text-stone">({product.reviewCount} fictional demo reviews)</span>
        </div>
        <p className="mb-4 text-[17px] text-stone">{product.description}</p>
        <div className="my-7 flex items-center gap-3">
          <strong className="text-[25px]">{money(product.price)}</strong>
          <del className="text-[13px] text-[#9aa29e]">{money(product.mrp)}</del>
          <span className="text-xs text-leaf">Save {money(product.mrp - product.price)}</span>
        </div>
        <div>
          <span className={label}>Size</span>
          <div className="flex gap-2">
            <button className={cn(sizeOption, 'border-leaf bg-leaf text-white')}>{product.size}</button>
            <button className={cn(sizeOption, 'border-rule bg-white')}>XL</button>
            <button className={cn(sizeOption, 'border-rule bg-white')}>XXL</button>
          </div>
        </div>
        <div className="my-6 flex items-center justify-between">
          <span className={cn(label, 'm-0')}>Quantity</span>
          <div className={ui.quantity}>
            <button className={ui.quantityButton} onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
            <span>{quantity}</span>
            <button className={ui.quantityButton} onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button className={cn(button.base, button.primary)} onClick={() => addItem(product, quantity)}>Add to cart <ShoppingBag size={17} /></button>
          <button className={cn(button.base, button.outline)} onClick={() => setCustomize(true)}>Customize your box</button>
        </div>
        <div className="mt-5 flex items-center gap-1.5 text-xs text-stone"><Check size={16} /> Free delivery on orders over ₹499</div>
      </div>
    </div>
    <section className="mt-15 border-t border-rule pt-15 md:mt-20 md:grid md:grid-cols-2 md:gap-8">
      <div>
        <span className={ui.eyebrow}>Why it works</span>
        <h2 className={cn(ui.h2, 'my-3 max-w-[440px] text-[34px] md:text-[38px]')}>Protection that lets you stay in your day.</h2>
      </div>
      <div className="mt-8 self-center md:mt-0">
        {product.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 border-b border-rule py-4">
            <Check size={17} className="text-leaf" /><span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
    {customize && <Customize product={product} close={() => setCustomize(false)} />}
  </div>
}

function Customize({ product, close }) {
  const [count, setCount] = useState(12)
  const { addItem } = useCart()
  const price = Math.round(product.price * count / product.boxCount)
  const row = 'flex items-center justify-between border-t border-rule py-5'

  return <div className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(25,49,43,.38)] p-5" onClick={close}>
    <section className="relative w-full max-w-[520px] rounded-[5px] bg-paper p-10" onClick={(event) => event.stopPropagation()}>
      <button className="absolute top-[18px] right-[18px] cursor-pointer" onClick={close} aria-label="Close"><X size={19} /></button>
      <span className={ui.eyebrow}>Build your box</span>
      <h2 className={cn(ui.h2, 'mt-4 mb-2.5 text-[38px]')}>Made around your rhythm.</h2>
      <p className="mb-4 text-stone">Choose a starting quantity for your {product.category.toLowerCase()}.</p>
      <div className={row}>
        <span>{product.size} · {product.length}</span>
        <div className={ui.quantity}>
          <button className={ui.quantityButton} onClick={() => setCount(Math.max(6, count - 6))}><Minus size={15} /></button>
          <strong>{count}</strong>
          <button className={ui.quantityButton} onClick={() => setCount(count + 6)}><Plus size={15} /></button>
        </div>
      </div>
      <div className={cn(row, 'mb-5')}><span>Total</span><strong>{money(price)}</strong></div>
      <button
        className={cn(button.base, button.primary, button.full)}
        onClick={() => { addItem({ ...product, id: `${product.id}-custom`, name: `${product.name} · Custom box`, boxCount: count, price }); close() }}
      >
        Add custom box <ArrowRight size={17} />
      </button>
    </section>
  </div>
}
