import { Router } from 'express';
import * as productController from './../controllers/product_controller.js';
import { authentication } from './../middlewares/authentication.js';

export const productRouter = Router();

productRouter.post('/', authentication, productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/search', productController.searchProducts);
productRouter.get('/:product_id', productController.getProductById);
productRouter.put('/:product_id', authentication, productController.updateProductById);
productRouter.delete('/:product_id', authentication, productController.deleteProductById);