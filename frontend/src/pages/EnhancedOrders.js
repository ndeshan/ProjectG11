import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, Chip, Stepper, Step, StepLabel, Alert, Snackbar, LinearProgress } from '@mui/material';
import { CheckCircle, Schedule, Restaurant, LocalShipping, Done } from '@mui/icons-material';
import { orderAPI } from '../services/api';

import { StaggerContainer, Scale } from '../components/animations';

const EnhancedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchOrders();
    setupWebSocket();
  }, []);

  const fetchOrders = async () => {
    try {
      // Try to fetch from API first
      try {
        const response = await orderAPI.getAll();
        const apiOrders = response.data || [];
        setOrders(apiOrders);
        console.log('Loaded orders from API:', apiOrders.length, 'orders');
        
        // Also save to localStorage for persistence
        localStorage.setItem('user_orders', JSON.stringify(apiOrders));
      } catch (apiError) {
        console.log('API not available, using local data');
        // Fallback to localStorage
        const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        setOrders(storedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    // Simulate real-time updates by checking localStorage periodically
    const interval = setInterval(() => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        setOrders(storedOrders);
      } catch (error) {
        console.error('Error updating orders:', error);
      }
    }, 3000); // Check every 3 seconds
    
    return () => clearInterval(interval);
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
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

  const getActiveStep = (status) => {
    const steps = { pending: 0, confirmed: 1, preparing: 2, ready: 3, completed: 4 };
    return steps[status] || 0;
  };

  const orderSteps = [
    { label: 'Order Placed', icon: <CheckCircle /> },
    { label: 'Confirmed', icon: <Schedule /> },
    { label: 'Preparing', icon: <Restaurant /> },
    { label: 'Ready for Pickup', icon: <LocalShipping /> },
    { label: 'Completed', icon: <Done /> }
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <LinearProgress sx={{ mb: 2 }} />
        <Typography variant="h6">Loading your orders...</Typography>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: '#454955',
            mb: 4
          }}
        >
          Your Orders
        </Typography>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No orders found. Start ordering from our menu!
            </Typography>
          </Box>
        ) : (
          <StaggerContainer>
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Grid item xs={12} key={order.id}>
                  <Scale>
                    <Card sx={{ 
                      border: '2px solid #abff4f',
                      borderRadius: 4,
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(41,191,18,0.2)' }
                    }}>
                      <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                              #{order.order_number}
                            </Typography>
                            <Chip 
                              label={order.status.toUpperCase()} 
                              color={getStatusColor(order.status)}
                              sx={{ fontWeight: 600, mb: 2 }}
                            />
                            <Typography variant="h4" sx={{ color: '#29bf12', fontWeight: 700, mb: 2 }}>
                              Rs. {order.total_amount?.toLocaleString()}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                              Items: {order.items?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Ordered: {new Date(order.created_at).toLocaleString()}
                            </Typography>
                            {order.pickup_time && (
                              <Typography variant="body2" sx={{ color: '#29bf12', fontWeight: 600, mt: 1 }}>
                                Pickup: {new Date(order.pickup_time).toLocaleTimeString()}
                              </Typography>
                            )}
                          </Grid>

                          <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                              Order Progress
                            </Typography>
                            
                            <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
                              {orderSteps.map((step, index) => (
                                <Step key={step.label}>
                                  <StepLabel 
                                    StepIconComponent={() => (
                                      <Box sx={{ 
                                        color: index <= getActiveStep(order.status) ? '#29bf12' : '#ccc',
                                        fontSize: '1.5rem'
                                      }}>
                                        {step.icon}
                                      </Box>
                                    )}
                                  >
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        fontWeight: index <= getActiveStep(order.status) ? 600 : 400,
                                        color: index <= getActiveStep(order.status) ? '#29bf12' : 'text.secondary'
                                      }}
                                    >
                                      {step.label}
                                    </Typography>
                                  </StepLabel>
                                </Step>
                              ))}
                            </Stepper>

                            <LinearProgress 
                              variant="determinate" 
                              value={(getActiveStep(order.status) / 4) * 100}
                              sx={{ 
                                mt: 3,
                                height: 8, 
                                borderRadius: 4,
                                '& .MuiLinearProgress-bar': { backgroundColor: '#29bf12' }
                              }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Scale>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        )}

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert 
            onClose={() => setNotification({ ...notification, open: false })} 
            severity={notification.severity}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default EnhancedOrders;