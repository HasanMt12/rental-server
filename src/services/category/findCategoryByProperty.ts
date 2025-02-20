import Category from '../../models/Category';

const findCategoryByProperty = async (property: string, value: string) => {
  try {
    const category = await Category.findOne({
      [property]: value,
    });
    return category;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findCategoryByProperty;
