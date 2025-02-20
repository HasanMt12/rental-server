import MetaData from '../../models/MetaData';

const getMetaData = async (id: string) => {
  try {
    const result = await MetaData.find({ entity: id })
      .populate({
        path: 'entity',
        select: 'name email photo',
      })
      .select('-__v -createdAt -updatedAt');
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getMetaData;
