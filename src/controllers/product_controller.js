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

export const searchProducts = async (req, res) => {
    try {
        const { id, name, price, stock, sku, category_id, licence_id, discount, dues, special } = req.query;
        if (!id && !name && !price && !stock && !sku && !category_id && !licence_id && !discount && !dues && !special) {
            return res.status(400).json({
                error: 'Debe enviar al menos un parámetro de búsqueda'
            });
        }
        const filters = {};
        if (id) filters.id = id;
        if (name) filters.name = name;
        if (price) filters.price = Number(price);
        if (stock) filters.stock = Number(stock);
        if (sku) filters.sku = sku;
        if (category_id) filters.category_id = category_id;
        if (licence_id) filters.licence_id = licence_id;
        if (discount) filters.discount = Number(discount);
        if (dues) filters.dues = Number(dues);
        //if (special) filters.special = special;
        const products = await productService.getProductsByFilters(filters);
        if (products.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
        res.json(products);
    } catch (error) {
        console.error('Error en searchProducts:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
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