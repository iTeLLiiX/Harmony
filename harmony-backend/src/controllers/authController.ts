import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { CustomError } from '../middleware/errorHandler';

// In-Memory Storage für SMS-Codes (in Produktion: Redis)
const smsCodes = new Map<string, { code: string; expires: number }>();

/**
 * @route   POST /api/auth/register
 * @desc    Benutzer registrieren
 * @access  Public
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError('Ungültige Eingabedaten', 400);
    }

    const { handynummer, email, passwort, profil } = req.body;

    // Mock: Neuen Benutzer erstellen
    const benutzer = {
      _id: '123',
      handynummer,
      email,
      passwort,
      profil: profil || {}
    };

    // JWT Token generieren
    const token = jwt.sign(
      { userId: benutzer._id, handynummer: benutzer.handynummer },
      process.env.JWT_SECRET || 'harmony-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registrierung erfolgreich!',
      token,
      benutzer: {
        id: benutzer._id,
        handynummer: benutzer.handynummer,
        email: benutzer.email,
        verifiziert: false
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler bei der Registrierung'
      });
    }
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Benutzer anmelden
 * @access  Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { handynummer, smsCode, email, passwort } = req.body;

    // Mock: Benutzer finden
    const benutzer = {
      _id: '123',
      handynummer,
      email,
      passwort: 'hashed_password'
    };

    // SMS-Verifizierung
    if (handynummer && smsCode) {
      const storedCode = smsCodes.get(handynummer);
      if (!storedCode || storedCode.code !== smsCode || Date.now() > storedCode.expires) {
        throw new CustomError('Ungültiger oder abgelaufener SMS-Code', 400);
      }
      // SMS-Code aus Storage entfernen
      smsCodes.delete(handynummer);
    }
    
    // Passwort-Login
    if (passwort && benutzer.passwort) {
      // Mock: Passwort-Verifizierung
      if (passwort !== 'demo123') {
        throw new CustomError('Ungültiges Passwort', 401);
      }
    }

    // JWT Token generieren
    const token = jwt.sign(
      { userId: benutzer._id, handynummer: benutzer.handynummer },
      process.env.JWT_SECRET || 'harmony-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Anmeldung erfolgreich!',
      token,
      benutzer: {
        id: benutzer._id,
        handynummer: benutzer.handynummer,
        email: benutzer.email,
        verifiziert: true
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler bei der Anmeldung'
      });
    }
  }
};

/**
 * @route   POST /api/auth/send-sms
 * @desc    SMS-Code senden
 * @access  Public
 */
export const sendSMS = async (req: Request, res: Response): Promise<void> => {
  try {
    const { handynummer } = req.body;

    if (!handynummer) {
      throw new CustomError('Handynummer ist erforderlich', 400);
    }

    // SMS-Code generieren
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 Minuten

    // Code speichern
    smsCodes.set(handynummer, { code, expires });

    // In Produktion: Hier würde Twilio SMS senden
    console.log(`SMS-Code für ${handynummer}: ${code}`);

    res.json({
      success: true,
      message: 'SMS-Code wurde gesendet',
      code: code // Nur für Demo-Zwecke
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Send SMS error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Senden der SMS'
      });
    }
  }
};

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Passwort vergessen
 * @access  Public
 */
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    // Mock: Benutzer finden
    const benutzer = {
      _id: '123',
      email
    };

    // Reset Token generieren
    const resetToken = jwt.sign(
      { userId: benutzer._id },
      process.env.JWT_SECRET || 'harmony-secret-key',
      { expiresIn: '1h' }
    );

    // In Produktion: Hier würde Email gesendet werden
    console.log(`Reset-Token für ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: 'Reset-Link wurde an deine Email gesendet',
      token: resetToken // Nur für Demo-Zwecke
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Zurücksetzen des Passworts'
      });
    }
  }
};

/**
 * @route   POST /api/auth/reset-password
 * @desc    Passwort zurücksetzen
 * @access  Public
 */
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, passwort } = req.body;

    // Mock: Token verifizieren
    if (!token) {
      throw new CustomError('Ungültiger oder abgelaufener Reset-Token', 400);
    }

    res.json({
      success: true,
      message: 'Passwort erfolgreich zurückgesetzt! Du kannst dich jetzt anmelden.'
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Server-Fehler beim Zurücksetzen des Passworts'
      });
    }
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Benutzer abmelden
 * @access  Private
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // In Produktion: Token zur Blacklist hinzufügen
    res.json({
      success: true,
      message: 'Erfolgreich abgemeldet'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server-Fehler beim Abmelden'
    });
  }
};