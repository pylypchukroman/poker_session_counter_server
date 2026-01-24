import 'dotenv/config';
import express from "express";
import cors from "cors";
import { balanceRouter } from './routes/api/balances/balances';
import { cashSessionsRouter } from './routes/api/cashSessions/cashSessions';
import { tournamentsSessionsRouter } from './routes/api/tournamentsSessions/tournamentsSessions';
import * as mongoose from 'mongoose';
import { tournamentsRouter } from './routes/api/tournaments/tournaments';
import { authRouter } from './routes/auth/auth';
import cookieParser from "cookie-parser";
import { whitelist } from './data/whiteList';

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/balances', balanceRouter);
app.use('/api/cash_sessions', cashSessionsRouter);
app.use('/api/tournament_sessions', tournamentsSessionsRouter);
app.use('/api/tournament_sessions/:sessionId/tournaments', tournamentsRouter);
app.use('/api/auth', authRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT);
  console.log("Database connection successful");
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})

app.use((req, res) => {
  res.status(404).json({massage: "Not found"});
})

