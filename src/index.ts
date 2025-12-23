import express from "express";
import cors from "cors";
import { pokerRooms } from './data/rooms.js';
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
const collection = await db.collection("balance").find().toArray();
console.log(collection)

app.get("/balance", (req, res) => {
  res.status(200).json(pokerRooms);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

