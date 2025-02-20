import { NextFunction, Request, Response } from 'express';
import { getRentalsService } from '../../services/rental';

const getRentalsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { location, category, subCategory } = req.query;
    const serviceObject: {
      role?: string;
      userId?: string;
      location?: string;
      category?: string;
      subCategory?: string;
    } = {};

    if (location && typeof location === 'string') {
      serviceObject.location = location;
    }
    if (category && typeof category === 'string') {
      serviceObject.category = category;
    }
    if (subCategory && typeof subCategory === 'string') {
      serviceObject.subCategory = subCategory;
    }
    if (user) {
      serviceObject.role = user.role;
      serviceObject.userId = user._id;
    }
    const rentalItems = await getRentalsService(serviceObject);

    res.status(200).json({
      status: 200,
      message: 'Rental items fetched successfully',
      data: rentalItems,
    });
  } catch (error) {
    next(error);
  }
};

export default getRentalsById;
