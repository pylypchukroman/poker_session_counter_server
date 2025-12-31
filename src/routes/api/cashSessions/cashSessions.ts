import { Router } from "express";
import { cashSessionsController } from '../../../controllers/cashSesions.ts';
import { isValidSessionId } from '../../../middlewares/isValid.ts';
import { validateBody } from '../../../middlewares/validateBody.ts';
import { cashSessionsSchema, editCashSessionSchema } from '../../../schemas/cashSessionsSchema.ts';

export const cashSessionsRouter = Router();

cashSessionsRouter.get("/", cashSessionsController.getAll);

cashSessionsRouter.get("/:sessionId", isValidSessionId, cashSessionsController.getById);

cashSessionsRouter.delete("/:sessionId", isValidSessionId, cashSessionsController.deleteSession);

cashSessionsRouter.post("/", validateBody(cashSessionsSchema), cashSessionsController.addSession);

cashSessionsRouter.put("/:sessionId", isValidSessionId, validateBody(cashSessionsSchema), cashSessionsController.updateSession);

cashSessionsRouter.patch("/:sessionId/session", isValidSessionId, validateBody(editCashSessionSchema), cashSessionsController.editSession);
