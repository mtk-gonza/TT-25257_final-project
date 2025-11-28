import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío')
        .max(100, 'El nombre no puede tener más de 100 caracteres'),

    description: z.string({
        required_error: 'La descripción es obligatoria'
    }).min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(500, 'La descripción no puede superar los 500 caracteres')
});

export const updateCategorySchema = createCategorySchema.partial();