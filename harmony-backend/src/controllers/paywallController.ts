import { Request, Response } from 'express';
import { Benutzer } from '../models/Benutzer';

// Premium-Features definieren
const PREMIUM_FEATURES = {
  unlimited_likes: {
    name: 'Unbegrenzte Likes',
    description: 'Like so viele Profile wie du möchtest',
    freeLimit: 5,
    premiumBenefit: 'Unbegrenzt'
  },
  see_who_liked_you: {
    name: 'Wer hat mich geliket?',
    description: 'Sieh wer dich interessant findet',
    freeLimit: 0,
    premiumBenefit: 'Vollzugriff'
  },
  advanced_filters: {
    name: 'Erweiterte Filter',
    description: 'Suche nach Bildung, Beruf, Hobbys',
    freeLimit: 0,
    premiumBenefit: 'Alle Filter verfügbar'
  },
  profile_boost: {
    name: 'Profil-Boost',
    description: 'Erscheine öfter in der Suche',
    freeLimit: 0,
    premiumBenefit: '1x pro Woche'
  },
  read_receipts: {
    name: 'Lesebestätigungen',
    description: 'Sieh wann deine Nachrichten gelesen wurden',
    freeLimit: 0,
    premiumBenefit: 'Vollzugriff'
  }
};

// Premium-Pläne
const PREMIUM_PLANS = [
  {
    id: 'monthly',
    name: 'Monatlich',
    price: 9.99,
    currency: 'EUR',
    interval: 'month',
    description: 'Perfekt zum Ausprobieren',
    features: ['Alle Premium-Features', 'Kündigung jederzeit möglich']
  },
  {
    id: 'quarterly',
    name: '3 Monate',
    price: 24.99,
    currency: 'EUR',
    interval: '3 months',
    description: 'Spar 17% gegenüber monatlich',
    features: ['Alle Premium-Features', '3 Monate Zugang', '17% Ersparnis'],
    savings: 4.98
  },
  {
    id: 'yearly',
    name: 'Jährlich',
    price: 79.99,
    currency: 'EUR',
    interval: 'year',
    description: 'Beste Wert - Spar 33%',
    features: ['Alle Premium-Features', '12 Monate Zugang', '33% Ersparnis'],
    savings: 39.92
  }
];

// Feature-Zugang prüfen
export const checkFeatureAccess = async (req: Request, res: Response) => {
  try {
    const { userId, feature } = req.params;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const isPremium = user.subscription?.isActive || false;
    const featureConfig = PREMIUM_FEATURES[feature as keyof typeof PREMIUM_FEATURES];

    if (!featureConfig) {
      return res.status(400).json({ message: 'Unbekanntes Feature' });
    }

    // Feature-Zugang prüfen
    let hasAccess = false;
    let reason = '';

    if (isPremium) {
      hasAccess = true;
      reason = 'Premium-Abonnement aktiv';
    } else {
      // Freemium-Limits prüfen
      const currentUsage = user.usage?.[feature] || 0;
      hasAccess = currentUsage < featureConfig.freeLimit;
      
      if (!hasAccess) {
        reason = `Freemium-Limit erreicht (${featureConfig.freeLimit}/${featureConfig.freeLimit})`;
      } else {
        reason = `Freemium-Zugang (${currentUsage}/${featureConfig.freeLimit})`;
      }
    }

    res.json({
      success: true,
      hasAccess,
      reason,
      feature: {
        name: featureConfig.name,
        description: featureConfig.description,
        freeLimit: featureConfig.freeLimit,
        premiumBenefit: featureConfig.premiumBenefit
      },
      isPremium,
      currentUsage: user.usage?.[feature] || 0
    });
  } catch (error) {
    console.error('Fehler beim Prüfen des Feature-Zugangs:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Upgrade-Optionen abrufen
export const getUpgradeOptions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const isPremium = user.subscription?.isActive || false;

    if (isPremium) {
      return res.json({
        success: true,
        isPremium: true,
        message: 'Du hast bereits ein Premium-Abonnement!',
        subscription: user.subscription
      });
    }

    res.json({
      success: true,
      isPremium: false,
      plans: PREMIUM_PLANS,
      features: PREMIUM_FEATURES,
      currentUsage: user.usage || {}
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Upgrade-Optionen:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Upgrade durchführen
export const processUpgrade = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { planId, paymentMethod } = req.body;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const plan = PREMIUM_PLANS.find(p => p.id === planId);
    if (!plan) {
      return res.status(400).json({ message: 'Ungültiger Plan' });
    }

    // Hier würde normalerweise die Zahlungsabwicklung stattfinden
    // Für Demo-Zwecke simulieren wir eine erfolgreiche Zahlung
    
    // Premium-Abonnement erstellen
    const subscription = {
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      currency: plan.currency,
      interval: plan.interval,
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + (plan.interval === 'month' ? 30 : plan.interval === '3 months' ? 90 : 365) * 24 * 60 * 60 * 1000),
      paymentMethod: paymentMethod,
      autoRenew: true
    };

    user.subscription = subscription;
    user.isPremium = true;
    user.premiumSince = new Date();

    await user.save();

    res.json({
      success: true,
      message: 'Upgrade erfolgreich! Willkommen bei Harmony Premium!',
      subscription,
      features: PREMIUM_FEATURES
    });
  } catch (error) {
    console.error('Fehler beim Upgrade:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// "Später erinnern" für Paywall
export const remindLater = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { feature, remindInHours = 24 } = req.body;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Erinnerung speichern
    if (!user.reminders) {
      user.reminders = [];
    }

    const reminderDate = new Date(Date.now() + remindInHours * 60 * 60 * 1000);
    
    user.reminders.push({
      feature,
      remindAt: reminderDate,
      createdAt: new Date()
    });

    await user.save();

    res.json({
      success: true,
      message: `Wir erinnern dich in ${remindInHours} Stunden an ${PREMIUM_FEATURES[feature as keyof typeof PREMIUM_FEATURES]?.name || 'diese Funktion'}`,
      remindAt: reminderDate
    });
  } catch (error) {
    console.error('Fehler beim Speichern der Erinnerung:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};

// Feature-Limits abrufen
export const getFeatureLimits = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await Benutzer.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const isPremium = user.subscription?.isActive || false;
    const currentUsage = user.usage || {};

    const limits = Object.entries(PREMIUM_FEATURES).map(([key, feature]) => ({
      feature: key,
      name: feature.name,
      description: feature.description,
      freeLimit: feature.freeLimit,
      premiumBenefit: feature.premiumBenefit,
      currentUsage: currentUsage[key] || 0,
      hasAccess: isPremium || (currentUsage[key] || 0) < feature.freeLimit,
      isPremium
    }));

    res.json({
      success: true,
      isPremium,
      limits,
      subscription: user.subscription
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Feature-Limits:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
};