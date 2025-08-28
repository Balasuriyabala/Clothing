import React, { useState } from 'react';
import { Product, CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    };
    addToCart(cartItem);
    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(4.8) 127 reviews</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-900">${product.price}</div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor === color
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                        color.toLowerCase() === 'black' ? '#000000' :
                        color.toLowerCase() === 'navy' ? '#001f3f' :
                        color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#808080' :
                        color.toLowerCase() === 'beige' ? '#f5f5dc' :
                        color.toLowerCase() === 'khaki' ? '#f0e68c' :
                        color.toLowerCase() === 'olive' ? '#808000' :
                        color.toLowerCase() === 'light blue' ? '#add8e6' :
                        color.toLowerCase() === 'light grey' ? '#d3d3d3' :
                        color.toLowerCase() === 'charcoal' ? '#36454f' :
                        color.toLowerCase() === 'brown' ? '#a52a2a' :
                        color.toLowerCase() === 'silver' ? '#c0c0c0' :
                        color.toLowerCase() === 'gold' ? '#ffd700' : '#cccccc'
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 px-6 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
              
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  {product.stock} items in stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;