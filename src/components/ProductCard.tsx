import React from 'react';

interface ProductCardProps {
  imageUrl: string;
  imageAlt?: string;
  className?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  imageUrl, 
  imageAlt = "Product image", 
  className = '',
  onClick 
}) => {
  return (
    <article 
      className={`min-w-60 items-stretch rounded-[var(--sds-size-radius-200)] border-[length:var(--sds-size-stroke-border)] border-[color:var(--sds-color-border-default-default)] self-stretch flex flex-col justify-center flex-1 shrink basis-[0%] pt-[var(--sds-size-space-400)] pr-[var(--sds-size-space-400)] pb-[var(--sds-size-space-400)] pl-[var(--sds-size-space-400)] gap-[var(--sds-size-space-400)] bg-[color:var(--sds-color-background-default-default)] my-auto border-solid max-md:max-w-full cursor-pointer hover:shadow-lg transition-shadow duration-200 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        className="aspect-[2.12] object-contain w-full min-h-[247px] max-md:max-w-full"
        loading="lazy"
      />
    </article>
  );
};
