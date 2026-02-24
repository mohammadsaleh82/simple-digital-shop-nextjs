import ProductTable from '../components/ProductTable';
import { getProducts } from '../services';

const ProductsDashboardView = async () => {
  const products = await getProducts();
  return (
    <div>
      <ProductTable  products={products}/>
    </div>
  );
};

export default ProductsDashboardView;
