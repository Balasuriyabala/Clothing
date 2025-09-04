import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Order } from '../types';

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (address: string, coordinates?: { lat: number; lng: number } | null) => string;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => 
          cartItem.product.id === item.product.id && 
          cartItem.size === item.size && 
          cartItem.color === item.color
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.product.id === item.product.id && 
          cartItem.size === item.size && 
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      
      return [...prevCart, item];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (address: string, coordinates?: { lat: number; lng: number } | null): string => {
    const orderId = Date.now().toString();
    const trackingId = `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newOrder: Order = {
      id: orderId,
      userId: 'current-user',
      items: [...cart],
      total: getCartTotal(),
      status: 'pending',
      date: new Date().toISOString(),
      address,
      coordinates: coordinates || undefined,
      paymentMethod: 'gpay',
      trackingId
    };
    
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    return orderId;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};