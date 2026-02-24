import { Product } from '@/generated/prisma/client';
import ProductForm from '@/mudules/products/components/ProductForm';
import { getProductById } from '@/mudules/products/services';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <div>
      <ProductForm product={product as Product} />
    </div>
  );
};

export default page;
