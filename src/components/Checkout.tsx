import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCreditCard, FiLock, FiCheck, FiTruck, FiShield } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { ShippingAddress } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy');

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Section = styled(motion.section)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &:invalid {
    border-color: #ef4444;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethod = styled.div<{ selected: boolean }>`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e5e7eb'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:hover {
    border-color: #667eea;
    background: #f8fafc;
  }
`;

const PaymentIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
`;

const OrderSummary = styled.div`
  position: sticky;
  top: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;
`;

const OrderItemName = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
`;

const OrderItemDetails = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
`;

const OrderItemPrice = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const OrderTotal = styled.div`
  border-top: 2px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &:last-child {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    background: #5a67d8;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.875rem;
  margin-top: 1rem;
  justify-content: center;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    height: 2px;
    background: #e5e7eb;
    z-index: 1;
  }
`;

const Step = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
  
  .step-circle {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: ${props => props.completed ? '#10b981' : props.active ? '#667eea' : '#e5e7eb'};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .step-label {
    font-size: 0.75rem;
    color: ${props => props.active || props.completed ? '#1f2937' : '#6b7280'};
    font-weight: 500;
  }
`;

const Checkout: React.FC = () => {
  const { cart, getTotalPrice, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would integrate with Stripe or another payment processor
      if (paymentMethod === 'stripe') {
        // Stripe payment processing would go here
        toast.success('Payment successful!');
      }
      
      // Clear cart and redirect to success page
      clearCart();
      setCurrentStep(3);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, label: 'Shipping' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Complete' },
  ];

  if (cart.length === 0) {
    return (
      <Container>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ gridColumn: '1 / -1', textAlign: 'center' }}
        >
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to proceed with checkout.</p>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <ProgressSteps>
          {steps.map((step) => (
            <Step
              key={step.number}
              active={currentStep === step.number}
              completed={currentStep > step.number}
            >
              <div className="step-circle">
                {currentStep > step.number ? <FiCheck /> : step.number}
              </div>
              <div className="step-label">{step.label}</div>
            </Step>
          ))}
        </ProgressSteps>

        {currentStep === 1 && (
          <Section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SectionTitle>
              <FiTruck />
              Shipping Information
            </SectionTitle>
            <Form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={shippingAddress.firstName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>
              
              <CheckoutButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Payment
              </CheckoutButton>
            </Form>
          </Section>
        )}

        {currentStep === 2 && (
          <Section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SectionTitle>
              <FiCreditCard />
              Payment Method
            </SectionTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Select Payment Method</Label>
                <PaymentMethod
                  selected={paymentMethod === 'stripe'}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <PaymentIcon>
                    <FiCreditCard />
                  </PaymentIcon>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Credit/Debit Card</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                      Visa, Mastercard, American Express
                    </p>
                  </div>
                </PaymentMethod>
              </FormGroup>
              
              <CheckoutButton
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiLock />
                {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </CheckoutButton>
              
              <SecurityBadge>
                <FiShield />
                Your payment information is secure and encrypted
              </SecurityBadge>
            </Form>
          </Section>
        )}

        {currentStep === 3 && (
          <Section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '4rem', color: '#10b981', marginBottom: '1rem' }}>
              <FiCheck />
            </div>
            <h2>Order Complete!</h2>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
            <p>You will receive a confirmation email shortly.</p>
          </Section>
        )}
      </div>

      <OrderSummary>
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SectionTitle>Order Summary</SectionTitle>
          {cart.map((item) => (
            <OrderItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
              <OrderItemInfo>
                <OrderItemName>{item.product.name}</OrderItemName>
                <OrderItemDetails>
                  Qty: {item.quantity}
                  {item.selectedSize && ` • Size: ${item.selectedSize}`}
                  {item.selectedColor && ` • Color: ${item.selectedColor}`}
                </OrderItemDetails>
              </OrderItemInfo>
              <OrderItemPrice>
                ${(item.product.price * item.quantity).toFixed(2)}
              </OrderItemPrice>
            </OrderItem>
          ))}
          
          <OrderTotal>
            <TotalRow>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </TotalRow>
            <TotalRow>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </TotalRow>
            <TotalRow>
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </TotalRow>
            <TotalRow>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </TotalRow>
          </OrderTotal>
        </Section>
      </OrderSummary>
    </Container>
  );
};

export default Checkout;