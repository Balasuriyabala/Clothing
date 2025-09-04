import { Product } from '../types';

export const products: Product[] = [
  // Shirts
  {
    id: '1',
    name: 'Classic White Formal Shirt',
    category: 'shirts',
    sleeveType: 'full-sleeve',
    price: 1299,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Premium cotton formal shirt perfect for office and formal occasions',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Black'],
    stock: 50
  },
  {
    id: '2',
    name: 'Casual Cotton Shirt',
    category: 'shirts',
    sleeveType: 'half-sleeve',
    price: 899,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Comfortable cotton shirt for casual wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Grey', 'Green'],
    stock: 30
  },
  {
    id: '3',
    name: 'Linen Full Sleeve Shirt',
    category: 'shirts',
    sleeveType: 'full-sleeve',
    price: 1599,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Breathable linen shirt perfect for Indian summers',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'White', 'Light Grey'],
    stock: 25
  },
  // T-Shirts
  {
    id: '4',
    name: 'Premium Cotton T-Shirt',
    category: 'tshirts',
    sleeveType: 'half-sleeve',
    price: 599,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Soft cotton t-shirt with modern fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Grey', 'Navy'],
    stock: 100
  },
  {
    id: '5',
    name: 'Full Sleeve T-Shirt',
    category: 'tshirts',
    sleeveType: 'full-sleeve',
    price: 699,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Comfortable full sleeve t-shirt for all seasons',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Maroon'],
    stock: 75
  },
  {
    id: '6',
    name: 'Sleeveless Vest',
    category: 'tshirts',
    sleeveType: 'sleeveless',
    price: 399,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Cotton sleeveless vest for gym and casual wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Grey'],
    stock: 60
  },
  // Trousers
  {
    id: '7',
    name: 'Formal Dress Pants',
    category: 'trousers',
    price: 1499,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Tailored dress pants for professional wear',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Black', 'Navy', 'Charcoal'],
    stock: 40
  },
  {
    id: '8',
    name: 'Casual Chinos',
    category: 'trousers',
    price: 999,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Comfortable chinos for everyday wear',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Olive'],
    stock: 60
  },
  // Accessories
  {
    id: '9',
    name: 'Leather Belt',
    category: 'accessories',
    price: 799,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Genuine leather belt with classic buckle',
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Black', 'Brown'],
    stock: 25
  },
  {
    id: '10',
    name: 'Classic Watch',
    category: 'accessories',
    price: 2999,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Elegant timepiece for the modern gentleman',
    sizes: ['One Size'],
    colors: ['Silver', 'Gold', 'Black'],
    stock: 15
  }
];