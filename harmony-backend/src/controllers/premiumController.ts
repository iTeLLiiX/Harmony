import { Request, Response } from 'express';
import { CustomError } from '../middleware/errorHandler';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/premium/plans
 * @desc    Premium-Pläne abrufen
 * @access  Public
 */
export const getPremiumPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const mockPlans = [
      {
        id: 'premium_monthly',
        name: 'Premium Monatlich',
        price: 9.99,
        currency: 'EUR',
        interval: 'month',
        features: [
          'Unbegrenzte Likes',
          'Sehen wer dich geliket hat',
          'Erweiterte Suchfilter',
          'Profil-Boost',
          'Keine Werbung',
          'Super-Likes (5 pro Tag)',
          'Passport (andere Städte)',
          'Read-Receipts'
        ],
        popular: false
      },
      {
        id: 'premium_yearly',
        name: 'Premium Jährlich',
        price: 99.99,
        currency: 'EUR',
        interval: 'year',
        originalPrice: 119.88,
        discount: 17,
        features: [
          'Unbegrenzte Likes',
          'Sehen wer dich geliket hat',
          'Erweiterte Suchfilter',
          'Profil-Boost',
          'Keine Werbung',
          'Super-Likes (5 pro Tag)',
          'Passport (andere Städte)',
          'Read-Receipts',
          'Priorität im Support'
        ],
        popular: true
      },
      {
        id: 'premium_boost',
        name: 'Profil-Boost',
        price: 4.99,
        currency: 'EUR',
        interval: 'one_time',
        duration: '30 Minuten',
        features: [
          '10x mehr Profilaufrufe',
          'Erste in der Suchliste',
          'Hervorgehobenes Profil'
        ],
        popular: false
      }
    ];

    res.json({
      success: true,
      message: 'Premium-Pläne erfolgreich abgerufen',
      data: {
        plans: mockPlans,
        currentUserPlan: null
      }
    });
  } catch (error) {
    console.error('Get premium plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Premium-Pläne'
    });
  }
};

/**
 * @route   POST /api/premium/subscribe
 * @desc    Premium-Abonnement erstellen
 * @access  Private
 */
export const subscribeToPremium = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Ungültige Abonnement-Daten', 400);
    }

    const { 
      userId, 
      planId, 
      paymentMethod, 
      paymentToken 
    } = req.body;

    if (!userId || !planId || !paymentMethod || !paymentToken) {
      throw new CustomError('Alle Felder sind erforderlich', 400);
    }

    // Mock: Payment-Verarbeitung
    const subscription = {
      id: 'sub_' + Date.now(),
      userId,
      planId,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: planId === 'premium_monthly' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod,
      amount: planId === 'premium_monthly' ? 9.99 : 99.99,
      currency: 'EUR',
      autoRenew: true,
      features: [
        'unlimited_likes',
        'see_who_liked_you',
        'advanced_filters',
        'profile_boost',
        'no_ads',
        'super_likes',
        'passport',
        'read_receipts'
      ]
    };

    res.json({
      success: true,
      message: 'Premium-Abonnement erfolgreich erstellt',
      data: subscription
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Subscribe to premium error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Erstellen des Premium-Abonnements'
      });
    }
  }
};

/**
 * @route   GET /api/premium/subscription
 * @desc    Aktuelles Abonnement abrufen
 * @access  Private
 */
export const getSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Abonnement-Status
    const subscription = {
      id: 'sub_123456',
      userId,
      planId: 'premium_monthly',
      status: 'active',
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-02-01T00:00:00Z',
      autoRenew: true,
      features: [
        'unlimited_likes',
        'see_who_liked_you',
        'advanced_filters',
        'profile_boost',
        'no_ads',
        'super_likes',
        'passport',
        'read_receipts'
      ],
      usage: {
        likesUsed: 15,
        likesLimit: -1, // -1 = unbegrenzt
        superLikesUsed: 2,
        superLikesLimit: 5,
        boostsUsed: 1,
        boostsLimit: 1
      }
    };

    res.json({
      success: true,
      message: 'Abonnement erfolgreich abgerufen',
      data: subscription
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen des Abonnements'
    });
  }
};

/**
 * @route   POST /api/premium/boost
 * @desc    Profil-Boost aktivieren
 * @access  Private
 */
export const activateProfileBoost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    // Mock: Profil-Boost aktivieren
    const boost = {
      id: 'boost_' + Date.now(),
      userId,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 Minuten
      duration: '30 Minuten',
      multiplier: 10,
      status: 'active'
    };

    res.json({
      success: true,
      message: 'Profil-Boost erfolgreich aktiviert',
      data: boost
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Activate profile boost error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Aktivieren des Profil-Boosts'
      });
    }
  }
};

/**
 * @route   POST /api/premium/super-like
 * @desc    Super-Like verwenden
 * @access  Private
 */
export const useSuperLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, targetUserId } = req.body;

    if (!userId || !targetUserId) {
      throw new CustomError('Benutzer-ID und Ziel-Benutzer-ID sind erforderlich', 400);
    }

    // Mock: Super-Like verwenden
    const superLike = {
      id: 'superlike_' + Date.now(),
      userId,
      targetUserId,
      usedAt: new Date().toISOString(),
      isMatch: Math.random() > 0.8 // 20% Match-Wahrscheinlichkeit
    };

    res.json({
      success: true,
      message: 'Super-Like erfolgreich verwendet',
      data: superLike
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Use super like error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Verwenden des Super-Likes'
      });
    }
  }
};

/**
 * @route   GET /api/premium/usage
 * @desc    Premium-Nutzung abrufen
 * @access  Private
 */
export const getPremiumUsage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Mock: Premium-Nutzung
    const usage = {
      likes: {
        used: 15,
        limit: -1, // -1 = unbegrenzt
        remaining: -1
      },
      superLikes: {
        used: 2,
        limit: 5,
        remaining: 3,
        resetDate: '2024-01-16T00:00:00Z'
      },
      boosts: {
        used: 1,
        limit: 1,
        remaining: 0,
        resetDate: '2024-01-16T00:00:00Z'
      },
      passport: {
        used: 0,
        limit: 1,
        remaining: 1,
        resetDate: '2024-01-16T00:00:00Z'
      }
    };

    res.json({
      success: true,
      message: 'Premium-Nutzung erfolgreich abgerufen',
      data: usage
    });
  } catch (error) {
    console.error('Get premium usage error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abrufen der Premium-Nutzung'
    });
  }
};

/**
 * @route   POST /api/premium/cancel
 * @desc    Abonnement kündigen
 * @access  Private
 */
export const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, reason } = req.body;

    if (!userId) {
      throw new CustomError('Benutzer-ID ist erforderlich', 400);
    }

    // Mock: Abonnement kündigen
    const cancellation = {
      userId,
      cancelledAt: new Date().toISOString(),
      reason: reason || 'Kein Grund angegeben',
      effectiveDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 Stunden
      refundEligible: true
    };

    res.json({
      success: true,
      message: 'Abonnement erfolgreich gekündigt',
      data: cancellation
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Cancel subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Kündigen des Abonnements'
      });
    }
  }
};

/**
 * @route   POST /api/premium/upgrade
 * @desc    Abonnement upgraden
 * @access  Private
 */
export const upgradeSubscription = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, newPlanId, paymentMethod, paymentToken } = req.body;

    if (!userId || !newPlanId || !paymentMethod || !paymentToken) {
      throw new CustomError('Alle Felder sind erforderlich', 400);
    }

    // Mock: Upgrade-Verarbeitung
    const upgrade = {
      userId,
      oldPlanId: 'premium_monthly',
      newPlanId,
      upgradedAt: new Date().toISOString(),
      proratedAmount: 45.50,
      currency: 'EUR',
      newEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    };

    res.json({
      success: true,
      message: 'Abonnement erfolgreich upgegradet',
      data: upgrade
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Upgrade subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Upgraden des Abonnements'
      });
    }
  }
};
