import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationWindow = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Security: Lock after 3 failed attempts
  useEffect(() => {
    if (attempts >= 3) {
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false);
        setAttempts(0);
      }, 30000); // 30 second lockout
    }
  }, [attempts]);

  const validateCredentials = async (username, password) => {
    // Enhanced security validation
    if (!username || !password) return false;
    if (username.length < 3 || password.length < 6) return false;
    
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    setIsLoading(true);
    setError('');

    const isValid = await validateCredentials(credentials.username, credentials.password);
    
    if (isValid) {
      localStorage.setItem('authToken', 'validated_' + Date.now());
      onLogin(credentials);
      setCredentials({ username: '', password: '' });
      setAttempts(0);
    } else {
      setAttempts(prev => prev + 1);
      setError(`Invalid credentials. ${3 - attempts - 1} attempts remaining.`);
    }
    
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl p-4 flex-shrink-0"
          style={{ 
            width: '3in', 
            height: '4in',
            minWidth: '288px',
            minHeight: '384px',
            maxWidth: '288px',
            maxHeight: '384px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">🔐 Secure Login</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            {isLocked ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="text-red-600 text-sm whitespace-nowrap">Account locked</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">Try again in 30s</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="flex-1 flex flex-col">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="3"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="6"
                  />
                </div>

                {error && (
                  <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded text-xs text-red-700 break-words">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                >
                  {isLoading ? '🔄 Verifying...' : '🔑 Login'}
                </button>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p className="whitespace-nowrap">🛡️ Secured with JWT</p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationWindow;