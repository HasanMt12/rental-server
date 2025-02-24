import { Document, model, Schema } from 'mongoose';

export interface ICompany extends Document {
    _id: Schema.Types.ObjectId;
    name: Schema.Types.String;
    link: Schema.Types.String;
    image: Schema.Types.String;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const companySchema = new Schema<ICompany>(
    {
        name: { type: String, required: false },
        link: { type: String, required: false },
        image: { type: [String], required: false },
        status: {
            type: String,
            required: true,
            default: 'approved',
            enum: ['pending', 'approved', 'reported', 'rejected', 'deleted'],
        },
    },
    { timestamps: true }
);
export interface ICompanyCreate {
    name?: string;
    link: string;
    image: string;
    status?: string;
}

const Company = model<ICompany>('Company', companySchema);
export default Company;
