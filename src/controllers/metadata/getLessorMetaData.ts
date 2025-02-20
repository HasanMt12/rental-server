import { NextFunction, Request, Response } from 'express';
import { getMetaDataService } from '../../services/metaData';

const getLessorMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const result = await getMetaDataService(user._id.toString());
    res.status(200).json({
      status: 200,
      message: 'User metadata',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default getLessorMetaData;
