import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import {
  getPremiumPlans,
  subscribeToPremium,
  getSubscription,
  activateProfileBoost,
  useSuperLike,
  getPremiumUsage,
  cancelSubscription,
  upgradeSubscription
} from '../controllers/premiumController';

const router = express.Router();

/**
 * @route   GET /api/premium/plans
 * @desc    Premium-Pläne abrufen
 * @access  Public
 */
router.get('/plans', asyncHandler(getPremiumPlans));

/**
 * @route   POST /api/premium/subscribe
 * @desc    Premium-Abonnement erstellen
 * @access  Private
 */
router.post('/subscribe', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('planId').notEmpty().withMessage('Plan-ID ist erforderlich'),
  body('paymentMethod').notEmpty().withMessage('Zahlungsmethode ist erforderlich'),
  body('paymentToken').notEmpty().withMessage('Payment-Token ist erforderlich')
], asyncHandler(subscribeToPremium));

/**
 * @route   GET /api/premium/subscription/:userId
 * @desc    Aktuelles Abonnement abrufen
 * @access  Private
 */
router.get('/subscription/:userId', asyncHandler(getSubscription));

/**
 * @route   POST /api/premium/boost
 * @desc    Profil-Boost aktivieren
 * @access  Private
 */
router.post('/boost', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(activateProfileBoost));

/**
 * @route   POST /api/premium/super-like
 * @desc    Super-Like verwenden
 * @access  Private
 */
router.post('/super-like', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('targetUserId').notEmpty().withMessage('Ziel-Benutzer-ID ist erforderlich')
], asyncHandler(useSuperLike));

/**
 * @route   GET /api/premium/usage/:userId
 * @desc    Premium-Nutzung abrufen
 * @access  Private
 */
router.get('/usage/:userId', asyncHandler(getPremiumUsage));

/**
 * @route   POST /api/premium/cancel
 * @desc    Abonnement kündigen
 * @access  Private
 */
router.post('/cancel', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('reason').optional().isString()
], asyncHandler(cancelSubscription));

/**
 * @route   POST /api/premium/upgrade
 * @desc    Abonnement upgraden
 * @access  Private
 */
router.post('/upgrade', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('newPlanId').notEmpty().withMessage('Neue Plan-ID ist erforderlich'),
  body('paymentMethod').notEmpty().withMessage('Zahlungsmethode ist erforderlich'),
  body('paymentToken').notEmpty().withMessage('Payment-Token ist erforderlich')
], asyncHandler(upgradeSubscription));

export default router;
