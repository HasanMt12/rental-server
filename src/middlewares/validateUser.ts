import { NextFunction, Request, Response } from 'express';
import findUserByProperty from '../services/user/findUserByProperty';

const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // @ts-ignore
  const { user } = req;
  try {
    const isUserExist = await findUserByProperty('email', user.email);
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
      return;
    }
    if (isUserExist.role !== 'user') {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
      return;
    }
    // @ts-ignore
    req.user = isUserExist;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUser;
