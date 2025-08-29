import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Divider } from '@mui/material';
import { Restaurant, People, LocalDining, School, Star, Favorite } from '@mui/icons-material';

import { StaggerContainer, Scale } from '../components/animations';

const ProfessionalAboutUs = () => {
  const stats = [
    { icon: <People />, number: '2000+', label: 'Students Served Daily' },
    { icon: <Restaurant />, number: '200+', label: 'Menu Items' },
    { icon: <LocalDining />, number: '10+', label: 'Years of Service' },
    { icon: <School />, number: '3', label: 'Canteen Locations' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '4rem' },
            color: '#454955',
            mb: 2,
            textShadow: '2px 2px 4px rgba(69,73,85,0.1)'
          }}
        >
          About Our Canteen
        </Typography>
        
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            color: '#6b7280',
            mb: 8,
            fontWeight: 400,
            maxWidth: '900px',
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
          Serving the University of Ruhuna community with authentic Sri Lankan cuisine and modern digital convenience
        </Typography>

        <StaggerContainer>
          {/* Our Story Section */}
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                color: '#29bf12',
                fontWeight: 700,
                textAlign: 'center',
                mb: 4,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Our Story
            </Typography>
            
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Scale>
                  <Box 
                    sx={{
                      width: '100%',
                      height: '350px',
                      backgroundImage: 'url(/images/home-hero.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 4,
                      boxShadow: '0 16px 40px rgba(41,191,18,0.25)',
                      border: '3px solid #abff4f'
                    }}
                  />
                </Scale>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ pl: { md: 2 } }}>
                  <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      fontSize: '1.2rem',
                      lineHeight: 1.8,
                      color: '#454955',
                      mb: 4,
                      fontWeight: 500
                    }}
                  >
                    Since 2014, the Faculty of Technology Canteen has been the beating heart of campus life 
                    at University of Ruhuna. Nestled in the historic coastal city of Matara, we proudly 
                    serve over 2,000 students, faculty, and staff daily.
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    paragraph 
                    sx={{ 
                      fontSize: '1.2rem',
                      lineHeight: 1.8,
                      color: '#454955',
                      mb: 4,
                      fontWeight: 500
                    }}
                  >
                    Our mission transcends mere food service — we're dedicated to preserving and celebrating 
                    authentic Sri Lankan culinary traditions while supporting local farmers and suppliers 
                    from the Southern Province.
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontSize: '1.2rem',
                      lineHeight: 1.8,
                      color: '#454955',
                      fontWeight: 500,
                      fontStyle: 'italic',
                      borderLeft: '4px solid #29bf12',
                      pl: 3,
                      bgcolor: 'rgba(41,191,18,0.05)',
                      py: 2,
                      borderRadius: 2
                    }}
                  >
                    "From traditional Rice & Curry to beloved Kottu Rotti and delicate String Hoppers, 
                    every dish tells a story of our rich cultural heritage, prepared with love and 
                    the finest local ingredients."
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Values Section */}
          <Box sx={{ mb: 10 }}>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                color: '#29bf12',
                fontWeight: 700,
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              What Makes Us Special
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Scale>
                  <Card 
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      p: 4,
                      border: '3px solid #abff4f',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 40px rgba(41,191,18,0.25)',
                        borderColor: '#29bf12'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 3 }}>🌶️</Typography>
                      <Typography variant="h4" gutterBottom sx={{ color: '#29bf12', fontWeight: 700, mb: 3 }}>
                        Authentic Spices
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#6b7280', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}>
                        Traditional Sri Lankan spices and cooking methods passed down through generations, 
                        ensuring every bite is authentic and flavorful.
                      </Typography>
                    </CardContent>
                  </Card>
                </Scale>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Scale>
                  <Card 
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      p: 4,
                      border: '3px solid #abff4f',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 40px rgba(41,191,18,0.25)',
                        borderColor: '#29bf12'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 3 }}>🌾</Typography>
                      <Typography variant="h4" gutterBottom sx={{ color: '#29bf12', fontWeight: 700, mb: 3 }}>
                        Local Ingredients
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#6b7280', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}>
                        Fresh produce sourced directly from local farmers in the Southern Province, 
                        supporting our community while ensuring quality.
                      </Typography>
                    </CardContent>
                  </Card>
                </Scale>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Scale>
                  <Card 
                    sx={{ 
                      height: '100%',
                      textAlign: 'center',
                      p: 4,
                      border: '3px solid #abff4f',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 40px rgba(41,191,18,0.25)',
                        borderColor: '#29bf12'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 3 }}>👨🍳</Typography>
                      <Typography variant="h4" gutterBottom sx={{ color: '#29bf12', fontWeight: 700, mb: 3 }}>
                        Expert Chefs
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#6b7280', 
                        lineHeight: 1.8,
                        fontSize: '1.1rem'
                      }}>
                        Skilled culinary professionals dedicated to bringing you the best of Sri Lankan cuisine 
                        with modern presentation and service.
                      </Typography>
                    </CardContent>
                  </Card>
                </Scale>
              </Grid>
            </Grid>
          </Box>

          {/* Statistics Section */}
          <Box sx={{ mb: 10 }}>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                color: '#29bf12',
                fontWeight: 700,
                textAlign: 'center',
                mb: 6,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Our Impact in Numbers
            </Typography>
            
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Scale>
                    <Card 
                      sx={{ 
                        textAlign: 'center',
                        p: 4,
                        bgcolor: '#29bf12',
                        color: '#ffffff',
                        borderRadius: 4,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.08)',
                          boxShadow: '0 16px 40px rgba(41,191,18,0.4)'
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ fontSize: '3rem', mb: 2 }}>{stat.icon}</Box>
                        <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: '2.5rem' }}>
                          {stat.number}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Scale>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Mission Statement */}
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'rgba(41,191,18,0.05)', borderRadius: 4, border: '2px solid #abff4f' }}>
            <Favorite sx={{ fontSize: '4rem', color: '#29bf12', mb: 3 }} />
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                color: '#29bf12',
                fontWeight: 700,
                mb: 4
              }}
            >
              "Nourishing Minds, One Meal at a Time"
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#454955',
                fontWeight: 500,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              We believe that great food fuels great minds. Every meal we serve is prepared with care, 
              tradition, and a commitment to excellence that reflects the values of University of Ruhuna.
            </Typography>
          </Box>
        </StaggerContainer>
      </Container>
    </div>
  );
};

export default ProfessionalAboutUs;