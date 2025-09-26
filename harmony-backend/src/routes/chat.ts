import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

/**
 * @route   GET /api/chat/conversations
 * @desc    Chat-Unterhaltungen abrufen
 * @access  Private
 */
router.get('/conversations', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Chats erfolgreich abgerufen',
    data: []
  });
}));

/**
 * @route   POST /api/chat/message
 * @desc    Nachricht senden
 * @access  Private
 */
router.post('/message', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Nachricht erfolgreich gesendet'
  });
}));

export default router;