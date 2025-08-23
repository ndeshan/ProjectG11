import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Tabs, Tab, Typography } from '@mui/material';

const LoginDialog = ({ open, onClose, onLogin }) => {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', studentId: '', phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: formData.name || 'Demo Student', email: formData.email, studentId: formData.studentId || 'STU001' };
    onLogin(userData);
    onClose();
    
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Student Portal</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              fullWidth margin="normal" label="Full Name:" required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          
          <TextField
            fullWidth margin="normal" label="Email:" type="email" required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <TextField
            fullWidth margin="normal" label="Password:" type="password" required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          {tab === 1 && (
            <>
              <TextField
                fullWidth margin="normal" label="Confirm Password" type="password" required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <TextField
                fullWidth margin="normal" label="Student ID" required
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              />
              <TextField
                fullWidth margin="normal" label="Telephone Number" required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            {tab === 0 ? 'Login' : 'Register'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;