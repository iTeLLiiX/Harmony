import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import {
  Psychology,
  ArrowForward,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';

const Persoenlichkeitstest: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);

  // MBTI-Fragen basierend auf Boo's Ansatz
  const questions = [
    {
      id: 1,
      question: "Wie verbringst du am liebsten deine Freizeit?",
      options: [
        { value: "E", label: "Mit Freunden ausgehen und neue Leute treffen", personality: "Extraversion" },
        { value: "I", label: "Zu Hause entspannen und alleine Zeit verbringen", personality: "Introversion" }
      ]
    },
    {
      id: 2,
      question: "Bei wichtigen Entscheidungen verlässt du dich auf...",
      options: [
        { value: "S", label: "Fakten, Daten und bewährte Methoden", personality: "Sensing" },
        { value: "N", label: "Intuition und neue Möglichkeiten", personality: "Intuition" }
      ]
    },
    {
      id: 3,
      question: "Wie gehst du mit Konflikten um?",
      options: [
        { value: "T", label: "Logisch und sachlich analysieren", personality: "Thinking" },
        { value: "F", label: "Auf Gefühle und Harmonie achten", personality: "Feeling" }
      ]
    },
    {
      id: 4,
      question: "Dein idealer Tag ist...",
      options: [
        { value: "J", label: "Strukturiert und geplant", personality: "Judging" },
        { value: "P", label: "Flexibel und spontan", personality: "Perceiving" }
      ]
    },
    {
      id: 5,
      question: "Bei einem neuen Projekt...",
      options: [
        { value: "E", label: "Ich teile meine Ideen gerne mit anderen", personality: "Extraversion" },
        { value: "I", label: "Ich denke erst alleine darüber nach", personality: "Introversion" }
      ]
    },
    {
      id: 6,
      question: "Was motiviert dich mehr?",
      options: [
        { value: "S", label: "Konkrete, messbare Ergebnisse", personality: "Sensing" },
        { value: "N", label: "Neue Ideen und Innovationen", personality: "Intuition" }
      ]
    },
    {
      id: 7,
      question: "Bei Feedback...",
      options: [
        { value: "T", label: "Ich bevorzuge direkte, ehrliche Kritik", personality: "Thinking" },
        { value: "F", label: "Ich schätze konstruktive, ermutigende Worte", personality: "Feeling" }
      ]
    },
    {
      id: 8,
      question: "Dein Arbeitsstil ist...",
      options: [
        { value: "J", label: "Ich arbeite gerne mit Deadlines und Plänen", personality: "Judging" },
        { value: "P", label: "Ich arbeite gerne unter Druck und spontan", personality: "Perceiving" }
      ]
    }
  ];

  const personalityTypes = {
    "INTJ": { name: "Der Architekt", description: "Strategisch, unabhängig, entscheidungsfreudig", color: "#FF6B6B" },
    "INTP": { name: "Der Denker", description: "Innovativ, neugierig, logisch", color: "#4ECDC4" },
    "ENTJ": { name: "Der Kommandant", description: "Führungsstark, entscheidungsfreudig, zielstrebig", color: "#45B7D1" },
    "ENTP": { name: "Der Debattierer", description: "Kreativ, enthusiastisch, anpassungsfähig", color: "#96CEB4" },
    "INFJ": { name: "Der Advokat", description: "Kreativ, entschlossen, prinzipientreu", color: "#FFEAA7" },
    "INFP": { name: "Der Mediator", description: "Idealistisch, neugierig, leidenschaftlich", color: "#DDA0DD" },
    "ENFJ": { name: "Der Protagonist", description: "Charismatisch, inspirierend, überzeugend", color: "#98D8C8" },
    "ENFP": { name: "Der Aktivist", description: "Enthusiastisch, kreativ, gesellig", color: "#F7DC6F" },
    "ISTJ": { name: "Der Logistiker", description: "Praktisch, zuverlässig, verantwortungsbewusst", color: "#BB8FCE" },
    "ISFJ": { name: "Der Beschützer", description: "Warmherzig, verantwortungsbewusst, geduldig", color: "#85C1E9" },
    "ESTJ": { name: "Der Geschäftsführer", description: "Effizient, energisch, zuverlässig", color: "#F8C471" },
    "ESFJ": { name: "Der Konsul", description: "Mitfühlend, gesellig, verantwortungsbewusst", color: "#82E0AA" },
    "ISTP": { name: "Der Virtuose", description: "Bold, praktisch, experimentierfreudig", color: "#F1948A" },
    "ISFP": { name: "Der Abenteurer", description: "Flexibel, charmant, sensibel", color: "#85C1E9" },
    "ESTP": { name: "Der Unternehmer", description: "Energisch, gesellig, realistisch", color: "#F7DC6F" },
    "ESFP": { name: "Der Entertainer", description: "Spontan, enthusiastisch, gesellig", color: "#DDA0DD" }
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    // Einfache MBTI-Berechnung
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(answers).forEach(answer => {
      if (answer) counts[answer as keyof typeof counts]++;
    });

    const result = 
      (counts.E > counts.I ? 'E' : 'I') +
      (counts.S > counts.N ? 'S' : 'N') +
      (counts.T > counts.F ? 'T' : 'F') +
      (counts.J > counts.P ? 'J' : 'P');

    setAnswers({ ...answers, result });
    setShowResult(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const result = answers.result as keyof typeof personalityTypes;
    const personality = personalityTypes[result];

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="md">
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h3" gutterBottom>
              Dein Persönlichkeitstyp
            </Typography>
            <Typography variant="h2" sx={{ color: personality.color, fontWeight: 'bold', mb: 2 }}>
              {result}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {personality.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              {personality.description}
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Kompatible Persönlichkeitstypen:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                {Object.keys(personalityTypes).slice(0, 4).map((type) => (
                  <Chip 
                    key={type} 
                    label={type} 
                    sx={{ bgcolor: personalityTypes[type as keyof typeof personalityTypes].color, color: 'white' }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResult(false);
                }}
              >
                Test wiederholen
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/matching')}
                sx={{ bgcolor: personality.color }}
              >
                Matches finden
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Psychology sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h2" gutterBottom>
            Persönlichkeitstest
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Entdecke deinen MBTI-Typ und finde kompatible Matches
          </Typography>
        </Box>

        {/* Progress */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              Frage {currentQuestion + 1} von {questions.length}
            </Typography>
            <Typography variant="body2">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        {/* Question Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              {questions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {option.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.personality}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      mb: 2,
                      p: 2,
                      border: '1px solid',
                      borderColor: answers[currentQuestion] === option.value ? 'primary.main' : 'grey.300',
                      borderRadius: 2,
                      bgcolor: answers[currentQuestion] === option.value ? 'primary.50' : 'transparent',
                      '&:hover': {
                        bgcolor: 'grey.50'
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Zurück
          </Button>
          <Button
            variant="contained"
            endIcon={currentQuestion === questions.length - 1 ? <CheckCircle /> : <ArrowForward />}
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            sx={{ px: 4 }}
          >
            {currentQuestion === questions.length - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Persoenlichkeitstest;
