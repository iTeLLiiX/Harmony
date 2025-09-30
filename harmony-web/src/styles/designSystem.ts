// Harmony Design System - Einheitliche Design-Tokens
export const designTokens = {
  // Farben
  colors: {
    primary: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#C80026',    // Hauptfarbe
      600: '#B91C1C',
      700: '#991B1B',
      800: '#7F1D1D',
      900: '#5F1A1A',
    },
    secondary: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#2D3A42',    // Hauptfarbe
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    success: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#38A169',
      600: '#2F855A',
      700: '#276749',
      800: '#22543D',
      900: '#1C4532',
    },
    error: {
      50: '#FED7D7',
      100: '#FED7D7',
      200: '#FEB2B2',
      300: '#FC8181',
      400: '#F56565',
      500: '#E53E3E',
      600: '#C53030',
      700: '#9B2C2C',
      800: '#822727',
      900: '#742A2A',
    },
    warning: {
      50: '#FFFAF0',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#DD6B20',
      600: '#C05621',
      700: '#9C4221',
      800: '#7B341E',
      900: '#652B19',
    },
    info: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B77CB',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
    neutral: {
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

  // Typografie
  typography: {
    fontFamily: {
      primary: '"Inter", "Helvetica Neue", Arial, sans-serif',
      secondary: '"Roboto", "Helvetica Neue", Arial, sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },

  // Schatten
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    none: 'none',
  },

  // Animationen
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
    bounce: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Z-Index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1020,
    banner: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    skipLink: 1070,
    toast: 1080,
    tooltip: 1090,
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
};

// Komponenten-spezifische Styles
export const componentStyles = {
  // Button Styles
  button: {
    base: {
      borderRadius: designTokens.borderRadius.md,
      fontWeight: designTokens.typography.fontWeight.semibold,
      fontSize: designTokens.typography.fontSize.base,
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
      transition: designTokens.transitions.fast,
      '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: designTokens.shadows.md,
      },
    },
    sizes: {
      sm: {
        padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
        fontSize: designTokens.typography.fontSize.sm,
      },
      md: {
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
        fontSize: designTokens.typography.fontSize.base,
      },
      lg: {
        padding: `${designTokens.spacing[4]} ${designTokens.spacing[8]}`,
        fontSize: designTokens.typography.fontSize.lg,
      },
    },
  },

  // Card Styles
  card: {
    base: {
      borderRadius: designTokens.borderRadius.lg,
      boxShadow: designTokens.shadows.md,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      transition: designTokens.transitions.normal,
      '&:hover': {
        boxShadow: designTokens.shadows.lg,
        transform: 'translateY(-2px)',
      },
    },
  },

  // Input Styles
  input: {
    base: {
      borderRadius: designTokens.borderRadius.md,
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.base,
      transition: designTokens.transitions.fast,
      '&:focus': {
        borderColor: designTokens.colors.primary[500],
        boxShadow: `0 0 0 3px ${designTokens.colors.primary[100]}`,
      },
    },
  },

  // Navigation Styles
  navigation: {
    base: {
      backgroundColor: designTokens.colors.neutral[50],
      borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
      boxShadow: designTokens.shadows.sm,
    },
  },
};

// Utility Functions
export const getColor = (colorPath: string) => {
  const keys = colorPath.split('.');
  let value: any = designTokens.colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};

export const getSpacing = (size: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[size];
};

export const getShadow = (size: keyof typeof designTokens.shadows) => {
  return designTokens.shadows[size];
};

export const getBorderRadius = (size: keyof typeof designTokens.borderRadius) => {
  return designTokens.borderRadius[size];
};

export default designTokens;
