import Book from '../../models/Book';

const findBookByProperty = async (property: string, value: string) => {
  try {
    const book = await Book.findOne({
      [property]: value,
    });
    return book;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findBookByProperty;
