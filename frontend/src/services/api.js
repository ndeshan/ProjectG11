import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuAPI = {
  getAll: () => api.get('/api/menu'),
};

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/api/orders'),
  updateStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
};

export const canteenAPI = {
  getAll: () => api.get('/api/canteens'),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
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