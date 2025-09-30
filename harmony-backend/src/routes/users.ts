import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import {
  getProfile,
  updateProfile,
  uploadPhoto,
  deletePhoto,
  setMainPhoto,
  getSettings,
  updateSettings,
  deleteAccount
} from '../controllers/userController';

const router = express.Router();

/**
 * @route   GET /api/users/profile/:userId
 * @desc    Benutzerprofil abrufen
 * @access  Private
 */
router.get('/profile/:userId', asyncHandler(getProfile));

/**
 * @route   PUT /api/users/profile/:userId
 * @desc    Benutzerprofil aktualisieren
 * @access  Private
 */
router.put('/profile/:userId', [
  body('name').optional().isLength({ min: 2, max: 50 }),
  body('age').optional().isInt({ min: 18, max: 99 }),
  body('bio').optional().isLength({ max: 500 }),
  body('interests').optional().isArray(),
  body('location.zipCode').optional().isPostalCode('DE'),
  body('preferences.ageRange').optional().isArray({ min: 2, max: 2 }),
  body('preferences.maxDistance').optional().isInt({ min: 1, max: 100 })
], asyncHandler(updateProfile));

/**
 * @route   POST /api/users/photos
 * @desc    Foto hochladen
 * @access  Private
 */
router.post('/photos', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('isMain').optional().isBoolean()
], asyncHandler(uploadPhoto));

/**
 * @route   DELETE /api/users/photos/:photoId
 * @desc    Foto löschen
 * @access  Private
 */
router.delete('/photos/:photoId', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(deletePhoto));

/**
 * @route   PUT /api/users/photos/:photoId/main
 * @desc    Foto als Hauptfoto setzen
 * @access  Private
 */
router.put('/photos/:photoId/main', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(setMainPhoto));

/**
 * @route   GET /api/users/settings/:userId
 * @desc    Benutzereinstellungen abrufen
 * @access  Private
 */
router.get('/settings/:userId', asyncHandler(getSettings));

/**
 * @route   PUT /api/users/settings/:userId
 * @desc    Benutzereinstellungen aktualisieren
 * @access  Private
 */
router.put('/settings/:userId', [
  body('notifications').optional().isObject(),
  body('privacy').optional().isObject(),
  body('discovery').optional().isObject(),
  body('account').optional().isObject()
], asyncHandler(updateSettings));

/**
 * @route   DELETE /api/users/account/:userId
 * @desc    Benutzerkonto löschen
 * @access  Private
 */
router.delete('/account/:userId', [
  body('password').notEmpty().withMessage('Passwort ist erforderlich'),
  body('reason').optional().isString()
], asyncHandler(deleteAccount));

export default router;