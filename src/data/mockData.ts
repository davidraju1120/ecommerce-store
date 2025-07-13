import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    brand: 'AudioTech',
    price: 299.99,
    originalPrice: 399.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Audio',
    inStock: true,
    rating: 4.5,
    reviews: 128,
    features: ['Noise Cancellation', 'Bluetooth 5.0', '30-hour battery', 'Fast charging'],
    colors: ['Black', 'White', 'Silver'],
    discount: 25,
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    brand: 'FitTech',
    price: 199.99,
    originalPrice: 249.99,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Wearables',
    inStock: true,
    rating: 4.2,
    reviews: 89,
    features: ['Heart Rate Monitor', 'GPS', 'Water resistant', 'Sleep tracking'],
    colors: ['Black', 'Blue', 'Rose Gold'],
    discount: 20,
    isNew: false,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    brand: 'EcoWear',
    price: 29.99,
    originalPrice: 39.99,
    description: 'Comfortable organic cotton t-shirt with sustainable materials.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop'
    ],
    category: 'Clothing',
    subcategory: 'Tops',
    inStock: true,
    rating: 4.7,
    reviews: 45,
    features: ['Organic cotton', 'Eco-friendly', 'Soft texture', 'Machine washable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    discount: 25,
    isNew: true,
    isFeatured: false
  },
  {
    id: '4',
    name: 'Professional Camera',
    brand: 'PhotoPro',
    price: 1299.99,
    originalPrice: 1499.99,
    description: 'High-resolution DSLR camera perfect for professional photography.',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Cameras',
    inStock: true,
    rating: 4.8,
    reviews: 156,
    features: ['24.2MP sensor', '4K video', 'WiFi connectivity', 'Weather sealed'],
    colors: ['Black'],
    discount: 13,
    isNew: false,
    isFeatured: true
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    brand: 'GameTech',
    price: 129.99,
    originalPrice: 159.99,
    description: 'RGB mechanical keyboard with custom switches for gaming.',
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Gaming',
    inStock: true,
    rating: 4.4,
    reviews: 67,
    features: ['RGB lighting', 'Mechanical switches', 'Programmable keys', 'USB-C'],
    colors: ['Black', 'White'],
    discount: 19,
    isNew: true,
    isFeatured: false
  },
  {
    id: '6',
    name: 'Leather Backpack',
    brand: 'StyleCraft',
    price: 89.99,
    originalPrice: 119.99,
    description: 'Premium leather backpack perfect for work and travel.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&h=500&fit=crop'
    ],
    category: 'Accessories',
    subcategory: 'Bags',
    inStock: true,
    rating: 4.6,
    reviews: 34,
    features: ['Genuine leather', 'Laptop compartment', 'Water resistant', 'Adjustable straps'],
    colors: ['Brown', 'Black', 'Tan'],
    discount: 25,
    isNew: false,
    isFeatured: true
  },
  {
    id: '7',
    name: 'Wireless Bluetooth Speaker',
    brand: 'SoundWave',
    price: 79.99,
    originalPrice: 99.99,
    description: 'Portable Bluetooth speaker with crystal clear sound.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    subcategory: 'Audio',
    inStock: true,
    rating: 4.3,
    reviews: 92,
    features: ['Wireless', '12-hour battery', 'Waterproof', 'Voice assistant'],
    colors: ['Black', 'Blue', 'Red'],
    discount: 20,
    isNew: true,
    isFeatured: false
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    brand: 'LuxVision',
    price: 149.99,
    originalPrice: 199.99,
    description: 'Stylish designer sunglasses with UV protection.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&h=500&fit=crop'
    ],
    category: 'Accessories',
    subcategory: 'Eyewear',
    inStock: true,
    rating: 4.5,
    reviews: 78,
    features: ['UV protection', 'Polarized lenses', 'Lightweight frame', 'Case included'],
    colors: ['Black', 'Brown', 'Silver'],
    discount: 25,
    isNew: false,
    isFeatured: true
  }
];