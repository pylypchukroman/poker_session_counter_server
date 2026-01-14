import { Router } from "express";
import { authController } from '../../controllers/auth.ts';
import { validateBody } from '../../middlewares/validateBody.ts';
import { registerUserSchema } from '../../schemas/authSchema.ts';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), authController.register);
