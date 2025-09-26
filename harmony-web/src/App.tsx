import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Registrierung from './pages/Registrierung';
import Profil from './pages/Profil';
import Matching from './pages/Matching';
import Chat from './pages/Chat';
import Einstellungen from './pages/Einstellungen';
import Community from './pages/Community';
import Persoenlichkeitstest from './pages/Persoenlichkeitstest';
import Sicherheit from './pages/Sicherheit';
import FAQ from './pages/FAQ';

// Components
import Navigation from './components/Navigation';
import Tutorial from './components/Tutorial';

// Styles
import './styles/globals.css';

// MUI Theme für deutsche Benutzerfreundlichkeit
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
    },
    secondary: {
      main: '#7ED321',
    },
    success: {
      main: '#7ED321',
    },
    error: {
      main: '#E74C3C',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    button: {
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          borderRadius: '8px',
          padding: '14px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            minHeight: '48px',
          },
        },
      },
    },
  },
});

// React Query Client für API-Calls
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 Minuten
      cacheTime: 10 * 60 * 1000, // 10 Minuten
    },
  },
});

const App: React.FC = () => {
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Tutorial beim ersten Besuch anzeigen
  React.useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('harmony_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('harmony_tutorial_seen', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="app">
            {/* Tutorial Overlay */}
            {showTutorial && (
              <Tutorial onComplete={handleTutorialComplete} />
            )}

            {/* Hauptnavigation */}
            {isAuthenticated && <Navigation />}

            {/* Routen */}
            <main className="main-content">
              <Routes>
                {/* Öffentliche Routen */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registrierung" element={<Registrierung />} />
                
                {/* Geschützte Routen */}
                <Route 
                  path="/profil" 
                  element={
                    isAuthenticated ? <Profil /> : <LandingPage />
                  } 
                />
                <Route 
                  path="/matching" 
                  element={
                    isAuthenticated ? <Matching /> : <LandingPage />
                  } 
                />
                <Route 
                  path="/chat" 
                  element={
                    isAuthenticated ? <Chat /> : <LandingPage />
                  } 
                />
                <Route 
                  path="/einstellungen" 
                  element={
                    isAuthenticated ? <Einstellungen /> : <LandingPage />
                  } 
                />
                <Route 
                  path="/community" 
                  element={<Community />}
                />
                <Route 
                  path="/persoenlichkeitstest" 
                  element={<Persoenlichkeitstest />}
                />
                <Route 
                  path="/sicherheit" 
                  element={<Sicherheit />}
                />
                <Route 
                  path="/faq" 
                  element={<FAQ />}
                />
              </Routes>
            </main>

            {/* Toast Notifications */}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '16px',
                  borderRadius: '8px',
                },
                success: {
                  style: {
                    background: '#7ED321',
                  },
                },
                error: {
                  style: {
                    background: '#E74C3C',
                  },
                },
              }}
            />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
