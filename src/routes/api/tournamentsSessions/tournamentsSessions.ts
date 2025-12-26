import { Router } from "express";

export const tournamentsSessionsRouter = Router();

tournamentsSessionsRouter.get("/", async (req, res) => {
  res.status(200).json("tournaments Sessions");
});
