'use client';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { Category, Product } from '@/generated/prisma/browser';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { upsertProduct } from '../services';
import { redirect } from 'next/navigation';
import UploadeImage from './UploadImage';

const ProductForm = ({ product }: { product: Product | null }) => {
  const { register, setValue, handleSubmit } = useForm<Product>();
  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      id: product?.id,
      price: parseFloat(data.price!.toString()) || 0,
      quantity: parseInt(data.quantity!.toString()) || 0,
    };
    await upsertProduct(payload as Product);
    redirect('/dashboard/products');
  });
  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>{product ? 'Edit' : 'New'} Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <Field>
              <FieldLabel htmlFor="name">Product Name</FieldLabel>
              <Input
                {...register('name', { required: true })}
                type="text"
                defaultValue={product?.name || ''}
                id="name"
                placeholder="name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...register('description')}
                id="description"
                defaultValue={product?.description || ''}
                placeholder="description"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                {...register('price')}
                type="number"
                defaultValue={product?.price || 0}
                id="price"
                placeholder="price"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
              <Input
                {...register('quantity')}
                type="number"
                defaultValue={product?.quantity || 0}
                id="quantity"
                placeholder="quantity"
              />
            </Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select
                onValueChange={(value) =>
                  setValue('category', value as Category)
                }
                required
                defaultValue={product?.category || Category.Others}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant={'default'}
            type="submit"
            className="w-full cursor-pointer"
          >
            {product ? 'Update' : 'Create'} Product
          </Button>
          <Button variant={'outline'} asChild className="w-full cursor-pointer">
            <Link href={'/dashboard/products'}>Cancel </Link>
          </Button>

          {product && product.id && <UploadeImage productId={product.id} />}
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductForm;
