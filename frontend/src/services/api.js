import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const canteenAPI = {
  getAll: () => api.get('/canteens'),
  getById: (id) => api.get(`/canteens/${id}`),
  getQueueStatus: (id) => api.get(`/canteens/${id}/queue-status`),
};

export const menuAPI = {
  getAll: (canteenId) => api.get('/menu', { params: { canteen_id: canteenId } }),
  getByCanteen: (canteenId) => api.get('/menu', { params: { canteen_id: canteenId } }),
  getByCategory: (canteenId, category) => api.get(`/menu/canteens/${canteenId}/category/${category}`),
  getFavorites: () => api.get('/menu/favorites'),
  checkAvailability: (itemId) => api.get(`/menu/item/${itemId}/availability`),
};

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const inventoryAPI = {
  checkMenuAvailability: () => api.get('/inventory/menu-items/availability'),
  checkItemStock: (itemId, quantity) => api.post(`/inventory/check-stock/${itemId}`, { quantity }),
  getStockAlerts: () => api.get('/inventory/alerts'),
  restockItem: (itemId, quantity) => api.post(`/inventory/restock/${itemId}`, { quantity }),
  resetDailyCounts: () => api.post('/inventory/reset-daily-counts'),
};

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;