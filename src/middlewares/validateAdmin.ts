import { NextFunction, Request, Response } from 'express';
import findUserByProperty from '../services/user/findUserByProperty';

const validateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // @ts-ignore
  const { user } = req;
  try {
    const isAdminExist = await findUserByProperty('email', user.email);
    if (!isAdminExist) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
      return;
    }
    if (isAdminExist.role !== 'admin') {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
      return;
    }
    // @ts-ignore
    req.user = isAdminExist;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateAdmin;
