import { NextFunction, Request, Response } from 'express';
import { findReviewByProperty } from '../../services/review';

const deleteReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const review = await findReviewByProperty('_id', id);
    if (!review) {
      res.status(404).json({
        status: 404,
        error: 'Review not found',
      });
      return;
    }
    const deletedReview = await review.deleteOne();
    if (deletedReview.deletedCount === 0) {
      res.status(400).json({
        status: 400,
        error: 'Review could not be deleted',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteReview;
