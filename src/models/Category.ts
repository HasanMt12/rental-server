import { Document, model, Schema } from 'mongoose';

export interface ICategory extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  icon: string;
  subcategories: [
    {
      name: string;
      icon: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    subcategories: {
      type: [
        {
          name: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>('Category', categorySchema);
export default Category;
