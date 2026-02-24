import { prisma } from '@/lib/prisma';
import { ProductsWithImages } from '@/types';

export const getProducts = async (): Promise<ProductsWithImages[]> => {
  const data = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  return data;
};

export const getProductById = async (
  id: string,
): Promise<ProductsWithImages | null> => {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      images: true,
    },
  });
  if (!product) {
    return null;
  }
  return product;
};
