import { Router } from 'express';
import * as productLocalController from '../controllers/product_local_controller.js';

export const productLocalRouter = Router();

productLocalRouter.post('/', productLocalController.createProduct);
productLocalRouter.get('/', productLocalController.getAllProducts);
productLocalRouter.get('/:product_id', productLocalController.getProductById);
productLocalRouter.put('/:product_id', productLocalController.updateProductById);
productLocalRouter.delete('/:product_id', productLocalController.deleteProductById);