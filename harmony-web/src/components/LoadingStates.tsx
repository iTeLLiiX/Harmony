import React from 'react';
import { Box, Skeleton, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';

// Skeleton Loading für Profile Cards
export const ProfileSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Skeleton variant="rectangular" height={300} />
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Box flex={1}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
          </Box>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
          <Box display="flex" gap={1} mt={2}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={70} height={24} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Skeleton Loading für Matching Grid
export const MatchingSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ProfileSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

// Skeleton Loading für Chat Messages
export const ChatSkeleton: React.FC = () => {
  return (
    <Box>
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Box
            display="flex"
            gap={2}
            mb={2}
            justifyContent={index % 2 === 0 ? 'flex-start' : 'flex-end'}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="rounded" width={200} height={40} />
              <Skeleton variant="text" width={100} height={16} />
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

// Skeleton Loading für Profile Edit
export const ProfileEditSkeleton: React.FC = () => {
  return (
    <Box>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 3 }} />
      
      {/* Basic Info Skeleton */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Skeleton variant="text" width="20%" height={24} sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={80} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Photos Skeleton */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Skeleton variant="text" width="15%" height={24} sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Skeleton variant="rectangular" height={100} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Interests Skeleton */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Skeleton variant="text" width="25%" height={24} sx={{ mb: 2 }} />
          <Box display="flex" flexWrap="wrap" gap={1}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" width={80} height={32} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

// Pulse Loading Animation
export const PulseLoader: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity
      }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#E53E3E',
        margin: '0 auto'
      }}
    />
  );
};

// Shimmer Loading Effect
export const ShimmerLoader: React.FC<{ width?: string; height?: string }> = ({ 
  width = '100%', 
  height = '20px' 
}) => {
  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% 0%', '200% 0%']
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        repeat: Infinity
      }}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        borderRadius: '4px'
      }}
    />
  );
};

// Loading States für verschiedene Komponenten
export const LoadingStates = {
  Profile: ProfileSkeleton,
  Matching: MatchingSkeleton,
  Chat: ChatSkeleton,
  ProfileEdit: ProfileEditSkeleton,
  Pulse: PulseLoader,
  Shimmer: ShimmerLoader
};

export default LoadingStates;
