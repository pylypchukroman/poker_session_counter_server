import { Router } from "express";
import { authController } from '../../controllers/auth.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../../schemas/authSchema.js';
import { autoriz } from '../../middlewares/authendicate.js';
import type { RegisterUserPayload, LoginUserPayload } from '../../types/types.js';

export const authRouter = Router();

authRouter.post('/register', validateBody<RegisterUserPayload>(registerUserSchema), authController.register);

authRouter.post('/login', validateBody<LoginUserPayload>(loginUserSchema), authController.login);

authRouter.get('/logout', autoriz, authController.logout);

authRouter.post('/refresh', authController.refreshToken);

