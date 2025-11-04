import { Router } from 'express';
import * as categoryController from './../controllers/category_controller.js';

export const categoryRouter = Router();

categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:category_id', categoryController.getCategoryById);
categoryRouter.put('/:category_id', categoryController.updateCategoryById);
categoryRouter.delete('/:category_id', categoryController.deleteCategoryById);