import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'Unauthorized',
      });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : '');

    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateToken;
