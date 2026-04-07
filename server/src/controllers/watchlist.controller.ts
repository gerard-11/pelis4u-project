import { Request, Response, NextFunction } from "express";
import * as watchlistService from "../services/watchlist.service.js";

export async function getWatchlist(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId!;
        const watchlist = await watchlistService.getWatchlist(userId);
        res.json(watchlist);
    } catch (error) {
        next(error);
    }
}

export async function addToWatchlist(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId!;
        const { movieId } = req.body as { movieId: number };

        if (!movieId || isNaN(Number(movieId))) {
            res.status(400).json({ message: "movieId es requerido y debe ser un número" });
            return;
        }

        const item = await watchlistService.addToWatchlist(userId, Number(movieId));

        res.status(201).json(item);
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code: string }).code === "P2002"
        ) {
            res.status(409).json({ message: "La película ya está en tu watchlist" });
            return;
        }

        next(error);
    }
}

export async function removeFromWatchlist(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userId = req.userId!;
        const movieId = Number(req.params.movieId);

        if (isNaN(movieId)) {
            res.status(400).json({ message: "movieId debe ser un número" });
            return;
        }

        const result = await watchlistService.removeFromWatchlist(userId, movieId);

        // deleteMany devuelve { count: n } — si count es 0, la película no estaba
        if (result.count === 0) {
            res.status(404).json({ message: "La película no está en tu watchlist" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}