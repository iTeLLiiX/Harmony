import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'white' | 'primary' | 'inherit';
  showHeart?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  color = 'white', 
  showHeart = true 
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '24px', fontWeight: 400 };
      case 'large':
        return { fontSize: '48px', fontWeight: 300 };
      default:
        return { fontSize: '32px', fontWeight: 300 };
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return { color: '#4A90E2' };
      case 'white':
        return { color: 'white' };
      default:
        return { color: 'inherit' };
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: '"Dancing Script", "Brush Script MT", cursive',
        userSelect: 'none'
      }}
    >
      <Typography
        variant="h4"
        component="span"
        sx={{
          ...getSizeStyles(),
          ...getColorStyles(),
          fontFamily: 'inherit',
          letterSpacing: '0.5px',
          textShadow: color === 'white' ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        Harmony
      </Typography>
      {showHeart && (
        <Box
          sx={{
            width: size === 'small' ? '20px' : size === 'large' ? '40px' : '28px',
            height: size === 'small' ? '20px' : size === 'large' ? '40px' : '28px',
            position: 'relative',
            ...getColorStyles()
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '100%', height: '100%' }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default Logo;
