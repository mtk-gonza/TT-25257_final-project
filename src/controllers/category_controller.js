import * as categoryService from './../services/category_service.js';

export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryService.createCategory(categoryData);
        res.status(201).json({ 
            success: true,
            message: 'Categoria creada exitosamente.',
            data: newCategory 
        });
    } catch (err) {
        console.error('Error en createCategory del controller:', err);
        if (err.message === 'Ya existe una categoría con ese nombre.') {
            return res.status(409).json({
                success: false,
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo crear la Categoria.' 
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json({
            success: true,
            data: categories
        });
    } catch (err) {
        console.error('Error en getAllCategories del controller:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener Categorias.' 
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const category = await categoryService.getCategoryById(category_id.trim());
        if (!category) {
            return res.status(404).json({ 
                success: false,
                message: 'Categoria no encontrada.' 
            })
        };
        res.json({ 
            success: true,
            data: category 
        });
    } catch (err) {
        console.error('Error en getCategoriaById del controller:', err);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la Categoria.' 
        });
    }
};

export const updateCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const updateData = req.body;
        const updatedCategory = await categoryService.updateCategoryById(category_id, updateData);
        res.status(200).json({ 
            success: true,
            message: 'Categoria actualizada exitosamente.',
            data: updatedCategory
        });
    } catch (err) {
        console.error('Error en updateCategoria del controller:', err);
        if (err.message === 'Categoria no encontrada.') {
            return res.status(404).json({ 
                success: false,
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo actualizar la Categoria.' 
        });
    }
};

export const deleteCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const response = await categoryService.deleteCategoryById(category_id);
        res.status(200).json({ 
            success: true,
            message: response.message 
        });
    } catch (err) {
        console.error('Error en deleteCategoryById del Controller:', err);
        if (
            err.message === 'Categoria no encontrada.' ||
            err.message === 'Categoria en uso.'
        ) {
            return res.status(404).json({
                success: false, 
                message: err.message                 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo eliminar la Categoria.'
        });
    }
};