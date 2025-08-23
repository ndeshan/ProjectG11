import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { orderAPI } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [queueLength, setQueueLength] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const canteenId = 1; // Default to canteen 1

  useEffect(() => {
    fetchDashboardData();
    fetchTodayOrders();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate admin API call
      setStats({
        total_orders_today: 45,
        pending_orders: 8,
        revenue_today: 2340,
        avg_preparation_time: 12
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchTodayOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data.orders.slice(0, 10)); // Show recent orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      fetchTodayOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updateQueueStatus = async () => {
    try {
      // Simulate queue update API call
      alert(`Queue updated: ${queueLength} people, ${waitTime} min wait`);
      setQueueLength('');
      setWaitTime('');
    } catch (error) {
      console.error('Error updating queue status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'preparing': return 'primary';
      case 'ready': return 'success';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Orders Today
              </Typography>
              <Typography variant="h4">
                {stats.total_orders_today}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Orders
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.pending_orders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenue Today
              </Typography>
              <Typography variant="h4" color="success.main">
                ₹{stats.revenue_today}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Prep Time
              </Typography>
              <Typography variant="h4">
                {stats.avg_preparation_time}m
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Queue Management */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Update Queue Status</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Queue Length"
              type="number"
              value={queueLength}
              onChange={(e) => setQueueLength(e.target.value)}
              size="small"
            />
            <TextField
              label="Wait Time (minutes)"
              type="number"
              value={waitTime}
              onChange={(e) => setWaitTime(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              onClick={updateQueueStatus}
              disabled={!queueLength || !waitTime}
            >
              Update Queue
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Orders Management */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Today's Orders</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order #</TableCell>
                  <TableCell>Pickup Time</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.order_number}</TableCell>
                    <TableCell>
                      {new Date(order.pickup_time).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>{order.items.length} items</TableCell>
                    <TableCell>₹{order.total_amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {order.status === 'pending' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                        )}
                        {order.status === 'confirmed' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                          >
                            Start Prep
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                          >
                            Mark Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;