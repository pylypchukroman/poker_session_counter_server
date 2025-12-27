import 'dotenv/config';
import express from "express";
import cors from "cors";
import { balanceRouter } from './routes/api/balances/balances.ts';
import { cashSessionsRouter } from './routes/api/cashSessions/cashSessions.ts';
import { tournamentsSessionsRouter } from './routes/api/tournamentsSessions/tournamentsSessions.ts';
import * as mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/balances', balanceRouter);
app.use('/api/cash-sessions', cashSessionsRouter);
app.use('/api/tournaments-sessions', tournamentsSessionsRouter);

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

