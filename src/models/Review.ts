import { Document, model, Schema } from 'mongoose';

export interface IReview extends Document {
  name: string;
  email: string;
  photo: string;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: null,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Review = model<IReview>('Review', reviewSchema);

export default Review;
