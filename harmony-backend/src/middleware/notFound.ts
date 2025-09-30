import { Request, Response, NextFunction } from 'express';
import { CustomError } from './errorHandler';

/**
 * 404 Handler für nicht gefundene Routen
 */
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new CustomError(`Route nicht gefunden - ${req.originalUrl}`, 404);
  next(error);
};
