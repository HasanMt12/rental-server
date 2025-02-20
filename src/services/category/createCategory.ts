import Category from '../../models/Category';

const createCategory = async ({ name, icon }: { name: string; icon: string }) => {
  try {
    const category = new Category({ name, icon });
    return await category.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default createCategory;
