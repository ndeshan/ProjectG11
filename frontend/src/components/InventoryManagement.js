import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Button, TextField, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, IconButton, Tooltip
} from '@mui/material';
import { Refresh, Warning, CheckCircle, Add, Remove } from '@mui/icons-material';
import inventoryAPI from '../services/inventoryAPI';

const InventoryManagement = () => {
  const [availability, setAvailability] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restockDialog, setRestockDialog] = useState({ open: false, item: null, quantity: 0 });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [availabilityData, alertsData] = await Promise.all([
        inventoryAPI.checkMenuAvailability(),
        inventoryAPI.getStockAlerts()
      ]);
      setAvailability(availabilityData);
      setAlerts(alertsData);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async () => {
    try {
      await inventoryAPI.restockItem(restockDialog.item.id, restockDialog.quantity);
      setRestockDialog({ open: false, item: null, quantity: 0 });
      setNotification({ open: true, message: 'Item restocked successfully!', severity: 'success' });
      fetchData();
    } catch (error) {
      setNotification({ open: true, message: 'Error restocking item', severity: 'error' });
    }
  };

  const resetDailyCounts = async () => {
    try {
      await inventoryAPI.resetDailyCounts();
      setNotification({ open: true, message: 'Daily counts reset successfully!', severity: 'success' });
      fetchData();
    } catch (error) {
      setNotification({ open: true, message: 'Error resetting daily counts', severity: 'error' });
    }
  };

  const getStockStatus = (item) => {
    if (!item.is_available) return { color: 'error', label: 'Unavailable', icon: <Warning /> };
    if (item.stock_quantity <= 5) return { color: 'error', label: 'Critical', icon: <Warning /> };
    if (item.stock_quantity <= 20) return { color: 'warning', label: 'Low Stock', icon: <Warning /> };
    return { color: 'success', label: 'In Stock', icon: <CheckCircle /> };
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Inventory Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchData}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={resetDailyCounts}
          >
            Reset Daily Counts
          </Button>
        </Box>
      </Box>

      {/* Stock Alerts */}
      {alerts.length > 0 && (
        <Card sx={{ mb: 3, border: '2px solid #ff9800' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#ff9800' }}>
              ⚠️ Stock Alerts ({alerts.length})
            </Typography>
            {alerts.slice(0, 5).map((alert) => (
              <Alert key={alert.id} severity="warning" sx={{ mb: 1 }}>
                {alert.message}
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Inventory Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e8' }}>
            <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 700 }}>
              {availability.filter(item => item.is_available).length}
            </Typography>
            <Typography variant="body1">Available Items</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#fff3e0' }}>
            <Typography variant="h3" sx={{ color: '#ff9800', fontWeight: 700 }}>
              {availability.filter(item => item.stock_quantity <= 20 && item.stock_quantity > 0).length}
            </Typography>
            <Typography variant="body1">Low Stock</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#ffebee' }}>
            <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 700 }}>
              {availability.filter(item => item.stock_quantity <= 0).length}
            </Typography>
            <Typography variant="body1">Out of Stock</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#f3e5f5' }}>
            <Typography variant="h3" sx={{ color: '#9c27b0', fontWeight: 700 }}>
              {availability.reduce((sum, item) => sum + item.daily_orders_count, 0)}
            </Typography>
            <Typography variant="body1">Daily Orders</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Inventory Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Item Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Daily Orders</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Availability</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availability.map((item) => {
              const status = getStockStatus(item);
              return (
                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                  <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                  <TableCell>
                    <Chip
                      icon={status.icon}
                      label={status.label}
                      color={status.color}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.stock_quantity} units
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {item.daily_orders_count} / {item.max_daily_orders}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.is_available ? 'Available' : item.availability_reason}
                      color={item.is_available ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Restock Item">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => setRestockDialog({ open: true, item, quantity: 50 })}
                      >
                        <Add />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Restock Dialog */}
      <Dialog open={restockDialog.open} onClose={() => setRestockDialog({ open: false, item: null, quantity: 0 })}>
        <DialogTitle>Restock Item</DialogTitle>
        <DialogContent>
          {restockDialog.item && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {restockDialog.item.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Current Stock: {restockDialog.item.stock_quantity} units
              </Typography>
              <TextField
                label="Quantity to Add"
                type="number"
                value={restockDialog.quantity}
                onChange={(e) => setRestockDialog({ ...restockDialog, quantity: parseInt(e.target.value) || 0 })}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                New Stock Level: {restockDialog.item.stock_quantity + restockDialog.quantity} units
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRestockDialog({ open: false, item: null, quantity: 0 })}>
            Cancel
          </Button>
          <Button onClick={handleRestock} variant="contained">
            Restock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;