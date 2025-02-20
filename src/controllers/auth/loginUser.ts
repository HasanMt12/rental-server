import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import findUserByProperty from '../../services/user/findUserByProperty';

const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  try {
    const isUserExist = await findUserByProperty('email', email);
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        error: 'User not exist',
      });
      return;
    }

    if (isUserExist.status === 'disable') {
      res.status(200).json({
        status: 403,
        error: 'User is disabled',
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
      res.status(401).json({
        status: 401,
        error: 'Invalid password',
      });
      return;
    }

    // create token using api call
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign(
      {
        email: isUserExist.email,
        role: isUserExist.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN ? parseInt(process.env.JWT_EXPIRES_IN, 10) : 0,
      }
    );

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: process.env.COOKIE_EXPIRES_IN ? parseInt(process.env.COOKIE_EXPIRES_IN, 10) : 0,
      })
      .json({
        status: 200,
        message: 'Login success',
        data: {
          _id: isUserExist._id,
          email: isUserExist.email,
          name: isUserExist.name,
          photo: isUserExist.photo,
          role: isUserExist.role,
          status: isUserExist.status,
          isVarified: isUserExist.isVarified,
        },
      });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
