import { NextFunction, Request, Response } from 'express';

export const resourceValidate = (req: Request, res: Response, next: NextFunction) => {
  const { name, category, description } = req.body;

  if (!name || !category || !description) {
    return res.status(400).json({ success: 'false', error: 'Missing required fields' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ success: 'false', error: 'Invalid name type' });
  }
  if (typeof category !== 'string') {
    return res.status(400).json({ success: 'false', error: 'Invalid category type' });
  }
  if (typeof description !== 'string') {
    return res.status(400).json({ success: 'false', error: 'Invalid description type' });
  }

  next();
};
