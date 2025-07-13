import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';

const CartOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`;

const CartContainer = styled(motion.div)`
  background: white;
  width: 400px;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #f3f4f6;
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2rem;
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
`;

const ItemBrand = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  background: #f3f4f6;
  border: none;
  padding: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #e5e7eb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-weight: 600;
  color: #1f2937;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #ef4444;
  transition: color 0.3s ease;
  
  &:hover {
    color: #dc2626;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  gap: 1rem;
  color: #6b7280;
`;

const EmptyCartIcon = styled(FiShoppingBag)`
  font-size: 4rem;
  color: #d1d5db;
`;

const CartFooter = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TotalLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
`;

const TotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const ContinueShoppingButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const Cart: React.FC = () => {
  const { 
    cart, 
    cartOpen, 
    toggleCart, 
    removeFromCart, 
    updateCartQuantity, 
    getTotalPrice,
    getTotalItems 
  } = useStore();

  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    toggleCart();
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <CartOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCart}
        >
          <CartContainer
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CartHeader>
              <CartTitle>Shopping Cart ({getTotalItems()})</CartTitle>
              <CloseButton onClick={toggleCart}>
                <FiX size={24} />
              </CloseButton>
            </CartHeader>

            {cart.length === 0 ? (
              <EmptyCart>
                <EmptyCartIcon />
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
              </EmptyCart>
            ) : (
              <>
                <CartItems>
                  {cart.map((item) => (
                    <CartItem
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      layout
                    >
                      <ItemImage 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                      />
                      <ItemDetails>
                        <ItemName>{item.product.name}</ItemName>
                        <ItemBrand>{item.product.brand}</ItemBrand>
                        {item.selectedSize && (
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                            Size: {item.selectedSize}
                          </p>
                        )}
                        {item.selectedColor && (
                          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                            Color: {item.selectedColor}
                          </p>
                        )}
                        <ItemPrice>${(item.product.price * item.quantity).toFixed(2)}</ItemPrice>
                        <QuantityControls>
                          <QuantityButton
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={16} />
                          </QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <FiPlus size={16} />
                          </QuantityButton>
                          <RemoveButton
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <FiTrash2 size={16} />
                          </RemoveButton>
                        </QuantityControls>
                      </ItemDetails>
                    </CartItem>
                  ))}
                </CartItems>

                <CartFooter>
                  <TotalContainer>
                    <TotalLabel>Total:</TotalLabel>
                    <TotalAmount>${getTotalPrice().toFixed(2)}</TotalAmount>
                  </TotalContainer>
                  <CheckoutButton
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </CheckoutButton>
                  <ContinueShoppingButton onClick={handleContinueShopping}>
                    Continue Shopping
                  </ContinueShoppingButton>
                </CartFooter>
              </>
            )}
          </CartContainer>
        </CartOverlay>
      )}
    </AnimatePresence>
  );
};

export default Cart;