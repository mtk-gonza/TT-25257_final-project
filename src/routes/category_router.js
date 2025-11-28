import { Router } from 'express';
import * as categoryController from './../controllers/category_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createCategorySchema, updateCategorySchema } from './../schemas/category_schema.js';

export const categoryRouter = Router();

categoryRouter.post('/', authentication, validateBody(createCategorySchema), categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:category_id', categoryController.getCategoryById);
categoryRouter.put('/:category_id', authentication, validateBody(updateCategorySchema), categoryController.updateCategoryById);
categoryRouter.delete('/:category_id', authentication, categoryController.deleteCategoryById);