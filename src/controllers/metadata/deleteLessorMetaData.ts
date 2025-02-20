import { NextFunction, Request, Response } from 'express';
import { findMetaDataByProperty } from '../../services/metaData';

const deleteLessorMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { metaId } = req.params;
    const isMetaDataExist = await findMetaDataByProperty('_id', metaId);
    if (!isMetaDataExist) {
      res.status(404).json({
        status: 404,
        error: 'Metadata not found',
      });
      return;
    }
    console.log(metaId.toString(), user._id.toString());
    if (isMetaDataExist.entity.toString() !== user._id.toString()) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
      return;
    }
    await isMetaDataExist.deleteOne();
    res.status(200).json({
      status: 200,
      message: 'Metadata deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteLessorMetaData;
