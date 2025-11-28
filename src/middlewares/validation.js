export const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map(err => ({
                field: err.path.length > 0 ? err.path.join('.') : 'body',
                message: err.message,
                code: err.code
            }));
            return res.status(400).json({
                error: errors[0].message,
                details: errors
            });
        }
        req.body = result.data;
        next();
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