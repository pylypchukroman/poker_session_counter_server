import { Router } from "express";
import { tournamentSessionsController } from '../../../controllers/tournamentSessions';
import { isValidSessionId } from '../../../middlewares/isValid';
import { validateBody } from '../../../middlewares/validateBody';
import {
  editTournamentSessionsSchema,
  finishTournamentSessionSchema,
  tournamentSessionsSchema
} from '../../../schemas/tournamentSessionsSchema';
import { autoriz } from '../../../middlewares/authendicate';
import type { EditTournamentSessionPayload, FinishTournamentSessionPayload } from '../../../types/types';

export const tournamentsSessionsRouter = Router();

tournamentsSessionsRouter.use(autoriz);

tournamentsSessionsRouter.get("/", tournamentSessionsController.getAll);

tournamentsSessionsRouter.get("/:sessionId", isValidSessionId, tournamentSessionsController.getById);

tournamentsSessionsRouter.delete("/:sessionId", isValidSessionId, tournamentSessionsController.deleteSession);

tournamentsSessionsRouter.post("/", validateBody(tournamentSessionsSchema), tournamentSessionsController.addSession);

tournamentsSessionsRouter.put("/:sessionId", isValidSessionId, validateBody<EditTournamentSessionPayload>(editTournamentSessionsSchema), tournamentSessionsController.updateSession);

tournamentsSessionsRouter.patch("/:sessionId/finish_session", isValidSessionId, validateBody<FinishTournamentSessionPayload>(finishTournamentSessionSchema), tournamentSessionsController.editSession);
