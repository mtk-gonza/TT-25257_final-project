import { z } from 'zod';

export const createLicenceSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(3, 'El nombre no puede estar vacío')
        .max(100, 'El nombre no puede tener más de 100 caracteres'),

    description: z.string({
        required_error: 'La descripción es obligatoria'
    }).min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(500, 'La descripción no puede superar los 500 caracteres'),

    images: z.array(z.string().url('Una de las imágenes no es una URL válida'))
        .min(1, 'Debe haber al menos una imagen')
        .max(10, 'No se permiten más de 10 imágenes'),
});

export const updateLicenceSchema = createLicenceSchema.partial();