import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Paper, Chip, Divider } from '@mui/material';
import { School, Restaurant, People, Timeline, Star, TrendingUp, LocationOn, AccessTime, Phone, Email } from '@mui/icons-material';


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
    { name: 'Mr. Sunil Perera', role: 'Canteen Manager', experience: '15 years', image: '👨💼' },
    { name: 'Mrs. Kamala Silva', role: 'Head Chef', experience: '12 years', image: '👩🍳' },
    { name: 'Mr. Ravi Fernando', role: 'Operations Supervisor', experience: '8 years', image: '👨💻' },
    { name: 'Ms. Nisha Jayawardena', role: 'Quality Controller', experience: '6 years', image: '👩🔬' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section with University Image */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        p: { xs: 4, md: 6 },
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(41,191,18,0.1) 0%, rgba(30,30,30,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(41,191,18,0.05) 0%, rgba(255,255,255,0.98) 100%)',
        borderRadius: 4,
        boxShadow: '0 20px 40px rgba(41,191,18,0.1)',
        border: '2px solid',
        borderColor: 'primary.main',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'linear-gradient(45deg, #29bf12, #abff4f)',
          borderRadius: '50%',
          opacity: 0.1
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
          borderRadius: '50%',
          opacity: 0.1
        }} />
        
        <Box sx={{ 
          width: 140, 
          height: 140, 
          mx: 'auto', 
          mb: 3,
          background: 'linear-gradient(135deg, #29bf12 0%, #abff4f 50%, #1e8a0d 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
          boxShadow: '0 10px 30px rgba(41,191,18,0.3)',
          border: '4px solid white',
          position: 'relative',
          zIndex: 1
        }}>
          🏛️
        </Box>
        
        <Chip 
          label="EST. 2014" 
          sx={{ 
            mb: 2, 
            bgcolor: 'primary.main', 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }} 
        />
        
        <Typography variant="h2" gutterBottom fontWeight="bold" sx={{
          background: 'linear-gradient(45deg, #29bf12, #1e8a0d)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}>
          University of Ruhuna
        </Typography>
        
        <Typography variant="h4" gutterBottom sx={{ 
          color: 'text.primary',
          fontWeight: 600,
          mb: 3
        }}>
          Faculty of Technology Canteen
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Chip icon={<Restaurant />} label="Authentic Sri Lankan Cuisine" color="primary" variant="outlined" />
          <Chip icon={<School />} label="Serving 2000+ Students Daily" color="secondary" variant="outlined" />
          <Chip icon={<LocationOn />} label="Matara, Southern Province" color="success" variant="outlined" />
        </Box>
        
        <Typography variant="h6" color="text.secondary" sx={{ 
          lineHeight: 1.8,
          maxWidth: 600,
          mx: 'auto',
          fontStyle: 'italic'
        }}>
          "Nourishing minds and bodies with the finest Sri Lankan flavors in the heart of academic excellence"
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 4, 
              height: '100%',
              background: (theme) => theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.palette[stat.color].dark}20 0%, ${theme.palette[stat.color].main}10 100%)`
                : `linear-gradient(135deg, ${theme.palette[stat.color].light}30 0%, ${theme.palette[stat.color].main}05 100%)`,
              border: '2px solid',
              borderColor: `${stat.color}.main`,
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 20px 40px ${stat.color === 'primary' ? 'rgba(41,191,18,0.2)' : 'rgba(0,0,0,0.1)'}`
              }
            }}>
              <Avatar sx={{ 
                bgcolor: `${stat.color}.main`, 
                mx: 'auto', 
                mb: 3, 
                width: 80, 
                height: 80,
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
              }}>
                <Box sx={{ fontSize: '2rem' }}>{stat.icon}</Box>
              </Avatar>
              <Typography variant="h2" color={`${stat.color}.main`} fontWeight="bold" sx={{ mb: 1 }}>
                {stat.number}
              </Typography>
              <Typography variant="h6" color="text.primary" fontWeight="600">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* University Story Section */}
      <Card sx={{ mb: 8, overflow: 'hidden', borderRadius: 4 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: { xs: 250, md: 400 }, 
              background: 'linear-gradient(135deg, #29bf12 0%, #abff4f 50%, #1e8a0d 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circles */}
              <Box sx={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 100,
                height: 100,
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: -30,
                right: -30,
                width: 120,
                height: 120,
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }} />
              
                                                                    </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h3" gutterBottom fontWeight="bold" sx={{
                background: 'linear-gradient(45deg, #29bf12, #1e8a0d)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Playfair Display", serif'
              }}>
                Our Story
              </Typography>
              
              <Divider sx={{ mb: 3, bgcolor: 'primary.main', height: 3, width: 60 }} />
              
              <Box sx={{
                p: { xs: 2, md: 3 },
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
              }}>
                <Typography variant="body1" paragraph sx={{ color: 'text.primary', lineHeight: 1.9, fontSize: '1.1rem' }}>
                  Since 2014, the Faculty of Technology Canteen has been the beating heart of campus life at University of Ruhuna.
                  Nestled in the historic coastal city of Matara, we proudly serve over 2,000 students, faculty, and staff daily.
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'text.primary', lineHeight: 1.9, fontSize: '1.1rem' }}>
                  Our mission transcends mere food service — we're dedicated to preserving and celebrating authentic Sri Lankan culinary traditions
                  while supporting local farmers and suppliers from the Southern Province.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.9, fontSize: '1.1rem' }}>
                  From traditional Rice & Curry to beloved Kottu Rotti and delicate String Hoppers, every dish tells a story of our rich cultural heritage,
                  prepared with love and the finest local ingredients.
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="🌶️ Authentic Spices" size="small" color="primary" />
                <Chip label="🌾 Local Ingredients" size="small" color="secondary" />
                <Chip label="👨🍳 Expert Chefs" size="small" color="success" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Achievements Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{
            background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Awards & Recognition
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Celebrating excellence in campus dining and student satisfaction
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {achievements.map((achievement, index) => {
            const colors = ['#ff6b35', '#29bf12', '#1976d2', '#9c27b0'];
            const bgColors = ['rgba(255,107,53,0.1)', 'rgba(41,191,18,0.1)', 'rgba(25,118,210,0.1)', 'rgba(156,39,176,0.1)'];
            
            return (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  p: 4, 
                  height: '100%',
                  background: bgColors[index],
                  border: '2px solid',
                  borderColor: colors[index],
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 15px 35px ${colors[index]}30`
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                    <Box sx={{
                      fontSize: '3rem',
                      background: colors[index],
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {achievement.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" fontWeight="bold" sx={{ color: colors[index], mb: 1 }}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                        {achievement.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{
            background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Meet Our Team
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            The passionate professionals who make every meal special
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => {
            const colors = ['#1976d2', '#29bf12', '#ff6b35', '#9c27b0'];
            const bgColors = ['rgba(25,118,210,0.1)', 'rgba(41,191,18,0.1)', 'rgba(255,107,53,0.1)', 'rgba(156,39,176,0.1)'];
            
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  textAlign: 'center', 
                  p: 4,
                  height: '100%',
                  background: bgColors[index],
                  border: '2px solid',
                  borderColor: colors[index],
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${colors[index]}30`
                  }
                }}>
                  <Box sx={{
                    fontSize: '4rem',
                    mb: 2,
                    background: colors[index],
                    borderRadius: '50%',
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                  }}>
                    {member.image}
                  </Box>
                  
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: colors[index] }}>
                    {member.name}
                  </Typography>
                  
                  <Typography variant="body1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                    {member.role}
                  </Typography>
                  
                  <Chip 
                    label={member.experience} 
                    size="small" 
                    sx={{ 
                      bgcolor: colors[index], 
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Contact & Visit Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: 4, 
            height: '100%',
            background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0.05) 100%)',
            border: '2px solid #1976d2',
            borderRadius: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationOn sx={{ fontSize: '2rem', color: '#1976d2', mr: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="#1976d2">
                Visit Us
              </Typography>
            </Box>
            
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              🏢 <strong>Faculty of Technology</strong>
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              University of Ruhuna<br/>
              Kamburupitiya, Matara<br/>
              Southern Province, Sri Lanka
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ color: '#29bf12', mr: 1 }} />
              <Typography variant="body1">+94 41 229 3265</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Email sx={{ color: '#29bf12', mr: 1 }} />
              <Typography variant="body1">canteen@tech.ruh.ac.lk</Typography>
            </Box>
            
            <Chip 
              icon={<LocationOn />} 
              label="5 minutes from lecture halls & library" 
              color="primary" 
              variant="outlined"
              sx={{ fontSize: '0.9rem' }}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: 4, 
            height: '100%',
            background: 'linear-gradient(135deg, rgba(41,191,18,0.1) 0%, rgba(41,191,18,0.05) 100%)',
            border: '2px solid #29bf12',
            borderRadius: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccessTime sx={{ fontSize: '2rem', color: '#29bf12', mr: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="#29bf12">
                Hours
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#29bf12' }}>
                📅 Monday - Friday
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="body1" sx={{ mb: 0.5 }}>• 🍳 Breakfast: <strong>7:00 AM - 9:00 AM</strong></Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>• 🍛 Lunch: <strong>12:00 PM - 2:00 PM</strong></Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>• 🍽️ Dinner: <strong>6:00 PM - 8:00 PM</strong></Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>• 📝 Stationery: <strong>8:00 AM - 5:00 PM</strong></Typography>
              </Box>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#ff6b35' }}>
                🎆 Saturday: <span style={{ fontWeight: 'normal' }}>8:00 AM - 6:00 PM</span>
              </Typography>
              <Typography variant="h6" sx={{ color: '#f44336' }}>
                🚫 Sunday: <span style={{ fontWeight: 'normal' }}>Closed</span>
              </Typography>
            </Box>
            
            <Chip 
              label="Extended hours during exam periods" 
              color="success" 
              variant="outlined"
              sx={{ fontSize: '0.9rem' }}
            />
          </Card>
        </Grid>
      </Grid>
      </Container>
      
      {/* Bottom CTA Section */}
      <Box sx={{ 
        mt: 8,
        py: 6,
        background: 'linear-gradient(135deg, #29bf12 0%, #abff4f 100%)',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
            Experience Authentic Sri Lankan Flavors
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>
            Join thousands of students who call our canteen their second home
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              label="🍛 Fresh Daily" 
              sx={{ bgcolor: 'white', color: '#29bf12', fontWeight: 'bold', fontSize: '1rem', py: 2, px: 1 }} 
            />
            <Chip 
              label="💰 Student Prices" 
              sx={{ bgcolor: 'white', color: '#29bf12', fontWeight: 'bold', fontSize: '1rem', py: 2, px: 1 }} 
            />
            <Chip 
              label="🌶️ Authentic Taste" 
              sx={{ bgcolor: 'white', color: '#29bf12', fontWeight: 'bold', fontSize: '1rem', py: 2, px: 1 }} 
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default EnhancedAboutUs;