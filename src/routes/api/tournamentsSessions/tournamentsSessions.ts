import { Router } from "express";
import { tournamentSessionsController } from '../../../controllers/tournamentSessions.ts';
import { isValidSessionId } from '../../../middlewares/isValid.ts';
import { validateBody } from '../../../middlewares/validateBody.ts';
import {
  editTournamentSessionsSchema,
  finishTournamentSessionSchema,
  tournamentSessionsSchema
} from '../../../schemas/tournamentSessionsSchema.ts';
import { autoriz } from '../../../middlewares/authendicate.ts';

export const tournamentsSessionsRouter = Router();

tournamentsSessionsRouter.use(autoriz);

tournamentsSessionsRouter.get("/", tournamentSessionsController.getAll);

tournamentsSessionsRouter.get("/:sessionId", isValidSessionId, tournamentSessionsController.getById);

tournamentsSessionsRouter.delete("/:sessionId", isValidSessionId, tournamentSessionsController.deleteSession);

tournamentsSessionsRouter.post("/", validateBody(tournamentSessionsSchema), tournamentSessionsController.addSession);

tournamentsSessionsRouter.put("/:sessionId", isValidSessionId, validateBody(editTournamentSessionsSchema), tournamentSessionsController.updateSession);

tournamentsSessionsRouter.patch("/:sessionId/finish_session", isValidSessionId, validateBody(finishTournamentSessionSchema), tournamentSessionsController.editSession);
