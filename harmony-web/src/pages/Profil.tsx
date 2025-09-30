import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  PhotoCamera,
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  Star,
  Favorite,
  MusicNote,
  SportsSoccer,
  Movie,
  Palette,
  MenuBook,
  EmojiEvents,
  LocationOn,
  Work,
  School,
  Height,
  FitnessCenter,
  Language,
  Pets,
  Smoking,
  ChildCare,
  Religion,
  Politics
} from '@mui/icons-material';
import { usePaywall } from '../hooks/usePaywall';

interface ProfileData {
  // Grunddaten
  name: string;
  age: number;
  location: string;
  bio: string;
  job: string;
  education: string;
  height: string;
  
  // Fotos
  photos: string[];
  mainPhoto: number;
  
  // Interessen & Hobbys
  interests: string[];
  hobbies: string[];
  music: string[];
  sports: string[];
  movies: string[];
  
  // Lifestyle
  lifestyle: {
    smoking: string;
    drinking: string;
    exercise: string;
    diet: string;
    pets: string;
    children: string;
  };
  
  // Beziehungsziele
  relationshipGoals: string[];
  lookingFor: string;
  
  // Persönlichkeit
  personality: {
    traits: string[];
    values: string[];
    humor: string;
    communication: string;
  };
  
  // Premium Features
  isPremium: boolean;
  verified: boolean;
  superLikes: number;
  likes: number;
}

const Profil: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    age: 0,
    location: '',
    bio: '',
    job: '',
    education: '',
    height: '',
    photos: [],
    mainPhoto: 0,
    interests: [],
    hobbies: [],
    music: [],
    sports: [],
    movies: [],
    lifestyle: {
      smoking: '',
      drinking: '',
      exercise: '',
      diet: '',
      pets: '',
      children: ''
    },
    relationshipGoals: [],
    lookingFor: '',
    personality: {
      traits: [],
      values: [],
      humor: '',
      communication: ''
    },
    isPremium: false,
    verified: false,
    superLikes: 0,
    likes: 0
  });

  const [activeStep, setActiveStep] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [photoDialog, setPhotoDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { checkFeature, showPaywall } = usePaywall();

  const steps = [
    'Grunddaten',
    'Fotos',
    'Interessen',
    'Lifestyle',
    'Beziehungsziele',
    'Persönlichkeit'
  ];

  const interestOptions = [
    '🎵 Musik', '🎮 Gaming', '🎬 Filme', '⚽ Sport', '🎨 Kunst', '📚 Bücher',
    '🍳 Kochen', '✈️ Reisen', '🏃‍♂️ Fitness', '🎭 Theater', '🎪 Konzerte',
    '🏔️ Wandern', '🏊‍♂️ Schwimmen', '🚴‍♂️ Radfahren', '🎯 Schießen',
    '🎲 Brettspiele', '🎮 Videospiele', '📸 Fotografie', '🎨 Malen',
    '🎵 Instrumente', '💃 Tanzen', '🧘‍♀️ Yoga', '🏋️‍♂️ Krafttraining'
  ];

  const lifestyleOptions = {
    smoking: ['Nichtraucher', 'Gelegentlich', 'Regelmäßig', 'Präferiere nicht zu sagen'],
    drinking: ['Trinke nicht', 'Gelegentlich', 'Regelmäßig', 'Präferiere nicht zu sagen'],
    exercise: ['Täglich', 'Mehrmals pro Woche', 'Wöchentlich', 'Selten', 'Nie'],
    diet: ['Alles', 'Vegetarisch', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Andere'],
    pets: ['Hunde', 'Katzen', 'Andere Tiere', 'Keine Tiere', 'Allergisch'],
    children: ['Habe Kinder', 'Möchte Kinder', 'Möchte keine Kinder', 'Unentschieden']
  };

  const personalityTraits = [
    'Abenteuerlustig', 'Kreativ', 'Intellektuell', 'Humorvoll', 'Romantisch',
    'Sportlich', 'Künstlerisch', 'Technisch', 'Spirituell', 'Praktisch',
    'Optimistisch', 'Realistisch', 'Introvertiert', 'Extrovertiert', 'Empathisch'
  ];

  const handleSave = async () => {
    try {
      // Hier würde der API-Call stattfinden
      console.log('Profil gespeichert:', profileData);
      setSuccessMessage('Profil erfolgreich gespeichert! 🎉');
      setEditMode(false);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Hier würde der Upload stattfinden
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setProfileData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const handlePremiumFeature = async (feature: string) => {
    const canAccess = await checkFeature(feature);
    if (!canAccess) {
      showPaywall(feature);
      return false;
    }
    return true;
  };

  const renderBasicInfo = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          👤 Grunddaten
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alter"
              type="number"
              value={profileData.age}
              onChange={(e) => setProfileData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Standort"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Über mich"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!editMode}
              placeholder="Erzähle etwas über dich..."
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderPhotos = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            📸 Fotos
          </Typography>
          {editMode && (
            <Button
              variant="contained"
              startIcon={<PhotoCamera />}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Fotos hinzufügen
            </Button>
          )}
        </Box>
        <input
          id="photo-upload"
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handlePhotoUpload}
        />
        <Grid container spacing={2}>
          {profileData.photos.map((photo, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box position="relative">
                <Avatar
                  src={photo}
                  sx={{ width: 100, height: 100 }}
                  variant="rounded"
                />
                {index === profileData.mainPhoto && (
                  <Star sx={{ position: 'absolute', top: 5, right: 5, color: 'gold' }} />
                )}
                {editMode && (
                  <Box position="absolute" top={5} left={5}>
                    <IconButton
                      size="small"
                      onClick={() => setProfileData(prev => ({ ...prev, mainPhoto: index }))}
                    >
                      <Star fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setProfileData(prev => ({
                        ...prev,
                        photos: prev.photos.filter((_, i) => i !== index)
                      }))}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderInterests = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🎯 Interessen & Hobbys
        </Typography>
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            Wähle deine Interessen:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {interestOptions.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                clickable
                color={profileData.interests.includes(interest) ? 'primary' : 'default'}
                onClick={() => {
                  if (editMode) {
                    setProfileData(prev => ({
                      ...prev,
                      interests: prev.interests.includes(interest)
                        ? prev.interests.filter(i => i !== interest)
                        : [...prev.interests, interest]
                    }));
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderLifestyle = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🌟 Lifestyle
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(lifestyleOptions).map(([key, options]) => (
            <Grid item xs={12} sm={6} key={key}>
              <FormControl fullWidth>
                <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                <Select
                  value={profileData.lifestyle[key as keyof typeof profileData.lifestyle]}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    lifestyle: { ...prev.lifestyle, [key]: e.target.value }
                  }))}
                  disabled={!editMode}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderRelationshipGoals = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          💕 Beziehungsziele
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Was suchst du?</InputLabel>
              <Select
                value={profileData.lookingFor}
                onChange={(e) => setProfileData(prev => ({ ...prev, lookingFor: e.target.value }))}
                disabled={!editMode}
              >
                <MenuItem value="friendship">Freundschaft</MenuItem>
                <MenuItem value="relationship">Beziehung</MenuItem>
                <MenuItem value="marriage">Heirat</MenuItem>
                <MenuItem value="casual">Locker</MenuItem>
                <MenuItem value="not-sure">Bin mir nicht sicher</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderPersonality = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🧠 Persönlichkeit
        </Typography>
        <Box mb={2}>
          <Typography variant="subtitle2" gutterBottom>
            Persönlichkeitsmerkmale:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {personalityTraits.map((trait) => (
              <Chip
                key={trait}
                label={trait}
                clickable
                color={profileData.personality.traits.includes(trait) ? 'primary' : 'default'}
                onClick={() => {
                  if (editMode) {
                    setProfileData(prev => ({
                      ...prev,
                      personality: {
                        ...prev.personality,
                        traits: prev.personality.traits.includes(trait)
                          ? prev.personality.traits.filter(t => t !== trait)
                          : [...prev.personality.traits, trait]
                      }
                    }));
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderPremiumFeatures = () => (
    <Card sx={{ mb: 3, background: 'linear-gradient(45deg, #FFD700, #FFA500)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          ⭐ Premium Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Star color="primary" />
              <Typography>Super Likes: {profileData.superLikes}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <Favorite color="primary" />
              <Typography>Likes: {profileData.likes}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handlePremiumFeature('premium_upgrade')}
            >
              Premium upgraden
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          👤 Mein Profil
        </Typography>
        <Box>
          {editMode ? (
            <Box>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{ mr: 1 }}
              >
                Speichern
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={() => setEditMode(false)}
              >
                Abbrechen
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditMode(true)}
            >
              Bearbeiten
            </Button>
          )}
        </Box>
      </Box>

      {editMode && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📝 Profil vervollständigen
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      )}

      {renderBasicInfo()}
      {renderPhotos()}
      {renderInterests()}
      {renderLifestyle()}
      {renderRelationshipGoals()}
      {renderPersonality()}
      {renderPremiumFeatures()}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />
    </Container>
  );
};

export default Profil;
