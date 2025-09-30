import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  useTheme
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Help,
  QuestionAnswer,
  Security,
  Payment,
  AccountCircle,
  Chat
} from '@mui/icons-material';

const FAQ: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Allgemeine Fragen',
      icon: <Help sx={{ color: 'primary.main' }} />,
      questions: [
        {
          question: 'Was ist Harmony?',
          answer: 'Harmony ist eine deutsche Dating-App, die Menschen basierend auf gemeinsamen Interessen und Persönlichkeit zusammenbringt. Wir verwenden MBTI-Persönlichkeitstypen und Interessen-Matching für bessere Verbindungen.'
        },
        {
          question: 'Wie funktioniert das Matching?',
          answer: 'Unser Algorithmus berücksichtigt deine Persönlichkeit (MBTI-Typ), Interessen, Alter, Standort und Suchpräferenzen. Je mehr du dein Profil vervollständigst, desto bessere Matches erhältst du.'
        },
        {
          question: 'Ist Harmony kostenlos?',
          answer: 'Ja, die Grundfunktionen von Harmony sind kostenlos. Du kannst Profile anschauen, matchen und chatten. Premium-Features wie erweiterte Filter oder Super-Likes sind optional.'
        },
        {
          question: 'Für welche Altersgruppen ist Harmony?',
          answer: 'Harmony ist für alle Erwachsenen von 18-99 Jahren geeignet. Unser Design ist benutzerfreundlich für alle Altersgruppen mit großen Buttons und klarer Navigation.'
        }
      ]
    },
    {
      title: 'Konto & Sicherheit',
      icon: <Security sx={{ color: 'success.main' }} />,
      questions: [
        {
          question: 'Wie sicher sind meine Daten?',
          answer: 'Deine Daten werden auf deutschen Servern gespeichert und sind DSGVO-konform. Wir verwenden SSL-Verschlüsselung und geben deine Daten niemals an Dritte weiter.'
        },
        {
          question: 'Wie kann ich mein Konto löschen?',
          answer: 'Gehe zu Einstellungen > Konto > Konto löschen. Du kannst auch eine Datenexport-Anfrage stellen. Deine Daten werden innerhalb von 30 Tagen vollständig gelöscht.'
        },
        {
          question: 'Was mache ich bei unangemessenem Verhalten?',
          answer: 'Melde das Profil sofort über den "Melden"-Button. Unser Moderationsteam prüft alle Meldungen innerhalb von 24 Stunden und handelt entsprechend.'
        },
        {
          question: 'Wie funktioniert die Handynummer-Verifizierung?',
          answer: 'Wir senden dir einen kostenlosen SMS-Code zur Bestätigung deiner Handynummer. Dies schützt vor Fake-Profilen und erhöht die Sicherheit der Plattform.'
        }
      ]
    },
    {
      title: 'Matching & Chat',
      icon: <Chat sx={{ color: 'info.main' }} />,
      questions: [
        {
          question: 'Wie finde ich bessere Matches?',
          answer: 'Vervollständige dein Profil mit echten Interessen, lade mehrere Fotos hoch und beantworte die Persönlichkeitsfragen ehrlich. Je mehr Informationen du teilst, desto besser können wir matchen.'
        },
        {
          question: 'Kann ich meine Matches zurücksetzen?',
          answer: 'Ja, in den Einstellungen kannst du deine Match-Historie zurücksetzen. Beachte, dass alle Chats und Matches dann verloren gehen.'
        },
        {
          question: 'Wie funktioniert der Chat?',
          answer: 'Nach einem Match könnt ihr sofort miteinander chatten. Wir haben keine Zeitlimits und du kannst jederzeit das Gespräch beenden oder die Person blockieren.'
        },
        {
          question: 'Kann ich Fotos im Chat teilen?',
          answer: 'Ja, du kannst Fotos, GIFs und Emojis teilen. Wir empfehlen, keine persönlichen oder intimen Fotos zu teilen, bis ihr euch besser kennt.'
        }
      ]
    },
    {
      title: 'Premium & Zahlungen',
      icon: <Payment sx={{ color: 'warning.main' }} />,
      questions: [
        {
          question: 'Was sind Premium-Features?',
          answer: 'Premium-Mitglieder erhalten erweiterte Filter, unbegrenzte Likes, Super-Likes, wer sieht dein Profil und erweiterte Suchoptionen.'
        },
        {
          question: 'Welche Zahlungsmethoden werden akzeptiert?',
          answer: 'Wir akzeptieren alle gängigen deutschen Zahlungsmethoden: SEPA-Lastschrift, PayPal, Kreditkarte und Apple Pay/Google Pay.'
        },
        {
          question: 'Kann ich mein Premium-Abo kündigen?',
          answer: 'Ja, du kannst dein Abo jederzeit in den Einstellungen kündigen. Die Kündigung wird zum Ende der aktuellen Abrechnungsperiode wirksam.'
        },
        {
          question: 'Gibt es eine Geld-zurück-Garantie?',
          answer: 'Ja, wenn du innerhalb der ersten 7 Tage nicht zufrieden bist, erstatten wir dir den vollen Betrag zurück.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <QuestionAnswer sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h2" gutterBottom>
            Häufig gestellte Fragen
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Finde Antworten auf die wichtigsten Fragen zu Harmony
          </Typography>
          
          {/* Suchfeld */}
          <TextField
            fullWidth
            placeholder="Frage suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600, mx: 'auto' }}
          />
        </Box>

        {/* FAQ Kategorien */}
        {filteredCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {category.icon}
              <Typography variant="h4" sx={{ ml: 2, fontWeight: 'bold' }}>
                {category.title}
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              {category.questions.map((faq, faqIndex) => (
                <Grid item xs={12} key={faqIndex}>
                  <Accordion sx={{ boxShadow: 2 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{ 
                        bgcolor: 'grey.50',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Keine Ergebnisse */}
        {filteredCategories.length === 0 && searchTerm && (
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Keine Ergebnisse gefunden
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Versuche es mit anderen Suchbegriffen oder kontaktiere unseren Support.
            </Typography>
          </Card>
        )}

        {/* Kontakt Support */}
        <Card sx={{ bgcolor: 'primary.main', color: 'white', mt: 6 }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Deine Frage nicht gefunden?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Unser Support-Team hilft dir gerne weiter
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <AccountCircle sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Email Support
                    </Typography>
                    <Typography variant="body2">
                      support@harmony-dating.de
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chat sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Live Chat
                    </Typography>
                    <Typography variant="body2">
                      Direkt in der App verfügbar
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Help sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Video-Tutorials
                    </Typography>
                    <Typography variant="body2">
                      Schritt-für-Schritt Anleitungen
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Beliebte Themen */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Beliebte Themen
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Profil erstellen" color="primary" />
            <Chip label="Matching verstehen" color="secondary" />
            <Chip label="Sicherheit" color="success" />
            <Chip label="Premium Features" color="warning" />
            <Chip label="Konto löschen" color="error" />
            <Chip label="Zahlungsmethoden" color="info" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
