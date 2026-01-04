import { Router } from 'express';
import { tournamentSessionsController } from '../../../controllers/tournamentSessions.ts';
import { isValidSessionId } from '../../../middlewares/isValid.ts';
import { validateBody } from '../../../middlewares/validateBody.ts';
import { addTournamentSchema, finishTournamentSchema } from '../../../schemas/tournamentSchema.ts';

export const tournamentsRouter = Router({ mergeParams: true });

tournamentsRouter.get("/", tournamentSessionsController.getAllTournaments);

tournamentsRouter.get("/:tournamentId", isValidSessionId, tournamentSessionsController.getTournamentById);

tournamentsRouter.delete("/:tournamentId", isValidSessionId, tournamentSessionsController.deleteTournament);

tournamentsRouter.post("/", validateBody(addTournamentSchema), tournamentSessionsController.addTournament);

tournamentsRouter.patch("/:tournamentId/finish_tournament", isValidSessionId, validateBody(finishTournamentSchema), tournamentSessionsController.editTournament);
