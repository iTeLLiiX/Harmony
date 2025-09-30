import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Close,
  Star,
  Favorite,
  Visibility,
  FilterList,
  Rocket,
  Public,
  CheckCircle,
  TrendingUp,
  People
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: (planId: string) => void;
  onSkip: () => void;
  feature: string;
  userLimits: {
    likes: { used: number; limit: number };
    superLikes: { used: number; limit: number };
  };
}

const PaywallModal: React.FC<PaywallModalProps> = ({
  open,
  onClose,
  onUpgrade,
  onSkip,
  feature,
  userLimits
}) => {
  const [selectedPlan, setSelectedPlan] = useState('premium_yearly');

  const plans = [
    {
      id: 'premium_monthly',
      name: 'Premium Monatlich',
      price: 9.99,
      currency: 'EUR',
      interval: 'Monat',
      features: [
        'Unbegrenzte Likes',
        'Sehen wer dich geliket hat',
        'Erweiterte Suchfilter',
        'Super-Likes (5 pro Tag)',
        'Profil-Boost',
        'Keine Werbung'
      ],
      popular: false
    },
    {
      id: 'premium_yearly',
      name: 'Premium Jährlich',
      price: 99.99,
      currency: 'EUR',
      interval: 'Jahr',
      originalPrice: 119.88,
      discount: 17,
      features: [
        'Unbegrenzte Likes',
        'Sehen wer dich geliket hat',
        'Erweiterte Suchfilter',
        'Super-Likes (5 pro Tag)',
        'Profil-Boost',
        'Keine Werbung',
        'Passport (andere Städte)',
        'Read-Receipts'
      ],
      popular: true
    }
  ];

  const getFeatureMessage = () => {
    switch (feature) {
      case 'unlimited_likes':
        return {
          title: 'Tageslimit erreicht! 😔',
          subtitle: `Du hast heute ${userLimits.likes.used}/${userLimits.likes.limit} Likes verwendet`,
          description: 'Mit Premium kannst du unbegrenzt liken und mehr Matches finden!'
        };
      case 'see_who_liked_you':
        return {
          title: 'Wer hat dich geliket? 👀',
          subtitle: 'Erfahre, wer Interesse an dir hat',
          description: 'Mit Premium siehst du alle, die dich geliket haben!'
        };
      case 'super_likes':
        return {
          title: 'Super-Like verwenden! ⭐',
          subtitle: 'Zeige besonderes Interesse',
          description: 'Mit Premium bekommst du 5 Super-Likes pro Tag!'
        };
      default:
        return {
          title: 'Premium-Feature 🔒',
          subtitle: 'Erweiterte Funktionen verfügbar',
          description: 'Upgrade auf Premium für mehr Features!'
        };
    }
  };

  const featureMessage = getFeatureMessage();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
          color: 'white'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            {featureMessage.title}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
          {featureMessage.subtitle}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: 'white', color: 'text.primary' }}>
        {/* Progress Bar für Likes */}
        {feature === 'unlimited_likes' && (
          <Box mb={3}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Heutige Likes: {userLimits.likes.used}/{userLimits.likes.limit}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(userLimits.likes.used / userLimits.likes.limit) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#C80026'
                }
              }}
            />
          </Box>
        )}

        {/* Feature Description */}
        <Typography variant="body1" color="text.secondary" mb={3}>
          {featureMessage.description}
        </Typography>

        {/* Social Proof */}
        <Box mb={3} p={2} bgcolor="grey.50" borderRadius={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <People sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="body2" fontWeight="bold">
              Über 12.543 Nutzer haben bereits upgegradet
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Durchschnittlich 3,2x mehr Matches mit Premium
          </Typography>
        </Box>

        {/* Premium Plans */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Wähle deinen Premium-Plan
        </Typography>

        <Grid container spacing={2} mb={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} key={plan.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: selectedPlan === plan.id ? '2px solid #C80026' : '1px solid #e0e0e0',
                  position: 'relative',
                  transform: selectedPlan === plan.id ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Chip
                    label="Beliebt"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: 16,
                      bgcolor: '#C80026',
                      color: 'white'
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {plan.name}
                  </Typography>
                  <Box display="flex" alignItems="baseline" mb={2}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {plan.price}€
                    </Typography>
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      /{plan.interval}
                    </Typography>
                    {plan.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', ml: 1, color: 'text.secondary' }}
                      >
                        {plan.originalPrice}€
                      </Typography>
                    )}
                  </Box>
                  {plan.discount && (
                    <Typography variant="body2" color="success.main" fontWeight="bold">
                      {plan.discount}% sparen!
                    </Typography>
                  )}
                  <List dense>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Benefits */}
        <Box mb={3}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Sofortige Vorteile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Favorite sx={{ mr: 1, color: '#C80026' }} />
                <Typography variant="body2" fontWeight="bold">
                  Unbegrenzte Likes
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Like so viele Profile wie du möchtest
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Visibility sx={{ mr: 1, color: '#C80026' }} />
                <Typography variant="body2" fontWeight="bold">
                  Sehen wer dich geliket hat
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Erfahre, wer Interesse an dir hat
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <FilterList sx={{ mr: 1, color: '#C80026' }} />
                <Typography variant="body2" fontWeight="bold">
                  Erweiterte Filter
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Finde genau die richtigen Matches
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Rocket sx={{ mr: 1, color: '#C80026' }} />
                <Typography variant="body2" fontWeight="bold">
                  Profil-Boost
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Erscheine zuerst in der Suche
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ bgcolor: 'white', p: 3 }}>
        <Button
          onClick={onSkip}
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Später entscheiden
        </Button>
        <Button
          onClick={() => onUpgrade(selectedPlan)}
          variant="contained"
          size="large"
          sx={{
            bgcolor: '#C80026',
            '&:hover': { bgcolor: '#8B0000' },
            px: 4
          }}
        >
          Jetzt upgraden
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaywallModal;
