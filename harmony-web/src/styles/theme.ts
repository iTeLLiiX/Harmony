import { Theme } from '@/types';

// Deutsche Farben - warm und vertrauensvoll
export const harmonyTheme: Theme = {
  colors: {
    // Hauptfarben
    primary: '#4A90E2',      // Warmes Blau
    secondary: '#7ED321',    // Vertrauensvolles Grün
    success: '#7ED321',      // Grün für Likes
    error: '#E74C3C',        // Rot für Dislikes
    warning: '#F39C12',      // Orange für Warnungen
    
    // Hintergrundfarben
    background: '#F8F9FA',   // Heller Hintergrund
    surface: '#FFFFFF',      // Weiß für Karten
    
    // Textfarben
    text: '#2C3E50',         // Dunkelgrau für Text
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
    },
  },
};

// Dark Mode Theme
export const harmonyDarkTheme: Theme = {
  ...harmonyTheme,
  colors: {
    ...harmonyTheme.colors,
    background: '#1A1A1A',
    surface: '#2C2C2C',
    text: '#FFFFFF',
  },
};

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
