import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.ts';

import { Document } from 'mongoose';

// export interface User {
//   name: string;
//   email: string;
//   password: string;
//   token?: string | null;
// }

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  token?: string | null;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: true,
      // match: /^\w+@\w+\.[a-z]{2, 4}$/,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
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

userSchema.post('save', handleMongooseError);

export const User = model('user', userSchema);
