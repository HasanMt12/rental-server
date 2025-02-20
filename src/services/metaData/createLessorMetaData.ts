import MetaData from '../../models/MetaData';

export type createMetaDataType = {
  entity: string;
  key: string;
  value: string;
};

const createLessorMetaData = async ({ entity, key, value }: createMetaDataType) => {
  try {
    const metaData = new MetaData({
      entity,
      entityModel: 'User',
      key,
      value,
    });
    await metaData.save();
    return metaData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default createLessorMetaData;
