import { Router } from 'express';
import * as productController from './../controllers/product_controller.js';
import { authentication } from './../middlewares/authentication.js';
import { validateBody } from './../middlewares/validation.js';
import { createProductSchema, updateProductSchema } from './../schemas/product_schema.js'

export const productRouter = Router();

productRouter.post('/', authentication, validateBody(createProductSchema), productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/search', productController.searchProducts);
productRouter.get('/:product_id', productController.getProductById);
productRouter.put('/:product_id', authentication, validateBody(updateProductSchema), productController.updateProductById);
productRouter.delete('/:product_id', authentication, productController.deleteProductById);