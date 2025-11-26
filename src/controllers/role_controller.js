import * as roleService from './../services/role_service.js';

export const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        if (!roleData.name) {
            return res.status(400).json({ error: 'Campo "name" es obligatorio.' });
        }
        const newRole = await roleService.createRole(roleData);
        res.status(201).json(newRole);
    } catch (error) {
        console.error('Error en createRole del controller:', error);
        res.status(500).json({ error: 'No se pudo crear el Rol.' });
    }
};

export const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        console.error('Error en getAllRoles del controller:', error);
        res.status(500).json({ error: 'Error al obtener Roles.' });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const role = await roleService.getRoleById(role_id.trim());
        if (!role) {
            return res.status(404).json({ error: 'Rol no encontrado.' });
        }
        res.json(role);
    } catch (error) {
        console.error('Error en getRoleById del controller:', error);
        res.status(500).json({ error: 'Error al obtener el Rol.' });
    }
};

export const updateRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const updateData = req.body;

        const updatedRole = await categoryService.updateCategoryById(role_id, updateData);
        res.status(200).json(updatedRole);
    } catch (error) {
        if (error.message === 'Rol no encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes('Campo')) {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error en updateRole del controller:', error);
        res.status(500).json({ error: 'No se pudo actualizar el Rol.' });
    }
};

export const deleteRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        await categoryService.deleteCategoryById(role_id);
        res.status(200).json({ message: 'Rol eliminado correctamente.' });
    } catch (error) {
        if (error.message === 'Rol no encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error en deleteRolById del Controller:', error);
        res.status(500).json({ error: 'No se pudo eliminar el Rol.' });
    }
};