import React from 'react';
import { Order } from '../../types';
import { MapPin, Truck, Package, CheckCircle } from 'lucide-react';

interface OrderTrackingProps {
  order: Order;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Package },
      { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const currentIndex = steps.findIndex(step => step.key === order.status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const statusSteps = getStatusSteps();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Order Tracking</h3>
        {order.trackingId && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {order.trackingId}
          </span>
        )}
      </div>

      {/* Order Status Timeline */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500 text-white' : 
                  step.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs mt-2 text-center ${
                  step.completed || step.active ? 'text-gray-900 font-medium' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {index < statusSteps.length - 1 && (
                  <div className={`absolute h-0.5 w-full mt-5 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ left: '50%', width: 'calc(100% - 2.5rem)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="border-t pt-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div>
            <p className="font-medium text-gray-900">Delivery Address</p>
            <p className="text-gray-600">{order.address}</p>
          </div>
        </div>
        
        {order.coordinates && (
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps?q=${order.coordinates.lat},${order.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span>View on Google Maps</span>
            </a>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="border-t pt-4 mt-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">
            {order.paymentMethod === 'gpay' ? '📱' : '💰'}
          </span>
          <div>
            <p className="font-medium text-gray-900">Payment Method</p>
            <p className="text-gray-600 capitalize">
              {order.paymentMethod === 'gpay' ? 'Google Pay / UPI' : 'Cash on Delivery'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;