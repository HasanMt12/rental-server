import { Document, model, Schema } from 'mongoose';

export interface IBook extends Document {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  lessor: Schema.Types.ObjectId;
  rental: Schema.Types.ObjectId;
  rentalPrice: number;
  bookedDates: number[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rental: { type: Schema.Types.ObjectId, ref: 'RentalItem', required: true },
    rentalPrice: { type: Number, required: true },
    bookedDates: { type: [Number], required: true },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'confirm', 'completed', 'rejected', 'cancelled'],
    },
  },
  { timestamps: true }
);

const Book = model<IBook>('Book', bookSchema);
export default Book;
