import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box key={index} sx={{ mb: 2 }}>
      {type === 'card' && (
        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2, mx: 'auto' }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" width="80%" height={16} sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="rectangular" width={120} height={36} sx={{ mx: 'auto', borderRadius: 2 }} />
        </Box>
      )}
      
      {type === 'list' && (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
          <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
        </Box>
      )}
      
      {type === 'text' && (
        <Box>
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={20} />
        </Box>
      )}
    </Box>
  ));

  return <>{skeletons}</>;
};

export default LoadingSkeleton;
