import { Router } from "express";
import { authController } from '../../controllers/auth.ts';
import { validateBody } from '../../middlewares/validateBody.ts';
import { loginUserSchema, registerUserSchema } from '../../schemas/authSchema.ts';
import { autoriz } from '../../middlewares/authendicate.ts';
import type { RegisterUserPayload, LoginUserPayload } from '../../types/types';

export const authRouter = Router();

authRouter.post('/register', validateBody<RegisterUserPayload>(registerUserSchema), authController.register);

authRouter.post('/login', validateBody<LoginUserPayload>(loginUserSchema), authController.login);

authRouter.get('/logout', autoriz, authController.logout);

authRouter.post('/refresh', authController.refreshToken);

// authRouter.get('/current', autoriz, authController.current);
