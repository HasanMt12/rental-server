import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'lessor' | 'admin';
  photo: string;
  status: 'active' | 'disable';
  isVarified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'lessor', 'admin'],
      default: 'user',
    },
    photo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'disable'],
      default: 'active',
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
