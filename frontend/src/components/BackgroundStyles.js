import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// University themed background patterns
export const UniversityBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.85), rgba(248,250,252,0.85)), url(/images/6.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative'
}));

export const CanteenBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(248,250,252,0.5)), url(/images/3.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative'
}));

export const QueueBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(248,250,252,0.5)), url(/images/8.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative'
}));

export const ContactBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(248,250,252,0.5)), url(/images/4.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative'
}));

export const ReviewBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(248,250,252,0.5)), url(/images/5.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  position: 'relative'
}));