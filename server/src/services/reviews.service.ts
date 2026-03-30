import prisma  from "../config/db.js";
import { CreateReviewInput, UpdateReviewInput } from "../middlewares/reviews.schemas.js";

export async function getMovieReviews(movieId: number) {
    return prisma.review.findMany({
        where: { movieId },
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });
}

export async function createReview(
    userId: string,
    data: CreateReviewInput
) {
    return prisma.review.create({
        data: {
            userId,
            movieId: data.movieId,
            rating: data.rating,
            content: data.content,
        },
    });
}

export async function updateReview(
    reviewId: string,
    data: UpdateReviewInput
) {
    return prisma.review.update({
        where: { id: reviewId },
        data,
    });
}

export async function deleteReview(reviewId: string) {
    return prisma.review.delete({
        where: { id: reviewId },
    });
}

export async function findReviewById(reviewId: string) {
    return prisma.review.findUnique({
        where: { id: reviewId },
    });
}