import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

/**
 * @route   GET /api/matching/profiles
 * @desc    Profile für Matching abrufen
 * @access  Private
 */
router.get('/profiles', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Profile erfolgreich abgerufen',
    data: [
      {
        id: '1',
        name: 'Sarah',
        alter: 28,
        entfernung: 5,
        matchScore: 85
      }
    ]
  });
}));

/**
 * @route   POST /api/matching/like
 * @desc    Profil liken
 * @access  Private
 */
router.post('/like', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Profil erfolgreich geliket'
  });
}));

export default router;