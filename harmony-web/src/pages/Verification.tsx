import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  Alert,
  LinearProgress,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip
} from '@mui/material';
import {
  PhotoCamera,
  CheckCircle,
  Security,
  Help,
  Close,
  Refresh,
  Upload
} from '@mui/icons-material';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  inProgress: boolean;
}

const Verification: React.FC = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [selfiePhoto, setSelfiePhoto] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');

  const steps: VerificationStep[] = [
    {
      id: 'phone',
      title: 'Handy-Nummer bestätigen',
      description: 'Wir senden dir einen SMS-Code zur Bestätigung',
      completed: true,
      inProgress: false
    },
    {
      id: 'email',
      title: 'Email-Adresse bestätigen',
      description: 'Bestätige deine Email-Adresse für zusätzliche Sicherheit',
      completed: true,
      inProgress: false
    },
    {
      id: 'selfie',
      title: 'Selfie-Verifikation',
      description: 'Mache ein Selfie mit dem angezeigten Code',
      completed: false,
      inProgress: currentStep === 2
    },
    {
      id: 'review',
      title: 'Überprüfung',
      description: 'Wir überprüfen deine Angaben und Fotos',
      completed: false,
      inProgress: false
    }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelfiePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVerificationCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setVerificationCode(code);
    return code;
  };

  const handleSubmitVerification = () => {
    // Simulate verification process
    setVerificationStatus('pending');
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 3000);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              📱 Handy-Nummer bestätigen
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              ✅ Deine Handynummer wurde bereits bestätigt
            </Alert>
            <Typography variant="body1" color="text.secondary">
              Deine Handynummer +49 123 456789 wurde erfolgreich verifiziert.
            </Typography>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              📧 Email-Adresse bestätigen
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              ✅ Deine Email-Adresse wurde bereits bestätigt
            </Alert>
            <Typography variant="body1" color="text.secondary">
              Deine Email-Adresse max@beispiel.de wurde erfolgreich verifiziert.
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              📸 Selfie-Verifikation
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Mache ein Selfie mit dem angezeigten Code, um deine Identität zu bestätigen.
            </Typography>

            {/* Verification Code Display */}
            <Card sx={{ mb: 3, bgcolor: 'primary.50', border: '2px dashed', borderColor: 'primary.main' }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h3" sx={{ fontFamily: 'monospace', letterSpacing: 2, mb: 2 }}>
                  {verificationCode || 'HARMONY'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Halte diesen Code in deinem Selfie sichtbar
                </Typography>
                <Button
                  variant="outlined"
                  onClick={generateVerificationCode}
                  sx={{ mt: 2 }}
                  startIcon={<Refresh />}
                >
                  Neuen Code generieren
                </Button>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, textAlign: 'center', border: '2px dashed', borderColor: 'grey.300' }}>
                  <PhotoCamera sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Selfie mit Code aufnehmen
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Stelle sicher, dass der Code gut lesbar ist
                  </Typography>
                  
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    style={{ display: 'none' }}
                    id="selfie-upload"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="selfie-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<PhotoCamera />}
                      sx={{ mb: 2 }}
                    >
                      Selfie aufnehmen
                    </Button>
                  </label>
                  
                  <Typography variant="caption" display="block" color="text.secondary">
                    📱 Nutze die Kamera deines Geräts
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                {selfiePhoto ? (
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      📸 Dein Selfie
                    </Typography>
                    <Box
                      component="img"
                      src={selfiePhoto}
                      alt="Verification selfie"
                      sx={{
                        width: '100%',
                        maxHeight: 300,
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelfiePhoto(null)}
                      >
                        Erneut aufnehmen
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleSubmitVerification}
                        startIcon={<CheckCircle />}
                      >
                        Bestätigen
                      </Button>
                    </Box>
                  </Card>
                ) : (
                  <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50' }}>
                    <Typography variant="body1" color="text.secondary">
                      Nimm zuerst ein Selfie auf
                    </Typography>
                  </Card>
                )}
              </Grid>
            </Grid>

            {/* Tips */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>💡 Tipps für ein gutes Verifikations-Selfie:</strong><br/>
                • Halte den Code gut sichtbar in deiner Hand<br/>
                • Stelle sicher, dass dein Gesicht gut erkennbar ist<br/>
                • Nutze gutes Licht für eine klare Aufnahme<br/>
                • Der Code muss vollständig lesbar sein
              </Typography>
            </Alert>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              🔍 Überprüfung läuft
            </Typography>
            
            {verificationStatus === 'pending' && (
              <>
                <LinearProgress sx={{ mb: 3, height: 8, borderRadius: 4 }} />
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Wir überprüfen deine Angaben und Fotos. Das kann einige Minuten dauern.
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={4}>
                    <Card sx={{ p: 2, textAlign: 'center' }}>
                      <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                      <Typography variant="body2">Handy bestätigt</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ p: 2, textAlign: 'center' }}>
                      <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                      <Typography variant="body2">Email bestätigt</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ p: 2, textAlign: 'center' }}>
                      <LinearProgress sx={{ mb: 1 }} />
                      <Typography variant="body2">Selfie prüfen</Typography>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )}

            {verificationStatus === 'verified' && (
              <>
                <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" color="success.main" gutterBottom>
                  ✅ Verifikation erfolgreich!
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Dein Profil wurde erfolgreich verifiziert. Du erhältst jetzt ein 
                  Verifikations-Badge und mehr Vertrauen von anderen Nutzern.
                </Typography>
                
                <Card sx={{ p: 3, bgcolor: 'success.50', mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    🎉 Vorteile der Verifikation:
                  </Typography>
                  <Typography variant="body2">
                    • Verifikations-Badge in deinem Profil<br/>
                    • 3x mehr Matches durch erhöhtes Vertrauen<br/>
                    • Zugang zu exklusiven Premium-Features<br/>
                    • Priorität im Matching-Algorithmus
                  </Typography>
                </Card>
              </>
            )}

            {verificationStatus === 'rejected' && (
              <>
                <Close sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                <Typography variant="h4" color="error.main" gutterBottom>
                  ❌ Verifikation fehlgeschlagen
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Leider konnten wir deine Identität nicht bestätigen. Bitte versuche es erneut.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setCurrentStep(2)}
                >
                  Erneut versuchen
                </Button>
              </>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              🛡️ Profil-Verifikation
            </Typography>
            <Typography variant="body1">
              Verifiziere dein Profil für mehr Vertrauen und bessere Matches
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Stepper */}
            <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
              {steps.map((step) => (
                <Step key={step.id}>
                  <StepLabel>{step.title}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            {renderStepContent(currentStep)}

            {/* Navigation */}
            {currentStep < steps.length - 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Zurück
                </Button>
                
                <Button
                  variant="contained"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={currentStep === 2 && !selfiePhoto}
                >
                  Weiter
                </Button>
              </Box>
            )}

            {/* Help Button */}
            <IconButton
              sx={{
                position: 'fixed',
                top: 16,
                right: 16,
                bgcolor: 'primary.main',
                color: 'white',
                zIndex: 1000,
              }}
              onClick={() => setShowHelp(true)}
            >
              <Help />
            </IconButton>
          </CardContent>
        </Card>

        {/* Help Dialog */}
        <Dialog open={showHelp} onClose={() => setShowHelp(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">🆘 Hilfe zur Verifikation</Typography>
              <IconButton onClick={() => setShowHelp(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              <strong>Warum Verifikation?</strong><br/>
              Die Verifikation erhöht das Vertrauen in dein Profil und führt zu mehr Matches.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Selfie-Verifikation:</strong><br/>
              • Halte den Code gut sichtbar in deiner Hand<br/>
              • Stelle sicher, dass dein Gesicht erkennbar ist<br/>
              • Nutze gutes Licht für eine klare Aufnahme
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Datenschutz:</strong><br/>
              Deine Verifikations-Fotos werden nur zur Identitätsprüfung verwendet 
              und nach der Verifikation gelöscht.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setShowHelp(false)}>
              Verstanden
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Verification;
