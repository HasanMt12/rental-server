import { NextFunction, Request, Response } from 'express';
import { getMetaDataService } from '../../services/metaData';

const getRentalMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await getMetaDataService(id);
    res.status(200).json({
      status: 200,
      message: 'Rental metadata',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default getRentalMetaData;
