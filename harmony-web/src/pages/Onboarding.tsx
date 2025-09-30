import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material';
import {
  PhotoCamera,
  Add,
  Delete,
  ArrowForward,
  ArrowBack,
  Favorite,
  MusicNote,
  SportsSoccer,
  Movie,
  Book,
  Palette,
  Code
} from '@mui/icons-material';

interface OnboardingProps {
  onComplete?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [relationshipGoals, setRelationshipGoals] = useState('');
  const [lifestyle, setLifestyle] = useState<string[]>([]);

  const steps = [
    'Fotos hinzufügen',
    'Über dich schreiben',
    'Interessen wählen',
    'Beziehungsziele',
    'Lifestyle',
    'Fertig!'
  ];

  const interestCategories = [
    {
      title: 'Musik & Entertainment',
      icon: <MusicNote />,
      interests: ['Pop', 'Rock', 'Klassik', 'Jazz', 'Electronic', 'Hip-Hop', 'Konzerte', 'Festivals']
    },
    {
      title: 'Sport & Fitness',
      icon: <SportsSoccer />,
      interests: ['Fitness', 'Laufen', 'Fußball', 'Tennis', 'Schwimmen', 'Yoga', 'Wandern', 'Radfahren']
    },
    {
      title: 'Filme & Serien',
      icon: <Movie />,
      interests: ['Action', 'Komödie', 'Drama', 'Thriller', 'Sci-Fi', 'Netflix', 'Kino', 'Dokumentationen']
    },
    {
      title: 'Hobbys & Kreativität',
      icon: <Palette />,
      interests: ['Malen', 'Fotografie', 'Kochen', 'Backen', 'Handwerk', 'Schreiben', 'Musik machen', 'Gärtnern']
    },
    {
      title: 'Bildung & Technologie',
      icon: <Code />,
      interests: ['Programmieren', 'Wissenschaft', 'Bücher', 'Sprachen', 'Geschichte', 'Philosophie', 'Technologie', 'Lernen']
    }
  ];

  const lifestyleOptions = [
    'Frühaufsteher', 'Nachteule', 'Vegetarisch', 'Vegan', 'Raucher', 'Nichtraucher',
    'Alkohol trinken', 'Kein Alkohol', 'Haustiere', 'Keine Haustiere', 'Reisen', 'Zuhause bleiben'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleLifestyle = (option: string) => {
    setLifestyle(prev => 
      prev.includes(option) 
        ? prev.filter(l => l !== option)
        : [...prev, option]
    );
  };

  const handleComplete = () => {
    // Onboarding-Daten speichern
    const onboardingData = {
      photos,
      bio,
      interests,
      relationshipGoals,
      lifestyle
    };
    
    console.log('Onboarding abgeschlossen:', onboardingData);
    
    // Onboarding als abgeschlossen markieren
    localStorage.setItem('harmony_onboarding_completed', 'true');
    localStorage.setItem('harmony_onboarding_data', JSON.stringify(onboardingData));
    
    // Callback aufrufen falls vorhanden
    if (onComplete) {
      onComplete();
    } else {
      navigate('/matching');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              📸 Füge deine besten Fotos hinzu
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Gute Fotos sind der Schlüssel zu mehr Matches. Zeige dein Gesicht klar und lächle!
            </Typography>

            <Grid container spacing={2}>
              {photos.map((photo, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Card sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                      }}
                      onClick={() => removePhoto(index)}
                    >
                      <Delete />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
              
              {photos.length < 6 && (
                <Grid item xs={6} sm={4}>
                  <Card
                    sx={{
                      height: 150,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed',
                      borderColor: 'grey.300',
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Add sx={{ fontSize: 40, color: 'grey.500' }} />
                      <Typography variant="body2" color="text.secondary">
                        Foto hinzufügen
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              )}
            </Grid>

            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              💡 Tipp: Verwende aktuelle Fotos, zeige dein Gesicht und lächle!
            </Typography>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              ✍️ Erzähl etwas über dich
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Schreib ein paar Sätze über dich. Was macht dich besonders? Was liebst du?
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Hi! Ich bin Max und liebe es, neue Leute kennenzulernen. In meiner Freizeit gehe ich gerne wandern, koche leidenschaftlich und höre viel Musik. Ich suche jemanden, der meine Abenteuerlust teilt..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" color="text.secondary">
              {bio.length}/500 Zeichen
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              🎯 Wähle deine Interessen
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Wähle alle Interessen aus, die zu dir passen. Das hilft uns, bessere Matches zu finden.
            </Typography>

            {interestCategories.map((category, categoryIndex) => (
              <Box key={categoryIndex} sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {category.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {category.title}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {category.interests.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      onClick={() => toggleInterest(interest)}
                      color={interests.includes(interest) ? 'primary' : 'default'}
                      variant={interests.includes(interest) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Box>
            ))}

            <Typography variant="body2" color="text.secondary">
              {interests.length} Interessen ausgewählt
            </Typography>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              💕 Was suchst du?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Hilf uns zu verstehen, was für eine Beziehung du suchst.
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Beziehungsziele</InputLabel>
              <Select
                value={relationshipGoals}
                onChange={(e) => setRelationshipGoals(e.target.value)}
                label="Beziehungsziele"
              >
                <MenuItem value="serious">Eine ernste, langfristige Beziehung</MenuItem>
                <MenuItem value="casual">Etwas lockeres und unverbindliches</MenuItem>
                <MenuItem value="friendship">Neue Freunde finden</MenuItem>
                <MenuItem value="open">Offen für alles</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="body2" color="text.secondary">
              💡 Je ehrlicher du bist, desto bessere Matches bekommst du!
            </Typography>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              🌟 Dein Lifestyle
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Wähle alle Optionen aus, die zu dir passen.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {lifestyleOptions.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => toggleLifestyle(option)}
                  color={lifestyle.includes(option) ? 'primary' : 'default'}
                  variant={lifestyle.includes(option) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {lifestyle.length} Lifestyle-Optionen ausgewählt
            </Typography>
          </Box>
        );

      case 5:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Favorite sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              🎉 Perfekt! Du bist bereit!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Dein Profil ist vollständig. Jetzt können wir dir die perfekten Matches zeigen!
            </Typography>

            <Box sx={{ bgcolor: 'primary.50', p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                📊 Dein Profil-Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✅ {photos.length} Fotos hochgeladen<br/>
                ✅ Bio geschrieben<br/>
                ✅ {interests.length} Interessen ausgewählt<br/>
                ✅ Beziehungsziele definiert<br/>
                ✅ Lifestyle festgelegt
              </Typography>
            </Box>
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
              Willkommen bei Harmony! 🎉
            </Typography>
            <Typography variant="body1">
              Lass uns dein Profil vervollständigen, damit wir dir die perfekten Matches zeigen können
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step Content */}
            {renderStepContent(activeStep)}

            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBack />}
              >
                Zurück
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleComplete}
                  endIcon={<Favorite />}
                  sx={{ px: 4 }}
                >
                  Matches entdecken!
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  sx={{ px: 4 }}
                >
                  Weiter
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Onboarding;
