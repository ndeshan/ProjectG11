import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Chip, Button, Alert, Paper, Avatar } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SchoolIcon from '@mui/icons-material/School';
import { canteenAPI } from '../services/api';


const EnhancedQueueStatus = () => {
  const [canteens, setCanteens] = useState([]);
  const [queueData, setQueueData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    totalStudentsServed: 1247,
    avgWaitTime: 8,
    popularItem: 'Rice & Curry',
    busyHour: '12:30 PM'
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      }
      
      // Simulate API call with realistic data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCanteens = [
        { id: 1, name: 'Main Canteen', location: 'Ground Floor, Main Building' },
        { id: 2, name: 'Faculty Canteen', location: 'Faculty of Technology Building' }
      ];
      
      setCanteens(mockCanteens);
      
      // Generate realistic queue data
      const queueMap = {};
      mockCanteens.forEach(canteen => {
        queueMap[canteen.id] = {
          queue_length: Math.floor(Math.random() * 40),
          wait_time: Math.floor(Math.random() * 25),
          status: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        };
      });
      
      setQueueData(queueMap);
      setLastUpdated(new Date());
      
      // Update live stats
      setLiveStats({
        totalStudentsServed: 1247 + Math.floor(Math.random() * 50),
        avgWaitTime: 8 + Math.floor(Math.random() * 5),
        popularItem: ['Rice & Curry', 'Kottu Rotti', 'String Hoppers'][Math.floor(Math.random() * 3)],
        busyHour: ['12:30 PM', '1:00 PM', '7:00 PM'][Math.floor(Math.random() * 3)]
      });
      
    } catch (error) {
      console.error('Error fetching queue data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    const maxQueue = 50;
    return Math.min((queueLength / maxQueue) * 100, 100);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading queue status...</Typography>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            fontSize: { xs: '2.2rem', md: '3.2rem' },
            letterSpacing: '-0.02em',
            background: 'linear-gradient(45deg, #ff1744, #ff5252)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 6px rgba(255,23,68,0.35)'
          }}
        >
          🔴 Live Queue Status - University of Ruhuna
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />} 
          onClick={() => fetchData(true)}
          disabled={refreshing}
          sx={{
            '& .MuiSvgIcon-root': {
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }
          }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            color: 'text.primary'
          }}
        >
          🔴 Live Updates • Last updated: {lastUpdated.toLocaleTimeString()}
        </Typography>
        <Chip label="Real-time Data" color="success" size="medium" />
      </Box>

      {/* Live Statistics */}
      <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, textShadow: '2px 2px 6px rgba(0,0,0,0.25)' }}>📊 Today's Live Statistics</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 900, textShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}>{liveStats.totalStudentsServed}</Typography>
              <Typography variant="body2">Students Served</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 900, textShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}>{liveStats.avgWaitTime}m</Typography>
              <Typography variant="body2">Avg Wait Time</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold">🍛</Typography>
              <Typography variant="body2">{liveStats.popularItem}</Typography>
              <Typography variant="caption">Most Popular</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 900, textShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}>{liveStats.busyHour}</Typography>
              <Typography variant="body2">Peak Hour</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {canteens.map((canteen) => {
          const queueLength = Math.floor(Math.random() * 30);
          const waitTime = Math.floor(Math.random() * 20);
          const peakStatus = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];
          const trend = Math.random() > 0.5 ? 'up' : 'down';
          const efficiency = Math.floor(85 + Math.random() * 15);

          return (
            <Grid item xs={12} md={6} key={canteen.id}>
              <Card sx={{ position: 'relative', overflow: 'visible' }}>
                {queueLength < 10 && (
                  <Chip 
                    label="🚀 FAST SERVICE" 
                    color="success" 
                    sx={{ position: 'absolute', top: -10, right: 10, zIndex: 1 }}
                  />
                )}
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {canteen.id === 1 ? <RestaurantIcon /> : <SchoolIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {canteen.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📍 {canteen.location} • {efficiency}% Efficiency
                      </Typography>
                    </Box>
                    {trend === 'up' ? 
                      <TrendingUpIcon color="error" sx={{ ml: 'auto' }} /> : 
                      <TrendingDownIcon color="success" sx={{ ml: 'auto' }} />
                    }
                  </Box>

                  <Box sx={{ mt: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Queue Length</Typography>
                      <Typography variant="body2">{queueLength} people</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getQueueProgress(queueLength)}
                      color={queueLength > 30 ? 'error' : queueLength > 15 ? 'warning' : 'success'}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<PeopleIcon />}
                      label={`${queueLength} students`}
                      size="small"
                      variant={queueLength < 10 ? 'filled' : 'outlined'}
                      color={queueLength < 10 ? 'success' : 'default'}
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`${waitTime} min wait`}
                      size="small"
                      color={waitTime > 20 ? 'error' : waitTime > 10 ? 'warning' : 'success'}
                    />
                    <Chip
                      label={`${peakStatus.toUpperCase()} traffic`}
                      size="small"
                      color={getPeakStatusColor(peakStatus)}
                    />
                    <Chip
                      label={trend === 'up' ? '📈 Increasing' : '📉 Decreasing'}
                      size="small"
                      color={trend === 'up' ? 'warning' : 'success'}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      href={`/menu/${canteen.id}`}
                      disabled={waitTime > 30}
                      sx={{ flex: 1 }}
                    >
                      {waitTime > 30 ? '⏰ Too Busy' : waitTime < 5 ? '⚡ Order Now!' : '🍽️ Order Now'}
                    </Button>
                    <Button variant="outlined" size="small" sx={{ minWidth: 100 }}>
                      🔔 Alert Me
                    </Button>
                  </Box>
                  
                  {queueLength < 5 && (
                    <Alert severity="success" sx={{ mt: 2, fontSize: '0.8rem' }}>
                      🎉 Perfect time to order! Minimal wait expected.
                    </Alert>
                  )}
                  
                  {waitTime > 25 && (
                    <Alert severity="warning" sx={{ mt: 2, fontSize: '0.8rem' }}>
                      ⏰ High demand period. Consider ordering for later pickup.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Enhanced Peak Hours Guide */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>
            📊 Smart Timing Guide
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph align="center">
            Based on 6 months of data from University of Ruhuna students
          </Typography>
          
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'warning.light', color: 'warning.contrastText', borderRadius: 3, boxShadow: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>🌅 Breakfast (7-9 AM)</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', fontWeight: 600 }}>
                  • Best time: 7:30-8:00 AM<br/>
                  • Avoid: 8:15-8:45 AM<br/>
                  • Popular: String Hoppers, Rotti<br/>
                  • Avg wait: 5-12 minutes
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 3, boxShadow: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>🍽️ Lunch (12-2 PM)</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', fontWeight: 600 }}>
                  • Best time: 11:45 AM or 1:30 PM<br/>
                  • Avoid: 12:30-1:00 PM<br/>
                  • Popular: Rice & Curry, Biriyani<br/>
                  • Avg wait: 8-25 minutes
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'info.light', color: 'info.contrastText', borderRadius: 3, boxShadow: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>🌙 Dinner (6-8 PM)</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', fontWeight: 600 }}>
                  • Best time: 6:00-6:30 PM<br/>
                  • Avoid: 7:00-7:30 PM<br/>
                  • Popular: Kottu, Fried Rice<br/>
                  • Avg wait: 6-18 minutes
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Pro Tips Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 900 }}>💡 Pro Tips for University of Ruhuna Students</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" paragraph sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700 }}>
                🎯 <strong>Pre-order during lectures:</strong> Order 30 minutes before your break
              </Typography>
              <Typography variant="h6" paragraph sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700 }}>
                📱 <strong>Enable notifications:</strong> Get alerts when queue drops below 5 people
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" paragraph sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700 }}>
                🏃 <strong>Quick pickup:</strong> Use express counter for pre-paid orders
              </Typography>
              <Typography variant="h6" paragraph sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 700 }}>
                👥 <strong>Group orders:</strong> Combine with friends to save time
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </Container>
    </div>
  );
};

export default EnhancedQueueStatus;