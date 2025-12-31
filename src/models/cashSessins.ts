import { model, Schema, Document } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.ts';

export interface PokerRoomBalance {
  room: string;
  balance: number;
}

export interface PokerSession extends Document {
  startedAt: Date;
  finishedAt: Date | null;
  status: "running" | "finished";
  balancesStart: PokerRoomBalance[];
  balancesEnd: PokerRoomBalance[];
}

const pokerRoomBalanceSchema = new Schema<PokerRoomBalance>(
  {
    room: { type: String, required: true },
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
