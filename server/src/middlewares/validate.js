import { z } from 'zod'

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, 'El username debe tener al menos 3 caracteres')
        .max(20, 'El username no puede tener más de 20 caracteres'),
    email: z
        .string()
        .email('El email no es válido'),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
})
export const loginSchema = z.object({
    email: z.string().email('El email no es válido'),
    password: z.string().min(1, 'La contraseña es requerida')
})

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: 'Datos inválidos',
            errors: result.error.flatten().fieldErrors

        })
    }

    req.body = result.data
    next()
}