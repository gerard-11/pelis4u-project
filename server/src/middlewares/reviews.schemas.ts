import {z} from 'zod'

export const createReviewSchema = z.object({
    movieId: z.number(),
    rating: z
        .number()
        .min(1, "El rating mínimo es 1")
        .max(10, "El rating máximo es 10"),
    content: z
        .string()
        .min(10, "La reseña debe tener al menos 10 caracteres")
        .max(500, "La reseña no puede superar los 500 caracteres"),
});

export const updateReviewSchema = z
    .object({
        rating: z.number().min(1).max(10).optional(),
        content: z.string().min(10).max(500).optional(),
    })
    .refine(
        (data) => data.rating !== undefined || data.content !== undefined,
        { message: "Debes enviar al menos rating o content para actualizar" }
    );

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;