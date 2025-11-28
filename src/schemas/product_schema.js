import { z } from 'zod';

const firestoreId = z.string()
    .min(1, 'ID no válido')
    .regex(/^[a-zA-Z0-9_-]+$/, 'El ID contiene caracteres no permitidos');

export const createProductSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser texto'
    }).min(3, 'El nombre no puede estar vacío')
        .max(150, 'El nombre es demasiado largo'),

    description: z.string({
        required_error: 'La descripción es obligatoria'
    }).min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(1000, 'La descripción es demasiado larga'),

    price: z.number({
        required_error: 'El precio es obligatorio',
        invalid_type_error: 'El precio debe ser un número'
    }).positive('El precio debe ser mayor que cero')
        .multipleOf(0.01, 'El precio debe tener máximo 2 decimales'),

    discount: z.number({
        invalid_type_error: 'El descuento debe ser un número'
    }).int('El descuento debe ser un número entero')
        .min(0, 'El descuento no puede ser negativo')
        .max(100, 'El descuento no puede superar el 100%')
        .optional()
        .default(0),

    sku: z.string({
        required_error: 'El SKU es obligatorio'
    }).min(3, 'El SKU no puede estar vacío')
        .max(50, 'El SKU es demasiado largo')
        .regex(/^[A-Z0-9_-]+$/, 'El SKU solo puede contener letras mayúsculas, números, guiones y guiones bajos'),

    dues: z.number({
        required_error: 'Las cuotas son obligatorias',
        invalid_type_error: 'Las cuotas deben ser un número entero'
    }).int('Las cuotas deben ser un número entero')
        .min(1, 'Debe haber al menos 1 cuota')
        .max(36, 'Máximo 36 cuotas'),

    special: z.boolean({
        invalid_type_error: 'El campo "special" debe ser true o false'
    }).optional()
        .default(false),

    images: z.array(z.string().url('Una de las imágenes no es una URL válida'))
        .min(1, 'Debe haber al menos una imagen')
        .max(10, 'No se permiten más de 10 imágenes'),

    stock: z.number({
        required_error: 'El stock es obligatorio'
    }).int('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo'),

    category_id: firestoreId,

    licence_id: firestoreId
});

export const updateProductSchema = createProductSchema.partial();