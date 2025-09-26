import React from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Box, Button, Card, Typography } from '@mui/material';

// Advanced Animation Variants
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

export const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

// Premium Button with Advanced Animations
export const PremiumButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}> = ({ children, onClick, variant = 'contained', size = 'medium', disabled = false, loading = false }) => {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({
      scale: 1.05,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      scale: 1,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    });
  };

  const handleClick = () => {
    controls.start({
      scale: 0.95,
      transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
    });
    
    setTimeout(() => {
      controls.start({
        scale: 1.05,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      });
    }, 100);

    if (onClick) onClick();
  };

  return (
    <motion.div
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ display: 'inline-block' }}
    >
      <Button
        variant={variant}
        size={size}
        disabled={disabled || loading}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          px: 4,
          py: 2,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          background: variant === 'contained' 
            ? 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)'
            : 'transparent',
          border: variant === 'outlined' ? '2px solid #C80026' : 'none',
          color: variant === 'contained' ? 'white' : '#C80026',
          '&:hover': {
            background: variant === 'contained'
              ? 'linear-gradient(135deg, #8B0000 0%, #C80026 100%)'
              : 'rgba(200, 0, 38, 0.04)',
            boxShadow: '0 10px 25px rgba(200, 0, 38, 0.3)',
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? 'Lädt...' : children}
        </motion.div>
        
        {/* Shimmer Effect */}
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
      </Button>
    </motion.div>
  );
};

// Premium Card with Hover Effects
export const PremiumCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  gradient?: boolean;
}> = ({ children, onClick, hoverable = true, gradient = false }) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -8, scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          background: gradient 
            ? 'linear-gradient(135deg, rgba(200, 0, 38, 0.05) 0%, rgba(139, 0, 0, 0.05) 100%)'
            : 'white',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': hoverable ? {
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          } : {},
        }}
      >
        {children}
        
        {/* Animated Border */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #C80026, #8B0000, #C80026)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 2,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </Card>
    </motion.div>
  );
};

// Floating Action Button
export const FloatingActionButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  size?: number;
}> = ({ children, onClick, color = '#C80026', size = 56 }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        y: [0, -10, 0],
        transition: { 
          duration: 2, 
          ease: 'easeInOut', 
          repeat: Infinity 
        }
      }}
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '3px solid white',
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

// Loading Spinner with Advanced Animation
export const PremiumLoader: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 40, color = '#C80026' }) => {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
    >
      <motion.div
        style={{
          width: size * 0.8,
          height: size * 0.8,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
      />
    </motion.div>
  );
};

// Parallax Scrolling Component
export const ParallaxSection: React.FC<{
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
}> = ({ children, speed = 0.5, direction = 'up' }) => {
  return (
    <motion.div
      style={{
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: direction === 'up' ? 100 : -100 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Morphing Icon Component
export const MorphingIcon: React.FC<{
  icon: React.ReactNode;
  morphIcon: React.ReactNode;
  isActive?: boolean;
  size?: number;
}> = ({ icon, morphIcon, isActive = false, size = 24 }) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.2 : 1,
        rotate: isActive ? 180 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            key="morph"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: size }}
          >
            {morphIcon}
          </motion.div>
        ) : (
          <motion.div
            key="normal"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: size }}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default {
  PremiumButton,
  PremiumCard,
  FloatingActionButton,
  PremiumLoader,
  ParallaxSection,
  MorphingIcon,
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInFromRight,
  slideInFromLeft,
};
