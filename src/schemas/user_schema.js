import { z } from 'zod';

const firestoreId = z.string()
    .min(1, 'ID no válido')
    .regex(/^[a-zA-Z0-9_-]+$/, 'El ID contiene caracteres no permitidos');

export const createUserSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío')
        .max(100, 'El nombre no puede tener más de 100 caracteres'),

    last_name: z.string({
        required_error: 'El apellido es obligatorio',
        invalid_type_error: 'El apellido debe ser una cadena de texto'
    }).min(3, 'El apellido no puede estar vacío')
        .max(100, 'El apellido no puede tener más de 100 caracteres'),

    username: z.string({
        required_error: 'El nombre de usuario es obligatorio',
        invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
    }).min(3, 'El nombre de usuario no puede estar vacío')
        .max(100, 'El nombre de usuario no puede tener más de 100 caracteres'),

    password: z.string({
        required_error: 'La contraseña es obligatoria',
        invalid_type_error: 'La contraseña debe ser una cadena de texto'
    }).min(3, 'La contraseña no puede estar vacía')
        .max(100, 'La contraseña no puede tener más de 100 caracteres'),

    role_id: firestoreId
});

export const updateUserSchema = createUserSchema.partial();