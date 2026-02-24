import { Prisma } from '@/generated/prisma/client';

export type ProductsWithImages = Prisma.ProductGetPayload<{
  include: {
    images: true;
  };
}>;
