import 'dotenv/config';
import { Db, MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  try {
    await client.connect();
    db = client.db("poker_counter");
    return db;
  } catch (err) {
    throw new Error("MongoDB connection failed");
  }
}
