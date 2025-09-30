import express from 'express';
import { body, param } from 'express-validator';
import {
  getOnboardingSteps,
  completeOnboardingStep,
  getOnboardingProgress,
  completeOnboarding,
  skipPremiumUpsell
} from '../controllers/onboardingController';

const router = express.Router();

// Validierung für Onboarding-Schritt
const onboardingStepValidation = [
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  param('stepId').isString().withMessage('Ungültige Schritt-ID'),
  body('data').optional().isObject().withMessage('Daten müssen ein Objekt sein')
];

// Validierung für Premium-Upsell
const premiumUpsellValidation = [
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID')
];

/**
 * @route GET /api/onboarding/steps/:userId
 * @desc Onboarding-Schritte für Benutzer abrufen
 * @access Private
 */
router.get('/steps/:userId', 
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  getOnboardingSteps
);

/**
 * @route POST /api/onboarding/step/:userId/:stepId
 * @desc Onboarding-Schritt abschließen
 * @access Private
 */
router.post('/step/:userId/:stepId',
  onboardingStepValidation,
  completeOnboardingStep
);

/**
 * @route GET /api/onboarding/progress/:userId
 * @desc Onboarding-Fortschritt abrufen
 * @access Private
 */
router.get('/progress/:userId',
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  getOnboardingProgress
);

/**
 * @route POST /api/onboarding/complete/:userId
 * @desc Onboarding abschließen
 * @access Private
 */
router.post('/complete/:userId',
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  completeOnboarding
);

/**
 * @route POST /api/onboarding/skip-premium/:userId
 * @desc Premium-Upsell überspringen
 * @access Private
 */
router.post('/skip-premium/:userId',
  premiumUpsellValidation,
  skipPremiumUpsell
);

export default router;