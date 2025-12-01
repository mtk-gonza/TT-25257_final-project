import * as productService from './../services/product_service.js';

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente.',
            data: newProduct
        });
    } catch (err) {  
        console.error('Error en createProduct del controller:', err);
        if (
            err.message === 'Ya existe un producto con ese SKU.' ||
            err.message === 'Ya existe un producto con ese nombre.' ||
            err.message === 'Categoría no encontrada.' ||
            err.message === 'Licencia no encontrada.'
        ) {
            return res.status(409).json({
                success: false, 
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo crear el Producto.' 
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json({
            success: true,
            data: products
        });
    } catch (err) {
        console.error('Error en getAllProducts del controller:', err);
        res.status(500).json({ 
            success: false,            
            message: 'Error al obtener Productos.' 
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await productService.getProductById(product_id);
        if (!product) return res.status(404).json({ 
            success: false,
            message: 'Producto no encontrado.' 
        });
        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        console.error('Error en getProductById del controller:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener el Producto.' 
        });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const { id, name, price, stock, sku, category_id, licence_id, discount, dues, special } = req.query;
        if (!id && !name && !price && !stock && !sku && !category_id && !licence_id && !discount && !dues && !special) {
            return res.status(404).json({ 
                success: false,
                message: 'Debe enviar al menos un parámetro de búsqueda.' 
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
            return res.status(404).json({ 
                success: false,
                message: 'No se encontraron Productos.' 
            })
        };
        res.json({
            success: true,
            data: products
        });
    } catch (err) {
        console.error('Error en searchProducts:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor.' 
        });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const updateData  = req.body;
        const updatedProduct = await productService.updateProductById(product_id, updateData);
        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (err) {
        console.error('Error en updateProductById del controller:', err);
        if (
            err.message === 'Producto no encontrado.' || 
            err.message === 'Categoría no encontrada.' ||
            err.message === 'Licencia no encontrada.'
        ) {
            return res.status(404).json({
                success: false, 
                message: err.message 
            })
        };      
        res.status(500).json({
            success: false, 
            message: 'No se pudo actualizar el Producto.' 
        });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { product_id } = req.params;
        const response = await productService.deleteProductById(product_id);
        res.status(200).json({ 
            success: true,
            message: response.message 
        });
    } catch (err) {
        console.error('Error en deleteProduct del controller:', err);
        if (err.message === 'Producto no encontrado') {
            return res.status(404).json({
                success: false, 
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo eliminar el Producto.' 
        });
    }
};