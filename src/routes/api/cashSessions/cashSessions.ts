import { Router } from "express";

export const cashSessionsRouter = Router();

cashSessionsRouter.get("/", async (req, res) => {
  res.status(200).json("cashSessions");
});
