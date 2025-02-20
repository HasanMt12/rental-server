import { NextFunction, Request, Response } from 'express';
import { createCategoryService } from '../../services/category';

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, icon } = req.body;
    if (!name || !icon || (name && typeof name !== 'string') || (icon && typeof icon !== 'string')) {
      res.status(400).json({
        status: 400,
        error: 'Bad Request category name is required as a string and icon will be link',
      });
      return;
    }
    const category = await createCategoryService({ name, icon });
    if (!category) {
      res.status(500).json({
        status: 500,
        error: 'Category not created',
      });
      return;
    }
    res.status(201).json({
      status: 201,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export default createCategory;
