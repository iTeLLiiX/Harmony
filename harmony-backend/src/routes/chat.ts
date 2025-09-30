import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import {
  getConversations,
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,
  markMessagesAsRead,
  setTypingIndicator
} from '../controllers/chatController';

const router = express.Router();

/**
 * @route   GET /api/chat/conversations/:userId
 * @desc    Alle Chat-Unterhaltungen abrufen
 * @access  Private
 */
router.get('/conversations/:userId', [
  body('page').optional().isInt({ min: 1 }),
  body('limit').optional().isInt({ min: 1, max: 50 }),
  body('type').optional().isString(),
  body('unreadOnly').optional().isBoolean()
], asyncHandler(getConversations));

/**
 * @route   GET /api/chat/messages/:conversationId
 * @desc    Nachrichten einer Unterhaltung abrufen
 * @access  Private
 */
router.get('/messages/:conversationId', [
  body('page').optional().isInt({ min: 1 }),
  body('limit').optional().isInt({ min: 1, max: 100 })
], asyncHandler(getMessages));

/**
 * @route   POST /api/chat/message
 * @desc    Nachricht senden
 * @access  Private
 */
router.post('/message', [
  body('conversationId').notEmpty().withMessage('Konversations-ID ist erforderlich'),
  body('senderId').notEmpty().withMessage('Sender-ID ist erforderlich'),
  body('text').notEmpty().withMessage('Nachrichtentext ist erforderlich'),
  body('type').optional().isIn(['text', 'image', 'emoji', 'location']),
  body('replyToMessageId').optional().isString()
], asyncHandler(sendMessage));

/**
 * @route   PUT /api/chat/message/:messageId
 * @desc    Nachricht bearbeiten
 * @access  Private
 */
router.put('/message/:messageId', [
  body('text').notEmpty().withMessage('Nachrichtentext ist erforderlich'),
  body('senderId').notEmpty().withMessage('Sender-ID ist erforderlich')
], asyncHandler(editMessage));

/**
 * @route   DELETE /api/chat/message/:messageId
 * @desc    Nachricht löschen
 * @access  Private
 */
router.delete('/message/:messageId', [
  body('senderId').notEmpty().withMessage('Sender-ID ist erforderlich')
], asyncHandler(deleteMessage));

/**
 * @route   POST /api/chat/mark-read
 * @desc    Nachrichten als gelesen markieren
 * @access  Private
 */
router.post('/mark-read', [
  body('conversationId').notEmpty().withMessage('Konversations-ID ist erforderlich'),
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(markMessagesAsRead));

/**
 * @route   POST /api/chat/typing
 * @desc    Typing-Indikator senden
 * @access  Private
 */
router.post('/typing', [
  body('conversationId').notEmpty().withMessage('Konversations-ID ist erforderlich'),
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('isTyping').isBoolean().withMessage('Typing-Status muss boolean sein')
], asyncHandler(setTypingIndicator));

export default router;