import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { mockProducts } from '@/data/mockData';
import ProductCard from './ProductCard';
import { Product } from '@/types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e5e7eb'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.active ? '#5a67d8' : '#f8fafc'};
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: #6b7280;
`;

const ProductsGrid = styled(motion.div)<{ viewMode: string }>`
  display: grid;
  grid-template-columns: ${props => 
    props.viewMode === 'grid' 
      ? 'repeat(auto-fill, minmax(300px, 1fr))' 
      : '1fr'
  };
  gap: 2rem;
  margin-bottom: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6b7280;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const LoadMoreButton = styled(motion.button)`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
`;

const ProductGrid: React.FC = () => {
  const { 
    products, 
    filteredProducts, 
    searchQuery, 
    viewMode, 
    filters,
    setProducts,
    setFilteredProducts,
    setFilters,
    loading,
    setLoading
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Initialize products
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [setProducts, setFilteredProducts, setLoading]);

  // Filter and search products
  useEffect(() => {
    let filtered = [...products];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange![0] && 
        product.price <= filters.priceRange![1]
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        case 'popularity':
          filtered.sort((a, b) => b.reviews - a.reviews);
          break;
      }
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategory, filters, setFilteredProducts]);

  // Pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, productsPerPage]);

  const categories = [...new Set(products.map(product => product.category))];

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSortChange = (sortBy: string) => {
    setFilters({ ...filters, sortBy: sortBy as any });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div>Loading products...</div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <FilterBar>
        <FilterGroup>
          <FilterButton
            active={selectedCategory === ''}
            onClick={() => handleCategoryFilter('')}
          >
            All Products
          </FilterButton>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterGroup>
        
        <SortSelect 
          value={filters.sortBy || ''}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
          <option value="popularity">Popularity</option>
        </SortSelect>
      </FilterBar>

      <ResultsInfo>
        <span>
          Showing {displayedProducts.length} of {filteredProducts.length} products
          {searchQuery && ` for "${searchQuery}"`}
        </span>
        <span>View: {viewMode}</span>
      </ResultsInfo>

      {filteredProducts.length === 0 ? (
        <NoResults>
          <h3>No products found</h3>
          <p>Try adjusting your search criteria or browse different categories.</p>
        </NoResults>
      ) : (
        <>
          <ProductsGrid
            viewMode={viewMode}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onProductClick={(product) => {
                  // Navigate to product details page
                  console.log('View product:', product);
                }}
              />
            ))}
          </ProductsGrid>

          {hasMoreProducts && (
            <LoadMoreButton
              onClick={handleLoadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Products
            </LoadMoreButton>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductGrid;