import RentalItem from '../../models/RentalItem';

export type GetRentalsInput = {
  role?: string;
  userId?: string;
  location?: string;
  category?: string;
  subCategory?: string;
  date?: number[];
};

const getRentals = async ({ role, userId, location, category, subCategory, date }: GetRentalsInput) => {
  try {
    const query: { location?: string; category?: string; subCategory?: string; bookedDates?: {} } = {};
    if (location) {
      query.location = location;
    }
    if (category) {
      query.category = category;
    }
    if (subCategory) {
      query.subCategory = subCategory;
    }
    if (date && date.length > 0) {
      query.bookedDates = { $nin: date };
    }
    if (role === 'admin') {
      const rentalItems = await RentalItem.find(query);
      return rentalItems;
    } else if (role === 'lessor' && userId) {
      const rentalItems = await RentalItem.find({ owner: userId });
      return rentalItems;
    }

    const rentalItems = await RentalItem.find(query);
    return rentalItems;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getRentals;
