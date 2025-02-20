import { NextFunction, Request, Response } from 'express-serve-static-core';
import findUserByProperty from '../../services/user/findUserByProperty';

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, isVarified } = req.body;
    if (status && status !== 'active' && status !== 'disable') {
      res.status(400).json({
        status: 400,
        error: 'Invalid status',
      });
      return;
    }
    if (isVarified && typeof isVarified !== 'boolean') {
      res.status(400).json({
        status: 400,
        error: 'Invalid isVarified',
      });
      return;
    }
    const isUserExists = await findUserByProperty('_id', id);
    if (!isUserExists) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
      return;
    }
    isUserExists.status = status ?? isUserExists.status;
    isUserExists.isVarified = isVarified ?? isUserExists.isVarified;
    await isUserExists.save();
    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
