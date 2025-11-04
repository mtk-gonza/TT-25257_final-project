import { Router } from 'express';
import * as userController from './../controllers/user_controller.js';

export const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:user_id', userController.getUserById);
userRouter.put('/:user_id', userController.updateUserById);
userRouter.delete('/:user_id', userController.deleteUserById);