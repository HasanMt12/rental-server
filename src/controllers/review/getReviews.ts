import { NextFunction, Request, Response } from 'express';
import { getReviewsService } from '../../services/review';

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await getReviewsService();
    res.status(200).json({
      status: 200,
      message: 'Reviews fetched successfully',
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export default getReviews;
