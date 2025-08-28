import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role'> & { password: string }) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@menswear.com',
    name: 'Admin User',
    mobile: '9876543210',
    address: '123 Admin Street, City',
    role: 'admin',
    password: 'admin123'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    mobile: '9876543211',
    address: '456 User Avenue, City',
    role: 'user',
    password: 'user123'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData: Omit<User, 'id' | 'role'> & { password: string }): boolean => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      role: 'user'
    };
    const userWithPassword = { ...newUser, password: userData.password };
    mockUsers.push(userWithPassword);
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};