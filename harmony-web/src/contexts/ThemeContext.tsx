import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C80026',
      light: '#E53E3E',
      dark: '#8B0000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D3A42',
      light: '#4A5568',
      dark: '#1A202C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#E53E3E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4A5568',
      light: '#718096',
      dark: '#2D3748',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E293B',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

// Global Styles
const globalStyles = (theme: any) => ({
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1E293B' : '#F1F5F9',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#4A5568' : '#CBD5E0',
    borderRadius: '4px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#718096' : '#A0AEC0',
  },
});

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  theme: typeof lightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('harmony-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setMode(savedTheme as 'light' | 'dark');
    } else if (systemPrefersDark) {
      setMode('dark');
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('harmony-theme', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  const contextValue: ThemeContextType = {
    mode,
    toggleMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles(theme)} />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
