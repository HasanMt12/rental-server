import Category from '../../models/Category';

const getCategory = async () => {
  try {
    const categories = await Category.find().select('name icon subcategories');
    return categories;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in getCategory: ${error.message}`);
    }
  }
};

export default getCategory;
