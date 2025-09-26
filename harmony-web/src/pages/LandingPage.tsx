import React, { useState } from 'react';
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
  useTheme
} from '@mui/material';
import {
  MusicNote,
  SportsSoccer,
  Movie,
  Favorite,
  Security,
  Help
} from '@mui/icons-material';
import Logo from '../components/Logo';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showHelp, setShowHelp] = useState(false);

  const handleRegistrierung = () => {
    navigate('/registrierung');
  };

  const features = [
    {
      icon: <MusicNote sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      title: 'Musik-Matching',
      description: 'Finde Menschen mit ähnlichem Musikgeschmack. Spotify & Apple Music Integration.',
      details: ['Lieblingskünstler teilen', 'Gemeinsame Playlists', 'Konzert-Interesse', 'Deutsche vs. internationale Musik']
    },
    {
      icon: <SportsSoccer sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      title: 'Sport & Hobbys',
      description: 'Entdecke gemeinsame Interessen in Sport und Freizeitaktivitäten.',
      details: ['Bundesliga-Vereine', 'Fitness-Level', 'Outdoor vs. Indoor', 'Gemeinsame Aktivitäten']
    },
    {
      icon: <Movie sx={{ fontSize: 48, color: theme.palette.error.main }} />,
      title: 'Film & Serien',
      description: 'Teile deine Lieblingsfilme und -serien. Inklusive deutsche Serien wie Tatort!',
      details: ['Netflix & Amazon Prime', 'Tatort schauen', 'Kino-Dates', 'Gemeinsame Filmabende']
    },
    {
      icon: <Favorite sx={{ fontSize: 48, color: theme.palette.success.main }} />,
      title: 'Intelligentes Matching',
      description: 'Unser Algorithmus findet die perfekten Matches basierend auf echten Interessen.',
      details: ['Interesse-basiert', 'Altersgruppen-übergreifend', 'Lokale Suche', 'Match-Erklärungen']
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hilfe-Button (immer sichtbar) */}
      <IconButton
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          bgcolor: 'primary.main',
          color: 'white',
          zIndex: 1000,
          '&:hover': {
            bgcolor: 'primary.dark',
          }
        }}
        onClick={() => setShowHelp(true)}
        aria-label="Hilfe"
      >
        <Help />
      </IconButton>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #C80026 0%, #8B0000 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ mb: 4 }}>
            <Logo size="large" color="white" />
          </Box>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 4 }}>
            Wir stehen für Liebe. 💕
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
            Finde deine große Liebe basierend auf Persönlichkeit und gemeinsamen Interessen. 
            Benutzerfreundlich für alle Altersgruppen (18-99 Jahre).
          </Typography>
          
          {/* Social Proof wie bei Boo */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
              50.000+ Downloads
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Jetzt beitreten
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleRegistrierung}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '18px',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              Jetzt kostenlos registrieren
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '18px',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              Anmelden
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Interessen-Universen wie bei Boo */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          Entdecke deine Interessen-Universen
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Finde Menschen mit ähnlichen Leidenschaften und Hobbys
        </Typography>
        
        {/* Universen Grid */}
        <Grid container spacing={2} sx={{ mb: 8 }}>
          {[
            { name: '#music', count: '11 Mio. Seelen', color: '#FF6B6B' },
            { name: '#gaming', count: '9,8 Mio. Seelen', color: '#4ECDC4' },
            { name: '#movies', count: '8,4 Mio. Seelen', color: '#45B7D1' },
            { name: '#anime', count: '6,9 Mio. Seelen', color: '#96CEB4' },
            { name: '#food', count: '6,6 Mio. Seelen', color: '#FFEAA7' },
            { name: '#memes', count: '4,5 Mio. Seelen', color: '#DDA0DD' },
            { name: '#outdoors', count: '4 Mio. Seelen', color: '#98D8C8' },
            { name: '#technology', count: '2,9 Mio. Seelen', color: '#F7DC6F' },
            { name: '#art', count: '2,8 Mio. Seelen', color: '#BB8FCE' },
            { name: '#animals', count: '2,8 Mio. Seelen', color: '#85C1E9' },
            { name: '#books', count: '2,7 Mio. Seelen', color: '#F8C471' },
            { name: '#learning', count: '2,3 Mio. Seelen', color: '#82E0AA' }
          ].map((universe, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Card
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${universe.color}`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    bgcolor: `${universe.color}10`
                  }
                }}
              >
                <Typography variant="h6" sx={{ color: universe.color, fontWeight: 'bold' }}>
                  {universe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {universe.count}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
          Warum Harmony?
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Wir machen Dating einfach und erfolgreich für alle Altersgruppen
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {feature.details.map((detail, detailIndex) => (
                      <Typography
                        key={detailIndex}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Deutsche Besonderheiten */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
            🇩🇪 Für deutsche Nutzer gemacht
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tatort-Fans
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Finde andere Tatort-Liebhaber für gemütliche Sonntagabende
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Bundesliga
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teile deine Liebe zu deinem Verein und finde Gleichgesinnte
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  DSGVO-konform
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Deutsche Server, Datenschutz und Sicherheit haben Priorität
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Bereit für dein erstes Match?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Registriere dich kostenlos und finde Menschen mit ähnlichen Interessen
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleRegistrierung}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 6,
              py: 2,
              fontSize: '18px',
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Jetzt starten
          </Button>
        </Container>
      </Box>

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
          <Card
            sx={{ maxWidth: 500, m: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                🆘 Hilfe & Support
              </Typography>
              <Typography variant="body1" paragraph>
                Brauchst du Hilfe bei der Registrierung oder hast Fragen zur App?
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => {
                    window.open('mailto:support@harmony-dating.de', '_blank');
                    setShowHelp(false);
                  }}
                >
                  📧 Email Support
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setShowHelp(false)}
                >
                  Schließen
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default LandingPage;
