import React from 'react';
import { Box, Skeleton, Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';

// Loading skeleton for menu items
export const MenuItemSkeleton = ({ count = 8 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Card sx={{ border: '2px solid #f0f0f0', borderRadius: 4 }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 2 }} />
            </Box>
            <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="text" width={80} height={24} />
              <Skeleton variant="text" width={60} height={20} />
            </Box>
            <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 3 }} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// Loading skeleton for orders
export const OrderSkeleton = ({ count = 3 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid item xs={12} key={index}>
        <Card sx={{ border: '2px solid #f0f0f0', borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Skeleton variant="text" height={32} width="60%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2, mb: 2 }} />
                <Skeleton variant="text" height={40} width="80%" sx={{ mb: 2 }} />
                <Skeleton variant="text" height={20} width="50%" />
                <Skeleton variant="text" height={20} width="70%" />
              </Grid>
              <Grid item xs={12} md={8}>
                <Skeleton variant="text" height={24} width="40%" sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Box key={i} sx={{ textAlign: 'center' }}>
                      <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1, mx: 'auto' }} />
                      <Skeleton variant="text" width={60} height={16} />
                    </Box>
                  ))}
                </Box>
                <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 4 }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// Loading skeleton for admin dashboard
export const DashboardSkeleton = () => (
  <Box>
    <Skeleton variant="text" height={48} width={300} sx={{ mb: 4 }} />
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ p: 3, border: '2px solid #f0f0f0', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Skeleton variant="circular" width={56} height={56} />
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 2 }} />
            </Box>
            <Skeleton variant="text" height={40} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="80%" />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

// Full page loading spinner
export const PageLoader = ({ message = "Loading..." }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      gap: 2
    }}
  >
    <CircularProgress size={60} sx={{ color: '#29bf12' }} />
    <Typography variant="h6" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

// Button loading state
export const LoadingButton = ({ loading, children, ...props }) => (
  <Box sx={{ position: 'relative', display: 'inline-block' }}>
    <props.component {...props} disabled={loading || props.disabled}>
      {children}
    </props.component>
    {loading && (
      <CircularProgress
        size={24}
        sx={{
          color: '#29bf12',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    )}
  </Box>
);

// Table loading skeleton
export const TableSkeleton = ({ rows = 5, columns = 6 }) => (
  <Box>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box key={rowIndex} sx={{ display: 'flex', gap: 2, mb: 2, p: 2 }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            variant="text"
            height={20}
            sx={{ flex: 1 }}
          />
        ))}
      </Box>
    ))}
  </Box>
);

export default {
  MenuItemSkeleton,
  OrderSkeleton,
  DashboardSkeleton,
  PageLoader,
  LoadingButton,
  TableSkeleton
};