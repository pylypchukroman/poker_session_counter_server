import { Router } from "express";
import { isValidBalanceId } from '../../../middlewares/isValid';
import { validateBody } from '../../../middlewares/validateBody';
import { balanceSchema, editBalanceSchema } from '../../../schemas/balanceSchema';
import { balancesController } from '../../../controllers/balances';
import { autoriz } from '../../../middlewares/authendicate';
import type { BalancePayload, EditBalancePayload } from '../../../types/types';

export const balanceRouter = Router();

balanceRouter.use(autoriz);

balanceRouter.get('/', balancesController.getAll);

balanceRouter.get('/:balanceId', isValidBalanceId, balancesController.getById);

balanceRouter.post('/', validateBody(balanceSchema), balancesController.addBalance);

balanceRouter.delete('/:balanceId',isValidBalanceId, balancesController.deleteBalance);

balanceRouter.put('/:balanceId', isValidBalanceId, validateBody<BalancePayload>(balanceSchema), balancesController.updateBalance);

balanceRouter.patch('/:balanceId/balance', isValidBalanceId, validateBody<EditBalancePayload>(editBalanceSchema), balancesController.editBalance);
