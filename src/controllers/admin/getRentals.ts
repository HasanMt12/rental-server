import { NextFunction, Request, Response } from 'express';
import { getRentalsService } from '../../services/rental';

const getRentals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // @ts-ignore
  const { user } = req;
  try {
    const rentals = await getRentalsService({ role: user.role, userId: user._id.toString() });
    res.status(200).json({
      status: 200,
      message: 'Rentals found',
      data: rentals,
    });
  } catch (error) {
    next(error);
  }
};

export default getRentals;
