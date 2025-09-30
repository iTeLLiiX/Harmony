import { useState, useEffect } from 'react';
import { paywallAPI } from '../services/api';

interface PaywallStatus {
  isBlocked: boolean;
  userTier: 'free' | 'premium' | 'premium_plus';
  limits: {
    likes: { used: number; limit: number; resetAt: string };
    superLikes: { used: number; limit: number; resetAt: string };
    boosts: { used: number; limit: number; resetAt: string };
    passport: { used: number; limit: number; resetAt: string };
  };
  paywall: {
    showPaywall: boolean;
    reason: string | null;
    upgradeRequired: boolean;
  };
}

interface UsePaywallReturn {
  paywallStatus: PaywallStatus | null;
  isLoading: boolean;
  error: string | null;
  checkFeature: (feature: string) => Promise<boolean>;
  showPaywall: (feature: string) => void;
  hidePaywall: () => void;
  upgradeUser: (planId: string) => Promise<void>;
  remindLater: (feature: string, days?: number) => Promise<void>;
}

export const usePaywall = (): UsePaywallReturn => {
  const [paywallStatus, setPaywallStatus] = useState<PaywallStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<string>('');

  const checkFeature = async (feature: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await paywallAPI.checkStatus(feature);
      setPaywallStatus(response.data);

      if (response.data.isBlocked) {
        setCurrentFeature(feature);
        setShowPaywallModal(true);
        return false;
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Fehler beim Prüfen des Features');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const showPaywall = (feature: string) => {
    setCurrentFeature(feature);
    setShowPaywallModal(true);
  };

  const hidePaywall = () => {
    setShowPaywallModal(false);
    setCurrentFeature('');
  };

  const upgradeUser = async (planId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await paywallAPI.processUpgrade(planId, currentFeature);
      
      // Paywall-Status aktualisieren
      await checkFeature(currentFeature);
      setShowPaywallModal(false);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Upgrade');
    } finally {
      setIsLoading(false);
    }
  };

  const remindLater = async (feature: string, days: number = 7) => {
    try {
      setIsLoading(true);
      setError(null);

      await paywallAPI.remindLater(feature, days);
      setShowPaywallModal(false);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Planen der Erinnerung');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    paywallStatus,
    isLoading,
    error,
    checkFeature,
    showPaywall,
    hidePaywall,
    upgradeUser,
    remindLater
  };
};

// Hook für Feature-Limits
export const useFeatureLimits = () => {
  const [limits, setLimits] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLimits = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await paywallAPI.getFeatureLimits();
      setLimits(response.data);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Limits');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLimits();
  }, []);

  return {
    limits,
    isLoading,
    error,
    refetch: fetchLimits
  };
};

// Hook für Onboarding
export const useOnboarding = () => {
  const [onboardingSteps, setOnboardingSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSteps = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await paywallAPI.getOnboardingSteps();
      setOnboardingSteps(response.data.steps);
      setCurrentStep(response.data.currentStep);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Onboarding-Schritte');
    } finally {
      setIsLoading(false);
    }
  };

  const completeStep = async (stepId: number, data: any) => {
    try {
      setIsLoading(true);
      setError(null);

      await paywallAPI.completeOnboardingStep(stepId, data);
      setCurrentStep(stepId + 1);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Abschließen des Schritts');
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (skipPremium: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      await paywallAPI.completeOnboarding(skipPremium);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Abschließen des Onboardings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  return {
    onboardingSteps,
    currentStep,
    isLoading,
    error,
    completeStep,
    completeOnboarding,
    fetchSteps
  };
};
