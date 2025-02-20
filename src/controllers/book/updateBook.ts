import { NextFunction, Request, Response } from 'express';
import { findBookByProperty } from '../../services/book';
import { findRentalByProperty } from '../../services/rental';
import findUserByProperty from '../../services/user/findUserByProperty';

const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { id } = req.params;
    const { status } = req.body;
    // query validation start nothing else
    const lessorValidStatuses = ['pending', 'confirm', 'completed', 'rejected'];
    const userValidStatuses = ['cancelled'];

    if ((user.role === 'lessor' && status && !lessorValidStatuses.includes(status)) || !status) {
      res.status(400).json({
        status: 400,
        error: 'Invalid status',
      });
      return;
    }
    if ((user.role === 'user' && status && !userValidStatuses.includes(status)) || !status) {
      res.status(400).json({
        status: 400,
        error: 'Invalid status',
      });
      return;
    }
    // query validation stop
    const isBookExist = await findBookByProperty('_id', id);
    if (!isBookExist) {
      res.status(404).json({
        status: 404,
        error: 'Book not found',
      });
      return;
    }

    const isUserExist = await findUserByProperty('email', user.email);
    const isUserNotAllowedToUpdate = (user.role === 'user' && ['completed', 'rejected'].includes(isBookExist.status)) || (isUserExist && user.role === 'user' && isUserExist._id.toString() !== isBookExist.user.toString()) || (isUserExist && user.role === 'lessor' && isUserExist._id.toString() !== isBookExist.lessor.toString());
    if (isUserNotAllowedToUpdate) {
      res.status(400).json({
        status: 400,
        error: 'You can not update this book',
      });
      return;
    }

    // update booked date by removing booked dates from rental item
    if ((user.role === 'lessor' && status === 'rejected') || (user.role === 'user' && status === 'cancelled')) {
      const rental = await findRentalByProperty('_id', isBookExist.rental.toString());
      if (!rental) {
        res.status(404).json({
          status: 404,
          error: 'Rental not found any how',
        });
        return;
      }
      const filterBookedDates = rental.bookedDates.filter((d: number) => !isBookExist.bookedDates.includes(d));
      await rental.updateOne({ bookedDates: filterBookedDates });
    }
    isBookExist.status = status ?? isBookExist.status;
    await isBookExist.save();
    res.status(200).json({
      status: 200,
      message: 'Book updated successfully',
      data: isBookExist,
    });
  } catch (error) {
    next(error);
  }
};

export default updateBook;
