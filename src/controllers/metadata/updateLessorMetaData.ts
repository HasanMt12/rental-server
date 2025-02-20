import { NextFunction, Request, Response } from 'express';
import { findMetaDataByProperty } from '../../services/metaData';

const updateLessorMetaData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //@ts-ignore
  const { user } = req;
  try {
    const { id } = req.params;
    const { key, value } = req.body;
    const isMetaDataExist = await findMetaDataByProperty('_id', id);
    if (!isMetaDataExist) {
      res.status(404).json({
        status: 404,
        error: 'Metadata not found',
      });
      return;
    }
    if (isMetaDataExist.entity.toString() !== user._id.toString()) {
      res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
      return;
    }
    if (!key || !value || typeof key !== 'string' || typeof value !== 'string' || key.trim() === '' || value.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Invalid key or value',
      });
      return;
    }
    isMetaDataExist.key = key ?? isMetaDataExist.key;
    isMetaDataExist.value = value ?? isMetaDataExist.value;
    await isMetaDataExist.save();
    user.isVarified = false;
    await user.save();
    res.status(200).json({
      status: 200,
      message: 'Metadata updated successfully',
      data: isMetaDataExist,
    });
  } catch (error) {
    next(error);
  }
};

export default updateLessorMetaData;
