import { Document, model, Schema } from 'mongoose';

export interface IBlog extends Document {
    _id: Schema.Types.ObjectId;
    title: Schema.Types.String;
    description: Schema.Types.String;
    link: Schema.Types.String;
    images: Schema.Types.String[];
    status: Schema.Types.Boolean;
    createdAt: Date;
    updatedAt: Date;
}


const blogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String, required: false },
        images: { type: [String], required: false },
        status: { type: Boolean, default: true, required: false },
    },
    { timestamps: true }
);

export const IBlogCreate = {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: false },
    images: { type: [String], required: false },
};

const Blog = model<IBlog>('Blog', blogSchema);
export default Blog;
