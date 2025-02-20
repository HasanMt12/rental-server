import Review from '../../models/Review';

const findReviewByProperty = async (property: string, value: string) => {
  try {
    const review = await Review.findOne({
      [property]: value,
    });
    return review;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findReviewByProperty;
