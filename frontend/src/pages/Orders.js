import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Box, Chip, Button, Grid, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { orderAPI } from '../services/api';
import { styled } from '@mui/material/styles';

const OrdersBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(248,250,252,0.5)), url(/images/7.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative'
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
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

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading orders...</Typography>
      </Container>
    );
  }

  return (
    <OrdersBackground>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>

      {orders.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">No orders found</Typography>
            <Typography align="center" color="text.secondary">
              Start by browsing the menu and placing your first order!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6">{order.order_number}</Typography>
                    <Chip
                      label={order.status.toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    📍 {order.canteen.name}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    🕒 Pickup: {new Date(order.pickup_time).toLocaleString()}
                  </Typography>

                  <Typography variant="h6" color="primary" gutterBottom>
                    Total: ₹{order.total_amount}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {order.items.length} item(s) • {order.payment_method}
                  </Typography>

                  {order.ready_at && (
                    <Typography variant="body2" color="success.main">
                      ✅ Ready at: {new Date(order.ready_at).toLocaleString()}
                    </Typography>
                  )}

                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => showOrderDetails(order)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" gutterBottom>{selectedOrder.order_number}</Typography>
              <Typography variant="body2" gutterBottom>
                Canteen: {selectedOrder.canteen.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Status: <Chip label={selectedOrder.status} color={getStatusColor(selectedOrder.status)} size="small" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                Pickup Time: {new Date(selectedOrder.pickup_time).toLocaleString()}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Items:</Typography>
              <List dense>
                {selectedOrder.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.name}
                      secondary={`₹${item.price} x ${item.quantity} = ₹${item.total}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Amount: ₹{selectedOrder.total_amount}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      </Container>
    </OrdersBackground>
  );
};

export default Orders;