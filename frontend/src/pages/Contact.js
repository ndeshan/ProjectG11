import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { LocationOn, Phone, Email, AccessTime, WhatsApp, ExpandMore, Emergency } from '@mui/icons-material';
import { ContactBackground } from '../components/BackgroundStyles';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will respond within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactBackground>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: { xs: '3rem', md: '4.5rem' },
            color: 'primary.main',
            mb: 6,
            letterSpacing: '-0.03em',
            textShadow: '3px 3px 8px rgba(41,191,18,0.25)'
          }}
        >
          Contact University of Ruhuna Canteen
        </Typography>

        <Grid container spacing={6} justifyContent="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              border: '2px solid #abff4f',
              borderRadius: 4,
              textAlign: 'center',
              p: 3
            }}>
              <CardContent>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: '#29bf12',
                    fontWeight: 700,
                    mb: 4
                  }}
                >
                  Phone Numbers
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Phone sx={{ fontSize: '3rem', color: '#29bf12', mb: 2 }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#454955',
                      mb: 2
                    }}
                  >
                    Main Office
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#29bf12', mb: 1 }}>+94 91 2245765</Typography>
                  <Typography variant="h6" sx={{ color: '#29bf12' }}>+94 77 1234567</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              border: '2px solid #abff4f',
              borderRadius: 4,
              textAlign: 'center',
              p: 3
            }}>
              <CardContent>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: '#29bf12',
                    fontWeight: 700,
                    mb: 4
                  }}
                >
                  Email Addresses
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Email sx={{ fontSize: '3rem', color: '#29bf12', mb: 2 }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#454955',
                      mb: 2
                    }}
                  >
                    Contact Us
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#29bf12', mb: 1 }}>canteen@tech.ruh.ac.lk</Typography>
                  <Typography variant="h6" sx={{ color: '#29bf12' }}>feedback@tech.ruh.ac.lk</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              border: '2px solid #abff4f',
              borderRadius: 4,
              textAlign: 'center',
              p: 3
            }}>
              <CardContent>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: '#29bf12',
                    fontWeight: 700,
                    mb: 4
                  }}
                >
                  WhatsApp Support
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <WhatsApp sx={{ fontSize: '3rem', color: '#25D366', mb: 2 }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#454955',
                      mb: 2
                    }}
                  >
                    Quick Support
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#25D366', mb: 1 }}>+94 77 1234567</Typography>
                  <Typography variant="body1" sx={{ color: '#6b7280' }}>Available 24/7</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={6} justifyContent="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              border: '3px solid',
              borderColor: 'primary.main',
              borderRadius: 6,
              p: 4,
              textAlign: 'center',
              boxShadow: 6
            }}>
              <CardContent>
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 800,
                    mb: 4,
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  Send us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    margin="normal"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    margin="normal"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    placeholder="Your feedback, suggestions, or inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ 
                      mt: 3,
                      py: 2,
                      px: 6,
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      bgcolor: '#29bf12',
                      '&:hover': { bgcolor: '#abff4f', color: '#454955' }
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={6} justifyContent="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              border: '2px solid',
              borderColor: 'primary.light',
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              boxShadow: 4
            }}>
              <CardContent>
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 800,
                    mb: 4,
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  Visit Our Location
                </Typography>
                <LocationOn sx={{ fontSize: '4rem', color: '#29bf12', mb: 3 }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 3
                  }}
                >
                  Our Address
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 600,
                    lineHeight: 1.6,
                    mb: 3
                  }}
                >
                  Faculty of Technology<br/>
                  University of Ruhuna<br/>
                  Kamburupitiya, Matara<br/>
                  Sri Lanka
                </Typography>
                <AccessTime sx={{ fontSize: '3rem', color: '#29bf12', mb: 2 }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#454955',
                    mb: 2
                  }}
                >
                  Operating Hours
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#6b7280',
                    lineHeight: 1.8
                  }}
                >
                  Monday - Friday: 7:00 AM - 8:00 PM<br/>
                  Saturday: 8:00 AM - 6:00 PM<br/>
                  Sunday: Closed<br/>
                  Public Holidays: 9:00 AM - 2:00 PM
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={6} justifyContent="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={10}>
            <Card sx={{ 
              bgcolor: 'error.main',
              color: 'common.white',
              border: '3px solid',
              borderColor: 'error.dark',
              borderRadius: 6,
              p: 6,
              boxShadow: 8
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Emergency sx={{ fontSize: '4rem', mb: 3, color: 'common.white' }} />
                <Typography 
                  variant="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 800,
                    mb: 4,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  🚨 Emergency Contact Information
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Security</Typography>
                    <Typography variant="h5">+94 91 2245700</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Medical Emergency</Typography>
                    <Typography variant="h5">+94 91 2245701</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Campus Emergency</Typography>
                    <Typography variant="h5">+94 91 2245702</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={10}>
            <Typography 
              variant="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                color: '#29bf12',
                fontWeight: 700,
                mb: 4
              }}
            >
              Frequently Asked Questions
            </Typography>
            {[
              { q: 'What are the canteen operating hours?', a: 'Monday-Friday: 7AM-8PM, Saturday: 8AM-6PM, Sunday: Closed' },
              { q: 'Do you accept digital payments?', a: 'Yes, we accept all major digital payment methods including mobile banking' },
              { q: 'Can I pre-order my meals?', a: 'Yes, use our digital ordering system to pre-order and skip the queue' },
              { q: 'Do you cater to dietary restrictions?', a: 'Yes, we offer vegetarian options and can accommodate most dietary needs' }
            ].map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'primary.light' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{faq.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </ContactBackground>
  );
};

export default Contact;