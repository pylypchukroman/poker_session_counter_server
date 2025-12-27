import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.ts';

const balanceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  balance: {
    type: Number,
  },
}, { timestamps: true });

balanceSchema.post("save", handleMongooseError);

export const Balance = model("balance", balanceSchema);
