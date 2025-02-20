import MetaData from '../../models/MetaData';

const findMetaDataByProperty = async (property: string, value: string) => {
  try {
    const metaData = await MetaData.findOne({
      [property]: value,
    });
    return metaData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findMetaDataByProperty;
