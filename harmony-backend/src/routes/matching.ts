import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import {
  getPotentialMatches,
  likeProfile,
  dislikeProfile,
  getMatches,
  getWhoLikedMe,
  blockUser,
  reportUser
} from '../controllers/matchingController';

const router = express.Router();

/**
 * @route   GET /api/matching/profiles
 * @desc    Potentielle Matches abrufen
 * @access  Private
 */
router.get('/profiles', [
  body('ageRange').optional().isString(),
  body('distance').optional().isInt({ min: 1, max: 100 }),
  body('interests').optional().isString(),
  body('gender').optional().isIn(['männlich', 'weiblich', 'alle']),
  body('page').optional().isInt({ min: 1 }),
  body('limit').optional().isInt({ min: 1, max: 50 })
], asyncHandler(getPotentialMatches));

/**
 * @route   POST /api/matching/like
 * @desc    Profil liken
 * @access  Private
 */
router.post('/like', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('targetUserId').notEmpty().withMessage('Ziel-Benutzer-ID ist erforderlich'),
  body('isSuperLike').optional().isBoolean()
], asyncHandler(likeProfile));

/**
 * @route   POST /api/matching/dislike
 * @desc    Profil ablehnen
 * @access  Private
 */
router.post('/dislike', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('targetUserId').notEmpty().withMessage('Ziel-Benutzer-ID ist erforderlich')
], asyncHandler(dislikeProfile));

/**
 * @route   GET /api/matching/matches/:userId
 * @desc    Alle Matches abrufen
 * @access  Private
 */
router.get('/matches/:userId', asyncHandler(getMatches));

/**
 * @route   GET /api/matching/who-liked-me/:userId
 * @desc    Wer hat mich geliket abrufen (Premium Feature)
 * @access  Private
 */
router.get('/who-liked-me/:userId', asyncHandler(getWhoLikedMe));

/**
 * @route   POST /api/matching/block
 * @desc    Benutzer blockieren
 * @access  Private
 */
router.post('/block', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('targetUserId').notEmpty().withMessage('Ziel-Benutzer-ID ist erforderlich'),
  body('reason').optional().isString()
], asyncHandler(blockUser));

/**
 * @route   POST /api/matching/report
 * @desc    Benutzer melden
 * @access  Private
 */
router.post('/report', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('targetUserId').notEmpty().withMessage('Ziel-Benutzer-ID ist erforderlich'),
  body('reason').notEmpty().isIn(['Unangemessene Inhalte', 'Spam oder Betrug', 'Belästigung', 'Falsche Identität', 'Sonstiges']),
  body('description').optional().isString()
], asyncHandler(reportUser));

export default router;