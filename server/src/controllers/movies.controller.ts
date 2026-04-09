import { Request, Response, NextFunction } from "express";
import * as tmdbService from "../services/tmdb.service.js";
import {getGenresMovies} from "../services/tmdb.service.js";


export async function getTrending(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const data = await tmdbService.getTrending();
        res.json(data);
    } catch (error) {
        next(error);
    }
}

export async function searchMovies(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const query = req.query.q as string;
        const page = req.query.page ? Number(req.query.page) : 1;

        if (!query) {
            res.status(400).json({ message: "El parámetro q es requerido" });
            return;
        }

        const data = await tmdbService.searchMovies(query, page);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

export async function getMovieById(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const movieId = Number(req.params.id);

        if (isNaN(movieId)) {
            res.status(400).json({ message: "El id de la película debe ser un número" });
            return;
        }

        const data = await tmdbService.getMovieById(movieId);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

export async function getMovieCredits(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const movieId = Number(req.params.id);

        if (isNaN(movieId)) {
            res.status(400).json({ message: "El id de la película debe ser un número" });
            return;
        }

        const data = await tmdbService.getMovieCredits(movieId);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

export async function getSimilarMovies(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const movieId = Number(req.params.id);
        const page = req.query.page ? Number(req.query.page) : 1;

        if (isNaN(movieId)) {
            res.status(400).json({ message: "El id de la película debe ser un número" });
            return;
        }

        const data = await tmdbService.getSimilarMovies(movieId, page);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

export async function getGenres(
    req: Request,
    res: Response,
){
    try{
        const genres=await tmdbService.getGenresMovies()
        res.json(genres)
    }catch(error){
        res.status(500).json({message: 'Error fetching genres'});
    }
}

export async function getMoviesByGenre(
    req: Request,
    res: Response
){
    try{
        const { genreId } = req.params;
        const movies= await tmdbService.getMoviesByGenre(Number(genreId));

        res.json(movies);
    }catch(error){
        res.status(500).json({message: 'Error fetching movies'});
    }
}