import { useMutation, useQuery } from '@tanstack/react-query'
import {
    getMovieReviews,
    createReview,
    updateReview,
    deleteReview,
} from '@/api/reviews'
import type { CreateReviewBody, UpdateReviewBody } from '@/types'
import { queryClient } from '@/lib/queryClient'

export const reviewKeys = {
    movie: (movieId: number) => ['reviews', 'movie', movieId] as const,
}//revies de la movie con el id tal 

export function useMovieReviews(movieId: number) {
    return useQuery({
        queryKey: reviewKeys.movie(movieId),
        queryFn: () => getMovieReviews(movieId),
    })
}

export function useCreateReview() {
    return useMutation({
        mutationFn: (body: CreateReviewBody) => createReview(body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: reviewKeys.movie(data.movieId),
            })
        },
    })
}

export function useUpdateReview() {
    return useMutation({
        mutationFn: ({ reviewId, body }: { reviewId: number; body: UpdateReviewBody }) =>
            updateReview(reviewId, body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: reviewKeys.movie(data.movieId),
            })
        },
    })
}

export function useDeleteReview() {
    return useMutation({
        mutationFn: (variables : { reviewId:number, movieId:number }) =>
            deleteReview(variables.reviewId), // aque elimino el reviewId
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: reviewKeys.movie(variables.movieId),//cuando el backend responde ese reviewId ya no existe, solo mando a refetchear el movieId
            })
        },
    })
}