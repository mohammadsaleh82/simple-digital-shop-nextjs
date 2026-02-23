import { MonitorSmartphone } from 'lucide-react';
import React from 'react';
import { Button } from './ui';
import Link from 'next/link';

const Welcome = () => {
  return (
    <div className="flex flex-col  items-center justify-center mt-6">
      <span>Welcome to</span>
      <div className="flex items-center gap-3">
        <MonitorSmartphone />
        <span className="text-2xl text-bold text-gray-800">Digital Shop</span>
      </div>
      <Button asChild variant={'default'} className='mt-6'>
        <Link href={'/products'}>Go To Products</Link>
      </Button>
    </div>
  );
};

export default Welcome;
