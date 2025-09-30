import express from 'express';
import { body, param } from 'express-validator';
import {
  checkFeatureAccess,
  getUpgradeOptions,
  processUpgrade,
  remindLater,
  getFeatureLimits
} from '../controllers/paywallController';

const router = express.Router();

// Validierung für Feature-Zugang
const featureAccessValidation = [
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  param('feature').isString().withMessage('Ungültiges Feature')
];

// Validierung für Upgrade
const upgradeValidation = [
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  body('planId').isString().withMessage('Plan-ID ist erforderlich'),
  body('paymentMethod').isString().withMessage('Zahlungsmethode ist erforderlich')
];

// Validierung für Erinnerung
const remindLaterValidation = [
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  body('feature').isString().withMessage('Feature ist erforderlich'),
  body('remindInHours').optional().isInt({ min: 1, max: 168 }).withMessage('Erinnerung muss zwischen 1 und 168 Stunden liegen')
];

/**
 * @route GET /api/paywall/check/:userId/:feature
 * @desc Feature-Zugang prüfen
 * @access Private
 */
router.get('/check/:userId/:feature',
  featureAccessValidation,
  checkFeatureAccess
);

/**
 * @route GET /api/paywall/upgrade-options/:userId
 * @desc Upgrade-Optionen abrufen
 * @access Private
 */
router.get('/upgrade-options/:userId',
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  getUpgradeOptions
);

/**
 * @route POST /api/paywall/upgrade/:userId
 * @desc Upgrade durchführen
 * @access Private
 */
router.post('/upgrade/:userId',
  upgradeValidation,
  processUpgrade
);

/**
 * @route POST /api/paywall/remind-later/:userId
 * @desc "Später erinnern" für Paywall
 * @access Private
 */
router.post('/remind-later/:userId',
  remindLaterValidation,
  remindLater
);

/**
 * @route GET /api/paywall/feature-limits/:userId
 * @desc Feature-Limits abrufen
 * @access Private
 */
router.get('/feature-limits/:userId',
  param('userId').isMongoId().withMessage('Ungültige Benutzer-ID'),
  getFeatureLimits
);

export default router;