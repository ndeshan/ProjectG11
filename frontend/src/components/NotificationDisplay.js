import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationDisplay = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for order notifications
    const handleOrderPlaced = () => {
      addNotification('🍽️ Order placed successfully!', 'success');
    };

    const handleOrderReady = () => {
      addNotification('✅ Your order is ready for pickup!', 'info');
    };

    const handlePaymentSuccess = () => {
      addNotification('💳 Payment processed successfully', 'success');
    };

    // Add event listeners
    window.addEventListener('orderPlaced', handleOrderPlaced);
    window.addEventListener('orderReady', handleOrderReady);
    window.addEventListener('paymentSuccess', handlePaymentSuccess);

    // Demo notification on load
    setTimeout(() => {
      addNotification('🔔 Notification system active', 'info');
    }, 1000);

    return () => {
      window.removeEventListener('orderPlaced', handleOrderPlaced);
      window.removeEventListener('orderReady', handleOrderReady);
      window.removeEventListener('paymentSuccess', handlePaymentSuccess);
    };
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, timestamp: new Date() }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`
              bg-white rounded-lg shadow-2xl border-l-4 p-4 cursor-pointer
              hover:shadow-xl transition-shadow duration-200
              ${notification.type === 'success' ? 'border-green-500' :
                notification.type === 'error' ? 'border-red-500' : 'border-blue-500'}
            `}
            style={{ 
              width: '3in', 
              minHeight: '1in',
              maxWidth: '288px'
            }}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                ✕
              </button>
            </div>
            
            {/* Progress bar */}
            <motion.div
              className={`mt-2 h-1 rounded-full ${
                notification.type === 'success' ? 'bg-green-200' :
                notification.type === 'error' ? 'bg-red-200' : 'bg-blue-200'
              }`}
            >
              <motion.div
                className={`h-full rounded-full ${
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDisplay;