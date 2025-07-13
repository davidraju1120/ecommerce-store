import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiGrid, FiList } from 'react-icons/fi';
import { useStore } from '@/store/useStore';
import { ViewMode } from '@/types';

const HeaderContainer = styled.header`
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(motion.h1)`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ViewToggle = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 0.25rem;
`;

const ViewButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: none;
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#667eea' : '#e5e7eb'};
  }
`;

const CartButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #e5e7eb;
  }
`;

const Header: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    viewMode, 
    setViewMode, 
    toggleCart, 
    getTotalItems 
  } = useStore();

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          EliteStore
        </Logo>
        
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        
        <ActionsContainer>
          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => handleViewModeChange('grid')}
            >
              <FiGrid />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => handleViewModeChange('list')}
            >
              <FiList />
            </ViewButton>
          </ViewToggle>
          
          <CartButton
            onClick={toggleCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingCart />
            {getTotalItems() > 0 && (
              <CartBadge>{getTotalItems()}</CartBadge>
            )}
          </CartButton>
          
          <UserButton>
            <FiUser />
          </UserButton>
        </ActionsContainer>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;