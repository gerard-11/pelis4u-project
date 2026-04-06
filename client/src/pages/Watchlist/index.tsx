import { Link } from 'react-router-dom'
import { useWatchlist, useRemoveFromWatchlist } from '@/hooks/useWatchlist'
import { getTmdbImage } from '@/lib/tmdb'

export default function Watchlist() {
    const { data: watchlist, isLoading, isError } = useWatchlist()
    const { mutate: removeMovie, isPending } = useRemoveFromWatchlist()
    console.log('watchlist', watchlist)
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-400">Error al cargar tu watchlist.</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 px-6 py-8">
            <h1 className="text-white text-3xl font-bold mb-8">
                🎬 Mi Watchlist
            </h1>

            {watchlist?.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 gap-4">
                    <p className="text-gray-400 text-lg">
                        Tu watchlist está vacía
                    </p>
                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Explorar películas
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {watchlist?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-800 rounded-xl p-4 flex gap-4 items-center"
                        >
                            <Link to={`/movie/${item.movieId}`} className="shrink-0">
                                <img
                                    src={getTmdbImage(item.movie?.poster_path, 'w200')}
                                    alt={item.movie?.title}
                                    className="w-16 h-24 object-cover rounded-lg"
                                />
                            </Link>
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <Link
                                    to={`/movie/${item.movieId}`}
                                    className="text-white font-semibold hover:text-blue-400 transition-colors truncate"
                                >
                                    {item.movie?.title}
                                </Link>
                                <p className="text-gray-400 text-sm">
                                    {item.movie?.release_date.slice(0, 4)}
                                </p>
                                <p className="text-yellow-400 text-sm">
                                    ⭐ {item.movie?.vote_average.toFixed(1)}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    Agregada el {new Date(item.addedAt).toLocaleDateString('es-MX')}
                                </p>
                            </div>


                            <button
                                onClick={() => removeMovie(item.movieId)}
                                disabled={isPending}
                                className="bg-red-600/20 hover:bg-red-600 disabled:opacity-50 text-red-400 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors shrink-0"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}