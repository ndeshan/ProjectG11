import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Tabs, Tab, Typography } from '@mui/material';

const LoginDialog = ({ open, onClose, onLogin }) => {
  const [tab, setTab] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', studentId: '', phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: formData.name || 'Demo Student', email: formData.email, studentId: formData.studentId || 'STU001', phone: formData.phone };
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (_) {}
    onLogin(userData);
    onClose();
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResetStatus('success');
      setTimeout(() => {
        setResetStatus(null);
        setShowForgotPassword(false);
        setResetEmail('');
      }, 3000);
    } catch (error) {
      setResetStatus('error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Student Portal</DialogTitle>
      <DialogContent>
        {!showForgotPassword ? (
          <>
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
            
            {tab === 0 && (
              <Button 
                onClick={() => setShowForgotPassword(true)}
                sx={{ mt: 2, textTransform: 'none' }}
                fullWidth
              >
                Forgot Password?
              </Button>
            )}
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
              Reset Password
            </Typography>
            
            {resetStatus === 'success' && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'success.light', color: 'success.contrastText', borderRadius: 1 }}>
                Password reset link sent to your email!
              </Box>
            )}
            
            {resetStatus === 'error' && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
                Failed to send reset link. Please try again.
              </Box>
            )}
            
            <form onSubmit={handleForgotPassword}>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your registered email"
              />
              
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                Send Reset Link
              </Button>
              
              <Button 
                onClick={() => setShowForgotPassword(false)}
                fullWidth
                sx={{ mt: 2 }}
              >
                Back to Login
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;