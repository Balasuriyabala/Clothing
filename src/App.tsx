import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Home from './components/Home/Home';
import ProductList from './components/Products/ProductList';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import UserProfile from './components/User/UserProfile';
import AdminPanel from './components/Admin/AdminPanel';
import { products } from './data/products';
import { Product } from './types';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Filter products by category
  const getProductsByCategory = (category: string) => {
    if (category === 'home') return products;
    return products.filter(product => product.category === category);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleOrderPlaced = (orderId: string) => {
    alert(`Order placed successfully! Order ID: ${orderId}`);
    setCurrentPage('profile');
  };

  // If user is not logged in, show auth forms
  if (!user) {
    if (authMode === 'login') {
      return <LoginForm onSwitchToRegister={() => setAuthMode('register')} />;
    } else {
      return <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />;
    }
  }

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      shirts: 'Premium Shirts',
      tshirts: 'Casual T-Shirts',
      trousers: 'Elegant Trousers',
      accessories: 'Fashion Accessories'
    };
    return titles[category] || 'All Products';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && (
          <Home onViewDetails={handleViewDetails} />
        )}
        
        {(currentPage === 'shirts' || currentPage === 'tshirts' || currentPage === 'trousers' || currentPage === 'accessories') && (
          <ProductList
            products={getProductsByCategory(currentPage)}
            title={getCategoryTitle(currentPage)}
            onViewDetails={handleViewDetails}
          />
        )}
        
        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setCurrentPage('home')}
          />
        )}
        
        {currentPage === 'cart' && (
          <Cart onCheckout={handleCheckout} />
        )}
        
        {currentPage === 'checkout' && (
          <Checkout
            onBack={() => setCurrentPage('cart')}
            onOrderPlaced={handleOrderPlaced}
          />
        )}
        
        {currentPage === 'profile' && (
          <UserProfile />
        )}
        
        {currentPage === 'admin' && user.role === 'admin' && (
          <AdminPanel />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;