import { Router } from "express";
import { authController } from '../../controllers/auth';
import { validateBody } from '../../middlewares/validateBody';
import { loginUserSchema, registerUserSchema } from '../../schemas/authSchema';
import { autoriz } from '../../middlewares/authendicate';
import type { RegisterUserPayload, LoginUserPayload } from '../../types/types';

export const authRouter = Router();

authRouter.post('/register', validateBody<RegisterUserPayload>(registerUserSchema), authController.register);

authRouter.post('/login', validateBody<LoginUserPayload>(loginUserSchema), authController.login);

authRouter.get('/logout', autoriz, authController.logout);

authRouter.post('/refresh', authController.refreshToken);

// authRouter.get('/current', autoriz, authController.current);
