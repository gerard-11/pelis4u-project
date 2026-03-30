import { Request, Response, NextFunction } from "express";
import * as reviewsService from "../services/reviews.service.js";
import { createReviewSchema, updateReviewSchema } from "../middlewares/reviews.schemas.js";

export async function getMovieReviews(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const movieId = Number(req.params.movieId);

        if (isNaN(movieId)) {
            res.status(400).json({ message: "movieId debe ser un número" });
            return;
        }

        const reviews = await reviewsService.getMovieReviews(movieId);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
}

export async function createReview(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId!;

        const parsed = createReviewSchema.safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const review = await reviewsService.createReview(userId, parsed.data);
        res.status(201).json(review);
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code: string }).code === "P2002"
        ) {
            res.status(409).json({ message: "Ya tienes una reseña para esta película" });
            return;
        }

        next(error);
    }
}

export async function updateReview(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId!;
        const reviewId = req.params.id as string

        const review = await reviewsService.findReviewById(reviewId);

        if (!review) {
            res.status(404).json({ message: "Reseña no encontrada" });
            return;
        }

        if (review.userId !== userId) {
            res.status(403).json({ message: "No tienes permiso para editar esta reseña" });
            return;
        }

        const parsed = updateReviewSchema.safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const updated = await reviewsService.updateReview(reviewId, parsed.data);
        res.json(updated);
    } catch (error) {
        next(error);
    }
}

export async function deleteReview(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId!;
        const reviewId = req.params.id as string

        const review = await reviewsService.findReviewById(reviewId);

        if (!review) {
            res.status(404).json({ message: "Reseña no encontrada" });
            return;
        }

        if (review.userId !== userId) {
            res.status(403).json({ message: "No tienes permiso para eliminar esta reseña" });
            return;
        }

        await reviewsService.deleteReview(reviewId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}