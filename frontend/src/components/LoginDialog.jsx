import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  School,
  Phone
} from '@mui/icons-material';

const LoginDialog = ({ open, onClose, onLogin }) => {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    phone: ''
  });

  // Reset form when switching tabs
  useEffect(() => {
    if (!open) {
      // Reset everything when dialog closes
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        phone: ''
      });
      setErrors({});
      setIsSubmitting(false);
    } else {
      // Reset only passwords and errors when tab changes or dialog opens
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      setErrors({});
    }
  }, [tab, open]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (tab === 1) {
      // Registration validations
      if (!formData.name) {
        newErrors.name = 'Full name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.studentId) {
        newErrors.studentId = 'Student ID is required';
      }

      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userData = { 
        name: formData.name || 'Demo Student', 
        email: formData.email, 
        studentId: formData.studentId || 'STU001' 
      };
      onLogin(userData);
      onClose();
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        textAlign: 'center', 
        backgroundColor: 'primary.main', 
        color: 'white',
        py: 2
      }}>
        <Typography variant="h5" component="div">
          Student Portal
        </Typography>
        <Typography variant="subtitle1">
          {tab === 0 ? 'Sign in to your account' : 'Create a new account'}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              required
              value={formData.name}
              onChange={handleInputChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleInputChange('password')}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {tab === 1 && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Student ID"
                required
                value={formData.studentId}
                onChange={handleInputChange('studentId')}
                error={!!errors.studentId}
                helperText={errors.studentId}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <School color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                required
                value={formData.phone}
                onChange={handleInputChange('phone')}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              tab === 0 ? 'Sign In' : 'Create Account'
            )}
          </Button>
          
          {tab === 0 && (
            <>
              <Divider sx={{ my: 2 }}>OR</Divider>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Demo Credentials: demo@example.com / anypassword
                </Typography>
              </Box>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;