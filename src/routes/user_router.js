import { Router } from 'express';
import * as userController from './../controllers/user_controller.js';
import { authentication } from './../middlewares/authentication.js';

export const userRouter = Router();

userRouter.post('/', authentication, userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:user_id', userController.getUserById);
userRouter.put('/:user_id', authentication, userController.updateUserById);
userRouter.delete('/:user_id', authentication, userController.deleteUserById);