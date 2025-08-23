import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Chip, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { canteenAPI } from '../services/api';
import { QueueBackground } from '../components/BackgroundStyles';
import './QueueStatus.css';

const QueueStatus = () => {
  const [canteens, setCanteens] = useState([]);
  const [queueData, setQueueData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const canteensResponse = await canteenAPI.getAll();
      const canteensData = canteensResponse.data.canteens;
      setCanteens(canteensData);

      const queuePromises = canteensData.map(canteen => 
        canteenAPI.getQueueStatus(canteen.id)
      );
      
      const queueResponses = await Promise.all(queuePromises);
      const queueMap = {};
      
      queueResponses.forEach((response, index) => {
        queueMap[canteensData[index].id] = response.data;
      });
      
      setQueueData(queueMap);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching queue data:', error);
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

  const getQueueProgress = (queueLength) => {
    const maxQueue = 50; // Assume max queue of 50 people
    return Math.min((queueLength / maxQueue) * 100, 100);
  };

  const getBestCanteen = () => {
    if (Object.keys(queueData).length === 0) return null;
    
    return Object.entries(queueData).reduce((best, [canteenId, data]) => {
      if (!best || data.estimated_wait_time < best.estimated_wait_time) {
        const canteen = canteens.find(c => c.id == canteenId);
        return { ...data, canteen };
      }
      return best;
    }, null);
  };

  const bestCanteen = getBestCanteen();

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading queue status...</Typography>
      </Container>
    );
  }

  return (
    <QueueBackground>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: { xs: '3rem', md: '5rem' },
            mb: 3,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(45deg, #29bf12, #abff4f, #29bf12)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '4px 4px 8px rgba(41,191,18,0.4)',
            filter: 'drop-shadow(2px 2px 4px rgba(41,191,18,0.3))',
            animation: 'pulse 2s ease-in-out infinite alternate'
          }}
        >
          🔴 Live Queue Status - University of Ruhuna
        </Typography>
        
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            color: '#454955',
            mb: 4,
            fontSize: { xs: '1.2rem', md: '1.8rem' },
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 600,
            textShadow: '1px 1px 2px rgba(69,73,85,0.1)'
          }}
        >
          Check live queue lengths and waiting times to plan your visit perfectly
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
            sx={{
              bgcolor: '#29bf12',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { bgcolor: '#abff4f', color: '#454955' }
            }}
          >
            Refresh Data
          </Button>
        </Box>

        <Box sx={{ 
          textAlign: 'center',
          mb: 6,
          p: 4,
          background: 'linear-gradient(135deg, #29bf12, #abff4f)',
          borderRadius: 6,
          border: '3px solid #29bf12',
          maxWidth: '700px',
          mx: 'auto',
          boxShadow: '0 8px 24px rgba(41,191,18,0.3)',
          animation: 'glow 3s ease-in-out infinite alternate'
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#ffffff',
              fontSize: { xs: '1.5rem', md: '2.2rem' },
              fontWeight: 800,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '0.02em'
            }}
          >
            🔴 Live Updates • Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        </Box>

        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '4rem' },
            color: '#29bf12',
            mb: 4,
            letterSpacing: '-0.03em',
            textShadow: '3px 3px 6px rgba(41,191,18,0.3)',
            background: 'linear-gradient(135deg, #29bf12, #abff4f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 4px rgba(41,191,18,0.2))'
          }}
        >
          📊 Today's Live Statistics
        </Typography>

        {bestCanteen && (
          <Card sx={{ 
            mb: 6, 
            background: 'linear-gradient(135deg, #29bf12, #abff4f)',
            color: '#ffffff',
            border: '3px solid #29bf12',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(41,191,18,0.3)'
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                🎯 Best Option Right Now
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {bestCanteen.canteen.name} - Only {bestCanteen.estimated_wait_time} min wait!
              </Typography>
            </CardContent>
          </Card>
        )}

      <Grid container spacing={3}>
        {canteens.map((canteen) => {
          const queue = queueData[canteen.id] || {};
          const queueLength = queue.queue_length || 0;
          const waitTime = queue.estimated_wait_time || 0;
          const peakStatus = queue.peak_status || 'low';

          return (
            <Grid item xs={12} md={6} key={canteen.id}>
              <Card sx={{
                border: '2px solid #abff4f',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(41,191,18,0.2)',
                  borderColor: '#29bf12'
                }
              }}>
                <CardContent>
                  <Typography 
                    variant="h3" 
                    gutterBottom 
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      color: '#29bf12',
                      textShadow: '2px 2px 4px rgba(41,191,18,0.2)',
                      background: 'linear-gradient(45deg, #29bf12, #abff4f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {canteen.name}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{
                      color: '#454955',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    📍 {canteen.location}
                  </Typography>

                  <Box sx={{ mt: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ fontWeight: 600, color: '#454955' }}
                      >
                        Queue Length
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          color: '#29bf12',
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          textShadow: '1px 1px 2px rgba(41,191,18,0.2)'
                        }}
                      >
                        {queueLength} people
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getQueueProgress(queueLength)}
                      color={queueLength > 30 ? 'error' : queueLength > 15 ? 'warning' : 'success'}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Chip
                      icon={<PeopleIcon />}
                      label={`${queueLength} in queue`}
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        py: 3,
                        px: 3,
                        bgcolor: '#ffffff',
                        border: '3px solid #29bf12',
                        color: '#29bf12',
                        boxShadow: '0 4px 12px rgba(41,191,18,0.2)'
                      }}
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`${waitTime} min wait`}
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        py: 3,
                        px: 3,
                        bgcolor: waitTime > 20 ? '#ff4444' : waitTime > 10 ? '#ffaa00' : '#29bf12',
                        color: '#ffffff',
                        border: '3px solid transparent',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                    />
                    <Chip
                      label={`${peakStatus.toUpperCase()} traffic`}
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        py: 3,
                        px: 3,
                        bgcolor: peakStatus === 'low' ? '#29bf12' : peakStatus === 'medium' ? '#ffaa00' : '#ff4444',
                        color: '#ffffff',
                        border: '3px solid transparent',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      href={`/menu/${canteen.id}`}
                      disabled={waitTime > 30}
                    >
                      {waitTime > 30 ? 'Too Busy' : 'Order Now'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                    >
                      Set Alert
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            color: '#29bf12',
            mb: 6,
            mt: 8,
            letterSpacing: '-0.03em',
            textShadow: '3px 3px 6px rgba(41,191,18,0.3)',
            background: 'linear-gradient(135deg, #29bf12, #abff4f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 4px rgba(41,191,18,0.2))'
          }}
        >
          📊 Smart Timing Guide
        </Typography>

        <Grid container spacing={6} justifyContent="center" sx={{ mb: 10 }}>
          {[
            { meal: 'Breakfast', time: '7-9 AM', peak: '8:00 AM', color: '#29bf12' },
            { meal: 'Lunch', time: '12-2 PM', peak: '12:30-1:00 PM', color: '#ffaa00' },
            { meal: 'Dinner', time: '6-8 PM', peak: '7:00 PM', color: '#ff4444' }
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{
                p: 6,
                textAlign: 'center',
                border: `4px solid ${item.color}`,
                borderRadius: 6,
                bgcolor: '#ffffff',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: `0 8px 24px ${item.color}30`,
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: `0 16px 40px ${item.color}50`
                }
              }}>
                <Typography 
                  variant="h2" 
                  gutterBottom 
                  sx={{
                    fontWeight: 800,
                    color: item.color,
                    fontSize: { xs: '2rem', md: '3rem' },
                    textShadow: `2px 2px 4px ${item.color}40`,
                    mb: 3
                  }}
                >
                  {item.meal}
                </Typography>
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{
                    fontWeight: 700,
                    color: '#454955',
                    fontSize: { xs: '1.5rem', md: '2.2rem' },
                    mb: 3,
                    background: `linear-gradient(45deg, ${item.color}, #454955)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  ({item.time})
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{
                    color: '#6b7280',
                    fontSize: { xs: '1.2rem', md: '1.8rem' },
                    fontWeight: 600,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Peak: {item.peak}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            color: '#454955',
            mb: 6,
            letterSpacing: '-0.03em',
            textShadow: '3px 3px 6px rgba(69,73,85,0.3)',
            background: 'linear-gradient(135deg, #454955, #6b7280)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 4px rgba(69,73,85,0.2))'
          }}
        >
          💡 Pro Tips for University of Ruhuna Students
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {[
            { tip: 'Order 15 minutes before peak hours to avoid long waits', icon: '⏰' },
            { tip: 'Use the pre-order system to skip queues completely', icon: '📱' },
            { tip: 'Check live queue status before leaving your class', icon: '📊' },
            { tip: 'Combine meal and stationery orders for convenience', icon: '🍽️' }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{
                p: 6,
                border: '3px solid #29bf12',
                borderRadius: 6,
                bgcolor: '#ffffff',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(41,191,18,0.2)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 16px 40px rgba(41,191,18,0.3)',
                  borderColor: '#abff4f',
                  bgcolor: '#f8fafc'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '3rem', md: '4rem' }, 
                      minWidth: '80px',
                      filter: 'drop-shadow(2px 2px 4px rgba(41,191,18,0.2))'
                    }}
                  >
                    {item.icon}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{
                      color: '#454955',
                      fontSize: { xs: '1.3rem', md: '1.8rem' },
                      fontWeight: 700,
                      lineHeight: 1.4,
                      textShadow: '1px 1px 2px rgba(69,73,85,0.1)'
                    }}
                  >
                    {item.tip}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </QueueBackground>
  );
};

export default QueueStatus;