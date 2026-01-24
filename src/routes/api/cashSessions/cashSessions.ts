import { Router } from "express";
import { cashSessionsController } from '../../../controllers/cashSesions.js';
import { isValidSessionId } from '../../../middlewares/isValid.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import { cashSessionsSchema, editCashSessionSchema } from '../../../schemas/cashSessionsSchema.js';
import { autoriz } from '../../../middlewares/authendicate.js';
import type { CreateCashSessionPayload, EditCashSessionPayload } from '../../../types/types.js';

export const cashSessionsRouter = Router();

cashSessionsRouter.use(autoriz);

cashSessionsRouter.get("/", cashSessionsController.getAll);

cashSessionsRouter.get("/:sessionId", isValidSessionId, cashSessionsController.getById);

cashSessionsRouter.delete("/:sessionId", isValidSessionId, cashSessionsController.deleteSession);

cashSessionsRouter.post("/", validateBody<CreateCashSessionPayload>(cashSessionsSchema), cashSessionsController.addSession);

cashSessionsRouter.put("/:sessionId", isValidSessionId, validateBody<CreateCashSessionPayload>(cashSessionsSchema), cashSessionsController.updateSession);

cashSessionsRouter.patch("/:sessionId/session", isValidSessionId, validateBody<EditCashSessionPayload>(editCashSessionSchema), cashSessionsController.editSession);
