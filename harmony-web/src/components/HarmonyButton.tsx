import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

// Einheitliches Button-System für Harmony
export interface HarmonyButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glass';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const HarmonyButton: React.FC<HarmonyButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  fullWidth = false,
  children,
  sx,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #E53E3E 0%, #C53030 100%)',
          color: 'white',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #C53030 0%, #E53E3E 100%)',
            boxShadow: '0 10px 25px rgba(229, 62, 62, 0.4)',
          }
        };
      case 'secondary':
        return {
          background: 'transparent',
          color: '#4A5568',
          border: '2px solid #4A5568',
          '&:hover': {
            background: 'rgba(74, 85, 104, 0.04)',
            border: '2px solid #2D3748',
          }
        };
      case 'accent':
        return {
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          color: 'black',
          border: 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
            boxShadow: '0 10px 25px rgba(255, 215, 0, 0.4)',
          }
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#E53E3E',
          border: 'none',
          '&:hover': {
            background: 'rgba(229, 62, 62, 0.04)',
          }
        };
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          fontSize: '0.875rem',
          minHeight: '36px'
        };
      case 'medium':
        return {
          padding: '12px 24px',
          fontSize: '1rem',
          minHeight: '44px'
        };
      case 'large':
        return {
          padding: '16px 32px',
          fontSize: '1.125rem',
          minHeight: '52px'
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Button
        {...props}
        disabled={props.disabled || loading}
        startIcon={loading ? undefined : icon}
        sx={{
          ...getVariantStyles(),
          ...getSizeStyles(),
          borderRadius: 3,
          fontWeight: 600,
          textTransform: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          width: fullWidth ? '100%' : 'auto',
          ...sx
        }}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
            style={{ display: 'inline-block' }}
          >
            ⏳
          </motion.div>
        ) : (
          children
        )}
        
        {/* Shimmer Effect für Primary Buttons */}
        {variant === 'primary' && !loading && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
            animate={{
              left: ['100%', '100%'],
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.2,
            }}
          />
        )}
      </Button>
    </motion.div>
  );
};

// Spezielle Button-Varianten für Dating-App
export const LikeButton: React.FC<{
  onClick: () => void;
  liked?: boolean;
  disabled?: boolean;
}> = ({ onClick, liked = false, disabled = false }) => {
  return (
    <HarmonyButton
      variant={liked ? 'accent' : 'ghost'}
      size="large"
      onClick={onClick}
      disabled={disabled}
      icon={liked ? '❤️' : '🤍'}
      sx={{
        borderRadius: '50%',
        minWidth: '56px',
        height: '56px',
        padding: 0,
        ...(liked && {
          animation: 'heartBeat 0.6s ease-in-out'
        })
      }}
    >
      {liked ? 'Liked!' : 'Like'}
    </HarmonyButton>
  );
};

export const SuperLikeButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
}> = ({ onClick, disabled = false }) => {
  return (
    <HarmonyButton
      variant="accent"
      size="large"
      onClick={onClick}
      disabled={disabled}
      icon="⭐"
      sx={{
        borderRadius: '50%',
        minWidth: '56px',
        height: '56px',
        padding: 0,
        animation: 'float 2s ease-in-out infinite'
      }}
    >
      Super Like
    </HarmonyButton>
  );
};

export const PassButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
}> = ({ onClick, disabled = false }) => {
  return (
    <HarmonyButton
      variant="secondary"
      size="large"
      onClick={onClick}
      disabled={disabled}
      icon="👎"
      sx={{
        borderRadius: '50%',
        minWidth: '56px',
        height: '56px',
        padding: 0
      }}
    >
      Pass
    </HarmonyButton>
  );
};

// Button Group für Matching Actions
export const MatchingButtonGroup: React.FC<{
  onLike: () => void;
  onSuperLike: () => void;
  onPass: () => void;
  liked?: boolean;
  disabled?: boolean;
}> = ({ onLike, onSuperLike, onPass, liked = false, disabled = false }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={3}
      sx={{ mt: 3 }}
    >
      <PassButton onClick={onPass} disabled={disabled} />
      <LikeButton onClick={onLike} liked={liked} disabled={disabled} />
      <SuperLikeButton onClick={onSuperLike} disabled={disabled} />
    </Box>
  );
};

export default HarmonyButton;
