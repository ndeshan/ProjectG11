import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderNotificationWindow = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for order events
    const handleOrderPlaced = (event) => {
      const orderData = event.detail || {};
      addNotification({
        type: 'success',
        title: '🎉 Order Placed Successfully!',
        message: `Order #${orderData.orderNumber || 'ORD' + Date.now()} has been confirmed`,
        details: `Total: Rs. ${orderData.total || '0'} | Items: ${orderData.itemCount || '0'}`,
        timestamp: new Date()
      });
    };

    const handleOrderReady = (event) => {
      const orderData = event.detail || {};
      addNotification({
        type: 'info',
        title: '🍽️ Order Ready for Pickup!',
        message: `Your order is ready at the canteen`,
        details: `Order #${orderData.orderNumber || 'ORD' + Date.now()}`,
        timestamp: new Date()
      });
    };

    // Add event listeners
    window.addEventListener('orderPlaced', handleOrderPlaced);
    window.addEventListener('orderReady', handleOrderReady);

    return () => {
      window.removeEventListener('orderPlaced', handleOrderPlaced);
      window.removeEventListener('orderReady', handleOrderReady);
    };
  }, []);

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev.slice(0, 2)]); // Keep max 3 notifications
    
    // Auto remove after 8 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 8000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -400, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -400, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`
              bg-white rounded-xl shadow-2xl border-l-4 p-6 cursor-pointer
              hover:shadow-3xl transition-all duration-300 transform hover:scale-105
              ${notification.type === 'success' ? 'border-green-500' :
                notification.type === 'error' ? 'border-red-500' : 'border-blue-500'}
            `}
            style={{ 
              width: '400px', 
              minHeight: '120px'
            }}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-1 ${
                  notification.type === 'success' ? 'text-green-700' :
                  notification.type === 'error' ? 'text-red-700' : 'text-blue-700'
                }`}>
                  {notification.title}
                </h3>
                <p className="text-gray-800 font-medium text-base mb-2">
                  {notification.message}
                </p>
                <p className="text-gray-600 text-sm">
                  {notification.details}
                </p>
              </div>
              <button 
                className="text-gray-400 hover:text-gray-600 ml-4 text-xl font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {notification.timestamp.toLocaleTimeString()}
              </p>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                notification.type === 'success' ? 'bg-green-100 text-green-700' :
                notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {notification.type === 'success' ? 'Success' : 
                 notification.type === 'error' ? 'Error' : 'Info'}
              </div>
            </div>
            
            {/* Progress bar */}
            <motion.div
              className={`mt-3 h-1 rounded-full ${
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
                transition={{ duration: 8, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default OrderNotificationWindow;