import * as categoryService from './../services/category_service.js';

export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        if (!categoryData.name || !categoryData.description ) {
            return res.status(400).json({ error: 'Faltan campos: name, description' });
        }
        const newCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error en createCategory del controller:', error);
        res.status(500).json({ error: 'No se pudo crear la categoria' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error en getAllCategories del controller:', error);
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const category = await categoryService.getCategoryById(category_id.trim());
        if (!category) {
            return res.status(404).json({ error: 'categoria no encontrada' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error en getCategoriaById del controller:', error);
        res.status(500).json({ error: 'Error al obtener la categoria' });
    }
};

export const updateCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const updateData = req.body;

        const updatedCategory = await categoryService.updateCategoryById(category_id, updateData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        if (error.message === 'categoria no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('campos')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error en updateCategoria del controller:', error);
        res.status(500).json({ error: 'No se pudo actualizar la categoria' });
    }
};

export const deleteCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        await categoryService.deleteCategoryById(category_id);
        res.status(200).json({ message: 'categoria eliminada correctamente' });
    } catch (error) {
        if (error.message === 'categoria no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en deleteCategoryById del Controller:', error);
        res.status(500).json({ error: 'No se pudo eliminar la categoria' });
    }
};