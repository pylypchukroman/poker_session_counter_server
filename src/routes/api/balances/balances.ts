import { Router } from "express";
import { isValidBalanceId } from '../../../middlewares/isValid.ts';
import { validateBody } from '../../../middlewares/validateBody.ts';
import { balanceSchema, editBalanceSchema } from '../../../schemas/balanceSchema.ts';
import { balancesController } from '../../../controllers/balances.ts';

export const balanceRouter = Router();

balanceRouter.get('/', balancesController.getAll);

balanceRouter.get('/:balanceId', isValidBalanceId, balancesController.getById);

balanceRouter.post('/', validateBody(balanceSchema), balancesController.addBalance);

balanceRouter.delete('/:balanceId',isValidBalanceId, balancesController.deleteBalance);

balanceRouter.put('/:balanceId', isValidBalanceId, validateBody(balanceSchema), balancesController.updateBalance);

balanceRouter.patch('/:balanceId/balance', isValidBalanceId, validateBody(editBalanceSchema), balancesController.editBalance);
