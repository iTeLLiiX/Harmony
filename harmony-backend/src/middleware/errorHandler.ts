import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

/**
 * Globaler Error Handler für die Harmony API
 * Deutsche Fehlermeldungen für bessere Benutzerfreundlichkeit
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err } as AppError;
  error.message = err.message;

  // Log Error für Debugging
  console.error('❌ API Fehler:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Ungültige ID - Ressource nicht gefunden';
    error = {
      name: 'CastError',
      message,
      statusCode: 404,
      isOperational: true
    } as AppError;
  }

  // Mongoose Duplicate Key
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    let message = 'Daten bereits vorhanden';
    
    if (field === 'handynummer') {
      message = 'Diese Handynummer ist bereits registriert';
    } else if (field === 'email') {
      message = 'Diese Email-Adresse ist bereits registriert';
    }
    
    error = {
      name: 'MongoError',
      message,
      statusCode: 400,
      isOperational: true
    } as AppError;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = 'Ungültige Eingabedaten';
    error = {
      name: 'ValidationError',
      message,
      statusCode: 400,
      isOperational: true
    } as AppError;
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Ungültiger Token';
    error = {
      name: 'JsonWebTokenError',
      message,
      statusCode: 401,
      isOperational: true
    } as AppError;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token ist abgelaufen';
    error = {
      name: 'TokenExpiredError',
      message,
      statusCode: 401,
      isOperational: true
    } as AppError;
  }

  // Rate Limit Error
  if (err.name === 'TooManyRequestsError') {
    const message = 'Zu viele Anfragen - bitte warte einen Moment';
    error = {
      name: 'TooManyRequestsError',
      message,
      statusCode: 429,
      isOperational: true
    } as AppError;
  }

  // File Upload Errors
  if (err.name === 'MulterError') {
    let message = 'Fehler beim Hochladen der Datei';
    
    if ((err as any).code === 'LIMIT_FILE_SIZE') {
      message = 'Datei ist zu groß - Maximum 5MB';
    } else if ((err as any).code === 'LIMIT_FILE_COUNT') {
      message = 'Zu viele Dateien - Maximum 5 Fotos';
    } else if ((err as any).code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Unerwartete Datei - nur Bilder erlaubt';
    }
    
    error = {
      name: 'MulterError',
      message,
      statusCode: 400,
      isOperational: true
    } as AppError;
  }

  // Network/Connection Errors
  if (err.name === 'MongoNetworkError') {
    const message = 'Datenbankverbindung fehlgeschlagen - bitte versuche es später erneut';
    error = {
      name: 'MongoNetworkError',
      message,
      statusCode: 503,
      isOperational: true
    } as AppError;
  }

  // Default Error
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = 'Interner Serverfehler - bitte versuche es später erneut';
  }

  // Response
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    }),
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  });
};

/**
 * 404 Handler für nicht gefundene Routen
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Route nicht gefunden - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  error.isOperational = true;
  next(error);
};

/**
 * Async Error Wrapper für Controller
 */
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom Error Klasse
 */
export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Deutsche Fehlermeldungen für verschiedene Szenarien
 */
export const errorMessages = {
  // Authentifizierung
  AUTH_REQUIRED: 'Anmeldung erforderlich',
  AUTH_INVALID: 'Ungültige Anmeldedaten',
  AUTH_EXPIRED: 'Anmeldung abgelaufen',
  AUTH_FORBIDDEN: 'Zugriff verweigert',
  
  // Benutzer
  USER_NOT_FOUND: 'Benutzer nicht gefunden',
  USER_EXISTS: 'Benutzer bereits vorhanden',
  USER_INVALID_DATA: 'Ungültige Benutzerdaten',
  USER_PROFILE_INCOMPLETE: 'Profil unvollständig',
  
  // Matching
  MATCH_NOT_FOUND: 'Match nicht gefunden',
  MATCH_ALREADY_EXISTS: 'Match bereits vorhanden',
  MATCH_INVALID: 'Ungültiges Match',
  
  // Chat
  CHAT_NOT_FOUND: 'Chat nicht gefunden',
  CHAT_ACCESS_DENIED: 'Kein Zugriff auf diesen Chat',
  MESSAGE_INVALID: 'Ungültige Nachricht',
  
  // Dateien
  FILE_TOO_LARGE: 'Datei zu groß',
  FILE_INVALID_TYPE: 'Ungültiger Dateityp',
  FILE_UPLOAD_FAILED: 'Datei-Upload fehlgeschlagen',
  
  // Validierung
  VALIDATION_REQUIRED: 'Pflichtfeld fehlt',
  VALIDATION_INVALID_FORMAT: 'Ungültiges Format',
  VALIDATION_TOO_SHORT: 'Zu kurz',
  VALIDATION_TOO_LONG: 'Zu lang',
  VALIDATION_INVALID_RANGE: 'Ungültiger Bereich',
  
  // Server
  SERVER_ERROR: 'Interner Serverfehler',
  DATABASE_ERROR: 'Datenbankfehler',
  NETWORK_ERROR: 'Netzwerkfehler',
  TIMEOUT_ERROR: 'Zeitüberschreitung',
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: 'Zu viele Anfragen',
  RATE_LIMIT_RETRY_AFTER: 'Bitte warte einen Moment',
  
  // DSGVO
  DATA_DELETION_FAILED: 'Datenlöschung fehlgeschlagen',
  DATA_EXPORT_FAILED: 'Datenexport fehlgeschlagen',
  CONSENT_REQUIRED: 'Einwilligung erforderlich'
};

/**
 * Error Logger für Monitoring
 */
export const logError = (error: Error, context?: any): void => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    name: error.name,
    context,
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  };

  // Hier könnte ein externer Logging-Service integriert werden
  console.error('🚨 Error Log:', JSON.stringify(errorLog, null, 2));
  
  // In Produktion: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Externes Logging implementieren
  }
};
