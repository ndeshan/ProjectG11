import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Badge, IconButton, Popover, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    // Simulate notifications
    const timer = setTimeout(() => {
      addNotification('Your Rice & Curry order ready for pickup! 🍛', 'success');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const addNotification = (message, severity = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      severity,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    setSnackbar({ open: true, message, severity });
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box sx={{ width: 300, maxHeight: 400 }}>
          <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            Notifications
          </Typography>
          <List>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            ) : (
              notifications.map((notification) => (
                <ListItem 
                  key={notification.id}
                  sx={{ bgcolor: notification.read ? 'transparent' : 'action.hover' }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.timestamp.toLocaleTimeString()}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Popover>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationSystem;