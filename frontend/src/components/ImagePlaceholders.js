import { Box } from '@mui/material';

export const FoodImage = ({ category, size = 200 }) => {
  const actualSize = typeof size === 'object' ? size : { xs: size * 0.7, sm: size * 0.85, md: size };
  const getGradient = () => {
    switch (category) {
      case 'breakfast':
        return 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)';
      case 'lunch':
        return 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)';
      case 'dinner':
        return 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)';
      case 'stationery':
        return 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)';
      default:
        return 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)';
    }
  };

  const getEmoji = () => {
    switch (category) {
      case 'breakfast': return '🌅🍳';
      case 'lunch': return '🍛🍽️';
      case 'dinner': return '🌙🍜';
      case 'stationery': return '📚✏️';
      default: return '🍴🥘';
    }
  };

  return (
    <Box
      sx={{
        width: actualSize,
        height: typeof actualSize === 'object' ? 
          { xs: actualSize.xs * 0.7, sm: actualSize.sm * 0.7, md: actualSize.md * 0.7 } : 
          actualSize * 0.7,
        background: getGradient(),
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
        color: 'white',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        mb: 2
      }}
    >
      {getEmoji()}
    </Box>
  );
};

export const UniversityLogo = ({ size = 80 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      background: 'linear-gradient(135deg, #1976d2 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      color: 'white',
      fontWeight: 'bold',
      boxShadow: 3
    }}
  >
    🏛️
  </Box>
);

export const CanteenImage = ({ type, size = 300 }) => {
  const getContent = () => {
    switch (type) {
      case 'main':
        return { bg: 'linear-gradient(135deg, #ff5722 0%, #ff8a65 100%)', emoji: '🏪🍽️' };
      case 'faculty':
        return { bg: 'linear-gradient(135deg, #3f51b5 0%, #7986cb 100%)', emoji: '🎓📚' };
      default:
        return { bg: 'linear-gradient(135deg, #009688 0%, #4db6ac 100%)', emoji: '🍛🥘' };
    }
  };

  const content = getContent();

  return (
    <Box
      sx={{
        width: size,
        height: size * 0.6,
        background: content.bg,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        color: 'white',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        boxShadow: 4
      }}
    >
      {content.emoji}
    </Box>
  );
};