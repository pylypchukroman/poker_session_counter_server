import { model, Schema, Types } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.ts';

export type TournamentStatus = "running" | "finished";
export type SessionStatus = "running" | "finished";

export interface Tournament {
  _id: Types.ObjectId;
  room: string
  name: string;
  buyIn: number;
  startedAt: Date;
  finishedAt: Date | null;
  status: TournamentStatus;
  result?: number;
}

export interface TournamentSession {
  startedAt: Date;
  finishedAt: Date | null;
  status: SessionStatus;
  tournaments: Tournament[];
}

export const tournamentSchema = new Schema<Tournament>(
  {
    room: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },

    buyIn: {
      type: Number,
      required: true,
      min: 0,
    },

    startedAt: {
      type: Date,
      required: true,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["running", "finished"],
      required: true,
    },

    result: {
      type: Number,
    },
  },
  {
    _id: true,
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

const tournamentSessionSchema = new Schema<TournamentSession>(
  {
    startedAt: {
      type: Date,
      required: true,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["running", "finished"],
      required: true,
    },

    tournaments: {
      type: [tournamentSchema],
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

tournamentSessionSchema.post("save", handleMongooseError);

export const TournamentSessions = model('tournament_sessions', tournamentSessionSchema);
