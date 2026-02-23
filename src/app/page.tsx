import { Banner } from '@/components/banner';
import Welcome from '@/components/Welcome';
import { prisma, PrismaType } from '@/lib/prisma';

export default async function Home() {
  const data: PrismaType.Product[] = await prisma.product.findMany();
  console.log(data);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Banner />
      <Welcome />
    </div>
  );
}
