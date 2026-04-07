import { Link } from 'react-router-dom'
import type { Movie } from '@/types'
import { getTmdbImage } from '@/lib/tmdb'

interface MovieCardProps {
    movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link
            to={`/movie/${movie.id}`}
            className="group block rounded-lg overflow-hidden bg-gray-800 hover:scale-105 transition-transform duration-200"
        >
            <div className="relative aspect-2/3">
                <img
                    src={getTmdbImage(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                    ⭐ {movie.vote_average.toFixed(1)}
                </div>
            </div>

            <div className="p-3">
                <h3 className="text-white font-semibold text-sm truncate">
                    {movie.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                    {movie.release_date?.slice(0, 4) ?? 'N/A'}
                </p>
            </div>
        </Link>
    )
}