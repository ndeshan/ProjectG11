import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { DarkMode, LightMode } from '@mui/icons-material';
import LoginDialog from './LoginDialog';
import NotificationSystem from './NotificationSystem';
import ThemeToggle from './ThemeToggle';
import { useAdmin } from '../contexts/AdminContext';

const Navbar = ({ darkMode, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAdmin, login, logout } = useAdmin();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'My Orders', path: '/orders' },
    { label: 'Queue Status', path: '/queue-status' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Reviews', path: '/reviews' },
  ];

  const handleAdminLogin = () => {
    const success = login(adminCredentials.username, adminCredentials.password);
    if (success) {
      setAdminLoginOpen(false);
      setAdminCredentials({ username: '', password: '' });
      navigate('/admin');
    } else {
      alert('Invalid credentials! Use admin:admin');
    }
  };

  const handleAdminLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#ffffff', boxShadow: '0 4px 12px rgba(41,191,18,0.15)' }}>
      <Toolbar sx={{ minHeight: '100px', py: 2, px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <img 
            src="/images/logo.png" 
            alt="University of Ruhuna Logo" 
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(41,191,18,0.25)',
              border: '2px solid #abff4f'
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: '#29bf12',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textShadow: '2px 2px 4px rgba(41,191,18,0.15)'
            }}
          >
            {isMobile ? 'University of Ruhuna' : 'University of Ruhuna'}
          </Typography>
          {!isMobile && (
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '1.1rem',
                color: '#454955',
                letterSpacing: '0.02em',
                mt: 0.5
              }}
            >
              Digital Canteen Management System
            </Typography>
          )}
        </Box>
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: '#454955',
                fontWeight: 500,
                fontSize: '0.95rem',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: location.pathname === item.path ? '#abff4f' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  color: '#29bf12'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
          
          <IconButton 
            onClick={onToggleTheme} 
            sx={{ 
              color: '#29bf12',
              bgcolor: darkMode ? '#2a2a2a' : '#f8fafc',
              '&:hover': { bgcolor: darkMode ? '#333333' : '#abff4f' }
            }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          
          {isAdmin && (
            <Button
              component={Link}
              to="/admin"
              startIcon={<AdminPanelSettingsIcon />}
              sx={{ 
                mx: 1, 
                bgcolor: '#29bf12', 
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { bgcolor: '#abff4f', color: '#454955' }
              }}
            >
              Admin
            </Button>
          )}
          
          {isAdmin ? (
            <Button
              startIcon={<LogoutIcon />}
              onClick={handleAdminLogout}
              sx={{ 
                mx: 1,
                color: '#454955',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { color: '#29bf12' }
              }}
            >
              Logout Admin
            </Button>
          ) : (
            <Button
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => setAdminLoginOpen(true)}
              sx={{ 
                mx: 1,
                color: '#454955',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { color: '#29bf12' }
              }}
            >
              Admin
            </Button>
          )}
          
          {user ? (
            <>
              <NotificationSystem />
              <Avatar 
                sx={{ cursor: 'pointer', ml: 2 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {user.name[0]}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => { setUser(null); setAnchorEl(null); }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              startIcon={<PersonIcon />}
              onClick={() => setLoginOpen(true)}
              sx={{
                color: '#454955',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { color: '#29bf12' }
              }}
            >
              Login
            </Button>
          )}
        </Box>
        
        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
          <IconButton 
            onClick={onToggleTheme} 
            sx={{ color: '#29bf12' }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton color="inherit" onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
        
        {/* Mobile Drawer */}
        <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <Box sx={{ width: 250, pt: 2, bgcolor: '#ffffff' }}>
            <List>
              {navItems.map((item) => (
                <ListItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{
                    bgcolor: location.pathname === item.path ? '#abff4f' : 'transparent',
                    color: '#454955',
                    '&:hover': { bgcolor: '#f8fafc' }
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              
              {isAdmin ? (
                <>
                  <ListItem component={Link} to="/admin" onClick={() => setMobileMenuOpen(false)} sx={{ color: '#29bf12' }}>
                    <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                    <ListItemText primary="Admin Panel" />
                  </ListItem>
                  <ListItem onClick={() => { handleAdminLogout(); setMobileMenuOpen(false); }} sx={{ color: '#29bf12' }}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    <ListItemText primary="Logout Admin" />
                  </ListItem>
                </>
              ) : (
                <ListItem onClick={() => { setAdminLoginOpen(true); setMobileMenuOpen(false); }} sx={{ color: '#29bf12' }}>
                  <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Admin Login" />
                </ListItem>
              )}
              
              {!user && (
                <ListItem onClick={() => { setLoginOpen(true); setMobileMenuOpen(false); }} sx={{ color: '#29bf12' }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
        
        <LoginDialog 
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={setUser}
        />
        
        <Dialog open={adminLoginOpen} onClose={() => setAdminLoginOpen(false)}>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              fullWidth
              variant="outlined"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAdminLoginOpen(false)}>Cancel</Button>
            <Button onClick={handleAdminLogin} variant="contained">Login</Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;