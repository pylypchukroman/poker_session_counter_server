import { Router } from "express";
import { cashSessionsController } from '../../../controllers/cashSesions.ts';
import { isValidSessionId } from '../../../middlewares/isValid.ts';
import { validateBody } from '../../../middlewares/validateBody.ts';
import { cashSessionsSchema, editCashSessionSchema } from '../../../schemas/cashSessionsSchema.ts';
import { autoriz } from '../../../middlewares/authendicate.ts';
import type { CreateCashSessionPayload, EditCashSessionPayload } from '../../../types/types';

export const cashSessionsRouter = Router();

cashSessionsRouter.use(autoriz);

cashSessionsRouter.get("/", cashSessionsController.getAll);

cashSessionsRouter.get("/:sessionId", isValidSessionId, cashSessionsController.getById);

cashSessionsRouter.delete("/:sessionId", isValidSessionId, cashSessionsController.deleteSession);

cashSessionsRouter.post("/", validateBody<CreateCashSessionPayload>(cashSessionsSchema), cashSessionsController.addSession);

cashSessionsRouter.put("/:sessionId", isValidSessionId, validateBody<CreateCashSessionPayload>(cashSessionsSchema), cashSessionsController.updateSession);

cashSessionsRouter.patch("/:sessionId/session", isValidSessionId, validateBody<EditCashSessionPayload>(editCashSessionSchema), cashSessionsController.editSession);
