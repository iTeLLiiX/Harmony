import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import {
  MusicNote,
  SportsSoccer,
  Movie,
  Favorite,
  Security,
  Help,
  Star,
  TrendingUp,
  People,
  Chat,
  ArrowForward,
  CheckCircle,
  PlayArrow,
  Share,
  Download
} from '@mui/icons-material';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import { 
  PremiumButton, 
  PremiumCard, 
  FloatingActionButton,
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInFromRight,
  slideInFromLeft,
  ParallaxSection
} from '../components/animations/AdvancedAnimations';

const PremiumLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showHelp, setShowHelp] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegistrierung = () => {
    navigate('/registrierung');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Premium Features Data
  const premiumFeatures = [
    {
      icon: <MusicNote sx={{ fontSize: 40, color: '#C80026' }} />,
      title: 'Musik-Matching',
      description: 'Finde deine Seelenverwandte durch gemeinsame Musikgeschmäcker',
      stats: '95% Match-Rate'
    },
    {
      icon: <SportsSoccer sx={{ fontSize: 40, color: '#10B981' }} />,
      title: 'Sport-Interessen',
      description: 'Bundesliga, Fitness, Outdoor-Aktivitäten - finde dein Team',
      stats: '2.5M+ Aktive'
    },
    {
      icon: <Movie sx={{ fontSize: 40, color: '#3B82F6' }} />,
      title: 'Film-Präferenzen',
      description: 'Netflix & Chill? Tatort-Fan? Finde deine Kino-Partnerin',
      stats: '80% Erfolgsrate'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#8B5CF6' }} />,
      title: 'Sicherheit',
      description: 'DSGVO-konform, verifizierte Profile, sichere Chats',
      stats: '100% Sicher'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      age: 28,
      location: 'München',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      text: 'Durch Harmony habe ich meinen Traummann gefunden! Die Musik-Matching Funktion ist genial.',
      rating: 5
    },
    {
      name: 'Max K.',
      age: 32,
      location: 'Berlin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'Endlich eine Dating-App, die auf Persönlichkeit setzt statt nur auf Aussehen.',
      rating: 5
    },
    {
      name: 'Lisa R.',
      age: 25,
      location: 'Hamburg',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      text: 'Die Sicherheitsfeatures geben mir ein gutes Gefühl. Sehr empfehlenswert!',
      rating: 5
    }
  ];

  const stats = [
    { number: '50.000+', label: 'Downloads', icon: <Download /> },
    { number: '95%', label: 'Match-Rate', icon: <Favorite /> },
    { number: '2.5M+', label: 'Aktive Nutzer', icon: <People /> },
    { number: '4.8★', label: 'App Store Rating', icon: <Star /> }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Floating Help Button */}
      <FloatingActionButton onClick={() => setShowHelp(true)}>
        <Help />
      </FloatingActionButton>

      {/* Hero Section with Advanced Parallax */}
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
        {/* Animated Background Elements */}
        <motion.div
          style={{
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
        
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            zIndex: 2
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Logo size="large" color="white" />
                </motion.div>
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  textAlign: 'center',
                  mb: 4,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Finde deine große Liebe 💕
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography 
                variant="h5" 
                sx={{ 
                  textAlign: 'center',
                  mb: 6, 
                  maxWidth: 800, 
                  mx: 'auto',
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Die erste deutsche Dating-App, die auf Persönlichkeit und gemeinsame Interessen setzt. 
                Benutzerfreundlich für alle Altersgruppen (18-99 Jahre).
              </Typography>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp}>
              <Grid container spacing={4} sx={{ mb: 6 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {stat.number}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                mb: 8
              }}>
                <PremiumButton
                  variant="contained"
                  size="large"
                  onClick={handleRegistrierung}
                >
                  Jetzt kostenlos registrieren
                </PremiumButton>
                
                <PremiumButton
                  variant="outlined"
                  size="large"
                  onClick={handleLogin}
                >
                  Anmelden
                </PremiumButton>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <ParallaxSection>
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <motion.div variants={fadeInUp}>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center', 
                mb: 4,
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Warum Harmony? ✨
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                mb: 8,
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Wir verbinden Menschen durch gemeinsame Interessen, nicht nur durch Aussehen
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {premiumFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard hoverable gradient>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <Box sx={{ ml: 3 }}>
                          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                            {feature.title}
                          </Typography>
                          <Chip 
                            label={feature.stats} 
                            color="primary" 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </PremiumCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ParallaxSection>

      {/* Testimonials Section */}
      <ParallaxSection>
        <Box sx={{ bgcolor: 'grey.50', py: 12 }}>
          <Container maxWidth="lg">
            <motion.div variants={fadeInUp}>
              <Typography 
                variant="h2" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 8,
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Was unsere Nutzer sagen 💬
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PremiumCard>
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Avatar 
                            src={testimonial.avatar} 
                            sx={{ width: 60, height: 60, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {testimonial.age} • {testimonial.location}
                            </Typography>
                            <Box sx={{ display: 'flex', mt: 1 }}>
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} sx={{ fontSize: 16, color: '#FFD700' }} />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                          "{testimonial.text}"
                        </Typography>
                      </CardContent>
                    </PremiumCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </ParallaxSection>

      {/* Final CTA Section */}
      <ParallaxSection>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
          py: 12,
          color: 'white'
        }}>
          <Container maxWidth="lg">
            <motion.div variants={fadeInUp}>
              <Typography 
                variant="h2" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 4,
                  fontWeight: 700
                }}
              >
                Bereit für deine große Liebe? 🚀
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography 
                variant="h6" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 6,
                  opacity: 0.9,
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Schließe dich über 50.000 glücklichen Paaren an, die sich über Harmony gefunden haben
              </Typography>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box sx={{ textAlign: 'center' }}>
                <PremiumButton
                  variant="contained"
                  size="large"
                  onClick={handleRegistrierung}
                >
                  Jetzt kostenlos starten
                  <ArrowForward sx={{ ml: 1 }} />
                </PremiumButton>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </ParallaxSection>

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
                    🆘 Hilfe bei Harmony
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Registrierung:</strong> Einfach Handynummer eingeben und SMS-Code bestätigen
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Matching:</strong> Basierend auf Interessen, Musik, Sport und Persönlichkeit
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Sicherheit:</strong> Alle Daten DSGVO-konform und verschlüsselt gespeichert
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setShowHelp(false)}
                  >
                    Verstanden
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PremiumLandingPage;
