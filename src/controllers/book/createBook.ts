import { NextFunction, Request, Response } from 'express';
import { createBookService } from '../../services/book';
import { findRentalByProperty } from '../../services/rental';

const createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { rental, bookedDates } = req.body;
    const isExistRentalItem = await findRentalByProperty('_id', rental);
    if (!isExistRentalItem) {
      res.status(404).json({
        status: 404,
        message: 'Rental item not found',
      });
      return;
    }
    // handle edge case if user try to book already booked dates
    const hasCommonElement = bookedDates.some((d: number) => isExistRentalItem.bookedDates.includes(d));
    if (hasCommonElement) {
      res.status(400).json({
        status: 400,
        error: 'Some dates are already booked',
      });
      return;
    }
    const totalPrice = isExistRentalItem.price * bookedDates.length;
    const discount = totalPrice * (isExistRentalItem.discount / 100);
    const calculatePrice = totalPrice - discount;

    const createdBook = await createBookService({
      user: user._id,
      lessor: isExistRentalItem.owner.toString(),
      rental,
      rentalPrice: Math.round(calculatePrice),
      bookedDates,
    });
    isExistRentalItem.bookedDates.push(...bookedDates);
    await isExistRentalItem.save();
    res.status(201).json({
      status: 201,
      message: 'Book created successfully',
      data: createdBook,
    });
  } catch (error) {
    next(error);
  }
};

export default createBook;
