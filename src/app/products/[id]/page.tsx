import ProductDetail from '@/mudules/products/components/ProductDetails';
import { DATA } from '@/mudules/products/mock/products';

const data = DATA[0];
const page = () => {
  return (
    <div>
      <ProductDetail product={data} />
    </div>
  );
};

export default page;
