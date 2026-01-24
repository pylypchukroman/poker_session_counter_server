import { Router } from "express";
import { isValidBalanceId } from '../../../middlewares/isValid.js';
import { validateBody } from '../../../middlewares/validateBody.js';
import { balanceSchema, editBalanceSchema } from '../../../schemas/balanceSchema.js';
import { balancesController } from '../../../controllers/balances.js';
import { autoriz } from '../../../middlewares/authendicate.js';
import type { BalancePayload, EditBalancePayload } from '../../../types/types.js';

export const balanceRouter = Router();

balanceRouter.use(autoriz);

balanceRouter.get('/', balancesController.getAll);

balanceRouter.get('/:balanceId', isValidBalanceId, balancesController.getById);

balanceRouter.post('/', validateBody(balanceSchema), balancesController.addBalance);

balanceRouter.delete('/:balanceId',isValidBalanceId, balancesController.deleteBalance);

balanceRouter.put('/:balanceId', isValidBalanceId, validateBody<BalancePayload>(balanceSchema), balancesController.updateBalance);

balanceRouter.patch('/:balanceId/balance', isValidBalanceId, validateBody<EditBalancePayload>(editBalanceSchema), balancesController.editBalance);
