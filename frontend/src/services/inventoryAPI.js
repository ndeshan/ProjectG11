import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const inventoryAPI = {
  // Check availability of all menu items
  checkMenuAvailability: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/menu-items/availability`);
      return response.data;
    } catch (error) {
      console.error('Error checking menu availability:', error);
      // Return empty array if API fails
      return [];
    }
  },

  // Check stock for specific item
  checkItemStock: async (menuItemId, quantity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory/check-stock/${menuItemId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error checking item stock:', error);
      // Return default availability if API fails
      return {
        can_fulfill: true,
        available_quantity: 50,
        reason: 'Available (offline mode)'
      };
    }
  },

  // Get stock alerts
  getStockAlerts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/alerts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock alerts:', error);
      throw error;
    }
  },

  // Restock item (admin only)
  restockItem: async (menuItemId, quantity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory/restock/${menuItemId}`, {
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error restocking item:', error);
      throw error;
    }
  },

  // Reset daily counts (admin only)
  resetDailyCounts: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory/reset-daily-counts`);
      return response.data;
    } catch (error) {
      console.error('Error resetting daily counts:', error);
      throw error;
    }
  }
};

export default inventoryAPI;