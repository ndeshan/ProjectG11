import React, { useState, useEffect } from 'react';
import NotificationWindow from './NotificationWindow';
import NotificationDisplay from './NotificationDisplay';
import OrderNotificationWindow from './OrderNotificationWindow';

const NotificationManager = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check existing auth
    const token = localStorage.getItem('authToken');
    if (token && token.startsWith('validated_')) {
      setIsAuthenticated(true);
    }

    // Auto-show login for admin access
    const checkAdminAccess = () => {
      if (window.location.pathname.includes('/admin') && !isAuthenticated) {
        setShowLogin(true);
      }
    };

    checkAdminAccess();
  }, [isAuthenticated]);

  const handleLogin = (credentials) => {
    setIsAuthenticated(true);
    setShowLogin(false);
    addNotification('✅ Login successful', 'success');
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    addNotification('🔓 Logged out', 'info');
  };

  return (
    <>
      {/* Notification Display */}
      <NotificationDisplay />
      
      {/* Large Order Notification */}
      <OrderNotificationWindow />

      {/* Security status indicator */}
      {isAuthenticated && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-green-100 border border-green-300 rounded-lg px-3 py-2 text-sm">
            <span className="text-green-700">🔒 Secured</span>
            <button onClick={logout} className="ml-2 text-green-600 hover:text-green-800">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Login window */}
      <NotificationWindow
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />


    </>
  );
};

export default NotificationManager;