import * as roleService from './../services/role_service.js';

export const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        const newRole = await roleService.createRole(roleData);
        res.status(201).json(newRole);
    } catch (err) {
        console.error('Error en createRole del controller:', err);
        if (err.message === 'Ya existe un rol con ese nombre.') return res.status(409).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo crear el Rol.' });
    }
};

export const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (err) {
        console.error('Error en getAllRoles del controller:', err);
        res.status(500).json({ error: 'Error al obtener Roles.' });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const role = await roleService.getRoleById(role_id.trim());
        if (!role) return res.status(404).json({ error: 'Rol no encontrado.' });
        res.json(role);
    } catch (err) {
        console.error('Error en getRoleById del controller:', err);
        res.status(500).json({ error: 'Error al obtener el Rol.' });
    }
};

export const updateRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const updateData = req.body;
        const updatedRole = await roleService.updateRoleById(role_id, updateData);
        res.status(200).json(updatedRole);
    } catch (err) {
        console.error('Error en updateRole del controller:', err);
        if (err.message === 'Rol no encontrado.') return res.status(404).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo actualizar el Rol.' });
    }
};

export const deleteRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const response = await roleService.deleteRoleById(role_id);
        res.status(200).json({ message: response.message });
    } catch (err) {
        console.error('Error en deleteRolById del Controller:', err);
        if (err.message === 'Rol no encontrado.') return res.status(404).json({ error: err.message });
        res.status(500).json({ error: 'No se pudo eliminar el Rol.' });
    }
};