import Review from '../../models/Review';

const getReviews = async () => {
  try {
    const reviews = await Review.find();
    return reviews;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getReviews;
