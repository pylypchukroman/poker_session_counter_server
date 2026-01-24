import { Router } from 'express';
import { tournamentSessionsController } from '../../../controllers/tournamentSessions';
import { isValidSessionId } from '../../../middlewares/isValid';
import { validateBody } from '../../../middlewares/validateBody';
import { addTournamentSchema, finishTournamentSchema } from '../../../schemas/tournamentSchema';
import { autoriz } from '../../../middlewares/authendicate';
import type { AddTournamentPayload, FinishTournamentPayload } from '../../../types/types';

export const tournamentsRouter = Router({ mergeParams: true });

tournamentsRouter.use(autoriz);

tournamentsRouter.get("/", tournamentSessionsController.getAllTournaments);

tournamentsRouter.get("/:tournamentId", isValidSessionId, tournamentSessionsController.getTournamentById);

tournamentsRouter.delete("/:tournamentId", isValidSessionId, tournamentSessionsController.deleteTournament);

tournamentsRouter.post("/", validateBody<AddTournamentPayload>(addTournamentSchema), tournamentSessionsController.addTournament);

tournamentsRouter.patch("/:tournamentId/finish_tournament", isValidSessionId, validateBody<FinishTournamentPayload>(finishTournamentSchema), tournamentSessionsController.editTournament);
