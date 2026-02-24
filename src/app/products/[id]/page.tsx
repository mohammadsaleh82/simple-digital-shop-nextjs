import ProductDetail from '@/mudules/products/components/ProductDetails';
import { getProductById } from '@/mudules/products/services';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default page;
