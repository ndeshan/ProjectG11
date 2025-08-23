import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, TextField, Button, Box, Rating, Switch, FormControlLabel, Grid, Avatar, Chip } from '@mui/material';
import { Person, AccountCircle } from '@mui/icons-material';
import { ReviewBackground } from '../components/BackgroundStyles';

const Reviews = () => {
  const [review, setReview] = useState({ rating: 0, comment: '', anonymous: false, category: 'food' });
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, comment: 'Rice & Curry was excellent! Authentic taste.', anonymous: false, name: 'Kasun P.', date: '2024-01-15', category: 'food' },
    { id: 2, rating: 4, comment: 'Good service but queue was long', anonymous: true, name: 'Anonymous', date: '2024-01-14', category: 'service' },
    { id: 3, rating: 5, comment: 'Kottu Rotti is the best on campus!', anonymous: false, name: 'Nimali S.', date: '2024-01-13', category: 'food' },
    { id: 4, rating: 3, comment: 'Stationery prices are reasonable', anonymous: true, name: 'Anonymous', date: '2024-01-12', category: 'supplies' },
    { id: 5, rating: 4, comment: 'Clean environment and friendly staff', anonymous: false, name: 'Tharindu M.', date: '2024-01-11', category: 'service' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      ...review,
      name: review.anonymous ? 'Anonymous' : 'Current User',
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
    setReview({ rating: 0, comment: '', anonymous: false, category: 'food' });
    alert('Review submitted successfully!');
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'food': return 'primary';
      case 'service': return 'secondary';
      case 'supplies': return 'success';
      default: return 'default';
    }
  };

  return (
    <ReviewBackground>
      <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Student Reviews & Feedback
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Share your experience with University of Ruhuna Canteen
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>Submit Your Review</Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography component="legend">Overall Rating</Typography>
                  <Rating
                    value={review.rating}
                    onChange={(e, newValue) => setReview({...review, rating: newValue})}
                    size="large"
                  />
                </Box>

                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={review.category}
                  onChange={(e) => setReview({...review, category: e.target.value})}
                  SelectProps={{ native: true }}
                  sx={{ mb: 2 }}
                >
                  <option value="food">Food Quality</option>
                  <option value="service">Service</option>
                  <option value="supplies">School Supplies</option>
                  <option value="general">General</option>
                </TextField>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Review"
                  placeholder="Share your experience about food quality, service, prices, etc..."
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                  required
                  sx={{ mb: 2 }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={review.anonymous}
                      onChange={(e) => setReview({...review, anonymous: e.target.checked})}
                    />
                  }
                  label="Submit anonymously"
                  sx={{ mb: 2 }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={review.rating === 0 || !review.comment}
                >
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Recent Reviews</Typography>
          <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
            {reviews.map((rev) => (
              <Card key={rev.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: rev.anonymous ? 'grey.500' : 'primary.main' }}>
                      {rev.anonymous ? <AccountCircle /> : <Person />}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{rev.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{rev.date}</Typography>
                    </Box>
                    <Chip label={rev.category} color={getCategoryColor(rev.category)} size="small" />
                  </Box>
                  
                  <Rating value={rev.rating} readOnly size="small" sx={{ mb: 1 }} />
                  <Typography variant="body2">{rev.comment}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
      </Container>
    </ReviewBackground>
  );
};

export default Reviews;