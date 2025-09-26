import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Star,
  Favorite,
  Visibility,
  FilterList,
  Speed,
  Security,
  Help,
  CheckCircle,
  Close
} from '@mui/icons-material';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const Premium: React.FC = () => {
  const theme = useTheme();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const plans: PremiumPlan[] = [
    {
      id: 'basic',
      name: 'Harmony Basic',
      price: 0,
      period: 'Kostenlos',
      features: [
        '5 Likes pro Tag',
        'Basis-Matching',
        'Chat mit Matches',
        'Profil bearbeiten',
        'Basis-Filter'
      ],
      color: theme.palette.grey[500]
    },
    {
      id: 'premium',
      name: 'Harmony Premium',
      price: 9.99,
      period: 'pro Monat',
      features: [
        'Unbegrenzte Likes',
        'Super Likes (5 pro Tag)',
        'Wer hat mich geliked',
        'Erweiterte Filter',
        'Profil-Boost',
        'Keine Werbung',
        'Priorität im Matching'
      ],
      popular: true,
      color: theme.palette.primary.main
    },
    {
      id: 'vip',
      name: 'Harmony VIP',
      price: 19.99,
      period: 'pro Monat',
      features: [
        'Alle Premium-Features',
        'Unbegrenzte Super Likes',
        'VIP-Badge im Profil',
        'Exklusive Events',
        'Persönlicher Dating-Coach',
        'Erweiterte Analytics',
        'Premium-Support'
      ],
      color: theme.palette.secondary.main
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePayment = () => {
    // Payment logic would go here
    console.log('Payment for plan:', selectedPlan, 'Method:', paymentMethod);
    setShowPayment(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" textAlign="center" gutterBottom sx={{ mb: 2 }}>
          💎 Harmony Premium
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Entdecke alle Features für das perfekte Dating-Erlebnis
        </Typography>

        {/* Current Status */}
        <Card sx={{ mb: 6, bgcolor: 'primary.50' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              🎯 Dein aktueller Status
            </Typography>
            <Chip 
              label="Harmony Basic (Kostenlos)" 
              color="primary" 
              sx={{ fontSize: '16px', py: 2, px: 3 }}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Du nutzt derzeit die kostenlose Version. Upgrade für mehr Features!
            </Typography>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? `3px solid ${plan.color}` : '1px solid',
                  borderColor: plan.popular ? plan.color : 'divider',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 4
                  }
                }}
              >
                {plan.popular && (
                  <Chip
                    label="BELIEBT"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 'bold'
                    }}
                  />
                )}
                
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ color: plan.color }}>
                    {plan.name}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h2" component="span" sx={{ color: plan.color, fontWeight: 'bold' }}>
                      {plan.price === 0 ? 'Kostenlos' : `€${plan.price}`}
                    </Typography>
                    {plan.price > 0 && (
                      <Typography variant="h6" component="span" color="text.secondary">
                        /{plan.period}
                      </Typography>
                    )}
                  </Box>

                  <List sx={{ mb: 3 }}>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    size="large"
                    fullWidth
                    onClick={() => handleSelectPlan(plan.id)}
                    sx={{
                      bgcolor: plan.popular ? plan.color : 'transparent',
                      color: plan.popular ? 'white' : plan.color,
                      borderColor: plan.color,
                      py: 2,
                      fontSize: '16px',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: plan.color,
                        color: 'white'
                      }
                    }}
                  >
                    {plan.price === 0 ? 'Aktueller Plan' : 'Jetzt upgraden'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Feature Comparison */}
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
              📊 Feature-Vergleich
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  💕 Matching
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Likes pro Tag" />
                    <Typography>5 / ∞ / ∞</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Super Likes" />
                    <Typography>0 / 5 / ∞</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Wer hat mich geliked" />
                    <Typography>❌ / ✅ / ✅</Typography>
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  🔍 Suche & Filter
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Basis-Filter" />
                    <Typography>✅ / ✅ / ✅</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Erweiterte Filter" />
                    <Typography>❌ / ✅ / ✅</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Standort-Filter" />
                    <Typography>❌ / ✅ / ✅</Typography>
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  🚀 Premium Features
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Profil-Boost" />
                    <Typography>❌ / ✅ / ✅</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Werbung" />
                    <Typography>✅ / ❌ / ❌</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="VIP-Support" />
                    <Typography>❌ / ❌ / ✅</Typography>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5">
                  Warum Premium?
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Mit Harmony Premium erhältst du Zugang zu erweiterten Features, die deine 
                Chancen auf ein erfolgreiches Match deutlich erhöhen.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="3x mehr Matches durch unbegrenzte Likes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Sieh wer dich geliked hat" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Erweiterte Suchfilter für bessere Matches" />
                </ListItem>
              </List>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Typography variant="h5">
                  Sicherheit & Datenschutz
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Deine Daten sind bei uns sicher. Alle Zahlungen werden verschlüsselt 
                und DSGVO-konform verarbeitet.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="SSL-verschlüsselte Zahlungen" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="DSGVO-konforme Datenverarbeitung" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Jederzeit kündbar" />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>

        {/* Payment Dialog */}
        <Dialog open={showPayment} onClose={() => setShowPayment(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Zahlung abschließen</Typography>
              <IconButton onClick={() => setShowPayment(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              {plans.find(p => p.id === selectedPlan)?.name} - €{plans.find(p => p.id === selectedPlan)?.price}/Monat
            </Typography>
            
            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
              <InputLabel>Zahlungsmethode</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Zahlungsmethode"
              >
                <MenuItem value="card">💳 Kreditkarte</MenuItem>
                <MenuItem value="paypal">💙 PayPal</MenuItem>
                <MenuItem value="sepa">🏦 SEPA Lastschrift</MenuItem>
                <MenuItem value="giropay">💳 Giropay</MenuItem>
              </Select>
            </FormControl>
            
            {paymentMethod === 'card' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Kartennummer" placeholder="1234 5678 9012 3456" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Ablaufdatum" placeholder="MM/JJ" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="CVV" placeholder="123" />
                </Grid>
              </Grid>
            )}
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              🔒 Deine Zahlungsdaten werden sicher verarbeitet und nicht gespeichert.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPayment(false)}>Abbrechen</Button>
            <Button variant="contained" onClick={handlePayment} disabled={!paymentMethod}>
              Jetzt bezahlen
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Premium;
