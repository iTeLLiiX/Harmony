import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import {
  getDashboard,
  getMatchAnalytics,
  getMessageAnalytics,
  getProfileAnalytics,
  trackEvent,
  exportAnalytics
} from '../controllers/analyticsController';

const router = express.Router();

/**
 * @route   GET /api/analytics/dashboard/:userId
 * @desc    Analytics Dashboard abrufen
 * @access  Private
 */
router.get('/dashboard/:userId', [
  body('period').optional().isIn(['7d', '30d', '90d', '1y'])
], asyncHandler(getDashboard));

/**
 * @route   GET /api/analytics/matches/:userId
 * @desc    Match-Analytics abrufen
 * @access  Private
 */
router.get('/matches/:userId', [
  body('period').optional().isIn(['7d', '30d', '90d', '1y'])
], asyncHandler(getMatchAnalytics));

/**
 * @route   GET /api/analytics/messages/:userId
 * @desc    Nachrichten-Analytics abrufen
 * @access  Private
 */
router.get('/messages/:userId', [
  body('period').optional().isIn(['7d', '30d', '90d', '1y'])
], asyncHandler(getMessageAnalytics));

/**
 * @route   GET /api/analytics/profile/:userId
 * @desc    Profil-Analytics abrufen
 * @access  Private
 */
router.get('/profile/:userId', asyncHandler(getProfileAnalytics));

/**
 * @route   POST /api/analytics/event
 * @desc    Analytics-Event tracken
 * @access  Private
 */
router.post('/event', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('event').notEmpty().isIn(['profile_view', 'profile_like', 'profile_dislike', 'message_sent', 'message_received', 'match_created', 'photo_uploaded', 'profile_updated', 'search_performed', 'filter_applied']),
  body('properties').optional().isObject()
], asyncHandler(trackEvent));

/**
 * @route   GET /api/analytics/export/:userId
 * @desc    Analytics-Daten exportieren
 * @access  Private
 */
router.get('/export/:userId', [
  body('format').optional().isIn(['json', 'csv', 'pdf']),
  body('period').optional().isIn(['7d', '30d', '90d', '1y'])
], asyncHandler(exportAnalytics));

export default router;
