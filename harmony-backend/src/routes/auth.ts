import express from 'express';
import { body } from 'express-validator';
import { asyncHandler } from '../middleware/errorHandler';
import { 
  register, 
  login, 
  logout, 
  sendSMS,
  forgotPassword,
  resetPassword
} from '../controllers/authController';

const router = express.Router();

/**
 * @route   POST /api/auth/registrierung
 * @desc    Benutzer registrieren
 * @access  Public
 */
router.post('/registrierung', [
  body('handynummer')
    .isMobilePhone('de-DE')
    .withMessage('Bitte gib eine gültige deutsche Handynummer ein'),
  body('smsCode')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('SMS-Code muss 6 Ziffern haben'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name muss zwischen 2 und 50 Zeichen haben'),
  body('alter')
    .isInt({ min: 18, max: 99 })
    .withMessage('Alter muss zwischen 18 und 99 Jahren liegen'),
  body('geschlecht')
    .isIn(['männlich', 'weiblich', 'divers'])
    .withMessage('Geschlecht muss männlich, weiblich oder divers sein'),
  body('suchtGeschlecht')
    .isIn(['männlich', 'weiblich', 'alle'])
    .withMessage('Suchpräferenz muss männlich, weiblich oder alle sein'),
  body('plz')
    .isPostalCode('DE')
    .withMessage('Bitte gib eine gültige deutsche PLZ ein'),
  body('entfernung')
    .isInt({ min: 5, max: 100 })
    .withMessage('Entfernung muss zwischen 5 und 100 km liegen'),
  body('wasSuchst')
    .isIn(['Beziehung', 'Freundschaft', 'Beides'])
    .withMessage('Was du suchst muss Beziehung, Freundschaft oder Beides sein'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Bitte gib eine gültige Email-Adresse ein')
], asyncHandler(register));

/**
 * @route   POST /api/auth/login
 * @desc    Benutzer anmelden
 * @access  Public
 */
router.post('/login', [
  body('handynummer')
    .isMobilePhone('de-DE')
    .withMessage('Bitte gib eine gültige deutsche Handynummer ein'),
  body('smsCode')
    .optional()
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('SMS-Code muss 6 Ziffern haben')
], asyncHandler(login));

/**
 * @route   POST /api/auth/logout
 * @desc    Benutzer abmelden
 * @access  Private
 */
router.post('/logout', asyncHandler(logout));

/**
 * @route   POST /api/auth/refresh
 * @desc    Token erneuern
 * @access  Private
 */
// Refresh Token Route entfernt - nicht implementiert

/**
 * @route   POST /api/auth/sms/send
 * @desc    SMS-Code senden
 * @access  Public
 */
router.post('/sms/send', [
  body('handynummer')
    .isMobilePhone('de-DE')
    .withMessage('Bitte gib eine gültige deutsche Handynummer ein')
], asyncHandler(sendSMS));

/**
 * @route   POST /api/auth/sms/verify
 * @desc    SMS-Code verifizieren
 * @access  Public
 */
router.post('/sms/verify', [
  body('handynummer')
    .isMobilePhone('de-DE')
    .withMessage('Bitte gib eine gültige deutsche Handynummer ein'),
  body('code')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('SMS-Code muss 6 Ziffern haben')
], asyncHandler(login)); // SMS-Verifizierung ist Teil des Login-Prozesses

/**
 * @route   POST /api/auth/password/forgot
 * @desc    Passwort vergessen
 * @access  Public
 */
router.post('/password/forgot', [
  body('email')
    .isEmail()
    .withMessage('Bitte gib eine gültige Email-Adresse ein')
], asyncHandler(forgotPassword));

/**
 * @route   POST /api/auth/password/reset
 * @desc    Passwort zurücksetzen
 * @access  Public
 */
router.post('/password/reset', [
  body('token')
    .notEmpty()
    .withMessage('Reset-Token ist erforderlich'),
  body('passwort')
    .isLength({ min: 6 })
    .withMessage('Passwort muss mindestens 6 Zeichen haben')
], asyncHandler(resetPassword));

export default router;
