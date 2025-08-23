import React from 'react';
import { Box, Typography } from '@mui/material';

const CampusLogo = ({ size = 'medium' }) => {
  const sizes = {
    small: { width: 40, fontSize: '0.8rem' },
    medium: { width: 60, fontSize: '1rem' },
    large: { width: 80, fontSize: '1.2rem' }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: sizes[size].width,
          height: sizes[size].width,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: sizes[size].fontSize,
          boxShadow: 2
        }}
      >
        🏛️
        <br />
        UOR
      </Box>
      {size !== 'small' && (
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            University of Ruhuna
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Faculty of Technology
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CampusLogo;