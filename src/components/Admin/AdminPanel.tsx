import React, { useState } from 'react';
import { products } from '../../data/products';
import { Product } from '../../types';
import { Package, Plus, Edit, Save, X } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product[]>(products);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    setEditForm(product);
  };

  const handleSaveProduct = () => {
    if (editingProduct && editForm) {
      setProductData(prev => prev.map(p => 
        p.id === editingProduct ? { ...p, ...editForm } as Product : p
      ));
      setEditingProduct(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getCategoryStats = () => {
    const stats = productData.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return stats;
  };

  const getTotalStock = () => {
    return productData.reduce((total, product) => total + product.stock, 0);
  };

  const getLowStockProducts = () => {
    return productData.filter(product => product.stock < 10);
  };

  const categoryStats = getCategoryStats();
  const totalStock = getTotalStock();
  const lowStockProducts = getLowStockProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{productData.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(categoryStats).length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'inventory'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Inventory Management
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Product Inventory</h2>
                </div>
                
                {lowStockProducts.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-red-800 mb-2">Low Stock Alert</h3>
                    <p className="text-red-600 mb-3">The following products have low stock (less than 10 items):</p>
                    <div className="space-y-2">
                      {lowStockProducts.map(product => (
                        <div key={product.id} className="flex justify-between items-center bg-white p-3 rounded border">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-red-600 font-bold">{product.stock} items left</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productData.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover mr-4"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.description.substring(0, 50)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {editingProduct === product.id ? (
                              <input
                                type="number"
                                value={editForm.price || ''}
                                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                step="0.01"
                              />
                            ) : (
                              `$${product.price}`
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingProduct === product.id ? (
                              <input
                                type="number"
                                value={editForm.stock || ''}
                                onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
                                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              <span className={`text-sm font-medium ${
                                product.stock < 10 ? 'text-red-600' : 'text-gray-900'
                              }`}>
                                {product.stock}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {editingProduct === product.id ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleSaveProduct}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Save className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;