import Review from '../../models/Review';

type createReviewType = {
  name: string;
  email: string;
  photo?: string | null;
  rating: number;
  comment: string;
};

const createReview = async ({ name, email, photo = null, rating, comment }: createReviewType) => {
  try {
    const review = new Review({
      name,
      email,
      photo,
      rating,
      comment,
    });
    return await review.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default createReview;
