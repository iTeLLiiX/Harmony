import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Benutzerprofil abrufen
 * @access  Private
 */
router.get('/profile', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Profil erfolgreich abgerufen',
    data: {
      id: '123',
      name: 'Max Mustermann',
      email: 'max@beispiel.de'
    }
  });
}));

/**
 * @route   PUT /api/users/profile
 * @desc    Benutzerprofil aktualisieren
 * @access  Private
 */
router.put('/profile', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Profil erfolgreich aktualisiert'
  });
}));

export default router;