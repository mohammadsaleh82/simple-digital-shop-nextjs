'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { getProductById } from '../services';

export default function ProductDetail({
  product,
}: {
  product: Awaited<ReturnType<typeof getProductById>>;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderQty, setOrderQty] = useState(1);

  const isOutOfStock = product!.quantity === 0;
  const isLowStock = product!.quantity! > 0 && product!.quantity! < 5;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs / Back Button */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/products"
          className="flex items-center hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to products
        </Link>
        <span>/</span>
        <span className="capitalize">{product!.category}</span>
        <span>/</span>
        <span className="font-medium text-foreground truncate">
          {product!.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted shadow-sm">
            <Image
              src={product!.images[selectedImage]?.image || '/placeholder.png'}
              alt={product!.name}
              fill
              priority
              className="object-cover transition-all duration-500"
            />
            {isLowStock && (
              <Badge
                variant="destructive"
                className="absolute left-4 top-4 px-3 py-1"
              >
                Low Stock: {product!.quantity} left
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {product!.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product!.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary ring-2 ring-primary/10'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.image}
                    alt={product!.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 space-y-2">
            <Badge
              variant="outline"
              className="rounded-full px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {product!.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product!.name}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-primary">
                ${product!.price!.toLocaleString()}
              </p>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">
                Free Shipping Worldwide
              </span>
            </div>
          </div>

          <p className="mb-8 text-muted-foreground leading-relaxed">
            {product!.description}
          </p>

          <Separator className="mb-8" />

          {/* Configuration / Quantity */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide">
                Quantity
              </span>
              <div className="flex items-center rounded-md border bg-card p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setOrderQty(Math.max(1, orderQty - 1))}
                  disabled={orderQty <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">
                  {orderQty}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    setOrderQty(Math.min(product!.quantity!, orderQty + 1))
                  }
                  disabled={orderQty >= product!.quantity!}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 flex-1 gap-2 font-semibold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              disabled={isOutOfStock}
            >
              <ShoppingCart className="h-5 w-5" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 font-semibold transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <Heart className="h-5 w-5" />
              Wishlist
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-12 w-12 shrink-0"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 grid grid-cols-1 gap-4 rounded-xl border bg-muted/30 p-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-xs font-medium">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />2 Year
              Warranty
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <Truck className="h-5 w-5 text-blue-600" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <RotateCcw className="h-5 w-5 text-orange-600" />
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
