import { Router } from 'express';
import * as productController from './../controllers/product_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createProductSchema, updateProductSchema } from './../schemas/product_schema.js';
import { requirePermission } from './../middlewares/requirePermission.js';

export const productRouter = Router();

productRouter.post('/', authentication, requirePermission('create'), validateBody(createProductSchema), productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/search', productController.searchProducts);
productRouter.get('/:product_id', productController.getProductById);
productRouter.put('/:product_id', authentication, requirePermission('update'), validateBody(updateProductSchema), productController.updateProductById);
productRouter.delete('/:product_id', authentication, requirePermission('delete'), productController.deleteProductById);