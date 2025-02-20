import RentalItem from '../../models/RentalItem';

type RentalItemData = {
  name: string;
  description: string;
  owner: string;
  category: string;
  subCategory: string;
  price: number;
  discount: number;
  location: string;
  images: string[];
};

const createRental = async ({ name, description, owner, category, subCategory, price, discount, location, images }: RentalItemData) => {
  try {
    const rentalItem = new RentalItem({
      name,
      description,
      owner,
      category,
      subCategory,
      price,
      discount,
      location,
      images,
    });
    await rentalItem.save();
    return rentalItem;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default createRental;
