import { Router } from 'express';
import * as roleController from './../controllers/role_controller.js';
import { authentication } from './../middlewares/authentication.js';

export const roleRouter = Router();

roleRouter.post('/', authentication, roleController.createRole);
roleRouter.get('/', roleController.getAllRoles);
roleRouter.get('/:role_id', roleController.getRoleById);
roleRouter.put('/:role_id', authentication, roleController.updateRoleById);
roleRouter.delete('/:role_id', authentication, roleController.deleteRoleById);