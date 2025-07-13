import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar, FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { Product, ViewMode } from '@/types';
import { useStore } from '@/store/useStore';

const CardContainer = styled(motion.div)<{ viewMode: ViewMode }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: ${props => props.viewMode === 'list' ? 'flex' : 'block'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div<{ viewMode: ViewMode }>`
  position: relative;
  overflow: hidden;
  width: ${props => props.viewMode === 'list' ? '300px' : '100%'};
  height: ${props => props.viewMode === 'list' ? '200px' : '250px'};
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: white;
  border: none;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Badge = styled.div<{ type: 'new' | 'discount' }>`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${props => props.type === 'new' ? '#10b981' : '#ef4444'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const ContentContainer = styled.div<{ viewMode: ViewMode }>`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.viewMode === 'list' ? '0.5rem' : '1rem'};
`;

const ProductTitle = styled.h3<{ viewMode: ViewMode }>`
  font-size: ${props => props.viewMode === 'list' ? '1.25rem' : '1.125rem'};
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
`;

const ProductBrand = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const ProductDescription = styled.p<{ viewMode: ViewMode }>`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
  display: ${props => props.viewMode === 'list' ? 'block' : 'none'};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #667eea;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StarIcon = styled(FiStar)<{ filled: boolean }>`
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  fill: ${props => props.filled ? '#fbbf24' : 'none'};
`;

const RatingText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
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

const FeaturesList = styled.ul<{ viewMode: ViewMode }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${props => props.viewMode === 'list' ? 'flex' : 'none'};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FeatureItem = styled.li`
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  color: #6b7280;
`;

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onProductClick }) => {
  const { addToCart } = useStore();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onProductClick?.(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < Math.floor(rating)} />
    ));
  };

  return (
    <CardContainer
      viewMode={viewMode}
      onClick={() => onProductClick?.(product)}
      whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1.01 }}
      layout
    >
      <ImageContainer viewMode={viewMode}>
        <ProductImage src={product.images[0]} alt={product.name} />
        <ImageOverlay>
          <ActionButton onClick={handleWishlist}>
            <FiHeart style={{ color: isWishlisted ? '#ef4444' : '#6b7280' }} />
          </ActionButton>
          <ActionButton onClick={handleQuickView}>
            <FiEye style={{ color: '#6b7280' }} />
          </ActionButton>
          <ActionButton onClick={handleAddToCart}>
            <FiShoppingCart style={{ color: '#667eea' }} />
          </ActionButton>
        </ImageOverlay>
        
        {product.isNew && <Badge type="new">New</Badge>}
        {product.discount && <Badge type="discount">{product.discount}% OFF</Badge>}
      </ImageContainer>
      
      <ContentContainer viewMode={viewMode}>
        <ProductTitle viewMode={viewMode}>{product.name}</ProductTitle>
        <ProductBrand>{product.brand}</ProductBrand>
        
        {viewMode === 'list' && (
          <ProductDescription viewMode={viewMode}>
            {product.description}
          </ProductDescription>
        )}
        
        <RatingContainer>
          {renderStars(product.rating)}
          <RatingText>({product.reviews})</RatingText>
        </RatingContainer>
        
        {viewMode === 'list' && (
          <FeaturesList viewMode={viewMode}>
            {product.features.slice(0, 4).map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        )}
        
        <PriceContainer>
          <CurrentPrice>${product.price}</CurrentPrice>
          {product.originalPrice && (
            <OriginalPrice>${product.originalPrice}</OriginalPrice>
          )}
        </PriceContainer>
        
        <AddToCartButton
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add to Cart
        </AddToCartButton>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProductCard;