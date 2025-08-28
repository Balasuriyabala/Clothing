import { Product } from '../types';

export const products: Product[] = [
  // Shirts
  {
    id: '1',
    name: 'Classic White Dress Shirt',
    category: 'shirts',
    price: 79.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Premium cotton dress shirt perfect for formal occasions',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Black'],
    stock: 50
  },
  {
    id: '2',
    name: 'Casual Linen Shirt',
    category: 'shirts',
    price: 65.99,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Breathable linen shirt for casual summer days',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Light Grey', 'Navy'],
    stock: 30
  },
  // T-Shirts
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    category: 'tshirts',
    price: 29.99,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Soft cotton t-shirt with modern fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Grey', 'Navy'],
    stock: 100
  },
  {
    id: '4',
    name: 'Graphic Print Tee',
    category: 'tshirts',
    price: 35.99,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Trendy graphic print t-shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White'],
    stock: 75
  },
  // Trousers
  {
    id: '5',
    name: 'Formal Dress Pants',
    category: 'trousers',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Tailored dress pants for professional wear',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Navy', 'Charcoal'],
    stock: 40
  },
  {
    id: '6',
    name: 'Casual Chinos',
    category: 'trousers',
    price: 59.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Comfortable chinos for everyday wear',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Olive'],
    stock: 60
  },
  // Accessories
  {
    id: '7',
    name: 'Leather Belt',
    category: 'accessories',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Genuine leather belt with classic buckle',
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Black', 'Brown'],
    stock: 25
  },
  {
    id: '8',
    name: 'Classic Watch',
    category: 'accessories',
    price: 199.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Elegant timepiece for the modern gentleman',
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Black'],
    stock: 15
  }
];