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
  Divider,
  Chip,
  Stack,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Phone,
  Email,
  Help,
  ArrowBack,
  Security,
  Speed,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import { 
  PremiumButton, 
  PremiumCard, 
  fadeInUp,
  staggerContainer,
  scaleIn
} from '../components/animations/AdvancedAnimations';

const PremiumLogin: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
  const [smsSent, setSmsSent] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - navigate to matching
      navigate('/matching');
    } catch (error) {
      setErrors({ general: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSmsSend = async () => {
    setLoading(true);
    try {
      // Simulate SMS sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSmsSent(true);
    } catch (error) {
      setErrors({ sms: 'SMS konnte nicht gesendet werden.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Animated Background */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `,
          zIndex: 1
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Floating Elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 2
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Help Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          bgcolor: 'rgba(255,255,255,0.2)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.3)',
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => setShowHelp(true)}
      >
        <Help />
      </IconButton>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 3 }}>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Back Button */}
          <motion.div variants={fadeInUp}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: 'white',
                mb: 3,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <ArrowBack />
            </IconButton>
          </motion.div>

          {/* Logo */}
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Logo size="large" color="white" />
              </motion.div>
            </Box>
          </motion.div>

          {/* Login Card */}
          <motion.div variants={scaleIn}>
            <PremiumCard>
              <CardContent sx={{ p: 6 }}>
                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      textAlign: 'center', 
                      mb: 2,
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Willkommen zurück! 👋
                  </Typography>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'center', 
                      mb: 4,
                      color: 'text.secondary'
                    }}
                  >
                    Melde dich an, um deine Matches zu entdecken
                  </Typography>
                </motion.div>

                {/* Login Method Toggle */}
                <motion.div variants={fadeInUp}>
                  <Box sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                      <Chip
                        icon={<Phone />}
                        label="SMS"
                        onClick={() => setLoginMethod('sms')}
                        color={loginMethod === 'sms' ? 'primary' : 'default'}
                        variant={loginMethod === 'sms' ? 'filled' : 'outlined'}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { transform: 'scale(1.05)' }
                        }}
                      />
                      <Chip
                        icon={<Email />}
                        label="Email"
                        onClick={() => setLoginMethod('email')}
                        color={loginMethod === 'email' ? 'primary' : 'default'}
                        variant={loginMethod === 'email' ? 'filled' : 'outlined'}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { transform: 'scale(1.05)' }
                        }}
                      />
                    </Stack>
                  </Box>
                </motion.div>

                {/* Error Alert */}
                <AnimatePresence>
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Alert 
                        severity="error" 
                        sx={{ mb: 3 }}
                        icon={<Error />}
                      >
                        {errors.general}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                <motion.div variants={fadeInUp}>
                  <Stack spacing={3}>
                    {loginMethod === 'sms' ? (
                      <>
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
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C80026',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C80026',
                                borderWidth: 2,
                              },
                            },
                          }}
                        />

                        {!smsSent ? (
                          <PremiumButton
                            variant="contained"
                            fullWidth
                            onClick={handleSmsSend}
                            loading={loading}
                            sx={{ py: 2 }}
                          >
                            SMS-Code senden
                          </PremiumButton>
                        ) : (
                          <>
                            <Alert severity="success" sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircle />
                                <Typography variant="body2">
                                  SMS-Code wurde gesendet! Prüfe dein Handy.
                                </Typography>
                              </Box>
                            </Alert>

                            <TextField
                              fullWidth
                              label="SMS-Code"
                              placeholder="123456"
                              value={formData.smsCode}
                              onChange={(e) => handleInputChange('smsCode', e.target.value)}
                              error={!!errors.smsCode}
                              helperText={errors.smsCode}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#C80026',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#C80026',
                                    borderWidth: 2,
                                  },
                                },
                              }}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
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
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C80026',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C80026',
                                borderWidth: 2,
                              },
                            },
                          }}
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
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C80026',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C80026',
                                borderWidth: 2,
                              },
                            },
                          }}
                        />
                      </>
                    )}

                    {/* Login Button */}
                    <PremiumButton
                      variant="contained"
                      fullWidth
                      onClick={handleLogin}
                      loading={loading}
                      sx={{ py: 2, mt: 2 }}
                    >
                      {loginMethod === 'sms' ? 'Mit SMS-Code anmelden' : 'Anmelden'}
                    </PremiumButton>

                    {/* Security Features */}
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Chip
                          icon={<Security />}
                          label="DSGVO-konform"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                        <Chip
                          icon={<Speed />}
                          label="Schnell & Sicher"
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>

                    <Divider sx={{ my: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        oder
                      </Typography>
                    </Divider>

                    {/* Register Link */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Noch kein Konto?{' '}
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => navigate('/registrierung')}
                          sx={{
                            color: 'primary.main',
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          Jetzt registrieren
                        </Link>
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              </CardContent>
            </PremiumCard>
          </motion.div>
        </motion.div>
      </Container>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              zIndex: 1300
            }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card sx={{ maxWidth: 500, m: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom>
                    🆘 Hilfe bei der Anmeldung
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>SMS-Anmeldung:</strong> Gib deine deutsche Handynummer ein und bestätige den SMS-Code
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Email-Anmeldung:</strong> Verwende deine Email-Adresse und dein Passwort
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Sicherheit:</strong> Alle Daten werden DSGVO-konform und verschlüsselt gespeichert
                  </Typography>
                  <PremiumButton
                    variant="contained"
                    fullWidth
                    onClick={() => setShowHelp(false)}
                  >
                    Verstanden
                  </PremiumButton>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PremiumLogin;
