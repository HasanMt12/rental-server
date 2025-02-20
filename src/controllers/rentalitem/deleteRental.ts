import { NextFunction, Request, Response } from 'express';
import { findRentalByProperty } from '../../services/rental';

const deleteRental = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const rentalItem = await findRentalByProperty('_id', id);
    if (!rentalItem) {
      res.status(404).json({
        status: 404,
        error: 'Rental not found',
      });
      return;
    }
    const deletedRental = await rentalItem.deleteOne();
    if (deletedRental.deletedCount === 0) {
      res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Rental deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteRental;
