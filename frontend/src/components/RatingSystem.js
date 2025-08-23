import React, { useState } from 'react';
import { Box, Rating, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const RatingSystem = ({ itemId, itemName, currentRating, onRatingSubmit }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    onRatingSubmit(itemId, rating, review);
    setOpen(false);
    setRating(0);
    setReview('');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Rating value={currentRating} readOnly size="small" />
        <Typography variant="body2">{currentRating}</Typography>
        <Button size="small" onClick={() => setOpen(true)}>
          Rate
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Rate {itemName}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Your Rating</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Write a review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us how was the taste? Quality? Service?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={rating === 0}>
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RatingSystem;