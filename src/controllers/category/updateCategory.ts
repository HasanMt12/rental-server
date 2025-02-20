import { NextFunction, Request, Response } from 'express';
import { findCategoryByProperty } from '../../services/category';

const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;
    if (!id || (name && typeof name !== 'string') || (subcategories && !Array.isArray(subcategories))) {
      res.status(400).json({
        status: 400,
        error: 'Bad Request category name will be a string and subcategories will be an array',
      });
      return;
    }
    const isCategoryExist = await findCategoryByProperty('_id', id);
    if (!isCategoryExist) {
      res.status(404).json({
        status: 404,
        error: 'Category not found',
      });
      return;
    }
    isCategoryExist.name = name ?? isCategoryExist.name;
    isCategoryExist.subcategories = subcategories ?? isCategoryExist.subcategories;
    await isCategoryExist.save();
    res.status(200).json({
      status: 200,
      message: 'Category updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default updateCategory;
