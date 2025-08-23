import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Paper, Avatar, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';

const LandingPage = () => {
  const features = [
    {
      icon: <RestaurantIcon />,
      title: 'Pre-Order System',
      description: 'Browse authentic Sri Lankan foods from both canteens and place orders in advance to skip queues.',
      details: ['Rice & Curry varieties', 'Rotti & Dhal specialties', 'Kottu & Biriyani', 'Fresh daily preparations']
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Real-time Queue Status',
      description: 'Live updates on queue lengths and waiting times to help you choose the best time to visit.',
      details: ['Current queue length', 'Estimated wait times', 'Peak hour alerts', 'Best time recommendations']
    },
    {
      icon: <PaymentIcon />,
      title: 'Digital Payments',
      description: 'Pay online while ordering to save time. Multiple payment options available.',
      details: ['UPI payments', 'Card payments', 'Campus meal cards', 'Instant confirmations']
    },
    {
      icon: <NotificationsIcon />,
      title: 'Smart Notifications',
      description: 'Get notified when your order is ready and receive alerts about special offers.',
      details: ['Order ready alerts', 'Special offers', 'Menu updates', 'Queue status changes']
    },
    {
      icon: <SchoolIcon />,
      title: 'School Supplies',
      description: 'Order essential stationery and books alongside your meals for convenience.',
      details: ['Pens & pencils', 'Notebooks & books', 'Calculators', 'Study materials']
    },
    {
      icon: <LanguageIcon />,
      title: 'Bilingual Support',
      description: 'Available in English and Tamil for better accessibility.',
      details: ['English interface', 'Tamil translations', 'Local food names', 'Cultural context']
    }
  ];

  const stats = [
    { number: '2000+', label: 'Happy Students', color: 'primary', icon: '🎓' },
    { number: '200+', label: 'Delicious Items', color: 'secondary', icon: '🍛' },
    { number: '4.8/5', label: 'Student Rating', color: 'success', icon: '⭐' },
    { number: '24/7', label: 'Always Available', color: 'info', icon: '🚀' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          backgroundImage: 'linear-gradient(rgba(69, 73, 85, 0.9), rgba(41, 191, 18, 0.2)), url(/images/1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          {/* Campus Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 3, md: 4 } }}>
            <Box sx={{
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
              background: 'linear-gradient(135deg, #29bf12 0%, #abff4f 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              boxShadow: '0 8px 32px rgba(41,191,18,0.4)',
              border: '4px solid #ffffff'
            }}>
              🏛️
            </Box>
          </Box>
          
          {/* Professional Heading */}
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              textAlign: 'center',
              color: '#fafaff',
              mb: 2,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            University of Ruhuna
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#fafaff', 
              mb: 1,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem' },
              textAlign: 'center',
              fontWeight: 400,
              opacity: 0.9
            }}
          >
            Faculty of Technology
          </Typography>
          
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#daddd8', 
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            Digital Canteen Management System
          </Typography>
          
          {/* Professional Tagline */}
          <Typography 
            variant="body1" 
            sx={{ 
              mb: { xs: 4, md: 5 }, 
              color: '#fafaff',
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              opacity: 0.95
            }}
          >
            Streamline your campus dining experience with our advanced pre-ordering system, 
            real-time queue management, and comprehensive academic supply services.
          </Typography>
          
          {/* Professional Highlights */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 2, md: 3 }, 
            mb: { xs: 4, md: 5 },
            flexWrap: 'wrap'
          }}>
            <Chip 
              label="200+ Items Available" 
              sx={{ 
                bgcolor: '#1c1c1c', 
                color: '#fafaff', 
                fontSize: { xs: '0.875rem', md: '1rem' },
                py: 1.5,
                px: 2,
                fontWeight: 500,
                borderRadius: 2
              }} 
            />
            <Chip 
              label="4.8/5 Student Rating" 
              sx={{ 
                bgcolor: '#daddd8', 
                color: '#1c1c1c', 
                fontSize: { xs: '0.875rem', md: '1rem' },
                py: 1.5,
                px: 2,
                fontWeight: 500,
                borderRadius: 2
              }} 
            />
            <Chip 
              label="2000+ Active Users" 
              sx={{ 
                bgcolor: '#fafaff', 
                color: '#1c1c1c', 
                fontSize: { xs: '0.875rem', md: '1rem' },
                py: 1.5,
                px: 2,
                fontWeight: 500,
                borderRadius: 2
              }} 
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/menu"
              sx={{ 
                bgcolor: '#fafaff', 
                color: '#1c1c1c', 
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': { 
                  bgcolor: '#daddd8',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }
              }}
            >
              Browse Menu & Order
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/queue-status"
              sx={{ 
                borderColor: '#fafaff', 
                color: '#fafaff',
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 500,
                borderRadius: 2,
                textTransform: 'none',
                borderWidth: 1.5,
                '&:hover': { 
                  borderColor: '#daddd8',
                  bgcolor: 'rgba(250,250,255,0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              View Queue Status
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} md={3} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3,
                bgcolor: '#f8fafc',
                border: '2px solid #29bf12',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(41,191,18,0.3)'
                }
              }}>
                <Typography variant="h2" sx={{ mb: 1 }}>{stat.icon}</Typography>
                <Typography variant="h3" sx={{ color: '#29bf12', fontWeight: 'bold', mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ color: '#454955', fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            color: '#29bf12', 
            mb: 2, 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.75rem' },
            letterSpacing: '-0.02em'
          }}
        >
          System Features & Benefits
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            color: '#6b7280', 
            mb: 6, 
            fontSize: '1.2rem', 
            maxWidth: '700px', 
            mx: 'auto', 
            lineHeight: 1.7,
            fontWeight: 400
          }}
        >
          Our comprehensive digital platform is designed specifically for the University of Ruhuna community, 
          offering seamless integration of dining services and academic supply management.
        </Typography>

        {/* Unified 2x3 Grid for Features */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card sx={{ 
                height: '100%', 
                p: 4,
                bgcolor: '#ffffff',
                border: '2px solid #abff4f',
                borderRadius: 4,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(41,191,18,0.2)',
                  borderColor: '#29bf12'
                }
              }}>
                <Avatar sx={{ 
                  bgcolor: '#29bf12', 
                  width: 70, 
                  height: 70,
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 16px rgba(41,191,18,0.3)'
                }}>
                  {feature.icon}
                </Avatar>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#454955',
                    mb: 2,
                    fontSize: '1.4rem'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    color: '#6b7280',
                    lineHeight: 1.6,
                    mb: 3
                  }}
                >
                  {feature.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {feature.details.map((detail, idx) => (
                    <Chip 
                      key={idx} 
                      label={detail} 
                      size="small" 
                      sx={{
                        bgcolor: '#f8fafc',
                        color: '#454955',
                        border: '1px solid #abff4f',
                        fontWeight: 500
                      }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Paper sx={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(248, 250, 252, 0.5)), url(/images/2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 6 
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            align="center" 
            gutterBottom 
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#29bf12',
              mb: 3,
              letterSpacing: '-0.02em',
              textShadow: '2px 2px 4px rgba(41,191,18,0.1)'
            }}
          >
            How It Works
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              color: '#6b7280', 
              mb: 6, 
              fontSize: '1.2rem', 
              maxWidth: '600px', 
              mx: 'auto', 
              lineHeight: 1.7
            }}
          >
            Simple steps to streamline your campus dining experience
          </Typography>
          
          <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mt: 2 }}>
            {[
              { step: '1', title: 'Browse Menu', desc: 'Select your canteen and browse authentic Sri Lankan foods or school supplies', color: '#29bf12' },
              { step: '2', title: 'Place Order', desc: 'Add items to cart, select pickup time, and pay digitally', color: '#29bf12' },
              { step: '3', title: 'Get Notified', desc: 'Receive notification when your order is ready for pickup', color: '#29bf12' },
              { step: '4', title: 'Skip Queue', desc: 'Walk straight to pickup counter and collect your order', color: '#29bf12' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 4,
                  bgcolor: '#ffffff',
                  border: '2px solid #abff4f',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(41,191,18,0.2)',
                    borderColor: '#29bf12'
                  }
                }}>
                  <Avatar sx={{ 
                    bgcolor: item.color, 
                    width: 90, 
                    height: 90, 
                    mx: 'auto', 
                    mb: 3, 
                    fontSize: '2.8rem',
                    fontWeight: 'bold',
                    boxShadow: '0 6px 20px rgba(41,191,18,0.3)',
                    border: '3px solid #abff4f'
                  }}>
                    {item.step}
                  </Avatar>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{
                      fontWeight: 700,
                      color: '#454955',
                      mb: 2,
                      fontSize: '1.5rem',
                      fontFamily: '"Inter", sans-serif'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: '#6b7280',
                      lineHeight: 1.7,
                      fontSize: '1.05rem',
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>

      {/* Popular Items Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.75rem' },
            color: '#29bf12',
            mb: 3,
            letterSpacing: '-0.02em'
          }}
        >
          Popular Canteen Items
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            color: '#6b7280', 
            mb: 6, 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            mx: 'auto', 
            lineHeight: 1.7
          }}
        >
          Discover the most loved dishes from our university canteens
        </Typography>
        
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          {[
            { name: 'Rice & Curry', tamil: 'சாதம் கறி', price: 'Rs. 120', rating: 4.8, emoji: '🍛' },
            { name: 'Kottu Rotti', tamil: 'கொட்டு ரொட்டி', price: 'Rs. 150', rating: 4.9, emoji: '🍜' },
            { name: 'Rotti & Dhal', tamil: 'ரொட்டி பருப்பு', price: 'Rs. 80', rating: 4.6, emoji: '🥖' },
            { name: 'String Hoppers', tamil: 'இடியாப்பம்', price: 'Rs. 90', rating: 4.7, emoji: '🍝' }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 4,
                height: '100%',
                bgcolor: '#ffffff',
                border: '2px solid #abff4f',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(41,191,18,0.2)',
                  borderColor: '#29bf12'
                }
              }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: '4rem',
                    mb: 2,
                    filter: 'drop-shadow(2px 2px 4px rgba(41,191,18,0.2))'
                  }}
                >
                  {item.emoji}
                </Typography>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{
                    fontWeight: 600,
                    color: '#454955',
                    mb: 1,
                    fontSize: '1.4rem'
                  }}
                >
                  {item.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#6b7280',
                    mb: 2,
                    fontSize: '0.95rem',
                    fontStyle: 'italic'
                  }}
                >
                  {item.tamil}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{
                    color: '#29bf12',
                    fontWeight: 700,
                    mb: 1,
                    fontSize: '1.3rem'
                  }}
                >
                  {item.price}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 0.5
                }}>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: '#29bf12',
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }}
                  >
                    ⭐ {item.rating}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #29bf12 0%, #abff4f 100%)',
        py: 10,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          zIndex: 1
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h1" 
            gutterBottom 
            sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 800, 
              mb: 3, 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Transform Your Campus Experience
          </Typography>
          <Typography 
            variant="h5" 
            paragraph 
            sx={{ 
              mb: 5, 
              color: '#ffffff',
              fontSize: { xs: '1.2rem', md: '1.4rem' }, 
              maxWidth: '700px', 
              mx: 'auto', 
              lineHeight: 1.6,
              fontWeight: 400,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Join over 2,000 University of Ruhuna students and faculty members who save time daily 
            with our smart canteen management system.
          </Typography>
          
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>2000+</Typography>
                <Typography variant="h6" sx={{ color: '#ffffff', opacity: 0.9 }}>Active Users</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>30min</Typography>
                <Typography variant="h6" sx={{ color: '#ffffff', opacity: 0.9 }}>Time Saved Daily</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: '#ffffff', fontWeight: 700, mb: 1 }}>24/7</Typography>
                <Typography variant="h6" sx={{ color: '#ffffff', opacity: 0.9 }}>System Available</Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/menu"
              sx={{ 
                bgcolor: '#ffffff', 
                color: '#29bf12', 
                px: { xs: 4, md: 6 },
                py: { xs: 2, md: 2.5 },
                fontSize: { xs: '1.2rem', md: '1.3rem' },
                fontWeight: 700,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                '&:hover': { 
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                }
              }}
            >
              Start Ordering Now
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/about"
              sx={{ 
                borderColor: '#ffffff', 
                color: '#ffffff',
                px: { xs: 4, md: 5 },
                py: { xs: 2, md: 2.5 },
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-3px)'
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;