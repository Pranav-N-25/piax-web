import Reveal from '../common/Reveal.jsx'
import ProductCard from './ProductCard.jsx'
import { gridColumns } from './productStyles.js'

export default function ProductGrid({ products, onAdd, onCustomize }) {
  return (
    <ul className={gridColumns}>
      {products.map((product, index) => (
        <Reveal as="li" key={product.id} delay={(index % 4) * 80} className="h-full">
          <ProductCard product={product} onAdd={onAdd} onCustomize={onCustomize} />
        </Reveal>
      ))}
    </ul>
  )
}
