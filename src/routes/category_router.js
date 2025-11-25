import { Router } from 'express';
import * as categoryController from './../controllers/category_controller.js';
import { authentication } from './../middlewares/authentication.js';

export const categoryRouter = Router();

categoryRouter.post('/', authentication, categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:category_id', categoryController.getCategoryById);
categoryRouter.put('/:category_id', authentication, categoryController.updateCategoryById);
categoryRouter.delete('/:category_id', authentication, categoryController.deleteCategoryById);