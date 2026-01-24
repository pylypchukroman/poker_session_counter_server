import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError';
import type { PokerRoomBalance, PokerSession } from '../types/types';

const pokerRoomBalanceSchema = new Schema<PokerRoomBalance>(
  {
    name: { type: String, required: true },
    balance: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const pokerSessionSchema = new Schema<PokerSession>(
  {
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["running", "finished"],
      default: "finished",
    },
    balancesStart: {
      type: [pokerRoomBalanceSchema],
      required: true,
    },
    balancesEnd: {
      type: [pokerRoomBalanceSchema],
      default: [],
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


pokerSessionSchema.post("save", handleMongooseError);

export const CashSessions = model('cash_sessions', pokerSessionSchema);
