import { Router } from "express";
import { isValidId } from '../../../middlewares/isValid.ts';
import { validateBody } from '../../../middlewares/validateBody.ts';
import { balanceSchema } from '../../../schemas/balanceSchema.ts';
import { balancesController } from '../../../controllers/balances.ts';

export const balanceRouter = Router();

balanceRouter.get('/', balancesController.getAll);

balanceRouter.get('/:balanceId', isValidId, balancesController.getById);

balanceRouter.post('/', validateBody(balanceSchema), balancesController.addBalance);

balanceRouter.delete('/:balanceId',isValidId, balancesController.deleteBalance);

balanceRouter.put('/:balanceId', isValidId, validateBody(balanceSchema), balancesController.editBalance);
