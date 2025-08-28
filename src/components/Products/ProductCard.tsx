import React from 'react';
import { Product } from '../../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock < 10 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            Low Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map(color => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300"
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
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {product.sizes.length} sizes available
          </span>
          <button
            onClick={() => onViewDetails(product)}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;