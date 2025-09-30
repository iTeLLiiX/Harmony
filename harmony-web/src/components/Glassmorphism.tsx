import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Glassmorphism Card Component
export const GlassmorphismCard: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  blur?: number;
  opacity?: number;
  className?: string;
}> = ({ children, onClick, blur = 10, opacity = 0.1, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={className}
        onClick={onClick}
        sx={{
          background: `rgba(255, 255, 255, ${opacity})`,
          backdropFilter: `blur(${blur}px)`,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: `rgba(255, 255, 255, ${opacity + 0.05})`,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
};

// Glassmorphism Button
export const GlassmorphismButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', size = 'medium', disabled = false }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'rgba(229, 62, 62, 0.1)',
          border: '1px solid rgba(229, 62, 62, 0.3)',
          color: '#E53E3E',
          '&:hover': {
            background: 'rgba(229, 62, 62, 0.2)',
            border: '1px solid rgba(229, 62, 62, 0.5)',
          }
        };
      case 'secondary':
        return {
          background: 'rgba(74, 85, 104, 0.1)',
          border: '1px solid rgba(74, 85, 104, 0.3)',
          color: '#4A5568',
          '&:hover': {
            background: 'rgba(74, 85, 104, 0.2)',
            border: '1px solid rgba(74, 85, 104, 0.5)',
          }
        };
      case 'accent':
        return {
          background: 'rgba(255, 215, 0, 0.1)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          color: '#FFD700',
          '&:hover': {
            background: 'rgba(255, 215, 0, 0.2)',
            border: '1px solid rgba(255, 215, 0, 0.5)',
          }
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '8px 16px', fontSize: '0.875rem' };
      case 'medium':
        return { padding: '12px 24px', fontSize: '1rem' };
      case 'large':
        return { padding: '16px 32px', fontSize: '1.125rem' };
      default:
        return {};
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        sx={{
          ...getVariantStyles(),
          ...getSizeStyles(),
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed'
          }
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Glassmorphism Modal
export const GlassmorphismModal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}> = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', width: '90%', margin: '20px' }}
      >
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden'
          }}
        >
          {title && (
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                {title}
              </Typography>
            </Box>
          )}
          <CardContent sx={{ p: 3 }}>
            {children}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Glassmorphism Navigation
export const GlassmorphismNavigation: React.FC<{
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}> = ({ children, position = 'top' }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: `1px solid rgba(255, 255, 255, 0.2)`,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: position === 'top' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: position === 'bottom' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 1000,
        p: 2
      }}
    >
      {children}
    </Box>
  );
};

// Glassmorphism Profile Card für Premium Features
export const GlassmorphismProfileCard: React.FC<{
  name: string;
  age: number;
  location: string;
  photo: string;
  isPremium?: boolean;
  onClick?: () => void;
}> = ({ name, age, location, photo, isPremium = false, onClick }) => {
  return (
    <GlassmorphismCard onClick={onClick}>
      <CardContent sx={{ p: 0, position: 'relative' }}>
        {/* Premium Badge */}
        {isPremium && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: 'black',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 600,
              zIndex: 1
            }}
          >
            ⭐ PREMIUM
          </Box>
        )}
        
        {/* Photo */}
        <Box
          sx={{
            height: 300,
            backgroundImage: `url(${photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px 12px 0 0'
          }}
        />
        
        {/* Info */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {name}, {age}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            📍 {location}
          </Typography>
          
          {/* Action Buttons */}
          <Box display="flex" gap={1}>
            <GlassmorphismButton variant="primary" size="small">
              ❤️ Like
            </GlassmorphismButton>
            <GlassmorphismButton variant="secondary" size="small">
              💬 Chat
            </GlassmorphismButton>
          </Box>
        </Box>
      </CardContent>
    </GlassmorphismCard>
  );
};

export default {
  GlassmorphismCard,
  GlassmorphismButton,
  GlassmorphismModal,
  GlassmorphismNavigation,
  GlassmorphismProfileCard
};
