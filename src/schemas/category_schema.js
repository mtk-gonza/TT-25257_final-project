import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre es demasiado largo'),

    description: z.string({
        required_error: 'La descripción es obligatoria'
    }).min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(1000, 'La descripción es demasiado larga')
});

export const updateCategorySchema = createCategorySchema.partial();