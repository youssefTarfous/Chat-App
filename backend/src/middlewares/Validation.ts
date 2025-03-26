import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware to handle validation errors from `checkSchema`
 */
export const validationResultHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, errors: errors.mapped() });
  }
  next();
};

