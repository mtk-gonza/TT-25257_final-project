import * as categoryService from './../services/category_service.js';

export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        if (!categoryData.name || !categoryData.description ) {
            return res.status(400).json({ error: 'Campos: "name" y "description" obligatorios.' });
        }
        const newCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error en createCategory del controller:', error);
        res.status(500).json({ error: 'No se pudo crear la Categoria.' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error en getAllCategories del controller:', error);
        res.status(500).json({ error: 'Error al obtener Categorias.' });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const category = await categoryService.getCategoryById(category_id.trim());
        if (!category) {
            return res.status(404).json({ error: 'Categoria no encontrada.' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error en getCategoriaById del controller:', error);
        res.status(500).json({ error: 'Error al obtener la Categoria.' });
    }
};

export const updateCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const { name, description } = req.body;
        if (!name || !description) return res.status(404).json({ error: 'Campos: "name" y "description" obligatorios.' });
        const updateData = req.body;
        const updatedCategory = await categoryService.updateCategoryById(category_id, updateData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        if (error.message === 'Categoria no encontrada.') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en updateCategoria del controller:', error);
        res.status(500).json({ error: 'No se pudo actualizar la Categoria.' });
    }
};

export const deleteCategoryById = async (req, res) => {
    try {
        const { category_id } = req.params;
        const response = await categoryService.deleteCategoryById(category_id);
        res.status(200).json({ message: response.message });
    } catch (error) {
        if (error.message === 'Categoria no encontrada.') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en deleteCategoryById del Controller:', error);
        res.status(500).json({ error: 'No se pudo eliminar la Categoria.' });
    }
};