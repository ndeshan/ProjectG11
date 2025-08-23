import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Fade, Slide } from '@mui/material';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import QueueStatus from './pages/QueueStatus';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import EnhancedQueueStatus from './pages/EnhancedQueueStatus';
import EnhancedAboutUs from './pages/EnhancedAboutUs';
import EnhancedContact from './pages/EnhancedContact';
import Footer from './components/Footer';
import { AdminProvider } from './contexts/AdminContext';
import './App.css';

const createAppTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#29bf12',
      light: '#abff4f',
      dark: '#1e8a0d',
    },
    secondary: {
      main: '#454955',
      light: '#6b7280',
      dark: '#374151',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
    text: {
      primary: '#454955',
      secondary: '#6b7280',
    },
    success: {
      main: '#29bf12',
      light: '#abff4f',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '3rem',
      fontWeight: 700,
      color: '#454955',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '2.25rem',
      fontWeight: 600,
      color: '#29bf12',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '1.875rem',
      fontWeight: 600,
      color: '#454955',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#454955',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#454955',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#6b7280',
    }
  },
});

const Page = ({ children }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Fade in={open} timeout={400}>
      <Slide in={open} direction="up" timeout={500}>
        <Box sx={{ willChange: 'transform, opacity' }}>
          {children}
        </Box>
      </Slide>
    </Fade>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <AdminProvider>
      <ThemeProvider theme={createAppTheme(darkMode)}>
        <CssBaseline />
        <Router>
        <div className="App">
          <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Page><LandingPage /></Page>} />
            <Route path="/home" element={<Page><Home /></Page>} />
            <Route path="/menu/:canteenId?" element={<Page><Menu /></Page>} />
            <Route path="/orders" element={<Page><Orders /></Page>} />
            <Route path="/queue-status" element={<Page><EnhancedQueueStatus /></Page>} />
            <Route path="/about" element={<Page><EnhancedAboutUs /></Page>} />
            <Route path="/contact" element={<Page><EnhancedContact /></Page>} />
            <Route path="/reviews" element={<Page><Reviews /></Page>} />
            <Route path="/admin" element={<Page><AdminDashboard /></Page>} />
          </Routes>
          <Footer />
        </div>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;