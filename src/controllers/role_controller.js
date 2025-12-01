import { success } from 'zod';
import * as roleService from './../services/role_service.js';

export const createRole = async (req, res) => {
    try {
        const roleData = req.body;
        const newRole = await roleService.createRole(roleData);
        res.status(201).json({
            success: true,
            message: 'Rol creado exitosamente.',
            data: newRole
        });
    } catch (err) {
        console.error('Error en createRole del controller:', err);
        if (err.message === 'Ya existe un rol con ese nombre.') {
            return res.status(409).json({ 
                success: false,
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo crear el Rol.' 
        });
    }
};

export const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json({
            success: true,
            data: roles
        });
    } catch (err) {
        console.error('Error en getAllRoles del controller:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener Roles.' 
        });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const role = await roleService.getRoleById(role_id.trim());
        if (!role) {
            return res.status(404).json({ 
                success: false,
                message: 'Rol no encontrado.' 
            })
        };
        res.json({
            success: true,
            data: role
        });
    } catch (err) {
        console.error('Error en getRoleById del controller:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error al obtener el Rol.' 
        });
    }
};

export const updateRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const updateData = req.body;
        const updatedRole = await roleService.updateRoleById(role_id, updateData);
        res.status(200).json({
            success: true,
            message: 'Rol actualizado exitosamente.',
            data: updatedRole
        });
    } catch (err) {
        console.error('Error en updateRole del controller:', err);
        if (err.message === 'Rol no encontrado.') {
            return res.status(404).json({
                success: false, 
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo actualizar el Rol.' 
        });
    }
};

export const deleteRoleById = async (req, res) => {
    try {
        const { role_id } = req.params;
        const response = await roleService.deleteRoleById(role_id);
        res.status(200).json({ 
            success: true,
            message: response.message 
        });
    } catch (err) {
        console.error('Error en deleteRolById del Controller:', err);
        if (
            err.message === 'Rol no encontrado.' ||
            err.message === 'Rol en uso.'
        ) {
            return res.status(404).json({ 
                success: false,
                message: err.message 
            })
        };
        res.status(500).json({ 
            success: false,
            message: 'No se pudo eliminar el Rol.' 
        });
    }
};