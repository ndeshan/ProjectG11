import React, { useMemo, useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Chip,
  Divider,
  Button,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  // Real-time order history updates
  useEffect(() => {
    const fetchOrderHistory = () => {
      try {
        const storedOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
        setOrderHistory(storedOrders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
    const interval = setInterval(fetchOrderHistory, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : {
        name: "Demo Student",
        email: "student@campus.lk",
        phone: "0771234567",
        studentId: "STU2024001",
        totalOrders: 25,
        favoriteItems: ["Rice & Curry", "Kottu Rotti", "String Hoppers"],
        memberSince: "2024-01-15"
      };
    } catch (_) {
      return null;
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditClick = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEditDialogOpen(false);
      // In a real app, you would update the user data via API
    }, 1000);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <PersonIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 800 }}>
              Please log in to view your profile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your profile shows your personal details, order history, and preferences.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 4, mb: 4, background: 'linear-gradient(135deg, #29bf12 0%, #abff4f 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Avatar sx={{ bgcolor: 'white', width: 80, height: 80, color: '#29bf12' }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: 'white', mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>
              {user.totalOrders || 0}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
              Total Orders
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<HistoryIcon />} label="Order History" />
          <Tab icon={<FavoriteIcon />} label="Preferences" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Personal Information
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditClick('name', user.name)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Full Name" 
                      secondary={user.name} 
                      secondaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Address" 
                      secondary={user.email} 
                      secondaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Phone Number" 
                      secondary={user.phone || 'Not provided'} 
                      secondaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Academic Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Academic Details
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditClick('studentId', user.studentId)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Student ID" 
                      secondary={user.studentId || 'Not provided'} 
                      secondaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Account Status" 
                      secondary="Active" 
                      secondaryTypographyProps={{ color: 'success.main', fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Member Since" 
                      secondary={user.memberSince || '2024-01-01'} 
                      secondaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Quick Statistics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>
                        {user.totalOrders || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Orders
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="secondary" sx={{ fontWeight: 800 }}>
                        4.8
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Rating
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main" sx={{ fontWeight: 800 }}>
                        98%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Order Completion
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Order History ({orderHistory.length} orders)
            </Typography>
            {orderHistory.length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No orders found. Start ordering from our menu!
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {orderHistory.map((order, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          #{order.order_number || `ORD${Date.now()}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(order.timestamp || Date.now()).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2">
                          {order.items?.map(item => item.name).join(', ') || 'Order items'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Chip 
                          label={order.status || 'completed'} 
                          color={order.status === 'completed' ? 'success' : 'primary'}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          Rs. {order.total || '0'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Favorite Items
                </Typography>
                <List>
                  {user.favoriteItems?.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <FavoriteIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Account Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="outlined" startIcon={<SecurityIcon />}>
                    Change Password
                  </Button>
                  <Button variant="outlined" startIcon={<EmailIcon />}>
                    Notification Preferences
                  </Button>
                  <Button variant="outlined" startIcon={<PersonIcon />}>
                    Privacy Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit {editField}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={editField}
            type="text"
            fullWidth
            variant="outlined"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            sx={{ mt: 2 }}
          />
          {loading && <LinearProgress sx={{ mt: 2 }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" startIcon={<SaveIcon />} disabled={loading}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
