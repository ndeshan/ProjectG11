import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, Grid } from '@mui/material';
import { Refresh, Storage, CheckCircle, Error } from '@mui/icons-material';
import { menuAPI, orderAPI, canteenAPI } from '../services/api';

const DatabaseStatus = () => {
  const [status, setStatus] = useState({
    connected: false,
    canteens: 0,
    menuItems: 0,
    orders: 0,
    lastUpdate: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    setLoading(true);
    try {
      const [canteensRes, menuRes, ordersRes] = await Promise.allSettled([
        canteenAPI.getAll(),
        menuAPI.getAll(),
        orderAPI.getAll()
      ]);

      const canteensCount = canteensRes.status === 'fulfilled' ? (canteensRes.value.data?.length || 0) : 0;
      const menuCount = menuRes.status === 'fulfilled' ? (menuRes.value.data?.length || 0) : 0;
      const ordersCount = ordersRes.status === 'fulfilled' ? (ordersRes.value.data?.length || 0) : 0;

      setStatus({
        connected: canteensRes.status === 'fulfilled' || menuRes.status === 'fulfilled' || ordersRes.status === 'fulfilled',
        canteens: canteensCount,
        menuItems: menuCount,
        orders: ordersCount,
        lastUpdate: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('Database status check failed:', error);
      setStatus(prev => ({ ...prev, connected: false, lastUpdate: new Date().toLocaleTimeString() }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3, border: `2px solid ${status.connected ? '#4caf50' : '#f44336'}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Storage sx={{ fontSize: '2rem', color: status.connected ? '#4caf50' : '#f44336' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Database Status
            </Typography>
            <Chip
              icon={status.connected ? <CheckCircle /> : <Error />}
              label={status.connected ? 'Connected' : 'Disconnected'}
              color={status.connected ? 'success' : 'error'}
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={checkDatabaseStatus}
            disabled={loading}
            size="small"
          >
            Refresh
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 700 }}>
                {status.canteens}
              </Typography>
              <Typography variant="body2">Canteens</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e8', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                {status.menuItems}
              </Typography>
              <Typography variant="body2">Menu Items</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                {status.orders}
              </Typography>
              <Typography variant="body2">Orders</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f3e5f5', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: '#9c27b0', fontWeight: 700 }}>
                {status.lastUpdate || 'Never'}
              </Typography>
              <Typography variant="body2">Last Update</Typography>
            </Box>
          </Grid>
        </Grid>

        {status.connected && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f5e8', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 600 }}>
              ✅ Database is connected and serving real data from MySQL!
            </Typography>
          </Box>
        )}

        {!status.connected && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#ffebee', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 600 }}>
              ⚠️ Database not connected. Using local fallback data.
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
              To connect to database: Start backend server with "python start_backend.py"
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseStatus;