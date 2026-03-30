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

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>