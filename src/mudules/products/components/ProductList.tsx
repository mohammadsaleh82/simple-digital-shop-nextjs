import { ProductItem } from './ProductItem';
import { getProducts } from '../services';

const ProductList = async () => {
  const products = await getProducts();
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
