import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { PasswordResetController } from '../controllers/passReset-controller';

export const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/request-password-reset', PasswordResetController.requestPasswordReset);
authRouter.post('/reset-password', PasswordResetController.resetPassword);