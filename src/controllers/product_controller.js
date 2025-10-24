import * as productService from '../services/product_service.js';

export const createProduct = async (req, res) => {
    const data = req.body;
    try {
        const product = await productService.createProduct(data);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.readProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getProductById = async (req, res) => {
    const { product_id } = req.params;
    try {
        const product = await productService.readProductById(product_id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updateProductById = async (req, res) => {
    const { product_id } = req.params;
    const updateData = req.body;
    try {
        const updatedProduct = await productService.updateProduct(product_id, updateData);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteProductById = async (req, res) => {
    const { product_id } = req.params;
    try {
        const deletedProduct = await productService.deleteProduct(product_id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        res.json(deletedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}