import { NextFunction, Request, Response } from 'express';
import { getCategoryService } from '../../services/category';

const getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await getCategoryService();
    if (!categories) {
      res.status(500).json({
        status: 500,
        error: 'Categories not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Categories found',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export default getCategory;
