import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.ts';

export interface Balance {
  name: string;
  balance: number;
}

const balanceSchema = new Schema<Balance>(
  {
    name: {
      type: String,
      required: [true, 'Set name for balance'],
    },
    balance: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

balanceSchema.post('save', handleMongooseError);

export const Balance = model('balance', balanceSchema);
