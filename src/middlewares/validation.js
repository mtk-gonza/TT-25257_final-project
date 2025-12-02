import { formatZodError } from './../utils/zodErrorFormatter.js';

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error.name === 'ZodError') {
                const formattedError = formatZodError(error);
                return res.status(400).json(formattedError);
            }
            return res.status(500).json({
                succes: false,
                message: 'Error interno en la validación.'
            });
        }
    };
};

export const validateParams = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({
                error: 'Parámetros de ruta inválidos',
                details: result.error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        req.params = result.data;
        next();
    };
};

export const validateQuery = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({
                error: 'Parámetros de consulta inválidos',
                details: result.error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        req.query = result.data;
        next();
    };
};