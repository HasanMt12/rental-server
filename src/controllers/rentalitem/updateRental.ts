import { NextFunction, Request, Response } from 'express';
import { findRentalByProperty } from '../../services/rental';

const updateRental = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user: owner } = req;
  const { name, description, price, discount, category, location, status, images, bookedDates } = req.body;
  const { id } = req.params;
  try {
    const isExist = await findRentalByProperty('_id', id);
    if (!isExist) {
      res.status(404).json({
        status: 404,
        error: 'Rental not found',
      });
      return;
    }
    if (owner.isVarified === false) {
      res.status(403).json({
        status: 403,
        error: 'You are not varified. Please varify your account by uploading your varification documents',
      });
      return;
    }
    const updatedRental = await isExist.updateOne({
      name,
      description,
      price,
      discount,
      category,
      location,
      status,
      images,
      bookedDates,
    });
    if (updatedRental.modifiedCount === 0) {
      res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Rental updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default updateRental;
