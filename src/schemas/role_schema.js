import { z } from 'zod';

const permissionEnum = z.enum(['create', 'read', 'update', 'delete']);

export const createRoleSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    })
        .min(3, 'El nombre no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre es demasiado largo'),

    permission: z.array(permissionEnum)
        .min(1, 'Debe haber al menos un permiso')
        .max(4, 'No se permiten más de 4 permisos')
        .refine((perms) => new Set(perms).size === perms.length, {
            message: 'Los permisos no deben repetirse'
        })
});

export const updateRoleSchema = createRoleSchema.partial();