import { Router } from 'express';
import * as userLocalController from './../controllers/user_local_controller.js';

export const userLocalRouter = Router();

userLocalRouter.post('/', userLocalController.createUser);
userLocalRouter.get('/', userLocalController.getAllUsers);
userLocalRouter.get('/:user_id', userLocalController.getUserById);
userLocalRouter.put('/:user_id', userLocalController.updateUserById);
userLocalRouter.delete('/:user_id', userLocalController.deleteUserById);