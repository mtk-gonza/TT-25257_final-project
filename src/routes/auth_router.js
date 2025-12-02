import { Router } from 'express';
import * as authController from './../controllers/auth_controller.js';
import { validateBody } from './../middlewares/validation.js';
import { loginSchema, registerSchema } from './../schemas/auth_schema.js';

export const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), authController.login);
authRouter.post('/register', validateBody(registerSchema), authController.register);