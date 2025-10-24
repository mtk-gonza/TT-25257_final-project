import { Router } from 'express';
import * as authController from '../controllers/auth_controller.js';

export const authRouter = Router();

authRouter.post('/auth', authController.login);
authRouter.post('/register', authController.register);