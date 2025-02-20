import { NextFunction, Request, Response } from 'express';
import { createRentalMetaDataService } from '../../services/metaData';
import { findRentalByProperty } from '../../services/rental';

const createRentalMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { entity, key, value } = req.body;

    if (!key || !value || !entity || typeof key !== 'string' || typeof value !== 'string' || typeof entity !== 'string' || key.trim() === '' || value.trim() === '' || entity.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Invalid key or value or entity',
      });
      return;
    }
    const isRentalExist = await findRentalByProperty('_id', entity);
    if (!isRentalExist) {
      res.status(404).json({
        status: 404,
        error: 'Rental Item not found',
      });
      return;
    }

    if (isRentalExist.owner.toString() !== user._id.toString()) {
      res.status(403).json({
        status: 403,
        error: 'You are not allowed to create metadata for this rental item',
      });
      return;
    }
    const metaData = await createRentalMetaDataService({
      entity,
      key,
      value,
    });
    if (!metaData) {
      res.status(500).json({
        status: 500,
        error: 'Unable to create rental metadata',
      });
      return;
    }
    res.status(201).json({
      status: 201,
      message: 'Rental Item metadata created successfully',
      data: metaData,
    });
  } catch (error) {
    next(error);
  }
};

export default createRentalMetaData;
