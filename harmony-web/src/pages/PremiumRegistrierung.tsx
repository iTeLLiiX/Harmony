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
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
  Alert,
  IconButton,
  InputAdornment,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Phone,
  Email,
  Person,
  LocationOn,
  Help,
  ArrowBack,
  CheckCircle,
  Security,
  Psychology,
  Favorite
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import Logo from '../components/Logo';
import { 
  PremiumButton, 
  PremiumCard, 
  fadeInUp,
  staggerContainer,
  scaleIn
} from '../components/animations/AdvancedAnimations';

interface RegistrierungFormData {
  handynummer: string;
  smsCode: string;
  email: string;
  name: string;
  alter: number;
  geschlecht: string;
  suchtGeschlecht: string;
  plz: string;
  entfernung: number;
  wasSuchst: string;
  personalityType: string;
  interests: string[];
}

const PremiumRegistrierung: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegistrierungFormData>({
    defaultValues: {
      handynummer: '',
      smsCode: '',
      email: '',
      name: '',
      alter: 25,
      geschlecht: '',
      suchtGeschlecht: '',
      plz: '',
      entfernung: 25,
      wasSuchst: '',
      personalityType: '',
      interests: []
    }
  });

  const steps = [
    'Handynummer bestätigen',
    'Persönliche Daten',
    'Persönlichkeitstest',
    'Was suchst du?',
    'Fertig!'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSmsSenden = async () => {
    // SMS-Code senden (Mock)
    setSmsSent(true);
    console.log('SMS-Code gesendet');
  };

  const onSubmit = async (data: RegistrierungFormData) => {
    try {
      // Registrierung API-Call
      console.log('Registrierung:', data);
      
      // Erfolgreiche Registrierung
      navigate('/onboarding');
    } catch (error) {
      console.error('Registrierung fehlgeschlagen:', error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div variants={fadeInUp}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                📱 Handynummer bestätigen
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Wir senden dir einen kostenlosen SMS-Code zur Bestätigung
              </Typography>
              
              <Controller
                name="handynummer"
                control={control}
                rules={{ 
                  required: 'Handynummer ist erforderlich',
                  pattern: {
                    value: /^(\+49|0)[1-9]\d{8,9}$/,
                    message: 'Bitte gib eine gültige deutsche Handynummer ein'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Handynummer"
                    placeholder="+49 123 456789"
                    error={!!errors.handynummer}
                    helperText={errors.handynummer?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                )}
              />

              {!smsSent ? (
                <PremiumButton
                  variant="contained"
                  fullWidth
                  onClick={handleSmsSenden}
                  sx={{ mb: 2 }}
                >
                  SMS-Code senden
                </PremiumButton>
              ) : (
                <>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle />
                      <Typography variant="body2">
                        SMS-Code wurde gesendet! Prüfe dein Handy.
                      </Typography>
                    </Box>
                  </Alert>
                  
                  <Controller
                    name="smsCode"
                    control={control}
                    rules={{ 
                      required: 'SMS-Code ist erforderlich',
                      minLength: { value: 6, message: 'SMS-Code muss 6 Ziffern haben' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="SMS-Code"
                        placeholder="123456"
                        error={!!errors.smsCode}
                        helperText={errors.smsCode?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />

                  <PremiumButton
                    variant="contained"
                    fullWidth
                    onClick={handleNext}
                  >
                    Code bestätigen
                  </PremiumButton>
                </>
              )}
            </Box>
          </motion.div>
        );

      case 1:
        return (
          <motion.div variants={fadeInUp}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                👤 Persönliche Daten
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Erzähl uns etwas über dich
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ 
                      required: 'Name ist erforderlich',
                      minLength: { value: 2, message: 'Name muss mindestens 2 Zeichen haben' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Vollständiger Name"
                        placeholder="Max Mustermann"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="alter"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Typography gutterBottom sx={{ fontWeight: 600 }}>
                          Alter: {field.value} Jahre
                        </Typography>
                        <Slider
                          {...field}
                          min={18}
                          max={99}
                          step={1}
                          marks={[
                            { value: 18, label: '18' },
                            { value: 30, label: '30' },
                            { value: 50, label: '50' },
                            { value: 70, label: '70' },
                            { value: 99, label: '99' }
                          ]}
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="geschlecht"
                    control={control}
                    rules={{ required: 'Geschlecht ist erforderlich' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.geschlecht}>
                        <InputLabel>Ich bin</InputLabel>
                        <Select {...field} label="Ich bin">
                          <MenuItem value="männlich">Männlich</MenuItem>
                          <MenuItem value="weiblich">Weiblich</MenuItem>
                          <MenuItem value="divers">Divers</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="plz"
                    control={control}
                    rules={{ 
                      required: 'PLZ ist erforderlich',
                      pattern: {
                        value: /^\d{5}$/,
                        message: 'Bitte gib eine gültige 5-stellige PLZ ein'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Postleitzahl"
                        placeholder="80331"
                        error={!!errors.plz}
                        helperText={errors.plz?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Bitte gib eine gültige Email-Adresse ein'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email (optional)"
                        placeholder="max@beispiel.de"
                        error={!!errors.email}
                        helperText={errors.email?.message || 'Für bessere Sicherheit empfehlen wir eine Email-Adresse'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <PremiumButton onClick={handleBack} variant="outlined">
                  Zurück
                </PremiumButton>
                <PremiumButton
                  variant="contained"
                  onClick={handleNext}
                  sx={{ flexGrow: 1 }}
                >
                  Weiter
                </PremiumButton>
              </Box>
            </Box>
          </motion.div>
        );

      case 2:
        return (
          <motion.div variants={fadeInUp}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                🧠 Persönlichkeitstest
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Entdecke deinen Persönlichkeitstyp für bessere Matches
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="personalityType"
                    control={control}
                    rules={{ required: 'Persönlichkeitstyp ist erforderlich' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.personalityType}>
                        <InputLabel>Dein Persönlichkeitstyp</InputLabel>
                        <Select {...field} label="Dein Persönlichkeitstyp">
                          <MenuItem value="INTJ">INTJ - Der Architekt</MenuItem>
                          <MenuItem value="INTP">INTP - Der Denker</MenuItem>
                          <MenuItem value="ENTJ">ENTJ - Der Kommandant</MenuItem>
                          <MenuItem value="ENTP">ENTP - Der Debattierer</MenuItem>
                          <MenuItem value="INFJ">INFJ - Der Advokat</MenuItem>
                          <MenuItem value="INFP">INFP - Der Mediator</MenuItem>
                          <MenuItem value="ENFJ">ENFJ - Der Protagonist</MenuItem>
                          <MenuItem value="ENFP">ENFP - Der Aktivist</MenuItem>
                          <MenuItem value="ISTJ">ISTJ - Der Logistiker</MenuItem>
                          <MenuItem value="ISFJ">ISFJ - Der Beschützer</MenuItem>
                          <MenuItem value="ESTJ">ESTJ - Der Geschäftsführer</MenuItem>
                          <MenuItem value="ESFJ">ESFJ - Der Konsul</MenuItem>
                          <MenuItem value="ISTP">ISTP - Der Virtuose</MenuItem>
                          <MenuItem value="ISFP">ISFP - Der Abenteurer</MenuItem>
                          <MenuItem value="ESTP">ESTP - Der Unternehmer</MenuItem>
                          <MenuItem value="ESFP">ESFP - Der Entertainer</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Deine Interessen (wähle alle aus, die zu dir passen):
                  </Typography>
                  <Controller
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {[
                          'Musik', 'Gaming', 'Filme', 'Anime', 'Essen', 'Memes',
                          'Outdoor', 'Technologie', 'Kunst', 'Tiere', 'Bücher',
                          'Lernen', 'Geschichte', 'Psychologie', 'Kultur', 'Wissenschaft'
                        ].map((interest) => (
                          <Chip
                            key={interest}
                            label={interest}
                            onClick={() => {
                              const currentInterests = field.value || [];
                              const newInterests = currentInterests.includes(interest)
                                ? currentInterests.filter((i: string) => i !== interest)
                                : [...currentInterests, interest];
                              field.onChange(newInterests);
                            }}
                            color={field.value?.includes(interest) ? 'primary' : 'default'}
                            variant={field.value?.includes(interest) ? 'filled' : 'outlined'}
                            sx={{ 
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': { transform: 'scale(1.05)' }
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <PremiumButton onClick={handleBack} variant="outlined">
                  Zurück
                </PremiumButton>
                <PremiumButton
                  variant="contained"
                  onClick={handleNext}
                  sx={{ flexGrow: 1 }}
                >
                  Weiter
                </PremiumButton>
              </Box>
            </Box>
          </motion.div>
        );

      case 3:
        return (
          <motion.div variants={fadeInUp}>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                💕 Was suchst du?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Hilf uns, die richtigen Matches für dich zu finden
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="suchtGeschlecht"
                    control={control}
                    rules={{ required: 'Suchpräferenz ist erforderlich' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.suchtGeschlecht}>
                        <InputLabel>Ich suche</InputLabel>
                        <Select {...field} label="Ich suche">
                          <MenuItem value="männlich">Männer</MenuItem>
                          <MenuItem value="weiblich">Frauen</MenuItem>
                          <MenuItem value="alle">Alle</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="wasSuchst"
                    control={control}
                    rules={{ required: 'Was du suchst ist erforderlich' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.wasSuchst}>
                        <InputLabel>Art der Beziehung</InputLabel>
                        <Select {...field} label="Art der Beziehung">
                          <MenuItem value="Beziehung">Eine feste Beziehung</MenuItem>
                          <MenuItem value="Freundschaft">Neue Freunde</MenuItem>
                          <MenuItem value="Beides">Beides</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="entfernung"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Typography gutterBottom sx={{ fontWeight: 600 }}>
                          Suchradius: {field.value} km
                        </Typography>
                        <Slider
                          {...field}
                          min={5}
                          max={100}
                          step={5}
                          marks={[
                            { value: 5, label: '5km' },
                            { value: 25, label: '25km' },
                            { value: 50, label: '50km' },
                            { value: 100, label: '100km' }
                          ]}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <PremiumButton onClick={handleBack} variant="outlined">
                  Zurück
                </PremiumButton>
                <PremiumButton
                  variant="contained"
                  onClick={handleNext}
                  sx={{ flexGrow: 1 }}
                >
                  Weiter
                </PremiumButton>
              </Box>
            </Box>
          </motion.div>
        );

      case 4:
        return (
          <motion.div variants={fadeInUp}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                🎉 Willkommen bei Harmony!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Deine Registrierung war erfolgreich. Jetzt kannst du dein Profil vervollständigen
                und deine ersten Matches entdecken.
              </Typography>

              <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
                <Typography variant="body2">
                  <strong>Tipp:</strong> Vervollständige dein Profil mit deinen Interessen 
                  (Musik, Sport, Hobbys) für bessere Matches!
                </Typography>
              </Alert>

              <PremiumButton
                variant="contained"
                fullWidth
                onClick={() => navigate('/onboarding')}
                sx={{ mb: 2 }}
              >
                Profil vervollständigen
              </PremiumButton>
            </Box>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
        py: 4,
        position: 'relative',
        overflow: 'hidden'
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

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
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

          {/* Registration Card */}
          <motion.div variants={scaleIn}>
            <PremiumCard>
              <CardContent sx={{ p: 4 }}>
                {/* Stepper */}
                <motion.div variants={fadeInUp}>
                  <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </motion.div>

                {/* Step Content */}
                {renderStepContent(activeStep)}
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
                    🆘 Hilfe bei der Registrierung
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Handynummer:</strong> Gib deine deutsche Handynummer ein (z.B. +49 123 456789)
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>SMS-Code:</strong> Wir senden dir einen 6-stelligen Code zur Bestätigung
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Daten:</strong> Alle deine Daten werden sicher und DSGVO-konform gespeichert
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

export default PremiumRegistrierung;
