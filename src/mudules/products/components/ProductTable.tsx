import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { ProductsWithImages } from '@/types';
import { Edit, NewspaperIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductTable = ({ products }: { products: ProductsWithImages[] }) => {
  return (
    <div className="flex items-center justify-center w-full h-full flex-col gap-4  shadow-xl border-2  bg-gray-100 rounded-lg">
      <div className="flex my-10 items-center justify-between w-full px-4">
        <h1 className="text-2xl font-bold">ProductTable</h1>
        <Button variant={'default'} asChild>
          <Link href={'/dashboard/products/new'}>
            Add New Product <NewspaperIcon className="ml-2" />
          </Link>
        </Button>
      </div>
      <div className="w-full px-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Image
                    width={50}
                    height={50}
                    src={product.images[0]?.image || '/assets/no-image.png'}
                    alt={product.name}
                  />
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell className="flex gap-2">
                  <Button asChild size={'sm'}>
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button size={'sm'}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductTable;
