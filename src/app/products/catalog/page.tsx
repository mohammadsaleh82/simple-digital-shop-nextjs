import CatalogList from '@/components/catalog/List';
import { Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex-col flex items-center justify-center my-4 mx-auto">
      <CatalogList />
      <Button asChild>
        <Link href={'/products'}>Go Back To Products</Link>
      </Button>
    </div>
  );
};

export default page;
