import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Paper } from '@mui/material';
import { School, Restaurant, People, Timeline, Star, TrendingUp } from '@mui/icons-material';
import { UniversityBackground } from '../components/BackgroundStyles';

const EnhancedAboutUs = () => {
  const stats = [
    { icon: <School />, number: '2000+', label: 'Students Served Daily', color: 'primary' },
    { icon: <Restaurant />, number: '150+', label: 'Sri Lankan Dishes', color: 'secondary' },
    { icon: <People />, number: '25', label: 'Dedicated Staff', color: 'success' },
    { icon: <Timeline />, number: '10+', label: 'Years of Service', color: 'info' }
  ];

  const achievements = [
    { title: 'Best Campus Canteen 2023', description: 'Awarded by University Grants Commission', icon: '🏆' },
    { title: 'ISO 22000 Certified', description: 'Food Safety Management System', icon: '✅' },
    { title: '4.8/5 Student Rating', description: 'Based on 5000+ reviews', icon: '⭐' },
    { title: 'Zero Waste Initiative', description: 'Eco-friendly operations since 2022', icon: '🌱' }
  ];

  const teamMembers = [
    { name: 'Mr. Sunil Perera', role: 'Canteen Manager', experience: '15 years', image: '👨‍💼' },
    { name: 'Mrs. Kamala Silva', role: 'Head Chef', experience: '12 years', image: '👩‍🍳' },
    { name: 'Mr. Ravi Fernando', role: 'Operations Supervisor', experience: '8 years', image: '👨‍💻' },
    { name: 'Ms. Nisha Jayawardena', role: 'Quality Controller', experience: '6 years', image: '👩‍🔬' }
  ];

  return (
    <UniversityBackground>
      <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section with University Image */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        p: { xs: 3, md: 4 },
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : 'rgba(255,255,255,0.92)',
        borderRadius: 3,
        boxShadow: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ 
          width: 120, 
          height: 120, 
          mx: 'auto', 
          mb: 3,
          background: 'linear-gradient(135deg, #1976d2 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem'
        }}>
          🏛️
        </Box>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          University of Ruhuna - Faculty of Technology Canteen
        </Typography>
        <Typography variant="h6" color="text.primary" paragraph sx={{ lineHeight: 1.7 }}>
          Serving authentic Sri Lankan cuisine to our academic community since 2014
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7 }}>
          Located in the beautiful coastal city of Galle, Southern Province, Sri Lanka
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <Avatar sx={{ bgcolor: `${stat.color}.main`, mx: 'auto', mb: 2, width: 60, height: 60 }}>
                {stat.icon}
              </Avatar>
              <Typography variant="h3" color={`${stat.color}.main`} fontWeight="bold">
                {stat.number}
              </Typography>
              <Typography variant="body1" color="text.primary" fontWeight="600">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* University Story Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            height: 300, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '4rem'
          }}>
            🏫📚🍛
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom fontWeight="bold">Our Story</Typography>
          <Typography variant="body1" paragraph sx={{ color: 'text.primary', lineHeight: 1.8 }}>
            The Faculty of Technology Canteen at University of Ruhuna has been the heart of campus dining since 2014. 
            Located in the historic city of Galle, our canteen serves over 2000 students, faculty, and staff daily 
            with authentic Sri Lankan cuisine that reflects our rich cultural heritage.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'text.primary', lineHeight: 1.8 }}>
            Our mission is to provide nutritious, affordable, and delicious meals while supporting local farmers and 
            suppliers from the Southern Province. We take pride in serving traditional dishes like Rice & Curry, 
            Kottu Rotti, and String Hoppers, prepared with fresh ingredients and authentic spices.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
            As part of the University of Ruhuna family, we understand the importance of good nutrition for academic 
            success and strive to create a welcoming environment for our entire university community.
          </Typography>
        </Grid>
      </Grid>

      {/* Achievements Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Our Achievements & Recognition
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>{achievement.icon}</Typography>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{achievement.title}</Typography>
                    <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7 }}>
                      {achievement.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Our Commitment Section */}
      <Paper sx={{ p: 4, mb: 6, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.85)' : '#ffffff', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Our Commitment to Excellence
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>🌱</Typography>
              <Box>
                <Typography variant="h6" fontWeight="bold">Fresh & Local Sourcing</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.7 }}>
                  We source our vegetables from local farmers in Galle and Matara districts, ensuring freshness 
                  and supporting our community. Our rice comes directly from paddy fields in the Southern Province.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>💰</Typography>
              <Box>
                <Typography variant="h6" fontWeight="bold">Student-Friendly Prices</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.7 }}>
                  Our meals are subsidized by the university to ensure every student can enjoy nutritious food 
                  without financial burden. A complete meal costs less than Rs. 200.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>🇱🇰</Typography>
              <Box>
                <Typography variant="h6" fontWeight="bold">Authentic Sri Lankan Flavors</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.7 }}>
                  Every dish is prepared using traditional Sri Lankan recipes passed down through generations. 
                  Our chefs are trained in authentic Southern Province cooking methods.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>📚</Typography>
              <Box>
                <Typography variant="h6" fontWeight="bold">Student Convenience</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.7 }}>
                  Beyond food, we provide essential stationery and study materials. Our digital ordering system 
                  helps students save time and focus on their studies.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Team Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Meet Our Dedicated Team
        </Typography>
        <Typography variant="body1" align="center" color="text.primary" paragraph sx={{ lineHeight: 1.7 }}>
          The passionate people behind your daily meals
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h2" sx={{ mb: 2 }}>{member.image}</Typography>
                <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
                <Typography variant="body2" color="primary.main" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {member.experience} experience
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Location & Hours */}
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">Visit Us</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>📍 Location</Typography>
            <Typography variant="body1" paragraph>
              <strong>Faculty of Technology</strong><br/>
              University of Ruhuna<br/>
              Hapugala, Galle 80000<br/>
              Southern Province, Sri Lanka
            </Typography>
            <Typography variant="body2" color="text.primary">
              Just 5 minutes walk from the main lecture halls and library
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>🕒 Operating Hours</Typography>
            <Typography variant="body1" paragraph>
              <strong>Monday - Friday:</strong><br/>
              • Breakfast: 7:00 AM - 9:00 AM<br/>
              • Lunch: 12:00 PM - 2:00 PM<br/>
              • Dinner: 6:00 PM - 8:00 PM<br/>
              • Stationery Shop: 8:00 AM - 5:00 PM
            </Typography>
            <Typography variant="body1">
              <strong>Saturday:</strong> 8:00 AM - 6:00 PM<br/>
              <strong>Sunday:</strong> Closed
            </Typography>
          </Grid>
        </Grid>
      </Card>
      </Container>
    </UniversityBackground>
  );
};

export default EnhancedAboutUs;