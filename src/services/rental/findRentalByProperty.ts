import RentalItem from '../../models/RentalItem';

const findRentalByProperty = async (property: string, value: string) => {
  try {
    const rentalItem = await RentalItem.findOne({
      [property]: value,
    });
    return rentalItem;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findRentalByProperty;
