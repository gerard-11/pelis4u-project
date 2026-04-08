import prisma from "../config/db.js";
import * as movieService from './tmdb.service.js'
import watchlistRoutes from "../routes/watchlist.routes.js";


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
        orderBy: { addedAt: 'desc' }
    })


    const watchlistWithMovies= await Promise.all(
        watchlist.map(async (item:WatchlistWithMovie):Promise<WatchlistWithMovie> => {
            const movie = await movieService.getMovieById(item.movieId)
            return {
                id: item.id,
                userId: item.userId,
                movieId: item.movieId,
                addedAt: item.addedAt,
                movie,
            } as WatchlistWithMovie
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
