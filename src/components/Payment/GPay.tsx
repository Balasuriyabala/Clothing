import React from 'react';
import { Smartphone, CreditCard } from 'lucide-react';

interface GPayProps {
  amount: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

const GPay: React.FC<GPayProps> = ({ amount, onPaymentSuccess, onPaymentCancel }) => {
  const handleGPayPayment = () => {
    // UPI payment URL for Indian market
    const merchantVPA = 'merchant@paytm'; // Replace with actual merchant VPA
    const merchantName = 'MensWear India';
    const transactionNote = 'Clothing Purchase';
    
    const upiUrl = `upi://pay?pa=${merchantVPA}&pn=${encodeURIComponent(merchantName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    // Try to open UPI app
    const link = document.createElement('a');
    link.href = upiUrl;
    link.click();
    
    // For demo purposes, simulate payment success after 3 seconds
    setTimeout(() => {
      const confirmed = confirm('Payment completed successfully! Click OK to confirm or Cancel to retry.');
      if (confirmed) {
        onPaymentSuccess();
      } else {
        onPaymentCancel();
      }
    }, 3000);
  };

  const handlePhonePePayment = () => {
    // PhonePe payment URL
    const phonepeUrl = `phonepe://pay?pa=merchant@paytm&pn=MensWear&am=${amount.toFixed(2)}&cu=INR`;
    window.open(phonepeUrl, '_blank');
    
    setTimeout(() => {
      const confirmed = confirm('Payment completed successfully! Click OK to confirm or Cancel to retry.');
      if (confirmed) {
        onPaymentSuccess();
      } else {
        onPaymentCancel();
      }
    }, 3000);
  };

  const handlePaytmPayment = () => {
    // Paytm payment URL
    const paytmUrl = `paytmmp://pay?pa=merchant@paytm&pn=MensWear&am=${amount.toFixed(2)}&cu=INR`;
    window.open(paytmUrl, '_blank');
    
    setTimeout(() => {
      const confirmed = confirm('Payment completed successfully! Click OK to confirm or Cancel to retry.');
      if (confirmed) {
        onPaymentSuccess();
      } else {
        onPaymentCancel();
      }
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h3>
      
      <div className="space-y-4">
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-gray-900">Amount to Pay: ₹{amount.toFixed(2)}</p>
        </div>
        
        {/* Google Pay */}
        <button
          onClick={handleGPayPayment}
          className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Smartphone className="h-6 w-6" />
          <span className="text-lg font-medium">Pay with Google Pay</span>
        </button>
        
        {/* PhonePe */}
        <button
          onClick={handlePhonePePayment}
          className="w-full flex items-center justify-center space-x-3 bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Smartphone className="h-6 w-6" />
          <span className="text-lg font-medium">Pay with PhonePe</span>
        </button>
        
        {/* Paytm */}
        <button
          onClick={handlePaytmPayment}
          className="w-full flex items-center justify-center space-x-3 bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <CreditCard className="h-6 w-6" />
          <span className="text-lg font-medium">Pay with Paytm</span>
        </button>
        
        {/* Cancel */}
        <button
          onClick={onPaymentCancel}
          className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel Payment
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> You will be redirected to your UPI app to complete the payment. 
          Please ensure you have Google Pay, PhonePe, or Paytm installed on your device.
        </p>
      </div>
    </div>
  );
};

export default GPay;