import { NextFunction, Request, Response } from 'express';
import findUserByProperty from '../../services/user/findUserByProperty';

const getUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const user = req.user;

  try {
    const existingUser = await findUserByProperty('email', user.email);

    if (!existingUser) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'User found',
      data: {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        photo: existingUser.photo,
        role: existingUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getUserData;
