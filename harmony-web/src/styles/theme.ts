import { createTheme, alpha } from '@mui/material/styles';

// Harmony Design System - Professionell & Modern für alle Komponenten
export const harmonyTheme = createTheme({
  palette: {
    primary: {
      main: '#E53E3E',        // Modernes Rot
      light: '#F56565',       // Heller Rot
      dark: '#C53030',        // Dunkler Rot
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4A5568',        // Warmes Grau
      light: '#718096',       // Heller Grau
      dark: '#2D3748',        // Dunkles Grau
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#FFD700',        // Gold für Premium
      light: '#FFE55C',       // Heller Gold
      dark: '#B8860B',        // Dunkles Gold
      contrastText: '#000000',
    },
    success: {
      main: '#48BB78',        // Modernes Grün
      light: '#68D391',
      dark: '#38A169',
    },
    error: {
      main: '#F56565',        // Modernes Rot
      light: '#FC8181',
      dark: '#E53E3E',
    },
    warning: {
      main: '#ED8936',        // Modernes Orange
      light: '#F6AD55',
      dark: '#DD6B20',
    },
    info: {
      main: '#4299E1',        // Modernes Blau
      light: '#63B3ED',
      dark: '#3182CE',
    },
    background: {
      default: '#F7FAFC',     // Sehr helles Grau
      paper: '#FFFFFF',       // Weiß für Karten
    },
    text: {
      primary: '#2D3748',     // Dunkelgrau
      secondary: '#718096',   // Mittleres Grau
    },
    grey: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
  },
  
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
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
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
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
    },
  },
  
  shape: {
    borderRadius: 12,        // Moderne, abgerundete Ecken
  },
  
  spacing: 8,                // 8px Basis-Spacing
  
  shadows: [
    'none',
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
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C80026',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C80026',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          '& .MuiBottomNavigationAction-root': {
            '&.Mui-selected': {
              color: '#C80026',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2D3748',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// CSS Keyframes für Animationen
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

// Dark Mode Theme - Vollständig implementiert
export const harmonyDarkTheme = createTheme({
  ...harmonyTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',        // Warmes Rot für Dark Mode
      light: '#FF8E8E',       // Heller Rot
      dark: '#E53E3E',        // Dunkler Rot
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A0AEC0',        // Helles Grau für Dark Mode
      light: '#CBD5E0',       // Heller Grau
      dark: '#718096',        // Dunkles Grau
      contrastText: '#000000',
    },
    accent: {
      main: '#FFD700',        // Gold bleibt gleich
      light: '#FFE55C',
      dark: '#B8860B',
      contrastText: '#000000',
    },
    background: {
      default: '#1A1A1A',     // Dunkler Hintergrund
      paper: '#2D3748',        // Karten-Hintergrund
    },
    text: {
      primary: '#FFFFFF',     // Weißer Text
      secondary: '#A0AEC0',   // Grauer Text
    },
    success: {
      main: '#68D391',
      light: '#9AE6B4',
      dark: '#48BB78',
    },
    error: {
      main: '#FC8181',
      light: '#FEB2B2',
      dark: '#F56565',
    },
    warning: {
      main: '#F6AD55',
      light: '#FBD38D',
      dark: '#ED8936',
    },
    info: {
      main: '#63B3ED',
      light: '#90CDF4',
      dark: '#4299E1',
    },
  },
  components: {
    ...harmonyTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D3748',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: '#4A5568',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: '0 10px 25px rgba(255, 107, 107, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #FF6B6B 0%, #E53E3E 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E53E3E 0%, #FF6B6B 100%)',
          },
        },
      },
    },
  },
});

// Responsive Breakpoints
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
};

// Touch-Target Mindestgrößen (für Barrierefreiheit)
export const touchTargets = {
  minimum: '48px',
  comfortable: '56px',
  large: '64px',
};

// Deutsche Schriften (für bessere Lesbarkeit)
export const fonts = {
  primary: '"Inter", "Helvetica Neue", Arial, sans-serif',
  secondary: '"Roboto", "Helvetica Neue", Arial, sans-serif',
  mono: '"Fira Code", "Courier New", monospace',
};

// Schatten für Karten und Buttons
export const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 8px rgba(0, 0, 0, 0.12)',
  large: '0 8px 16px rgba(0, 0, 0, 0.15)',
  card: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

// Border Radius für moderne Optik
export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px',
  round: '50%',
};

// Animationen für bessere UX
export const animations = {
  fast: '0.15s ease-in-out',
  normal: '0.3s ease-in-out',
  slow: '0.5s ease-in-out',
  bounce: '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Z-Index Schichten
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};
