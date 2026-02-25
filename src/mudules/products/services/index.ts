'use server';
import { Product } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { ProductsWithImages } from '@/types';
import { redirect } from 'next/navigation';
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

export const upsertProduct = async (prod: Product) => {
  console.log(prod);

  if (prod.id) {
    const updated = await prisma.product.update({
      where: { id: prod.id },
      data: prod,
    });
    return updated;
  } else {
    const { id, ...rest } = prod;
    const created = await prisma.product.create({
      data: rest,
    });
    return created;
  }
};

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: { id },
  });
  redirect('/dashboard/products');
};
