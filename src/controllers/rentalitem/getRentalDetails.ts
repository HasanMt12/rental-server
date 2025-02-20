import { NextFunction, Request, Response } from 'express';
import { findRentalByProperty } from '../../services/rental';

const getRentalDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const rental = await findRentalByProperty('_id', id);
    if (!rental) {
      res.status(404).json({
        status: 404,
        error: 'Rental not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Rental details',
      data: rental,
    });
  } catch (error) {
    next(error);
  }
};

export default getRentalDetails;
