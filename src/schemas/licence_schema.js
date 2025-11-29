import { z } from 'zod';

export const createLicenceSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre es demasiado largo'),

    description: z.string({
        required_error: 'La descripción es obligatoria'
    }).min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(1000, 'La descripción es demasiado larga'),

    images: z.array(z.string())
        .min(1, 'Debe haber al menos una imagen')
        .max(10, 'No se permiten más de 10 imágenes'),
});

export const updateLicenceSchema = createLicenceSchema.partial();