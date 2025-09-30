import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onSearch, 
  placeholder = "Search", 
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section 
      className={`bg-white flex min-h-10 w-[327px] max-w-full items-center gap-2.5 text-base text-[color:var(--sds-color-text-default-tertiary)] font-normal whitespace-nowrap leading-none ${className}`}
      role="search"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="items-center rounded-[var(--sds-size-radius-full)] border-[length:var(--sds-size-stroke-border)] border-[color:var(--sds-color-border-default-default)] self-stretch flex min-w-60 w-[327px] gap-[var(--sds-size-space-200)] overflow-hidden pt-[var(--sds-size-space-300)] pr-[var(--sds-size-space-400)] pb-[var(--sds-size-space-300)] pl-[var(--sds-size-space-400)] bg-[color:var(--sds-color-background-default-default)] my-auto border-solid">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="text-[color:var(--sds-color-text-default-tertiary)] text-[length:var(--sds-typography-body-size-medium)] font-[number:var(--sds-typography-body-font-weight-regular)] self-stretch flex-1 shrink basis-[0%] my-auto bg-transparent border-none outline-none placeholder:text-[color:var(--sds-color-text-default-tertiary)]"
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0f3c470a3af93891b9c1b98ebc56f1c0799dcf9b?placeholderIfAbsent=true"
              alt=""
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
            />
          </button>
        </div>
      </form>
    </section>
  );
};
