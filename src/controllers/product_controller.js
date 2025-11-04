import * as productService from './../services/product_service.js';

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (!productData.name || !productData.description) {
            return res.status(400).json({ error: 'Faltan campos' });
        }
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error en createProduct del controller:', error);
        res.status(500).json({ error: 'No se pudo crear el producto' });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error en getAllProducts del controller:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await productService.getProductById(product_id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error en getProductById del controller:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const updateData = req.body;

        const updatedProduct = await productService.updateProductById(product_id, updateData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('campos')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error en updateProduct del controller:', error);
        res.status(500).json({ error: 'No se pudo actualizar el producto' });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        await productService.deleteProductById(product_id);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en deleteProduct del controller:', error);
        res.status(500).json({ error: 'No se pudo eliminar el Producto' });
    }
};