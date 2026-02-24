import Image from 'next/image';
import Link from 'next/link';
import { Eye, GalleryThumbnails, ShoppingCart } from 'lucide-react'; // Pro-tip: Use icons for visual cues
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductsWithImages } from '@/types';

 

interface ListItemProps {
  product: ProductsWithImages;
}

export function ProductItem({ product }: ListItemProps) {
  const { id, name, category, quantity, price, images } = product;
  const isLowStock = quantity! > 0 && quantity! < 5;

  return (
    <Card className="group relative overflow-hidden rounded-xl border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-col p-3 sm:flex-row sm:gap-5">
        {/* Thumbnail Container */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg border bg-muted sm:w-32">
          <Image
            src={images[0]?.image || '/placeholder.png'}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isLowStock && (
            <Badge
              variant="destructive"
              className="absolute left-2 top-2 h-5 px-1.5 text-[10px] uppercase tracking-wider"
            >
              Low Stock
            </Badge>
          )}
        </div>

        {/* Info Content */}
        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                  {category}
                </p>
                <Link href={`/products/${id}`}>
                  <h3 className="line-clamp-1 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {name}
                  </h3>
                </Link>
              </div>
              <p className="text-xl font-bold tabular-nums text-foreground">
                ${price!.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end">
              <Button size={'icon-sm'} variant={'default'} asChild>
                <Link href={`/products/catalog?id=${id}`}>
                  <GalleryThumbnails />
                </Link>
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${quantity! > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                />
                {quantity} units available
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 flex items-center gap-2">
            <Button
              asChild
              variant="default"
              size="sm"
              className="h-9 w-full gap-2 font-medium shadow-sm transition-all active:scale-95"
            >
              <Link href={`/products/${id}`}>
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </Button>

            {/* Quick Action Icon Button */}
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-10 shrink-0 border-border/60 hover:bg-primary hover:text-primary-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
