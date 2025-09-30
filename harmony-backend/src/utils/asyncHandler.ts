import { Request, Response, NextFunction } from 'express';

/**
 * Async Handler - Wrapper für async Route Handler
 * Fängt Fehler ab und leitet sie an den globalen Error Handler weiter
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
