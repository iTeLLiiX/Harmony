import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../types';

/**
 * Auth Middleware - JWT Token Verifizierung
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError('Kein Token bereitgestellt', 401);
    }

    const token = authHeader.substring(7); // "Bearer " entfernen
    
    if (!token) {
      throw new CustomError('Kein Token bereitgestellt', 401);
    }

    // JWT Token verifizieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'harmony-secret-key') as any;
    
    // User-ID zum Request hinzufügen
    req.user = {
      id: decoded.userId,
      phone: decoded.handynummer
    };
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new CustomError('Ungültiger Token', 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new CustomError('Token abgelaufen', 401));
    } else {
      next(error);
    }
  }
};

/**
 * Premium Middleware - Überprüft Premium-Status
 */
export const requirePremium = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Mock: Premium-Status prüfen
    const isPremium = req.headers['x-premium-user'] === 'true';
    
    if (!isPremium) {
      throw new CustomError('Premium-Abonnement erforderlich', 403);
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Admin Middleware - Überprüft Admin-Status
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Mock: Admin-Status prüfen
    const isAdmin = req.headers['x-admin-user'] === 'true';
    
    if (!isAdmin) {
      throw new CustomError('Admin-Berechtigung erforderlich', 403);
    }
    
    next();
  } catch (error) {
    next(error);
  }
};
