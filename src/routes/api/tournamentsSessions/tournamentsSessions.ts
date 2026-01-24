import { Router } from "express";
import { tournamentSessionsController } from '../../../controllers/tournamentSessions.js';
import { isValidSessionId } from '../../../middlewares/isValid.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import {
  editTournamentSessionsSchema,
  finishTournamentSessionSchema,
  tournamentSessionsSchema
} from '../../../schemas/tournamentSessionsSchema.js';
import { autoriz } from '../../../middlewares/authendicate.js';
import type { EditTournamentSessionPayload, FinishTournamentSessionPayload } from '../../../types/types.js';

export const tournamentsSessionsRouter = Router();

tournamentsSessionsRouter.use(autoriz);

tournamentsSessionsRouter.get("/", tournamentSessionsController.getAll);

tournamentsSessionsRouter.get("/:sessionId", isValidSessionId, tournamentSessionsController.getById);

tournamentsSessionsRouter.delete("/:sessionId", isValidSessionId, tournamentSessionsController.deleteSession);

tournamentsSessionsRouter.post("/", validateBody(tournamentSessionsSchema), tournamentSessionsController.addSession);

tournamentsSessionsRouter.put("/:sessionId", isValidSessionId, validateBody<EditTournamentSessionPayload>(editTournamentSessionsSchema), tournamentSessionsController.updateSession);

tournamentsSessionsRouter.patch("/:sessionId/finish_session", isValidSessionId, validateBody<FinishTournamentSessionPayload>(finishTournamentSessionSchema), tournamentSessionsController.editSession);
