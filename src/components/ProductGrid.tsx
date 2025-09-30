import React from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  imageUrl: string;
  imageAlt?: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductClick, 
  className = '' 
}) => {
  return (
    <section 
      className={`flex w-full gap-[var(--sds-size-space-1600)] pt-[var(--sds-size-space-800)] pr-[var(--sds-size-space-800)] pb-[var(--sds-size-space-800)] pl-[var(--sds-size-space-800)] bg-[color:var(--sds-color-background-default-default)] max-md:max-w-full max-md:px-5 ${className}`}
      aria-label="Product grid"
    >
      <div className="rounded-[var(--sds-size-radius-200)] min-w-60 w-full flex-1 shrink basis-[0%] gap-[var(--sds-size-space-1200)] max-md:max-w-full">
        <div className="items-center content-center flex-wrap flex w-full gap-[var(--sds-size-space-600)] max-md:max-w-full">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
              onClick={() => onProductClick?.(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
