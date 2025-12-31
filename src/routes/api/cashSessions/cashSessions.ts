import { Router } from "express";
import { cashSessionsController } from '../../../controllers/cashSesions.ts';
import { isValidSessionId } from '../../../middlewares/isValid.ts';

export const cashSessionsRouter = Router();

cashSessionsRouter.get("/", cashSessionsController.getAll);

cashSessionsRouter.get("/:sessionId", isValidSessionId, cashSessionsController.getById);

cashSessionsRouter.delete("/:sessionId", isValidSessionId, cashSessionsController.deleteSession);

cashSessionsRouter.post("/", cashSessionsController.addSession);
