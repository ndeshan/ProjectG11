import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [notificationSettings, setNotificationSettings] = useState({
    snackbarDuration: 6000,
    maxNotifications: 50,
    priorityLevel: 'medium'
  });

  // Sample notifications for demonstration
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        message: 'Welcome to our service! Explore the features.',
        severity: 'info',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        category: 'system'
      },
      {
        id: 2,
        message: 'Your profile is 60% complete. Add more details.',
        severity: 'warning',
        timestamp: new Date(Date.now() - 1800000),
        read: false,
        category: 'account'
      }
    ];
    
    setNotifications(sampleNotifications);
    
    // Simulate a new notification after 10 seconds
    const timer = setTimeout(() => {
      addNotification('Your Rice & Curry order is ready for pickup! 🍛', 'success', 'order');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const addNotification = (message, severity = 'info', category = 'general') => {
    const newNotification = {
      id: Date.now(),
      message,
      severity,
      timestamp: new Date(),
      read: false,
      category
    };
    
    setNotifications(prev => {
      // Limit the number of notifications based on settings
      const updatedNotifications = [newNotification, ...prev];
      if (updatedNotifications.length > notificationSettings.maxNotifications) {
        return updatedNotifications.slice(0, notificationSettings.maxNotifications);
      }
      return updatedNotifications;
    });
    
    // Only show snackbar for high/medium priority or based on settings
    if (notificationSettings.priorityLevel !== 'low' || severity === 'error') {
      setSnackbar({ 
        open: true, 
        message, 
        severity,
        autoHideDuration: notificationSettings.snackbarDuration
      });
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleSettingsChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Group notifications by category for better organization
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const category = notification.category || 'general';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(notification);
    return groups;
  }, {});

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ position: 'relative' }}
      >
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ 
          '& .MuiPaper-root': { 
            width: 400, 
            maxHeight: 500,
            borderRadius: 2
          } 
        }}
      >
        <Box>
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: 'primary.main',
            color: 'white'
          }}>
            <Typography variant="h6">
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </Typography>
            <Box>
              <IconButton 
                size="small" 
                sx={{ color: 'white' }}
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: 'white' }}
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: 'white' }}
                onClick={() => {/* Open settings dialog */}}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {notifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <NotificationsIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              Object.entries(groupedNotifications).map(([category, categoryNotifications]) => (
                <Box key={category}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      backgroundColor: 'grey.100',
                      textTransform: 'capitalize'
                    }}
                  >
                    {category}
                  </Typography>
                  <List disablePadding>
                    {categoryNotifications.map((notification) => (
                      <ListItem 
                        key={notification.id}
                        sx={{ 
                          bgcolor: notification.read ? 'transparent' : 'action.hover',
                          borderLeft: notification.read ? 'none' : `3px solid`,
                          borderColor: `${
                            notification.severity === 'error' ? 'error.main' :
                            notification.severity === 'warning' ? 'warning.main' :
                            notification.severity === 'success' ? 'success.main' : 'info.main'
                          }`,
                          py: 1.5
                        }}
                        secondaryAction={
                          <IconButton 
                            size="small" 
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: `${
                                notification.severity === 'error' ? 'error.main' :
                                notification.severity === 'warning' ? 'warning.main' :
                                notification.severity === 'success' ? 'success.main' : 'info.main'
                              }`
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: notification.read ? 'normal' : 'medium' }}>
                              {notification.message}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {new Date(notification.timestamp).toLocaleString()}
                            </Typography>
                          }
                          onClick={() => markAsRead(notification.id)}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Box>
              ))
            )}
          </Box>

          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={notificationSettings.priorityLevel}
                label="Priority"
                onChange={(e) => handleSettingsChange('priorityLevel', e.target.value)}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <Button size="small" onClick={clearAllNotifications} disabled={notifications.length === 0}>
              Clear All
            </Button>
          </Box>
        </Box>
      </Popover>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={notificationSettings.snackbarDuration}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({...snackbar, open: false})}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationSystem;