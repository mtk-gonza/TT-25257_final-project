export const formatZodError = (zodError) => {
    const issues = zodError.issues.map(issue => ({
        field: issue.path.join('.'),
        code: issue.code
    }));

    const firstMessage = zodError.issues[0]?.message || 'Error de validación';

    return {
        success: false,
        message: firstMessage,
        details: issues
    };
};