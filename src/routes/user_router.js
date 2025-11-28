import { Router } from 'express';
import * as userController from './../controllers/user_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createUserSchema, updateUserSchema } from './../schemas/user_schema.js'

export const userRouter = Router();

userRouter.post('/', authentication, validateBody(createUserSchema), userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:user_id', userController.getUserById);
userRouter.put('/:user_id', authentication, validateBody(updateUserSchema), userController.updateUserById);
userRouter.delete('/:user_id', authentication, userController.deleteUserById);