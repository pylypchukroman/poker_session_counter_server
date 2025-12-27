import { Router } from "express";
import { balancesController } from '../../../controllers/balances';
import { isValidId } from '../../../middlewares/isValid';
import { validateBody } from '../../../middlewares/validateBody';
import { balanceSchema } from '../../../schemas/balanceSchema';

export const balanceRouter = Router();

balanceRouter.get('/', balancesController.getAll);

balanceRouter.get('/:balanceId', isValidId, balancesController.getById);

balanceRouter.post('/', validateBody(balanceSchema), balancesController.addBalance);

balanceRouter.delete('/:balanceId',isValidId, balancesController.deleteBalance);

balanceRouter.put('/:balanceId', isValidId, validateBody(balanceSchema), balancesController.editBalance);
