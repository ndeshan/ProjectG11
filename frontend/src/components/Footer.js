import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ 
      bgcolor: '#454955', 
      color: '#ffffff', 
      py: 8, 
      mt: 0,
      borderTop: '4px solid #29bf12'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <img 
                src="/images/logo.png" 
                alt="University of Ruhuna Logo" 
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  marginRight: '16px',
                  boxShadow: '0 4px 16px rgba(41,191,18,0.3)'
                }}
              />
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    color: '#29bf12',
                    mb: 1
                  }}
                >
                  University of Ruhuna
                </Typography>
                <Typography variant="body1" sx={{ color: '#abff4f', fontWeight: 500 }}>
                  Faculty of Technology
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 3, color: '#ffffff' }}>
              Digital Canteen Management System - Serving authentic Sri Lankan cuisine 
              to our university community with modern technology.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                sx={{ 
                  bgcolor: '#29bf12', 
                  color: '#ffffff',
                  '&:hover': { bgcolor: '#abff4f', color: '#454955' }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: '#29bf12', 
                  color: '#ffffff',
                  '&:hover': { bgcolor: '#abff4f', color: '#454955' }
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: '#29bf12', 
                  color: '#ffffff',
                  '&:hover': { bgcolor: '#abff4f', color: '#454955' }
                }}
              >
                <Email />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#29bf12', 
                fontWeight: 600, 
                mb: 3,
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOn sx={{ mr: 2, fontSize: 20, color: '#abff4f', mt: 0.5 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#ffffff' }}>
                Faculty of Technology<br />
                University of Ruhuna<br />
                Hapugala, Galle, Sri Lanka
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 2, fontSize: 20, color: '#abff4f' }} />
              <Typography variant="body1" sx={{ color: '#ffffff' }}>+94 91 2245765</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ mr: 2, fontSize: 20, color: '#abff4f' }} />
              <Typography variant="body1" sx={{ color: '#ffffff' }}>canteen@tech.ruh.ac.lk</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: '#29bf12', 
                fontWeight: 600, 
                mb: 3,
                fontFamily: '"Inter", sans-serif'
              }}
            >
              Our Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: '#29bf12', 
                  borderRadius: '50%', 
                  mr: 2 
                }} />
                <Typography variant="body1" sx={{ color: '#ffffff' }}>Traditional Rice & Curry</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: '#29bf12', 
                  borderRadius: '50%', 
                  mr: 2 
                }} />
                <Typography variant="body1" sx={{ color: '#ffffff' }}>Fresh Rotti & Dhal</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: '#29bf12', 
                  borderRadius: '50%', 
                  mr: 2 
                }} />
                <Typography variant="body1" sx={{ color: '#ffffff' }}>Authentic Kottu Rotti</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: '#29bf12', 
                  borderRadius: '50%', 
                  mr: 2 
                }} />
                <Typography variant="body1" sx={{ color: '#ffffff' }}>Academic Supplies</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: '#29bf12', 
                  borderRadius: '50%', 
                  mr: 2 
                }} />
                <Typography variant="body1" sx={{ color: '#ffffff' }}>Digital Pre-ordering</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ 
          borderTop: '2px solid #29bf12', 
          mt: 6, 
          pt: 4, 
          textAlign: 'center',
          bgcolor: 'rgba(41,191,18,0.1)',
          mx: -3,
          px: 3,
          borderRadius: 2
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '1.1rem'
            }}
          >
            © 2025 University of Ruhuna - Faculty of Technology. Hack trail 2.0 G1 All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;