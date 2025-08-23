import { supabaseAPI } from '../lib/supabase';

export const canteenAPI = {
  getAll: () => supabaseAPI.getCanteens(),
  getById: (id) => supabaseAPI.getCanteens(),
  getQueueStatus: (id) => Promise.resolve({
    data: {
      canteen_id: id,
      queue_length: Math.floor(Math.random() * 30),
      estimated_wait_time: Math.floor(Math.random() * 20),
      peak_status: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
    }
  }),
};

export const menuAPI = {
  getAll: (canteenId) => supabaseAPI.getMenuItems(canteenId),
  getByCategory: (canteenId, category) => supabaseAPI.getMenuItems(canteenId, category),
  getFavorites: () => supabaseAPI.getMenuItems(),
};

export const orderAPI = {
  create: (orderData) => supabaseAPI.createOrder(orderData),
  getAll: () => supabaseAPI.getOrders(),
  getById: (id) => supabaseAPI.getOrders(),
  updateStatus: (id, status) => Promise.resolve({ data: { order: { id, status } } }),
};