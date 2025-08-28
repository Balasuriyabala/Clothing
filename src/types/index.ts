export interface User {
  id: string;
  email: string;
  name: string;
  mobile: string;
  address: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  category: 'shirts' | 'tshirts' | 'trousers' | 'accessories';
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  address: string;
}