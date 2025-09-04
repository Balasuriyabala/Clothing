import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { id: 'home', name: 'Home' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'tshirts', name: 'T-Shirts' },
    { id: 'trousers', name: 'Trousers' },
    { id: 'accessories', name: 'Accessories' }
  ];

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={() => onPageChange('home')}
          >
            🇮🇳 MEN'S WEAR INDIA
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onPageChange(category.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === category.id
                    ? 'bg-yellow-400 text-black'
                    : 'hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <button
                  onClick={() => onPageChange('cart')}
                  className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ShoppingBag className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => onPageChange('profile')}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
                
                {user.role === 'admin' && (
                  <button
                    onClick={() => onPageChange('admin')}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Settings className="h-6 w-6" />
                  </button>
                )}
                
                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
                
                <span className="text-sm text-gray-300">
                  Welcome, {user.name}
                </span>
              </>
            )}
          </div>
        </div>
        
        <nav className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onPageChange(category.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === category.id
                    ? 'bg-yellow-400 text-black'
                    : 'hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;