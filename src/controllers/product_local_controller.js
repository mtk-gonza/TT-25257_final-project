import * as productLocalService from './../services/product_local_service.js';

export const createProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await productLocalService.createProduct(data);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productLocalService.getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await productLocalService.getProductById(product_id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const updateData = req.body;
        const updatedProduct = await productLocalService.updateProductById(product_id, updateData);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const deletedProduct = await productLocalService.deleteProductById(product_id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.json(deletedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}