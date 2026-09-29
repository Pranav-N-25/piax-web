import Reveal from '../common/Reveal.jsx'
import ProductCategoryItem from './ProductCategoryItem.jsx'
import { container } from './productStyles.js'

export default function ProductCategoryNav({ categories, active, onSelect }) {
  return (
    <Reveal as="nav" aria-label="Product categories" className={`${container} relative z-10 -mt-12`}>
      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pt-1 pb-3 min-[480px]:scroll-px-5 md:scroll-px-8 [scrollbar-width:none] min-[480px]:-mx-5 min-[480px]:px-5 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 lg:pb-1 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <div key={category.slug} className="shrink-0 snap-start rounded-2xl shadow-[0_8px_24px_rgba(0,64,52,.07)]">
            <ProductCategoryItem category={category} active={active === category.slug} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </Reveal>
  )
}
