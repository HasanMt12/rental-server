import { NextFunction, Request, Response } from 'express';
import findUserByProperty from '../../services/user/findUserByProperty';

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isUserExists = await findUserByProperty('_id', id);
    if (!isUserExists) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
      return;
    }
    const deletedUser = await isUserExists.deleteOne();
    if (deletedUser.deletedCount === 0) {
      res.status(400).json({
        status: 400,
        error: 'User not deleted',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
