import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { canteenAPI } from '../services/api';
import { Scale, StaggerContainer } from '../components/animations';

const Home = () => {
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCanteens();
  }, []);

  const fetchCanteens = async () => {
    try {
      const response = await canteenAPI.getAll();
      setCanteens(response.data.canteens);
    } catch (error) {
      console.error('Error fetching canteens:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPeakStatusColor = (status) => {
    switch (status) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading canteens...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        🍽️ Campus Canteen System
      </Typography>
      
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Authentic Sri Lankan Foods & School Supplies - Skip the queues, order ahead!
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" paragraph>
        🍛 Rice & Curry • 🥘 Rotti & Dhal • 🍜 Kottu • 📚 School Items
      </Typography>

      <StaggerContainer>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {canteens.map((canteen) => (
            <Grid item xs={12} md={6} key={canteen.id}>
              <Scale>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {canteen.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  📍 {canteen.location}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<PeopleIcon />}
                    label={`${canteen.current_queue_count} in queue`}
                    size="small"
                  />
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`${canteen.estimated_wait_time} min wait`}
                    size="small"
                    color={getPeakStatusColor('low')}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/menu/${canteen.id}`}
                    fullWidth
                  >
                    View Menu & Order
                  </Button>
                </Box>
              </CardContent>
            </Card>
              </Scale>
            </Grid>
          ))}
        </Grid>
      </StaggerContainer>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="outlined" component={Link} to="/queue-status">
            Check Queue Status
          </Button>
          <Button variant="outlined" component={Link} to="/orders">
            My Orders
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;