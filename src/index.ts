import express from "express";
import cors from "cors";
import { pokerRooms } from './data/rooms.js';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/balance", (req, res) => {
  res.status(200).json(pokerRooms);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

