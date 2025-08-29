import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Card, CardContent, Typography, Box, Button, TextField, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Chip, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, 
  ListItemText, InputAdornment, Tabs, Tab, IconButton, Avatar, Switch,
  FormControlLabel, Select, MenuItem, FormControl, InputLabel, Divider
} from '@mui/material';
import { 
  Dashboard, People, Restaurant, ShoppingCart, Analytics, Settings,
  Add, Edit, Delete, Search, Visibility, TrendingUp, AttachMoney,
  Schedule, Notifications, Security, Upload, Warehouse
} from '@mui/icons-material';
import InventoryManagement from '../components/InventoryManagement';
import DatabaseStatus from '../components/DatabaseStatus';
import { orderAPI, menuAPI, canteenAPI } from '../services/api';

const EnhancedAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [menuItemDialog, setMenuItemDialog] = useState({ open: false, item: null });
  const [userDialog, setUserDialog] = useState({ open: false, user: null });
  
  // Form states
  const [newMenuItem, setNewMenuItem] = useState({
    name: '', name_tamil: '', description: '', price: '', category: '', image_url: ''
  });
  const [filters, setFilters] = useState({
    orderStatus: 'all',
    dateRange: 'today',
    canteenId: 'all'
  });

  useEffect(() => {
    fetchDashboardData();
    fetchOrders();
    fetchMenuItems();
    setupWebSocket();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get current orders from state or localStorage
      const currentOrders = orders.length > 0 ? orders : JSON.parse(localStorage.getItem('user_orders') || '[]');
      
      // Calculate stats from real data
      const today = new Date().toDateString();
      const todayOrders = currentOrders.filter(order => {
        const orderDate = order.created_at || order.timestamp;
        return orderDate && new Date(orderDate).toDateString() === today;
      });
      
      const pendingOrders = currentOrders.filter(order => 
        ['pending', 'confirmed', 'preparing'].includes(order.status)
      );
      
      // Calculate revenue from completed orders only
      const completedOrders = currentOrders.filter(order => order.status === 'completed');
      const todayRevenue = completedOrders
        .filter(order => {
          const orderDate = order.completed_at || order.created_at || order.timestamp;
          return orderDate && new Date(orderDate).toDateString() === today;
        })
        .reduce((sum, order) => {
          const amount = order.total_amount || order.total || 
            (order.items && order.items.reduce((itemSum, item) => 
              itemSum + (item.price * item.quantity || item.total || 0), 0)) || 0;
          return sum + parseFloat(amount);
        }, 0);
      
      setStats({
        total_orders_today: todayOrders.length,
        pending_orders: pendingOrders.length,
        revenue_today: todayRevenue,
        avg_preparation_time: 15,
        total_users: 5,
        active_menu_items: menuItems.length,
        customer_satisfaction: 4.6
      });
      
      console.log('Dashboard stats updated:', {
        todayOrders: todayOrders.length,
        pendingOrders: pendingOrders.length,
        completedOrders: completedOrders.length,
        todayRevenue
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      // Try to fetch from API first
      try {
        const response = await orderAPI.getAll();
        let apiOrders = response.data || [];
        
        // If API returns array directly
        if (Array.isArray(response)) {
          apiOrders = response;
        }
        
        console.log('Admin loaded orders from API:', apiOrders.length, 'orders');
        setOrders(apiOrders);
        
        // Also sync with localStorage
        const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        if (storedOrders.length > apiOrders.length) {
          setOrders(storedOrders);
          console.log('Using localStorage orders:', storedOrders.length, 'orders');
        }
      } catch (apiError) {
        console.log('API not available, using local data');
        const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        setOrders(storedOrders);
        console.log('Loaded from localStorage:', storedOrders.length, 'orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to empty array with sample data
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      // Try to fetch from API
      try {
        const response = await menuAPI.getAll();
        const apiItems = response.data || [];
        setMenuItems(apiItems);
        console.log('Admin loaded menu items from API:', apiItems.length, 'items');
      } catch (apiError) {
        console.log('Menu API not available');
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const setupWebSocket = () => {
    // Real-time updates using localStorage polling
    const interval = setInterval(() => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        if (storedOrders.length !== orders.length) {
          setOrders(storedOrders);
          fetchDashboardData();
        }
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    }, 2000); // Check every 2 seconds
    
    return () => clearInterval(interval);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log(`Updating order ${orderId} to status: ${newStatus}`);
      
      // Try API first
      try {
        const response = await orderAPI.updateStatus(orderId, newStatus);
        console.log('Order status updated via API:', response);
      } catch (apiError) {
        console.log('API not available, updating locally:', apiError.message);
      }
      
      // Update order status in localStorage
      const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      const updatedOrders = storedOrders.map(order => {
        if (order.id === orderId || order.id === parseInt(orderId)) {
          return { 
            ...order, 
            status: newStatus, 
            updated_at: new Date().toISOString(),
            timestamp: new Date().toISOString(),
            completed_at: newStatus === 'completed' ? new Date().toISOString() : order.completed_at
          };
        }
        return order;
      });
      
      console.log('Updated orders:', updatedOrders);
      localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
      
      setOrders(updatedOrders);
      
      // Recalculate stats immediately
      setTimeout(() => {
        fetchDashboardData();
      }, 100);
      
      // Show success message
      alert(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }
    
    try {
      console.log(`Deleting order ${orderId}`);
      
      // Update localStorage
      const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      const updatedOrders = storedOrders.filter(order => 
        order.id !== orderId && order.id !== parseInt(orderId)
      );
      
      localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      
      // Recalculate stats
      setTimeout(() => {
        fetchDashboardData();
      }, 100);
      
      alert(`Order ${orderId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  const handleAddMenuItem = async () => {
    try {
      // Add menu item logic here
      setMenuItemDialog({ open: false, item: null });
      setNewMenuItem({ name: '', name_tamil: '', description: '', price: '', category: '', image_url: '' });
      fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'info',
      preparing: 'primary', 
      ready: 'success',
      completed: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✓',
      preparing: '🍳',
      ready: '✅',
      completed: '📦',
      cancelled: '❌'
    };
    return icons[status] || '❓';
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <Card sx={{ 
      height: '100%',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `2px solid ${color}`,
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 8px 24px ${color}30` }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
          {trend && (
            <Chip 
              icon={<TrendingUp />} 
              label={trend} 
              size="small" 
              color="success" 
              variant="outlined"
            />
          )}
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 700, color: color, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  const DashboardOverview = () => (
    <Box>
      <DatabaseStatus />
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Orders Today" 
          value={stats.total_orders_today} 
          icon={<ShoppingCart />} 
          color="#29bf12"
          trend="+12%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Pending Orders" 
          value={stats.pending_orders} 
          icon={<Schedule />} 
          color="#ff9800"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Revenue Today" 
          value={`Rs. ${stats.revenue_today?.toLocaleString()}`} 
          icon={<AttachMoney />} 
          color="#2196f3"
          trend="+8%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Avg Prep Time" 
          value={`${stats.avg_preparation_time}m`} 
          icon={<Analytics />} 
          color="#9c27b0"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Total Users" 
          value={stats.total_users} 
          icon={<People />} 
          color="#4caf50"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Menu Items" 
          value={stats.active_menu_items} 
          icon={<Restaurant />} 
          color="#ff5722"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="Satisfaction" 
          value={`${stats.customer_satisfaction}/5`} 
          icon={<TrendingUp />} 
          color="#e91e63"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard 
          title="System Status" 
          value="Online" 
          icon={<Security />} 
          color="#00bcd4"
        />
      </Grid>
      </Grid>
    </Box>
  );

  const OrderManagement = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Order Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.orderStatus}
              onChange={(e) => setFilters({...filters, orderStatus: e.target.value})}
            >
              <MenuItem value="all">All Orders</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="ready">Ready</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Search orders..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Order #</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(0, 10).map((order, index) => {
              const orderId = order.id || index + 1;
              const orderNumber = order.order_number || `ORD${orderId}`;
              const totalAmount = order.total_amount || order.total || 
                (order.items && order.items.reduce((sum, item) => sum + (item.price * item.quantity || item.total || 0), 0)) || 150;
              const orderStatus = order.status || 'pending';
              
              return (
              <TableRow key={orderId} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                <TableCell sx={{ fontWeight: 600 }}>
                  {orderNumber}
                </TableCell>
                <TableCell>Demo Student</TableCell>
                <TableCell>{order.items?.length || 1} items</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#29bf12' }}>
                  Rs. {totalAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${getStatusIcon(orderStatus)} ${orderStatus.toUpperCase()}`} 
                    color={getStatusColor(orderStatus)}
                    size="small"
                    sx={{ fontWeight: 600, minWidth: '100px' }}
                  />
                </TableCell>
                <TableCell>
                  {order.created_at ? 
                    new Date(order.created_at).toLocaleTimeString() : 
                    order.timestamp ? 
                    new Date(order.timestamp).toLocaleTimeString() :
                    new Date().toLocaleTimeString()
                  }
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {orderStatus === 'pending' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}
                        onClick={() => updateOrderStatus(orderId, 'confirmed')}
                      >
                        ✓ Confirm
                      </Button>
                    )}
                    {orderStatus === 'confirmed' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#f57c00' } }}
                        onClick={() => updateOrderStatus(orderId, 'preparing')}
                      >
                        🍳 Start Prep
                      </Button>
                    )}
                    {orderStatus === 'preparing' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                        onClick={() => updateOrderStatus(orderId, 'ready')}
                      >
                        ✅ Mark Ready
                      </Button>
                    )}
                    {orderStatus === 'ready' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}
                        onClick={() => updateOrderStatus(orderId, 'completed')}
                      >
                        📦 Complete
                      </Button>
                    )}
                    <IconButton 
                      size="small" 
                      sx={{ color: '#29bf12' }}
                      onClick={() => {
                        setSelectedOrder(order);
                        setOrderDetailsOpen(true);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ color: '#f44336' }}
                      onClick={() => deleteOrder(orderId)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const MenuManagement = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Menu Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setMenuItemDialog({ open: true, item: null })}
          sx={{ bgcolor: '#29bf12' }}
        >
          Add Menu Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {menuItems.slice(0, 12).map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ 
              height: '100%',
              border: '2px solid #f0f0f0',
              borderRadius: 3,
              '&:hover': { borderColor: '#29bf12', transform: 'translateY(-2px)' }
            }}>
              <Box sx={{ 
                height: 150, 
                bgcolor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
              }}>
                🍽️
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.name_tamil}
                </Typography>
                <Typography variant="h6" sx={{ color: '#29bf12', fontWeight: 700, mb: 2 }}>
                  Rs. {item.price}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                  <FormControlLabel
                    control={<Switch size="small" defaultChecked={item.is_available} />}
                    label=""
                    sx={{ ml: 'auto' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const SystemSettings = () => (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>System Settings</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, border: '2px solid #f0f0f0', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              <Settings sx={{ mr: 1, verticalAlign: 'middle' }} />
              General Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Enable Online Ordering"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="SMS Notifications"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Email Notifications"
              />
              <FormControlLabel
                control={<Switch />}
                label="Maintenance Mode"
              />
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, border: '2px solid #f0f0f0', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
              Security Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Admin Password"
                type="password"
                size="small"
                fullWidth
              />
              <TextField
                label="Session Timeout (minutes)"
                type="number"
                size="small"
                defaultValue="30"
                fullWidth
              />
              <Button variant="outlined" startIcon={<Upload />}>
                Backup Database
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const tabContent = [
    <DashboardOverview />,
    <OrderManagement />,
    <MenuManagement />,
    <InventoryManagement />,
    <SystemSettings />
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Dashboard sx={{ fontSize: '2rem', color: '#29bf12', mr: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#454955' }}>
          Admin Dashboard
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<Dashboard />} label="Overview" />
          <Tab icon={<ShoppingCart />} label="Orders" />
          <Tab icon={<Restaurant />} label="Menu" />
          <Tab icon={<Warehouse />} label="Inventory" />
          <Tab icon={<Settings />} label="Settings" />
        </Tabs>
      </Box>

      {tabContent[activeTab]}

      {/* Order Details Dialog */}
      <Dialog open={orderDetailsOpen} onClose={() => setOrderDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" gutterBottom>{selectedOrder.order_number}</Typography>
              <Typography variant="body2" gutterBottom>
                Status: <Chip label={selectedOrder.status} color={getStatusColor(selectedOrder.status)} size="small" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                Total: Rs. {selectedOrder.total_amount}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Items:</Typography>
              <List dense>
                {selectedOrder.items?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Rs. ${item.price} x ${item.quantity} = Rs. ${item.total}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Menu Item Dialog */}
      <Dialog open={menuItemDialog.open} onClose={() => setMenuItemDialog({ open: false, item: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Menu Item</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Item Name"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
              fullWidth
            />
            <TextField
              label="Tamil Name"
              value={newMenuItem.name_tamil}
              onChange={(e) => setNewMenuItem({...newMenuItem, name_tamil: e.target.value})}
              fullWidth
            />
            <TextField
              label="Description"
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Price (Rs.)"
              type="number"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newMenuItem.category}
                onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
              >
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
                <MenuItem value="stationery">Stationery</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Image URL"
              value={newMenuItem.image_url}
              onChange={(e) => setNewMenuItem({...newMenuItem, image_url: e.target.value})}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMenuItemDialog({ open: false, item: null })}>Cancel</Button>
          <Button onClick={handleAddMenuItem} variant="contained">Add Item</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EnhancedAdminDashboard;