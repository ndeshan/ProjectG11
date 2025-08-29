import React from 'react';
import { Box, Typography } from '@mui/material';

const FoodCategories = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: 'breakfast', label: 'Breakfast', emoji: '🌅', description: 'Rice & Curry, String Hoppers' },
    { value: 'lunch', label: 'Lunch', emoji: '🍛', description: 'Kottu, Fried Rice' },
    { value: 'snacks', label: 'Snacks', emoji: '🍿', description: 'Samosa, Wade' },
    { value: 'beverages', label: 'Beverages', emoji: '🥤', description: 'Tea, Coffee, Juice' },
  ];

  const getShapeStyles = (index) => {
    // All buttons are circular
    return { borderRadius: '50%' };
  };

  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: '#29bf12',
          mb: 4,
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Browse Categories
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((cat, index) => (
          <Box
            key={cat.value}
            sx={{
              p: 3,
              border: selectedCategory === cat.value ? '3px solid #29bf12' : '2px solid #abff4f',
              cursor: 'pointer',
              width: { xs: 140, md: 160 },
              height: { xs: 140, md: 160 },
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: selectedCategory === cat.value ? '#abff4f' : '#ffffff',
              transition: 'all 0.3s ease',
              ...getShapeStyles(index),
              '&:hover': { 
                bgcolor: '#abff4f',
                transform: 'scale(1.05)',
                boxShadow: '0 8px 24px rgba(41,191,18,0.2)'
              }
            }}
            onClick={() => onCategoryChange(cat.value)}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3rem' },
                mb: 1
              }}
            >
              {cat.emoji}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 700,
                color: '#454955',
                mb: 1,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              {cat.label}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{
                color: '#6b7280',
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                lineHeight: 1.2
              }}
            >
              {cat.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FoodCategories;