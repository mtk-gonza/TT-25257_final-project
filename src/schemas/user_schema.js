import { z } from 'zod';

const firestoreId = z.string()
    .min(1, 'ID no válido')
    .regex(/^[a-zA-Z0-9_-]+$/, 'El ID contiene caracteres no permitidos');

export const createUserSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre es demasiado largo'),

    last_name: z.string({
        required_error: 'El apellido es obligatorio',
        invalid_type_error: 'El apellido debe ser una cadena de texto'
    }).min(3, 'El apellido no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El apellido es demasiado largo'),

    username: z.string({
        required_error: 'El nombre de usuario es obligatorio',
        invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
    }).min(3, 'El nombre de usuario no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre de usuario es demasiado largo'),

    password: z.string({
        required_error: 'La contraseña es obligatoria',
        invalid_type_error: 'La contraseña debe ser una cadena de texto'
    }).min(6, 'La contraseña no puede estar vacía y debe tener al menos 6 caracteres')
        .max(100, 'La contraseña es demasiada largo'),

    role_id: firestoreId
});

export const updateUserSchema = createUserSchema.partial();