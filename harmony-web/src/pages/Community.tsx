import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Chip,
  Grid,
  IconButton,
  useTheme
} from '@mui/material';
import {
  ThumbUp,
  Comment,
  Share,
  Favorite,
  Psychology,
  QuestionAnswer
} from '@mui/icons-material';

const Community: React.FC = () => {
  const theme = useTheme();
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  // Simulierte Community-Daten wie bei Boo
  const communityPosts = [
    {
      id: 1,
      author: 'Luna',
      avatar: '🌙',
      personality: 'ISFP',
      zodiac: 'Fische',
      age: 98,
      time: '14h',
      title: 'Wie steht ihr zu der derzeit starken Spaltung der Gesellschaft?',
      content: 'Worin seht ihr die Ursache, das es unzählige Menschen gibt, die sich in Gedanken, Taten und Wünschen flüchten, welche in vergangenen Jahrhunderten soviel leid über die Menschheit gebracht haben?',
      tags: ['#autos', '#mystery'],
      likes: 16180,
      comments: 235,
      isQuestionOfTheDay: true
    },
    {
      id: 2,
      author: 'Anne (aka KuschelBubu)',
      avatar: '👻',
      personality: 'INFJ',
      zodiac: 'Wassermann',
      age: 21,
      time: '1 Tag',
      title: 'So sieht das dann aus',
      content: 'Meinung?',
      tags: ['#anime'],
      likes: 3414,
      comments: 56,
      isQuestionOfTheDay: false
    },
    {
      id: 3,
      author: 'Hana',
      avatar: '🌸',
      personality: 'ENFP',
      zodiac: 'Waage',
      age: 21,
      time: '18h',
      title: 'Alte Anime perlen?',
      content: 'Ich schaue zurzeit nebenher alte Animes (1-4staffeln ca an länge) hab gerade meinen Lieblingsanime Kara no kyokai beendet habt ihr weitere Vorschläge?',
      tags: ['#anime'],
      likes: 1756,
      comments: 89,
      isQuestionOfTheDay: false
    }
  ];

  const personalityTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];

  const zodiacSigns = [
    'Widder', 'Stier', 'Zwillinge', 'Krebs',
    'Löwe', 'Jungfrau', 'Waage', 'Skorpion',
    'Schütze', 'Steinbock', 'Wassermann', 'Fische'
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Community 💬
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Triff neue Leute und teile deine Gedanken
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<QuestionAnswer />}
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            sx={{
              bgcolor: 'primary.main',
              px: 4,
              py: 2,
              fontSize: '16px',
              borderRadius: 3
            }}
          >
            Frage stellen
          </Button>
        </Box>

        {/* Frage des Tages */}
        <Card sx={{ mb: 4, border: '2px solid', borderColor: 'primary.main' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Psychology sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Frage des Tages
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              {communityPosts[0].title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {communityPosts[0].content}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {communityPosts[0].tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" color="primary" />
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button startIcon={<ThumbUp />} size="small">
                {communityPosts[0].likes.toLocaleString()}
              </Button>
              <Button startIcon={<Comment />} size="small">
                {communityPosts[0].comments} Kommentare
              </Button>
              <Button startIcon={<Share />} size="small">
                Teilen
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Community Posts */}
        <Grid container spacing={3}>
          {communityPosts.slice(1).map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card sx={{ transition: 'all 0.3s ease', '&:hover': { boxShadow: 4 } }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Post Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {post.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {post.author}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip label={post.personality} size="small" color="secondary" />
                        <Chip label={post.zodiac} size="small" variant="outlined" />
                        <Typography variant="body2" color="text.secondary">
                          {post.age} • {post.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Post Content */}
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {post.content}
                  </Typography>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {post.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button startIcon={<ThumbUp />} size="small">
                      {post.likes.toLocaleString()}
                    </Button>
                    <Button startIcon={<Comment />} size="small">
                      {post.comments}
                    </Button>
                    <Button startIcon={<Share />} size="small">
                      Teilen
                    </Button>
                    <IconButton size="small">
                      <Favorite />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Neue Frage Formular */}
        {showQuestionForm && (
          <Card sx={{ mt: 4, border: '2px solid', borderColor: 'primary.main' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Neue Frage stellen
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Stelle deine Frage an die Community..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    // Hier würde die Frage gespeichert werden
                    setNewQuestion('');
                    setShowQuestionForm(false);
                  }}
                >
                  Frage posten
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowQuestionForm(false)}
                >
                  Abbrechen
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Persönlichkeitstest CTA */}
        <Card sx={{ mt: 6, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Entdecke deine Persönlichkeit
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Mache den MBTI-Test und finde Menschen mit ähnlicher Persönlichkeit
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => window.location.href = '/persoenlichkeitstest'}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 2,
                fontSize: '16px'
              }}
            >
              Persönlichkeitstest starten
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Community;
