import { Request, Response } from 'express';
import { Benutzer } from '../models/Benutzer';

// Onboarding-Schritte definieren
const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Willkommen bei Harmony',
    description: 'Lerne die App kennen und erstelle dein Profil',
    required: true,
    order: 1
  },
  {
    id: 'basic_info',
    title: 'Grunddaten',
    description: 'Alter, Geschlecht, PLZ und grundlegende Informationen',
    required: true,
    order: 2
  },
  {
    id: 'photos',
    title: 'Profilbilder',
    description: 'Lade deine besten Fotos hoch',
    required: true,
    order: 3
  },
  {
    id: 'interests',
    title: 'Interessen',
    description: 'Musik, Sport, Hobbys und Filme',
    required: true,
    order: 4
  },
  {
    id: 'preferences',
    title: 'Partner-Präferenzen',
    description: 'Alter, Entfernung und weitere Wünsche',
    required: true,
    order: 5
  },
  {
    id: 'premium_upsell',
    title: 'Premium Features',
    description: 'Entdecke die Vorteile von Harmony Premium',
    required: false,
    order: 6
  }
];

// Onboarding-Schritte abrufen
export const getOnboardingSteps = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // Benutzer finden
    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Bereits abgeschlossene Schritte ermitteln
    const completedSteps = user.onboarding?.completedSteps || [];
    
    // Schritte mit Status anreichern
    const stepsWithStatus = ONBOARDING_STEPS.map(step => ({
      ...step,
      completed: completedSteps.includes(step.id),
      canSkip: !step.required
    }));

    res.json({
      success: true,
      steps: stepsWithStatus,
      currentStep: user.onboarding?.currentStep || 'welcome',
      progress: Math.round((completedSteps.length / ONBOARDING_STEPS.length) * 100)
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Onboarding-Schritte:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Onboarding-Schritt abschließen
export const completeOnboardingStep = async (req: Request, res: Response) => {
  try {
    const { userId, stepId } = req.params;
    const { data } = req.body;

    // Benutzer finden
    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Onboarding-Status initialisieren falls nicht vorhanden
    if (!user.onboarding) {
      user.onboarding = {
        currentStep: 'welcome',
        completedSteps: [],
        data: {}
      };
    }

    // Schritt als abgeschlossen markieren
    if (!user.onboarding.completedSteps.includes(stepId)) {
      user.onboarding.completedSteps.push(stepId);
    }

    // Schritt-spezifische Daten speichern
    if (data) {
      user.onboarding.data[stepId] = data;
    }

    // Nächsten Schritt bestimmen
    const currentStepIndex = ONBOARDING_STEPS.findIndex(step => step.id === stepId);
    const nextStep = ONBOARDING_STEPS[currentStepIndex + 1];
    
    if (nextStep) {
      user.onboarding.currentStep = nextStep.id;
    } else {
      user.onboarding.currentStep = 'completed';
    }

    await user.save();

    res.json({
      success: true,
      message: 'Schritt erfolgreich abgeschlossen',
      nextStep: user.onboarding.currentStep,
      progress: Math.round((user.onboarding.completedSteps.length / ONBOARDING_STEPS.length) * 100)
    });
  } catch (error) {
    console.error('Fehler beim Abschließen des Onboarding-Schritts:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Onboarding-Fortschritt abrufen
export const getOnboardingProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const progress = user.onboarding ? 
      Math.round((user.onboarding.completedSteps.length / ONBOARDING_STEPS.length) * 100) : 0;

    res.json({
      success: true,
      progress,
      currentStep: user.onboarding?.currentStep || 'welcome',
      completedSteps: user.onboarding?.completedSteps || [],
      isCompleted: user.onboarding?.currentStep === 'completed'
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Onboarding-Fortschritts:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Onboarding abschließen
export const completeOnboarding = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Onboarding als abgeschlossen markieren
    if (user.onboarding) {
      user.onboarding.currentStep = 'completed';
      user.onboarding.completedAt = new Date();
    }

    // Benutzer als aktiv markieren
    user.isActive = true;
    user.profileComplete = true;

    await user.save();

    res.json({
      success: true,
      message: 'Onboarding erfolgreich abgeschlossen! Willkommen bei Harmony!',
      user: {
        id: user._id,
        name: user.name,
        isActive: user.isActive,
        profileComplete: user.profileComplete
      }
    });
  } catch (error) {
    console.error('Fehler beim Abschließen des Onboardings:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Premium-Upsell überspringen
export const skipPremiumUpsell = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Premium-Schritt als übersprungen markieren
    if (user.onboarding) {
      user.onboarding.skippedPremium = true;
      user.onboarding.currentStep = 'completed';
    }

    await user.save();

    res.json({
      success: true,
      message: 'Premium-Upsell übersprungen. Du kannst später jederzeit upgraden!'
    });
  } catch (error) {
    console.error('Fehler beim Überspringen des Premium-Upsells:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};