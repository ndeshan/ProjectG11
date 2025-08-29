import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Menu from './pages/Menu';
import EnhancedOrders from './pages/EnhancedOrders';
import EnhancedQueueStatus from './pages/EnhancedQueueStatus';
import ProfessionalAboutUs from './pages/ProfessionalAboutUs';
import EnhancedContact from './pages/EnhancedContact';
import EnhancedAdminDashboard from './pages/EnhancedAdminDashboard';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import Footer from './components/Footer';
import NotificationManager from './components/NotificationManager';
import { AdminProvider } from './contexts/AdminContext';
import { ThemeProvider } from './contexts/ThemeContext';



const Page = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

function App() {

  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
          <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
            <Navbar />
          <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Page><LandingPage /></Page>} />
                <Route path="/home" element={<Page><Home /></Page>} />
                <Route path="/menu/:canteenId?" element={<Page><Menu /></Page>} />
                <Route path="/orders" element={<Page><EnhancedOrders /></Page>} />
                <Route path="/queue-status" element={<Page><EnhancedQueueStatus /></Page>} />
                <Route path="/about" element={<Page><ProfessionalAboutUs /></Page>} />
                <Route path="/contact" element={<Page><EnhancedContact /></Page>} />
                <Route path="/reviews" element={<Page><Reviews /></Page>} />
                <Route path="/profile" element={<Page><Profile /></Page>} />
                <Route path="/admin" element={<Page><EnhancedAdminDashboard /></Page>} />
              </Routes>
            </AnimatePresence>
          </ErrorBoundary>
          <Footer />
          <ScrollToTop />
          <NotificationManager />
          </div>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;