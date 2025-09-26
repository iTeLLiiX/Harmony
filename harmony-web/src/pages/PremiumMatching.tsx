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
  Alert,
  Stack,
  Badge,
  Tooltip
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
  Palette,
  Psychology,
  TrendingUp,
  Verified,
  MoreVert,
  Share,
  Report
} from '@mui/icons-material';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  age: number;
  distance: number;
  image: string;
  bio: string;
  interests: string[];
  matchScore: number;
  lastActive: string;
  verified: boolean;
  personalityType: string;
  musicGenres: string[];
  sports: string[];
  movies: string[];
  lifestyle: {
    smoking: string;
    drinking: string;
    kids: string;
    pets: string;
  };
}

const PremiumMatching: React.FC = () => {
  const navigate = useNavigate();
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState(false);

  // Advanced swipe controls
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const controls = useAnimation();

  // Filter States
  const [ageRange, setAgeRange] = useState<number[]>([18, 35]);
  const [distanceRange, setDistanceRange] = useState<number[]>([0, 50]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [personalityFilter, setPersonalityFilter] = useState<string>('');

  // Demo Data with Enhanced Profiles
  const demoPeople: Person[] = [
    {
      id: '1',
      name: 'Sarah',
      age: 28,
      distance: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      bio: 'Liebe Musik, Reisen und gutes Essen. Suche jemanden für gemeinsame Abenteuer! Ich bin sehr aktiv und liebe es, neue Orte zu entdecken.',
      interests: ['Musik', 'Reisen', 'Kochen', 'Fotografie', 'Yoga'],
      matchScore: 95,
      lastActive: 'vor 2 Stunden',
      verified: true,
      personalityType: 'ENFP',
      musicGenres: ['Pop', 'Indie', 'Jazz'],
      sports: ['Yoga', 'Wandern', 'Tennis'],
      movies: ['Romantik', 'Drama', 'Komödie'],
      lifestyle: {
        smoking: 'nie',
        drinking: 'gelegentlich',
        kids: 'ja',
        pets: 'ja'
      }
    },
    {
      id: '2',
      name: 'Max',
      age: 32,
      distance: 12,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Sportbegeistert und naturverbunden. Gerne wandern, klettern und neue Leute kennenlernen. Ich bin sehr offen und kommunikativ.',
      interests: ['Sport', 'Natur', 'Wandern', 'Fitness', 'Gaming'],
      matchScore: 87,
      lastActive: 'vor 1 Stunde',
      verified: true,
      personalityType: 'ESTP',
      musicGenres: ['Rock', 'Electronic', 'Hip-Hop'],
      sports: ['Klettern', 'Fußball', 'Fitness'],
      movies: ['Action', 'Thriller', 'Sci-Fi'],
      lifestyle: {
        smoking: 'nie',
        drinking: 'gelegentlich',
        kids: 'unsicher',
        pets: 'ja'
      }
    },
    {
      id: '3',
      name: 'Lisa',
      age: 26,
      distance: 8,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Kreativ und künstlerisch veranlagt. Liebe es zu malen, zu lesen und neue Kulturen zu entdecken. Suche nach einer tiefen Verbindung.',
      interests: ['Kunst', 'Lesen', 'Malen', 'Kino', 'Museen'],
      matchScore: 92,
      lastActive: 'vor 30 Minuten',
      verified: false,
      personalityType: 'INFP',
      musicGenres: ['Klassik', 'Indie', 'Folk'],
      sports: ['Yoga', 'Tanzen'],
      movies: ['Drama', 'Arthouse', 'Dokumentation'],
      lifestyle: {
        smoking: 'nie',
        drinking: 'selten',
        kids: 'ja',
        pets: 'nein'
      }
    }
  ];

  useEffect(() => {
    if (demoPeople.length > 0) {
      setCurrentPerson(demoPeople[0]);
    }
  }, []);

  const handleSwipe = async (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setLoading(true);

    // Animate card out
    await controls.start({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
      rotate: direction === 'right' ? 30 : -30,
      transition: { duration: 0.3 }
    });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSwipeDirection(null);
      
      // Check for match
      if (direction === 'right' && currentPerson && currentPerson.matchScore > 90) {
        setShowMatchDialog(true);
      }

      // Load next person
      const currentIndex = demoPeople.findIndex(p => p.id === currentPerson?.id);
      const nextIndex = (currentIndex + 1) % demoPeople.length;
      setCurrentPerson(demoPeople[nextIndex]);
      
      // Reset animation
      controls.start({ x: 0, opacity: 1, rotate: 0 });
    }, 1000);
  };

  const handleLike = () => handleSwipe('right');
  const handleDislike = () => handleSwipe('left');
  const handleSuperLike = () => handleSwipe('right');

  const getInterestIcon = (interest: string) => {
    switch (interest.toLowerCase()) {
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

  const getPersonalityColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'ENFP': '#FF6B6B',
      'ESTP': '#4ECDC4',
      'INFP': '#45B7D1',
      'INTJ': '#96CEB4',
      'ENFJ': '#FFEAA7',
      'ISTJ': '#DDA0DD'
    };
    return colors[type] || '#C80026';
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

      <Container maxWidth="sm" sx={{ py: 2, position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" color="white" sx={{ fontWeight: 700 }}>
            Entdecke neue Menschen ✨
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setShowFilters(true)}
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              borderRadius: 3,
              px: 3,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.05)'
              }
            }}
            startIcon={<FilterList />}
          >
            Filter
          </Button>
        </Box>

        {/* Person Card with Advanced Animations */}
        <AnimatePresence mode="wait">
          {currentPerson && (
            <motion.div
              key={currentPerson.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) {
                  handleLike();
                } else if (info.offset.x < -100) {
                  handleDislike();
                }
              }}
              style={{ x, y, rotate }}
            >
              <PremiumCard hoverable>
                <CardMedia
                  component="img"
                  height="500"
                  image={currentPerson.image}
                  alt={currentPerson.name}
                  sx={{ objectFit: 'cover' }}
                />

                {/* Enhanced Info Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    color: 'white',
                    p: 4
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mr: 2 }}>
                      {currentPerson.name}, {currentPerson.age}
                    </Typography>
                    {currentPerson.verified && (
                      <Tooltip title="Verifiziert">
                        <Verified sx={{ color: '#10B981', fontSize: 24 }} />
                      </Tooltip>
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body1">
                      {currentPerson.distance} km entfernt
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#10B981' }}>
                        {currentPerson.matchScore}%
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    {currentPerson.bio}
                  </Typography>

                  {/* Personality Badge */}
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<Psychology />}
                      label={`${currentPerson.personalityType} - ${currentPerson.personalityType === 'ENFP' ? 'Der Aktivist' : 'Persönlichkeitstyp'}`}
                      sx={{
                        bgcolor: getPersonalityColor(currentPerson.personalityType),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  {/* Interests */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {currentPerson.interests.map((interest, index) => (
                      <Chip
                        key={index}
                        icon={getInterestIcon(interest)}
                        label={interest}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          '& .MuiChip-icon': { color: 'white' }
                        }}
                      />
                    ))}
                  </Box>

                  {/* Lifestyle Info */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Aktiv {currentPerson.lastActive}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: 'white' }}>
                        <Share />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'white' }}>
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </PremiumCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4, mt: 4 }}>
          {/* Dislike Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
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
                  boxShadow: '0 8px 25px rgba(244, 67, 54, 0.4)'
                }
              }}
            >
              <Close sx={{ fontSize: 32 }} />
            </IconButton>
          </motion.div>

          {/* Super Like Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={handleSuperLike}
              disabled={loading}
              sx={{
                bgcolor: 'info.main',
                color: 'white',
                width: 64,
                height: 64,
                '&:hover': {
                  bgcolor: 'info.dark',
                  boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
                }
              }}
            >
              <Star sx={{ fontSize: 32 }} />
            </IconButton>
          </motion.div>

          {/* Like Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
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
                  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
                }
              }}
            >
              <Favorite sx={{ fontSize: 32 }} />
            </IconButton>
          </motion.div>
        </Box>

        {/* Text Buttons for Better UX */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <PremiumButton
            variant="outlined"
            onClick={handleDislike}
            size="medium"
          >
            Ablehnen
          </PremiumButton>
          <PremiumButton
            variant="outlined"
            onClick={handleSuperLike}
            size="medium"
          >
            Super Like
          </PremiumButton>
          <PremiumButton
            variant="contained"
            onClick={handleLike}
            size="medium"
          >
            Liken
          </PremiumButton>
        </Box>

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', marginTop: 16 }}
          >
            <Typography variant="body2" color="white">
              Wird verarbeitet...
            </Typography>
          </motion.div>
        )}
      </Container>

      {/* Match Dialog */}
      <Dialog open={showMatchDialog} onClose={() => setShowMatchDialog(false)} maxWidth="sm" fullWidth>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <DialogTitle sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" sx={{ color: '#C80026', fontWeight: 700 }}>
              🎉 Es ist ein Match!
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Du und {currentPerson?.name} haben euch gegenseitig geliked!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Startet jetzt ein Gespräch und lernt euch besser kennen.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
            <PremiumButton
              variant="contained"
              onClick={() => {
                setShowMatchDialog(false);
                navigate('/chat');
              }}
            >
              Nachricht senden
            </PremiumButton>
          </DialogActions>
        </motion.div>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={showHelp} onClose={() => setShowHelp(false)} maxWidth="sm" fullWidth>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
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
            <PremiumButton variant="contained" onClick={() => setShowHelp(false)} fullWidth>
              Verstanden
            </PremiumButton>
          </DialogActions>
        </motion.div>
      </Dialog>
    </Box>
  );
};

export default PremiumMatching;
