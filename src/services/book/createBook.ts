import Book from '../../models/Book';

type CreateBookInput = {
  user: string;
  lessor: string;
  rental: string;
  rentalPrice: number;
  bookedDates: [number];
};

const createBook = async ({ user, lessor, rental, rentalPrice, bookedDates }: CreateBookInput) => {
  try {
    const book = new Book({
      user,
      lessor,
      rental,
      rentalPrice,
      bookedDates,
    });
    return await book.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default createBook;
