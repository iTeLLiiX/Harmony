import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
// Pages
import LandingPage from './pages/LandingPage';
import PremiumLandingPage from './pages/PremiumLandingPage';
import Login from './pages/Login';
import PremiumLogin from './pages/PremiumLogin';
import Registrierung from './pages/Registrierung';
import PremiumRegistrierung from './pages/PremiumRegistrierung';
import Profil from './pages/Profil';
import Matching from './pages/Matching';
import PremiumMatching from './pages/PremiumMatching';
import Chat from './pages/Chat';
import PremiumChat from './pages/PremiumChat';
import Einstellungen from './pages/Einstellungen';
import Community from './pages/Community';
import Persoenlichkeitstest from './pages/Persoenlichkeitstest';
import Sicherheit from './pages/Sicherheit';
import FAQ from './pages/FAQ';
import Onboarding from './pages/Onboarding';
import Premium from './pages/Premium';
import Verification from './pages/Verification';
import Events from './pages/Events';
import Analytics from './pages/Analytics';

// Components
import Navigation from './components/Navigation';
import Tutorial from './components/Tutorial';
import PaywallModal from './components/PaywallModal';

// Hooks
import { usePaywall } from './hooks/usePaywall';

// Styles
import './styles/globals.css';

// Import des einheitlichen Harmony Themes
import { harmonyTheme } from './styles/theme';
import { ThemeProvider } from './contexts/ThemeContext';

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
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  
  // Paywall Hook
  const { 
    paywallStatus, 
    checkFeature, 
    showPaywall, 
    hidePaywall, 
    upgradeUser, 
    remindLater 
  } = usePaywall();

  // Tutorial beim ersten Besuch anzeigen
  React.useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('harmony_tutorial_seen');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  // Onboarding für neue Benutzer
  React.useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('harmony_onboarding_completed');
    const isNewUser = localStorage.getItem('harmony_new_user');
    
    if (isNewUser && !hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('harmony_tutorial_seen', 'true');
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('harmony_onboarding_completed', 'true');
    setIsAuthenticated(true);
  };

  const handlePaywallUpgrade = async (planId: string) => {
    try {
      await upgradeUser(planId);
      // Nach erfolgreichem Upgrade zur entsprechenden Seite weiterleiten
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  const handlePaywallSkip = () => {
    hidePaywall();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="app">
            {/* Tutorial Overlay */}
            {showTutorial && (
              <Tutorial onComplete={handleTutorialComplete} />
            )}

            {/* Onboarding für neue Benutzer */}
            {showOnboarding && (
              <Onboarding onComplete={handleOnboardingComplete} />
            )}

            {/* Paywall Modal */}
            {paywallStatus?.paywall?.showPaywall && (
              <PaywallModal
                open={true}
                onClose={hidePaywall}
                onUpgrade={handlePaywallUpgrade}
                onSkip={handlePaywallSkip}
                feature={paywallStatus.paywall.reason || 'premium_feature'}
                userLimits={{
                  likes: paywallStatus.limits.likes,
                  superLikes: paywallStatus.limits.superLikes
                }}
              />
            )}

            {/* Hauptnavigation */}
            {isAuthenticated && <Navigation />}

            {/* Routen */}
            <main className="main-content">
              <Routes>
                {/* Öffentliche Routen */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<PremiumLogin />} />
                <Route path="/registrierung" element={<PremiumRegistrierung />} />
                
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
                <Route 
                  path="/onboarding" 
                  element={<Onboarding />}
                />
                <Route 
                  path="/premium" 
                  element={<Premium />}
                />
                <Route 
                  path="/verification" 
                  element={<Verification />}
                />
                <Route 
                  path="/events" 
                  element={<Events />}
                />
                <Route 
                  path="/analytics" 
                  element={<Analytics />}
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
