import Book from '../../models/Book';

const getBooks = async (userId: string, role: string, status: string) => {
  try {
    const query: {
      user?: string;
      lessor?: string;
      status?: string;
    } = {};
    if (role === 'user') {
      query['user'] = userId;
    } else if (role === 'lessor') {
      query['lessor'] = userId;
    }
    if (status) {
      query['status'] = status;
    }
    const books = await Book.find(query).populate('user', 'name email').populate('lessor', 'name email').populate('rental', 'name category').exec();
    return books;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getBooks;
