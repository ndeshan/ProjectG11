import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button, Box, Paper, Divider } from '@mui/material';
import { LocationOn, Phone, Email, AccessTime, WhatsApp, Facebook, Instagram } from '@mui/icons-material';
import { ContactBackground } from '../components/BackgroundStyles';

const EnhancedContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', category: 'general' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  const contactMethods = [
    {
      icon: <Phone sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Phone Numbers',
      details: [
        'Main Office: +94 91 2245765',
        'Canteen Direct: +94 77 1234567',
        'Emergency: +94 91 2245700'
      ]
    },
    {
      icon: <Email sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Email Addresses',
      details: [
        'General: canteen@tech.ruh.ac.lk',
        'Feedback: feedback@tech.ruh.ac.lk',
        'Orders: orders@tech.ruh.ac.lk'
      ]
    },
    {
      icon: <WhatsApp sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'WhatsApp Support',
      details: [
        'Quick Orders: +94 77 1234567',
        'Complaints: +94 77 1234568',
        'Available: 7:00 AM - 8:00 PM'
      ]
    }
  ];

  return (
    <ContactBackground>
      <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Contact University of Ruhuna Canteen
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          We're here to serve you better. Get in touch with us!
        </Typography>
      </Box>

      {/* Contact Methods */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {contactMethods.map((method, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Box sx={{ mb: 2 }}>{method.icon}</Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {method.title}
              </Typography>
              {method.details.map((detail, idx) => (
                <Typography key={idx} variant="body2" color="text.secondary" paragraph>
                  {detail}
                </Typography>
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">Send us a Message</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Have a question, suggestion, or complaint? We'd love to hear from you!
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      SelectProps={{ native: true }}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="food">Food Quality</option>
                      <option value="service">Service Issue</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="complaint">Complaint</option>
                      <option value="catering">Catering Request</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      required
                      placeholder="Please describe your inquiry in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Location & Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">Visit Our Location</Typography>
              
              {/* Map Placeholder */}
              <Paper sx={{ 
                height: 200, 
                mb: 3, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: 'grey.100',
                backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <LocationOn sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" color="primary.main">
                    University of Ruhuna Campus Map
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hapugala, Galle - Interactive map coming soon
                  </Typography>
                </Box>
              </Paper>

              {/* Address Details */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Address</Typography>
                    <Typography variant="body2">
                      Faculty of Technology<br/>
                      University of Ruhuna<br/>
                      Hapugala, Galle 80000<br/>
                      Southern Province, Sri Lanka
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <AccessTime sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">Operating Hours</Typography>
                    <Typography variant="body2">
                      <strong>Monday - Friday:</strong><br/>
                      Breakfast: 7:00 AM - 9:00 AM<br/>
                      Lunch: 12:00 PM - 2:00 PM<br/>
                      Dinner: 6:00 PM - 8:00 PM<br/>
                      Stationery: 8:00 AM - 5:00 PM<br/><br/>
                      <strong>Saturday:</strong> 8:00 AM - 6:00 PM<br/>
                      <strong>Sunday:</strong> Closed<br/>
                      <strong>Public Holidays:</strong> 9:00 AM - 2:00 PM
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Social Media */}
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">Follow Us</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Facebook />}
                    size="small"
                    sx={{ color: '#1877f2', borderColor: '#1877f2' }}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Instagram />}
                    size="small"
                    sx={{ color: '#E4405F', borderColor: '#E4405F' }}
                  >
                    Instagram
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<WhatsApp />}
                    size="small"
                    sx={{ color: '#25D366', borderColor: '#25D366' }}
                  >
                    WhatsApp
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Contact Info */}
      <Paper sx={{ p: 4, mt: 6, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🚨 Emergency Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Food Poisoning Emergency</Typography>
            <Typography variant="body2">
              Call immediately: +94 91 2245700<br/>
              Available 24/7
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Lost & Found</Typography>
            <Typography variant="body2">
              Security Office: +94 91 2245701<br/>
              Mon-Fri: 8:00 AM - 6:00 PM
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Urgent Complaints</Typography>
            <Typography variant="body2">
              WhatsApp: +94 77 1234568<br/>
              Response within 30 minutes
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* FAQ Section */}
      <Card sx={{ mt: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>🍽️ Can I cancel my order?</Typography>
              <Typography variant="body2" paragraph>
                Yes, you can cancel orders up to 15 minutes before pickup time through the app or by calling us.
              </Typography>
              
              <Typography variant="h6" gutterBottom>💳 What payment methods do you accept?</Typography>
              <Typography variant="body2" paragraph>
                We accept cash, digital payments, university meal cards, and online banking transfers.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>🕒 Can I order outside operating hours?</Typography>
              <Typography variant="body2" paragraph>
                You can place advance orders through the app 24/7, but pickup is only during operating hours.
              </Typography>
              
              <Typography variant="h6" gutterBottom>🌶️ Do you cater to dietary restrictions?</Typography>
              <Typography variant="body2" paragraph>
                Yes! We offer vegetarian, vegan, and halal options. Please mention your requirements when ordering.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </Container>
    </ContactBackground>
  );
};

export default EnhancedContact;