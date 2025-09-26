import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Divider,
  Alert
} from '@mui/material';
import {
  Close,
  Favorite,
  Star,
  Help,
  FilterList,
  LocationOn,
  MusicNote,
  Sports,
  Movie,
  Palette
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PremiumButton, 
  PremiumCard, 
  fadeInUp,
  staggerContainer,
  scaleIn
} from '../components/animations/AdvancedAnimations';

interface Person {
  id: string;
  name: string;
  alter: number;
  entfernung: number;
  bild: string;
  bio: string;
  interessen: string[];
  matchScore: number;
  letzteAktivitaet: string;
}

const Matching: React.FC = () => {
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [alterRange, setAlterRange] = useState<number[]>([18, 35]);
  const [entfernungRange, setEntfernungRange] = useState<number[]>([0, 50]);
  const [selectedInteressen, setSelectedInteressen] = useState<string[]>([]);

  // Demo Daten
  const demoPersonen: Person[] = [
    {
      id: '1',
      name: 'Sarah',
      alter: 28,
      entfernung: 5,
      bild: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'Liebe Musik, Reisen und gutes Essen. Suche jemanden für gemeinsame Abenteuer!',
      interessen: ['Musik', 'Reisen', 'Kochen', 'Fotografie'],
      matchScore: 85,
      letzteAktivitaet: 'vor 2 Stunden'
    },
    {
      id: '2',
      name: 'Max',
      alter: 32,
      entfernung: 12,
      bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Sportbegeistert und naturverbunden. Gerne wandern, klettern und neue Leute kennenlernen.',
      interessen: ['Sport', 'Natur', 'Wandern', 'Fitness'],
      matchScore: 72,
      letzteAktivitaet: 'vor 1 Stunde'
    }
  ];

  useEffect(() => {
    // Lade erste Person
    if (demoPersonen.length > 0) {
      setCurrentPerson(demoPersonen[0]);
    }
  }, []);

  const handleLike = () => {
    console.log('Liked:', currentPerson?.name);
    // Hier würde die Like-Logik implementiert
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Nächste Person laden
      const currentIndex = demoPersonen.findIndex(p => p.id === currentPerson?.id);
      const nextIndex = (currentIndex + 1) % demoPersonen.length;
      setCurrentPerson(demoPersonen[nextIndex]);
    }, 1000);
  };

  const handleDislike = () => {
    console.log('Disliked:', currentPerson?.name);
    // Hier würde die Dislike-Logik implementiert
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Nächste Person laden
      const currentIndex = demoPersonen.findIndex(p => p.id === currentPerson?.id);
      const nextIndex = (currentIndex + 1) % demoPersonen.length;
      setCurrentPerson(demoPersonen[nextIndex]);
    }, 1000);
  };

  const handleSuperLike = () => {
    console.log('Super Liked:', currentPerson?.name);
    // Hier würde die Super Like-Logik implementiert
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Nächste Person laden
      const currentIndex = demoPersonen.findIndex(p => p.id === currentPerson?.id);
      const nextIndex = (currentIndex + 1) % demoPersonen.length;
      setCurrentPerson(demoPersonen[nextIndex]);
    }, 1000);
  };

  const getInteresseIcon = (interesse: string) => {
    switch (interesse.toLowerCase()) {
      case 'musik':
        return <MusicNote />;
      case 'sport':
        return <Sports />;
      case 'filme':
        return <Movie />;
      case 'kunst':
        return <Palette />;
      default:
        return <Favorite />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Hilfe-Button */}
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

      <Container maxWidth="sm" sx={{ py: 2, position: 'relative', zIndex: 2 }}>
        {/* Filter Button */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="white">
            Entdecke neue Menschen
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setShowFilters(true)}
            sx={{ color: 'white', borderColor: 'white' }}
            startIcon={<FilterList />}
          >
            Filter
          </Button>
        </Box>

        {/* Person Card */}
        <AnimatePresence mode="wait">
          {currentPerson && (
            <motion.div
              key={currentPerson.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  position: 'relative'
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image={currentPerson.bild}
                  alt={currentPerson.name}
                  sx={{ objectFit: 'cover' }}
                />

                {/* Info Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: 'white',
                    p: 3
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    {currentPerson.name}, {currentPerson.alter}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body1">
                      {currentPerson.entfernung} km entfernt
                    </Typography>
                  </Box>

                  <Typography variant="body1" paragraph>
                    {currentPerson.bio}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {currentPerson.interessen.map((interesse, index) => (
                      <Chip
                        key={index}
                        icon={getInteresseIcon(interesse)}
                        label={interesse}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          '& .MuiChip-icon': { color: 'white' }
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">
                      Match-Score: {currentPerson.matchScore}%
                    </Typography>
                    <Typography variant="body2">
                      Aktiv {currentPerson.letzteAktivitaet}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4, mt: 3 }}>
          {/* Dislike Button */}
          <IconButton
            onClick={handleDislike}
            disabled={loading}
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              width: 64,
              height: 64,
              '&:hover': {
                bgcolor: 'error.dark',
                transform: 'scale(1.1)'
              }
            }}
          >
            <Close sx={{ fontSize: 32 }} />
          </IconButton>

          {/* Super Like Button */}
          <IconButton
            onClick={handleSuperLike}
            disabled={loading}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 64,
              height: 64,
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.1)'
              }
            }}
          >
            <Star sx={{ fontSize: 32 }} />
          </IconButton>

          {/* Like Button */}
          <IconButton
            onClick={handleLike}
            disabled={loading}
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              width: 64,
              height: 64,
              '&:hover': {
                bgcolor: 'success.dark',
                transform: 'scale(1.1)'
              }
            }}
          >
            <Favorite sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>

        {/* Text Buttons für bessere Benutzerfreundlichkeit */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDislike}
            startIcon={<Close />}
            sx={{ minWidth: 120 }}
          >
            Ablehnen
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSuperLike}
            startIcon={<Star />}
            sx={{ minWidth: 120 }}
          >
            Super Like
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleLike}
            startIcon={<Favorite />}
            sx={{ minWidth: 120 }}
          >
            Liken
          </Button>
        </Box>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="white">
              Wird verarbeitet...
            </Typography>
          </Box>
        )}
      </Container>

      {/* Filter Dialog */}
      <Dialog open={showFilters} onClose={() => setShowFilters(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Filter anpassen</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography gutterBottom>Alter</Typography>
              <Slider
                value={alterRange}
                onChange={(_, newValue) => setAlterRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={18}
                max={99}
                step={1}
              />
              <Typography variant="body2" color="text.secondary">
                {alterRange[0]} - {alterRange[1]} Jahre
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Entfernung</Typography>
              <Slider
                value={entfernungRange}
                onChange={(_, newValue) => setEntfernungRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={5}
              />
              <Typography variant="body2" color="text.secondary">
                {entfernungRange[0]} - {entfernungRange[1]} km
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Interessen</InputLabel>
                <Select
                  multiple
                  value={selectedInteressen}
                  onChange={(e) => setSelectedInteressen(e.target.value as string[])}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Musik">Musik</MenuItem>
                  <MenuItem value="Sport">Sport</MenuItem>
                  <MenuItem value="Reisen">Reisen</MenuItem>
                  <MenuItem value="Kochen">Kochen</MenuItem>
                  <MenuItem value="Filme">Filme</MenuItem>
                  <MenuItem value="Lesen">Lesen</MenuItem>
                  <MenuItem value="Fotografie">Fotografie</MenuItem>
                  <MenuItem value="Kunst">Kunst</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFilters(false)}>Abbrechen</Button>
          <Button variant="contained" onClick={() => setShowFilters(false)}>
            Filter anwenden
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hilfe Dialog */}
      <Dialog open={showHelp} onClose={() => setShowHelp(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Hilfe beim Matching</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            <strong>So funktioniert das Matching:</strong>
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" paragraph>
              <strong>❤️ Liken:</strong> Zeige Interesse an dieser Person
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>⭐ Super Like:</strong> Besonderes Interesse - diese Person wird dich zuerst sehen
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>❌ Ablehnen:</strong> Kein Interesse - diese Person wird nicht mehr angezeigt
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" paragraph>
            <strong>Tipps für bessere Matches:</strong>
          </Typography>
          
          <Typography variant="body2" paragraph>
            • Vervollständige dein Profil mit ehrlichen Informationen
          </Typography>
          <Typography variant="body2" paragraph>
            • Lade mehrere Fotos hoch, die dich gut zeigen
          </Typography>
          <Typography variant="body2" paragraph>
            • Beschreibe deine Interessen und Hobbys detailliert
          </Typography>
          <Typography variant="body2" paragraph>
            • Nutze die Filter, um passende Personen zu finden
          </Typography>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Match-Score:</strong> Je höher der Score, desto besser passen eure Interessen zusammen!
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setShowHelp(false)} fullWidth>
            Verstanden
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Matching;