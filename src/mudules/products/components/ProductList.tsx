 
import { DATA } from '../mock/products'
import { ProductItem } from './ProductItem'

const ProductList = () => {
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {DATA.map((product)=>(
            <ProductItem key={product.id} product={product} />
        ))}
    </div>
  )
}

export default ProductList