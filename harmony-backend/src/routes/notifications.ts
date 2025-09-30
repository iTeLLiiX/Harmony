import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getNotificationSettings,
  updateNotificationSettings,
  sendNotification
} from '../controllers/notificationController';

const router = express.Router();

/**
 * @route   GET /api/notifications/:userId
 * @desc    Benachrichtigungen abrufen
 * @access  Private
 */
router.get('/:userId', [
  body('page').optional().isInt({ min: 1 }),
  body('limit').optional().isInt({ min: 1, max: 50 }),
  body('type').optional().isString(),
  body('unreadOnly').optional().isBoolean()
], asyncHandler(getNotifications));

/**
 * @route   PUT /api/notifications/:notificationId/read
 * @desc    Benachrichtigung als gelesen markieren
 * @access  Private
 */
router.put('/:notificationId/read', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(markNotificationAsRead));

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Alle Benachrichtigungen als gelesen markieren
 * @access  Private
 */
router.put('/read-all', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(markAllNotificationsAsRead));

/**
 * @route   DELETE /api/notifications/:notificationId
 * @desc    Benachrichtigung löschen
 * @access  Private
 */
router.delete('/:notificationId', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(deleteNotification));

/**
 * @route   GET /api/notifications/settings/:userId
 * @desc    Benachrichtigungseinstellungen abrufen
 * @access  Private
 */
router.get('/settings/:userId', asyncHandler(getNotificationSettings));

/**
 * @route   PUT /api/notifications/settings/:userId
 * @desc    Benachrichtigungseinstellungen aktualisieren
 * @access  Private
 */
router.put('/settings/:userId', [
  body('push').optional().isObject(),
  body('email').optional().isObject(),
  body('inApp').optional().isObject(),
  body('quietHours').optional().isObject()
], asyncHandler(updateNotificationSettings));

/**
 * @route   POST /api/notifications/send
 * @desc    Benachrichtigung senden (Admin)
 * @access  Private
 */
router.post('/send', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('type').notEmpty().isIn(['new_match', 'new_like', 'new_message', 'super_like', 'profile_view', 'marketing', 'system']),
  body('title').notEmpty().withMessage('Titel ist erforderlich'),
  body('message').notEmpty().withMessage('Nachricht ist erforderlich'),
  body('data').optional().isObject()
], asyncHandler(sendNotification));

export default router;
