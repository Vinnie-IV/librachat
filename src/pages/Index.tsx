import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchFilter } from '@/components/SearchFilter';
import { ProductGrid } from '@/components/ProductGrid';

interface Product {
  id: string;
  imageUrl: string;
  imageAlt?: string;
  name: string;
  category: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  const allProducts: Product[] = [
    {
      id: '1',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/9ecffff283457ba368f74d92a1d769cea8db2628?placeholderIfAbsent=true',
      imageAlt: 'Product 1',
      name: 'Premium Product 1',
      category: 'electronics'
    },
    {
      id: '2',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/9ecffff283457ba368f74d92a1d769cea8db2628?placeholderIfAbsent=true',
      imageAlt: 'Product 2',
      name: 'Premium Product 2',
      category: 'electronics'
    },
    {
      id: '3',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/9ecffff283457ba368f74d92a1d769cea8db2628?placeholderIfAbsent=true',
      imageAlt: 'Product 3',
      name: 'Home Product 1',
      category: 'home'
    },
    {
      id: '4',
      imageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/9ecffff283457ba368f74d92a1d769cea8db2628?placeholderIfAbsent=true',
      imageAlt: 'Product 4',
      name: 'Fashion Item 1',
      category: 'fashion'
    }
  ];

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }
    
    const query = searchQuery.toLowerCase();
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
    // Here you could navigate to a product detail page or open a modal
  };

  return (
    <div className="flex items-stretch pr-[27px] rounded-[0px_0px_0px_0px] max-md:pr-5 min-h-screen">
      <main className="w-[var(--sds-responsive-device-width)] overflow-hidden grow shrink-0 basis-0 bg-[color:var(--sds-color-background-default-default)] -mr-44 max-md:max-w-full">
        <Header />
        
        <SearchFilter 
          onSearch={handleSearch}
          placeholder="Search products..."
        />
        
        <ProductGrid 
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
        
        {filteredProducts.length === 0 && searchQuery && (
          <div className="flex justify-center items-center py-16 text-[color:var(--sds-color-text-default-tertiary)]">
            <p>No products found for "{searchQuery}". Try a different search term.</p>
          </div>
        )}
      </main>
      
      <aside className="flex-shrink-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/a6f1691049c52f0d0624532815f6c39b99b87724?placeholderIfAbsent=true"
          alt="Sidebar decoration"
          className="aspect-[1.71] object-contain w-[149px] shrink-0 max-w-full mt-[21px]"
        />
      </aside>
    </div>
  );
};

export default Index;
