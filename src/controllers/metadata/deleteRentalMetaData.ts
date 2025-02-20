import { NextFunction, Request, Response } from 'express';
import { findMetaDataByProperty } from '../../services/metaData';
import { findRentalByProperty } from '../../services/rental';

const deleteRentalMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { metaId, rentalId } = req.params;
    const isMetaDataExist = await findMetaDataByProperty('_id', metaId);
    const isRentalExist = await findRentalByProperty('_id', rentalId);
    if (!isMetaDataExist) {
      res.status(404).json({
        status: 404,
        error: 'Metadata not found',
      });
      return;
    }
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

export default deleteRentalMetaData;
