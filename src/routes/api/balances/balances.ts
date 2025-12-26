import { Db } from 'mongodb';
import { connectDB } from '../../../db/db.ts';
import { Router } from "express";

const db: Db = await connectDB();
export const balancesRouter = Router();

balancesRouter.get("/", async (req, res) => {
  const collection = await db.collection("balance").findOne({});
  res.status(200).json(collection);
});
