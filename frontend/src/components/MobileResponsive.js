import { useTheme, useMediaQuery } from '@mui/material';

// Mobile breakpoints and responsive utilities
export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // > 900px
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // > 1200px
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  };
};

// Responsive spacing utility
export const getResponsiveSpacing = (mobile, tablet, desktop) => ({
  xs: mobile,
  sm: tablet || mobile,
  md: desktop || tablet || mobile
});

// Responsive font sizes
export const getResponsiveFontSize = (mobile, tablet, desktop) => ({
  fontSize: {
    xs: mobile,
    sm: tablet || mobile,
    md: desktop || tablet || mobile
  }
});

// Touch-friendly button props
export const getTouchFriendlyProps = () => ({
  sx: {
    minHeight: { xs: 48, sm: 44, md: 40 }, // Minimum 48px for touch
    minWidth: { xs: 48, sm: 44, md: 40 },
    padding: { xs: '12px 16px', sm: '10px 14px', md: '8px 12px' }
  }
});

// Mobile-optimized card props
export const getMobileCardProps = () => ({
  sx: {
    margin: { xs: 1, sm: 2, md: 3 },
    padding: { xs: 2, sm: 3, md: 4 },
    borderRadius: { xs: 2, sm: 3, md: 4 }
  }
});

// Responsive grid spacing
export const getResponsiveGridSpacing = () => ({
  spacing: { xs: 2, sm: 3, md: 4 }
});

export default {
  useResponsive,
  getResponsiveSpacing,
  getResponsiveFontSize,
  getTouchFriendlyProps,
  getMobileCardProps,
  getResponsiveGridSpacing
};