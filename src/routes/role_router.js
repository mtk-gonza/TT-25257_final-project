import { Router } from 'express';
import * as roleController from './../controllers/role_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createRoleSchema, updateRoleSchema } from './../schemas/role_schema.js';
import { requirePermission } from './../middlewares/requirePermission.js';

export const roleRouter = Router();

roleRouter.post('/', authentication, requirePermission('create'), validateBody(createRoleSchema), roleController.createRole);
roleRouter.get('/', roleController.getAllRoles);
roleRouter.get('/:role_id', roleController.getRoleById);
roleRouter.put('/:role_id', authentication, requirePermission('update'), validateBody(updateRoleSchema), roleController.updateRoleById);
roleRouter.delete('/:role_id', authentication, requirePermission('delete'), roleController.deleteRoleById);