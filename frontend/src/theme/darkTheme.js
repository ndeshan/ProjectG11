import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#29bf12',
      light: '#abff4f',
      dark: '#1a7a0a',
    },
    secondary: {
      main: '#abff4f',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    error: {
      main: '#ff4444',
    },
    warning: {
      main: '#ffaa00',
    },
    success: {
      main: '#29bf12',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          border: '2px solid #29bf12',
          '&:hover': {
            backgroundColor: '#333333',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2a2a2a',
            '& fieldset': {
              borderColor: '#29bf12',
            },
            '&:hover fieldset': {
              borderColor: '#abff4f',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#29bf12',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b3b3b3',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#29bf12',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#abff4f',
            color: '#121212',
          },
        },
        outlined: {
          borderColor: '#29bf12',
          color: '#29bf12',
          '&:hover': {
            backgroundColor: '#29bf12',
            color: '#ffffff',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#29bf12',
      light: '#abff4f',
      dark: '#1a7a0a',
    },
    secondary: {
      main: '#abff4f',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#454955',
      secondary: '#6b7280',
    },
  },
});