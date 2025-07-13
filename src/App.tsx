import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #1f2937;
    line-height: 1.6;
  }
  
  #root {
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
`;

const Footer = styled.footer`
  background: #1f2937;
  color: white;
  padding: 3rem 2rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #f9fafb;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products" element={<ProductGrid />} />
          </Routes>
        </MainContent>
        <Cart />
        <Footer>
          <FooterContent>
            <FooterSection>
              <h3>EliteStore</h3>
              <p>Your premium destination for quality products with exceptional service and unbeatable prices.</p>
            </FooterSection>
            <FooterSection>
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </FooterSection>
            <FooterSection>
              <h3>Categories</h3>
              <ul>
                <li><a href="/electronics">Electronics</a></li>
                <li><a href="/clothing">Clothing</a></li>
                <li><a href="/accessories">Accessories</a></li>
                <li><a href="/home">Home & Garden</a></li>
              </ul>
            </FooterSection>
            <FooterSection>
              <h3>Customer Service</h3>
              <ul>
                <li><a href="/shipping">Shipping Info</a></li>
                <li><a href="/returns">Returns</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </FooterSection>
          </FooterContent>
          <FooterBottom>
            <p>&copy; 2024 EliteStore. All rights reserved. Built with React, TypeScript, and ❤️</p>
          </FooterBottom>
        </Footer>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />
      </AppContainer>
    </Router>
  );
};

export default App;