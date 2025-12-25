import express from "express";
import cors from "cors";
import { balanceRouter } from "./routes/balance.ts"
import { Db } from 'mongodb';
import { connectDB } from './db/db.ts';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const db: Db = await connectDB();

app.use('/api/balance', balanceRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

