import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { School, Restaurant, People, Timeline } from '@mui/icons-material';
import { UniversityBackground } from '../components/BackgroundStyles';

const AboutUs = () => {
  const stats = [
    { icon: <School />, number: '2000+', label: 'Students Served Daily' },
    { icon: <Restaurant />, number: '50+', label: 'Sri Lankan Dishes' },
    { icon: <People />, number: '15', label: 'Dedicated Staff' },
    { icon: <Timeline />, number: '10+', label: 'Years of Service' },
    { icon: <School />, number: '24/7', label: 'Digital Service' }
  ];

  return (
    <UniversityBackground>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 }, textAlign: 'center' }}>
      <Card sx={{ mb: 6, p: { xs: 2, md: 4 }, borderRadius: 4, background: 'linear-gradient(135deg, rgba(41,191,18,0.12), rgba(171,255,79,0.12))', border: '2px solid', borderColor: 'primary.light' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>
            University of Ruhuna - Faculty of Technology Canteen
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Serving authentic Sri Lankan cuisine to our academic community since 2014
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3} justifyContent="center" sx={{ mb: 6, flexWrap: 'nowrap', overflowX: 'auto' }}>
        {stats.map((stat, index) => (
          <Grid item xs="auto" key={index}>
            <Card sx={{ textAlign: 'center', p: 3, minWidth: 220, width: 240, border: '2px solid', borderColor: 'primary.light', boxShadow: 3, borderRadius: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                {stat.icon}
              </Avatar>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {stat.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>Our Story</Typography>
        <Typography variant="body1" paragraph sx={{ color: '#2c2c2c', fontSize: '1.1rem', lineHeight: 1.7 }}>
          The Faculty of Technology Canteen at University of Ruhuna has been the heart of campus dining since 2014. 
          Located in the beautiful coastal city of Galle, our canteen serves over 2000 students, faculty, and staff daily 
          with authentic Sri Lankan cuisine that reflects our rich cultural heritage.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#2c2c2c', fontSize: '1.1rem', lineHeight: 1.7 }}>
          Our mission is to provide nutritious, affordable, and delicious meals while supporting local farmers and 
          suppliers. We take pride in serving traditional dishes like Rice & Curry, Kottu Rotti, and String Hoppers, 
          prepared with fresh ingredients and authentic spices.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>Our Commitment</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>🌱 Fresh & Local</Typography>
            <Typography variant="body2" paragraph sx={{ color: '#2c2c2c', fontSize: '1rem', lineHeight: 1.6 }}>
              We source our vegetables from local farmers in the Southern Province, ensuring freshness and 
              supporting our community.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>💰 Student-Friendly Prices</Typography>
            <Typography variant="body2" paragraph sx={{ color: '#2c2c2c', fontSize: '1rem', lineHeight: 1.6 }}>
              Our meals are priced affordably to ensure every student can enjoy nutritious food without 
              financial burden.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>🇱🇰 Authentic Flavors</Typography>
            <Typography variant="body2" paragraph sx={{ color: '#2c2c2c', fontSize: '1rem', lineHeight: 1.6 }}>
              Every dish is prepared using traditional Sri Lankan recipes passed down through generations.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>📚 Student Convenience</Typography>
            <Typography variant="body2" paragraph sx={{ color: '#2c2c2c', fontSize: '1rem', lineHeight: 1.6 }}>
              Beyond food, we provide essential stationery and study materials for student convenience.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>Location & Hours</Typography>
        <Typography variant="body1" paragraph sx={{ color: '#2c2c2c', fontSize: '1.1rem', lineHeight: 1.7 }}>
          <strong>Address:</strong> Faculty of Technology, University of Ruhuna, Hapugala, Galle 80000, Sri Lanka
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#2c2c2c', fontSize: '1.1rem', lineHeight: 1.7 }}>
          <strong>Operating Hours:</strong>
        </Typography>
        <Typography variant="body2" paragraph sx={{ color: '#2c2c2c', fontSize: '1rem', lineHeight: 1.6 }}>
          • Breakfast: 7:00 AM - 9:00 AM<br/>
          • Lunch: 12:00 PM - 2:00 PM<br/>
          • Dinner: 6:00 PM - 8:00 PM<br/>
          • Stationery Shop: 8:00 AM - 5:00 PM
        </Typography>
      </Box>
      </Container>
    </UniversityBackground>
  );
};

export default AboutUs;