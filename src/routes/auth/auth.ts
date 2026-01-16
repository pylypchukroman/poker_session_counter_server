import { Router } from "express";
import { authController } from '../../controllers/auth.ts';
import { validateBody } from '../../middlewares/validateBody.ts';
import { loginUserSchema, registerUserSchema } from '../../schemas/authSchema.ts';
import { autoriz } from '../../middlewares/authendicate.ts';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), authController.register);

authRouter.post('/login', validateBody(loginUserSchema), authController.login);

authRouter.get('/logout', autoriz, authController.logout);

authRouter.get('/refresh', authController.refreshToken);

// authRouter.get('/current', autoriz, authController.current);
