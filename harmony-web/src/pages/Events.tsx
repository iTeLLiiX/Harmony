import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add,
  LocationOn,
  CalendarToday,
  People,
  Favorite,
  Share,
  Help,
  Close,
  Event,
  MusicNote,
  SportsSoccer,
  Movie,
  Restaurant,
  Hiking
} from '@mui/icons-material';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  price: number;
  organizer: {
    name: string;
    avatar: string;
  };
  attendeesList: Array<{
    name: string;
    avatar: string;
  }>;
  isAttending: boolean;
  isOrganizedByMe: boolean;
}

const Events: React.FC = () => {
  const theme = useTheme();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Konzert am Samstag',
      description: 'Gemeinsam zu einem Indie-Konzert in der Olympiahalle. Perfekt für Musikliebhaber!',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      location: 'Olympiahalle, München',
      category: 'Musik',
      attendees: 8,
      maxAttendees: 12,
      price: 25,
      organizer: {
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
      },
      attendeesList: [
        { name: 'Max', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'Anna', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' }
      ],
      isAttending: false,
      isOrganizedByMe: false
    },
    {
      id: '2',
      title: 'Bundesliga-Spiel',
      description: 'FC Bayern vs. Borussia Dortmund - gemeinsam das Spiel schauen in der Sportsbar.',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
      location: 'Sportsbar München',
      category: 'Sport',
      attendees: 15,
      maxAttendees: 20,
      price: 0,
      organizer: {
        name: 'Tom',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      },
      attendeesList: [
        { name: 'Lisa', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
        { name: 'Paul', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
      ],
      isAttending: true,
      isOrganizedByMe: false
    },
    {
      id: '3',
      title: 'Kochkurs für Anfänger',
      description: 'Lerne die Grundlagen des Kochens in einem entspannten Ambiente.',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      location: 'Kochschule München',
      category: 'Kochen',
      attendees: 6,
      maxAttendees: 10,
      price: 45,
      organizer: {
        name: 'Du',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
      },
      attendeesList: [],
      isAttending: true,
      isOrganizedByMe: true
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'musik':
        return <MusicNote />;
      case 'sport':
        return <SportsSoccer />;
      case 'film':
        return <Movie />;
      case 'kochen':
        return <Restaurant />;
      case 'outdoor':
        return <Hiking />;
      default:
        return <Event />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'musik':
        return 'primary.main';
      case 'sport':
        return 'success.main';
      case 'film':
        return 'error.main';
      case 'kochen':
        return 'warning.main';
      case 'outdoor':
        return 'info.main';
      default:
        return 'grey.500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAttendEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isAttending: !event.isAttending, attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 }
        : event
    ));
  };

  const handleCreateEvent = () => {
    // Event creation logic would go here
    setShowCreateEvent(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h2" component="h1" gutterBottom>
              📅 Events & Treffen
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Entdecke lokale Events und triff neue Menschen
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => setShowCreateEvent(true)}
            sx={{ px: 4, py: 2 }}
          >
            Event erstellen
          </Button>
        </Box>

        {/* Filter */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Kategorie</InputLabel>
                <Select defaultValue="alle">
                  <MenuItem value="alle">Alle Kategorien</MenuItem>
                  <MenuItem value="musik">Musik</MenuItem>
                  <MenuItem value="sport">Sport</MenuItem>
                  <MenuItem value="film">Film</MenuItem>
                  <MenuItem value="kochen">Kochen</MenuItem>
                  <MenuItem value="outdoor">Outdoor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Datum</InputLabel>
                <Select defaultValue="alle">
                  <MenuItem value="alle">Alle Termine</MenuItem>
                  <MenuItem value="heute">Heute</MenuItem>
                  <MenuItem value="woche">Diese Woche</MenuItem>
                  <MenuItem value="monat">Dieser Monat</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Preis</InputLabel>
                <Select defaultValue="alle">
                  <MenuItem value="alle">Alle Preise</MenuItem>
                  <MenuItem value="kostenlos">Kostenlos</MenuItem>
                  <MenuItem value="bis20">Bis 20€</MenuItem>
                  <MenuItem value="bis50">Bis 50€</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth sx={{ height: '56px' }}>
                Filter anwenden
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
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
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Event Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getCategoryIcon(event.category)}
                      <Chip
                        label={event.category}
                        size="small"
                        sx={{ bgcolor: getCategoryColor(event.category), color: 'white' }}
                      />
                    </Box>
                    <Chip
                      label={event.price === 0 ? 'Kostenlos' : `€${event.price}`}
                      color={event.price === 0 ? 'success' : 'primary'}
                      size="small"
                    />
                  </Box>

                  {/* Event Title */}
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>

                  {/* Event Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.description}
                  </Typography>

                  {/* Event Details */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarToday sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(event.date)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <People sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.attendees}/{event.maxAttendees} Teilnehmer
                      </Typography>
                    </Box>
                  </Box>

                  {/* Organizer */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={event.organizer.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Organisiert von {event.organizer.name}
                    </Typography>
                  </Box>

                  {/* Attendees Preview */}
                  {event.attendeesList.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Teilnehmer:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {event.attendeesList.slice(0, 3).map((attendee, index) => (
                          <Avatar key={index} src={attendee.avatar} sx={{ width: 32, height: 32 }} />
                        ))}
                        {event.attendeesList.length > 3 && (
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>
                            +{event.attendeesList.length - 3}
                          </Avatar>
                        )}
                      </Box>
                    </Box>
                  )}
                </CardContent>

                {/* Event Actions */}
                <Box sx={{ p: 3, pt: 0 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        variant={event.isAttending ? 'outlined' : 'contained'}
                        fullWidth
                        onClick={() => handleAttendEvent(event.id)}
                        disabled={event.isOrganizedByMe}
                      >
                        {event.isAttending ? 'Abmelden' : 'Teilnehmen'}
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton
                        color="primary"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <Favorite />
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton color="primary">
                        <Share />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Create Event Dialog */}
        <Dialog open={showCreateEvent} onClose={() => setShowCreateEvent(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">🎉 Neues Event erstellen</Typography>
              <IconButton onClick={() => setShowCreateEvent(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event-Titel"
                  placeholder="z.B. Konzert am Samstag"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Beschreibung"
                  placeholder="Beschreibe dein Event..."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Datum & Uhrzeit"
                  type="datetime-local"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Kategorie</InputLabel>
                  <Select>
                    <MenuItem value="musik">Musik</MenuItem>
                    <MenuItem value="sport">Sport</MenuItem>
                    <MenuItem value="film">Film</MenuItem>
                    <MenuItem value="kochen">Kochen</MenuItem>
                    <MenuItem value="outdoor">Outdoor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ort"
                  placeholder="z.B. Olympiahalle, München"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Max. Teilnehmer"
                  type="number"
                  defaultValue={10}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preis (€)"
                  type="number"
                  defaultValue={0}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowCreateEvent(false)}>Abbrechen</Button>
            <Button variant="contained" onClick={handleCreateEvent}>
              Event erstellen
            </Button>
          </DialogActions>
        </Dialog>

        {/* Event Details Dialog */}
        <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} maxWidth="sm" fullWidth>
          {selectedEvent && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{selectedEvent.title}</Typography>
                  <IconButton onClick={() => setSelectedEvent(null)}>
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1" paragraph>
                  {selectedEvent.description}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Teilnehmer ({selectedEvent.attendees})</Typography>
                  <List>
                    {selectedEvent.attendeesList.map((attendee, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar src={attendee.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={attendee.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedEvent(null)}>Schließen</Button>
                <Button variant="contained" onClick={() => handleAttendEvent(selectedEvent.id)}>
                  {selectedEvent.isAttending ? 'Abmelden' : 'Teilnehmen'}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

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
              <Typography variant="h6">🆘 Hilfe zu Events</Typography>
              <IconButton onClick={() => setShowHelp(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              <strong>Events erstellen:</strong><br/>
              Erstelle Events für Aktivitäten, die du gerne mit anderen teilen möchtest.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Teilnehmen:</strong><br/>
              Melde dich für Events an, die dich interessieren und triff neue Menschen.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Sicherheit:</strong><br/>
              Alle Events finden an öffentlichen Orten statt. Teile niemals private Adressen.
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

export default Events;
