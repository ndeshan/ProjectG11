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
  Schedule, Security, Upload, Warehouse, Clear
} from '@mui/icons-material';
import DatabaseStatus from '../components/DatabaseStatus';
import { useTheme } from '../contexts/ThemeContext';

const CleanAdminDashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchOrders();
  }, []);

  const fetchDashboardData = () => {
    const currentOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const today = new Date().toDateString();
    const todayOrders = currentOrders.filter(order => {
      const orderDate = order.created_at || order.timestamp;
      return orderDate && new Date(orderDate).toDateString() === today;
    });
    
    const pendingOrders = currentOrders.filter(order => 
      ['pending', 'confirmed', 'preparing'].includes(order.status)
    );
    
    const completedOrders = currentOrders.filter(order => order.status === 'completed');
    const todayRevenue = completedOrders
      .filter(order => {
        const orderDate = order.completed_at || order.created_at || order.timestamp;
        return orderDate && new Date(orderDate).toDateString() === today;
      })
      .reduce((sum, order) => {
        const amount = order.total_amount || order.total || 150;
        return sum + parseFloat(amount);
      }, 0);
    
    setStats({
      total_orders_today: todayOrders.length,
      pending_orders: pendingOrders.length,
      revenue_today: todayRevenue,
      avg_preparation_time: 15,
      total_users: 5,
      active_menu_items: 200,
      customer_satisfaction: 4.6
    });
  };

  const fetchOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    setOrders(storedOrders);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const updatedOrders = storedOrders.map(order => {
      if (order.id === orderId || order.id === parseInt(orderId)) {
        return { 
          ...order, 
          status: newStatus, 
          updated_at: new Date().toISOString(),
          completed_at: newStatus === 'completed' ? new Date().toISOString() : order.completed_at
        };
      }
      return order;
    });
    
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    fetchDashboardData();
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const deleteOrder = (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const updatedOrders = storedOrders.filter(order => 
      order.id !== orderId && order.id !== parseInt(orderId)
    );
    
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    fetchDashboardData();
    alert(`Order ${orderId} deleted successfully`);
  };

  const clearAllOrders = () => {
    if (!window.confirm('Are you sure you want to clear ALL orders? This action cannot be undone.')) return;
    
    localStorage.setItem('user_orders', JSON.stringify([]));
    setOrders([]);
    fetchDashboardData();
    alert('All orders cleared successfully');
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

  const StatCard = ({ title, value, icon, color }) => (
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
      </Grid>
    </Box>
  );

  const OrderManagement = () => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Order Management</Typography>
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
              const totalAmount = order.total_amount || order.total || 150;
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
                    new Date().toLocaleTimeString()
                  }
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {orderStatus === 'pending' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#2196f3' }}
                        onClick={() => updateOrderStatus(orderId, 'confirmed')}
                      >
                        ✓ Confirm
                      </Button>
                    )}
                    {orderStatus === 'confirmed' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#ff9800' }}
                        onClick={() => updateOrderStatus(orderId, 'preparing')}
                      >
                        🍳 Start Prep
                      </Button>
                    )}
                    {orderStatus === 'preparing' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#4caf50' }}
                        onClick={() => updateOrderStatus(orderId, 'ready')}
                      >
                        ✅ Mark Ready
                      </Button>
                    )}
                    {orderStatus === 'ready' && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ bgcolor: '#9c27b0' }}
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
                    {index === 0 && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        startIcon={<Clear />}
                        onClick={clearAllOrders}
                        sx={{ 
                          bgcolor: '#f44336', 
                          '&:hover': { bgcolor: '#d32f2f' },
                          ml: 1
                        }}
                      >
                        Clear All
                      </Button>
                    )}
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

  const tabContent = [
    <DashboardOverview />,
    <OrderManagement />
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
        </Tabs>
      </Box>

      {tabContent[activeTab]}

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
    </Container>
  );
};

export default CleanAdminDashboard;