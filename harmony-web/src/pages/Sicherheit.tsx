import React from 'react';
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
  Alert,
  Chip,
  useTheme
} from '@mui/material';
import {
  Security,
  Shield,
  Lock,
  VerifiedUser,
  Report,
  Block,
  PrivacyTip,
  SupportAgent
} from '@mui/icons-material';

const Sicherheit: React.FC = () => {
  const theme = useTheme();

  const securityFeatures = [
    {
      icon: <Shield sx={{ color: 'primary.main' }} />,
      title: 'DSGVO-konforme Datenspeicherung',
      description: 'Alle deine Daten werden sicher auf deutschen Servern gespeichert und sind DSGVO-konform.',
      details: [
        'Deutsche Server in Deutschland',
        'Verschlüsselte Datenübertragung (SSL/TLS)',
        'Regelmäßige Sicherheitsupdates',
        'Keine Weitergabe an Dritte'
      ]
    },
    {
      icon: <Lock sx={{ color: 'success.main' }} />,
      title: 'Sichere Authentifizierung',
      description: 'Handynummer-Verifizierung und sichere Passwörter schützen dein Konto.',
      details: [
        'SMS-Code Verifizierung',
        'Sichere Passwort-Anforderungen',
        'Zwei-Faktor-Authentifizierung (optional)',
        'Automatische Abmeldung bei verdächtigen Aktivitäten'
      ]
    },
    {
      icon: <Report sx={{ color: 'warning.main' }} />,
      title: 'Einfaches Melden & Blockieren',
      description: 'Melde unangemessenes Verhalten mit einem Klick. Wir handeln schnell.',
      details: [
        'Ein-Klick-Melden von Profilen',
        'Sofortiges Blockieren von Nutzern',
        '24/7 Moderation durch unser Team',
        'Schnelle Bearbeitung von Meldungen'
      ]
    },
    {
      icon: <PrivacyTip sx={{ color: 'info.main' }} />,
      title: 'Datenschutz & Privatsphäre',
      description: 'Du behältst die volle Kontrolle über deine Daten und Privatsphäre.',
      details: [
        'Granulare Privatsphäre-Einstellungen',
        'Datenexport auf Anfrage',
        'Komplette Löschung deines Kontos',
        'Transparente Datenschutzerklärung'
      ]
    }
  ];

  const safetyTips = [
    {
      title: 'Profil-Fotos',
      tips: [
        'Verwende nur aktuelle Fotos von dir',
        'Keine Gruppenfotos als Hauptbild',
        'Zeige dein Gesicht klar erkennbar',
        'Vermeide zu freizügige Bilder'
      ]
    },
    {
      title: 'Erstes Treffen',
      tips: [
        'Triff dich an einem öffentlichen Ort',
        'Informiere Freunde über dein Treffen',
        'Nimm dein Handy mit',
        'Vertraue auf dein Bauchgefühl'
      ]
    },
    {
      title: 'Persönliche Daten',
      tips: [
        'Teile keine Adresse oder Arbeitsplatz',
        'Gib keine Bankdaten weiter',
        'Sei vorsichtig mit persönlichen Fotos',
        'Verwende einen Spitznamen wenn gewünscht'
      ]
    },
    {
      title: 'Kommunikation',
      tips: [
        'Bleibe höflich und respektvoll',
        'Melde unangemessene Nachrichten',
        'Nimm dir Zeit zum Kennenlernen',
        'Vertraue nicht auf Versprechungen'
      ]
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Security sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h2" gutterBottom>
            Sicherheit & Datenschutz
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Deine Sicherheit und Privatsphäre haben für uns höchste Priorität
          </Typography>
        </Box>

        {/* Sicherheits-Features */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {securityFeatures.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <List dense>
                    {feature.details.map((detail, detailIndex) => (
                      <ListItem key={detailIndex} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <VerifiedUser sx={{ fontSize: 16, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary={detail} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Sicherheits-Tipps */}
        <Typography variant="h3" textAlign="center" gutterBottom sx={{ mb: 4 }}>
          🛡️ Sicherheits-Tipps
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {safetyTips.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    {section.title}
                  </Typography>
                  <List dense>
                    {section.tips.map((tip, tipIndex) => (
                      <ListItem key={tipIndex} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Shield sx={{ fontSize: 16, color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Wichtige Hinweise */}
        <Alert severity="warning" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            ⚠️ Wichtige Hinweise
          </Typography>
          <Typography variant="body2">
            • Melde sofort verdächtige oder unangemessene Nachrichten<br/>
            • Teile niemals persönliche Daten wie Adresse oder Bankdaten<br/>
            • Vertraue auf dein Bauchgefühl - wenn etwas komisch ist, lass es<br/>
            • Bei Problemen kontaktiere uns sofort über den Support
          </Typography>
        </Alert>

        {/* Support & Kontakt */}
        <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <SupportAgent sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Brauchst du Hilfe?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Unser Support-Team ist 24/7 für dich da
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    📧 Email Support
                  </Typography>
                  <Typography variant="body2">
                    support@harmony-dating.de
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    🚨 Notfall-Meldung
                  </Typography>
                  <Typography variant="body2">
                    Sofortige Hilfe bei Problemen
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    📱 In-App Support
                  </Typography>
                  <Typography variant="body2">
                    Direkt in der App verfügbar
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Zertifizierungen */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Unsere Sicherheits-Zertifizierungen
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="DSGVO-konform" color="success" />
            <Chip label="SSL-verschlüsselt" color="info" />
            <Chip label="ISO 27001" color="primary" />
            <Chip label="Deutsche Server" color="secondary" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Sicherheit;
