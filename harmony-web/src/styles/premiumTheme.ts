import { createTheme, alpha } from '@mui/material/styles';

// Premium Harmony Design System - Sophisticated & Modern
export const premiumHarmonyTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C80026',        // Harmony Signature Red
      light: '#E53E3E',       // Lighter Red
      dark: '#8B0000',        // Darker Red
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D3A42',        // Sophisticated Dark Gray
      light: '#4A5568',       // Medium Gray
      dark: '#1A202C',       // Deep Gray
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',        // Modern Emerald
      light: '#34D399',
      dark: '#059669',
    },
    error: {
      main: '#EF4444',        // Modern Red
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',        // Amber
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',        // Modern Blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: '#FAFAFA',     // Soft White
      paper: '#FFFFFF',       // Pure White
    },
    text: {
      primary: '#111827',     // Rich Black
      secondary: '#6B7280',   // Medium Gray
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
  },
  
  shape: {
    borderRadius: 16,        // Premium rounded corners
  },
  
  spacing: 8,                // 8px base spacing system
  
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.05)',
    '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
    '0 25px 50px rgba(0, 0, 0, 0.25)',
  ],
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '16px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            '&:before': {
              left: '100%',
            },
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8B0000 0%, #C80026 100%)',
            boxShadow: '0 15px 35px rgba(200, 0, 38, 0.4)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha('#C80026', 0.04),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #C80026, #8B0000, #C80026)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          },
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C80026',
              borderWidth: 2,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C80026',
              borderWidth: 2,
              boxShadow: '0 0 0 4px rgba(200, 0, 38, 0.1)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          border: '3px solid #FFFFFF',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(20px)',
          '& .MuiBottomNavigationAction-root': {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-selected': {
              color: '#C80026',
              transform: 'scale(1.1)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          color: '#111827',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Keyframes for animations
const keyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject keyframes into document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
}

export default premiumHarmonyTheme;
