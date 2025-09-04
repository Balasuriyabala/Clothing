const API_BASE_URL = 'http://localhost:5000/api';

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: 'user' | 'admin';
}

export interface ApiProduct {
  _id: string;
  name: string;
  category: 'shirts' | 'tshirts' | 'trousers' | 'accessories';
  sleeveType?: 'full-sleeve' | 'half-sleeve' | 'sleeveless';
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiOrder {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    size: string;
    color: string;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: 'gpay' | 'cod';
  coordinates?: { lat: number; lng: number };
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authAPI = {
  async login(email: string, password: string): Promise<{ user: ApiUser; message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    mobile: string;
    address: string;
  }): Promise<{ user: ApiUser; message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  }
};

// Products API
export const productsAPI = {
  async getAll(category?: string): Promise<ApiProduct[]> {
    const url = category ? `${API_BASE_URL}/products?category=${category}` : `${API_BASE_URL}/products`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  },

  async getById(id: string): Promise<ApiProduct> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    return response.json();
  },

  async create(productData: FormData): Promise<{ product: ApiProduct; message: string }> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      body: productData
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    return response.json();
  },

  async update(id: string, productData: FormData): Promise<{ product: ApiProduct; message: string }> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      body: productData
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    return response.json();
  },

  async delete(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    
    return response.json();
  }
};

// Orders API
export const ordersAPI = {
  async create(orderData: {
    userId: string;
    items: Array<{
      productId: string;
      quantity: number;
      size: string;
      color: string;
      price: number;
    }>;
    total: number;
    shippingAddress: string;
    paymentMethod: 'gpay' | 'cod';
    coordinates?: { lat: number; lng: number };
  }): Promise<{ order: ApiOrder; message: string }> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return response.json();
  },

  async getUserOrders(userId: string): Promise<ApiOrder[]> {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }
    
    return response.json();
  },

  async getAll(): Promise<ApiOrder[]> {
    const response = await fetch(`${API_BASE_URL}/orders`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    return response.json();
  },

  async updateStatus(id: string, status: string): Promise<{ order: ApiOrder; message: string }> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    
    return response.json();
  }
};

// Admin API
export const adminAPI = {
  async getStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    lowStockProducts: number;
    categoryStats: Array<{ _id: string; count: number }>;
    recentOrders: ApiOrder[];
  }> {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch admin stats');
    }
    
    return response.json();
  }
};

// Upload API
export const uploadAPI = {
  async uploadImage(file: File): Promise<{ imageUrl: string; message: string }> {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    return response.json();
  }
};