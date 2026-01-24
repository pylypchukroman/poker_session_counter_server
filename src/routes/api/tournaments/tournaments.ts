import { Router } from 'express';
import { tournamentSessionsController } from '../../../controllers/tournamentSessions.js';
import { isValidSessionId } from '../../../middlewares/isValid.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import { addTournamentSchema, finishTournamentSchema } from '../../../schemas/tournamentSchema.js';
import { autoriz } from '../../../middlewares/authendicate.js';
import type { AddTournamentPayload, FinishTournamentPayload } from '../../../types/types.js';

export const tournamentsRouter = Router({ mergeParams: true });

tournamentsRouter.use(autoriz);

tournamentsRouter.get("/", tournamentSessionsController.getAllTournaments);

tournamentsRouter.get("/:tournamentId", isValidSessionId, tournamentSessionsController.getTournamentById);

tournamentsRouter.delete("/:tournamentId", isValidSessionId, tournamentSessionsController.deleteTournament);

tournamentsRouter.post("/", validateBody<AddTournamentPayload>(addTournamentSchema), tournamentSessionsController.addTournament);

tournamentsRouter.patch("/:tournamentId/finish_tournament", isValidSessionId, validateBody<FinishTournamentPayload>(finishTournamentSchema), tournamentSessionsController.editTournament);
