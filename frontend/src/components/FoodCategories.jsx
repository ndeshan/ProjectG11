import React from 'react';
import { Box, Typography, Tooltip, useTheme, useMediaQuery } from '@mui/material';

const FoodCategories = ({ selectedCategory, onCategoryChange }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const categories = [
    { value: 'breakfast', label: 'Breakfast', emoji: '🌅', description: 'Rice & Curry, Rotti, Hoppers' },
    { value: 'lunch', label: 'Lunch', emoji: '🍛', description: 'Rice & Curries, Kottu, Biriyani' },
    { value: 'dinner', label: 'Dinner', emoji: '🌙', description: 'Fried Rice, Noodles, Devilled' },
    { value: 'stationery', label: 'School Items', emoji: '📚', description: 'Pens, Books, Calculators' },
  ];

  const getShapeStyles = (index) => {
    const shapes = [
      { borderRadius: '50%' }, // Circle
      { borderRadius: '0' }, // Square
      { borderRadius: '20px 0 20px 0' }, // Diamond-like
      { borderRadius: '30px' } // Rounded rectangle
    ];
    return shapes[index % shapes.length];
  };

  return (
    <Box sx={{ mb: 4, textAlign: 'center', px: { xs: 2, sm: 0 } }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: '#29bf12',
          mb: 4,
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        Browse Categories
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 2, md: 3 }, 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        {categories.map((cat, index) => (
          <Tooltip 
            key={cat.value} 
            title={`Click to view ${cat.label}`} 
            arrow
            placement={isSmallScreen ? "bottom" : "top"}
          >
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                border: selectedCategory === cat.value ? '3px solid #29bf12' : '2px solid #abff4f',
                cursor: 'pointer',
                width: { xs: 140, sm: 150, md: 170 },
                height: { xs: 140, sm: 150, md: 170 },
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: selectedCategory === cat.value ? '#e8f5e6' : '#ffffff',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                ...getShapeStyles(index),
                '&:hover': { 
                  bgcolor: '#e8f5e6',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(41,191,18,0.25)'
                },
                '&::before': selectedCategory === cat.value ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  bgcolor: '#29bf12'
                } : {}
              }}
              onClick={() => onCategoryChange(cat.value)}
              role="button"
              aria-pressed={selectedCategory === cat.value}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCategoryChange(cat.value);
                }
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.25rem' },
                  mb: 1,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {cat.emoji}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{
                  fontWeight: 700,
                  color: '#2d3748',
                  mb: 1,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                {cat.label}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '0.75rem', md: '0.85rem' },
                  lineHeight: 1.2,
                  display: 'block',
                  maxWidth: '100%'
                }}
              >
                {cat.description}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default FoodCategories;