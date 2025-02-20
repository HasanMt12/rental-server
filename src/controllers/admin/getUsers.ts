import { NextFunction, Request, Response } from 'express';
import { getUsersService } from '../../services/admin';

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { role } = req.query;
    const validRoles = ['lessor', 'user'];
    if (role && !validRoles.includes(role as string)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid role',
      });
      return;
    }
    const users = await getUsersService(role as string);
    res.status(200).json({
      status: 200,
      message: 'Users found',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
