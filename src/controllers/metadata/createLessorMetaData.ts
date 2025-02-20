import { NextFunction, Request, Response } from 'express';
import { createLessorMetaDataService } from '../../services/metaData';

const createLessorMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { key, value } = req.body;
    if (!key || !value || typeof key !== 'string' || typeof value !== 'string' || key.trim() === '' || value.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Invalid key or value',
      });
      return;
    }
    const metaData = await createLessorMetaDataService({
      entity: user._id.toString(),
      key,
      value,
    });
    if (!metaData) {
      res.status(500).json({
        status: 500,
        error: 'Unable to create user metadata',
      });
      return;
    }
    res.status(201).json({
      status: 201,
      message: 'User metadata created successfully',
      data: metaData,
    });
  } catch (error) {
    next(error);
  }
};

export default createLessorMetaData;
