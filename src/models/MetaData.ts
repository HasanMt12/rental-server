import { Document, model, Schema } from 'mongoose';

export interface IMetaData extends Document {
  _id: Schema.Types.ObjectId;
  entity: Schema.Types.ObjectId;
  entityModel: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const metaDataSchema = new Schema<IMetaData>(
  {
    entity: {
      type: Schema.Types.ObjectId,
      refPath: 'entityModel',
      required: true,
    },
    entityModel: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MetaData = model<IMetaData>('MetaData', metaDataSchema);
export default MetaData;
