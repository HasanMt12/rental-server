import { NextFunction, Request, Response } from 'express';
import { findCategoryByProperty } from '../../services/category';

const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const isCategoryExist = await findCategoryByProperty('_id', id);
    if (!isCategoryExist) {
      res.status(404).json({
        status: 404,
        error: 'Category not found',
      });
      return;
    }
    const deletedCategory = await isCategoryExist.deleteOne();
    if (deletedCategory.deletedCount === 0) {
      res.status(500).json({
        status: 500,
        error: 'Category not deleted',
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteCategory;
