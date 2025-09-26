import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Alert,
  Link,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Phone,
  Email,
  Help
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'sms' | 'email'>('sms');
  const [formData, setFormData] = useState({
    handynummer: '',
    email: '',
    passwort: '',
    smsCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Mock Login Logic
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - navigate to main app
      navigate('/matching');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSMSLogin = async () => {
    if (!formData.handynummer) {
      setErrors({ handynummer: 'Handynummer ist erforderlich' });
      return;
    }
    
    setLoading(true);
    try {
      // Mock SMS sending
      console.log('SMS sent to:', formData.handynummer);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setErrors({});
    } catch (error) {
      setErrors({ handynummer: 'Fehler beim Senden der SMS' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hilfe-Button */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'white',
          zIndex: 1000,
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
          }
        }}
        onClick={() => setShowHelp(true)}
      >
        <Help />
      </IconButton>

      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          zIndex: 1
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              overflow: 'hidden'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Logo */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Logo size="large" color="primary" />
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mt: 2, fontWeight: 500 }}
                >
                  Finde deine große Liebe
                </Typography>
              </Box>

              {/* Login Method Toggle */}
              <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
                <Button
                  variant={loginMethod === 'sms' ? 'contained' : 'outlined'}
                  onClick={() => setLoginMethod('sms')}
                  sx={{ flex: 1 }}
                >
                  📱 SMS
                </Button>
                <Button
                  variant={loginMethod === 'email' ? 'contained' : 'outlined'}
                  onClick={() => setLoginMethod('email')}
                  sx={{ flex: 1 }}
                >
                  📧 Email
                </Button>
              </Box>

              {/* Login Form */}
              {loginMethod === 'sms' ? (
                <Box>
                  <TextField
                    fullWidth
                    label="Handynummer"
                    placeholder="+49 123 456789"
                    value={formData.handynummer}
                    onChange={(e) => handleInputChange('handynummer', e.target.value)}
                    error={!!errors.handynummer}
                    helperText={errors.handynummer}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  {formData.smsCode && (
                    <TextField
                      fullWidth
                      label="SMS-Code"
                      placeholder="123456"
                      value={formData.smsCode}
                      onChange={(e) => handleInputChange('smsCode', e.target.value)}
                      error={!!errors.smsCode}
                      helperText={errors.smsCode}
                      sx={{ mb: 3 }}
                    />
                  )}

                  {!formData.smsCode ? (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleSMSLogin}
                      disabled={loading}
                      sx={{ mb: 2, py: 1.5 }}
                    >
                      {loading ? 'SMS wird gesendet...' : 'SMS-Code senden'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleLogin}
                      disabled={loading}
                      sx={{ mb: 2, py: 1.5 }}
                    >
                      {loading ? 'Wird angemeldet...' : 'Anmelden'}
                    </Button>
                  )}
                </Box>
              ) : (
                <Box>
                  <TextField
                    fullWidth
                    label="Email-Adresse"
                    placeholder="max@beispiel.de"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Passwort"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.passwort}
                    onChange={(e) => handleInputChange('passwort', e.target.value)}
                    error={!!errors.passwort}
                    helperText={errors.passwort}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{ mb: 2, py: 1.5 }}
                  >
                    {loading ? 'Wird angemeldet...' : 'Anmelden'}
                  </Button>
                </Box>
              )}

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  oder
                </Typography>
              </Divider>

              {/* Registration Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Noch kein Konto?{' '}
                  <Link
                    component="button"
                    onClick={() => navigate('/registrierung')}
                    sx={{ fontWeight: 600 }}
                  >
                    Jetzt registrieren
                  </Link>
                </Typography>
              </Box>

              {/* Demo Info */}
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Demo-Modus:</strong> Verwende beliebige Daten zum Testen. 
                  In der Produktion wird eine echte SMS-Verifizierung durchgeführt.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Hilfe Modal */}
      {showHelp && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300
          }}
          onClick={() => setShowHelp(false)}
        >
          <Card sx={{ maxWidth: 500, m: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                🆘 Hilfe bei der Anmeldung
              </Typography>
              
              <Typography variant="body1" paragraph>
                <strong>SMS-Anmeldung:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • Gib deine deutsche Handynummer ein (z.B. +49 123 456789)
              </Typography>
              <Typography variant="body2" paragraph>
                • Wir senden dir einen kostenlosen 6-stelligen Code
              </Typography>
              <Typography variant="body2" paragraph>
                • Gib den Code ein, um dich anzumelden
              </Typography>

              <Typography variant="body1" paragraph sx={{ mt: 3 }}>
                <strong>Email-Anmeldung:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • Verwende deine Email-Adresse und dein Passwort
              </Typography>
              <Typography variant="body2" paragraph>
                • Falls du dein Passwort vergessen hast, kannst du es zurücksetzen
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={() => setShowHelp(false)}
                sx={{ mt: 2 }}
              >
                Verstanden
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Login;
