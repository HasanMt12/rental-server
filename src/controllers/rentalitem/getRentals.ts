import { NextFunction, Request, Response } from 'express';
import { getRentalsService } from '../../services/rental';
import { GetRentalsInput } from '../../services/rental/getRentals';

const getRentals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { location, category, subCategory, dates } = req.query;
    let date;
    if (dates && typeof dates === 'string') {
      date = dates.split(',').map((date) => +date);
    }
    const serviceObject: GetRentalsInput = {};

    if (location && typeof location === 'string') {
      serviceObject.location = location;
    }
    if (category && typeof category === 'string') {
      serviceObject.category = category;
    }
    if (subCategory && typeof subCategory === 'string') {
      serviceObject.subCategory = subCategory;
    }
    if (date && Array.isArray(date)) {
      serviceObject.date = date;
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

export default getRentals;
