import * as productService from './../services/product_service.js';

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const allowedFields = [
            'name',
            'description',
            'price',
            'stock',
            'discount',
            'sku',
            'dues',
            'special',
            'images',
            'licence_id',
            'category_id'
        ];
        const filteredData = {};
        for (const key of allowedFields) {
            if (key in productData) {
                filteredData[key] = productData[key];
            }
        }
        const requiredFields = ['name', 'description', 'price', 'stock', 'sku', 'licence_id', 'category_id'];
        const missingFields = requiredFields.filter(field => !(field in filteredData));
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Faltan campos obligatorios: ${missingFields.join(', ')}`
            });
        }
        if (typeof filteredData.name !== 'string' || filteredData.name.trim().length < 2) {
            return res.status(400).json({ error: 'El campo "name" debe ser una cadena de al menos 2 caracteres' });
        }
        if (typeof filteredData.description !== 'string' || filteredData.description.trim().length < 10) {
            return res.status(400).json({ error: 'El campo "description" debe ser una cadena de al menos 10 caracteres' });
        }
        if (typeof filteredData.price !== 'number' || filteredData.price <= 0) {
            return res.status(400).json({ error: 'El campo "price" debe ser un número mayor que 0' });
        }
        if (!Number.isInteger(filteredData.stock) || filteredData.stock < 0) {
            return res.status(400).json({ error: 'El campo "stock" debe ser un entero no negativo' });
        }
        if (typeof filteredData.sku !== 'string' || filteredData.sku.trim().length < 3) {
            return res.status(400).json({ error: 'El campo "sku" debe ser una cadena de al menos 3 caracteres' });
        }
        if (filteredData.images && !Array.isArray(filteredData.images)) {
            return res.status(400).json({ error: 'El campo "images" debe ser un array de URLs' });
        }
        if (typeof filteredData.special !== 'boolean' && filteredData.special !== undefined) {
            return res.status(400).json({ error: 'El campo "special" debe ser booleano' });
        }
        if (filteredData.discount !== undefined && (typeof filteredData.discount !== 'number' || filteredData.discount < 0 || filteredData.discount > 100)) {
            return res.status(400).json({ error: 'El campo "discount" debe ser un número entre 0 y 100' });
        }
        if (filteredData.dues !== undefined && (!Number.isInteger(filteredData.dues) || filteredData.dues <= 0)) {
            return res.status(400).json({ error: 'El campo "dues" debe ser un entero positivo' });
        } 

        const newProduct = await productService.createProduct(filteredData);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error en createProduct del controller:', err.message);
        if (err.message === 'El SKU ya existe') {
            return res.status(409).json({ error: 'El SKU ya está en uso' });
        }
        if (err.message.includes('Faltan campos') || err.message.includes('debe ser')) {
            return res.status(400).json({ error: err.message });
        }
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

        const allowedFields = [
            'name',
            'description',
            'price',
            'stock',
            'discount',
            'sku',
            'dues',
            'special',
            'images',
            'licence_id',
            'category_id'
        ];

        const filteredData = {};
        for (const key of allowedFields) {
            if (key in updateData) {
                filteredData[key] = updateData[key];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({
                error: 'Debe proporcionar al menos un campo válido para actualizar'
            });
        }

        if ('price' in filteredData && (typeof filteredData.price !== 'number' || filteredData.price < 0)) {
            return res.status(400).json({ error: 'El campo "price" debe ser un número positivo' });
        }
        if ('stock' in filteredData && (!Number.isInteger(filteredData.stock) || filteredData.stock < 0)) {
            return res.status(400).json({ error: 'El campo "stock" debe ser un entero no negativo' });
        }
        if ('images' in filteredData && !Array.isArray(filteredData.images)) {
            return res.status(400).json({ error: 'El campo "images" debe ser un array' });
        }

        const updatedProduct = await productService.updateProductById(product_id, filteredData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error en updateProductById del controller:', error);
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
        console.error('Error en deleteProduct del controller:', error);
        if (error.message === 'Producto no encontrado') {
            return res.status(404).json({ error: error.message });
        }        
        res.status(500).json({ error: 'No se pudo eliminar el Producto' });
    }
};