import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  TrendingUp,
  Favorite,
  Message,
  Visibility,
  People,
  Help,
  Close,
  Star,
  LocationOn,
  MusicNote,
  SportsSoccer,
  Movie
} from '@mui/icons-material';

interface AnalyticsData {
  profileViews: number;
  likesReceived: number;
  matches: number;
  messages: number;
  responseRate: number;
  topInterests: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  weeklyStats: Array<{
    day: string;
    views: number;
    likes: number;
  }>;
  ageGroups: Array<{
    range: string;
    count: number;
  }>;
  locations: Array<{
    city: string;
    count: number;
  }>;
}

const Analytics: React.FC = () => {
  const theme = useTheme();
  const [showHelp, setShowHelp] = useState(false);

  const [analyticsData] = useState<AnalyticsData>({
    profileViews: 247,
    likesReceived: 89,
    matches: 23,
    messages: 156,
    responseRate: 78,
    topInterests: [
      { name: 'Musik', count: 45, percentage: 32 },
      { name: 'Sport', count: 38, percentage: 27 },
      { name: 'Filme', count: 29, percentage: 21 },
      { name: 'Reisen', count: 18, percentage: 13 },
      { name: 'Kochen', count: 12, percentage: 7 }
    ],
    weeklyStats: [
      { day: 'Mo', views: 12, likes: 8 },
      { day: 'Di', views: 18, likes: 12 },
      { day: 'Mi', views: 15, likes: 9 },
      { day: 'Do', views: 22, likes: 15 },
      { day: 'Fr', views: 28, likes: 18 },
      { day: 'Sa', views: 35, likes: 22 },
      { day: 'So', views: 31, likes: 19 }
    ],
    ageGroups: [
      { range: '18-25', count: 45 },
      { range: '26-35', count: 78 },
      { range: '36-45', count: 52 },
      { range: '46-55', count: 23 },
      { range: '56+', count: 8 }
    ],
    locations: [
      { city: 'München', count: 89 },
      { city: 'Berlin', count: 45 },
      { city: 'Hamburg', count: 32 },
      { city: 'Köln', count: 28 },
      { city: 'Frankfurt', count: 15 }
    ]
  });

  const getInterestIcon = (interest: string) => {
    switch (interest.toLowerCase()) {
      case 'musik':
        return <MusicNote />;
      case 'sport':
        return <SportsSoccer />;
      case 'filme':
        return <Movie />;
      default:
        return <Favorite />;
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest.toLowerCase()) {
      case 'musik':
        return 'primary.main';
      case 'sport':
        return 'success.main';
      case 'filme':
        return 'error.main';
      default:
        return 'grey.500';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 2 }}>
          📊 Deine Analytics
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Verstehe deine Performance und optimiere dein Profil
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Visibility sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {analyticsData.profileViews}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Profil-Aufrufe
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Favorite sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {analyticsData.likesReceived}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Likes erhalten
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <People sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {analyticsData.matches}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Matches
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Message sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {analyticsData.messages}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nachrichten
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Response Rate */}
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              📈 Antwortrate
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>
                {analyticsData.responseRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={analyticsData.responseRate}
                sx={{ flexGrow: 1, height: 20, borderRadius: 10 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Deine Antwortrate ist {analyticsData.responseRate > 70 ? 'sehr gut' : 'gut'}! 
              {analyticsData.responseRate > 70 ? ' Weiter so!' : ' Versuche schneller zu antworten.'}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Top Interests */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  🎯 Beliebte Interessen
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Diese Interessen ziehen die meisten Likes an
                </Typography>
                
                <List>
                  {analyticsData.topInterests.map((interest, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getInterestIcon(interest.name)}
                      </ListItemIcon>
                      <ListItemText
                        primary={interest.name}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={interest.percentage}
                              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {interest.count} ({interest.percentage}%)
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Weekly Stats */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  📅 Wöchentliche Aktivität
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Deine Aktivität in der letzten Woche
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {analyticsData.weeklyStats.map((stat, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{stat.day}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.views} Aufrufe, {stat.likes} Likes
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(stat.views / 35) * 100}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Age Groups */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  👥 Altersgruppen
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Wer interessiert sich für dich?
                </Typography>
                
                <List>
                  {analyticsData.ageGroups.map((group, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${group.range} Jahre`}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(group.count / 78) * 100}
                              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {group.count}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Locations */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  📍 Standorte
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Aus welchen Städten kommen deine Matches?
                </Typography>
                
                <List>
                  {analyticsData.locations.map((location, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText
                        primary={location.city}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(location.count / 89) * 100}
                              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {location.count}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tips */}
        <Card sx={{ mt: 6, bgcolor: 'primary.50' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              💡 Optimierungs-Tipps
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Star sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="h6">Profil verbessern</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  • Füge mehr Fotos hinzu<br/>
                  • Schreibe eine aussagekräftige Bio<br/>
                  • Aktualisiere deine Interessen
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="h6">Aktivität steigern</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  • Logge dich täglich ein<br/>
                  • Antworte schneller auf Nachrichten<br/>
                  • Nutze die Super Like Funktion
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ color: 'info.main', mr: 1 }} />
                  <Typography variant="h6">Mehr Matches</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  • Erweitere deine Suchkriterien<br/>
                  • Nutze Premium-Features<br/>
                  • Sei offen für neue Menschen
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

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

        {/* Help Dialog */}
        <Dialog open={showHelp} onClose={() => setShowHelp(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">🆘 Hilfe zu Analytics</Typography>
              <IconButton onClick={() => setShowHelp(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              <strong>Profil-Aufrufe:</strong><br/>
              Wie oft dein Profil von anderen Nutzern angeschaut wurde.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Likes erhalten:</strong><br/>
              Anzahl der Likes, die du von anderen Nutzern erhalten hast.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Antwortrate:</strong><br/>
              Wie schnell du auf Nachrichten antwortest. Eine hohe Rate führt zu mehr Matches.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Beliebte Interessen:</strong><br/>
              Diese Interessen ziehen die meisten Likes an. Fokussiere dich darauf!
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

export default Analytics;
