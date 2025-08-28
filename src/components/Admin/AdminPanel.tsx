import React, { useState } from 'react';
import { products } from '../../data/products';
import { Product } from '../../types';
import { Package, Plus, Edit, Save, X, Upload, Image } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product[]>(products);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'shirts',
    price: 0,
    image: '',
    description: '',
    sizes: [],
    colors: [],
    stock: 0
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    setEditForm(product);
    setImagePreview(product.image);
  };

  const handleSaveProduct = () => {
    if (editingProduct && editForm) {
      setProductData(prev => prev.map(p => 
        p.id === editingProduct ? { ...p, ...editForm } as Product : p
      ));
      setEditingProduct(null);
      setEditForm({});
      setImagePreview('');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({});
    setImagePreview('');
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreview(imageUrl);
        if (isEdit) {
          handleInputChange('image', imageUrl);
        } else {
          setNewProduct(prev => ({ ...prev, image: imageUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name!,
        category: newProduct.category as 'shirts' | 'tshirts' | 'trousers' | 'accessories',
        price: newProduct.price!,
        image: newProduct.image!,
        description: newProduct.description!,
        sizes: newProduct.sizes!,
        colors: newProduct.colors!,
        stock: newProduct.stock!
      };
      
      setProductData(prev => [...prev, product]);
      setNewProduct({
        name: '',
        category: 'shirts',
        price: 0,
        image: '',
        description: '',
        sizes: [],
        colors: [],
        stock: 0
      });
      setShowAddProduct(false);
      setImagePreview('');
    }
  };

  const handleArrayInput = (field: 'sizes' | 'colors', value: string, isEdit = false) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    if (isEdit) {
      handleInputChange(field, array);
    } else {
      setNewProduct(prev => ({ ...prev, [field]: array }));
    }
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
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                </div>
                
                {/* Add Product Modal */}
                {showAddProduct && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
                        <button
                          onClick={() => {
                            setShowAddProduct(false);
                            setImagePreview('');
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Product Name *
                            </label>
                            <input
                              type="text"
                              value={newProduct.name || ''}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category *
                            </label>
                            <select
                              value={newProduct.category || 'shirts'}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value as any }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            >
                              <option value="shirts">Shirts</option>
                              <option value="tshirts">T-Shirts</option>
                              <option value="trousers">Trousers</option>
                              <option value="accessories">Accessories</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price *
                            </label>
                            <input
                              type="number"
                              value={newProduct.price || ''}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                              step="0.01"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Stock *
                            </label>
                            <input
                              type="number"
                              value={newProduct.stock || ''}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Product Image *
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              {imagePreview ? (
                                <div className="space-y-2">
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-md"
                                  />
                                  <button
                                    onClick={() => setImagePreview('')}
                                    className="text-red-600 text-sm hover:text-red-800"
                                  >
                                    Remove Image
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">Upload product image</p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, false)}
                                className="hidden"
                                id="new-product-image"
                              />
                              <label
                                htmlFor="new-product-image"
                                className="mt-2 inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
                              >
                                Choose File
                              </label>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sizes (comma-separated)
                            </label>
                            <input
                              type="text"
                              placeholder="S, M, L, XL"
                              onChange={(e) => handleArrayInput('sizes', e.target.value, false)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Colors (comma-separated)
                            </label>
                            <input
                              type="text"
                              placeholder="Black, White, Navy"
                              onChange={(e) => handleArrayInput('colors', e.target.value, false)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newProduct.description || ''}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-4 mt-6">
                        <button
                          onClick={() => {
                            setShowAddProduct(false);
                            setImagePreview('');
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddProduct}
                          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
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
                          Image
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
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {editingProduct === product.id ? (
                                    <input
                                      type="text"
                                      value={editForm.name || ''}
                                      onChange={(e) => handleInputChange('name', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                  ) : (
                                    product.name
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {editingProduct === product.id ? (
                                    <textarea
                                      value={editForm.description || ''}
                                      onChange={(e) => handleInputChange('description', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                      rows={2}
                                    />
                                  ) : (
                                    product.description.substring(0, 50) + '...'
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingProduct === product.id ? (
                              <div className="space-y-2">
                                <img
                                  src={imagePreview || product.image}
                                  alt={product.name}
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, true)}
                                    className="hidden"
                                    id={`edit-image-${product.id}`}
                                  />
                                  <label
                                    htmlFor={`edit-image-${product.id}`}
                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs cursor-pointer hover:bg-gray-200 transition-colors"
                                  >
                                    <Image className="h-3 w-3 mr-1" />
                                    Change
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingProduct === product.id ? (
                              <select
                                value={editForm.category || product.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="shirts">Shirts</option>
                                <option value="tshirts">T-Shirts</option>
                                <option value="trousers">Trousers</option>
                                <option value="accessories">Accessories</option>
                              </select>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                {product.category}
                              </span>
                            )}
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