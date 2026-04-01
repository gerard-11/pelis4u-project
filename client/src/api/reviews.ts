import { axiosClient } from '@/lib/axiosClient'
import type { CreateReviewBody, Review, UpdateReviewBody } from '@/types'


export async function getMovieReviews(movieId: number): Promise<Review[]> {
    const { data } = await axiosClient.get<Review[]>(`/api/reviews/movie/${movieId}`)
    return data
}

export async function createReview(body: CreateReviewBody): Promise<Review> {
    const { data } = await axiosClient.post<Review>('/api/reviews',
        body
    )
    return data
}

export async function updateReview(reviewId: number, body: UpdateReviewBody): Promise<Review> {
    const { data } = await axiosClient.put<Review>(`/api/reviews/${reviewId}`, body)
    return data
}

export async function deleteReview(reviewId: number): Promise<void> {
    await axiosClient.delete(`/api/reviews/${reviewId}`)
}