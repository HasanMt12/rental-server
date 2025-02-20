import { NextFunction, Request, Response } from 'express';
import { getBooksService } from '../../services/book';
import { createReviewService } from '../../services/review';

const createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { rating, comment } = req.body;

    const bookedItems = await getBooksService(user._id, user.role, 'completed');

    if (!bookedItems || (bookedItems && bookedItems.length === 0)) {
      res.status(400).json({
        status: 400,
        error: 'You have not take any service',
      });
      return;
    }

    const review = await createReviewService({
      name: user.name,
      email: user.email,
      photo: user.photo,
      rating,
      comment,
    });
    if (!review) {
      res.status(400).json({
        status: 400,
        error: 'Review could not be created',
      });
      return;
    }
    res.status(201).json({
      status: 201,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export default createReview;
