import { Router } from 'express';
import * as categoryController from './../controllers/category_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createCategorySchema, updateCategorySchema } from './../schemas/category_schema.js';
import { requirePermission } from './../middlewares/requirePermission.js';

export const categoryRouter = Router();

categoryRouter.post('/', authentication, requirePermission('create'), validateBody(createCategorySchema), categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:category_id', categoryController.getCategoryById);
categoryRouter.put('/:category_id', authentication, requirePermission('update'), validateBody(updateCategorySchema), categoryController.updateCategoryById);
categoryRouter.delete('/:category_id', authentication, requirePermission('delete'), categoryController.deleteCategoryById);