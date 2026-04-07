import prisma from "../config/db.js";
import * as movieService from './tmdb.service.js'
type WatchlistWithMovie = {
    movie: movieService.TmdbMovie
    id: string
    userId: string
    movieId: number
    addedAt: Date
}

type WatchlistWithMovie = {
    movie: movieService.TmdbMovie
    id: string
    userId: string
    movieId: number
    addedAt: Date
}

export async function getWatchlist(userId: string) {
    const watchlist = await prisma.watchlist.findMany({
        where: { userId },
        orderBy: { addedAt: 'desc' },
    })

    const watchlistWithMovies:WatchlistWithMovie[] = await Promise.all(
        watchlist.map(async (item) => {
            const movie = await movieService.getMovieById(item.movieId)
            return {
                ...item,
                movie,
            }
        })
    )

    return watchlistWithMovies
}



export async function addToWatchlist(userId: string, movieId: number) {
    return prisma.watchlist.create({
        data: { userId, movieId },
    });
}

export async function removeFromWatchlist(userId: string, movieId: number) {
    return prisma.watchlist.deleteMany({
        where: { userId, movieId },
    });
}