import { Router } from 'express';
import * as productController from './../controllers/product_controller.js';

export const productRouter = Router();

productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:product_id', productController.getProductById);
productRouter.put('/:product_id', productController.updateProductById);
productRouter.delete('/:product_id', productController.deleteProductById);