import { NextFunction, Request, Response } from 'express';
import { createRentalService } from '../../services/rental';

const createRental = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user: owner } = req;
  try {
    const { name, description, category, subCategory, price, discount, location, images } = req.body;
    if (owner.isVarified === false) {
      res.status(403).json({
        status: 403,
        error: 'You are not varified. Please varify your account by uploading your varification documents',
      });
      return;
    }
    const createdRentalItem = await createRentalService({
      name,
      description,
      owner: owner._id,
      category,
      subCategory,
      price,
      discount,
      location,
      images,
    });

    res.status(201).json({
      status: 201,
      message: 'Rental item created',
      data: createdRentalItem,
    });
  } catch (error) {
    next(error);
  }
};

export default createRental;
