import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import { upload, uploadPhoto, uploadMultiplePhotos, deletePhoto, setMainPhoto, getUserPhotos, uploadAvatar } from '../controllers/uploadController';

const router = express.Router();

/**
 * @route   POST /api/upload/photo
 * @desc    Profilfoto hochladen
 * @access  Private
 */
router.post('/photo', upload.single('photo'), [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich'),
  body('isMain').optional().isBoolean()
], asyncHandler(uploadPhoto));

/**
 * @route   POST /api/upload/multiple-photos
 * @desc    Mehrere Fotos hochladen
 * @access  Private
 */
router.post('/multiple-photos', upload.array('photos', 6), [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(uploadMultiplePhotos));

/**
 * @route   DELETE /api/upload/photo/:photoId
 * @desc    Foto löschen
 * @access  Private
 */
router.delete('/photo/:photoId', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(deletePhoto));

/**
 * @route   PUT /api/upload/photo/:photoId/main
 * @desc    Foto als Hauptfoto setzen
 * @access  Private
 */
router.put('/photo/:photoId/main', [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(setMainPhoto));

/**
 * @route   GET /api/upload/photos/:userId
 * @desc    Benutzerfotos abrufen
 * @access  Private
 */
router.get('/photos/:userId', asyncHandler(getUserPhotos));

/**
 * @route   POST /api/upload/avatar
 * @desc    Avatar hochladen
 * @access  Private
 */
router.post('/avatar', upload.single('avatar'), [
  body('userId').notEmpty().withMessage('Benutzer-ID ist erforderlich')
], asyncHandler(uploadAvatar));

export default router;
