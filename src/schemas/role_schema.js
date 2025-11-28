import { z } from 'zod';

export const createRoleSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío')
        .max(100, 'El nombre no puede tener más de 100 caracteres'),

    permission: z.array(z.string())
        .min(1, 'Debe haber al menos un permiso')
        .max(4, 'No se permiten más de 4 permiso'),
});

export const updateRoleSchema = createRoleSchema.partial();